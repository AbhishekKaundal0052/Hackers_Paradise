'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Target, 
  FileText, 
  Users, 
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Lock,
  Activity
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    level: number;
    experience: number;
    nextLevelExp: number;
  };
  stats?: {
    coursesCompleted: number;
    bountiesWon: number;
    totalPoints: number;
    streak: number;
  };
  recentActivity?: Array<{
    id: string;
    type: 'course' | 'bounty' | 'achievement' | 'login';
    title: string;
    description: string;
    timestamp: string;
    icon: string;
  }>;
}

const navigationItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Home,
    badge: null
  },
  { 
    name: 'Courses', 
    href: '/courses', 
    icon: BookOpen,
    badge: '12'
  },
  { 
    name: 'Bounties', 
    href: '/bounties', 
    icon: Target,
    badge: '5'
  },
  { 
    name: 'Blog', 
    href: '/blog', 
    icon: FileText,
    badge: null
  },
  { 
    name: 'Community', 
    href: '/community', 
    icon: Users,
    badge: '3'
  },
  { 
    name: 'Profile', 
    href: '/profile', 
    icon: User,
    badge: null
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    badge: null
  },
];

const learningPaths = [
  {
    name: 'Ethical Hacking',
    progress: 75,
    color: 'from-red-500 to-red-600',
    icon: Shield
  },
  {
    name: 'Network Security',
    progress: 45,
    color: 'from-blue-500 to-blue-600',
    icon: Lock
  },
  {
    name: 'Web Security',
    progress: 30,
    color: 'from-purple-500 to-purple-600',
    icon: Zap
  },
  {
    name: 'Cryptography',
    progress: 20,
    color: 'from-green-500 to-green-600',
    icon: Activity
  }
];

export default function Sidebar({ 
  user, 
  stats = {
    coursesCompleted: 8,
    bountiesWon: 12,
    totalPoints: 2450,
    streak: 7
  },
  recentActivity = []
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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

  const activity = recentActivity.length > 0 ? recentActivity : mockActivity;

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      <div className="h-full glass-card-dark border-r border-white/10 flex flex-col">
        {/* Collapse Toggle */}
        <div className="flex justify-end p-4 border-b border-white/10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCollapse}
            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-white" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white" />
            )}
          </motion.button>
        </div>

        {/* User Profile */}
        {user && !isCollapsed && (
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-white font-cyber">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Level {user.level} • {user.role}
                </p>
                <div className="mt-1">
                  <Progress 
                    value={(user.experience / user.nextLevelExp) * 100} 
                    className="h-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {user.experience} / {user.nextLevelExp} XP
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary' 
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-white'}`}>
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/20 rounded-full blur-sm"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.name}</span>
                      {item.badge && (
                        <Badge className="bg-primary text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="p-4 border-t border-white/10 space-y-4">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="glass-card-dark border-white/10">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Courses</p>
                      <p className="text-sm font-bold text-white">{stats.coursesCompleted}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card-dark border-white/10">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bounties</p>
                      <p className="text-sm font-bold text-white">{stats.bountiesWon}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card-dark border-white/10">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-xs text-muted-foreground">Points</p>
                      <p className="text-sm font-bold text-white">{stats.totalPoints}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card-dark border-white/10">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <div>
                      <p className="text-xs text-muted-foreground">Streak</p>
                      <p className="text-sm font-bold text-white">{stats.streak} days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Learning Progress */}
        {!isCollapsed && (
          <div className="p-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-white mb-3">Learning Paths</h3>
            <div className="space-y-3">
              {learningPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <div key={path.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 bg-gradient-to-r ${path.color} bg-clip-text text-transparent`} />
                        <span className="text-xs text-white">{path.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-1" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {!isCollapsed && (
          <div className="p-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3>
            <div className="space-y-3 max-h-32 overflow-y-auto custom-scrollbar">
              {activity.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
} 