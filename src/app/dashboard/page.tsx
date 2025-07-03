'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Skeleton, SkeletonCard, SkeletonChart } from '@/components/ui/skeleton';
import MetricsCard from '@/components/dashboard/MetricsCard';
import ProgressCard from '@/components/dashboard/ProgressCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ProgressRing from '@/components/dashboard/ProgressRing';
import BarChart from '@/components/dashboard/BarChart';
import LineChart from '@/components/dashboard/LineChart';
import Heatmap from '@/components/dashboard/Heatmap';
import AchievementBadges from '@/components/dashboard/AchievementBadges';
import DeadlinesCard from '@/components/dashboard/DeadlinesCard';
import DraggableDashboard from '@/components/dashboard/DraggableDashboard';
import FilterSortControls from '@/components/dashboard/FilterSortControls';
import RealTimeUpdates from '@/components/dashboard/RealTimeUpdates';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Award, 
  Clock, 
  Zap,
  Shield,
  Lock,
  Activity,
  Star,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Maximize2,
  X
} from 'lucide-react';
import { 
  CourseCategory, 
  Difficulty, 
  DashboardWidget,
  Achievement,
  UpcomingDeadline
} from '@/types';

const mockUser = {
  name: 'Alex Chen',
  email: 'alex.chen@hackersparadise.com',
  avatar: '/api/placeholder/40/40',
  role: 'Security Researcher',
  level: 15,
  experience: 1250,
  nextLevelExp: 2000
};

const mockStats = {
  coursesCompleted: 8,
  bountiesWon: 12,
  totalPoints: 2450,
  streak: 7
};

const mockActivity = [
  {
    id: '1',
    type: 'course' as const,
    title: 'Completed Network Security Basics',
    description: 'Earned 150 points',
    timestamp: '2 hours ago',
    icon: '🎓'
  },
  {
    id: '2',
    type: 'bounty' as const,
    title: 'Won Bug Bounty',
    description: 'Found XSS vulnerability',
    timestamp: '1 day ago',
    icon: '🏆'
  },
  {
    id: '3',
    type: 'achievement' as const,
    title: 'Unlocked "Security Expert"',
    description: 'Completed 10 courses',
    timestamp: '3 days ago',
    icon: '⭐'
  }
];

const recentCourses = [
  {
    id: '1',
    title: 'Ethical Hacking Fundamentals',
    progress: 75,
    category: 'Penetration Testing',
    difficulty: 'Intermediate',
    duration: '8 hours',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Web Application Security',
    progress: 45,
    category: 'Web Security',
    difficulty: 'Advanced',
    duration: '12 hours',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Network Security Essentials',
    progress: 100,
    category: 'Network Security',
    difficulty: 'Beginner',
    duration: '6 hours',
    rating: 4.7
  }
];

const activeBounties = [
  {
    id: '1',
    title: 'Find XSS in Login Form',
    reward: 500,
    difficulty: 'Medium',
    deadline: '3 days',
    participants: 24
  },
  {
    id: '2',
    title: 'SQL Injection Challenge',
    reward: 1000,
    difficulty: 'Hard',
    deadline: '1 week',
    participants: 12
  },
  {
    id: '3',
    title: 'CSRF Token Bypass',
    reward: 750,
    difficulty: 'Medium',
    deadline: '5 days',
    participants: 18
  }
];

// Mock data for new widgets
const dashboardMetrics = {
  totalPoints: 2450,
  coursesCompleted: 8,
  bountiesWon: 12,
  learningStreak: 7,
  currentLevel: 15,
  experienceToNextLevel: 750,
  totalExperience: 1250,
  weeklyProgress: 80,
  monthlyProgress: 60,
  averageScore: 92,
  timeSpent: 3200,
  certificatesEarned: 3
};

const learningProgress = [
  {
    courseId: '1',
    courseTitle: 'Ethical Hacking Fundamentals',
    progress: 75,
    completedLessons: 12,
    totalLessons: 16,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    category: CourseCategory.PENETRATION_TESTING,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    courseId: '2',
    courseTitle: 'Web Application Security',
    progress: 45,
    completedLessons: 9,
    totalLessons: 20,
    lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    category: CourseCategory.WEB_SECURITY,
    difficulty: Difficulty.ADVANCED
  }
];

const activityTimeline = [
  {
    id: 'a1',
    type: 'course_completed' as const,
    title: 'Completed Network Security Basics',
    description: 'Earned 150 points',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: '🎓',
    points: 150
  },
  {
    id: 'a2',
    type: 'bounty_won' as const,
    title: 'Won Bug Bounty',
    description: 'Found XSS vulnerability',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    icon: '🏆',
    points: 500
  },
  {
    id: 'a3',
    type: 'achievement_unlocked' as const,
    title: 'Unlocked "Security Expert"',
    description: 'Completed 10 courses',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    icon: '⭐',
    points: 0
  }
];

const barChartData = {
  labels: ['Web', 'Network', 'Crypto', 'Forensics', 'Malware'],
  data: [80, 65, 50, 40, 30],
  colors: ['#b25ffb', '#FF0000', '#6d28d9', '#a21caf', '#7c3aed'],
  maxValue: 100
};

const lineChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Streak',
      data: [1, 2, 3, 4, 5, 6, 7],
      color: '#FF0000',
      fill: true
    }
  ]
};

const heatmapData = {
  data: Array.from({ length: 35 }, (_, i) => ({
    date: `2024-05-${(i + 1).toString().padStart(2, '0')}`,
    value: Math.floor(Math.random() * 10),
    intensity: Math.random()
  })),
  maxValue: 10,
  minValue: 0
};

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first course',
    icon: '🎯',
    color: '#10b981',
    category: 'course',
    rarity: 'common',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    points: 50
  },
  {
    id: '2',
    name: 'Bug Hunter',
    description: 'Win your first bounty',
    icon: '🐛',
    color: '#3b82f6',
    category: 'bounty',
    rarity: 'rare',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    points: 100
  },
  {
    id: '3',
    name: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    color: '#f59e0b',
    category: 'streak',
    rarity: 'epic',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    points: 200
  },
  {
    id: '4',
    name: 'Security Expert',
    description: 'Complete 10 courses',
    icon: '🛡️',
    color: '#8b5cf6',
    category: 'course',
    rarity: 'legendary',
    progress: 80,
    requirement: 'Complete 10 courses (8/10)',
    points: 500
  }
];

const deadlines: UpcomingDeadline[] = [
  {
    id: '1',
    title: 'Web Security Course Assignment',
    type: 'course',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    priority: 'high',
    description: 'Submit final project for Web Application Security course',
    url: '/courses/web-security'
  },
  {
    id: '2',
    title: 'Bug Bounty Submission',
    type: 'bounty',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    priority: 'medium',
    description: 'Submit proof of concept for XSS vulnerability',
    url: '/bounties/xss-challenge'
  }
];

const dashboardWidgets: DashboardWidget[] = [
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
  },
  {
    id: 'achievements',
    type: 'achievements',
    title: 'Achievements',
    position: { x: 0, y: 9, w: 6, h: 2 },
    isVisible: true,
    isCollapsed: false
  },
  {
    id: 'deadlines',
    type: 'deadlines',
    title: 'Deadlines',
    position: { x: 6, y: 9, w: 6, h: 2 },
    isVisible: true,
    isCollapsed: false
  }
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [widgets, setWidgets] = useState<DashboardWidget[]>(() => {
    // Load saved layout from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboard-layout');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to load saved dashboard layout');
        }
      }
    }
    return dashboardWidgets;
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate error
  useEffect(() => {
    const errorTimer = setTimeout(() => {
      if (Math.random() > 0.8) {
        setError('Failed to load some dashboard data. Please try again.');
      }
    }, 3000);
    return () => clearTimeout(errorTimer);
  }, []);

  const handleMetricsUpdate = (newMetrics: any) => {
    // Update metrics in real-time
    console.log('Metrics updated:', newMetrics);
  };

  const handleActivityUpdate = (newActivity: any) => {
    // Update activity in real-time
    console.log('Activity updated:', newActivity);
  };

  const handleWidgetsChange = (newWidgets: DashboardWidget[]) => {
    setWidgets(newWidgets);
    // Save to localStorage
    localStorage.setItem('dashboard-layout', JSON.stringify(newWidgets));
    setSuccessMessage('Dashboard layout saved successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleFiltersChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const openModal = (content: any) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const retryLoad = () => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  if (isLoading) {
    return (
      <Layout showSidebar={true} user={mockUser} stats={mockStats} recentActivity={mockActivity}>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <SkeletonCard />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SkeletonChart />
                  <SkeletonChart />
                </div>
              </div>
              <div className="space-y-6">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showSidebar={true} user={mockUser} stats={mockStats} recentActivity={mockActivity}>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={retryLoad} className="cyber-button">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <TooltipProvider>
      <Layout showSidebar={true} user={mockUser} stats={mockStats} recentActivity={mockActivity}>
        <div className="container mx-auto px-4 py-8">
          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-green-400">{successMessage}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSuccessMessage(null)}
                  className="text-green-400 hover:text-green-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="cyber-title text-3xl mb-2">
              Welcome back, {mockUser.name}!
            </h1>
            <p className="cyber-subtitle">
              Continue your cybersecurity journey. You&apos;re making great progress!
            </p>
          </motion.div>

          {/* Filter and Sort Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <FilterSortControls
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              onSearchChange={handleSearchChange}
            />
          </motion.div>

          {/* Real-Time Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <RealTimeUpdates
              onMetricsUpdate={handleMetricsUpdate}
              onActivityUpdate={handleActivityUpdate}
            />
          </motion.div>

          {/* Draggable Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <DraggableDashboard
              widgets={widgets}
              onWidgetsChange={handleWidgetsChange}
            />
          </motion.div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Metrics Card */}
              <MetricsCard metrics={dashboardMetrics} />

              {/* Progress Card */}
              <ProgressCard progress={learningProgress} />

              {/* Charts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Skill Levels</h3>
                  <BarChart data={barChartData} />
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Learning Streak</h3>
                  <LineChart data={lineChartData} />
                </div>
              </div>

              {/* Heatmap */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Activity Heatmap</h3>
                <Heatmap data={heatmapData} />
              </div>
            </div>

            <div className="space-y-8">
              {/* Activity Timeline */}
              <ActivityTimeline activities={activityTimeline} />

              {/* Achievement Badges */}
              <AchievementBadges achievements={achievements} />

              {/* Deadlines Card */}
              <DeadlinesCard deadlines={deadlines} />
            </div>
          </div>

          {/* Modal for Detailed Views */}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="cyber-card max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Detailed View</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={closeModal}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="p-6">
                {modalContent && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">{modalContent.title}</h3>
                    <p className="text-muted-foreground">{modalContent.description}</p>
                    {/* Add more detailed content here */}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Layout>
    </TooltipProvider>
  );
} 