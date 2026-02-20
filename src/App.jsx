import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import BeachIllustrationSection from './components/BeachIllustrationSection'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import CheckoutModal from './components/CheckoutModal'
import Success from './components/Success'
import WhatsAppButton from './components/WhatsAppButton'
import './App.css'

function App() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedRentalType, setSelectedRentalType] = useState(null)
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

  const openCheckout = (rentalType = null) => {
    setSelectedRentalType(rentalType)
    setShowCheckout(true)
  }
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
      <Hero onCtaClick={openCheckout} />
      <HowItWorks />
      <BeachIllustrationSection />
      <Pricing onCtaClick={openCheckout} />
      <Footer />
      <WhatsAppButton />

      {showCheckout && (
        <CheckoutModal
          onClose={closeCheckout}
          onSuccess={onPaymentSuccess}
          initialRentalType={selectedRentalType}
        />
      )}

      {showSuccess && (
        <Success rentalId={rentalId} onClose={closeSuccess} />
      )}
    </main>
  )
}

export default App
