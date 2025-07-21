'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CyberButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  glow?: boolean
  icon?: ReactNode
  fullWidth?: boolean
}

export default function CyberButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  loading = false,
  glow = false,
  icon,
  fullWidth = false
}: CyberButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-cyber font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-darker disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'w-full': fullWidth,
      'cyber-button': variant === 'primary',
      'cyber-button-secondary': variant === 'secondary',
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-black hover:shadow-cyber': variant === 'outline',
      'bg-transparent text-muted-foreground hover:text-white hover:bg-dark-lighter': variant === 'ghost',
      'bg-destructive text-white hover:bg-destructive/90 hover:shadow-cyber': variant === 'danger',
      'shadow-cyber animate-pulse-glow': glow,
    },
    {
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
    },
    className
  )

  const MotionButton = motion.button

  return (
    <MotionButton
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={!disabled && !loading ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : undefined}
    >
      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(
        'flex items-center space-x-2',
        { 'opacity-0': loading }
      )}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </div>

      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </MotionButton>
  )
} 