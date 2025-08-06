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
    // Compagnies de Transport Interurbain
    {
      id: 1,
      name: "Touristique Express",
      description: "Une compagnie majeure au Cameroun, reconnue pour ses bus climatisés, équipés de toilettes, et le respect des horaires. Propose des services Business Class et Master Class.",
      rating: 4.8,
      reviews: 2340,
      founded: 1990,
      vehicles: 85,
      routes: 120,
      headquarters: "Elig Essono, Yaoundé",
      regions: ["Centre", "Littoral", "Ouest"],
      phone: "+237 6 96 24 79 16",
      email: "info@touristique.cm",
      website: "https://www.touristique.cm/",
      specialties: ["Business Class", "Master Class", "Respect des horaires", "Bus climatisés"],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      logo: "https://ui-avatars.com/api/?name=Touristique+Express&background=7c3aed&color=fff&size=100"
    },
    {
      id: 2,
      name: "Men Travel",
      description: "Fondée en Mai 2019, cette compagnie offre des bus confortables pour les liaisons Yaoundé-Douala-Kribi. Services incluent la vente de tickets, la location de bus et le service courrier.",
      rating: 4.5,
      reviews: 890,
      founded: 2019,
      vehicles: 45,
      routes: 80,
      headquarters: "Nylon Bastos, Yaoundé",
      regions: ["Centre", "Littoral", "Sud"],
      phone: "+237 658 06 85 78",
      email: "contact@mentravel.cm",
      website: "https://mentravel.cm/",
      specialties: ["Yaoundé-Douala-Kribi", "Service courrier", "Location de bus"],
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400",
      logo: "https://ui-avatars.com/api/?name=Men+Travel&background=f97316&color=fff&size=100"
    },
    {
      id: 3,
      name: "Jully Voyages",
      description: "Créée en 1977, c'est une agence historique. Elle propose la vente de billets d'avion, la location de voitures, l'organisation de rencontres, l'hébergement et l'assistance aux formalités de voyage.",
      rating: 4.7,
      reviews: 1650,
      founded: 1977,
      vehicles: 60,
      routes: 90,
      headquarters: "Avenue Mvog Fouda, Elig Essono, Yaoundé",
      regions: ["Centre", "Littoral", "Sud", "Ouest"],
      phone: "+237 2 22 22 14 48",
      email: "info@jully-voyages.com",
      website: "https://www.jully-voyages.com/",
      specialties: ["Agence historique", "Billets d'avion", "Hébergement", "Formalités voyage"],
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400",
      logo: "https://ui-avatars.com/api/?name=Jully+Voyages&background=059669&color=fff&size=100"
    },
    {
      id: 4,
      name: "Garanti Express",
      description: "A fait des progrès avec des bus récents et climatisés. Service fiable pour vos déplacements interurbains.",
      rating: 4.3,
      reviews: 890,
      founded: 2000,
      vehicles: 40,
      routes: 60,
      headquarters: "Nsam, Yaoundé",
      regions: ["Centre", "Littoral", "Ouest"],
      phone: "+237 6 77 08 41 08",
      email: "contact@garantiexpress.cm",
      website: "www.garantiexpress.cm",
      specialties: ["Bus récents", "Climatisation", "Service fiable"],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      logo: "https://ui-avatars.com/api/?name=Garanti+Express&background=dc2626&color=fff&size=100"
    },
    {
      id: 5,
      name: "Binam Voyages",
      description: "Propose des voyages vers l'Ouest du Cameroun, notamment Bafoussam. Service spécialisé dans cette région.",
      rating: 4.2,
      reviews: 650,
      founded: 1995,
      vehicles: 35,
      routes: 45,
      headquarters: "Rue des Manguiers, Yaoundé",
      regions: ["Centre", "Ouest"],
      phone: "+237 2 22 20 93 92",
      email: "contact@binamvoyages.cm",
      website: "www.binamvoyages.cm",
      specialties: ["Ouest Cameroun", "Bafoussam", "Région spécialisée"],
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400",
      logo: "https://ui-avatars.com/api/?name=Binam+Voyages&background=2563eb&color=fff&size=100"
    },
    {
      id: 6,
      name: "Buca Voyages",
      description: "Propose des trajets, notamment vers Ebolowa. Service de transport vers le Sud du Cameroun.",
      rating: 4.0,
      reviews: 420,
      founded: 1998,
      vehicles: 25,
      routes: 35,
      headquarters: "Mvan, Yaoundé",
      regions: ["Centre", "Sud"],
      phone: "+237 2 22 22 95 83",
      email: "contact@bucavoyages.cm",
      website: "www.bucavoyages.cm",
      specialties: ["Ebolowa", "Sud Cameroun", "Transport régional"],
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400",
      logo: "https://ui-avatars.com/api/?name=Buca+Voyages&background=7c2d12&color=fff&size=100"
    },
    {
      id: 7,
      name: "Pauline Voyages",
      description: "Axée sur l'axe routier Ebolowa/Yaoundé, en passant par Mbalmayo. Service spécialisé Sud-Centre.",
      rating: 4.1,
      reviews: 380,
      founded: 2005,
      vehicles: 20,
      routes: 25,
      headquarters: "MVILA, Yaoundé",
      regions: ["Centre", "Sud"],
      phone: "+237 6XX XX XX XX",
      email: "contact@paulinevoyages.cm",
      website: "www.paulinevoyages.cm",
      specialties: ["Ebolowa-Yaoundé", "Mbalmayo", "Axe Sud-Centre"],
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400",
      logo: "https://ui-avatars.com/api/?name=Pauline+Voyages&background=059669&color=fff&size=100"
    },
    {
      id: 8,
      name: "Galaxie Voyage",
      description: "Réputée pour son service de qualité, la sécurité, le confort et la ponctualité. Une référence en matière de transport.",
      rating: 4.7,
      reviews: 980,
      founded: 1985,
      vehicles: 50,
      routes: 70,
      headquarters: "Mvan, Yaoundé",
      regions: ["Centre", "Littoral", "Ouest", "Sud"],
      phone: "+237 6XX XX XX XX",
      email: "contact@galaxievoyage.cm",
      website: "www.galaxievoyage.cm",
      specialties: ["Service qualité", "Sécurité", "Confort", "Ponctualité"],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      logo: "https://ui-avatars.com/api/?name=Galaxie+Voyage&background=7c3aed&color=fff&size=100"
    },
    // Tours Opérateurs et Agences de Voyages
    {
      id: 9,
      name: "Global Bush Travel",
      description: "Tour-opérateur spécialisé dans l'organisation d'expériences authentiques en Afrique. Réservations d'hôtels, billets d'avion, location de voitures, guides touristiques.",
      rating: 4.6,
      reviews: 750,
      founded: 2010,
      vehicles: 30,
      routes: 40,
      headquarters: "Bastos, Yaoundé",
      regions: ["Toutes régions"],
      phone: "+237 677 246 624",
      email: "info@globalbushtratour.com",
      website: "https://www.globalbushtratour.com/",
      specialties: ["Tours Afrique", "Hôtels", "Billets avion", "Guides touristiques"],
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400",
      logo: "https://ui-avatars.com/api/?name=Global+Bush+Travel&background=f97316&color=fff&size=100"
    },
    {
      id: 10,
      name: "Aigle Voyages",
      description: "Fondée en 1995, offre des forfaits complets : location de véhicules, réservations d'hôtels, organisation de circuits et séminaires, vente de billets d'avion.",
      rating: 4.4,
      reviews: 1200,
      founded: 1995,
      vehicles: 40,
      routes: 50,
      headquarters: "Rue Valery Giscard d'Estaing, Centre ville, Yaoundé",
      regions: ["Toutes régions"],
      phone: "+237 2 22 23 33 79",
      email: "contact@aiglevoyages.cm",
      website: "www.aiglevoyages.cm",
      specialties: ["Forfaits complets", "Séminaires", "Circuits", "Location véhicules"],
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400",
      logo: "https://ui-avatars.com/api/?name=Aigle+Voyages&background=dc2626&color=fff&size=100"
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
