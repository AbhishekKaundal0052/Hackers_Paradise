'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CyberCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  glow?: boolean
  variant?: 'default' | 'glass' | 'bordered'
  delay?: number
}

export default function CyberCard({ 
  children, 
  className, 
  onClick, 
  hover = true, 
  glow = false,
  variant = 'default',
  delay = 0 
}: CyberCardProps) {
  const baseClasses = cn(
    'relative overflow-hidden rounded-lg transition-all duration-300',
    {
      'cursor-pointer': onClick,
      'hover:scale-105 hover:shadow-cyber': hover && onClick,
      'shadow-cyber': glow,
      'animate-cyber-glow': glow,
    },
    {
      'cyber-card': variant === 'default',
      'glass-card-dark': variant === 'glass',
      'bg-dark-card border border-dark-border': variant === 'bordered',
    },
    className
  )

  const MotionComponent = motion.div

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={hover ? { 
        y: -5,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={baseClasses}
      onClick={onClick}
    >
      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Border Glow */}
      {glow && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-accent to-primary opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm" />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-accent/50 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-accent/50 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />
    </MotionComponent>
  )
} 