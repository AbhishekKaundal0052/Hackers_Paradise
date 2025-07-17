'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageSquare, Users, Clock, TrendingUp, Shield, Bug, Code, Lock, Globe, Target, BookOpen, Tool } from 'lucide-react';
import { ForumCategory } from '@/types/community';

const forumCategories: ForumCategory[] = [
  {
    id: 'web-security',
    name: 'Web Application Security',
    description: 'Discuss OWASP Top 10, vulnerabilities, and web app testing techniques',
    postCount: 342,
    memberCount: 2847,
    latestPost: {
      author: 'cyber_hunter',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      title: 'New XSS bypass technique discovered'
    },
    difficulty: 'intermediate',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'network-pentest',
    name: 'Network Penetration Testing',
    description: 'Network reconnaissance, exploitation, and post-exploitation techniques',
    postCount: 289,
    memberCount: 2156,
    latestPost: {
      author: 'net_breaker',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      title: 'Advanced pivoting techniques in corporate networks'
    },
    difficulty: 'advanced',
    icon: '🌐',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'malware-analysis',
    name: 'Malware Analysis',
    description: 'Static and dynamic analysis, reverse engineering, and threat hunting',
    postCount: 156,
    memberCount: 1247,
    latestPost: {
      author: 'malware_hunter',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      title: 'Analyzing new ransomware variant'
    },
    difficulty: 'expert',
    icon: '🦠',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'cryptography',
    name: 'Cryptography',
    description: 'Cryptographic algorithms, implementations, and breaking techniques',
    postCount: 98,
    memberCount: 892,
    latestPost: {
      author: 'crypto_master',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      title: 'Breaking weak RSA implementations'
    },
    difficulty: 'advanced',
    icon: '🔐',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'bug-bounty',
    name: 'Bug Bounty Discussions',
    description: 'Bug bounty programs, vulnerability reports, and hunting strategies',
    postCount: 567,
    memberCount: 3456,
    latestPost: {
      author: 'bounty_hunter',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      title: 'New $50k bounty program launched'
    },
    difficulty: 'intermediate',
    icon: '💰',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'career-advice',
    name: 'Career Advice',
    description: 'Career guidance, certifications, and professional development',
    postCount: 234,
    memberCount: 1892,
    latestPost: {
      author: 'security_guru',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      title: 'How to transition from IT to cybersecurity'
    },
    difficulty: 'beginner',
    icon: '💼',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'tool-reviews',
    name: 'Tool Reviews',
    description: 'Security tool reviews, comparisons, and recommendations',
    postCount: 189,
    memberCount: 1456,
    latestPost: {
      author: 'tool_master',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      title: 'Best open-source penetration testing tools 2024'
    },
    difficulty: 'beginner',
    icon: '🛠️',
    color: 'from-gray-500 to-slate-500'
  },
  {
    id: 'ctf-challenges',
    name: 'CTF Challenges',
    description: 'Capture The Flag challenges, writeups, and competition discussions',
    postCount: 445,
    memberCount: 2678,
    latestPost: {
      author: 'ctf_champion',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      title: 'DEF CON CTF 2024 registration is open'
    },
    difficulty: 'intermediate',
    icon: '🏁',
    color: 'from-red-500 to-purple-500'
  }
];

const difficultyColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-orange-500',
  expert: 'bg-red-500'
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert'
};

export function ForumCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredCategories = forumCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || category.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search forums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>
        
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          aria-label="Filter by difficulty level"
        >
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card-dark p-6 rounded-xl hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 ${difficultyColors[category.difficulty]} rounded-full`} />
                    <span className="text-xs text-gray-400">{difficultyLabels[category.difficulty]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {category.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{category.postCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{category.memberCount}</span>
                </div>
              </div>
            </div>

            {/* Latest Post */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-gray-500">{formatTimeAgo(category.latestPost.timestamp)}</span>
                </div>
                <span className="text-red-400 font-medium">by {category.latestPost.author}</span>
              </div>
              <p className="text-white text-sm mt-1 line-clamp-1">
                {category.latestPost.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No forums found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
} 