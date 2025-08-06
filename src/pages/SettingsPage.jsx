import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  CreditCard,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const SettingsPage = () => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('notifications')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false,
      booking_updates: true,
      price_alerts: true,
      newsletter: false
    },
    privacy: {
      profile_visibility: 'public',
      data_sharing: false,
      analytics: true,
      location_tracking: false
    },
    preferences: {
      language: 'fr',
      currency: 'XAF',
      timezone: 'Africa/Douala',
      default_passengers: 1,
      auto_login: true
    }
  })

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    alert('Paramètres sauvegardés avec succès!')
  }

  const sections = [
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Confidentialité', icon: Shield },
    { id: 'preferences', name: 'Préférences', icon: Globe },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'data', name: 'Données', icon: Download }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos préférences et paramètres de compte
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Préférences de notifications
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Canaux de notification
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Email</div>
                            <div className="text-sm text-gray-600">Recevez des notifications par email</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email}
                            onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">SMS</div>
                            <div className="text-sm text-gray-600">Recevez des notifications par SMS</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.sms}
                            onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">Notifications push</div>
                            <div className="text-sm text-gray-600">Recevez des notifications sur votre appareil</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.push}
                            onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Types de notifications
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Mises à jour de réservation</div>
                          <div className="text-sm text-gray-600">Confirmations, modifications, annulations</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.booking_updates}
                            onChange={(e) => handleSettingChange('notifications', 'booking_updates', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Alertes de prix</div>
                          <div className="text-sm text-gray-600">Baisse de prix sur vos trajets favoris</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.price_alerts}
                            onChange={(e) => handleSettingChange('notifications', 'price_alerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Newsletter</div>
                          <div className="text-sm text-gray-600">Conseils de voyage et promotions</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.newsletter}
                            onChange={(e) => handleSettingChange('notifications', 'newsletter', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Privacy Section */}
            {activeSection === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Confidentialité et données
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visibilité du profil
                    </label>
                    <select
                      value={settings.privacy.profile_visibility}
                      onChange={(e) => handleSettingChange('privacy', 'profile_visibility', e.target.value)}
                      className="input-field"
                    >
                      <option value="public">Public</option>
                      <option value="private">Privé</option>
                      <option value="friends">Amis seulement</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Partage de données</div>
                      <div className="text-sm text-gray-600">Autoriser le partage de données avec nos partenaires</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.data_sharing}
                        onChange={(e) => handleSettingChange('privacy', 'data_sharing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Analytics</div>
                      <div className="text-sm text-gray-600">Aider à améliorer nos services avec des données anonymisées</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.analytics}
                        onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Préférences générales
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Langue
                      </label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                        className="input-field"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Devise
                      </label>
                      <select
                        value={settings.preferences.currency}
                        onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                        className="input-field"
                      >
                        <option value="XAF">FCFA (XAF)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="USD">Dollar US (USD)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuseau horaire
                      </label>
                      <select
                        value={settings.preferences.timezone}
                        onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                        className="input-field"
                      >
                        <option value="Africa/Douala">Afrique/Douala (WAT)</option>
                        <option value="Europe/Paris">Europe/Paris (CET)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de passagers par défaut
                      </label>
                      <select
                        value={settings.preferences.default_passengers}
                        onChange={(e) => handleSettingChange('preferences', 'default_passengers', parseInt(e.target.value))}
                        className="input-field"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} passager{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Mode sombre</div>
                      <div className="text-sm text-gray-600">Utiliser le thème sombre</div>
                    </div>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        isDarkMode ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                      {isDarkMode ? (
                        <Moon className="absolute left-1 w-3 h-3 text-primary-600" />
                      ) : (
                        <Sun className="absolute right-1 w-3 h-3 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Sécurité du compte
                  </h2>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Mot de passe</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Dernière modification il y a 3 mois
                      </p>
                      <button className="btn-primary">
                        Changer le mot de passe
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Authentification à deux facteurs</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Sécurisez votre compte avec l'authentification à deux facteurs
                      </p>
                      <button className="btn-outline">
                        Configurer 2FA
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Sessions actives</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Voir et gérer les appareils connectés à votre compte
                      </p>
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        Gérer les sessions
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Data Section */}
            {activeSection === 'data' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Gestion des données
                </h2>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Exporter mes données</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Télécharger une copie de toutes vos données personnelles
                    </p>
                    <button className="flex items-center space-x-2 btn-outline">
                      <Download className="w-4 h-4" />
                      <span>Exporter les données</span>
                    </button>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h3 className="font-medium text-red-900 mb-2">Supprimer mon compte</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                    </p>
                    <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span>Supprimer le compte</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-end"
            >
              <button
                onClick={handleSaveSettings}
                className="flex items-center space-x-2 btn-primary"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer les modifications</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
