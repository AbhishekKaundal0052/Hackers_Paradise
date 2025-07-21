'use client';

import { motion } from 'framer-motion';
import { Github, Chrome, Mail } from 'lucide-react';

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  onMicrosoftLogin?: () => void;
  loading?: boolean;
  className?: string;
}

export function SocialLoginButtons({
  onGoogleLogin,
  onGithubLogin,
  onMicrosoftLogin,
  loading = false,
  className = '',
}: SocialLoginButtonsProps) {
  const socialButtons = [
    {
      provider: 'Google',
      icon: Chrome,
      onClick: onGoogleLogin,
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
    },
    {
      provider: 'GitHub',
      icon: Github,
      onClick: onGithubLogin,
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-gray-700',
    },
    {
      provider: 'Microsoft',
      icon: Mail,
      onClick: onMicrosoftLogin,
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {socialButtons.map((button, index) => (
          <motion.button
            key={button.provider}
            onClick={button.onClick}
            disabled={loading}
            className={`
              w-full flex items-center justify-center px-4 py-3 border rounded-lg
              transition-all duration-200 font-medium text-sm
              ${button.bgColor} ${button.textColor} ${button.borderColor}
              hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button.icon size={18} className="mr-3" />
            {button.provider}
          </motion.button>
        ))}
      </div>

      {/* Security notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-gray-500 text-center"
      >
        <p>Your data is protected with enterprise-grade security</p>
        <p className="mt-1">256-bit SSL encryption • SOC 2 Type II compliant</p>
      </motion.div>
    </div>
  );
} 