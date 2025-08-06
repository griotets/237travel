import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Star,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Award
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SearchSection from '../components/SearchSection'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'

const Home = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8])

  const cameroonDestinations = [
    {
      id: 1,
      name: "Yaoundé - Douala",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500",
      price: "3,500 FCFA",
      duration: "3h30",
      rating: 4.5,
      agency: "Voyage Express"
    },
    {
      id: 2,
      name: "Douala - Bafoussam",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500",
      price: "4,500 FCFA",
      duration: "4h15",
      rating: 4.2,
      agency: "Cameroon Bus"
    },
    {
      id: 3,
      name: "Yaoundé - Ngaoundéré",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500",
      price: "8,000 FCFA",
      duration: "8h00",
      rating: 4.0,
      agency: "Central Express"
    }
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Réservation Instantanée",
      description: "Réservez vos billets en quelques clics avec confirmation immédiate"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Paiement Sécurisé",
      description: "MTN Mobile Money et Orange Money pour vos transactions en toute sécurité"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Support 24/7",
      description: "Notre équipe est disponible pour vous aider à tout moment"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Agences Certifiées",
      description: "Partenaires vérifiés et agences de transport reconnues au Cameroun"
    }
  ]

  const testimonials = [
    {
      name: "Marie Ngono",
      location: "Douala",
      rating: 5,
      comment: "Excellent service ! J'ai pu réserver mon voyage Douala-Yaoundé en 2 minutes. L'agence était très professionnelle.",
      avatar: "https://ui-avatars.com/api/?name=Marie+Ngono&background=7c3aed&color=fff"
    },
    {
      name: "Jean Baptiste",
      location: "Yaoundé",
      rating: 5,
      comment: "EnjoyTravel m'a fait découvrir des agences que je ne connaissais pas. Prix compétitifs et service de qualité.",
      avatar: "https://ui-avatars.com/api/?name=Jean+Baptiste&background=f97316&color=fff"
    },
    {
      name: "Fatima Alim",
      location: "Bafoussam",
      rating: 4,
      comment: "Très pratique pour comparer les prix entre différentes agences. Je recommande vivement !",
      avatar: "https://ui-avatars.com/api/?name=Fatima+Alim&background=7c3aed&color=fff"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 gradient-bg">
          <motion.div
            style={{ y: y1, opacity }}
            className="absolute inset-0 bg-hero-pattern opacity-20"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 border border-white/30"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + Math.sin(i) * 30}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explorez le
              <span className="block bg-gradient-to-r from-secondary-300 to-white bg-clip-text text-transparent">
                Cameroun
              </span>
              en toute simplicité
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Découvrez les meilleures agences de transport camerounaises et réservez vos voyages 
              en bus et train à travers tout le pays
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/search"
                className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Rechercher un voyage</span>
              </Link>
              <button className="btn-outline text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary-600">
                Découvrir les destinations
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-300">50+</div>
                <div className="text-sm text-primary-200">Agences partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-300">200+</div>
                <div className="text-sm text-primary-200">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-300">5000+</div>
                <div className="text-sm text-primary-200">Voyageurs satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-300">4.8★</div>
                <div className="text-sm text-primary-200">Note moyenne</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Search Section */}
      <SearchSection />

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Destinations Populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les trajets les plus demandés entre les grandes villes du Cameroun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cameroonDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card card-hover group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {destination.agency}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {destination.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{destination.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {destination.price}
                    </div>
                  </div>
                  <button className="w-full btn-primary flex items-center justify-center space-x-2">
                    <span>Réserver maintenant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Pourquoi Choisir EnjoyTravel ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne pour tous vos besoins de transport au Cameroun
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
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
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

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rejoignez des milliers de voyageurs satisfaits à travers le Cameroun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
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
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Découvrez le Cameroun avec les meilleures agences de transport. 
            Réservation simple, paiement sécurisé, voyage confortable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/search"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
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
