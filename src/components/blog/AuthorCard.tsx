import React from 'react';
import { User } from '@/types';
import { Badge } from '@/components/ui/badge';

interface AuthorCardProps {
  author: User;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-lg border border-slate-700">
      <img src={author.avatar || '/public/avatar.svg'} alt={author.username} className="w-12 h-12 rounded-full bg-white object-cover" />
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-white">{author.username}</span>
          <Badge className="bg-purple-700 text-white text-xs">Lv. {author.level}</Badge>
        </div>
        <div className="text-xs text-gray-400">{author.role}</div>
        <div className="text-xs text-gray-400">Exp: {author.experience}</div>
      </div>
    </div>
  );
}; 