import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Star,
  ArrowRight,
  Clock,
  Shield,
  Award,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SearchSection from '../components/SearchSection'

const Home = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])

  // Vraies agences de voyage camerounaises
  const topAgencies = [
    {
      id: 1,
      name: "Touristique Express",
      description: "Compagnie majeure reconnue pour ses bus climatisés et le respect des horaires",
      rating: 4.8,
      routes: 120,
      vehicles: 85,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      speciality: "Business & Master Class"
    },
    {
      id: 2,
      name: "Men Travel",
      description: "Bus confortables pour les liaisons Yaoundé-Douala-Kribi depuis 2019",
      rating: 4.5,
      routes: 80,
      vehicles: 45,
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400",
      speciality: "Yaoundé-Douala-Kribi"
    },
    {
      id: 3,
      name: "Jully Voyages",
      description: "Agence historique créée en 1977, services complets de voyage",
      rating: 4.7,
      routes: 90,
      vehicles: 60,
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400",
      speciality: "Agence historique complète"
    },
    {
      id: 4,
      name: "Galaxie Voyage",
      description: "Réputée pour son service de qualité, la sécurité et la ponctualité",
      rating: 4.7,
      routes: 70,
      vehicles: 50,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      speciality: "Qualité & Ponctualité"
    }
  ]

  // Voyages en cours populaires
  const currentTrips = [
    {
      id: 1,
      from: "Yaoundé",
      to: "Douala",
      agency: "Touristique Express",
      price: 4500,
      departureTime: "07:00",
      availableSeats: 12,
      totalSeats: 50,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300"
    },
    {
      id: 2,
      from: "Yaoundé",
      to: "Kribi",
      agency: "Men Travel",
      price: 3200,
      departureTime: "08:30",
      availableSeats: 8,
      totalSeats: 45,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300"
    },
    {
      id: 3,
      from: "Yaoundé",
      to: "Bafoussam",
      agency: "Binam Voyages",
      price: 4000,
      departureTime: "09:00",
      availableSeats: 15,
      totalSeats: 48,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300"
    },
    {
      id: 4,
      from: "Yaoundé",
      to: "Ebolowa",
      agency: "Buca Voyages",
      price: 2800,
      departureTime: "11:00",
      availableSeats: 6,
      totalSeats: 42,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300"
    }
  ]

  // Choix populaires des utilisateurs
  const popularChoices = [
    {
      route: "Yaoundé → Douala",
      bookings: 1250,
      avgPrice: 3400,
      duration: "3h30",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300"
    },
    {
      route: "Douala → Bafoussam",
      bookings: 890,
      avgPrice: 4100,
      duration: "4h15",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300"
    },
    {
      route: "Yaoundé → Bamenda",
      bookings: 567,
      avgPrice: 6200,
      duration: "6h45",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300"
    }
  ]

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Agences Certifiées",
      description: "Toutes nos agences partenaires sont vérifiées et certifiées"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Ponctualité Garantie",
      description: "95% de nos voyages respectent les horaires annoncés"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Service Premium",
      description: "Un service client disponible 7j/7 pour vous accompagner"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Réservation Sécurisée",
      description: "Paiement 100% sécurisé avec MTN MoMo et Orange Money"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section avec image de fond */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80"
            alt="Bus de voyage au Cameroun"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Voyagez à travers le
                <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Cameroun
                </span>
                en toute confiance
              </h1>

              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Réservez vos billets avec les meilleures agences de transport camerounaises. 
                Plus de 50 agences partenaires pour plus de 200 destinations à travers tout le pays.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/search"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Rechercher un voyage</span>
                </Link>
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
                  Voir nos agences
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">50+</div>
                  <div className="text-sm text-gray-300">Agences partenaires</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">200+</div>
                  <div className="text-sm text-gray-300">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">10,000+</div>
                  <div className="text-sm text-gray-300">Clients satisfaits</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Recherche Rapide</h3>
                <SearchSection isCompact={true} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section for mobile */}
      <div className="lg:hidden">
        <SearchSection />
      </div>

      {/* Voyages en cours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Voyages Disponibles Aujourd'hui
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Réservez dès maintenant pour ces destinations populaires
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={`${trip.from} to ${trip.to}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {trip.availableSeats} places
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {trip.from} → {trip.to}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{trip.agency}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{trip.departureTime}</span>
                    </div>
                    <div className="text-lg font-bold text-primary-600">
                      {trip.price.toLocaleString()} FCFA
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${((trip.totalSeats - trip.availableSeats) / trip.totalSeats) * 100}%` }}
                    ></div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-2 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300">
                    Réserver
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meilleures Agences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Agences Partenaires de Confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les meilleures agences de transport du Cameroun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topAgencies.map((agency, index) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl font-bold text-primary-600">
                      {agency.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {agency.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-center text-sm leading-relaxed">
                    {agency.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Note clients</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{agency.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Lignes</span>
                      <span className="font-medium">{agency.routes}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Véhicules</span>
                      <span className="font-medium">{agency.vehicles}</span>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                      {agency.speciality}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-2 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300">
                    Voir les voyages
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Choix populaires des utilisateurs */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Routes les Plus Populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les destinations préférées de nos voyageurs ce mois-ci
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularChoices.map((choice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={choice.image}
                    alt={choice.route}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        {choice.bookings} réservations
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {choice.route}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Prix moyen</span>
                      <span className="font-semibold text-primary-600">
                        {choice.avgPrice.toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Durée</span>
                      <span className="font-medium">{choice.duration}</span>
                    </div>
                  </div>

                  <Link
                    to={`/search?from=${choice.route.split(' → ')[0]}&to=${choice.route.split(' → ')[1]}`}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Rechercher</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir EnjoyTravel ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous vous garantissons la meilleure expérience de voyage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600 rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency CTA Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Vous êtes une agence de transport ?
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Rejoignez EnjoyTravel et accédez à des milliers de clients potentiels.
                    Améliorez votre visibilité et gérez vos réservations facilement.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Augmentez votre clientèle</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Gestion simplifiée des réservations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Commission attractive</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Support dédié 7j/7</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/register-agency"
                      className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                    >
                      <span>Rejoindre maintenant</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/agencies"
                      className="border-2 border-gray-300 hover:border-secondary-500 text-gray-700 hover:text-secondary-600 font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center justify-center space-x-2"
                    >
                      <span>Voir nos agences</span>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Image */}
              <motion.div
                className="relative bg-gray-100 lg:h-auto h-64"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop"
                  alt="Agence de transport"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary-600/20"></div>

                {/* Floating stats */}
                <div className="absolute top-6 left-6 bg-white rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold text-secondary-600">50+</div>
                  <div className="text-sm text-gray-600">Agences partenaires</div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold text-primary-600">10k+</div>
                  <div className="text-sm text-gray-600">Voyageurs/mois</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Prêt pour votre prochain voyage ?
          </motion.h2>
          <motion.p
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Rejoignez des milliers de voyageurs qui nous font confiance pour leurs déplacements à travers le Cameroun.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/search"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Commencer ma recherche</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
