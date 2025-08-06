import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Bus,
  Users,
  Award,
  Clock,
  Filter
} from 'lucide-react'

const AgenciesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const agencies = [
    {
      id: 1,
      name: "Guarantee Express",
      description: "Leader du transport interurbain au Cameroun depuis 1990. Spécialisé dans les liaisons Yaoundé-Douala avec des services VIP.",
      rating: 4.8,
      reviews: 2340,
      founded: 1990,
      vehicles: 85,
      routes: 120,
      headquarters: "Yaoundé",
      regions: ["Centre", "Littoral", "Ouest"],
      phone: "+237 677 123 456",
      email: "info@guarantee-express.cm",
      website: "www.guarantee-express.cm",
      specialties: ["Transport VIP", "Liaisons rapides", "Service nuit"],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      logo: "https://ui-avatars.com/api/?name=Guarantee+Express&background=7c3aed&color=fff&size=100"
    },
    {
      id: 2,
      name: "Central Voyage",
      description: "Compagnie de transport moderne offrant des services premium à travers tout le Cameroun. Connue pour son confort et sa ponctualité.",
      rating: 4.6,
      reviews: 1890,
      founded: 1995,
      vehicles: 67,
      routes: 95,
      headquarters: "Douala",
      regions: ["Littoral", "Centre", "Sud-Ouest", "Ouest"],
      phone: "+237 678 234 567",
      email: "contact@central-voyage.cm",
      website: "www.central-voyage.cm",
      specialties: ["Transport luxe", "Climatisation", "Wifi gratuit"],
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400",
      logo: "https://ui-avatars.com/api/?name=Central+Voyage&background=f97316&color=fff&size=100"
    },
    {
      id: 3,
      name: "Alliance Voyage",
      description: "Réseau national de transport avec la plus large couverture du territoire camerounais. Service fiable et abordable.",
      rating: 4.7,
      reviews: 3120,
      founded: 1985,
      vehicles: 120,
      routes: 200,
      headquarters: "Yaoundé",
      regions: ["Centre", "Nord", "Extrême-Nord", "Adamaoua", "Est"],
      phone: "+237 679 345 678",
      email: "info@alliance-voyage.cm",
      website: "www.alliance-voyage.cm",
      specialties: ["Couverture nationale", "Prix compétitifs", "Transport marchandises"],
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400",
      logo: "https://ui-avatars.com/api/?name=Alliance+Voyage&background=059669&color=fff&size=100"
    },
    {
      id: 4,
      name: "Musango Express",
      description: "Spécialiste des liaisons Nord-Sud du Cameroun. Pionnier du transport écologique avec des véhicules modernes.",
      rating: 4.5,
      reviews: 1560,
      founded: 2000,
      vehicles: 55,
      routes: 88,
      headquarters: "Garoua",
      regions: ["Nord", "Extrême-Nord", "Adamaoua", "Centre"],
      phone: "+237 680 456 789",
      email: "contact@musango-express.cm",
      website: "www.musango-express.cm",
      specialties: ["Transport écologique", "Liaisons Nord-Sud", "Bagages sécurisés"],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      logo: "https://ui-avatars.com/api/?name=Musango+Express&background=dc2626&color=fff&size=100"
    },
    {
      id: 5,
      name: "Prestige Transport",
      description: "Service haut de gamme pour une clientèle exigeante. Véhicules de luxe et service personnalisé.",
      rating: 4.9,
      reviews: 980,
      founded: 2010,
      vehicles: 35,
      routes: 45,
      headquarters: "Douala",
      regions: ["Littoral", "Centre", "Sud-Ouest"],
      phone: "+237 681 567 890",
      email: "info@prestige-transport.cm",
      website: "www.prestige-transport.cm",
      specialties: ["Transport de luxe", "Service VIP", "Véhicules neufs"],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      logo: "https://ui-avatars.com/api/?name=Prestige+Transport&background=7c2d12&color=fff&size=100"
    },
    {
      id: 6,
      name: "Buca Voyage",
      description: "Agence locale spécialisée dans les régions de l'Ouest et du Nord-Ouest. Service personnalisé et tarifs attractifs.",
      rating: 4.3,
      reviews: 1230,
      founded: 1992,
      vehicles: 42,
      routes: 65,
      headquarters: "Bamenda",
      regions: ["Nord-Ouest", "Ouest", "Centre"],
      phone: "+237 682 678 901",
      email: "contact@buca-voyage.cm",
      website: "www.buca-voyage.cm",
      specialties: ["Régions montagneuses", "Transport local", "Prix abordables"],
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400",
      logo: "https://ui-avatars.com/api/?name=Buca+Voyage&background=2563eb&color=fff&size=100"
    }
  ]

  const regions = ["Toutes", "Centre", "Littoral", "Ouest", "Nord", "Sud", "Est", "Adamaoua", "Nord-Ouest", "Sud-Ouest", "Extrême-Nord"]

  const filteredAgencies = agencies
    .filter(agency => {
      const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agency.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRegion = selectedRegion === '' || selectedRegion === 'Toutes' || 
                           agency.regions.includes(selectedRegion)
      return matchesSearch && matchesRegion
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        case 'routes':
          return b.routes - a.routes
        case 'vehicles':
          return b.vehicles - a.vehicles
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Agences Partenaires
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les meilleures agences de transport du Cameroun. 
            Plus de 50 partenaires certifiés pour vos voyages en toute sécurité.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une agence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                {regions.map(region => (
                  <option key={region} value={region === 'Toutes' ? '' : region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="rating">Trier par note</option>
                <option value="name">Trier par nom</option>
                <option value="routes">Trier par nb. de lignes</option>
                <option value="vehicles">Trier par nb. de véhicules</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredAgencies.length} agence{filteredAgencies.length > 1 ? 's' : ''} trouvée{filteredAgencies.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Agencies Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredAgencies.map((agency, index) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={agency.image}
                  alt={agency.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Logo */}
                <div className="absolute top-4 left-4">
                  <img
                    src={agency.logo}
                    alt={`${agency.name} logo`}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{agency.rating}</span>
                    <span className="text-sm text-gray-600">({agency.reviews})</span>
                  </div>
                </div>

                {/* Founded year */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  Depuis {agency.founded}
                </div>
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {agency.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {agency.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bus className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">{agency.vehicles}</div>
                    <div className="text-sm text-gray-600">Véhicules</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">{agency.routes}</div>
                    <div className="text-sm text-gray-600">Lignes</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Award className="w-6 h-6 text-primary-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">{agency.regions.length}</div>
                    <div className="text-sm text-gray-600">Régions</div>
                  </div>
                </div>

                {/* Regions */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Régions desservies</h4>
                  <div className="flex flex-wrap gap-2">
                    {agency.regions.map(region => (
                      <span
                        key={region}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Spécialités</h4>
                  <div className="flex flex-wrap gap-2">
                    {agency.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{agency.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mt-4">
                    <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Voir les voyages
                    </button>
                    <button className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-2 px-4 rounded-lg transition-colors">
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No results */}
        {filteredAgencies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune agence trouvée
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AgenciesPage
