export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  isVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface SocialLoginProvider {
  name: 'google' | 'github' | 'microsoft';
  icon: string;
  color: string;
} 