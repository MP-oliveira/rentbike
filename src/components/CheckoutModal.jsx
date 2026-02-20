import { useState, useEffect } from 'react'
import './CheckoutModal.css'

const API_BASE = import.meta.env.VITE_API_URL || ''
const PLANS = { avulso: '30 min', diaria: 'Por dia', mensal: 'Mensal' }
const PRICES = { avulso: 25, diaria: 80, mensal: 200 }

function CheckoutModal({ onClose, onSuccess, initialRentalType = null }) {
  const [step, setStep] = useState(initialRentalType ? 1 : 0)
  const [rentalType, setRentalType] = useState(initialRentalType || 'avulso')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00')
  const [availableBikes, setAvailableBikes] = useState([])
  const [bikeId, setBikeId] = useState('')
  const [loadingBikes, setLoadingBikes] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().slice(0, 10)

  const fetchAvailability = async () => {
    if (!date) return
    setError('')
    setLoadingBikes(true)
    try {
      const params = new URLSearchParams({
        rental_type: rentalType,
        date,
        time: rentalType === 'avulso' ? time : '08:00',
      })
      const res = await fetch(`${API_BASE}/api/availability?${params}`)
      const text = await res.text()
      let data = {}
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        setAvailableBikes([])
        setError(res.ok ? 'Resposta inválida do servidor.' : 'Servidor indisponível. Inicie o backend (npm run dev:all).')
        setLoadingBikes(false)
        return
      }
      if (data.ok && data.available_bikes) {
        setAvailableBikes(data.available_bikes)
        setBikeId(data.available_bikes[0]?.id || '')
      } else {
        setAvailableBikes([])
        setBikeId('')
        if (!res.ok) setError(data.error || 'Falha ao buscar bikes disponíveis.')
      }
    } catch (err) {
      setAvailableBikes([])
      setError('Falha ao buscar bikes disponíveis. O backend está rodando? (npm run dev:all)')
    }
    setLoadingBikes(false)
  }

  useEffect(() => {
    if (initialRentalType) setRentalType(initialRentalType)
  }, [initialRentalType])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const [y, m, d] = date.split('-').map(Number)
    const [hh, mm] = (rentalType === 'avulso' ? time : '08:00').split(':').map(Number)
    const startAt = new Date(y, m - 1, d, hh, mm, 0, 0).toISOString()

    try {
      const res = await fetch(`${API_BASE}/api/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: name.trim(),
          user_phone: phone.trim(),
          payment_method: paymentMethod,
          bike_id: bikeId,
          rental_type: rentalType,
          start_at: startAt,
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
      if (data.rental_id) onSuccess(data.rental_id)
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
          <p className="checkout-product">{PLANS[rentalType]} — R$ {PRICES[rentalType]}</p>
          {date && <p className="checkout-date">Horário de entrega: {date}{rentalType === 'avulso' ? ` às ${time}` : ''}</p>}
        </div>

        <h2 id="checkout-title" className="checkout-title">Reservar bike</h2>

        {step === 0 && (
          <div className="checkout-step">
            <span className="checkout-label">Tipo de aluguel</span>
            <div className="checkout-type-options">
              {['avulso', 'diaria', 'mensal'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`checkout-type-btn ${rentalType === type ? 'checkout-type-btn--active' : ''}`}
                  onClick={() => { setRentalType(type); setStep(1) }}
                >
                  {PLANS[type]} — R$ {PRICES[type]}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="checkout-step">
            <span className="checkout-label">Data (horário de entrega)</span>
            <div className="checkout-datetime">
              <input
                type="date"
                className="checkout-input"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
              />
              {rentalType === 'avulso' && (
                <input
                  type="time"
                  className="checkout-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              )}
            </div>
            <button
              type="button"
              className="checkout-submit checkout-submit--secondary"
              onClick={() => date && fetchAvailability().then(() => setStep(2))}
              disabled={!date || loadingBikes}
            >
              {loadingBikes ? 'Buscando…' : 'Ver bikes disponíveis'}
            </button>
            <button type="button" className="checkout-back" onClick={() => initialRentalType ? onClose() : setStep(0)}>
              {initialRentalType ? 'Fechar' : 'Voltar'}
            </button>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="checkout-step">
              <span className="checkout-label">Bike disponível</span>
              {availableBikes.length === 0 && !loadingBikes && (
                <p className="checkout-empty">Nenhuma bike livre nesse horário. Escolha outra data.</p>
              )}
              <div className="checkout-bikes">
                {availableBikes.map((bike) => (
                  <label key={bike.id} className={`checkout-bike ${bikeId === bike.id ? 'checkout-bike--active' : ''}`}>
                    <input
                      type="radio"
                      name="bike"
                      value={bike.id}
                      checked={bikeId === bike.id}
                      onChange={() => setBikeId(bike.id)}
                    />
                    <span>{bike.name}</span>
                  </label>
                ))}
              </div>
              <button type="button" className="checkout-back" onClick={() => setStep(1)}>Voltar</button>
            </div>

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
                  <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} disabled={loading} />
                  <span>PIX</span>
                </label>
                <label className={`checkout-option ${paymentMethod === 'card' ? 'checkout-option--active' : ''}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} disabled={loading} />
                  <span>Cartão</span>
                </label>
              </div>
              {error && <p className="checkout-error" role="alert">{error}</p>}
              <button type="submit" className="checkout-submit" disabled={loading || !bikeId}>
                {loading ? 'Abrindo…' : 'Ir para pagamento'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default CheckoutModal
