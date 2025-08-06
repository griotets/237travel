import { motion } from 'framer-motion'
import { 
  Users, 
  MapPin, 
  Award, 
  Shield,
  Clock,
  Heart,
  TrendingUp,
  CheckCircle
} from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50+", label: "Agences partenaires" },
    { icon: <MapPin className="w-8 h-8" />, number: "200+", label: "Destinations" },
    { icon: <Users className="w-8 h-8" />, number: "10,000+", label: "Clients satisfaits" },
    { icon: <Award className="w-8 h-8" />, number: "4.8★", label: "Note moyenne" },
  ]

  const values = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Sécurité",
      description: "Nous vérifions rigoureusement toutes nos agences partenaires pour garantir votre sécurité."
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Ponctualité",
      description: "Nos partenaires s'engagent à respecter les horaires pour que vous arriviez à l'heure."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Service Client",
      description: "Une équipe dédiée pour vous accompagner avant, pendant et après votre voyage."
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Innovation",
      description: "Nous utilisons les dernières technologies pour améliorer votre expérience de voyage."
    }
  ]

  const team = [
    {
      name: "Jean-Paul Mbarga",
      role: "Directeur Général",
      image: "https://ui-avatars.com/api/?name=Jean-Paul+Mbarga&background=7c3aed&color=fff&size=200",
      description: "Pionnier du transport digital au Cameroun avec plus de 15 ans d'expérience."
    },
    {
      name: "Marie-Claire Fouda",
      role: "Directrice des Opérations",
      image: "https://ui-avatars.com/api/?name=Marie-Claire+Fouda&background=f97316&color=fff&size=200",
      description: "Experte en logistique et gestion des partenariats avec les agences de transport."
    },
    {
      name: "Emmanuel Tchoupo",
      role: "Directeur Technique",
      image: "https://ui-avatars.com/api/?name=Emmanuel+Tchoupo&background=059669&color=fff&size=200",
      description: "Architecte de notre plateforme technologique et des innovations digitales."
    }
  ]

  const milestones = [
    {
      year: "2020",
      title: "Création d'EnjoyTravel",
      description: "Lancement de la plateforme avec 5 agences partenaires"
    },
    {
      year: "2021",
      title: "Expansion régionale",
      description: "Couverture de toutes les régions du Cameroun"
    },
    {
      year: "2022",
      title: "Paiement mobile",
      description: "Intégration de MTN MoMo et Orange Money"
    },
    {
      year: "2023",
      title: "50 agences partenaires",
      description: "Réseau national complet avec les meilleures agences"
    },
    {
      year: "2024",
      title: "10,000 clients",
      description: "Communauté de voyageurs en constante croissance"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            À Propos d'EnjoyTravel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Nous révolutionnons le transport au Cameroun en connectant 
            les voyageurs aux meilleures agences du pays.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600 rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                EnjoyTravel a été créé avec une vision simple : rendre les voyages 
                au Cameroun plus accessibles, plus sûrs et plus confortables pour tous.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nous croyons que chaque Camerounais devrait pouvoir voyager facilement 
                à travers son pays, que ce soit pour le travail, la famille ou le plaisir. 
                C'est pourquoi nous avons créé une plateforme qui connecte les voyageurs 
                aux meilleures agences de transport du pays.
              </p>
              <div className="space-y-4">
                {[
                  "Faciliter la recherche et la réservation de voyages",
                  "Garantir la qualité et la sécurité des transports",
                  "Soutenir les agences locales camerounaises",
                  "Moderniser le secteur du transport au Cameroun"
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop"
                alt="Transport au Cameroun"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600 rounded-xl mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Histoire
            </h2>
            <p className="text-xl text-gray-600">
              Les étapes clés de notre développement
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start space-x-6"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>

                  <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les passionnés qui rendent EnjoyTravel possible
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Rejoignez notre communauté
          </motion.h2>
          <motion.p
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Faites partie des milliers de voyageurs qui nous font confiance 
            pour leurs déplacements à travers le Cameroun.
          </motion.p>
          <motion.div
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors">
              Commencer un voyage
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors">
              Devenir partenaire
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
