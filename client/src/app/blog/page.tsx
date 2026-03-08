'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart, Eye, Clock, TrendingUp, Search, ArrowRight } from 'lucide-react';
import { User, BlogPost, UserRole, BlogCategory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { BlogCard } from '@/components/blog/BlogCard';
import { FeaturedCarousel } from '@/components/blog/FeaturedCarousel';
import { BlogFiltersEnhanced } from '@/components/blog/BlogFiltersEnhanced';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { cn } from '@/lib/utils';

// Mock blog data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advanced SQL Injection Techniques for Penetration Testing',
    slug: 'advanced-sql-injection-techniques',
    excerpt: 'Master the art of SQL injection with advanced techniques including blind SQLi, time-based attacks, and automated exploitation tools.',
    content: 'Full content here...',
    author: {
      id: '1',
      username: 'cyberhunter',
      email: 'hunter@example.com',
      avatar: '/api/placeholder/40/40',
      role: UserRole.HUNTER,
      level: 15,
      experience: 5000,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    coverImage: '/api/placeholder/800/400',
    tags: ['SQL Injection', 'Penetration Testing', 'Web Security', 'Featured'],
    category: BlogCategory.TUTORIAL,
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    readTime: 12,
    views: 15420,
    likes: 892,
    comments: [],
  },
  {
    id: '2',
    title: 'Building a Secure API: Best Practices for Developers',
    slug: 'secure-api-best-practices',
    excerpt: 'Learn essential security practices for building robust APIs that withstand common attack vectors.',
    content: 'Full content here...',
    author: {
      id: '2',
      username: 'apisecurity',
      email: 'api@example.com',
      avatar: '/api/placeholder/40/40',
      role: UserRole.HUNTER,
      level: 12,
      experience: 3500,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    coverImage: '/api/placeholder/800/400',
    tags: ['API Security', 'Development', 'Authentication', 'Featured'],
    category: BlogCategory.TUTORIAL,
    publishedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    readTime: 8,
    views: 8920,
    likes: 456,
    comments: [],
  },
  {
    id: '3',
    title: 'The Rise of AI-Powered Cybersecurity Threats',
    slug: 'ai-cybersecurity-threats',
    excerpt: 'Exploring how artificial intelligence is being used by attackers and how defenders can leverage AI for protection.',
    content: 'Full content here...',
    author: {
      id: '3',
      username: 'ai_security',
      email: 'ai@example.com',
      avatar: '/api/placeholder/40/40',
      role: UserRole.HUNTER,
      level: 18,
      experience: 7500,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    coverImage: '/api/placeholder/800/400',
    tags: ['AI Security', 'Machine Learning', 'Threat Intelligence'],
    category: BlogCategory.RESEARCH,
    publishedAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    readTime: 15,
    views: 12340,
    likes: 678,
    comments: [],
  },
  {
    id: '4',
    title: 'CTF Challenge: Breaking the Crypto Vault',
    slug: 'ctf-crypto-vault-challenge',
    excerpt: 'Walkthrough of an advanced cryptography challenge from our latest CTF competition.',
    content: 'Full content here...',
    author: {
      id: '4',
      username: 'cryptomaster',
      email: 'crypto@example.com',
      avatar: '/api/placeholder/40/40',
      role: UserRole.HUNTER,
      level: 20,
      experience: 10000,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    coverImage: '/api/placeholder/800/400',
    tags: ['CTF', 'Cryptography', 'Challenge'],
    category: BlogCategory.CASE_STUDY,
    publishedAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    readTime: 20,
    views: 5670,
    likes: 234,
    comments: [],
  },
  {
    id: '5',
    title: 'Zero-Day Vulnerabilities: Understanding the Threat Landscape',
    slug: 'zero-day-vulnerabilities-threat-landscape',
    excerpt: 'Deep dive into zero-day vulnerabilities, their discovery, exploitation, and the race between attackers and defenders.',
    content: 'Full content here...',
    author: {
      id: '5',
      username: 'zeroday_expert',
      email: 'zero@example.com',
      avatar: '/api/placeholder/40/40',
      role: UserRole.HUNTER,
      level: 25,
      experience: 15000,
      badges: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    coverImage: '/api/placeholder/800/400',
    tags: ['Zero-Day', 'Vulnerabilities', 'Threat Intelligence'],
    category: BlogCategory.RESEARCH,
    publishedAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    readTime: 18,
    views: 9870,
    likes: 543,
    comments: [],
  }
];

const mockAuthors: User[] = [
  {
    id: '1',
    username: 'cyberhunter',
    email: 'hunter@example.com',
    avatar: '/api/placeholder/60/60',
    role: UserRole.HUNTER,
    level: 15,
    experience: 5000,
    badges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    username: 'apisecurity',
    email: 'api@example.com',
    avatar: '/api/placeholder/60/60',
    role: UserRole.HUNTER,
    level: 12,
    experience: 3500,
    badges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const popularTags = [
  'SQL Injection', 'XSS', 'CSRF', 'Authentication', 'Authorization',
  'Cryptography', 'Network Security', 'Web Security', 'Mobile Security',
  'API Security', 'Cloud Security', 'IoT Security', 'Malware Analysis',
  'Reverse Engineering', 'Penetration Testing', 'CTF', 'Bug Bounty'
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPosts = useMemo(() => {
    let filtered = [...mockBlogPosts];

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return (b.likes + b.views) - (a.likes + a.views);
        case 'newest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedTags, sortBy]);

  const featuredPosts = useMemo(() => 
    mockBlogPosts.filter(post => post.tags.includes('Featured')), 
  []);

  const stats = useMemo(() => ({
    totalPosts: mockBlogPosts.length,
    totalViews: mockBlogPosts.reduce((sum, post) => sum + post.views, 0),
    totalLikes: mockBlogPosts.reduce((sum, post) => sum + post.likes, 0),
    avgReadTime: Math.round(mockBlogPosts.reduce((sum, post) => sum + post.readTime, 0) / mockBlogPosts.length)
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
              <h1 className="cyber-title text-4xl mb-2 text-left">Intelligence Feed</h1>
              <p className="cyber-subtitle text-lg max-w-2xl">
                Expert insights, vulnerability research, and tactical tutorials from the frontlines of cybersecurity.
              </p>
           </div>
           <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                 <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Status</p>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-white">Live Updates</span>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatsCard 
          icon={<BookOpen className="w-5 h-5" />} 
          label="Total Articles" 
          value={stats.totalPosts} 
          color="red"
          delay={0.1}
        />
        <StatsCard 
          icon={<Eye className="w-5 h-5" />} 
          label="Knowledge Base Views" 
          value={`${(stats.totalViews / 1000).toFixed(1)}k`} 
          color="purple"
          delay={0.2}
        />
        <StatsCard 
          icon={<Heart className="w-5 h-5" />} 
          label="Community Likes" 
          value={stats.totalLikes.toLocaleString()} 
          color="red"
          delay={0.3}
        />
        <StatsCard 
          icon={<Clock className="w-5 h-5" />} 
          label="Avg Read Time" 
          value={`${stats.avgReadTime}m`} 
          color="purple"
          delay={0.4}
        />
      </div>

      {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && searchTerm === '' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
             <TrendingUp className="w-5 h-5 text-red-500" />
             <h2 className="text-xl font-black text-white uppercase tracking-tighter">Featured Intelligence</h2>
             <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <FeaturedCarousel posts={featuredPosts} />
        </motion.div>
      )}

      {/* Main Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <BlogFiltersEnhanced
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredPosts.length}
          totalPosts={mockBlogPosts.length}
          popularTags={popularTags}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center text-center glass-card-dark rounded-3xl border-white/5"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                   <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Intelligence Found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                  The encrypted archive did not return any matches for your current query parameters.
                </p>
                <button 
                  onClick={() => {
                     setSearchTerm('')
                     setSelectedCategory('all')
                     setSelectedTags([])
                  }}
                  className="text-red-400 font-bold uppercase tracking-widest text-xs hover:text-red-300 transition-colors flex items-center gap-2"
                >
                  Clear Archive Filters
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
                    ? "grid grid-cols-1 md:grid-cols-2" 
                    : "flex flex-col"
                )}
              >
                {filteredPosts.map((post) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar - Desktop Only */}
        <div className="lg:col-span-1 space-y-8 order-1 lg:order-2">
          {/* Authors */}
          <section>
            <div className="flex items-center gap-3 mb-4">
               <TrendingUp className="w-4 h-4 text-purple-500" />
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Top Researchers</h3>
            </div>
            <div className="space-y-3">
              {mockAuthors.map(author => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          </section>

          {/* Tag Cloud - Quick Select */}
          <section className="bg-[#0a0f16]/40 rounded-2xl p-6 border border-white/5">
             <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Hot Topics</h3>
             </div>
             <div className="flex flex-wrap gap-2">
                {popularTags.slice(0, 10).map(tag => (
                   <button
                      key={tag}
                      onClick={() => {
                         if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag))
                         } else {
                            setSelectedTags([...selectedTags, tag])
                         }
                      }}
                      className={cn(
                         "px-2 py-1 rounded-md text-[10px] font-bold border transition-all",
                         selectedTags.includes(tag)
                           ? "bg-red-500/10 border-red-500/30 text-red-400"
                           : "bg-white/5 border-white/5 text-muted-foreground hover:border-white/20 hover:text-white"
                      )}
                   >
                      {tag}
                   </button>
                ))}
             </div>
          </section>
        </div>
      </div>
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
