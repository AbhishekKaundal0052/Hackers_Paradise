'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UpcomingDeadline } from '@/types';
import { Clock, AlertTriangle, Calendar, ArrowRight } from 'lucide-react';

interface DeadlinesCardProps {
  deadlines: UpcomingDeadline[];
  className?: string;
}

export default function DeadlinesCard({ deadlines, className = '' }: DeadlinesCardProps) {
  const getPriorityColor = (priority: UpcomingDeadline['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} left`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} left`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} left`;
    } else {
      return 'Due now';
    }
  };

  const isOverdue = (deadline: Date) => {
    return new Date() > deadline;
  };

  const sortedDeadlines = [...deadlines].sort((a, b) => {
    if (isOverdue(a.deadline) && !isOverdue(b.deadline)) return -1;
    if (!isOverdue(a.deadline) && isOverdue(b.deadline)) return 1;
    return a.deadline.getTime() - b.deadline.getTime();
  });

  return (
    <Card className={`cyber-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>Upcoming Deadlines</span>
          {deadlines.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {deadlines.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedDeadlines.map((deadline, index) => {
            const timeRemaining = getTimeRemaining(deadline.deadline);
            const overdue = isOverdue(deadline.deadline);
            
            return (
              <motion.div
                key={deadline.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 ${
                  overdue ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{deadline.title}</h3>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <Badge variant="secondary" className={getPriorityColor(deadline.priority)}>
                        {deadline.priority}
                      </Badge>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {deadline.type}
                      </span>
                    </div>
                  </div>
                  {overdue && (
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                </div>
                
                {deadline.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {deadline.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Clock className={`w-4 h-4 mr-2 ${overdue ? 'text-red-400' : 'text-primary'}`} />
                    <span className={overdue ? 'text-red-400 font-medium' : 'text-muted-foreground'}>
                      {overdue ? 'Overdue' : timeRemaining}
                    </span>
                  </div>
                  
                  {deadline.url && (
                    <Button size="sm" className="cyber-button-secondary group">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {deadlines.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Deadlines</h3>
              <p className="text-muted-foreground">
                You're all caught up! No upcoming deadlines.
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 