'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bounty, 
  Difficulty, 
  BountyStatus 
} from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  DollarSign, 
  Shield, 
  Target, 
  Zap, 
  Building2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BountyCardProps {
  bounty: Bounty;
  viewMode?: 'grid' | 'list';
}

const difficultyConfig = {
  [Difficulty.BEGINNER]: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  [Difficulty.INTERMEDIATE]: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  [Difficulty.ADVANCED]: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  [Difficulty.EXPERT]: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

const statusConfig = {
  [BountyStatus.OPEN]: { color: 'text-green-400', bg: 'bg-green-500/20' },
  [BountyStatus.IN_PROGRESS]: { color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  [BountyStatus.CLOSED]: { color: 'text-gray-400', bg: 'bg-gray-500/20' },
  [BountyStatus.AWARDED]: { color: 'text-purple-400', bg: 'bg-purple-500/20' },
};

function getTimeRemaining(deadline?: Date) {
  if (!deadline) return 'No deadline';
  const now = new Date();
  const d = new Date(deadline);
  const diff = d.getTime() - now.getTime();
  if (diff <= 0) return 'Expired';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days}d left`;
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${hours}h left`;
}

export const BountyCard: React.FC<BountyCardProps> = ({ bounty, viewMode = 'grid' }) => {
  const diff = difficultyConfig[bounty.difficulty];
  const status = statusConfig[bounty.status];

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
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                 {/* Company Logo */}
                 <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-br from-red-500/20 to-purple-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-white/10 overflow-hidden shadow-2xl">
                       <img src={bounty.logo || '/api/placeholder/48/48'} alt={bounty.company} className="w-10 h-10 object-contain" />
                    </div>
                 </div>

                 {/* Title & Info */}
                 <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                       <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{bounty.company}</span>
                       <span className="text-white/20">•</span>
                       <div className="flex items-center gap-1.5">
                          <div className={cn("w-1.5 h-1.5 rounded-full", status.bg.replace('/20', ''))} />
                          <span className={cn("text-[10px] font-bold uppercase tracking-tight", status.color)}>{bounty.status.replace('_', ' ')}</span>
                       </div>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate mb-1">
                       {bounty.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                       <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Target className="w-3.5 h-3.5" />
                          <span>{bounty.category.replace('_', ' ')}</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{getTimeRemaining(bounty.deadline)}</span>
                       </div>
                    </div>
                 </div>

                 {/* Reward & Action */}
                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="text-right">
                       <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-0.5">Potential Reward</p>
                       <p className="text-2xl font-black text-white tracking-tighter flex items-center gap-1">
                          <span className="text-red-500 text-lg">$</span>
                          {bounty.reward.toLocaleString()}
                       </p>
                    </div>
                    <Link href={`/bounties/${bounty.id}`}>
                      <Button size="sm" className="bg-white/5 hover:bg-red-500 text-white border border-white/10 hover:border-red-500 transition-all group/btn">
                         Explore
                         <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
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
        <div className="absolute top-0 right-0 p-4 z-10">
           <Badge className={cn("bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1", diff.color)}>
              {bounty.difficulty}
           </Badge>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/5 rounded-full blur-[80px] group-hover:bg-red-500/10 transition-colors" />

        <CardContent className="p-6 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-white/10 p-2 shadow-xl shrink-0">
               <img src={bounty.logo || '/api/placeholder/48/48'} alt={bounty.company} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
               <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-0.5 truncate">{bounty.company}</p>
               <div className="flex items-center gap-1.5">
                  <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status.bg.replace('/20', ''))} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", status.color)}>{bounty.status.replace('_', ' ')}</span>
               </div>
            </div>
          </div>

          {/* Title & Desc */}
          <div className="flex-1 mb-6">
            <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-red-400 transition-colors">
              {bounty.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
              {bounty.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {bounty.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
            {bounty.tags.length > 3 && (
              <span className="text-[10px] font-bold text-muted-foreground px-2 py-0.5">+{bounty.tags.length - 3} more</span>
            )}
          </div>

          {/* Footer Info */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
             <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1 flex items-center gap-1">
                   <DollarSign className="w-3 h-3 text-red-500" />
                   Max Reward
                </p>
                <p className="text-xl font-black text-white tracking-tighter">
                   ${bounty.reward.toLocaleString()}
                </p>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1 flex items-center justify-end gap-1">
                   <Clock className="w-3 h-3 text-purple-500" />
                   Time Left
                </p>
                <p className="text-sm font-bold text-white">
                   {getTimeRemaining(bounty.deadline)}
                </p>
             </div>
          </div>

          <Link href={`/bounties/${bounty.id}`} className="mt-6">
             <Button className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold border-0 shadow-lg shadow-red-500/20 group/btn h-11">
                View Details
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
             </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};
