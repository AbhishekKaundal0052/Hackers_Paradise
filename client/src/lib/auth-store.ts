import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginForm, SignUpForm } from '@/types/auth';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginForm) => Promise<void>;
  signup: (userData: SignUpForm) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Mock API functions (replace with real API calls)
const mockLogin = async (credentials: LoginForm): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate validation
  if (credentials.email === 'test@example.com' && credentials.password === 'Password123!') {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: credentials.email,
      role: 'student',
      isVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
  }
  
  throw new Error('Invalid email or password');
};

const mockSignup = async (userData: SignUpForm): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate username availability check
  if (userData.username === 'taken') {
    throw new Error('Username is already taken');
  }
  
  return {
    id: '2',
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    role: 'student',
    isVerified: false,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginForm) => {
        set({ isLoading: true, error: null });
        
        try {
          const user = await mockLogin(credentials);
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed' 
          });
        }
      },

      signup: async (userData: SignUpForm) => {
        set({ isLoading: true, error: null });
        
        try {
          const user = await mockSignup(userData);
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Signup failed' 
          });
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 