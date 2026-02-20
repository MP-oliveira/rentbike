/**
 * Cliente Supabase - aluguéis e bikes.
 * Marcação: bike_id + rental_type + start_at/end_at para evitar sobreposição.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase: SUPABASE_URL ou SUPABASE_SERVICE_KEY não definidos.')
}

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

/** Lista todas as bikes (id, name). */
export async function getBikes() {
  if (!supabase) return []
  const { data, error } = await supabase.from('bikes').select('id, name').order('name')
  if (error) {
    console.error('getBikes error:', error)
    return []
  }
  return data || []
}

/**
 * Retorna IDs das bikes disponíveis no período (start_at, end_at).
 * Bloqueadas = aluguel aprovado ou pendente que sobrepõe o período.
 */
export async function getAvailableBikeIds(startAt, endAt) {
  if (!supabase || !startAt || !endAt) return []
  const start = new Date(startAt).toISOString()
  const end = new Date(endAt).toISOString()

  const bikes = await getBikes()
  if (bikes.length === 0) return []

  const { data: overlapping } = await supabase
    .from('rentals')
    .select('bike_id')
    .in('payment_status', ['pending', 'approved'])
    .not('bike_id', 'is', null)
    .lt('start_at', end)
    .gt('end_at', start)

  const blockedIds = new Set((overlapping || []).map((r) => r.bike_id))
  return bikes.filter((b) => !blockedIds.has(b.id)).map((b) => b.id)
}

/**
 * Verifica se a bike está livre no período.
 */
export async function isBikeAvailable(bikeId, startAt, endAt) {
  const available = await getAvailableBikeIds(startAt, endAt)
  return available.includes(bikeId)
}

/**
 * Cria aluguel com marcação (bike_id, tipo, start/end).
 * Falha se a bike não estiver disponível.
 */
export async function createRental(data) {
  if (!supabase) return null

  if (data.bike_id && data.start_at && data.end_at) {
    const ok = await isBikeAvailable(data.bike_id, data.start_at, data.end_at)
    if (!ok) {
      return { error: 'Bike não disponível neste horário' }
    }
  }

  const row = {
    user_name: data.user_name,
    user_phone: data.user_phone,
    payment_method: data.payment_method,
    payment_status: data.payment_status || 'pending',
    amount: data.amount,
    bike_id: data.bike_id || null,
    rental_type: data.rental_type || 'avulso',
    start_at: data.start_at || null,
    end_at: data.end_at || null,
  }

  const { data: inserted, error } = await supabase
    .from('rentals')
    .insert(row)
    .select('id')
    .single()

  if (error) {
    console.error('Supabase createRental error:', error)
    return null
  }
  return { id: inserted.id }
}

export async function updateRentalPaymentStatus(id, status) {
  if (!supabase) return
  const { error } = await supabase
    .from('rentals')
    .update({ payment_status: status })
    .eq('id', id)
  if (error) console.error('Supabase updateRentalPaymentStatus error:', error)
}

export async function getRentalById(id) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('rentals')
    .select('*, bikes(name)')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export default supabase
