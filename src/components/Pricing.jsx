import './Pricing.css'

const PLANS = [
  { id: 'avulso', label: 'Avulso', detail: '30 minutos', price: 25 },
  { id: 'diaria', label: 'Por dia', detail: '1 dia inteiro', price: 80 },
  { id: 'mensal', label: 'Mensal', detail: 'Assinatura mensal', price: 200 },
]

function Pricing({ onCtaClick }) {
  return (
    <section className="pricing">
      <div className="pricing__inner">
        <p className="pricing__intro">Escolha o tipo de aluguel</p>
        <div className="pricing__grid">
          {PLANS.map((plan) => (
            <div key={plan.id} className="pricing__card">
              <p className="pricing__product">{plan.label}</p>
              <p className="pricing__value">R$ {plan.price}</p>
              <p className="pricing__detail">{plan.detail}</p>
              <button
                type="button"
                className="pricing__cta"
                onClick={() => onCtaClick(plan.id)}
              >
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
