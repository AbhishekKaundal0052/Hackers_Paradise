'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Award,
  Shield,
  Zap
} from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    role: 'Senior Penetration Tester',
    company: 'CyberSec Solutions',
    avatar: 'AR',
    rating: 5,
    content: "Hacker's Paradise completely transformed my approach to cybersecurity. The hands-on labs and real-world scenarios gave me the practical skills I needed to advance my career. The community is incredibly supportive and the bug bounty program helped me earn over $50K in my first year.",
    achievement: 'Earned $50K+ in bug bounties',
    achievementIcon: Award
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Security Analyst',
    company: 'TechCorp',
    avatar: 'SC',
    rating: 5,
    content: "From a complete beginner to a security analyst in just 18 months! The structured learning path and expert mentorship made all the difference. The certifications I earned here opened doors I never thought possible.",
    achievement: 'Career transition in 18 months',
    achievementIcon: Shield
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    role: 'Red Team Lead',
    company: 'Fortress Security',
    avatar: 'MJ',
    rating: 5,
    content: "The quality of education here is unmatched. The CTF challenges are incredibly realistic and the community is filled with talented professionals. I've learned more here than in my entire cybersecurity degree program.",
    achievement: 'Led successful red team operations',
    achievementIcon: Zap
  },
  {
    id: 4,
    name: 'Emily Watson',
    role: 'Security Consultant',
    company: 'Digital Defense Inc',
    avatar: 'EW',
    rating: 5,
    content: "As a consultant, I need to stay ahead of the latest threats. Hacker's Paradise keeps me updated with cutting-edge techniques and provides a platform to practice them safely. The ROI has been incredible.",
    achievement: 'Increased client base by 300%',
    achievementIcon: Award
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Incident Response Manager',
    company: 'SecureNet',
    avatar: 'DK',
    rating: 5,
    content: "The incident response training here is world-class. The realistic scenarios and expert guidance helped me develop the skills to handle major security incidents effectively. Highly recommended for any security professional.",
    achievement: 'Reduced incident response time by 60%',
    achievementIcon: Shield
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-red-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,0,0,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="cyber-title text-4xl md:text-5xl mb-6">
            What Our{' '}
            <span className="glow-text">Community</span>
            {' '}Says
          </h2>
          <p className="cyber-subtitle text-xl max-w-3xl mx-auto">
            Real stories from cybersecurity professionals who transformed their careers with us
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="glass-card-dark p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-primary/20">
              <Quote className="w-12 h-12" />
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              &quot;{currentTestimonial.content}&quot;
            </blockquote>

            {/* Achievement */}
            <div className="flex items-center mb-8 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <currentTestimonial.achievementIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-cyber font-semibold text-white">Key Achievement</div>
                <div className="text-muted-foreground text-sm">{currentTestimonial.achievement}</div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{currentTestimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-cyber font-semibold text-white text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-muted-foreground">
                    {currentTestimonial.role} @ {currentTestimonial.company}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-red-600 hover:to-purple-700 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-red-600 hover:to-purple-700 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-red-500 to-purple-600' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card-dark p-6 rounded-xl border border-white/10">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="glass-card-dark p-6 rounded-xl border border-white/10">
              <div className="text-3xl font-cyber font-bold text-accent mb-2">4.9/5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="glass-card-dark p-6 rounded-xl border border-white/10">
              <div className="text-3xl font-cyber font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Students</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 