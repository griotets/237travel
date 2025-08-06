import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialCard = ({ testimonial, index }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card floating-card relative"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-6">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center">
          <Quote className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="pt-6 pb-6 px-6">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {renderStars(testimonial.rating)}
        </div>

        {/* Comment */}
        <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
          "{testimonial.comment}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center space-x-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full border-2 border-primary-200"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.location}</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-bl-full opacity-50"></div>
    </motion.div>
  )
}

export default TestimonialCard
