import './RentalOptionsSection.css'

function RentalOptionsSection() {
  return (
    <section className="rental-options">
      <div className="rental-options__intro">
        <p className="rental-options__intro-text">
          Pedalar com a Beach Bike é aliar o lazer ao cuidado com a saúde. Temos 3 opções de aluguel:
        </p>
        <span className="rental-options__logo" aria-hidden="true" />
      </div>

      <div className="rental-options__block rental-options__block--diaria">
        <h3 className="rental-options__title">DIÁRIA</h3>
        <p className="rental-options__body">
          Quer passar o dia inteiro pedalando ou ter autonomia para ir a locais mais distantes e fazer paradas sem pressa? Então, o aluguel da diária é a melhor opção.
        </p>
      </div>

      <div className="rental-options__block rental-options__block--mensalista">
        <h3 className="rental-options__title">MENSALISTA</h3>
        <p className="rental-options__body">
          Essa é a solução ideal para quem quer transformar a experiência Beach Bike num hábito. Com planos que incluem o aluguel por duas ou quatro horas durante a semana, o pedal à beira-mar fará parte da sua rotina.
        </p>
      </div>

      <div className="rental-options__block rental-options__block--avulso">
        <h3 className="rental-options__title">AVULSO</h3>
        <p className="rental-options__body">
          É só chegar em nosso stand (próximo à Vilas Beach) e solicitar o aluguel de uma de nossas Fat Bikes por 30 minutos ou reservar um determinado horário por meio de nossos canais oficiais.
        </p>
        <div className="rental-options__contact">
          <a
            className="rental-options__contact-item rental-options__contact-link"
            href="https://instagram.com/beachbike_vilas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram @beachbike_vilas
          </a>
          <span className="rental-options__contact-item">Pix: 61.455.204/0001-01</span>
        </div>
      </div>
    </section>
  )
}

export default RentalOptionsSection
