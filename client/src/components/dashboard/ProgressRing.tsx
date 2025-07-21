'use client';

import { motion } from 'framer-motion';
import { ProgressRingData } from '@/types';

interface ProgressRingProps {
  data: ProgressRingData;
  className?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressRing({ 
  data, 
  className = '', 
  showLabel = true, 
  animated = true 
}: ProgressRingProps) {
  const radius = (data.size - data.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (data.percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={data.size}
        height={data.size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={data.size / 2}
          cy={data.size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={data.strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={data.size / 2}
          cy={data.size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={data.strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={animated ? { strokeDashoffset: circumference } : {}}
          animate={animated ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="50%" stopColor="#b25ffb" />
            <stop offset="100%" stopColor="#FF0000" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-white font-cyber">
            {data.value}
          </div>
          {showLabel && (
            <div className="text-xs text-muted-foreground mt-1">
              {data.label}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 