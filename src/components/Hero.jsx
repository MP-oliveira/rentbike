import './Hero.css'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80'

function Hero({ onCtaClick }) {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src={HERO_IMAGE} alt="Bicicleta na praia" className="hero__img" />
        <div className="hero__overlay" aria-hidden="true" />
      </div>
      <div className="hero__content">
        <p className="hero__kicker">Lauro de Freitas · Bahia</p>
        <h1 className="hero__title">
          Um novo jeito de se
          <span className="hero__title-break"> mover.</span>
        </h1>
        <p className="hero__sub">Vai de bike. Praia, vento, 30 minutos.</p>
        <button type="button" className="hero__cta" onClick={onCtaClick}>
          Alugar agora
        </button>
      </div>
    </section>
  )
}

export default Hero
