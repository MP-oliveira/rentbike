import './OurBikes.css'

const BIKES_IMAGE = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000&q=80'
const PERSON_BIKE_IMAGE = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80'

function OurBikes() {
  return (
    <section className="ourbikes">
      <div className="ourbikes__inner">
        <h2 className="ourbikes__title">Nossas bikes</h2>
        <p className="ourbikes__lead">
          Bicicletas práticas e confortáveis, no estilo que você já conhece. Ideais para a orla.
        </p>
        <div className="ourbikes__grid">
          <div className="ourbikes__img-wrap ourbikes__img-wrap--main">
            <img src={BIKES_IMAGE} alt="Bicicletas de aluguel" className="ourbikes__img" />
          </div>
          <div className="ourbikes__img-wrap">
            <img src={PERSON_BIKE_IMAGE} alt="Pessoa com bicicleta" className="ourbikes__img" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurBikes
