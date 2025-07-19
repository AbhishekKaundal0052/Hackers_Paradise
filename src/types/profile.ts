export interface UserProfile {
  id: string;
  username: string;
  realName?: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  location?: string;
  website?: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  joinDate: Date;
  lastActive: Date;
  reputation: number;
  level: number;
  title: string; // "Security Researcher", "Penetration Tester", etc.
}

export interface UserStats {
  overall: {
    totalPoints: number;
    rank: number;
    level: number;
    experiencePoints: number;
    nextLevelXP: number;
  };
  learning: {
    coursesCompleted: number;
    certificationsEarned: number;
    totalLearningHours: number;
    currentStreak: number;
  };
  bounties: {
    totalEarnings: number;
    bountiesWon: number;
    successRate: number;
    averageReward: number;
  };
  community: {
    forumPosts: number;
    helpfulAnswers: number;
    mentoringSessions: number;
    eventsAttended: number;
  };
}

export interface PortfolioItem {
  id: string;
  type: 'project' | 'writeup' | 'tool' | 'research';
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  links: {
    github?: string;
    live?: string;
    paper?: string;
  };
  date: Date;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'certification';
  level: 1 | 2 | 3 | 4 | 5;
  endorsements: number;
  verified: boolean;
  certificationDate?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress?: {
    current: number;
    total: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'course_completed' | 'bounty_won' | 'post_created' | 'achievement_unlocked';
  timestamp: Date;
  content: string;
  metadata: Record<string, unknown>;
  reactions: {
    likes: number;
    comments: number;
  };
}

export const skillCategories = [
  'Web Application Security',
  'Network Security',
  'Cryptography',
  'Malware Analysis',
  'Forensics',
  'Social Engineering',
  'Cloud Security',
  'Mobile Security'
] as const;

export type SkillCategory = typeof skillCategories[number]; 