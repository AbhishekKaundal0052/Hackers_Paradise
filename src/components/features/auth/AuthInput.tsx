'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, success, icon, showPasswordToggle, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle && !showPassword ? 'password' : props.type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            type={inputType}
            className={`
              w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500
              transition-all duration-200
              ${icon ? 'pl-10' : ''}
              ${showPasswordToggle ? 'pr-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
              ${success ? 'border-green-500 focus:ring-green-500/50' : ''}
              ${!error && !success ? 'border-gray-600 hover:border-gray-500' : ''}
              ${className}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {/* Password toggle */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          
          {/* Status icons */}
          {error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle size={18} className="text-red-500" />
            </div>
          )}
          
          {success && !error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CheckCircle size={18} className="text-green-500" />
            </div>
          )}
          
          {/* Focus glow effect */}
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 to-purple-500/10 pointer-events-none"
            />
          )}
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 flex items-center space-x-1"
          >
            <AlertCircle size={14} />
            <span>{error}</span>
          </motion.p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput'; 