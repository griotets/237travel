import { motion } from 'framer-motion'
import { 
  User, 
  Shield, 
  Building,
  Copy,
  CheckCircle
} from 'lucide-react'
import { useState } from 'react'

const TestUsers = () => {
  const [copiedEmail, setCopiedEmail] = useState('')

  const testUsers = [
    {
      role: 'admin',
      email: 'admin@enjoytravel.cm',
      password: 'admin123',
      name: 'Admin EnjoyTravel',
      description: 'Accès complet au dashboard administrateur',
      icon: Shield,
      color: 'red'
    },
    {
      role: 'user',
      email: 'user@test.cm',
      password: 'user123',
      name: 'Utilisateur Test',
      description: 'Utilisateur standard avec accès aux réservations',
      icon: User,
      color: 'blue'
    },
    {
      role: 'agency',
      email: 'agency@touristique.cm',
      password: 'agency123',
      name: 'Touristique Express',
      description: 'Compte agence avec gestion des voyages',
      icon: Building,
      color: 'orange'
    }
  ]

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopiedEmail(`${type}-${text}`)
    setTimeout(() => setCopiedEmail(''), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comptes de test
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Utilisez ces comptes pour tester les différentes fonctionnalités d'EnjoyTravel
          </p>
        </motion.div>

        {/* Test Users Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testUsers.map((user, index) => {
            const IconComponent = user.icon
            const isEmailCopied = copiedEmail === `email-${user.email}`
            const isPasswordCopied = copiedEmail === `password-${user.password}`

            return (
              <motion.div
                key={user.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-gray-200 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-${user.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 text-${user.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {user.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={user.email}
                        readOnly
                        className="input-field pr-10 bg-gray-50"
                      />
                      <button
                        onClick={() => copyToClipboard(user.email, 'email')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {isEmailCopied ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={user.password}
                        readOnly
                        className="input-field pr-10 bg-gray-50"
                      />
                      <button
                        onClick={() => copyToClipboard(user.password, 'password')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {isPasswordCopied ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={`mt-4 p-3 bg-${user.color}-50 rounded-lg`}>
                    <h4 className={`font-medium text-${user.color}-900 mb-1`}>
                      Fonctionnalités disponibles :
                    </h4>
                    <ul className={`text-sm text-${user.color}-700 space-y-1`}>
                      {user.role === 'admin' && (
                        <>
                          <li>• Dashboard administrateur</li>
                          <li>• Gestion des agences</li>
                          <li>• Statistiques globales</li>
                          <li>• Modération des avis</li>
                        </>
                      )}
                      {user.role === 'user' && (
                        <>
                          <li>• Recherche de voyages</li>
                          <li>�� Réservations</li>
                          <li>• Profil utilisateur</li>
                          <li>• Historique des voyages</li>
                        </>
                      )}
                      {user.role === 'agency' && (
                        <>
                          <li>• Gestion des voyages</li>
                          <li>• Suivi des réservations</li>
                          <li>• Profil agence</li>
                          <li>• Statistiques de vente</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Instructions d'utilisation
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Comment tester
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">1</span>
                  <span>Cliquez sur "Connexion" dans la barre de navigation</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">2</span>
                  <span>Copiez l'email et le mot de passe d'un compte de test</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">3</span>
                  <span>Connectez-vous et explorez les fonctionnalités</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">4</span>
                  <span>Testez différents rôles pour voir toutes les features</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Fonctionnalités à tester
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Recherche de voyages avec filtres</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Processus de réservation complet</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Gestion du profil utilisateur</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Historique des réservations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Paramètres et notifications</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Inscription d'agence</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Dashboard administrateur</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Note importante</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Ces comptes sont uniquement pour les tests et la démonstration. 
                  Toutes les données sont simulées et ne correspondent pas à de vraies transactions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TestUsers
