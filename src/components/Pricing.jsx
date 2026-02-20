import './Pricing.css'

function Pricing({ onCtaClick }) {
  return (
    <section className="pricing">
      <div className="pricing__inner">
        <div className="pricing__card">
          <p className="pricing__product">30 minutos</p>
          <p className="pricing__value">R$ 25</p>
          <p className="pricing__detail">PIX ou cartão</p>
          <button type="button" className="pricing__cta" onClick={onCtaClick}>
            Reservar
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pricing
