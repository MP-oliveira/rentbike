import './Footer.css'

const WHATSAPP_NUMBER = '5571999999999'
const INSTAGRAM = 'https://instagram.com/rentbike_lauro'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__links">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            WhatsApp
          </a>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Instagram
          </a>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} RentBike Lauro · Lauro de Freitas, BA
        </p>
      </div>
    </footer>
  )
}

export default Footer
