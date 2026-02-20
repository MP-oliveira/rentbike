import './Hero.css'

const HERO_IMAGE = '/hero-beach.png'
const LOGO_BEACHBIKE = '/logo-beachbike.png'

function Hero({ onCtaClick }) {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src={HERO_IMAGE} alt="Família pedalando fat bikes na praia de Vilas do Atlântico" className="hero__img" />
        <div className="hero__overlay" aria-hidden="true" />
      </div>
      <p className="hero__location">
        <span className="hero__pin" aria-hidden="true" /> Praia de Vilas do Atlântico
      </p>
      <div className="hero__brand">
        <img src={LOGO_BEACHBIKE} alt="BeachBike" className="hero__brand-img" />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">
          Ela <span className="hero__title-fat">FAT</span>,<br />Você <span className="hero__title-accent">FIT.</span>
        </h1>
        <p className="hero__sub">
          Conheça nossas opções de aluguel de Fat Bikes para um pedal à beira-mar.
        </p>
      </div>
      <div className="hero__cta-wrap">
        <button type="button" className="hero__cta" onClick={onCtaClick}>
          Alugar agora
        </button>
      </div>
    </section>
  )
}

export default Hero
