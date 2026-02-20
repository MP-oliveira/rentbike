import './HowItWorks.css'

function HowItWorks() {
  const steps = [
    { label: 'Escolha', desc: 'Chegue na praia e pegue sua bike.' },
    { label: 'Pague', desc: 'PIX ou cartão. Rápido e seguro.' },
    { label: 'Pedale', desc: '30 minutos de liberdade na orla.' },
  ]

  return (
    <section className="how">
      <div className="how__inner">
        <h2 className="how__title">Como usar</h2>
        <p className="how__lead">Três passos. Zero complicação.</p>
        <div className="how__track">
          {steps.map((step, i) => (
            <article
              key={step.label}
              className="how__card"
              data-step={i + 1}
            >
              <span className="how__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="how__label">{step.label}</h3>
              <p className="how__desc">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
