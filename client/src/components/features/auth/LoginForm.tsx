'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { AuthCard } from './AuthCard';
import { AuthInput } from './AuthInput';
import { AuthButton } from './AuthButton';
import { SocialLoginButtons } from './SocialLoginButtons';
import { useAuthStore } from '@/lib/auth-store';
// import { LoginForm as LoginFormType } from '@/types/auth';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    clearError();
    
    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
      });
      
      toast.success('Welcome back, Cyber Guardian!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast(`${provider} login coming soon!`, {
      icon: '🔐',
    });
  };

  return (
    <AuthCard>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <Shield size={24} className="text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl font-bold text-white"
          >
            Welcome Back, Cyber Guardian
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-400"
          >
            Access your cybersecurity learning dashboard
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock size={18} />}
            showPasswordToggle
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-500 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                {...register('rememberMe')}
              />
              <span className="text-sm text-gray-300">Remember me</span>
            </label>
            
            <Link
              href="/forgot-password"
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          <AuthButton
            type="submit"
            loading={isLoading}
            className="w-full"
            size="lg"
          >
            Sign In
          </AuthButton>
        </motion.form>

        {/* Social Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SocialLoginButtons
            onGoogleLogin={() => handleSocialLogin('Google')}
            onGithubLogin={() => handleSocialLogin('GitHub')}
            onMicrosoftLogin={() => handleSocialLogin('Microsoft')}
            loading={isLoading}
          />
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Create one now
            </Link>
          </p>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
        >
          <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-500">Email: test@example.com</p>
          <p className="text-xs text-gray-500">Password: Password123!</p>
        </motion.div>
      </motion.div>
    </AuthCard>
  );
} 