import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const CartSlider = () => {
  const { 
    items, 
    isOpen, 
    removeItem, 
    updateQuantity, 
    getTotal, 
    getItemCount,
    setIsOpen 
  } = useCart()
  const { isAuthenticated } = useAuth()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour procéder au paiement')
      return
    }
    
    if (items.length === 0) {
      alert('Votre panier est vide')
      return
    }

    // Simulate checkout process
    alert('Redirection vers le paiement...')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Slider */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 gradient-bg text-white">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-semibold">
                  Panier ({getItemCount()})
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="text-gray-500">
                    Ajoutez des voyages pour commencer vos réservations
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=100'}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.description || 'Voyage en bus'}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-semibold text-primary-600">
                              {item.price?.toLocaleString()} FCFA
                            </span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    {getTotal().toLocaleString()} FCFA
                  </span>
                </div>

                {/* Payment Methods */}
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-lg font-medium">
                    MTN MoMo
                  </div>
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-lg font-medium">
                    Orange Money
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Procéder au paiement</span>
                </motion.button>

                {/* Security Note */}
                <p className="text-xs text-gray-500 text-center">
                  🔒 Paiement 100% sécurisé avec chiffrement SSL
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSlider
