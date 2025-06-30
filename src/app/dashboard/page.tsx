'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  // Users,
  Star
} from 'lucide-react';

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

export default function DashboardPage() {
  return (
    <Layout 
      showSidebar={true}
      user={mockUser}
      stats={mockStats}
      recentActivity={mockActivity}
    >
      <div className="container mx-auto px-4 py-8">
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

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="cyber-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold text-white">{mockStats.totalPoints}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                  <p className="text-2xl font-bold text-white">{mockStats.coursesCompleted}</p>
                </div>
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bounties Won</p>
                  <p className="text-2xl font-bold text-white">{mockStats.bountiesWon}</p>
                </div>
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Streak</p>
                  <p className="text-2xl font-bold text-white">{mockStats.streak} days</p>
                </div>
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Recent Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{course.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{course.category}</span>
                        <Badge variant="secondary">{course.difficulty}</Badge>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-16 rounded-full border-4 border-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{course.progress}%</span>
                      </div>
                      <Button size="sm" className="mt-2 cyber-button-secondary">
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Bounties */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-accent" />
                  <span>Active Bounties</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeBounties.map((bounty) => (
                  <div key={bounty.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h3 className="font-medium text-white mb-2">{bounty.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <Zap className="w-3 h-3 mr-1 text-yellow-400" />
                        ${bounty.reward}
                      </span>
                      <Badge variant="secondary">{bounty.difficulty}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>Deadline: {bounty.deadline}</span>
                      <span>{bounty.participants} participants</span>
                    </div>
                    <Button size="sm" className="w-full cyber-button">
                      Join Bounty
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Learning Paths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20">
                  <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Ethical Hacking</h3>
                  <p className="text-sm text-muted-foreground mb-4">Master penetration testing</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">75% Complete</p>
                </div>

                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                  <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Network Security</h3>
                  <p className="text-sm text-muted-foreground mb-4">Secure network infrastructure</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">45% Complete</p>
                </div>

                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                  <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Web Security</h3>
                  <p className="text-sm text-muted-foreground mb-4">Protect web applications</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">30% Complete</p>
                </div>

                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                  <Activity className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Cryptography</h3>
                  <p className="text-sm text-muted-foreground mb-4">Master encryption techniques</p>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">20% Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
} 