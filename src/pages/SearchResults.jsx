import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Filter, 
  SortDesc, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Bus,
  ArrowRight,
  Calendar
} from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import BookingModal from '../components/BookingModal'
import SearchSection from '../components/SearchSection'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('price')
  const [filterBy, setFilterBy] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  // Get search parameters
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const date = searchParams.get('date') || ''
  const time = searchParams.get('time') || ''
  const passengers = searchParams.get('passengers') || '1'

  const [localDate, setLocalDate] = useState(date)
  const [localTime, setLocalTime] = useState(time)

  // Real Cameroon agencies data
  const mockResults = [
    {
      id: 1,
      agency: 'Touristique Express',
      from: from || 'Yaoundé',
      to: to || 'Douala',
      departureTime: '07:00',
      arrivalTime: '10:30',
      duration: '3h30',
      price: 4500,
      available: 45,
      rating: 4.8,
      reviews: 856,
      amenities: ['WiFi', 'Climatisation', 'Toilettes', 'Business Class'],
      busType: 'VIP',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300',
      phone: '+237 6 96 24 79 16',
      location: 'Elig Essono, Yaoundé'
    },
    {
      id: 2,
      agency: 'Men Travel',
      from: from || 'Yaoundé',
      to: to || 'Douala',
      departureTime: '08:30',
      arrivalTime: '12:00',
      duration: '3h30',
      price: 3800,
      available: 38,
      rating: 4.5,
      reviews: 423,
      amenities: ['Climatisation', 'Service courrier', 'Confort'],
      busType: 'Standard',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300',
      phone: '+237 658 06 85 78',
      location: 'Nylon Bastos, Yaoundé'
    },
    {
      id: 3,
      agency: 'Garanti Express',
      from: from || 'Yaoundé',
      to: to || 'Douala',
      departureTime: '10:00',
      arrivalTime: '13:45',
      duration: '3h45',
      price: 3500,
      available: 32,
      rating: 4.3,
      reviews: 298,
      amenities: ['Climatisation', 'WiFi', 'Sécurité'],
      busType: 'Standard',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300',
      phone: '+237 6 77 08 41 08',
      location: 'Nsam, Yaoundé'
    },
    {
      id: 4,
      agency: 'Galaxie Voyage',
      from: from || 'Yaoundé',
      to: to || 'Douala',
      departureTime: '14:00',
      arrivalTime: '17:30',
      duration: '3h30',
      price: 4200,
      available: 25,
      rating: 4.7,
      reviews: 512,
      amenities: ['Climatisation', 'Confort premium', 'Ponctualité', 'Sécurité'],
      busType: 'VIP',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300',
      phone: '+237 6XX XX XX XX',
      location: 'Mvan, Yaoundé'
    },
    {
      id: 5,
      agency: 'Binam Voyages',
      from: from || 'Yaoundé',
      to: to || 'Bafoussam',
      departureTime: '09:00',
      arrivalTime: '13:30',
      duration: '4h30',
      price: 4000,
      available: 28,
      rating: 4.2,
      reviews: 187,
      amenities: ['Climatisation', 'Voyage Ouest', 'Confort'],
      busType: 'Standard',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300',
      phone: '+237 2 22 20 93 92',
      location: 'Rue des Manguiers, Yaoundé'
    },
    {
      id: 6,
      agency: 'Buca Voyages',
      from: from || 'Yaoundé',
      to: to || 'Ebolowa',
      departureTime: '11:00',
      arrivalTime: '14:00',
      duration: '3h00',
      price: 2800,
      available: 22,
      rating: 4.0,
      reviews: 145,
      amenities: ['Climatisation', 'Transport Sud'],
      busType: 'Standard',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300',
      phone: '+237 2 22 22 95 83',
      location: 'Mvan, Yaoundé'
    }
  ]

  const [results, setResults] = useState(mockResults)

  useEffect(() => {
    // Sort results
    const sorted = [...mockResults].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime)
        case 'duration':
          return a.duration.localeCompare(b.duration)
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    // Filter results by type and time
    const filtered = sorted.filter(result => {
      // Filter by bus type
      let typeMatch = true
      if (filterBy === 'vip') typeMatch = result.busType === 'VIP'
      else if (filterBy === 'standard') typeMatch = result.busType === 'Standard'
      else if (filterBy === 'luxe') typeMatch = result.busType === 'Luxe'

      // Filter by time if specified (use current time filter)
      const currentTimeFilter = localTime || time
      const timeMatch = isTimeInRange(result.departureTime, currentTimeFilter)

      return typeMatch && timeMatch
    })

    setResults(filtered)
  }, [sortBy, filterBy, localTime, time])

  const [selectedTrip, setSelectedTrip] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleBooking = (trip) => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour réserver')
      return
    }

    setSelectedTrip(trip)
    setIsBookingModalOpen(true)
  }

  const confirmBooking = (bookingDetails) => {
    const cartItem = {
      id: `trip_${selectedTrip.id}_${Date.now()}`,
      name: `${selectedTrip.from} → ${selectedTrip.to}`,
      description: `${selectedTrip.agency} - Départ ${selectedTrip.departureTime}`,
      price: selectedTrip.price * bookingDetails.passengers,
      image: selectedTrip.image,
      tripDetails: {
        ...selectedTrip,
        passengers: bookingDetails.passengers,
        selectedSeats: bookingDetails.selectedSeats,
        passengerInfo: bookingDetails.passengerInfo
      }
    }

    addItem(cartItem)
    setIsBookingModalOpen(false)
    setSelectedTrip(null)
    alert(`Voyage ajouté au panier ! ${bookingDetails.passengers} place(s) réservée(s).`)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTimeDisplay = (timeValue) => {
    if (timeValue === 'morning') return 'Matin (6h-12h)'
    if (timeValue === 'afternoon') return 'Après-midi (12h-18h)'
    if (timeValue === 'evening') return 'Soir (18h-23h)'
    if (timeValue.includes(':')) return timeValue
    return 'Toute la journée'
  }

  const isTimeInRange = (departureTime, timeFilter) => {
    if (!timeFilter) return true

    const [hours] = departureTime.split(':').map(Number)

    if (timeFilter === 'morning') return hours >= 6 && hours < 12
    if (timeFilter === 'afternoon') return hours >= 12 && hours < 18
    if (timeFilter === 'evening') return hours >= 18 && hours <= 23
    if (timeFilter.includes(':')) {
      const [filterHours] = timeFilter.split(':').map(Number)
      return Math.abs(hours - filterHours) <= 2 // ±2 heures de tolérance
    }

    return true
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-600 rounded-2xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-white font-semibold mb-4 text-center">
            Nouvelle recherche rapide
          </h3>
          <SearchSection isCompact={true} />
        </motion.div>

        {/* Search Summary with Edit Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-gray-900">
                  {from} → {to}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">
                  {date ? formatDate(date) : 'Date non spécifiée'}
                </span>
              </div>
              {time && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">
                    {getTimeDisplay(time)}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">
                  {passengers} passager{passengers > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">
                {results.length} voyage{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtres
              </h3>

              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full input-field"
                >
                  <option value="price">Prix croissant</option>
                  <option value="departure">Heure de départ</option>
                  <option value="duration">Durée du voyage</option>
                  <option value="rating">Note client</option>
                </select>
              </div>

              {/* Filter Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de bus
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Tous les types' },
                    { value: 'standard', label: 'Standard' },
                    { value: 'vip', label: 'VIP' },
                    { value: 'luxe', label: 'Luxe' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="busType"
                        value={option.value}
                        checked={filterBy === option.value}
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Changer la date
                </label>
                <input
                  type="date"
                  value={localDate}
                  onChange={(e) => {
                    setLocalDate(e.target.value)
                    const newParams = new URLSearchParams(window.location.search)
                    newParams.set('date', e.target.value)
                    window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`)
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full input-field text-sm"
                />
              </div>

              {/* Time Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure préférée
                </label>
                <select
                  value={localTime}
                  onChange={(e) => {
                    setLocalTime(e.target.value)
                    const newParams = new URLSearchParams(window.location.search)
                    if (e.target.value) {
                      newParams.set('time', e.target.value)
                    } else {
                      newParams.delete('time')
                    }
                    window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`)
                  }}
                  className="w-full input-field text-sm"
                >
                  <option value="">Toute la journée</option>
                  <option value="morning">Matin (6h-12h)</option>
                  <option value="afternoon">Après-midi (12h-18h)</option>
                  <option value="evening">Soir (18h-23h)</option>
                  <optgroup label="Heures spécifiques">
                    <option value="06:00">06:00</option>
                    <option value="07:00">07:00</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                  </optgroup>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fourchette de prix
                </label>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>De {Math.min(...results.map(r => r.price)).toLocaleString()} FCFA</p>
                  <p>À {Math.max(...results.map(r => r.price)).toLocaleString()} FCFA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {results.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="grid md:grid-cols-4 gap-6 items-center">
                      {/* Trip Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={trip.image}
                            alt={trip.agency}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {trip.agency}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">
                                {trip.rating} ({trip.reviews} avis)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-lg font-semibold">
                          <span>{trip.departureTime}</span>
                          <div className="flex-1 flex items-center">
                            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                            <Bus className="w-5 h-5 text-primary-600" />
                            <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                            <div className="w-2 h-2 bg-secondary-600 rounded-full"></div>
                          </div>
                          <span>{trip.arrivalTime}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                          <span>{trip.from}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{trip.duration}</span>
                          </div>
                          <span>{trip.to}</span>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <div className="mb-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            trip.busType === 'Luxe' ? 'bg-purple-100 text-purple-800' :
                            trip.busType === 'VIP' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {trip.busType}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {trip.amenities.slice(0, 3).map(amenity => (
                            <div key={amenity} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {amenity}
                            </div>
                          ))}
                          {trip.amenities.length > 3 && (
                            <div className="text-sm text-primary-600">
                              +{trip.amenities.length - 3} autres
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {trip.available} places disponibles
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="text-center">
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-primary-600">
                            {trip.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">FCFA par personne</div>
                        </div>

                        <motion.button
                          onClick={() => handleBooking(trip)}
                          className="w-full btn-primary flex items-center justify-center space-x-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Réserver</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>

                        <p className="text-xs text-gray-500 mt-2">
                          Confirmation instantanée
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun voyage trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="btn-primary"
                >
                  Modifier la recherche
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Booking Modal */}
        {isBookingModalOpen && selectedTrip && (
          <BookingModal
            trip={selectedTrip}
            isOpen={isBookingModalOpen}
            onClose={() => {
              setIsBookingModalOpen(false)
              setSelectedTrip(null)
            }}
            onConfirm={confirmBooking}
            passengers={parseInt(passengers)}
          />
        )}
      </div>
    </div>
  )
}

export default SearchResults
