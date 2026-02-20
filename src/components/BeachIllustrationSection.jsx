import './BeachIllustrationSection.css'

const IMAGE_SRC = '/section-beach-illustration.png'

function BeachIllustrationSection() {
  return (
    <section className="beach-illustration">
      <img
        src={IMAGE_SRC}
        alt="Cena ilustrativa de praia: céu, sol, ondas e areia"
        className="beach-illustration__img"
      />
      <div className="beach-illustration__texts">
        <p className="beach-illustration__text">
          Pedalar com a Beach Bike é
          <br />
          aliar o lazer ao cuidado com a
          <br />
          saúde. Temos 3 opções de aluguel:
        </p>
        <div className="beach-illustration__block-second">
          <p className="beach-illustration__label">DIÁRIA</p>
          <p className="beach-illustration__text beach-illustration__text--second">
            Quer passar o dia inteiro pedalando ou ter autonomia
            <br />
            para ir a locais mais distantes e fazer paradas sem
            <br />
            pressa? Então, o aluguel da diária é a melhor opção.
          </p>
        </div>
        <div className="beach-illustration__block-mensalista">
          <p className="beach-illustration__label">MENSALISTA</p>
          <p className="beach-illustration__text beach-illustration__text--second">
            Essa é a solução ideal para quem quer transformar a experiência Beach Bike num hábito. Com planos que incluem o aluguel por duas ou quatro horas durante a semana, o pedal à beira-mar fará parte da sua rotina.
          </p>
        </div>
        <div className="beach-illustration__block-avulso">
          <p className="beach-illustration__label">AVULSO</p>
          <p className="beach-illustration__text beach-illustration__text--second">
            É só chegar em nosso stand (próximo à Vilas Beach) e solicitar o aluguel de uma de nossas Fat Bikes por 30 minutos ou reservar um determinado horário por meio de nossos canais oficiais.
          </p>
          <div className="beach-illustration__contact">
            <a
              className="beach-illustration__contact-link"
              href="https://instagram.com/beachbike_vilas"
              target="_blank"
              rel="noopener noreferrer"
            >
              @beachbike_vilas
            </a>
            <span className="beach-illustration__contact-item">Pix: 61.455.204/0001-01</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeachIllustrationSection
