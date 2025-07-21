'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Users, 
  Award, 
  DollarSign, 
  Target,
  TrendingUp,
  Shield,
  Zap,
  Star
} from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Active Learners',
    description: 'Cybersecurity enthusiasts worldwide'
  },
  {
    icon: Award,
    value: 1000,
    suffix: '+',
    label: 'Certifications',
    description: 'Industry-recognized credentials earned'
  },
  {
    icon: DollarSign,
    value: 5000000,
    suffix: '+',
    label: 'Bounties Paid',
    description: 'Total rewards distributed to hackers'
  },
  {
    icon: Target,
    value: 95,
    suffix: '%',
    label: 'Success Rate',
    description: 'Students landing cybersecurity jobs'
  }
]

const achievements = [
  {
    icon: TrendingUp,
    title: 'Rapid Growth',
    description: '500% increase in active users over the last year'
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Zero security breaches in our platform history'
  },
  {
    icon: Zap,
    title: 'Innovation Leader',
    description: 'Pioneering new cybersecurity education methods'
  },
  {
    icon: Star,
    title: 'Industry Recognition',
    description: 'Featured in top cybersecurity publications'
  }
]

// Animated Counter Component
function AnimatedCounter({ value, suffix, duration = 2 }: { 
  value: number, 
  suffix: string, 
  duration?: number 
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * value))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="font-cyber font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Statistics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/30 via-red-900/20 to-purple-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,0,0,0.1),transparent_50%)]"></div>
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
            Our{' '}
            <span className="glow-text">Impact</span>
          </h2>
          <p className="cyber-subtitle text-xl max-w-3xl mx-auto">
            Join thousands of cybersecurity professionals who have transformed their careers with us
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="glass-card-dark p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Counter */}
                  <div className="text-4xl md:text-5xl font-cyber font-bold text-primary mb-4">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-cyber font-semibold text-white mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="cyber-title text-3xl md:text-4xl mb-12">
            Key{' '}
            <span className="glow-text">Achievements</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="glass-card-dark p-6 rounded-xl border border-white/10 relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-cyber font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {achievement.title}
                  </h4>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card-dark p-8 rounded-2xl border border-white/10">
            <h3 className="cyber-title text-2xl md:text-3xl mb-6">
              Success{' '}
              <span className="glow-text">Stories</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              &quot;Hacker&apos;s Paradise transformed my career. From a beginner to a senior security analyst in just 18 months. The hands-on labs and community support were incredible.&quot;
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div className="text-left">
                <div className="font-cyber font-semibold text-white">Sarah Chen</div>
                <div className="text-muted-foreground text-sm">Senior Security Analyst @ TechCorp</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 