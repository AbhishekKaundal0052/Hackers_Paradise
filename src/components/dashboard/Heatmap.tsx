'use client';

import { motion } from 'framer-motion';
import { HeatmapData } from '@/types';

interface HeatmapProps {
  data: HeatmapData;
  className?: string;
  animated?: boolean;
}

export default function Heatmap({ data, className = '', animated = true }: HeatmapProps) {
  const getColor = (intensity: number) => {
    const red = Math.round(255 * intensity);
    const purple = Math.round(187 * intensity);
    return `rgb(${red}, 0, ${purple})`;
  };

  const getOpacity = (intensity: number) => {
    return 0.3 + (intensity * 0.7);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-7 gap-1">
        {data.data.map((item, index) => (
          <motion.div
            key={index}
            className="aspect-square rounded-sm relative overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-200"
            style={{
              backgroundColor: getColor(item.intensity),
              opacity: getOpacity(item.intensity)
            }}
            initial={animated ? { scale: 0, opacity: 0 } : {}}
            animate={animated ? { scale: 1, opacity: getOpacity(item.intensity) } : {}}
            transition={{ 
              delay: index * 0.02, 
              duration: 0.3,
              ease: "easeOut" 
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: `0 0 10px ${getColor(item.intensity)}`
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle, ${getColor(item.intensity)}40, transparent)`,
                filter: 'blur(1px)'
              }}
            />
            
            {/* Tooltip content */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="text-xs text-white font-bold text-center">
                {item.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex space-x-1">
          {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
            <div
              key={intensity}
              className="w-4 h-4 rounded-sm"
              style={{
                backgroundColor: getColor(intensity),
                opacity: getOpacity(intensity)
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
} 