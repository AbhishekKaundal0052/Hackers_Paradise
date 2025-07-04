'use client';

import { useState, useCallback } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardWidget } from '@/types';
import { GripVertical, Settings, Eye, EyeOff, Plus, Grid3X3, BarChart3, Activity, Target, Award, Clock, TrendingUp } from 'lucide-react';
import ProgressRing from './ProgressRing';
import BarChart from './BarChart';
import LineChart from './LineChart';
import Heatmap from './Heatmap';

interface DraggableDashboardProps {
  widgets: DashboardWidget[];
  onWidgetsChange: (widgets: DashboardWidget[]) => void;
  className?: string;
}

// Dummy data for widgets
const widgetData = {
  metrics: {
    totalPoints: 2450,
    coursesCompleted: 8,
    bountiesWon: 12,
    learningStreak: 7
  },
  progress: {
    currentCourse: 'Ethical Hacking Fundamentals',
    progress: 75,
    completedLessons: 12,
    totalLessons: 16
  },
  activity: {
    recentActivities: [
      { type: 'course', title: 'Completed Network Security', time: '2h ago' },
      { type: 'bounty', title: 'Won Bug Bounty', time: '1d ago' },
      { type: 'achievement', title: 'Unlocked Expert Badge', time: '3d ago' }
    ]
  },
  skills: {
    labels: ['Web', 'Network', 'Crypto', 'Forensics'],
    data: [80, 65, 50, 40],
    colors: ['#b25ffb', '#FF0000', '#6d28d9', '#a21caf'],
    maxValue: 100
  },
  streak: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Streak',
      data: [1, 2, 3, 4, 5, 6, 7],
      color: '#FF0000',
      fill: true
    }]
  },
  heatmap: {
    data: Array.from({ length: 35 }, (_, i) => ({
      date: `2024-05-${(i + 1).toString().padStart(2, '0')}`,
      value: Math.floor(Math.random() * 10),
      intensity: Math.random()
    })),
    maxValue: 10,
    minValue: 0
  },
  achievements: {
    unlocked: 3,
    total: 12,
    recent: 'Security Expert'
  },
  deadlines: {
    upcoming: 2,
    overdue: 0,
    nextDeadline: 'Web Security Assignment'
  }
};

const availableWidgets = [
  { id: 'metrics', title: 'Key Metrics', icon: TrendingUp, type: 'metrics' },
  { id: 'progress', title: 'Learning Progress', icon: Target, type: 'progress' },
  { id: 'activity', title: 'Recent Activity', icon: Activity, type: 'activity' },
  { id: 'skills', title: 'Skill Levels', icon: BarChart3, type: 'chart' },
  { id: 'streak', title: 'Learning Streak', icon: TrendingUp, type: 'chart' },
  { id: 'heatmap', title: 'Activity Heatmap', icon: Grid3X3, type: 'chart' },
  { id: 'achievements', title: 'Achievements', icon: Award, type: 'achievements' },
  { id: 'deadlines', title: 'Deadlines', icon: Clock, type: 'deadlines' }
];

export default function DraggableDashboard({ 
  widgets, 
  onWidgetsChange, 
  className = '' 
}: DraggableDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);

  const toggleWidgetVisibility = useCallback((widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId 
        ? { ...widget, isVisible: !widget.isVisible }
        : widget
    );
    onWidgetsChange(updatedWidgets);
  }, [widgets, onWidgetsChange]);

  const toggleWidgetCollapse = useCallback((widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId 
        ? { ...widget, isCollapsed: !widget.isCollapsed }
        : widget
    );
    onWidgetsChange(updatedWidgets);
  }, [widgets, onWidgetsChange]);

  const addWidget = useCallback((widgetType: string) => {
    const widgetTemplate = availableWidgets.find(w => w.id === widgetType);
    if (!widgetTemplate) return;

    const newWidget: DashboardWidget = {
      id: `${widgetType}_${Date.now()}`,
      type: widgetTemplate.type as any,
      title: widgetTemplate.title,
      position: { x: 0, y: widgets.length, w: 6, h: 2 },
      isVisible: true,
      isCollapsed: false
    };

    onWidgetsChange([...widgets, newWidget]);
    setShowWidgetLibrary(false);
  }, [widgets, onWidgetsChange]);

  const restoreAllWidgets = useCallback(() => {
    const hiddenWidgets = widgets.filter(w => !w.isVisible);
    const updatedWidgets = widgets.map(widget => ({
      ...widget,
      isVisible: true
    }));
    onWidgetsChange(updatedWidgets);
  }, [widgets, onWidgetsChange]);

  const resetLayout = useCallback(() => {
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'metrics',
        type: 'metrics',
        title: 'Key Metrics',
        position: { x: 0, y: 0, w: 12, h: 2 },
        isVisible: true,
        isCollapsed: false
      },
      {
        id: 'progress',
        type: 'progress',
        title: 'Learning Progress',
        position: { x: 0, y: 2, w: 8, h: 3 },
        isVisible: true,
        isCollapsed: false
      },
      {
        id: 'activity',
        type: 'activity',
        title: 'Recent Activity',
        position: { x: 8, y: 2, w: 4, h: 3 },
        isVisible: true,
        isCollapsed: false
      },
      {
        id: 'skills',
        type: 'chart',
        title: 'Skill Levels',
        position: { x: 0, y: 5, w: 6, h: 2 },
        isVisible: true,
        isCollapsed: false
      },
      {
        id: 'streak',
        type: 'chart',
        title: 'Learning Streak',
        position: { x: 6, y: 5, w: 6, h: 2 },
        isVisible: true,
        isCollapsed: false
      },
      {
        id: 'heatmap',
        type: 'chart',
        title: 'Activity Heatmap',
        position: { x: 0, y: 7, w: 12, h: 2 },
        isVisible: true,
        isCollapsed: false
      }
    ];
    onWidgetsChange(defaultWidgets);
  }, [onWidgetsChange]);

  const visibleWidgets = widgets.filter(widget => widget.isVisible);
  const hiddenWidgets = widgets.filter(widget => !widget.isVisible);

  const renderWidgetContent = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'metrics':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">{widgetData.metrics.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-accent">{widgetData.metrics.coursesCompleted}</div>
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{widgetData.metrics.bountiesWon}</div>
              <div className="text-sm text-muted-foreground">Bounties</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{widgetData.metrics.learningStreak}</div>
              <div className="text-sm text-muted-foreground">Streak</div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="flex items-center space-x-4">
            <ProgressRing 
              data={{
                percentage: widgetData.progress.progress,
                size: 80,
                strokeWidth: 6,
                color: '#FF0000',
                label: 'Progress',
                value: `${widgetData.progress.progress}%`
              }}
            />
            <div className="flex-1">
              <h4 className="font-medium text-white mb-1">{widgetData.progress.currentCourse}</h4>
              <p className="text-sm text-muted-foreground">
                {widgetData.progress.completedLessons}/{widgetData.progress.totalLessons} lessons
              </p>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${widgetData.progress.progress}%` }}
                />
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-3">
            {widgetData.activity.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'chart':
        if (widget.id.includes('skills')) {
          return <BarChart data={widgetData.skills} height={150} />;
        } else if (widget.id.includes('streak')) {
          return <LineChart data={widgetData.streak} height={150} />;
        } else if (widget.id.includes('heatmap')) {
          return <Heatmap data={widgetData.heatmap} />;
        }
        return <div className="text-center text-muted-foreground">Chart Widget</div>;

      case 'achievements':
        return (
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">{widgetData.achievements.unlocked}</div>
            <div className="text-sm text-muted-foreground">
              of {widgetData.achievements.total} achievements unlocked
            </div>
            <div className="text-xs text-accent">Recent: {widgetData.achievements.recent}</div>
          </div>
        );

      case 'deadlines':
        return (
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-orange-400">{widgetData.deadlines.upcoming}</div>
            <div className="text-sm text-muted-foreground">upcoming deadlines</div>
            <div className="text-xs text-primary">Next: {widgetData.deadlines.nextDeadline}</div>
          </div>
        );

      default:
        return <div className="text-center text-muted-foreground">Widget Content</div>;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Dashboard Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Customizable Dashboard</h2>
        <div className="flex items-center space-x-2">
          {hiddenWidgets.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={restoreAllWidgets}
              className="cyber-button-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              Restore All ({hiddenWidgets.length})
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowWidgetLibrary(!showWidgetLibrary)}
            className="cyber-button-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Widget
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="cyber-button-secondary"
          >
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? 'Done' : 'Customize'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={resetLayout}
            className="cyber-button-secondary"
            title="Reset to default layout"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Widget Library */}
      <AnimatePresence>
        {showWidgetLibrary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-bold text-white mb-4">Add Widgets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableWidgets.map((widget) => {
                const Icon = widget.icon;
                const isAdded = widgets.some(w => w.id.includes(widget.id));
                
                return (
                  <Button
                    key={widget.id}
                    size="sm"
                    variant={isAdded ? "outline" : "default"}
                    onClick={() => !isAdded && addWidget(widget.id)}
                    disabled={isAdded}
                    className={`justify-start ${isAdded ? 'opacity-50' : 'cyber-button'}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {widget.title}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Grid */}
      <Reorder.Group
        axis="y"
        values={visibleWidgets}
        onReorder={(newOrder) => {
          const updatedWidgets = widgets.map(widget => {
            const newIndex = newOrder.findIndex(w => w.id === widget.id);
            return { ...widget, position: { ...widget.position, y: newIndex } };
          });
          onWidgetsChange(updatedWidgets);
        }}
        className="space-y-4"
      >
        {visibleWidgets.map((widget) => (
          <Reorder.Item
            key={widget.id}
            value={widget}
            whileDrag={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            className="relative"
          >
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="cyber-card relative group">
                {/* Drag Handle */}
                {isEditing && (
                  <div className="absolute top-4 left-4 z-10">
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab active:cursor-grabbing" />
                  </div>
                )}

                {/* Widget Controls */}
                {isEditing && (
                  <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleWidgetCollapse(widget.id)}
                      className="h-8 w-8 p-0 hover:bg-white/10"
                      title={widget.isCollapsed ? 'Expand' : 'Collapse'}
                    >
                      {widget.isCollapsed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleWidgetVisibility(widget.id)}
                      className="h-8 w-8 p-0 hover:bg-white/10"
                      title="Hide widget"
                    >
                      <EyeOff className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <CardHeader className={isEditing ? 'pl-12 pr-16' : ''}>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{widget.title}</span>
                    {isEditing && (
                      <Badge variant="secondary" className="text-xs">
                        {widget.type}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>

                {!widget.isCollapsed && (
                  <CardContent className={isEditing ? 'pl-12' : ''}>
                    {renderWidgetContent(widget)}
                  </CardContent>
                )}
              </Card>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Empty State */}
      {visibleWidgets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-white mb-2">No Widgets Visible</h3>
          <p className="text-muted-foreground mb-4">
            All widgets are hidden. Add widgets or restore hidden ones.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              onClick={() => setShowWidgetLibrary(true)}
              className="cyber-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Widgets
            </Button>
            {hiddenWidgets.length > 0 && (
              <Button 
                onClick={restoreAllWidgets}
                className="cyber-button-secondary"
              >
                <Eye className="w-4 h-4 mr-2" />
                Restore All
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
} 