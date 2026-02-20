import './WhatsAppButton.css'

const WHATSAPP_NUMBER = '5571999999999'
const MESSAGE = 'Olá! Gostaria de alugar uma bike.'

function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Fale conosco no WhatsApp"
    >
      <span className="whatsapp-float__icon" aria-hidden="true">💬</span>
    </a>
  )
}

export default WhatsAppButton
