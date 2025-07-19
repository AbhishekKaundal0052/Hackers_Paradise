'use client';

import { motion } from 'framer-motion';
import { Shield, ShieldCheck, ShieldX, ShieldAlert } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export function PasswordStrengthMeter({ password, className = '' }: PasswordStrengthMeterProps) {
  const calculateStrength = (password: string) => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letter');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Number');

    if (/[@$!%*?&]/.test(password)) score += 1;
    else feedback.push('Special character');

    if (password.length >= 12) score += 1;

    return { score, feedback };
  };

  const { score, feedback } = calculateStrength(password);
  const strength = Math.min(score, 5);

  const strengthConfig = {
    0: { color: 'bg-gray-500', text: 'Very Weak', icon: ShieldX, textColor: 'text-gray-400' },
    1: { color: 'bg-red-500', text: 'Weak', icon: ShieldX, textColor: 'text-red-400' },
    2: { color: 'bg-orange-500', text: 'Fair', icon: ShieldAlert, textColor: 'text-orange-400' },
    3: { color: 'bg-yellow-500', text: 'Good', icon: Shield, textColor: 'text-yellow-400' },
    4: { color: 'bg-blue-500', text: 'Strong', icon: ShieldCheck, textColor: 'text-blue-400' },
    5: { color: 'bg-green-500', text: 'Very Strong', icon: ShieldCheck, textColor: 'text-green-400' },
  };

  const config = strengthConfig[strength as keyof typeof strengthConfig];
  const IconComponent = config.icon;

  if (!password) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Password Strength</span>
          <div className="flex items-center space-x-2">
            <IconComponent size={16} className={config.textColor} />
            <span className={config.textColor}>{config.text}</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full ${config.color} rounded-full transition-all duration-300`}
            initial={{ width: 0 }}
            animate={{ width: `${(strength / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Feedback */}
      {feedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-1"
        >
          <p className="text-xs text-gray-400">Requirements:</p>
          <ul className="space-y-1">
            {feedback.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-xs text-gray-500 flex items-center space-x-2"
              >
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Security tips */}
      {strength >= 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-green-400" />
            <span className="text-xs text-green-400 font-medium">
              Excellent! Your password meets all security requirements.
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
} 