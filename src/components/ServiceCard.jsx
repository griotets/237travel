import { motion } from 'framer-motion'

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card card-hover text-center p-8"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-2xl mb-6">
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {service.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  )
}

export default ServiceCard
