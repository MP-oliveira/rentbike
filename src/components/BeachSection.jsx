import './BeachSection.css'

const BEACH_IMAGE = 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80'

function BeachSection() {
  return (
    <section className="beach">
      <div className="beach__inner">
        <div className="beach__img-wrap">
          <img src={BEACH_IMAGE} alt="Ciclista na orla" className="beach__img" />
        </div>
        <div className="beach__content">
          <h2 className="beach__title">Liberdade para curtir a praia</h2>
          <p className="beach__text">
            Pedalar na orla é praticidade e prazer: vento no rosto, sol e mar. 
            Sem trânsito. Só você e a bike.
          </p>
          <p className="beach__text">
            Exercício, lazer e transporte em um. 30 minutos que fazem diferença.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BeachSection
