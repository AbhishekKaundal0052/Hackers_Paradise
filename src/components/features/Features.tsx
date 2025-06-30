'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Users, 
  Award,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: Code,
    title: 'Interactive Learning',
    description: 'Hands-on labs, CTF challenges, and real-world scenarios to master cybersecurity skills through practical experience.',
    gradient: 'from-red-500 to-purple-600',
    delay: 0.1
  },
  {
    icon: Target,
    title: 'Bug Bounties',
    description: 'Earn rewards by finding vulnerabilities in real applications. Join our bounty program and get paid for your security research.',
    gradient: 'from-purple-500 to-red-600',
    delay: 0.2
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with fellow hackers, share knowledge, and collaborate on security projects in our vibrant community.',
    gradient: 'from-red-600 to-purple-500',
    delay: 0.3
  },
  {
    icon: Award,
    title: 'Certifications',
    description: 'Earn industry-recognized certifications that validate your cybersecurity expertise and advance your career.',
    gradient: 'from-purple-600 to-red-500',
    delay: 0.4
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-red-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_50%)]"></div>
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
            Why Choose{' '}
            <span className="glow-text">Hacker&apos;s Paradise</span>
          </h2>
          <p className="cyber-subtitle text-xl max-w-3xl mx-auto">
            Master cybersecurity through cutting-edge learning experiences designed by industry experts
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="glass-card-dark p-8 h-full rounded-2xl border border-white/10 relative overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-cyber font-semibold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-primary font-cyber font-semibold cursor-pointer group/link"
                  >
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </motion.div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/30 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cyber-button text-lg px-8 py-4"
          >
            <Zap className="w-5 h-5 mr-2 inline" />
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 