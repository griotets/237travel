import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, MapPin, Clock, Star, CreditCard } from 'lucide-react'

const BookingModal = ({ trip, isOpen, onClose, onConfirm, passengers: defaultPassengers = 1 }) => {
  const [bookingData, setBookingData] = useState({
    passengers: defaultPassengers,
    selectedSeats: [],
    passengerInfo: Array(defaultPassengers).fill().map(() => ({
      name: '',
      phone: '',
      age: 'adulte'
    }))
  })

  // Generate seat layout (simple 2-4 configuration for buses)
  const generateSeats = () => {
    const seats = []
    const totalSeats = 50 // Typical bus capacity
    const seatsPerRow = 4
    
    for (let i = 1; i <= totalSeats; i++) {
      const isOccupied = Math.random() < (totalSeats - trip.available) / totalSeats
      seats.push({
        number: i,
        row: Math.ceil(i / seatsPerRow),
        position: i % seatsPerRow || seatsPerRow,
        isOccupied: isOccupied,
        isSelected: false
      })
    }
    return seats
  }

  const [seats, setSeats] = useState(generateSeats())

  const handleSeatClick = (seatNumber) => {
    if (seats.find(s => s.number === seatNumber)?.isOccupied) return

    setSeats(prevSeats => {
      const newSeats = prevSeats.map(seat => {
        if (seat.number === seatNumber) {
          return { ...seat, isSelected: !seat.isSelected }
        }
        return seat
      })

      // Update selected seats in booking data
      const selectedSeats = newSeats.filter(seat => seat.isSelected).map(seat => seat.number)
      
      // Limit selection to number of passengers
      if (selectedSeats.length > bookingData.passengers) {
        // Remove oldest selection
        const seatToDeselect = selectedSeats[0]
        return newSeats.map(seat => 
          seat.number === seatToDeselect 
            ? { ...seat, isSelected: false }
            : seat
        )
      }

      setBookingData(prev => ({ ...prev, selectedSeats }))
      return newSeats
    })
  }

  const handlePassengerChange = (index, field, value) => {
    setBookingData(prev => ({
      ...prev,
      passengerInfo: prev.passengerInfo.map((passenger, i) => 
        i === index ? { ...passenger, [field]: value } : passenger
      )
    }))
  }

  const handlePassengerCountChange = (count) => {
    const newCount = Math.max(1, Math.min(count, trip.available))
    
    setBookingData(prev => ({
      ...prev,
      passengers: newCount,
      passengerInfo: Array(newCount).fill().map((_, i) => 
        prev.passengerInfo[i] || { name: '', phone: '', age: 'adulte' }
      ),
      selectedSeats: prev.selectedSeats.slice(0, newCount)
    }))

    // Update seat selection
    setSeats(prevSeats => 
      prevSeats.map((seat, index) => ({
        ...seat,
        isSelected: index < newCount && bookingData.selectedSeats.includes(seat.number)
      }))
    )
  }

  const canConfirm = () => {
    const selectedSeats = seats.filter(seat => seat.isSelected)
    const allPassengerInfoFilled = bookingData.passengerInfo.every(p => p.name.trim() && p.phone.trim())
    
    return selectedSeats.length === bookingData.passengers && allPassengerInfoFilled
  }

  const handleConfirm = () => {
    if (!canConfirm()) return

    const selectedSeats = seats.filter(seat => seat.isSelected).map(seat => seat.number)
    
    onConfirm({
      ...bookingData,
      selectedSeats
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold mb-2">Réservation de voyage</h2>
            <div className="flex items-center space-x-4 text-primary-100">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{trip.from} → {trip.to}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Départ {trip.departureTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>{trip.agency}</span>
              </div>
            </div>
          </div>

          <div className="flex h-[70vh]">
            {/* Left side - Seat selection */}
            <div className="flex-1 p-6 border-r border-gray-200 overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Sélection des sièges</h3>
              
              {/* Passenger count */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de passagers
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePassengerCountChange(bookingData.passengers - 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={bookingData.passengers <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-gray-100 rounded-lg font-medium">
                    {bookingData.passengers}
                  </span>
                  <button
                    onClick={() => handlePassengerCountChange(bookingData.passengers + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={bookingData.passengers >= trip.available}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Seat map */}
              <div className="mb-6">
                <div className="text-center mb-4">
                  <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-t-lg">
                    🚗 Conducteur
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                  {seats.map((seat) => (
                    <button
                      key={seat.number}
                      onClick={() => handleSeatClick(seat.number)}
                      disabled={seat.isOccupied}
                      className={`
                        w-10 h-10 rounded-lg border-2 text-xs font-medium transition-all duration-200
                        ${seat.isOccupied 
                          ? 'bg-red-100 border-red-300 text-red-600 cursor-not-allowed' 
                          : seat.isSelected
                          ? 'bg-primary-600 border-primary-600 text-white'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300'
                        }
                      `}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span>Libre</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary-600 rounded"></div>
                    <span>Sélectionné</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                    <span>Occupé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Passenger info */}
            <div className="w-96 p-6 overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Informations des passagers</h3>
              
              <div className="space-y-4">
                {bookingData.passengerInfo.map((passenger, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Passager {index + 1}
                      {bookingData.selectedSeats[index] && (
                        <span className="ml-2 text-sm text-primary-600">
                          (Siège {bookingData.selectedSeats[index]})
                        </span>
                      )}
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                          placeholder="Nom et prénom"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          value={passenger.phone}
                          onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                          placeholder="+237 6XX XXX XXX"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Âge
                        </label>
                        <select
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        >
                          <option value="enfant">Enfant (2-11 ans)</option>
                          <option value="adulte">Adulte (12+ ans)</option>
                          <option value="senior">Senior (60+ ans)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary-600">
                  {(trip.price * bookingData.passengers).toLocaleString()} FCFA
                </div>
                <div className="text-sm text-gray-600">
                  {bookingData.passengers} passager{bookingData.passengers > 1 ? 's' : ''} × {trip.price.toLocaleString()} FCFA
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!canConfirm()}
                  className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                    canConfirm()
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default BookingModal
