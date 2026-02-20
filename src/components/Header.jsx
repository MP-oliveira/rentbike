import './Header.css'
import LogoRentBike from './LogoRentBike'

function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <LogoRentBike />
      </a>
      <span className="header__city">Lauro de Freitas</span>
    </header>
  )
}

export default Header
