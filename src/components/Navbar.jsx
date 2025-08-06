import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  ShoppingBag, 
  User, 
  Search,
  Bell,
  Settings,
  LogOut,
  Heart
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import AuthModal from './AuthModal'
import CartSlider from './CartSlider'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { getItemCount, toggleCart } = useCart()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Voyages', href: '/search' },
    { name: 'Agences', href: '/agencies' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">ET</span>
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">EnjoyTravel</h1>
                <p className="text-xs text-gray-500">Cameroun</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.span>
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                      layoutId="navbar-indicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Cart Button */}
              <motion.button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag className="w-5 h-5" />
                {getItemCount() > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {getItemCount()}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-primary-200"
                    />
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-lg py-1 z-50"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Mon Profil
                        </Link>
                        <Link
                          to="/bookings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Heart className="w-4 h-4 mr-3" />
                          Mes Réservations
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Paramètres
                        </Link>
                        <hr className="my-1 border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Déconnexion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary text-sm px-6 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connexion
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartSlider />
    </>
  )
}

export default Navbar
