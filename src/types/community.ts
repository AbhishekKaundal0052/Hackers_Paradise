export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  postCount: number;
  memberCount: number;
  latestPost: {
    author: string;
    timestamp: Date;
    title: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon: string;
  color: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar: string;
    reputation: number;
  };
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replies: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  isLocked: boolean;
}

export interface CommunityMember {
  id: string;
  username: string;
  avatar: string;
  reputation: number;
  specialties: string[];
  status: 'online' | 'offline' | 'away';
  badges: Badge[];
  joinDate: Date;
  lastActive: Date;
  mentorshipOffered: boolean;
  level: number;
  bio: string;
  location: string;
  company: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'webinar' | 'ctf' | 'meetup';
  date: Date;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  instructor: string;
  difficulty: string;
  tags: string[];
  isLive: boolean;
  image: string;
  location: string;
  price: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    username: string;
    avatar: string;
    level: number;
  };
  stats: {
    totalPoints: number;
    coursesCompleted: number;
    bountiesWon: number;
    forumContributions: number;
  };
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface MentorProfile {
  id: string;
  mentor: CommunityMember;
  expertise: string[];
  experience: string;
  availability: 'available' | 'busy' | 'full';
  rating: number;
  reviewCount: number;
  sessionTypes: ('one-on-one' | 'group' | 'code-review')[];
  priceRange?: string;
  bio: string;
  certifications: string[];
  languages: string[];
}

export interface ChatMessage {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: Date;
  type: 'text' | 'code' | 'image';
}

export interface CommunityStats {
  label: string;
  value: string;
  icon: string;
  trend: string;
} 