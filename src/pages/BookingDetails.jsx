import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  CreditCard,
  Phone,
  User,
  Calendar,
  Bus,
  Shield,
  CheckCircle
} from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const BookingDetails = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  // Get trip data from URL params
  const tripData = {
    id: searchParams.get('id'),
    agency: searchParams.get('agency'),
    from: searchParams.get('from'),
    to: searchParams.get('to'),
    departureTime: searchParams.get('departure'),
    arrivalTime: searchParams.get('arrival'),
    duration: searchParams.get('duration'),
    price: parseInt(searchParams.get('price')),
    available: parseInt(searchParams.get('available')),
    rating: parseFloat(searchParams.get('rating')),
    busType: searchParams.get('busType'),
    date: searchParams.get('date')
  }

  const [bookingData, setBookingData] = useState({
    passengers: 1,
    selectedSeats: [],
    passengerInfo: [{
      name: '',
      phone: '',
      age: 'adulte'
    }]
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [seats, setSeats] = useState([])

  // Generate seat layout
  useEffect(() => {
    const generateSeats = () => {
      const seatArray = []
      const totalSeats = 50
      const seatsPerRow = 4
      
      for (let i = 1; i <= totalSeats; i++) {
        const isOccupied = Math.random() < (totalSeats - tripData.available) / totalSeats
        seatArray.push({
          number: i,
          row: Math.ceil(i / seatsPerRow),
          position: i % seatsPerRow || seatsPerRow,
          isOccupied: isOccupied,
          isSelected: false
        })
      }
      return seatArray
    }
    
    setSeats(generateSeats())
  }, [tripData.available])

  const handleSeatClick = (seatNumber) => {
    if (seats.find(s => s.number === seatNumber)?.isOccupied) return

    setSeats(prevSeats => {
      const newSeats = prevSeats.map(seat => {
        if (seat.number === seatNumber) {
          return { ...seat, isSelected: !seat.isSelected }
        }
        return seat
      })

      const selectedSeats = newSeats.filter(seat => seat.isSelected).map(seat => seat.number)
      setBookingData(prev => ({
        ...prev,
        selectedSeats
      }))

      return newSeats
    })
  }

  const handlePassengerInfoChange = (index, field, value) => {
    setBookingData(prev => ({
      ...prev,
      passengerInfo: prev.passengerInfo.map((passenger, i) => 
        i === index ? { ...passenger, [field]: value } : passenger
      )
    }))
  }

  const addPassenger = () => {
    if (bookingData.passengers < 9) {
      setBookingData(prev => ({
        ...prev,
        passengers: prev.passengers + 1,
        passengerInfo: [...prev.passengerInfo, { name: '', phone: '', age: 'adulte' }]
      }))
    }
  }

  const removePassenger = () => {
    if (bookingData.passengers > 1) {
      setBookingData(prev => ({
        ...prev,
        passengers: prev.passengers - 1,
        passengerInfo: prev.passengerInfo.slice(0, -1)
      }))
    }
  }

  const handleConfirmBooking = () => {
    const cartItem = {
      id: `trip_${tripData.id}_${Date.now()}`,
      name: `${tripData.from} → ${tripData.to}`,
      description: `${tripData.agency} - Départ ${tripData.departureTime}`,
      price: tripData.price * bookingData.passengers,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300',
      tripDetails: {
        ...tripData,
        passengers: bookingData.passengers,
        selectedSeats: bookingData.selectedSeats,
        passengerInfo: bookingData.passengerInfo
      }
    }

    addItem(cartItem)
    navigate('/search?booking=success')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connexion requise
          </h2>
          <p className="text-gray-600 mb-6">
            Veuillez vous connecter pour effectuer une réservation
          </p>
          <button
            onClick={() => navigate('/search')}
            className="btn-primary"
          >
            Retour à la recherche
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux résultats
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Réservation de voyage
          </h1>
          <p className="text-gray-600 mt-2">
            Finalisez votre réservation pour votre voyage
          </p>
        </div>

        {/* Steps indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${
                    currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-sm">
            <span className="text-gray-600">Détails</span>
            <span className="text-gray-600">Places</span>
            <span className="text-gray-600">Paiement</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Détails du voyage
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Bus className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{tripData.agency}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{tripData.rating}</span>
                        <span>•</span>
                        <span>{tripData.busType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      {tripData.price?.toLocaleString()} FCFA
                    </div>
                    <div className="text-sm text-gray-600">par personne</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{tripData.from} → {tripData.to}</div>
                      <div className="text-sm text-gray-600">Trajet</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{tripData.departureTime} - {tripData.arrivalTime}</div>
                      <div className="text-sm text-gray-600">Durée: {tripData.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{tripData.date}</div>
                      <div className="text-sm text-gray-600">Date de voyage</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{tripData.available} places</div>
                      <div className="text-sm text-gray-600">Disponibles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Passenger Info */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Informations des passagers
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nombre de passagers
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={removePassenger}
                      disabled={bookingData.passengers <= 1}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold">{bookingData.passengers}</span>
                    <button
                      onClick={addPassenger}
                      disabled={bookingData.passengers >= 9}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {bookingData.passengerInfo.map((passenger, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Passager {index + 1}
                      </h4>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            value={passenger.name}
                            onChange={(e) => handlePassengerInfoChange(index, 'name', e.target.value)}
                            className="input-field"
                            placeholder="Ex: Jean Dupont"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone *
                          </label>
                          <input
                            type="tel"
                            value={passenger.phone}
                            onChange={(e) => handlePassengerInfoChange(index, 'phone', e.target.value)}
                            className="input-field"
                            placeholder="+237 6XX XXX XXX"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Catégorie
                          </label>
                          <select
                            value={passenger.age}
                            onChange={(e) => handlePassengerInfoChange(index, 'age', e.target.value)}
                            className="input-field"
                          >
                            <option value="adulte">Adulte</option>
                            <option value="enfant">Enfant (3-12 ans)</option>
                            <option value="senior">Senior (+60 ans)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={bookingData.passengerInfo.some(p => !p.name || !p.phone)}
                    className="btn-primary disabled:opacity-50"
                  >
                    Choisir les places
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Seat Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Sélection des places
                </h3>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-500 rounded"></div>
                        <span>Disponible</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary-600 rounded"></div>
                        <span>Sélectionné</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        <span>Occupé</span>
                      </div>
                    </div>
                    <div>
                      Places sélectionnées: {bookingData.selectedSeats.length}/{bookingData.passengers}
                    </div>
                  </div>

                  {/* Bus layout */}
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs mx-auto">
                    <div className="text-center mb-4 text-sm font-medium text-gray-700">
                      Avant du bus
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {seats.map((seat) => (
                        <button
                          key={seat.number}
                          onClick={() => handleSeatClick(seat.number)}
                          disabled={seat.isOccupied || (bookingData.selectedSeats.length >= bookingData.passengers && !seat.isSelected)}
                          className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                            seat.isOccupied
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : seat.isSelected
                              ? 'bg-primary-600 text-white'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {seat.number}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn-outline"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={bookingData.selectedSeats.length !== bookingData.passengers}
                    className="btn-primary disabled:opacity-50"
                  >
                    Confirmer les places
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Confirmation et paiement
                </h3>

                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-900">Réservation prête</h4>
                        <p className="text-sm text-green-700">
                          Vos informations sont complètes et vos places sont sélectionnées
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Résumé de la réservation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Passagers:</span>
                        <span>{bookingData.passengers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Places sélectionnées:</span>
                        <span>{bookingData.selectedSeats.join(', ')}</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>{(tripData.price * bookingData.passengers).toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-900">Paiement sécurisé</h4>
                        <p className="text-sm text-blue-700">
                          Le paiement sera traité au moment de l'embarquement ou via Mobile Money
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-outline"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="btn-primary"
                  >
                    Confirmer la réservation
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Récapitulatif
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Trajet:</span>
                  <span className="font-medium">{tripData.from} → {tripData.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{tripData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heure:</span>
                  <span className="font-medium">{tripData.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passagers:</span>
                  <span className="font-medium">{bookingData.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix unitaire:</span>
                  <span className="font-medium">{tripData.price?.toLocaleString()} FCFA</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600">
                    {(tripData.price * bookingData.passengers).toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Support client</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Besoin d'aide ? Contactez notre équipe
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-primary-600" />
                  <span className="text-primary-600">+237 6XX XXX XXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails
