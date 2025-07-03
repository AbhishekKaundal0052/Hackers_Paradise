'use client';

import { motion } from 'framer-motion';
import { BarChartData } from '@/types';

interface BarChartProps {
  data: BarChartData;
  className?: string;
  height?: number;
  showValues?: boolean;
  animated?: boolean;
}

export default function BarChart({ 
  data, 
  className = '', 
  height = 200, 
  showValues = true, 
  animated = true 
}: BarChartProps) {
  const maxBarHeight = height - 60; // Account for labels and padding

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-end justify-between h-[200px] space-x-2">
        {data.labels.map((label, index) => {
          const value = data.data[index];
          const percentage = (value / data.maxValue) * 100;
          const barHeight = (percentage / 100) * maxBarHeight;
          const color = data.colors[index] || '#FF0000';

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* Bar */}
              <motion.div
                className="w-full rounded-t-sm relative overflow-hidden"
                style={{ height: barHeight }}
                initial={animated ? { height: 0 } : {}}
                animate={animated ? { height: barHeight } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1, 
                  ease: "easeOut" 
                }}
              >
                {/* Gradient background */}
                <div 
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(to top, ${color}, ${color}80)`
                  }}
                />
                
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(to top, ${color}, transparent)`,
                    filter: 'blur(2px)'
                  }}
                />
                
                {/* Value label */}
                {showValues && (
                  <motion.div
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white"
                    initial={animated ? { opacity: 0, y: 10 } : {}}
                    animate={animated ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                  >
                    {value}
                  </motion.div>
                )}
              </motion.div>
              
              {/* Label */}
              <motion.div
                className="text-xs text-muted-foreground mt-2 text-center"
                initial={animated ? { opacity: 0 } : {}}
                animate={animated ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.3 }}
              >
                {label}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 