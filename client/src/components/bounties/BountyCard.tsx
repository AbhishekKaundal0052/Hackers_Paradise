import React from 'react';
import { Bounty, Difficulty, BountyStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface BountyCardProps {
  bounty: Bounty;
  viewMode?: 'grid' | 'list';
}

const difficultyColors = {
  [Difficulty.BEGINNER]: 'bg-green-500',
  [Difficulty.INTERMEDIATE]: 'bg-yellow-500',
  [Difficulty.ADVANCED]: 'bg-orange-500',
  [Difficulty.EXPERT]: 'bg-red-500',
};

const statusColors = {
  [BountyStatus.OPEN]: 'bg-green-600',
  [BountyStatus.IN_PROGRESS]: 'bg-yellow-600',
  [BountyStatus.CLOSED]: 'bg-gray-600',
  [BountyStatus.AWARDED]: 'bg-purple-600',
};

function getTimeRemaining(deadline?: Date) {
  if (!deadline) return 'No deadline';
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  if (diff <= 0) return 'Expired';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h left`;
}

export const BountyCard: React.FC<BountyCardProps> = ({ bounty, viewMode = 'grid' }) => {
  return (
    <Card className={`hover:shadow-xl transition ${viewMode === 'list' ? 'flex' : ''} bg-slate-800/80 border-slate-700`}> 
      <CardContent className={viewMode === 'list' ? 'flex items-center p-4 w-full' : 'p-6'}>
        {/* Logo */}
        <div className="flex-shrink-0 mr-4">
          <img src={bounty.logo || '/public/file.svg'} alt={bounty.company} className="w-12 h-12 rounded bg-white object-contain" />
        </div>
        {/* Main Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-block w-2 h-2 rounded-full ${statusColors[bounty.status]}`}></span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{bounty.company}</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{bounty.title}</h3>
          <p className="text-gray-300 text-sm mb-2 line-clamp-2">{bounty.description}</p>
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <Badge className={`${difficultyColors[bounty.difficulty]} text-white`}>{bounty.difficulty}</Badge>
            <Badge className="bg-blue-700 text-white">${bounty.reward.toLocaleString()}</Badge>
            <Badge className="bg-slate-700 text-white">{getTimeRemaining(bounty.deadline)}</Badge>
            <Badge className="bg-slate-600 text-white">{bounty.status}</Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {bounty.tags.map(tag => (
              <span key={tag} className="text-xs text-purple-300 bg-purple-900/40 rounded px-2 py-0.5 mr-1">#{tag}</span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 