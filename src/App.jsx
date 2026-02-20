import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhyCycle from './components/WhyCycle'
import BeachSection from './components/BeachSection'
import OurBikes from './components/OurBikes'
import QuoteSection from './components/QuoteSection'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import CheckoutModal from './components/CheckoutModal'
import Success from './components/Success'
import WhatsAppButton from './components/WhatsAppButton'
import './App.css'

function App() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [rentalId, setRentalId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === '1') {
      setRentalId(params.get('rental_id') || null)
      setShowSuccess(true)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const openCheckout = () => setShowCheckout(true)
  const closeCheckout = () => setShowCheckout(false)

  const onPaymentSuccess = (id) => {
    setShowCheckout(false)
    setRentalId(id)
    setShowSuccess(true)
  }

  const closeSuccess = () => {
    setShowSuccess(false)
    setRentalId(null)
  }

  return (
    <main className="app">
      <Header />
      <Hero onCtaClick={openCheckout} />
      <HowItWorks />
      <WhyCycle />
      <BeachSection />
      <OurBikes />
      <QuoteSection />
      <Pricing onCtaClick={openCheckout} />
      <Footer />
      <WhatsAppButton />

      {showCheckout && (
        <CheckoutModal
          onClose={closeCheckout}
          onSuccess={onPaymentSuccess}
        />
      )}

      {showSuccess && (
        <Success rentalId={rentalId} onClose={closeSuccess} />
      )}
    </main>
  )
}

export default App
