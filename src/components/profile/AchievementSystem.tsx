'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Lock, Share, Search, Filter, Award, Target } from 'lucide-react';
import { Achievement } from '@/types/profile';

interface AchievementSystemProps {
  compact?: boolean;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Security Expert',
    description: 'Reached level 40 and completed 25 courses',
    icon: '🏆',
    rarity: 'legendary',
    unlockedAt: new Date('2024-02-15')
  },
  {
    id: '2',
    name: 'Bug Hunter',
    description: 'Found and reported 50+ vulnerabilities',
    icon: '🐛',
    rarity: 'epic',
    unlockedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Mentor',
    description: 'Helped 100+ community members',
    icon: '🎓',
    rarity: 'rare',
    unlockedAt: new Date('2024-01-10')
  },
  {
    id: '4',
    name: 'Speed Demon',
    description: 'Completed 10 courses in 30 days',
    icon: '⚡',
    rarity: 'uncommon',
    unlockedAt: new Date('2023-12-25')
  },
  {
    id: '5',
    name: 'First Blood',
    description: 'Found your first vulnerability',
    icon: '🩸',
    rarity: 'common',
    unlockedAt: new Date('2023-11-15')
  },
  {
    id: '6',
    name: 'Code Breaker',
    description: 'Solved 100 cryptographic challenges',
    icon: '🔐',
    rarity: 'rare',
    unlockedAt: new Date('2023-10-30')
  },
  {
    id: '7',
    name: 'Network Ninja',
    description: 'Mastered network penetration testing',
    icon: '🌐',
    rarity: 'epic',
    unlockedAt: new Date('2023-09-20')
  },
  {
    id: '8',
    name: 'Malware Hunter',
    description: 'Analyzed 50 malware samples',
    icon: '🦠',
    rarity: 'rare',
    unlockedAt: new Date('2023-08-15')
  },
  {
    id: '9',
    name: 'CTF Champion',
    description: 'Won 5 capture the flag competitions',
    icon: '🏁',
    rarity: 'legendary',
    progress: { current: 3, total: 5 }
  },
  {
    id: '10',
    name: 'Social Engineer',
    description: 'Successfully completed 20 social engineering challenges',
    icon: '🎭',
    rarity: 'uncommon',
    progress: { current: 15, total: 20 }
  }
];

const rarityColors = {
  common: 'from-gray-500 to-gray-400',
  uncommon: 'from-green-500 to-emerald-400',
  rare: 'from-blue-500 to-cyan-400',
  epic: 'from-purple-500 to-pink-400',
  legendary: 'from-yellow-500 to-orange-400'
};

const rarityBorders = {
  common: 'border-gray-500/30',
  uncommon: 'border-green-500/30',
  rare: 'border-blue-500/30',
  epic: 'border-purple-500/30',
  legendary: 'border-yellow-500/30'
};

const rarityGlows = {
  common: 'shadow-gray-500/20',
  uncommon: 'shadow-green-500/20',
  rare: 'shadow-blue-500/20',
  epic: 'shadow-purple-500/20',
  legendary: 'shadow-yellow-500/50'
};

export function AchievementSystem({ compact = false }: AchievementSystemProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const filteredAchievements = mockAchievements.filter(achievement => {
    const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || achievement.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const unlockedAchievements = filteredAchievements.filter(a => !a.progress);
  const lockedAchievements = filteredAchievements.filter(a => a.progress);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderAchievement = (achievement: Achievement, index: number) => {
    const isLocked = !!achievement.progress;
    const progressPercentage = achievement.progress ? (achievement.progress.current / achievement.progress.total) * 100 : 100;

    return (
      <motion.div
        key={achievement.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`glass-card-dark p-4 rounded-lg border ${rarityBorders[achievement.rarity]} ${rarityGlows[achievement.rarity]} hover:scale-105 transition-all duration-300 cursor-pointer group ${
          isLocked ? 'opacity-60' : ''
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${rarityColors[achievement.rarity]} rounded-lg flex items-center justify-center text-2xl relative`}>
            {isLocked && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
            )}
            <span className={isLocked ? 'opacity-30' : ''}>{achievement.icon}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-white truncate">{achievement.name}</h4>
              <div className="flex items-center space-x-1">
                {achievement.rarity === 'legendary' && <Star className="w-3 h-3 text-yellow-400" />}
                                 {!isLocked && (
                   <button className="text-gray-400 hover:text-red-400 transition-colors" aria-label="Share achievement">
                     <Share className="w-3 h-3" />
                   </button>
                 )}
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-2 line-clamp-2">
              {achievement.description}
            </p>
            
            {isLocked ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{achievement.progress?.current}/{achievement.progress?.total}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div
                    className={`bg-gradient-to-r ${rarityColors[achievement.rarity]} h-1 rounded-full transition-all duration-1000`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500">
                Unlocked {formatDate(achievement.unlockedAt!)}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <p className="text-gray-400">Badges and accomplishments</p>
        </div>
        {!compact && (
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">
              {unlockedAchievements.length}/{mockAchievements.length} unlocked
            </span>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      {!compact && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            aria-label="Filter by rarity"
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
      )}

      {/* Achievements Grid */}
      {!compact ? (
        <div className="space-y-6">
          {/* Unlocked Achievements */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-400" />
              <span>Unlocked ({unlockedAchievements.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement, index) => renderAchievement(achievement, index))}
            </div>
          </div>

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-400" />
                <span>In Progress ({lockedAchievements.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lockedAchievements.map((achievement, index) => renderAchievement(achievement, index))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAchievements.slice(0, 4).map((achievement, index) => renderAchievement(achievement, index))}
        </div>
      )}

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No achievements found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
} 