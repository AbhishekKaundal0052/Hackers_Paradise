'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Bounty, BountyCategory, BountyStatus, Difficulty } from '@/types';
import { BountyCard } from '@/components/bounties/BountyCard';
import { BountyFilters } from '@/components/bounties/BountyFilters';
import { BountySearch } from '@/components/bounties/BountySearch';
import { BountyStats } from '@/components/bounties/BountyStats';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Target,
  Zap,
  Users,
  Trophy
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockBounties: Bounty[] = [
  {
    id: '1',
    title: 'SQL Injection Vulnerability in Login Form',
    description: 'Identify and exploit SQL injection vulnerabilities in the authentication system',
    reward: 5000,
    difficulty: Difficulty.INTERMEDIATE,
    category: BountyCategory.WEB_APPLICATION,
    status: BountyStatus.OPEN,
    company: 'TechCorp Inc.',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    submissions: [],
    tags: ['SQL Injection', 'Authentication', 'Web Security'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'XSS Vulnerability in User Comments',
    description: 'Find cross-site scripting vulnerabilities in the comment system',
    reward: 3000,
    difficulty: Difficulty.BEGINNER,
    category: BountyCategory.WEB_APPLICATION,
    status: BountyStatus.OPEN,
    company: 'SocialMedia Ltd.',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    submissions: [],
    tags: ['XSS', 'User Input', 'Content Security'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'API Rate Limiting Bypass',
    description: 'Identify methods to bypass API rate limiting mechanisms',
    reward: 8000,
    difficulty: Difficulty.ADVANCED,
    category: BountyCategory.API,
    status: BountyStatus.OPEN,
    company: 'FinTech Solutions',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    submissions: [],
    tags: ['API Security', 'Rate Limiting', 'Bypass Techniques'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Mobile App Certificate Pinning Bypass',
    description: 'Bypass SSL certificate pinning in the mobile application',
    reward: 12000,
    difficulty: Difficulty.EXPERT,
    category: BountyCategory.MOBILE_APPLICATION,
    status: BountyStatus.OPEN,
    company: 'SecureBank',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    submissions: [],
    tags: ['Mobile Security', 'SSL Pinning', 'Reverse Engineering'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    title: 'Network Infrastructure Enumeration',
    description: 'Perform comprehensive network enumeration and identify exposed services',
    reward: 4000,
    difficulty: Difficulty.INTERMEDIATE,
    category: BountyCategory.NETWORK,
    status: BountyStatus.OPEN,
    company: 'CloudNet Systems',
    logo: '/api/placeholder/60/60',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    submissions: [],
    tags: ['Network Security', 'Enumeration', 'Infrastructure'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function BountiesPage() {
  const [bounties, setBounties] = useState<Bounty[]>(mockBounties);
  const [filteredBounties, setFilteredBounties] = useState<Bounty[]>(mockBounties);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BountyCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<BountyStatus | 'all'>('all');
  const [rewardRange, setRewardRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<'reward' | 'deadline' | 'difficulty' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort bounties
  useEffect(() => {
    let filtered = bounties.filter(bounty => {
      const matchesSearch = bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bounty.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || bounty.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || bounty.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === 'all' || bounty.status === selectedStatus;
      const matchesReward = bounty.reward >= rewardRange[0] && bounty.reward <= rewardRange[1];

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus && matchesReward;
    });

    // Sort bounties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'reward':
          return b.reward - a.reward;
        case 'deadline':
          return (a.deadline?.getTime() || 0) - (b.deadline?.getTime() || 0);
        case 'difficulty':
          const difficultyOrder = { [Difficulty.BEGINNER]: 1, [Difficulty.INTERMEDIATE]: 2, [Difficulty.ADVANCED]: 3, [Difficulty.EXPERT]: 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredBounties(filtered);
  }, [bounties, searchTerm, selectedCategory, selectedDifficulty, selectedStatus, rewardRange, sortBy]);

  const stats = {
    totalBounties: bounties.length,
    totalReward: bounties.reduce((sum, bounty) => sum + bounty.reward, 0),
    activeBounties: bounties.filter(b => b.status === BountyStatus.OPEN).length,
    avgReward: Math.round(bounties.reduce((sum, bounty) => sum + bounty.reward, 0) / bounties.length)
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bug Bounty Programs</h1>
          <p className="text-gray-300 text-lg">
            Hunt vulnerabilities, earn rewards, and build your reputation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Bounties</p>
                  <p className="text-2xl font-bold text-white">{stats.totalBounties}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Rewards</p>
                  <p className="text-2xl font-bold text-white">${stats.totalReward.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Bounties</p>
                  <p className="text-2xl font-bold text-white">{stats.activeBounties}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Trophy className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg Reward</p>
                  <p className="text-2xl font-bold text-white">${stats.avgReward.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <BountySearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
            sortBy={sortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BountyFilters
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              selectedStatus={selectedStatus}
              rewardRange={rewardRange}
              onCategoryChange={setSelectedCategory}
              onDifficultyChange={setSelectedDifficulty}
              onStatusChange={setSelectedStatus}
              onRewardRangeChange={setRewardRange}
            />
          </div>

          {/* Bounties Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-300">
                Showing {filteredBounties.length} of {bounties.length} bounties
              </p>
            </div>

            {filteredBounties.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No bounties found</h3>
                  <p className="text-gray-400">
                    Try adjusting your filters or search terms
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredBounties.map((bounty) => (
                  <BountyCard 
                    key={bounty.id} 
                    bounty={bounty} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 