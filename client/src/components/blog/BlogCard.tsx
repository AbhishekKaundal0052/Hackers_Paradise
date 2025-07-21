'use client';
import React from 'react';
import { BlogPost } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Heart, Clock } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  viewMode?: 'grid' | 'list';
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, viewMode = 'grid' }) => {
  return (
    <Card className={`hover:shadow-xl transition ${viewMode === 'list' ? 'flex' : ''} bg-slate-800/80 border-slate-700`}>
      <CardContent className={viewMode === 'list' ? 'flex items-center p-4 w-full' : 'p-6'}>
        {/* Cover Image */}
        <div className="flex-shrink-0 mr-4">
          <img src={post.coverImage || '/public/file.svg'} alt={post.title} className="w-28 h-20 rounded bg-white object-cover" />
        </div>
        {/* Main Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{post.category}</span>
            <Badge className="bg-blue-700 text-white">{post.readTime} min read</Badge>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{post.title}</h3>
          <p className="text-gray-300 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-2 mb-2">
            <img src={post.author.avatar || '/public/avatar.svg'} alt={post.author.username} className="w-6 h-6 rounded-full bg-white object-cover" />
            <span className="text-xs text-gray-400">{post.author.username}</span>
          </div>
          <div className="flex gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{post.views}</span>
            <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{post.likes}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 