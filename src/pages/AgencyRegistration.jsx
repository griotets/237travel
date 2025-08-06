import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Users, 
  Bus,
  Star,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const AgencyRegistration = () => {
  const [formData, setFormData] = useState({
    agencyName: '',
    description: '',
    headquarters: '',
    phone: '',
    email: '',
    website: '',
    founded: '',
    regions: [],
    specialties: [],
    vehicles: '',
    routes: '',
    documents: null,
    logo: null
  })

  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedSpecialties, setSelectedSpecialties] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const cameroonRegions = [
    'Centre', 'Littoral', 'Ouest', 'Nord', 'Sud', 'Est', 
    'Adamaoua', 'Nord-Ouest', 'Sud-Ouest', 'Extrême-Nord'
  ]

  const specialtyOptions = [
    'Transport VIP', 'Transport Luxe', 'Transport Standard',
    'Liaisons rapides', 'Service nuit', 'Transport écologique',
    'Bagages sécurisés', 'Service courrier', 'Location véhicules',
    'Tours touristiques', 'Transport marchandises'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRegionToggle = (region) => {
    setSelectedRegions(prev => {
      const newRegions = prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
      
      setFormData(prevData => ({
        ...prevData,
        regions: newRegions
      }))
      
      return newRegions
    })
  }

  const handleSpecialtyToggle = (specialty) => {
    setSelectedSpecialties(prev => {
      const newSpecialties = prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
      
      setFormData(prevData => ({
        ...prevData,
        specialties: newSpecialties
      }))
      
      return newSpecialties
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here would be API call to submit registration
    console.log('Agency registration data:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        agencyName: '',
        description: '',
        headquarters: '',
        phone: '',
        email: '',
        website: '',
        founded: '',
        regions: [],
        specialties: [],
        vehicles: '',
        routes: '',
        documents: null,
        logo: null
      })
      setSelectedRegions([])
      setSelectedSpecialties([])
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Inscription réussie !
          </h2>
          <p className="text-gray-600 mb-4">
            Votre demande d'inscription a été soumise avec succès. Notre équipe va examiner votre dossier et vous contacter sous 48h.
          </p>
          <p className="text-sm text-gray-500">
            Vous recevrez un email de confirmation à l'adresse fournie.
          </p>
        </motion.div>
      </div>
    )
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rejoignez EnjoyTravel
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Inscrivez votre agence de transport et touchez des milliers de clients à travers le Cameroun
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Plus de clients
            </h3>
            <p className="text-gray-600 text-sm">
              Accédez à notre base de milliers d'utilisateurs actifs
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Visibilité accrue
            </h3>
            <p className="text-gray-600 text-sm">
              Votre agence mise en avant sur notre plateforme
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bus className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Gestion simplifiée
            </h3>
            <p className="text-gray-600 text-sm">
              Outils de gestion des réservations et paiements
            </p>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Informations de base
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'agence *
                  </label>
                  <input
                    type="text"
                    value={formData.agencyName}
                    onChange={(e) => handleInputChange('agencyName', e.target.value)}
                    className="input-field"
                    placeholder="Ex: Touristique Express"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année de fondation
                  </label>
                  <input
                    type="number"
                    value={formData.founded}
                    onChange={(e) => handleInputChange('founded', e.target.value)}
                    className="input-field"
                    placeholder="2019"
                    min="1950"
                    max="2024"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description de l'agence *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="input-field h-24 resize-none"
                    placeholder="Décrivez votre agence, vos services et votre expérience..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Informations de contact
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Siège social *
                  </label>
                  <input
                    type="text"
                    value={formData.headquarters}
                    onChange={(e) => handleInputChange('headquarters', e.target.value)}
                    className="input-field"
                    placeholder="Ex: Elig Essono, Yaoundé"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="+237 6XX XX XX XX"
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
                    className="input-field"
                    placeholder="contact@votre-agence.cm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site web
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="input-field"
                    placeholder="https://www.votre-agence.cm"
                  />
                </div>
              </div>
            </div>

            {/* Operation Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Bus className="w-5 h-5 mr-2" />
                Détails d'exploitation
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de véhicules
                  </label>
                  <input
                    type="number"
                    value={formData.vehicles}
                    onChange={(e) => handleInputChange('vehicles', e.target.value)}
                    className="input-field"
                    placeholder="25"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de lignes
                  </label>
                  <input
                    type="number"
                    value={formData.routes}
                    onChange={(e) => handleInputChange('routes', e.target.value)}
                    className="input-field"
                    placeholder="15"
                    min="1"
                  />
                </div>
              </div>

              {/* Regions */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Régions desservies *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {cameroonRegions.map(region => (
                    <label key={region} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(region)}
                        onChange={() => handleRegionToggle(region)}
                        className="text-primary-600 focus:ring-primary-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Spécialités (sélectionnez toutes celles qui s'appliquent)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {specialtyOptions.map(specialty => (
                    <label key={specialty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={() => handleSpecialtyToggle(specialty)}
                        className="text-primary-600 focus:ring-primary-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Documents (optionnel)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo de l'agence
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange('logo', e.target.files[0])}
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG, GIF (max 2MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documents légaux
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleInputChange('documents', e.target.files[0])}
                    className="input-field"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Licence transport, registre commerce, etc.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="text-primary-600 focus:ring-primary-500 mt-1 mr-3"
                />
                <div className="text-sm text-gray-700">
                  <p className="mb-2">
                    En soumettant ce formulaire, j'accepte que :
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Les informations fournies sont exactes et vérifiables</li>
                    <li>Mon agence respecte la réglementation camerounaise du transport</li>
                    <li>Je m'engage à respecter les conditions d'utilisation d'EnjoyTravel</li>
                    <li>EnjoyTravel peut vérifier les informations avant validation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Soumettre la demande d'inscription
              </motion.button>
              
              <p className="text-sm text-gray-500 mt-4">
                Notre équipe examinera votre demande sous 48h et vous contactera par email.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AgencyRegistration
