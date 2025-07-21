'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardMetrics } from '@/types';
import { 
  TrendingUp, 
  BookOpen, 
  Target, 
  Award, 
  Clock, 
  Star,
  Zap,
  Shield
} from 'lucide-react';

interface MetricsCardProps {
  metrics: DashboardMetrics;
  className?: string;
}

const metricConfigs = [
  {
    key: 'totalPoints' as keyof DashboardMetrics,
    label: 'Total Points',
    icon: TrendingUp,
    color: 'text-primary',
    gradient: 'from-red-500 to-red-600'
  },
  {
    key: 'coursesCompleted' as keyof DashboardMetrics,
    label: 'Courses Completed',
    icon: BookOpen,
    color: 'text-accent',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    key: 'bountiesWon' as keyof DashboardMetrics,
    label: 'Bounties Won',
    icon: Target,
    color: 'text-green-400',
    gradient: 'from-green-500 to-green-600'
  },
  {
    key: 'learningStreak' as keyof DashboardMetrics,
    label: 'Learning Streak',
    icon: Award,
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    key: 'currentLevel' as keyof DashboardMetrics,
    label: 'Current Level',
    icon: Star,
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    key: 'timeSpent' as keyof DashboardMetrics,
    label: 'Time Spent (hrs)',
    icon: Clock,
    color: 'text-orange-400',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    key: 'averageScore' as keyof DashboardMetrics,
    label: 'Average Score',
    icon: Zap,
    color: 'text-pink-400',
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    key: 'certificatesEarned' as keyof DashboardMetrics,
    label: 'Certificates',
    icon: Shield,
    color: 'text-indigo-400',
    gradient: 'from-indigo-500 to-indigo-600'
  }
];

export default function MetricsCard({ metrics, className = '' }: MetricsCardProps) {
  return (
    <Card className={`cyber-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Key Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metricConfigs.map((config, index) => {
            const Icon = config.icon;
            const value = metrics[config.key];
            const displayValue = config.key === 'timeSpent' 
              ? Math.round(value / 60) 
              : config.key === 'averageScore' 
                ? `${value}%` 
                : value;

            return (
              <motion.div
                key={config.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
                  </div>
                  <div className="text-2xl font-bold text-white font-cyber">
                    {displayValue}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {config.label}
                  </div>
                  
                  {/* Hover glow effect */}
                  <div 
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 