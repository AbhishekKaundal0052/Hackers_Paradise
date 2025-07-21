'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star } from 'lucide-react';

interface AchievementUnlockProps {
  open: boolean;
  onClose: () => void;
  achievement: string;
  icon?: React.ReactNode;
}

export default function AchievementUnlock({ open, onClose, achievement, icon }: AchievementUnlockProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="bg-gradient-to-br from-yellow-400/90 to-purple-500/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Shine/Confetti effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2"
            >
              <Star className="w-16 h-16 text-yellow-200 animate-pulse" />
            </motion.div>
            <div className="mb-4 mt-8">
              {icon || <Award className="w-16 h-16 text-white drop-shadow-lg" />}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h2>
            <div className="text-lg font-semibold text-yellow-100 mb-4">{achievement}</div>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition"
              aria-label="Close achievement unlock dialog"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 