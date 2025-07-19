'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LearningProgress, ProgressRingData } from '@/types';
import ProgressRing from './ProgressRing';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface ProgressCardProps {
  progress: LearningProgress[];
  className?: string;
}

export default function ProgressCard({ progress, className = '' }: ProgressCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'expert': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-red-500/20 text-red-400',
      'bg-blue-500/20 text-blue-400',
      'bg-green-500/20 text-green-400',
      'bg-purple-500/20 text-purple-400',
      'bg-yellow-500/20 text-yellow-400',
      'bg-pink-500/20 text-pink-400'
    ];
    return colors[category.length % colors.length];
  };

  return (
    <Card className={`cyber-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span>Learning Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {progress.map((course, index) => {
          const progressData: ProgressRingData = {
            percentage: course.progress,
            size: 80,
            strokeWidth: 6,
            color: '#FF0000',
            label: 'Progress',
            value: `${course.progress}%`
          };

          const daysToComplete = Math.ceil(
            (course.estimatedCompletion.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Progress Ring */}
              <div className="flex-shrink-0">
                <ProgressRing data={progressData} />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white mb-2 truncate">
                  {course.courseTitle}
                </h3>
                
                <div className="flex items-center space-x-3 mb-3">
                  <Badge 
                    variant="secondary" 
                    className={getDifficultyColor(course.difficulty)}
                  >
                    {course.difficulty}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={getCategoryColor(course.category)}
                  >
                    {course.category.replace('_', ' ')}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.completedLessons}/{course.totalLessons} lessons
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-purple-600 h-2 rounded-full relative overflow-hidden"
                    style={{ width: `${course.progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  >
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </motion.div>
                </div>

                {/* Completion info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </span>
                  <span>
                    {daysToComplete > 0 ? `${daysToComplete} days left` : 'Due today'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <Button 
                  size="sm" 
                  className="cyber-button-secondary group"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          );
        })}

        {progress.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Active Courses</h3>
            <p className="text-muted-foreground mb-4">
              Start your cybersecurity journey by enrolling in a course
            </p>
            <Button className="cyber-button">
              Browse Courses
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 