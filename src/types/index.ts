// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: UserRole;
  level: number;
  experience: number;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
  HUNTER = 'hunter'
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date;
}

// Course related types
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  difficulty: Difficulty;
  category: CourseCategory;
  duration: number; // in minutes
  lessons: Lesson[];
  instructor: User;
  rating: number;
  enrolledCount: number;
  price: number;
  isFree: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum CourseCategory {
  NETWORK_SECURITY = 'network_security',
  WEB_SECURITY = 'web_security',
  MOBILE_SECURITY = 'mobile_security',
  CRYPTOGRAPHY = 'cryptography',
  FORENSICS = 'forensics',
  MALWARE_ANALYSIS = 'malware_analysis',
  PENETRATION_TESTING = 'penetration_testing',
  INCIDENT_RESPONSE = 'incident_response'
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl?: string;
  content: string;
  exercises: Exercise[];
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: ExerciseType;
  points: number;
  content: string;
  solution?: string;
}

export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  CODING = 'coding',
  CTF = 'ctf',
  ESSAY = 'essay'
}

// Bounty related types
export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: Difficulty;
  category: BountyCategory;
  status: BountyStatus;
  company: string;
  logo?: string;
  deadline?: Date;
  submissions: BountySubmission[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum BountyCategory {
  WEB_APPLICATION = 'web_application',
  MOBILE_APPLICATION = 'mobile_application',
  NETWORK = 'network',
  API = 'api',
  INFRASTRUCTURE = 'infrastructure'
}

export enum BountyStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
  AWARDED = 'awarded'
}

export interface BountySubmission {
  id: string;
  bountyId: string;
  userId: string;
  title: string;
  description: string;
  proofOfConcept: string;
  severity: VulnerabilitySeverity;
  status: SubmissionStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewer?: User;
}

export enum VulnerabilitySeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum SubmissionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DUPLICATE = 'duplicate'
}

// Blog related types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: User;
  coverImage?: string;
  tags: string[];
  category: BlogCategory;
  publishedAt: Date;
  updatedAt: Date;
  readTime: number; // in minutes
  views: number;
  likes: number;
  comments: Comment[];
}

export enum BlogCategory {
  TUTORIAL = 'tutorial',
  NEWS = 'news',
  CASE_STUDY = 'case_study',
  RESEARCH = 'research',
  OPINION = 'opinion'
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  parentId?: string;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

// Navigation types
export interface NavigationItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  badge?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CourseSearchFilters {
  category?: CourseCategory;
  difficulty?: Difficulty;
  priceRange?: [number, number];
  duration?: [number, number];
  rating?: number;
  tags?: string[];
}

export interface BountySearchFilters {
  category?: BountyCategory;
  difficulty?: Difficulty;
  rewardRange?: [number, number];
  status?: BountyStatus;
  tags?: string[];
}

// UI Component types
export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

// Animation types
export interface AnimationConfig {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Theme types
export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Dashboard related types
export interface DashboardMetrics {
  totalPoints: number;
  coursesCompleted: number;
  bountiesWon: number;
  learningStreak: number;
  currentLevel: number;
  experienceToNextLevel: number;
  totalExperience: number;
  weeklyProgress: number;
  monthlyProgress: number;
  averageScore: number;
  timeSpent: number; // in minutes
  certificatesEarned: number;
}

export interface LearningProgress {
  courseId: string;
  courseTitle: string;
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  lastAccessed: Date;
  estimatedCompletion: Date;
  category: CourseCategory;
  difficulty: Difficulty;
}

export interface ActivityItem {
  id: string;
  type: 'course_completed' | 'bounty_won' | 'achievement_unlocked' | 'level_up' | 'certificate_earned' | 'streak_milestone';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  points?: number;
  metadata?: Record<string, any>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'course' | 'bounty' | 'streak' | 'skill' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress?: number; // 0-100 for locked achievements
  requirement?: string;
  points: number;
}

export interface SkillLevel {
  skill: string;
  level: number; // 1-100
  category: CourseCategory;
  experience: number;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

export interface LearningStreak {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  weeklyData: number[]; // 7 days of activity
  monthlyData: number[]; // 30 days of activity
}

export interface UpcomingDeadline {
  id: string;
  title: string;
  type: 'course' | 'bounty' | 'assignment' | 'event';
  deadline: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
  url?: string;
}

export interface DashboardWidget {
  id: string;
  type: 'metrics' | 'progress' | 'activity' | 'achievements' | 'skills' | 'streak' | 'deadlines' | 'chart';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config?: Record<string, any>;
  isVisible: boolean;
  isCollapsed: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }[];
}

export interface ProgressRingData {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
  label: string;
  value: string;
}

export interface BarChartData {
  labels: string[];
  data: number[];
  colors: string[];
  maxValue: number;
}

export interface LineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
    fill?: boolean;
  }[];
}

export interface HeatmapData {
  data: Array<{
    date: string;
    value: number;
    intensity: number; // 0-1
  }>;
  maxValue: number;
  minValue: number;
}

// Dashboard configuration
export interface DashboardConfig {
  layout: DashboardWidget[];
  theme: 'dark' | 'light' | 'cyber';
  refreshInterval: number; // in seconds
  showAnimations: boolean;
  compactMode: boolean;
} 