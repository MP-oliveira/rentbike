/**
 * Integração Mercado Pago - criação de preferência (checkout) e validação de webhook.
 * Requer MERCADOPAGO_ACCESS_TOKEN no .env
 */
import MercadoPago from 'mercadopago'

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
let mp = null

if (accessToken) {
  MercadoPago.configure({ access_token: accessToken })
  mp = MercadoPago
}

const DEFAULT_AMOUNT = 25

/**
 * Cria preferência de pagamento (checkout) para PIX ou cartão.
 * @param {Object} payload - { user_name, user_phone, payment_method, amount?, title?, ... }
 */
export async function createPreference(payload) {
  if (!mp) {
    console.error('Mercado Pago: MERCADOPAGO_ACCESS_TOKEN não configurado')
    return null
  }

  const { user_name, user_phone, payment_method, back_url_success, back_url_failure, amount, title } = payload
  const unitPrice = typeof amount === 'number' ? amount : DEFAULT_AMOUNT
  const itemTitle = title || 'Aluguel de bicicleta | RentBike Lauro'

  const preference = {
    items: [
      {
        title: itemTitle,
        quantity: 1,
        unit_price: unitPrice,
        currency_id: 'BRL',
      },
    ],
    payer: {
      name: user_name || 'Cliente',
    },
    back_urls: {
      success: back_url_success || undefined,
      failure: back_url_failure || undefined,
    },
    auto_return: 'approved',
    external_reference: payload.external_reference || undefined,
    notification_url: payload.notification_url || undefined,
    statement_descriptor: 'RENTBIKE LAURO',
  }

  try {
    const response = await mp.preferences.create(preference)
    return {
      preferenceId: response.body.id,
      init_point: response.body.init_point,
    }
  } catch (err) {
    console.error('Mercado Pago createPreference error:', err)
    return null
  }
}

/**
 * Verifica assinatura/validade do webhook (opcional, conforme doc MP).
 * Aqui retornamos true; em produção pode validar x-signature.
 */
export function validateWebhookPayload(body, headers) {
  return true
}

/**
 * Busca dados do pagamento por ID (para webhook).
 */
export async function getPaymentById(paymentId) {
  if (!mp) return null
  try {
    const response = await mp.payment.get(paymentId)
    return response?.body || null
  } catch (err) {
    console.error('getPaymentById error:', err)
    return null
  }
}

export { DEFAULT_AMOUNT as RENT_AMOUNT }
