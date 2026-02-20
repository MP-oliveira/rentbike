import './LogoRentBike.css'

/**
 * Logo RentBike: "Rent" + bike na vertical (como B) + "ike"
 */
function LogoRentBike({ className = '' }) {
  return (
    <span className={`logo-rentbike ${className}`}>
      <span className="logo-rentbike__rent">Rent</span>
      <span className="logo-rentbike__b" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 40" fill="none" className="logo-rentbike__svg">
          <path d="M5 8 v24" stroke="currentColor" strokeWidth="3.25" strokeLinecap="round" />
          <circle cx="12" cy="14" r="6" stroke="currentColor" strokeWidth="2.75" fill="none" />
          <circle cx="12" cy="14" r="2.25" fill="currentColor" />
          <circle cx="12" cy="26" r="6" stroke="currentColor" strokeWidth="2.75" fill="none" />
          <circle cx="12" cy="26" r="2.25" fill="currentColor" />
          <path d="M5 14 L10 14 M5 26 L10 26" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
        </svg>
      </span>
      <span className="logo-rentbike__ike">ike</span>
    </span>
  )
}

export default LogoRentBike
