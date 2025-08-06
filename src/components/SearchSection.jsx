import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, ArrowLeftRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SearchSection = ({ isCompact = false }) => {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '1'
  })

  const cameroonCities = [
    'Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua', 
    'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi', 'Limbe', 'Buea',
    'Kumba', 'Foumban', 'Dschang', 'Tiko', 'Edéa', 'Sangmélima'
  ]

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSwapCities = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchData.from || !searchData.to || !searchData.date) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Navigate to search results with query parameters
    const queryParams = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      date: searchData.date,
      time: searchData.time,
      passengers: searchData.passengers
    })

    navigate(`/search?${queryParams.toString()}`)
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const setToday = () => {
    handleInputChange('date', getTodayDate())
  }

  const setTomorrow = () => {
    handleInputChange('date', getTomorrowDate())
  }

  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                list="from-cities-compact"
                value={searchData.from}
                onChange={(e) => handleInputChange('from', e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white"
                placeholder="Départ"
                required
              />
              <datalist id="from-cities-compact">
                {cameroonCities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            <div>
              <input
                type="text"
                list="to-cities-compact"
                value={searchData.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white"
                placeholder="Destination"
                required
              />
              <datalist id="to-cities-compact">
                {cameroonCities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="date"
              value={searchData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={getTodayDate()}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white"
              required
            />
            <select
              value={searchData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white"
            >
              <option value="" className="text-gray-900">Toute heure</option>
              <option value="morning" className="text-gray-900">Matin</option>
              <option value="afternoon" className="text-gray-900">Après-midi</option>
              <option value="evening" className="text-gray-900">Soir</option>
              <option value="06:00" className="text-gray-900">06:00</option>
              <option value="08:00" className="text-gray-900">08:00</option>
              <option value="10:00" className="text-gray-900">10:00</option>
              <option value="12:00" className="text-gray-900">12:00</option>
              <option value="14:00" className="text-gray-900">14:00</option>
              <option value="16:00" className="text-gray-900">16:00</option>
              <option value="18:00" className="text-gray-900">18:00</option>
              <option value="20:00" className="text-gray-900">20:00</option>
            </select>
            <select
              value={searchData.passengers}
              onChange={(e) => handleInputChange('passengers', e.target.value)}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num} className="text-gray-900">
                  {num} passager{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Rechercher</span>
          </button>
        </form>
      </motion.div>
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4">
            Trouvez votre voyage idéal
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comparez les prix et horaires des meilleures agences de transport au Cameroun
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            {/* From/To Section */}
            <div className="grid md:grid-cols-2 gap-4 relative">
              {/* From */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Ville de départ
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
                  <input
                    type="text"
                    list="from-cities"
                    value={searchData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className="input-field pl-10 text-lg"
                    placeholder="Choisir une ville"
                    required
                  />
                  <datalist id="from-cities">
                    {cameroonCities.map(city => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Swap Button */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                <motion.button
                  type="button"
                  onClick={handleSwapCities}
                  className="bg-white border-2 border-primary-200 hover:border-primary-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeftRight className="w-5 h-5 text-primary-600" />
                </motion.button>
              </div>

              {/* To */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Ville d'arrivée
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500 w-5 h-5" />
                  <input
                    type="text"
                    list="to-cities"
                    value={searchData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className="input-field pl-10 text-lg"
                    placeholder="Choisir une destination"
                    required
                  />
                  <datalist id="to-cities">
                    {cameroonCities.map(city => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            {/* Date, Time and Passengers */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Date de voyage
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={getTodayDate()}
                    className="input-field pl-10 text-lg"
                    required
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={setToday}
                    className="text-xs px-3 py-1 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 transition-colors"
                  >
                    Aujourd'hui
                  </button>
                  <button
                    type="button"
                    onClick={setTomorrow}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Demain
                  </button>
                </div>
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Heure préférée (optionnel)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
                  <select
                    value={searchData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="input-field pl-10 text-lg"
                  >
                    <option value="">Toute la journée</option>
                    <option value="morning">Matin (6h-12h)</option>
                    <option value="afternoon">Après-midi (12h-18h)</option>
                    <option value="evening">Soir (18h-23h)</option>
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
                  </select>
                </div>
              </div>

              {/* Passengers */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Nombre de passagers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
                  <select
                    value={searchData.passengers}
                    onChange={(e) => handleInputChange('passengers', e.target.value)}
                    className="input-field pl-10 text-lg"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <option key={num} value={num}>
                        {num} passager{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              className="w-full btn-primary text-xl py-4 flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-6 h-6" />
              <span>Rechercher des voyages</span>
            </motion.button>
          </form>

          {/* Quick Options */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-4">Trajets populaires :</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { from: 'Yaoundé', to: 'Douala' },
                    { from: 'Douala', to: 'Bafoussam' },
                    { from: 'Yaoundé', to: 'Ngaoundéré' },
                    { from: 'Douala', to: 'Bamenda' }
                  ].map((route, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        handleInputChange('from', route.from)
                        handleInputChange('to', route.to)
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-600 rounded-lg text-sm font-medium transition-colors border border-gray-200 hover:border-primary-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {route.from} → {route.to}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-4">Horaires populaires :</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'morning', label: 'Matin' },
                    { value: '08:00', label: '8h00' },
                    { value: '14:00', label: '14h00' },
                    { value: 'evening', label: 'Soir' }
                  ].map((timeOption, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleInputChange('time', timeOption.value)}
                      className="px-4 py-2 bg-gray-100 hover:bg-secondary-50 text-gray-700 hover:text-secondary-600 rounded-lg text-sm font-medium transition-colors border border-gray-200 hover:border-secondary-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {timeOption.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Recherche simple</h4>
                <p className="text-sm text-gray-600">Trouvez rapidement</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-secondary-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Tout le Cameroun</h4>
                <p className="text-sm text-gray-600">10 régions couvertes</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Agences fiables</h4>
                <p className="text-sm text-gray-600">Partenaires vérifiés</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SearchSection
