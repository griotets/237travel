import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import BookingPage from './pages/BookingPage'
import ProfilePage from './pages/ProfilePage'
import SupportPage from './pages/SupportPage'
import AdminDashboard from './pages/AdminDashboard'
import AgenciesPage from './pages/AgenciesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AgencyRegistration from './pages/AgencyRegistration'
import BookingDetails from './pages/BookingDetails'
import BookingsPage from './pages/BookingsPage'
import SettingsPage from './pages/SettingsPage'
import Footer from './components/Footer'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/agencies" element={<AgenciesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/register-agency" element={<AgencyRegistration />} />
              <Route path="/booking" element={<BookingDetails />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
