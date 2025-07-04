'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockUsers = [
  { name: 'Alice', color: 'bg-red-500' },
  { name: 'Bob', color: 'bg-purple-500' },
  { name: 'You', color: 'bg-green-500' },
];

export default function RealTimeCollaborationIndicator() {
  return (
    <div className="flex items-center space-x-2" aria-label="Real-time collaboration indicator">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex -space-x-2"
      >
        {mockUsers.map((user, idx) => (
          <Avatar key={user.name} className={`w-7 h-7 border-2 border-white ${user.color} z-${10 - idx}`}> 
            <AvatarFallback className="text-xs text-white font-bold uppercase">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        ))}
      </motion.div>
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow animate-pulse"
        aria-live="polite"
      >
        Live
      </motion.span>
    </div>
  );
} 