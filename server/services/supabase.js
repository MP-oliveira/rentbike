/**
 * Cliente Supabase para persistência de aluguéis.
 * Requer SUPABASE_URL e SUPABASE_SERVICE_KEY no .env
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase: SUPABASE_URL ou SUPABASE_SERVICE_KEY não definidos. Aluguéis não serão persistidos.')
}

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

/**
 * Insere um novo aluguel (status inicial: pending).
 * @param {Object} data - { user_name, user_phone, payment_method, payment_status, amount }
 * @returns {Promise<{ id: string } | null>}
 */
export async function createRental(data) {
  if (!supabase) return null
  const { data: row, error } = await supabase
    .from('rentals')
    .insert({
      user_name: data.user_name,
      user_phone: data.user_phone,
      payment_method: data.payment_method,
      payment_status: data.payment_status || 'pending',
      amount: data.amount,
    })
    .select('id')
    .single()
  if (error) {
    console.error('Supabase createRental error:', error)
    return null
  }
  return { id: row.id }
}

/**
 * Atualiza o status de pagamento de um aluguel pelo id.
 * @param {string} id - UUID do rental
 * @param {string} status - approved | rejected | pending
 */
export async function updateRentalPaymentStatus(id, status) {
  if (!supabase) return
  const { error } = await supabase
    .from('rentals')
    .update({ payment_status: status })
    .eq('id', id)
  if (error) console.error('Supabase updateRentalPaymentStatus error:', error)
}

/**
 * Busca aluguel por id (para exibir na tela de sucesso).
 */
export async function getRentalById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('rentals')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export default supabase
