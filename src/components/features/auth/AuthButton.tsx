'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface AuthButtonProps {
  children: ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function AuthButton({
  children,
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: AuthButtonProps) {
  const baseClasses = `
    relative overflow-hidden font-semibold rounded-lg transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600
      text-white shadow-lg hover:shadow-xl
      focus:ring-red-500
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-gray-500
    `,
    outline: `
      bg-transparent border-2 border-red-500 text-red-500
      hover:bg-red-500 hover:text-white
      focus:ring-red-500
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {loading && (
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 size={18} className="animate-spin" />
          </motion.div>
        )}
        <span>{children}</span>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/30 to-purple-500/30 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
} 