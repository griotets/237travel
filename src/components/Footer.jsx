import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'À propos', href: '/about' },
      { name: 'Notre équipe', href: '/team' },
      { name: 'Carrières', href: '/careers' },
      { name: 'Presse', href: '/press' }
    ],
    services: [
      { name: 'Recherche de voyages', href: '/search' },
      { name: 'Réservations', href: '/bookings' },
      { name: 'Agences partenaires', href: '/agencies' },
      { name: 'Support', href: '/support' }
    ],
    legal: [
      { name: 'Conditions d\'utilisation', href: '/terms' },
      { name: 'Politique de confidentialité', href: '/privacy' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'Mentions légales', href: '/legal' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
  ]

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="futuristic-grid h-full"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/" className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">ET</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold gradient-text">EnjoyTravel</h3>
                    <p className="text-sm text-gray-400">Cameroun</p>
                  </div>
                </Link>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  Votre plateforme de confiance pour voyager à travers le Cameroun. 
                  Découvrez les meilleures agences de transport et réservez en toute simplicité.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-primary-400" />
                    <span className="text-gray-400">Yaoundé, Cameroun</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary-400" />
                    <span className="text-gray-400">+237 6XX XXX XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary-400" />
                    <span className="text-gray-400">contact@enjoytravel.cm</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Company Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Entreprise</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Services</h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Newsletter & Payment */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
                <p className="text-gray-400 mb-4 text-sm">
                  Recevez nos dernières offres et actualités
                </p>
                
                <form className="mb-6">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary-500 text-white"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-primary-600 to-secondary-500 px-4 py-2 rounded-r-lg hover:from-primary-700 hover:to-secondary-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Payment Methods */}
                <div>
                  <h5 className="text-sm font-medium mb-3">Paiements acceptés</h5>
                  <div className="flex space-x-3">
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold">
                      MTN MoMo
                    </div>
                    <div className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-bold">
                      Orange Money
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm mb-4 md:mb-0"
              >
                © 2024 EnjoyTravel. Tous droits réservés.
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-colors duration-200 ${social.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm"
              >
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
