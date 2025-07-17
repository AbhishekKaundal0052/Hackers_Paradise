export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ProfileSettings {
  basicInfo: {
    username: string;
    email: string;
    realName?: string;
    bio: string;
    location?: string;
    website?: string;
    socialLinks: SocialLinks;
  };
  privacy: {
    profileVisibility: 'public' | 'community' | 'private';
    showEmail: boolean;
    showLocation: boolean;
    showLastActive: boolean;
    allowDirectMessages: boolean;
    searchable: boolean;
  };
  portfolio: {
    showPortfolio: boolean;
    featuredProjects: string[];
    skillsVisibility: 'public' | 'community' | 'private';
  };
}

export interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  lastUsed: Date;
  isCurrent: boolean;
}

export interface LoginSession {
  id: string;
  device: Device;
  location: string;
  ipAddress: string;
  userAgent: string;
  loginTime: Date;
  lastActivity: Date;
  isActive: boolean;
}

export interface SecurityEvent {
  id: string;
  type: 'failed_login' | 'suspicious_activity' | 'password_change' | '2fa_enabled' | '2fa_disabled';
  timestamp: Date;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

export interface SecuritySettings {
  password: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    strengthScore: number;
  };
  twoFactor: {
    enabled: boolean;
    method: 'app' | 'sms' | 'email';
    backupCodes: string[];
    trustedDevices: Device[];
  };
  loginHistory: {
    sessions: LoginSession[];
    suspiciousActivity: SecurityEvent[];
  };
  dataExport: {
    lastExport?: Date;
    availableFormats: string[];
  };
}

export interface NotificationSettings {
  email: {
    enabled: boolean;
    frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
    types: {
      courseUpdates: boolean;
      achievementUnlocks: boolean;
      communityActivity: boolean;
      securityAlerts: boolean;
      weeklyDigest: boolean;
      marketing: boolean;
    };
  };
  push: {
    enabled: boolean;
    types: {
      courseReminders: boolean;
      achievementUnlocks: boolean;
      communityMessages: boolean;
      securityAlerts: boolean;
      dailyGoals: boolean;
      streakReminders: boolean;
    };
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  learning: {
    dailyGoals: boolean;
    weeklyProgress: boolean;
    courseDeadlines: boolean;
    streakReminders: boolean;
    achievementCelebrations: boolean;
    studyReminders: {
      enabled: boolean;
      frequency: 'daily' | 'weekly' | 'custom';
      time: string;
    };
  };
  community: {
    newMessages: boolean;
    mentions: boolean;
    replies: boolean;
    friendRequests: boolean;
    groupInvites: boolean;
    eventReminders: boolean;
    leaderboardUpdates: boolean;
  };
}

export interface LearningSettings {
  preferences: {
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    learningStyle: 'hands-on' | 'theoretical' | 'mixed' | 'project-based';
    pace: 'slow' | 'moderate' | 'fast' | 'intensive';
    focusAreas: string[];
    preferredLanguages: string[];
    timeZone: string;
  };
  goals: {
    dailyStudyTime: number;
    weeklyCourses: number;
    monthlyCertifications: number;
    targetSkills: string[];
    completionRate: number;
  };
  schedule: {
    enabled: boolean;
    studyDays: string[];
    preferredTime: string;
    sessionDuration: number;
    breakDuration: number;
    timeSlots: Array<{
      day: string;
      time: string;
      duration: number;
    }>;
  };
  progress: {
    autoAdvance: boolean;
    reviewFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    practiceMode: boolean;
    adaptiveLearning: boolean;
    skillTracking: boolean;
  };
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface AppearanceSettings {
  theme: {
    mode: 'light' | 'dark' | 'system';
    autoSwitch: boolean;
    schedule: {
      enabled: boolean;
      lightStart: string;
      darkStart: string;
    };
  };
  colors: {
    primary: string;
    accent: string;
    customColors: {
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
    };
  };
  layout: {
    sidebarPosition: 'left' | 'right';
    sidebarCollapsed: boolean;
    compactMode: boolean;
    animations: boolean;
    glassmorphism: boolean;
    particleEffects: boolean;
  };
  typography: {
    fontSize: 'small' | 'medium' | 'large' | 'xlarge';
    fontFamily: string;
    lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose';
    letterSpacing: 'tight' | 'normal' | 'wide';
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    largeText: boolean;
    colorBlindSupport: boolean;
    screenReader: boolean;
  };
}

export interface SettingsState {
  profile: ProfileSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  learning: LearningSettings;
  appearance: AppearanceSettings;
} 