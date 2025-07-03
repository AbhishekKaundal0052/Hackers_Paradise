'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Achievement } from '@/types';
import { Award, Lock, Star, Zap, Shield, Target } from 'lucide-react';

interface AchievementBadgesProps {
  achievements: Achievement[];
  className?: string;
}

export default function AchievementBadges({ achievements, className = '' }: AchievementBadgesProps) {
  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400 text-gray-400 bg-gray-500/20';
      case 'rare':
        return 'border-blue-400 text-blue-400 bg-blue-500/20';
      case 'epic':
        return 'border-purple-400 text-purple-400 bg-purple-500/20';
      case 'legendary':
        return 'border-yellow-400 text-yellow-400 bg-yellow-500/20';
      default:
        return 'border-gray-400 text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'course':
        return Star;
      case 'bounty':
        return Target;
      case 'streak':
        return Zap;
      case 'skill':
        return Shield;
      case 'special':
        return Award;
      default:
        return Award;
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  return (
    <Card className={`cyber-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-primary" />
          <span>Achievement Badges</span>
          <Badge variant="secondary" className="ml-auto">
            {unlockedAchievements.length}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Unlocked Achievements */}
          {unlockedAchievements.map((achievement, index) => {
            const Icon = getCategoryIcon(achievement.category);
            
            return (
              <Tooltip key={achievement.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative group cursor-pointer p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)} hover:scale-105 transition-all duration-300`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <Icon className="w-8 h-8" />
                      <div className="text-xs font-medium">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground">
                        +{achievement.points} pts
                      </div>
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-primary to-accent" />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    <div className="text-xs text-primary">+{achievement.points} points</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Locked Achievements */}
          {lockedAchievements.slice(0, 4).map((achievement, index) => {
            const Icon = getCategoryIcon(achievement.category);
            
            return (
              <Tooltip key={achievement.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (unlockedAchievements.length + index) * 0.1, duration: 0.5 }}
                    className="relative group cursor-pointer p-4 rounded-lg border-2 border-gray-600 text-gray-500 bg-gray-600/20 hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="relative">
                        <Icon className="w-8 h-8" />
                        <Lock className="w-4 h-4 absolute -top-1 -right-1" />
                      </div>
                      <div className="text-xs font-medium">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.progress}% complete
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    <div className="text-xs text-primary">{achievement.requirement}</div>
                    <div className="text-xs text-muted-foreground">{achievement.progress}% complete</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {achievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Achievements Yet</h3>
            <p className="text-muted-foreground">
              Complete courses and win bounties to unlock achievements
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 