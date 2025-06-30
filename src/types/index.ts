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
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
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