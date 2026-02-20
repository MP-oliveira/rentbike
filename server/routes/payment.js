/**
 * Rotas de pagamento: criar checkout e receber webhook do Mercado Pago.
 */
import { createPreference, getPaymentById, RENT_AMOUNT } from '../services/mercadoPago.js'
import { createRental, updateRentalPaymentStatus } from '../services/supabase.js'

/**
 * POST /api/create-payment
 * Body: { user_name, user_phone, payment_method }
 * Cria registro no Supabase (pending), depois preferência no MP e retorna init_point.
 */
export async function createPayment(req, res) {
  try {
    const { user_name, user_phone, payment_method } = req.body || {}
    const name = (user_name || '').trim()
    const phone = (user_phone || '').trim()
    const method = (payment_method || 'pix').toLowerCase()

    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        error: 'user_name e user_phone são obrigatórios',
      })
    }

    const rental = await createRental({
      user_name: name,
      user_phone: phone,
      payment_method: method === 'card' ? 'card' : 'pix',
      payment_status: 'pending',
      amount: RENT_AMOUNT,
    })

    const baseUrl = req.protocol + '://' + req.get('host')
    const frontUrl = process.env.FRONTEND_URL || baseUrl.replace(/:\d+$/, ':5173')

    const result = await createPreference({
      user_name: name,
      user_phone: phone,
      payment_method: method,
      external_reference: rental?.id || undefined,
      notification_url: `${baseUrl}/api/webhook`,
      back_url_success: rental?.id ? `${frontUrl}/?success=1&rental_id=${rental.id}` : `${frontUrl}/?success=1`,
      back_url_failure: `${frontUrl}/?success=0`,
    })

    if (!result) {
      return res.status(500).json({
        ok: false,
        error: 'Não foi possível criar o pagamento',
      })
    }

    return res.status(200).json({
      ok: true,
      preference_id: result.preferenceId,
      init_point: result.init_point,
      rental_id: rental?.id || null,
    })
  } catch (err) {
    console.error('createPayment error:', err)
    return res.status(500).json({
      ok: false,
      error: 'Erro ao processar solicitação',
    })
  }
}

/**
 * POST /api/webhook
 * Recebe notificação do Mercado Pago e atualiza payment_status no Supabase.
 * Payload pode vir como payment ou preference (ver doc MP).
 */
export async function webhook(req, res) {
  try {
    const body = req.body || {}
    const type = body.type || body.action

    if (!type) {
      return res.status(400).send('Bad request')
    }

    if (type === 'payment') {
      const data = body.data || {}
      const paymentId = data.id
      if (!paymentId) {
        return res.status(200).send('OK')
      }
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
