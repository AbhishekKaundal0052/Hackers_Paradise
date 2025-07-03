'use client';

import { motion } from 'framer-motion';
import { LineChartData } from '@/types';

interface LineChartProps {
  data: LineChartData;
  className?: string;
  height?: number;
  showPoints?: boolean;
  showArea?: boolean;
  animated?: boolean;
}

export default function LineChart({ 
  data, 
  className = '', 
  height = 200, 
  showPoints = true, 
  showArea = true, 
  animated = true 
}: LineChartProps) {
  const width = 100;
  const padding = 20;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  const createPath = (dataset: LineChartData['datasets'][0]) => {
    const points = dataset.data.map((value, index) => {
      const x = padding + (index / (dataset.data.length - 1)) * chartWidth;
      const y = padding + chartHeight - (value / Math.max(...dataset.data)) * chartHeight;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const createAreaPath = (dataset: LineChartData['datasets'][0]) => {
    const points = dataset.data.map((value, index) => {
      const x = padding + (index / (dataset.data.length - 1)) * chartWidth;
      const y = padding + chartHeight - (value / Math.max(...dataset.data)) * chartHeight;
      return `${x},${y}`;
    });
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    return `M ${points.join(' L ')} L ${lastPoint.split(',')[0]},${padding + chartHeight} L ${firstPoint.split(',')[0]},${padding + chartHeight} Z`;
  };

  return (
    <div className={`w-full ${className}`}>
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Area fills */}
        {showArea && data.datasets.map((dataset, index) => (
          <motion.path
            key={`area-${index}`}
            d={createAreaPath(dataset)}
            fill={`${dataset.color}20`}
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          />
        ))}
        
        {/* Lines */}
        {data.datasets.map((dataset, index) => (
          <motion.path
            key={`line-${index}`}
            d={createPath(dataset)}
            fill="none"
            stroke={dataset.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animated ? { pathLength: 0 } : {}}
            animate={animated ? { pathLength: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
          />
        ))}
        
        {/* Points */}
        {showPoints && data.datasets.map((dataset, datasetIndex) => (
          dataset.data.map((value, pointIndex) => {
            const x = padding + (pointIndex / (dataset.data.length - 1)) * chartWidth;
            const y = padding + chartHeight - (value / Math.max(...dataset.data)) * chartHeight;
            
            return (
              <motion.circle
                key={`point-${datasetIndex}-${pointIndex}`}
                cx={x}
                cy={y}
                r="4"
                fill={dataset.color}
                stroke="white"
                strokeWidth="2"
                initial={animated ? { scale: 0, opacity: 0 } : {}}
                animate={animated ? { scale: 1, opacity: 1 } : {}}
                transition={{ 
                  delay: datasetIndex * 0.2 + pointIndex * 0.1 + 0.5, 
                  duration: 0.3 
                }}
              />
            );
          })
        ))}
        
        {/* Labels */}
        {data.labels.map((label, index) => {
          const x = padding + (index / (data.labels.length - 1)) * chartWidth;
          
          return (
            <motion.text
              key={`label-${index}`}
              x={x}
              y={height - 5}
              textAnchor="middle"
              className="text-xs text-muted-foreground"
              initial={animated ? { opacity: 0, y: 10 } : {}}
              animate={animated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 1, duration: 0.3 }}
            >
              {label}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
} 