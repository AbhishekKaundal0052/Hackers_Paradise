'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Target, BookOpen } from 'lucide-react'
import CyberButton from '@/components/common/CyberButton'

const features = [
  {
    icon: Shield,
    title: 'Learn Security',
    description: 'Master ethical hacking and penetration testing'
  },
  {
    icon: Target,
    title: 'Earn Bounties',
    description: 'Find vulnerabilities and get rewarded'
  },
  {
    icon: BookOpen,
    title: 'Expert Courses',
    description: 'Learn from industry professionals'
  }
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse"></div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rotate-45"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-32 w-24 h-24 border border-accent/20 rotate-12"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 left-32 w-40 h-40 border border-primary/10 rotate-90"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="cyber-title mb-6">
              Master the Art of
              <br />
              <span className="glow-text">Cybersecurity</span>
            </h1>
            <p className="cyber-subtitle text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Learn ethical hacking, penetration testing, and digital defense through 
              hands-on courses and real-world bug bounty programs.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <CyberButton
              size="lg"
              glow
              icon={<Zap className="w-5 h-5" />}
              onClick={() => console.log('Get Started clicked')}
            >
              Get Started Free
            </CyberButton>
            <CyberButton
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => console.log('Explore Courses clicked')}
            >
              Explore Courses
            </CyberButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-cyber font-bold text-primary mb-2">
                10K+
              </div>
              <div className="text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-cyber font-bold text-accent mb-2">
                500+
              </div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-cyber font-bold text-primary mb-2">
                $2M+
              </div>
              <div className="text-muted-foreground">Bounties Paid</div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className="glass-card-dark p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-cyber font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
} 