import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageCircle,
  Users,
  Building,
  Headphones
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    urgency: 'normal'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        urgency: 'normal'
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      details: ["+237 677 123 456", "+237 655 789 012"],
      description: "Lun-Ven 8h-18h, Sam 9h-15h"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["contact@enjoytravel.cm", "support@enjoytravel.cm"],
      description: "Réponse sous 24h maximum"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      details: ["Carrefour Warda, Bastos", "Yaoundé, Cameroun"],
      description: "BP 1234 Yaoundé"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      details: ["Lun-Ven: 8h00 - 18h00", "Sam: 9h00 - 15h00"],
      description: "Fermé le dimanche"
    }
  ]

  const offices = [
    {
      city: "Yaoundé",
      address: "Carrefour Warda, Bastos",
      phone: "+237 677 123 456",
      email: "yaounde@enjoytravel.cm",
      manager: "Jean-Paul Mbarga",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300"
    },
    {
      city: "Douala",
      address: "Boulevard de la Liberté, Akwa",
      phone: "+237 678 234 567",
      email: "douala@enjoytravel.cm",
      manager: "Marie-Claire Fouda",
      image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=300"
    },
    {
      city: "Bafoussam",
      address: "Carrefour Tamdja",
      phone: "+237 679 345 678",
      email: "bafoussam@enjoytravel.cm",
      manager: "Emmanuel Tchoupo",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300"
    }
  ]

  const faqs = [
    {
      question: "Comment puis-je modifier ma réservation ?",
      answer: "Vous pouvez modifier votre réservation en vous connectant à votre compte ou en nous contactant directement."
    },
    {
      question: "Que faire si mon bus a du retard ?",
      answer: "En cas de retard, l'agence vous contactera. Vous pouvez aussi suivre votre voyage en temps réel sur notre plateforme."
    },
    {
      question: "Comment obtenir un remboursement ?",
      answer: "Les conditions de remboursement dépendent de l'agence et du délai d'annulation. Consultez nos conditions générales ou contactez-nous."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Contactez-Nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Notre équipe est là pour répondre à toutes vos questions 
            et vous accompagner dans vos voyages.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-lg mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-700 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Quick Contact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Envoyez-nous un message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        placeholder="+237 6XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                        required
                      >
                        <option value="">Choisir une catégorie</option>
                        <option value="reservation">Problème de réservation</option>
                        <option value="payment">Problème de paiement</option>
                        <option value="cancellation">Annulation/Modification</option>
                        <option value="complaint">Réclamation</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="partnership">Partenariat</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                      placeholder="Résumé de votre demande"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgence
                    </label>
                    <div className="flex space-x-4">
                      {[
                        { value: 'low', label: 'Faible', color: 'text-green-600' },
                        { value: 'normal', label: 'Normale', color: 'text-blue-600' },
                        { value: 'high', label: 'Élevée', color: 'text-orange-600' },
                        { value: 'urgent', label: 'Urgente', color: 'text-red-600' }
                      ].map(urgency => (
                        <label key={urgency.value} className="flex items-center">
                          <input
                            type="radio"
                            name="urgency"
                            value={urgency.value}
                            checked={formData.urgency === urgency.value}
                            onChange={(e) => handleInputChange('urgency', e.target.value)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className={`ml-2 text-sm font-medium ${urgency.color}`}>
                            {urgency.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-vertical"
                      placeholder="Décrivez votre demande en détail..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Quick Contact & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Besoin d'aide immédiate ?
                </h3>
                
                <div className="space-y-4">
                  <a
                    href="tel:+237677123456"
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Appelez-nous</h4>
                      <p className="text-gray-600">+237 677 123 456</p>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@enjoytravel.cm"
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email direct</h4>
                      <p className="text-gray-600">contact@enjoytravel.cm</p>
                    </div>
                  </a>

                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Chat en direct</h4>
                      <p className="text-gray-600">Disponible 9h-17h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Questions fréquentes
                </h3>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Bureaux
            </h2>
            <p className="text-xl text-gray-600">
              Retrouvez-nous dans les principales villes du Cameroun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={office.image}
                  alt={`Bureau ${office.city}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {office.city}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-700">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-700">{office.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-700">Responsable: {office.manager}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
