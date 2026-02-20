import './BikeIllustration.css'

/**
 * Ilustração minimalista de bicicleta - estilizada via classes CSS
 */
function BikeIllustration({ className = '' }) {
  return (
    <svg
      className={`bike-illus ${className}`}
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="70" cy="130" r="24" className="bike-illus__wheel" />
      <circle cx="210" cy="130" r="24" className="bike-illus__wheel" />
      <circle cx="70" cy="130" r="12" className="bike-illus__wheel-inner" />
      <circle cx="210" cy="130" r="12" className="bike-illus__wheel-inner" />
      <path d="M70 130 L140 50 L210 130 L140 50 L94 90" className="bike-illus__frame" />
      <path d="M140 50 L186 90 L140 130 L94 90 Z" className="bike-illus__body" />
      <circle cx="140" cy="50" r="14" className="bike-illus__joint" />
      <circle cx="140" cy="50" r="6" className="bike-illus__joint-inner" />
      <path d="M58 130 L82 130 M198 130 L222 130" className="bike-illus__axle" />
    </svg>
  )
}

export default BikeIllustration
