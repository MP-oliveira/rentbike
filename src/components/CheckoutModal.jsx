import { useState } from 'react'
import './CheckoutModal.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

function CheckoutModal({ onClose, onSuccess }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: name.trim(),
          user_phone: phone.trim(),
          payment_method: paymentMethod,
        }),
      })

      const data = await res.json()

      if (!data.ok) {
        setError(data.error || 'Erro ao criar pagamento')
        setLoading(false)
        return
      }

      if (data.init_point) {
        window.location.href = data.init_point
        return
      }

      if (data.rental_id) {
        onSuccess(data.rental_id)
      }
    } catch (err) {
      setError('Falha na conexão. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className="checkout-overlay" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="checkout-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="checkout-modal">
        <button type="button" className="checkout-close" onClick={onClose} aria-label="Fechar">
          <span aria-hidden="true">×</span>
        </button>

        <div className="checkout-summary">
          <p className="checkout-product">30 minutos</p>
          <p className="checkout-price">R$ 25</p>
        </div>

        <h2 id="checkout-title" className="checkout-title">Finalizar reserva</h2>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <label className="checkout-label" htmlFor="checkout-name">Nome</label>
          <input
            id="checkout-name"
            type="text"
            className="checkout-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            required
            disabled={loading}
            autoComplete="name"
          />

          <label className="checkout-label" htmlFor="checkout-phone">Telefone</label>
          <input
            id="checkout-phone"
            type="tel"
            className="checkout-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(71) 99999-9999"
            required
            disabled={loading}
            autoComplete="tel"
          />

          <span className="checkout-label">Pagamento</span>
          <div className="checkout-methods">
            <label className={`checkout-option ${paymentMethod === 'pix' ? 'checkout-option--active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="pix"
                checked={paymentMethod === 'pix'}
                onChange={() => setPaymentMethod('pix')}
                disabled={loading}
              />
              <span>PIX</span>
            </label>
            <label className={`checkout-option ${paymentMethod === 'card' ? 'checkout-option--active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                disabled={loading}
              />
              <span>Cartão</span>
            </label>
          </div>

          {error && <p className="checkout-error" role="alert">{error}</p>}

          <button type="submit" className="checkout-submit" disabled={loading}>
            {loading ? 'Abrindo…' : 'Ir para pagamento'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutModal
