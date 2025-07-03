'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  WifiOff, 
  Bell, 
  BellOff, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Zap
} from 'lucide-react';

interface RealTimeUpdate {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  icon?: string;
}

interface RealTimeUpdatesProps {
  onMetricsUpdate?: (metrics: any) => void;
  onActivityUpdate?: (activity: any) => void;
  className?: string;
}

export default function RealTimeUpdates({ 
  onMetricsUpdate, 
  onActivityUpdate, 
  className = '' 
}: RealTimeUpdatesProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [updateCount, setUpdateCount] = useState(0);

  // Simulate real-time updates
  const simulateUpdate = useCallback(() => {
    const updateTypes: RealTimeUpdate['type'][] = ['success', 'warning', 'error', 'info'];
    const updateMessages = [
      'Course progress updated',
      'New bounty available',
      'Achievement unlocked',
      'Streak milestone reached',
      'Deadline approaching',
      'Points earned',
      'Level up!',
      'Certificate earned'
    ];

    const newUpdate: RealTimeUpdate = {
      id: Date.now().toString(),
      type: updateTypes[Math.floor(Math.random() * updateTypes.length)],
      message: updateMessages[Math.floor(Math.random() * updateMessages.length)],
      timestamp: new Date(),
      icon: '🎯'
    };

    setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]);
    setLastUpdate(new Date());
    setUpdateCount(prev => prev + 1);

    // Simulate metrics update
    if (onMetricsUpdate) {
      onMetricsUpdate({
        totalPoints: Math.floor(Math.random() * 1000) + 2000,
        learningStreak: Math.floor(Math.random() * 10) + 5,
        currentLevel: Math.floor(Math.random() * 5) + 15
      });
    }

    // Simulate activity update
    if (onActivityUpdate) {
      onActivityUpdate({
        type: 'course_completed',
        title: 'Completed Advanced Course',
        description: 'Earned 200 points',
        timestamp: new Date(),
        points: 200
      });
    }
  }, [onMetricsUpdate, onActivityUpdate]);

  // Auto-update simulation
  useEffect(() => {
    if (!isConnected || !notificationsEnabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of update
        simulateUpdate();
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isConnected, notificationsEnabled, simulateUpdate]);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      // Reconnect simulation
      setTimeout(() => {
        setUpdates(prev => [{
          id: Date.now().toString(),
          type: 'success',
          message: 'Connection restored',
          timestamp: new Date(),
          icon: '🔗'
        }, ...prev.slice(0, 4)]);
      }, 1000);
    }
  };

  const clearUpdates = () => {
    setUpdates([]);
    setUpdateCount(0);
  };

  const getUpdateIcon = (type: RealTimeUpdate['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'info':
        return <TrendingUp className="w-4 h-4 text-blue-400" />;
      default:
        return <Zap className="w-4 h-4 text-primary" />;
    }
  };

  const getUpdateColor = (type: RealTimeUpdate['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'error':
        return 'border-red-500/30 bg-red-500/10';
      case 'info':
        return 'border-blue-500/30 bg-blue-500/10';
      default:
        return 'border-white/20 bg-white/5';
    }
  };

  return (
    <Card className={`cyber-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            <span>Real-Time Updates</span>
            <Badge variant="secondary" className="ml-2">
              {updateCount}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleConnection}
              className="h-8 w-8 p-0 hover:bg-white/10"
              title={isConnected ? 'Disconnect' : 'Connect'}
            >
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="h-8 w-8 p-0 hover:bg-white/10"
              title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
            >
              {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={simulateUpdate}
              className="h-8 w-8 p-0 hover:bg-white/10"
              title="Simulate update"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Status: {isConnected ? 'Connected' : 'Disconnected'}
            </span>
            <span className="text-muted-foreground">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>

          {/* Updates List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {updates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${getUpdateColor(update.type)}`}
                >
                  <div className="flex items-center space-x-3">
                    {getUpdateIcon(update.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{update.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {update.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {update.icon && (
                      <span className="text-lg">{update.icon}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {updates.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No updates yet</p>
                <p className="text-xs">Updates will appear here in real-time</p>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="text-xs text-muted-foreground">
              Auto-updates: {notificationsEnabled ? 'Enabled' : 'Disabled'}
            </div>
            {updates.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearUpdates}
                className="text-xs text-muted-foreground hover:text-white"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 