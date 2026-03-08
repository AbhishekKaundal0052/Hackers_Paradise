'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Eye, 
  Heart, 
  Clock, 
  User as UserIcon, 
  ChevronRight,
  Share2,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  post: BlogPost;
  viewMode?: 'grid' | 'list';
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 4 }}
        className="group"
      >
        <Card className="bg-[#0a0f16]/80 border-white/5 hover:border-red-500/30 transition-all duration-300 overflow-hidden relative">
           <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-red-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
           <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                 {/* Cover Image */}
                 <div className="relative flex-shrink-0 w-full sm:w-48 h-32 rounded-xl overflow-hidden border border-white/10">
                    <img 
                       src={post.coverImage || '/api/placeholder/400/250'} 
                       alt={post.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2">
                       <Badge className="bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-tighter">
                          {post.category.replace(/_/g, ' ')}
                       </Badge>
                    </div>
                 </div>

                 {/* Info */}
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                          <UserIcon className="w-3 h-3" />
                          {post.author.username}
                       </div>
                       <span className="text-white/20">•</span>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min read
                       </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-2 line-clamp-1">
                       {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                       {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                             <Eye className="w-4 h-4" />
                             <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                             <Heart className="w-4 h-4" />
                             <span>{post.likes.toLocaleString()}</span>
                          </div>
                       </div>
                       <Link href={`/blog/${post.slug}`}>
                          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2 group/btn">
                             Read More
                             <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                       </Link>
                    </div>
                 </div>
              </div>
           </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full bg-[#0a0f16]/80 border-white/5 hover:border-red-500/30 transition-all duration-500 overflow-hidden flex flex-col group relative">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
           <img 
              src={post.coverImage || '/api/placeholder/800/400'} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-transparent opacity-60" />
           <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 text-white border-0 text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-lg shadow-red-500/20">
                 {post.category.replace(/_/g, ' ')}
              </Badge>
           </div>
           <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white hover:bg-red-500 transition-colors">
                 <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white hover:bg-red-500 transition-colors">
                 <Share2 className="w-4 h-4" />
              </button>
           </div>
        </div>

        <CardContent className="p-6 flex flex-col flex-1 relative">
           {/* Author Info */}
           <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-red-500/30 overflow-hidden shrink-0">
                 <img src={post.author.avatar || '/api/placeholder/32/32'} alt={post.author.username} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                 <p className="text-xs font-bold text-white truncate">{post.author.username}</p>
                 <p className="text-[10px] text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                 <Clock className="w-3 h-3 text-red-500" />
                 {post.readTime} min
              </div>
           </div>

           {/* Content */}
           <div className="flex-1 mb-6">
              <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-red-400 transition-colors">
                 {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
                 {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                 {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                       #{tag}
                    </span>
                 ))}
              </div>
           </div>

           {/* Footer */}
           <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Eye className="w-4 h-4 text-red-500/50" />
                    <span>{post.views.toLocaleString()}</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Heart className="w-4 h-4 text-purple-500/50" />
                    <span>{post.likes.toLocaleString()}</span>
                 </div>
              </div>
              <Link href={`/blog/${post.slug}`}>
                 <Button className="bg-white/5 hover:bg-red-500 text-white font-bold border-white/10 hover:border-red-500 transition-all group/btn h-9 px-4">
                    Read Article
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                 </Button>
              </Link>
           </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
