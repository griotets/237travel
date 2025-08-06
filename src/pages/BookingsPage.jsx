import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Bus,
  Star,
  Download,
  MessageSquare,
  MoreVertical,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock bookings data
  const bookings = [
    {
      id: 'EJT001',
      agency: 'Touristique Express',
      from: 'Yaoundé',
      to: 'Douala',
      date: '2024-01-25',
      departureTime: '07:00',
      arrivalTime: '10:30',
      duration: '3h30',
      price: 4500,
      passengers: 2,
      seats: ['A12', 'A13'],
      status: 'confirmed',
      busType: 'VIP',
      rating: null,
      bookingDate: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300'
    },
    {
      id: 'EJT002',
      agency: 'Men Travel',
      from: 'Yaoundé',
      to: 'Kribi',
      date: '2024-01-10',
      departureTime: '08:30',
      arrivalTime: '11:00',
      duration: '2h30',
      price: 3200,
      passengers: 1,
      seats: ['B08'],
      status: 'completed',
      busType: 'Standard',
      rating: 4.5,
      bookingDate: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300'
    },
    {
      id: 'EJT003',
      agency: 'Galaxie Voyage',
      from: 'Douala',
      to: 'Bafoussam',
      date: '2024-02-01',
      departureTime: '14:00',
      arrivalTime: '18:30',
      duration: '4h30',
      price: 4000,
      passengers: 1,
      seats: ['C15'],
      status: 'upcoming',
      busType: 'VIP',
      rating: null,
      bookingDate: '2024-01-20',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300'
    },
    {
      id: 'EJT004',
      agency: 'Buca Voyages',
      from: 'Yaoundé',
      to: 'Ebolowa',
      date: '2023-12-15',
      departureTime: '11:00',
      arrivalTime: '14:00',
      duration: '3h00',
      price: 2800,
      passengers: 3,
      seats: ['D05', 'D06', 'D07'],
      status: 'cancelled',
      busType: 'Standard',
      rating: null,
      bookingDate: '2023-12-10',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300'
    }
  ]

  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: CheckCircle,
          label: 'Confirmé'
        }
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: 'Terminé'
        }
      case 'upcoming':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: AlertCircle,
          label: 'À venir'
        }
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          label: 'Annulé'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: AlertCircle,
          label: 'Inconnu'
        }
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab
    const matchesSearch = booking.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const tabs = [
    { id: 'all', name: 'Tous', count: bookings.length },
    { id: 'upcoming', name: 'À venir', count: bookings.filter(b => b.status === 'upcoming').length },
    { id: 'confirmed', name: 'Confirmés', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'completed', name: 'Terminés', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', name: 'Annulés', count: bookings.filter(b => b.status === 'cancelled').length }
  ]

  const handleRateTrip = (bookingId) => {
    alert(`Noter le voyage ${bookingId}`)
  }

  const handleDownloadTicket = (bookingId) => {
    alert(`Télécharger le billet ${bookingId}`)
  }

  const handleContactSupport = (bookingId) => {
    alert(`Contacter le support pour ${bookingId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Mes réservations</h1>
          <p className="text-gray-600 mt-2">
            Gérez tous vos voyages et réservations
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par agence, destination ou numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune réservation trouvée
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Essayez de modifier vos critères de recherche' : 'Vous n\'avez pas encore de réservations'}
              </p>
            </motion.div>
          ) : (
            filteredBookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status)
              const StatusIcon = statusConfig.icon

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Trip Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={booking.image}
                          alt={booking.agency}
                          className="w-24 h-24 lg:w-20 lg:h-20 rounded-xl object-cover"
                        />
                      </div>

                      {/* Trip Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {booking.from} → {booking.to}
                            </h3>
                            <p className="text-gray-600">{booking.agency}</p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </span>
                            
                            <div className="relative">
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              {new Date(booking.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              {booking.departureTime} - {booking.arrivalTime}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              Places: {booking.seats.join(', ')}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">
                              {booking.passengers} passager{booking.passengers > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                              Réservation #{booking.id}
                            </span>
                            <span className="text-sm text-gray-600">
                              Réservé le {new Date(booking.bookingDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">
                              {(booking.price * booking.passengers).toLocaleString()} FCFA
                            </div>
                            <div className="text-sm text-gray-600">
                              {booking.price.toLocaleString()} FCFA/pers.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-3">
                        {booking.status === 'completed' && !booking.rating && (
                          <button
                            onClick={() => handleRateTrip(booking.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                          >
                            <Star className="w-4 h-4" />
                            <span>Noter ce voyage</span>
                          </button>
                        )}
                        
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => handleDownloadTicket(booking.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-lg hover:bg-primary-200 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span>Télécharger le billet</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleContactSupport(booking.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Contacter le support</span>
                        </button>

                        {booking.rating && (
                          <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                            <Star className="w-4 h-4 fill-current" />
                            <span>Note donnée: {booking.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Summary Stats */}
        {filteredBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Résumé de vos voyages
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {bookings.filter(b => b.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Voyages terminés</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {bookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length}
                </div>
                <div className="text-sm text-gray-600">Voyages à venir</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {bookings.reduce((sum, b) => sum + (b.price * b.passengers), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total dépensé (FCFA)</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {[...new Set(bookings.map(b => b.to))].length}
                </div>
                <div className="text-sm text-gray-600">Villes visitées</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
