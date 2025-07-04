'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { BlogPost, User, Comment } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { SocialShare } from '@/components/blog/SocialShare';
import { CommentSection } from '@/components/blog/CommentSection';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { 
  Clock, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  BookOpen,
  Calendar,
  User as UserIcon
} from 'lucide-react';

// Mock blog post data
const mockBlogPost: BlogPost = {
  id: '1',
  title: 'Advanced SQL Injection Techniques for Penetration Testing',
  slug: 'advanced-sql-injection-techniques',
  excerpt: 'Master the art of SQL injection with advanced techniques including blind SQLi, time-based attacks, and automated exploitation tools.',
  content: `
# Advanced SQL Injection Techniques for Penetration Testing

SQL injection remains one of the most critical vulnerabilities in web applications. In this comprehensive guide, we'll explore advanced techniques that go beyond basic UNION-based attacks.

## Table of Contents
- [Blind SQL Injection](#blind-sql-injection)
- [Time-Based Attacks](#time-based-attacks)
- [Boolean-Based Attacks](#boolean-based-attacks)
- [Automated Exploitation](#automated-exploitation)
- [Defense Strategies](#defense-strategies)

## Blind SQL Injection

Blind SQL injection occurs when the application doesn't return the actual data but instead returns different responses based on whether the injected query returns true or false.

### Example 1: Boolean-Based Blind SQLi

\`\`\`sql
' AND (SELECT SUBSTRING(username,1,1) FROM users WHERE id=1)='a'--
\`\`\`

### Example 2: Time-Based Blind SQLi

\`\`\`sql
'; IF (SELECT COUNT(*) FROM users WHERE username='admin')>0 WAITFOR DELAY '00:00:05'--
\`\`\`

## Time-Based Attacks

Time-based attacks are particularly useful when dealing with applications that don't return meaningful error messages.

\`\`\`python
import requests
import time

def time_based_blind_sqli(url, payload):
    start_time = time.time()
    response = requests.get(url + payload)
    end_time = time.time()
    
    if end_time - start_time > 5:
        return True
    return False
\`\`\`

## Boolean-Based Attacks

Boolean-based attacks rely on the application returning different responses based on the truth value of the injected condition.

\`\`\`sql
' AND (SELECT ASCII(SUBSTRING(password,1,1)) FROM users WHERE id=1)>50--
\`\`\`

## Automated Exploitation

Modern tools like SQLMap can automate the exploitation process:

\`\`\`bash
sqlmap -u "http://target.com/page?id=1" --dbs
sqlmap -u "http://target.com/page?id=1" -D database_name --tables
sqlmap -u "http://target.com/page?id=1" -D database_name -T users --dump
\`\`\`

## Defense Strategies

### 1. Parameterized Queries

Always use parameterized queries or prepared statements:

\`\`\`python
# Good
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# Bad
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
\`\`\`

### 2. Input Validation

Implement strict input validation:

\`\`\`python
import re

def validate_user_id(user_id):
    if not re.match(r'^[0-9]+$', str(user_id)):
        raise ValueError("Invalid user ID")
    return int(user_id)
\`\`\`

### 3. Web Application Firewalls

Deploy WAF solutions to detect and block SQL injection attempts.

## Conclusion

Understanding advanced SQL injection techniques is crucial for both penetration testers and developers. While these techniques can be powerful for security testing, they should only be used in authorized environments.

Remember: Always obtain proper authorization before testing any application for vulnerabilities.
  `,
  author: {
    id: '1',
    username: 'cyberhunter',
    email: 'hunter@example.com',
    avatar: '/api/placeholder/60/60',
    role: 'hunter',
    level: 15,
    experience: 5000,
    badges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  coverImage: '/api/placeholder/1200/600',
  tags: ['SQL Injection', 'Penetration Testing', 'Web Security', 'Database'],
  category: 'tutorial',
  publishedAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
  readTime: 12,
  views: 15420,
  likes: 892,
  comments: [
    {
      id: '1',
      content: 'Excellent article! The time-based examples are particularly helpful.',
      author: {
        id: '2',
        username: 'securitylearner',
        email: 'learner@example.com',
        avatar: '/api/placeholder/40/40',
        role: 'student',
        level: 5,
        experience: 1000,
        badges: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      postId: '1',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16'),
      replies: []
    }
  ],
  featured: true
};

const relatedPosts = [
  {
    id: '2',
    title: 'XSS Vulnerability in User Comments',
    slug: 'xss-vulnerability-user-comments',
    excerpt: 'Find cross-site scripting vulnerabilities in the comment system',
    coverImage: '/api/placeholder/400/200',
    author: { username: 'websec_expert' },
    publishedAt: new Date('2024-01-10'),
    readTime: 8
  },
  {
    id: '3',
    title: 'API Rate Limiting Bypass',
    slug: 'api-rate-limiting-bypass',
    excerpt: 'Identify methods to bypass API rate limiting mechanisms',
    coverImage: '/api/placeholder/400/200',
    author: { username: 'api_hunter' },
    publishedAt: new Date('2024-01-08'),
    readTime: 10
  }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost>(mockBlogPost);
  const [isLiked, setIsLiked] = useState(false);
  const [showTOC, setShowTOC] = useState(false);

  // Extract headings for table of contents
  const headings = post.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => ({
      level: line.match(/^#+/)?.[0].length || 1,
      text: line.replace(/^#+\s*/, ''),
      id: line.replace(/^#+\s*/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <Card className="bg-slate-800/80 border-slate-700 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-purple-700 text-white">Featured</Badge>
                  <Badge className="bg-blue-700 text-white">{post.category.replace(/_/g, ' ')}</Badge>
                  <Badge className="bg-green-700 text-white">{post.readTime} min read</Badge>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
                <p className="text-xl text-gray-300 mb-6">{post.excerpt}</p>
                
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={post.author.avatar || '/public/avatar.svg'} 
                    alt={post.author.username} 
                    className="w-12 h-12 rounded-full bg-white object-cover" 
                  />
                  <div>
                    <div className="text-white font-semibold">{post.author.username}</div>
                    <div className="text-sm text-gray-400">Level {post.author.level} • {post.author.experience} XP</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes.toLocaleString()} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments.length} comments
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Article Content */}
            <Card className="bg-slate-800/80 border-slate-700 mb-8">
              <CardContent className="p-8">
                <div className="prose prose-invert max-w-none">
                  <div 
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/^# (.*$)/gim, '<h1 id="$1">$1</h1>')
                        .replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>')
                        .replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>')
                        .replace(/^#### (.*$)/gim, '<h4 id="$1">$1</h4>')
                        .replace(/^##### (.*$)/gim, '<h5 id="$1">$1</h5>')
                        .replace(/^###### (.*$)/gim, '<h6 id="$1">$1</h6>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-slate-700 px-1 py-0.5 rounded">$1</code>')
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-900 p-4 rounded overflow-x-auto"><code class="language-$1">$2</code></pre>')
                        .replace(/\n/g, '<br>')
                    }} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Actions */}
            <Card className="bg-slate-800/80 border-slate-700 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={handleLike}
                      variant={isLiked ? "default" : "outline"}
                      className="flex items-center gap-2"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                  <SocialShare 
                    title={post.title}
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <CommentSection comments={post.comments} postId={post.id} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Table of Contents */}
            <TableOfContents headings={headings} />

            {/* Author Bio */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">About the Author</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={post.author.avatar || '/public/avatar.svg'} 
                    alt={post.author.username} 
                    className="w-16 h-16 rounded-full bg-white object-cover" 
                  />
                  <div>
                    <div className="text-white font-semibold">{post.author.username}</div>
                    <div className="text-sm text-gray-400">Security Researcher</div>
                    <div className="text-xs text-gray-500">Level {post.author.level}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Expert in web application security with over 5 years of experience in penetration testing and vulnerability research.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      </div>
    </Layout>
  );
} 