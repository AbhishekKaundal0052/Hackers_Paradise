'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, DollarSign, MessageSquare, Trophy, Heart, MessageCircle, Clock, Filter } from 'lucide-react';
import { ActivityItem } from '@/types/profile';

// Type definitions for activity metadata
interface CourseCompletedMetadata {
  score: number;
  duration: string;
}

interface BountyWonMetadata {
  bountyAmount: number;
  vulnerability: string;
  platform: string;
}

interface PostCreatedMetadata {
  views: number;
  forum: string;
}

interface AchievementUnlockedMetadata {
  rarity: string;
  description: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'course_completed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    content: 'Completed "Advanced Web Application Security" course',
    metadata: {
      courseName: 'Advanced Web Application Security',
      score: 95,
      duration: '8 hours'
    },
    reactions: {
      likes: 12,
      comments: 3
    }
  },
  {
    id: '2',
    type: 'bounty_won',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    content: 'Won bug bounty for XSS vulnerability discovery',
    metadata: {
      bountyAmount: 2500,
      vulnerability: 'XSS',
      platform: 'HackerOne'
    },
    reactions: {
      likes: 28,
      comments: 7
    }
  },
  {
    id: '3',
    type: 'post_created',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    content: 'Shared a comprehensive guide on OWASP Top 10 vulnerabilities',
    metadata: {
      postTitle: 'OWASP Top 10: Complete Guide for 2024',
      forum: 'Web Security',
      views: 156
    },
    reactions: {
      likes: 45,
      comments: 12
    }
  },
  {
    id: '4',
    type: 'achievement_unlocked',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    content: 'Unlocked "Security Expert" achievement',
    metadata: {
      achievementName: 'Security Expert',
      rarity: 'legendary',
      description: 'Reached level 40 and completed 25 courses'
    },
    reactions: {
      likes: 67,
      comments: 15
    }
  },
  {
    id: '5',
    type: 'course_completed',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    content: 'Completed "Network Penetration Testing" course',
    metadata: {
      courseName: 'Network Penetration Testing',
      score: 88,
      duration: '12 hours'
    },
    reactions: {
      likes: 8,
      comments: 2
    }
  }
];

const activityIcons = {
  course_completed: BookOpen,
  bounty_won: DollarSign,
  post_created: MessageSquare,
  achievement_unlocked: Trophy
};

const activityColors = {
  course_completed: 'text-blue-400',
  bounty_won: 'text-green-400',
  post_created: 'text-purple-400',
  achievement_unlocked: 'text-yellow-400'
};

const activityBgColors = {
  course_completed: 'bg-blue-500/20',
  bounty_won: 'bg-green-500/20',
  post_created: 'bg-purple-500/20',
  achievement_unlocked: 'bg-yellow-500/20'
};

export function ActivityFeed() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredActivities = mockActivities.filter(activity => 
    selectedType === 'all' || activity.type === selectedType
  );

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const renderActivityContent = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'course_completed':
        return (
          <div className="space-y-2">
            <p className="text-white">{activity.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Score: {(activity.metadata as unknown as CourseCompletedMetadata).score}%</span>
              <span>Duration: {(activity.metadata as unknown as CourseCompletedMetadata).duration}</span>
            </div>
          </div>
        );
      
      case 'bounty_won':
        return (
          <div className="space-y-2">
            <p className="text-white">{activity.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="text-green-400 font-medium">${(activity.metadata as unknown as BountyWonMetadata).bountyAmount}</span>
              <span>{(activity.metadata as unknown as BountyWonMetadata).vulnerability} on {(activity.metadata as unknown as BountyWonMetadata).platform}</span>
            </div>
          </div>
        );
      
      case 'post_created':
        return (
          <div className="space-y-2">
            <p className="text-white">{activity.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{(activity.metadata as unknown as PostCreatedMetadata).views} views</span>
              <span>in {(activity.metadata as unknown as PostCreatedMetadata).forum}</span>
            </div>
          </div>
        );
      
      case 'achievement_unlocked':
        return (
          <div className="space-y-2">
            <p className="text-white">{activity.content}</p>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${activityBgColors[activity.type]} ${activityColors[activity.type]}`}>
                {(activity.metadata as unknown as AchievementUnlockedMetadata).rarity}
              </span>
              <span className="text-gray-400">{(activity.metadata as unknown as AchievementUnlockedMetadata).description}</span>
            </div>
          </div>
        );
      
      default:
        return <p className="text-white">{activity.content}</p>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Activity Feed</h2>
          <p className="text-gray-400">Recent activities and achievements</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {[
          { id: 'all', label: 'All', icon: Filter },
          { id: 'course_completed', label: 'Courses', icon: BookOpen },
          { id: 'bounty_won', label: 'Bounties', icon: DollarSign },
          { id: 'post_created', label: 'Posts', icon: MessageSquare },
          { id: 'achievement_unlocked', label: 'Achievements', icon: Trophy }
        ].map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedType(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedType === filter.id
                  ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Icon size={16} />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {filteredActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-dark p-6 rounded-xl"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 ${activityBgColors[activity.type]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${activityColors[activity.type]}`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  {renderActivityContent(activity)}
                  
                  {/* Reactions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{activity.reactions.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{activity.reactions.comments}</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No activities found</h3>
          <p className="text-gray-500">Start learning and earning to see your activity here</p>
        </motion.div>
      )}
    </div>
  );
} 