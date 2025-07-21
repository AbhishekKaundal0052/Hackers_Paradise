'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { User, BlogPost, UserRole, BlogCategory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { BlogCard } from '@/components/blog/BlogCard';
import { FeaturedCarousel } from '@/components/blog/FeaturedCarousel';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogFilters } from '@/components/blog/BlogFilters';
import { TagCloud } from '@/components/blog/TagCloud';
import { AuthorCard } from '@/components/blog/AuthorCard';

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
    tags: ['SQL Injection', 'Penetration Testing', 'Web Security', 'Database'],
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
    tags: ['API Security', 'Development', 'Authentication', 'OAuth'],
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
    tags: ['AI Security', 'Machine Learning', 'Threat Intelligence', 'Emerging Threats'],
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
    tags: ['CTF', 'Cryptography', 'Challenge', 'Walkthrough'],
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
    tags: ['Zero-Day', 'Vulnerabilities', 'Threat Intelligence', 'Exploitation'],
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
  const [posts] = useState<BlogPost[]>(mockBlogPosts);
  const [filteredPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // For featuredPosts, use a tag or another property, e.g. posts with 'Featured' in tags
  const featuredPosts = posts.filter(post => post.tags.includes('Featured'));

  // Filter and sort posts
  useEffect(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });

    // Sort posts
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
  }, [posts, searchTerm, selectedCategory, selectedTags, sortBy]);

  const stats = {
    totalPosts: posts.length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
    avgReadTime: Math.round(posts.reduce((sum, post) => sum + post.readTime, 0) / posts.length)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Security Blog</h1>
        <p className="text-gray-300 text-lg">
          Insights, tutorials, and research from the cybersecurity community
        </p>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Likes</p>
                  <p className="text-2xl font-bold text-white">{stats.totalLikes.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg Read Time</p>
                  <p className="text-2xl font-bold text-white">{stats.avgReadTime} min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Posts Carousel */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Posts</h2>
            <FeaturedCarousel posts={featuredPosts} />
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <BlogSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
            sortBy={sortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <BlogFilters
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              onCategoryChange={setSelectedCategory}
              onTagsChange={setSelectedTags}
            />

            {/* Tag Cloud */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
                <TagCloud 
                  tags={popularTags}
                  selectedTags={selectedTags}
                  onTagClick={(tag) => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Top Authors */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Authors</h3>
                <div className="space-y-4">
                  {mockAuthors.map(author => (
                    <AuthorCard key={author.id} author={author} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-300">
                Showing {filteredPosts.length} of {posts.length} posts
              </p>
            </div>

            {filteredPosts.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
                  <p className="text-gray-400">
                    Try adjusting your filters or search terms
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                : 'space-y-6'
              }>
                {filteredPosts.map((post) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
  );
} 