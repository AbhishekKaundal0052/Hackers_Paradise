'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Calendar, Trophy, UserCheck } from 'lucide-react';
import { CommunityHeader } from '@/components/community/CommunityHeader';
import { ForumCategories } from '@/components/community/ForumCategories';
import { MemberDirectory } from '@/components/community/MemberDirectory';
import { EventsWorkshops } from '@/components/community/EventsWorkshops';
import { LeaderboardSystem } from '@/components/community/LeaderboardSystem';
import { MentorshipHub } from '@/components/community/MentorshipHub';
import { LiveChat } from '@/components/community/LiveChat';

type TabType = 'forums' | 'members' | 'events' | 'leaderboard' | 'mentorship';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>('forums');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const tabs = [
    { id: 'forums', label: 'Forums', icon: MessageSquare, count: 1247 },
    { id: 'members', label: 'Members', icon: Users, count: 15420 },
    { id: 'events', label: 'Events', icon: Calendar, count: 8 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, count: null },
    { id: 'mentorship', label: 'Mentorship', icon: UserCheck, count: 45 },
  ];

  const stats = [
    { label: 'Active Discussions', value: '1,247', icon: '💬', trend: '+12%' },
    { label: 'Online Members', value: '2,341', icon: '👥', trend: '+5%' },
    { label: 'New Posts Today', value: '89', icon: '📈', trend: '+23%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Community Header */}
      <CommunityHeader stats={stats} />

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
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
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
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
          {activeTab === 'forums' && <ForumCategories />}
          {activeTab === 'members' && <MemberDirectory />}
          {activeTab === 'events' && <EventsWorkshops />}
          {activeTab === 'leaderboard' && <LeaderboardSystem />}
          {activeTab === 'mentorship' && <MentorshipHub />}
        </motion.div>
      </div>

      {/* Live Chat Widget */}
      <LiveChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        <MessageSquare size={24} className="text-white" />
      </motion.button>
    </div>
  );
} 