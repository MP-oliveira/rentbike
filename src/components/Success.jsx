import './Success.css'

function Success({ rentalId, onClose }) {
  return (
    <div className="success-overlay" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <div className="success-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="success-card">
        <div className="success-icon" aria-hidden="true">✓</div>
        <h2 id="success-title" className="success-title">Pagamento confirmado!</h2>
        <p className="success-text">Seu aluguel foi registrado. Aproveite os 30 minutos de bike.</p>
        {rentalId && (
          <p className="success-id">Nº {rentalId.slice(0, 8)}</p>
        )}
        <button type="button" className="success-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  )
}

export default Success
