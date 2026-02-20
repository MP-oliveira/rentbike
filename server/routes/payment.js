/**
 * Rotas: disponibilidade de bikes, criar pagamento, webhook.
 */
import { createPreference, getPaymentById } from '../services/mercadoPago.js'
import { createRental, updateRentalPaymentStatus, getAvailableBikeIds, getBikes } from '../services/supabase.js'
import { getRentalEndAndAmount } from '../services/booking.js'

// IDs e nomes padrão (igual à migração) — usados quando a tabela bikes está vazia
const DEFAULT_BIKES = [
  { id: '00000000-0000-0000-0000-000000000001', name: 'Bike 1' },
  { id: '00000000-0000-0000-0000-000000000002', name: 'Bike 2' },
  { id: '00000000-0000-0000-0000-000000000003', name: 'Bike 3' },
  { id: '00000000-0000-0000-0000-000000000004', name: 'Bike 4' },
]

/**
 * GET /api/availability?rental_type=avulso|diaria|mensal&date=YYYY-MM-DD&time=HH:mm
 * Para avulso: time obrigatório. Para diaria/mensal: time opcional (00:00).
 * Retorna { available_bikes: [ { id, name } ] }. Se a tabela bikes estiver vazia, retorna as 4 bikes padrão.
 */
export async function getAvailability(req, res) {
  try {
    const { rental_type, date, time } = req.query || {}
    const type = (rental_type || 'avulso').toLowerCase()
    if (!date) {
      return res.status(400).json({ ok: false, error: 'date é obrigatório' })
    }

    const [y, m, d] = date.split('-').map(Number)
    const t = time || '08:00'
    const [hh, mm] = t.split(':').map(Number)
    const startAt = new Date(Date.UTC(y, m - 1, d, hh || 0, mm || 0, 0, 0))

    const { end_at } = getRentalEndAndAmount(type, startAt)
    const endAt = new Date(end_at)

    const allBikes = await getBikes()
    const useDefaultBikes = allBikes.length === 0
    const bikes = useDefaultBikes ? DEFAULT_BIKES : allBikes

    const availableIds = useDefaultBikes
      ? bikes.map((b) => b.id)
      : await getAvailableBikeIds(startAt.toISOString(), endAt.toISOString())
    const availableBikes = bikes.filter((b) => availableIds.includes(String(b.id)))

    return res.json({
      ok: true,
      available_bikes: availableBikes,
      ...(useDefaultBikes && { no_bikes_configured: true }),
    })
  } catch (err) {
    console.error('getAvailability error:', err)
    return res.status(500).json({ ok: false, error: 'Erro ao consultar disponibilidade' })
  }
}

/**
 * POST /api/create-payment
 * Body: user_name, user_phone, payment_method, bike_id, rental_type, start_at
 * start_at = ISO string (horário de entrega). end_at e amount calculados no backend.
 */
export async function createPayment(req, res) {
  try {
    const { user_name, user_phone, payment_method, bike_id, rental_type, start_at } = req.body || {}
    const name = (user_name || '').trim()
    const phone = (user_phone || '').trim()
    const method = (payment_method || 'pix').toLowerCase()
    const type = (rental_type || 'avulso').toLowerCase()

    if (!name || !phone) {
      return res.status(400).json({ ok: false, error: 'user_name e user_phone são obrigatórios' })
    }

    const startAt = start_at ? new Date(start_at) : new Date()
    const { end_at, amount } = getRentalEndAndAmount(type, startAt)

    if (!bike_id) {
      return res.status(400).json({ ok: false, error: 'Escolha uma bike' })
    }

    const rental = await createRental({
      user_name: name,
      user_phone: phone,
      payment_method: method === 'card' ? 'card' : 'pix',
      payment_status: 'pending',
      amount,
      bike_id,
      rental_type: type,
      start_at: startAt.toISOString(),
      end_at,
    })

    if (rental && rental.error) {
      return res.status(400).json({ ok: false, error: rental.error })
    }
    if (!rental || !rental.id) {
      return res.status(500).json({ ok: false, error: 'Não foi possível criar a reserva' })
    }

    const baseUrl = req.protocol + '://' + req.get('host')
    const frontUrl = process.env.FRONTEND_URL || baseUrl.replace(/:\d+$/, ':5173')

    const titles = { avulso: '30 min', diaria: 'Por dia', mensal: 'Mensal' }
    const result = await createPreference({
      user_name: name,
      user_phone: phone,
      payment_method: method,
      amount,
      title: `RentBike Lauro - ${titles[type] || 'Aluguel'}`,
      external_reference: rental.id,
      notification_url: `${baseUrl}/api/webhook`,
      back_url_success: `${frontUrl}/?success=1&rental_id=${rental.id}`,
      back_url_failure: `${frontUrl}/?success=0`,
    })

    if (!result) {
      return res.status(500).json({ ok: false, error: 'Não foi possível criar o pagamento' })
    }

    return res.status(200).json({
      ok: true,
      preference_id: result.preferenceId,
      init_point: result.init_point,
      rental_id: rental.id,
    })
  } catch (err) {
    console.error('createPayment error:', err)
    return res.status(500).json({ ok: false, error: 'Erro ao processar solicitação' })
  }
}

export async function webhook(req, res) {
  try {
    const body = req.body || {}
    const type = body.type || body.action
    if (!type) return res.status(400).send('Bad request')

    if (type === 'payment') {
      const data = body.data || {}
      const paymentId = data.id
      if (!paymentId) return res.status(200).send('OK')
      const paymentInfo = await getPaymentById(paymentId)
      const status = paymentInfo?.status
      const externalRef = paymentInfo?.external_reference
      if (externalRef && (status === 'approved' || status === 'rejected')) {
        await updateRentalPaymentStatus(externalRef, status === 'approved' ? 'approved' : 'rejected')
      }
    }
    res.status(200).send('OK')
  } catch (err) {
    console.error('webhook error:', err)
    res.status(200).send('OK')
  }
}
