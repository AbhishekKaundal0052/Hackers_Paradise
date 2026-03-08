'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn, UserPlus, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatisticsDashboard } from '@/components/profile/StatisticsDashboard';
import { PortfolioSection } from '@/components/profile/PortfolioSection';
import { SkillsExpertise } from '@/components/profile/SkillsExpertise';
import { AchievementSystem } from '@/components/profile/AchievementSystem';
import { ActivityFeed } from '@/components/profile/ActivityFeed';
import { AuthButton } from '@/components/features/auth/AuthButton';

type TabType = 'overview' | 'portfolio' | 'skills' | 'achievements' | 'activity';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { isAuthenticated, isLoading } = useAuthStore();

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'portfolio', label: 'Portfolio', count: 12 },
    { id: 'skills', label: 'Skills', count: 24 },
    { id: 'achievements', label: 'Achievements', count: 18 },
    { id: 'activity', label: 'Activity', count: null },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-4 border-red-500 rounded-full animate-spin" />
          <div className="absolute inset-4 border-t-4 border-purple-500 rounded-full animate-spin-slow" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px] animate-pulse delay-700" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-2xl w-full"
        >
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group">
            {/* Cyber Grid Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/40 transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-red-500 to-purple-600 p-6 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                  <Lock size={48} className="text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 tracking-tight">
                  ACCESS DENIED
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
                  Authentication required to view this terminal. Join the elite network of hackers and secure your profile.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:flex-nowrap">
                <Link href="/sign-in" className="w-full sm:min-w-[160px]">
                  <AuthButton variant="primary" className="w-full flex items-center justify-center gap-2 group/btn whitespace-nowrap px-6 py-3.5">
                    <LogIn size={20} className="shrink-0 group-hover/btn:translate-x-0.5 transition-transform" />
                    <span>Sign In Now</span>
                  </AuthButton>
                </Link>
                <Link href="/sign-up" className="w-full sm:min-w-[160px]">
                  <AuthButton variant="outline" className="w-full flex items-center justify-center gap-2 group/btn whitespace-nowrap px-6 py-3.5">
                    <UserPlus size={20} className="shrink-0 group-hover/btn:translate-y-[-1px] transition-transform" />
                    <span>Create Account</span>
                  </AuthButton>
                </Link>
              </div>

              <div className="pt-8 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 w-full justify-center">
                <ShieldAlert size={14} className="text-red-500/50" />
                Secure Protocol Encrypted v2.0.4
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
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