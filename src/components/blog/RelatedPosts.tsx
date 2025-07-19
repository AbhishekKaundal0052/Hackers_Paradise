'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import Link from 'next/link';

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: { username: string };
  publishedAt: Date;
  readTime: number;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <Card className="bg-slate-800/80 border-slate-700">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Related Posts</h3>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                <img 
                  src={post.coverImage || '/public/file.svg'} 
                  alt={post.title} 
                  className="w-16 h-12 rounded bg-white object-cover flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{post.author.username}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 