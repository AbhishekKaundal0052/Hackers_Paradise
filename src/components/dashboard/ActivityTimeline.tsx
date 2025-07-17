'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ActivityItem } from '@/types';
import { 
  Activity, 
  Clock, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Target,
  Star,
  Zap
} from 'lucide-react';

interface ActivityTimelineProps {
  activities: ActivityItem[];
  className?: string;
}

export default function ActivityTimeline({ activities, className = '' }: ActivityTimelineProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'course_completed':
        return BookOpen;
      case 'bounty_won':
        return Target;
      case 'achievement_unlocked':
        return Award;
      case 'level_up':
        return TrendingUp;
      case 'certificate_earned':
        return Star;
      case 'streak_milestone':
        return Zap;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'course_completed':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'bounty_won':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'achievement_unlocked':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'level_up':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'certificate_earned':
        return 'text-pink-400 bg-pink-500/20 border-pink-500/30';
      case 'streak_milestone':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Card className={`cyber-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {/* Timeline line */}
                {index < activities.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                )}

                <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white truncate">
                        {activity.title}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className={getActivityColor(activity.type)}
                      >
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimestamp(activity.timestamp)}
                      </div>
                      
                      {activity.points && (
                        <div className="flex items-center text-xs text-primary font-medium">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{activity.points} points
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {activities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Recent Activity</h3>
              <p className="text-muted-foreground">
                Start learning to see your activity here
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 