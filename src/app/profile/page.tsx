'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatisticsDashboard } from '@/components/profile/StatisticsDashboard';
import { PortfolioSection } from '@/components/profile/PortfolioSection';
import { SkillsExpertise } from '@/components/profile/SkillsExpertise';
import { AchievementSystem } from '@/components/profile/AchievementSystem';
import { ActivityFeed } from '@/components/profile/ActivityFeed';

type TabType = 'overview' | 'portfolio' | 'skills' | 'achievements' | 'activity';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'portfolio', label: 'Portfolio', count: 12 },
    { id: 'skills', label: 'Skills', count: 24 },
    { id: 'achievements', label: 'Achievements', count: 18 },
    { id: 'activity', label: 'Activity', count: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  transition-all duration-200
                  ${activeTab === tab.id
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }
                `}
              >
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <StatisticsDashboard />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SkillsExpertise compact={true} />
                <AchievementSystem compact={true} />
              </div>
            </div>
          )}
          {activeTab === 'portfolio' && <PortfolioSection />}
          {activeTab === 'skills' && <SkillsExpertise compact={false} />}
          {activeTab === 'achievements' && <AchievementSystem compact={false} />}
          {activeTab === 'activity' && <ActivityFeed />}
        </motion.div>
      </div>
    </div>
  );
} 