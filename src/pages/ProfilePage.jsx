import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  Camera,
  Save,
  Edit3,
  Shield,
  Bell,
  Heart
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const ProfilePage = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    birthDate: user?.birthDate || '',
    emergencyContact: user?.emergencyContact || ''
  })

  const [activeTab, setActiveTab] = useState('profile')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // updateProfile(formData)
    setIsEditing(false)
    alert('Profil mis à jour avec succès!')
  }

  const stats = [
    { label: 'Voyages effectués', value: '12', icon: Calendar },
    { label: 'Villes visitées', value: '8', icon: MapPin },
    { label: 'Points de fidélité', value: '2,450', icon: Heart }
  ]

  const recentActivity = [
    {
      id: 1,
      action: 'Voyage réservé',
      destination: 'Yaoundé → Douala',
      date: '2024-01-15',
      status: 'confirmé'
    },
    {
      id: 2,
      action: 'Profil mis à jour',
      destination: 'Informations personnelles',
      date: '2024-01-10',
      status: 'complété'
    },
    {
      id: 3,
      action: 'Avis laissé',
      destination: 'Touristique Express',
      date: '2024-01-05',
      status: 'publié'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full border-4 border-primary-200"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                Membre depuis {new Date(user?.joinDate).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'profile', name: 'Profil', icon: User },
                { id: 'activity', name: 'Activité récente', icon: Bell },
                { id: 'security', name: 'Sécurité', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informations personnelles
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">{formData.name}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">{formData.email}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="input-field"
                        placeholder="+237 6XX XXX XXX"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">{formData.phone || 'Non renseigné'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de naissance
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        {formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('fr-FR') : 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="input-field"
                        placeholder="Votre adresse complète"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">{formData.address || 'Non renseigné'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="input-field"
                        placeholder="Yaoundé"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">{formData.city || 'Non renseigné'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact d'urgence
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className="input-field"
                        placeholder="+237 6XX XXX XXX"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">{formData.emergencyContact || 'Non renseigné'}</div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-outline"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Activité récente
                </h2>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Bell className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.action}</h3>
                        <p className="text-sm text-gray-600">{activity.destination}</p>
                        <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'confirmé' ? 'bg-green-100 text-green-800' :
                        activity.status === 'complété' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Sécurité et confidentialité
                </h2>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Mot de passe</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Dernière modification il y a 3 mois
                    </p>
                    <button className="btn-outline">
                      Changer le mot de passe
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Authentification à deux facteurs</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Ajoutez une couche de sécurité supplémentaire à votre compte
                    </p>
                    <button className="btn-primary">
                      Activer 2FA
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Sessions actives</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Gérez les appareils qui ont accès à votre compte
                    </p>
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Voir les sessions
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions rapides
              </h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Mes réservations</div>
                  <div className="text-sm text-gray-600">Voir vos voyages</div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Paramètres</div>
                  <div className="text-sm text-gray-600">Notifications et préférences</div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Support</div>
                  <div className="text-sm text-gray-600">Contactez notre équipe</div>
                </button>
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Programme fidélité
              </h3>
              <p className="text-sm text-primary-700 mb-4">
                Vous avez 2,450 points. Encore 550 points pour le niveau Gold !
              </p>
              <div className="w-full bg-primary-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
