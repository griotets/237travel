import { motion } from 'framer-motion'

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Mon Profil
          </h1>
          <p className="text-xl text-gray-600">
            Cette page sera développée prochainement
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage
