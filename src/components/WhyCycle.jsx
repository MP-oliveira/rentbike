import './WhyCycle.css'

function WhyCycle() {
  const items = [
    { title: 'Saúde', desc: 'Exercício leve que fortalece coração e pernas.' },
    { title: 'Bem-estar', desc: 'Ar livre e movimento reduzem o stress.' },
    { title: 'Prazer', desc: 'Vento, praia e liberdade em 30 minutos.' },
    { title: 'Sustentável', desc: 'Zero emissão. Você e o planeta agradecem.' },
  ]

  return (
    <section className="why">
      <div className="why__inner">
        <h2 className="why__title">Por que pedalar</h2>
        <p className="why__lead">Saúde, prazer e liberdade. Tudo em um passeio.</p>
        <div className="why__grid">
          {items.map((item) => (
            <div key={item.title} className="why__item">
              <h3 className="why__item-title">{item.title}</h3>
              <p className="why__item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyCycle
