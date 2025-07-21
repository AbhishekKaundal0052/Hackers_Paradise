'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus, Award, Target, BookOpen, Bug, MessageSquare } from 'lucide-react';
import { LeaderboardEntry } from '@/types/community';

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      username: 'cyber_hunter',
      avatar: '/avatars/user1.jpg',
      level: 42
    },
    stats: {
      totalPoints: 15420,
      coursesCompleted: 28,
      bountiesWon: 15,
      forumContributions: 342
    },
    trend: 'up',
    change: 2
  },
  {
    rank: 2,
    user: {
      username: 'security_guru',
      avatar: '/avatars/user5.jpg',
      level: 50
    },
    stats: {
      totalPoints: 14230,
      coursesCompleted: 35,
      bountiesWon: 12,
      forumContributions: 567
    },
    trend: 'down',
    change: 1
  },
  {
    rank: 3,
    user: {
      username: 'malware_analyst',
      avatar: '/avatars/user2.jpg',
      level: 38
    },
    stats: {
      totalPoints: 12890,
      coursesCompleted: 22,
      bountiesWon: 8,
      forumContributions: 189
    },
    trend: 'stable',
    change: 0
  },
  {
    rank: 4,
    user: {
      username: 'net_breaker',
      avatar: '/avatars/user4.jpg',
      level: 41
    },
    stats: {
      totalPoints: 11230,
      coursesCompleted: 19,
      bountiesWon: 11,
      forumContributions: 234
    },
    trend: 'up',
    change: 3
  },
  {
    rank: 5,
    user: {
      username: 'crypto_master',
      avatar: '/avatars/user3.jpg',
      level: 35
    },
    stats: {
      totalPoints: 9870,
      coursesCompleted: 16,
      bountiesWon: 6,
      forumContributions: 156
    },
    trend: 'down',
    change: 2
  }
];

const categories = [
  { id: 'overall', name: 'Overall', icon: Trophy },
  { id: 'monthly', name: 'Monthly', icon: TrendingUp },
  { id: 'bounties', name: 'Bug Bounties', icon: Bug },
  { id: 'learning', name: 'Learning', icon: BookOpen }
];

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus
};

const trendColors = {
  up: 'text-green-400',
  down: 'text-red-400',
  stable: 'text-gray-400'
};

export function LeaderboardSystem() {
  const [selectedCategory, setSelectedCategory] = useState('overall');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          <p className="text-gray-400">Top performers in the cybersecurity community</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Icon size={16} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Bounties
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Contributions
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockLeaderboardData.map((entry, index) => {
                const TrendIcon = trendIcons[entry.trend];
                const isTopThree = entry.rank <= 3;
                
                return (
                  <motion.tr
                    key={entry.user.username}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`hover:bg-gray-800/30 transition-colors ${
                      isTopThree ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {isTopThree ? (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            entry.rank === 1 ? 'bg-yellow-500' :
                            entry.rank === 2 ? 'bg-gray-400' :
                            'bg-orange-500'
                          }`}>
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-400">#{entry.rank}</span>
                        )}
                        {entry.change > 0 && (
                          <span className="text-xs text-green-400">+{entry.change}</span>
                        )}
                        {entry.change < 0 && (
                          <span className="text-xs text-red-400">{entry.change}</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {entry.user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {entry.user.username}
                          </div>
                          <div className="text-xs text-gray-400">
                            Level {entry.user.level}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-white">
                        {entry.stats.totalPoints.toLocaleString()}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">{entry.stats.coursesCompleted}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Bug className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-300">{entry.stats.bountiesWon}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">{entry.stats.forumContributions}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`w-4 h-4 ${trendColors[entry.trend]}`} />
                        <span className={`text-sm ${trendColors[entry.trend]}`}>
                          {entry.trend === 'up' ? 'Rising' : entry.trend === 'down' ? 'Falling' : 'Stable'}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievement Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card-dark p-6 rounded-xl text-center"
        >
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Top Performer</h3>
          <p className="text-gray-400 text-sm">cyber_hunter leads with 15,420 points</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card-dark p-6 rounded-xl text-center"
        >
          <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Most Active</h3>
          <p className="text-gray-400 text-sm">security_guru with 567 forum contributions</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-card-dark p-6 rounded-xl text-center"
        >
          <Target className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Bug Hunter</h3>
          <p className="text-gray-400 text-sm">cyber_hunter won 15 bug bounties</p>
        </motion.div>
      </div>
    </div>
  );
} 