'use client';

import { motion } from 'framer-motion';
import { Trophy, BookOpen, DollarSign, Users, Award, Clock } from 'lucide-react';
import { UserStats } from '@/types/profile';

const mockStats: UserStats = {
  overall: {
    totalPoints: 15420,
    rank: 3,
    level: 42,
    experiencePoints: 8420,
    nextLevelXP: 10000
  },
  learning: {
    coursesCompleted: 28,
    certificationsEarned: 5,
    totalLearningHours: 342,
    currentStreak: 15
  },
  bounties: {
    totalEarnings: 12500,
    bountiesWon: 15,
    successRate: 87.5,
    averageReward: 833
  },
  community: {
    forumPosts: 342,
    helpfulAnswers: 156,
    mentoringSessions: 23,
    eventsAttended: 8
  }
};

export function StatisticsDashboard() {
  const progressPercentage = (mockStats.overall.experiencePoints / mockStats.overall.nextLevelXP) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Statistics Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Updated 2 minutes ago</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card-dark p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-sm text-gray-400">Overall</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-white">{mockStats.overall.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Points</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Rank</span>
              <span className="text-lg font-semibold text-red-400">#{mockStats.overall.rank}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Level</span>
              <span className="text-lg font-semibold text-purple-400">{mockStats.overall.level}</span>
            </div>
          </div>
        </motion.div>

        {/* Learning Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card-dark p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="text-sm text-gray-400">Learning</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-white">{mockStats.learning.coursesCompleted}</div>
              <div className="text-sm text-gray-400">Courses Completed</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Certifications</span>
              <span className="text-lg font-semibold text-green-400">{mockStats.learning.certificationsEarned}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Streak</span>
              <span className="text-lg font-semibold text-orange-400">{mockStats.learning.currentStreak} days</span>
            </div>
          </div>
        </motion.div>

        {/* Bounty Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card-dark p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <span className="text-sm text-gray-400">Bounties</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-white">${mockStats.bounties.totalEarnings.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Earnings</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Success Rate</span>
              <span className="text-lg font-semibold text-green-400">{mockStats.bounties.successRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Won</span>
              <span className="text-lg font-semibold text-purple-400">{mockStats.bounties.bountiesWon}</span>
            </div>
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card-dark p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-purple-400" />
            <span className="text-sm text-gray-400">Community</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-white">{mockStats.community.forumPosts}</div>
              <div className="text-sm text-gray-400">Forum Posts</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Helpful</span>
              <span className="text-lg font-semibold text-blue-400">{mockStats.community.helpfulAnswers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Mentoring</span>
              <span className="text-lg font-semibold text-orange-400">{mockStats.community.mentoringSessions}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card-dark p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Level Progress</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
                  className="text-red-500 transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{Math.round(progressPercentage)}%</div>
                  <div className="text-xs text-gray-400">Complete</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                <div>
                  <div className="text-lg font-semibold text-white">Level {mockStats.overall.level}</div>
                  <div className="text-sm text-gray-400">Current Level</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">
                    {mockStats.overall.experiencePoints.toLocaleString()} / {mockStats.overall.nextLevelXP.toLocaleString()} XP
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-gradient-to-r from-red-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievement Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card-dark p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {[
              { icon: '🏆', title: 'Security Expert', date: '2 days ago', color: 'text-yellow-400' },
              { icon: '🐛', title: 'Bug Hunter', date: '1 week ago', color: 'text-green-400' },
              { icon: '🎓', title: 'Mentor', date: '2 weeks ago', color: 'text-blue-400' },
              { icon: '⚡', title: 'Speed Demon', date: '1 month ago', color: 'text-purple-400' }
            ].map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`text-2xl ${achievement.color}`}>{achievement.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{achievement.title}</div>
                  <div className="text-xs text-gray-400">{achievement.date}</div>
                </div>
                <Award className="w-4 h-4 text-gray-500" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skill Radar Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass-card-dark p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Skills Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Web Security', level: 85, color: 'from-red-500 to-pink-500' },
            { name: 'Network Security', level: 78, color: 'from-blue-500 to-cyan-500' },
            { name: 'Cryptography', level: 72, color: 'from-purple-500 to-indigo-500' },
            { name: 'Malware Analysis', level: 65, color: 'from-green-500 to-emerald-500' }
          ].map((skill, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-400 mb-2">{skill.name}</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{skill.level}%</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 