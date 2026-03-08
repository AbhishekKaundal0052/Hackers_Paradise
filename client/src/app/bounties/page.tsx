'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bounty, Difficulty, BountyStatus, BountyCategory } from '@/types';
import { BountyCard } from '@/components/bounties/BountyCard';
import { BountyFiltersEnhanced } from '@/components/bounties/BountyFiltersEnhanced';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DollarSign, 
  Target,
  Zap,
  Trophy,
  Search,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - replace with actual API calls
const mockBounties: Bounty[] = [
  {
    id: '1',
    title: 'SQL Injection Vulnerability in Login Form',
    description: 'Identify and exploit SQL injection vulnerabilities in the authentication system of a major e-commerce platform.',
    reward: 5000,
    difficulty: Difficulty.INTERMEDIATE,
    category: BountyCategory.WEB_APPLICATION,
    status: BountyStatus.OPEN,
    company: 'TechCorp Inc.',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    submissions: [],
    tags: ['SQL Injection', 'Authentication', 'Web Security'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'XSS Vulnerability in User Comments',
    description: 'Find cross-site scripting vulnerabilities in the high-traffic comment system of SocialMedia Ltd.',
    reward: 3000,
    difficulty: Difficulty.BEGINNER,
    category: BountyCategory.WEB_APPLICATION,
    status: BountyStatus.OPEN,
    company: 'SocialMedia Ltd.',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    submissions: [],
    tags: ['XSS', 'User Input', 'Content Security'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'API Rate Limiting Bypass',
    description: 'Identify methods to bypass API rate limiting mechanisms on the core payment gateway.',
    reward: 8000,
    difficulty: Difficulty.ADVANCED,
    category: BountyCategory.API,
    status: BountyStatus.OPEN,
    company: 'FinTech Solutions',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    submissions: [],
    tags: ['API Security', 'Rate Limiting', 'Bypass Techniques'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Mobile App Certificate Pinning Bypass',
    description: 'Bypass SSL certificate pinning in the SecureBank mobile application (iOS & Android).',
    reward: 12000,
    difficulty: Difficulty.EXPERT,
    category: BountyCategory.MOBILE_APPLICATION,
    status: BountyStatus.OPEN,
    company: 'SecureBank',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    submissions: [],
    tags: ['Mobile Security', 'SSL Pinning', 'Reverse Engineering'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: '5',
    title: 'Network Infrastructure Enumeration',
    description: 'Perform comprehensive network enumeration and identify exposed services in the CloudNet staging environment.',
    reward: 4000,
    difficulty: Difficulty.INTERMEDIATE,
    category: BountyCategory.NETWORK,
    status: BountyStatus.OPEN,
    company: 'CloudNet Systems',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    submissions: [],
    tags: ['Network Security', 'Enumeration', 'Infrastructure'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  }
];

export default function BountiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBounties = useMemo(() => {
    let filtered = [...mockBounties];

    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(b => b.difficulty === selectedDifficulty);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(b => b.status === selectedStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'reward':
          return b.reward - a.reward;
        case 'deadline':
          return (a.deadline?.getTime() || 0) - (b.deadline?.getTime() || 0);
        case 'difficulty':
          const difficultyOrder = { [Difficulty.BEGINNER]: 1, [Difficulty.INTERMEDIATE]: 2, [Difficulty.ADVANCED]: 3, [Difficulty.EXPERT]: 4 };
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]; // Expert first
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedStatus, sortBy]);

  const stats = useMemo(() => ({
    totalBounties: mockBounties.length,
    totalReward: mockBounties.reduce((sum, b) => sum + b.reward, 0),
    activeBounties: mockBounties.filter(b => b.status === BountyStatus.OPEN).length,
    avgReward: Math.round(mockBounties.reduce((sum, b) => sum + b.reward, 0) / mockBounties.length)
  }), []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <h1 className="cyber-title text-4xl mb-2 text-left">Bug Bounty Terminal</h1>
              <p className="cyber-subtitle text-lg max-w-2xl">
                Initialize hunt protocols. Identify vulnerabilities in world-class infrastructure and earn high-value rewards.
              </p>
           </div>
           <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                 <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Live Feed</p>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold text-white">5 New Targets</span>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatsCard 
          icon={<Target className="w-5 h-5" />} 
          label="Total Programs" 
          value={stats.totalBounties} 
          color="red"
          delay={0.1}
        />
        <StatsCard 
          icon={<DollarSign className="w-5 h-5" />} 
          label="Total Payouts" 
          value={`$${(stats.totalReward / 1000).toFixed(0)}k+`} 
          color="purple"
          delay={0.2}
        />
        <StatsCard 
          icon={<Zap className="w-5 h-5" />} 
          label="Active Hunts" 
          value={stats.activeBounties} 
          color="red"
          delay={0.3}
        />
        <StatsCard 
          icon={<Trophy className="w-5 h-5" />} 
          label="Avg. Reward" 
          value={`$${stats.avgReward.toLocaleString()}`} 
          color="purple"
          delay={0.4}
        />
      </div>

      {/* Main Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <BountyFiltersEnhanced
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredBounties.length}
          totalBounties={mockBounties.length}
        />
      </motion.div>

      {/* Bounties Content */}
      <AnimatePresence mode="wait">
        {filteredBounties.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
               <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Vulnerabilities Detected</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-8">
              Your current filters didn&apos;t match any active bounty programs in the database.
            </p>
            <button 
              onClick={() => {
                 setSearchTerm('')
                 setSelectedCategory('all')
                 setSelectedDifficulty('all')
                 setSelectedStatus('all')
              }}
              className="text-red-400 font-bold uppercase tracking-widest text-xs hover:text-red-300 transition-colors flex items-center gap-2"
            >
              Reset Search Protocol
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "gap-6",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col"
            )}
          >
            {filteredBounties.map((bounty) => (
              <BountyCard 
                key={bounty.id} 
                bounty={bounty} 
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StatsCard = ({ icon, label, value, color, delay }: { icon: React.ReactNode, label: string, value: string | number, color: 'red' | 'purple', delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Card className="bg-[#0a0f16]/60 border-white/5 overflow-hidden group">
      <CardContent className="p-6 relative">
        <div className={cn(
          "absolute -right-4 -bottom-4 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity",
          color === 'red' ? "bg-red-500" : "bg-purple-600"
        )} />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className={cn(
            "p-3 rounded-xl border transition-all duration-300",
            color === 'red' 
              ? "bg-red-500/10 border-red-500/20 text-red-500 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
              : "bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          )}>
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-2xl font-black text-white tracking-tighter">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)
