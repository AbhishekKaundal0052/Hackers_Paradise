'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Shield, AtSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { AuthCard } from './AuthCard';
import { AuthInput } from './AuthInput';
import { AuthButton } from './AuthButton';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { SocialLoginButtons } from './SocialLoginButtons';
import { useAuthStore } from '@/lib/auth-store';
// import { SignUpForm as SignUpFormType } from '@/types/auth';

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           "Password must contain uppercase, lowercase, number, and special character"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
  subscribeNewsletter: z.boolean().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const router = useRouter();
  const { signup, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // setValue,
    // trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      subscribeNewsletter: false,
    },
  });

  const watchedUsername = watch('username');
  const watchedPassword = watch('password');

  // Username availability check
  useEffect(() => {
    const checkUsername = async () => {
      if (watchedUsername.length >= 3) {
        setCheckingUsername(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsernameAvailable(watchedUsername !== 'taken');
        setCheckingUsername(false);
      } else {
        setUsernameAvailable(null);
      }
    };

    const timeoutId = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [watchedUsername]);

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    clearError();
    
    try {
      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        agreeToTerms: data.agreeToTerms,
        subscribeNewsletter: data.subscribeNewsletter || false,
      });
      
      toast.success('Welcome to the Cybersecurity Elite!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    toast(`${provider} signup coming soon!`, {
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
            Join the Cybersecurity Elite
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-400"
          >
            Start your journey to becoming a security expert
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
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <AuthInput
              label="First Name"
              placeholder="John"
              icon={<User size={18} />}
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            
            <AuthInput
              label="Last Name"
              placeholder="Doe"
              icon={<User size={18} />}
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          {/* Username */}
          <AuthInput
            label="Username"
            placeholder="johndoe"
            icon={<AtSign size={18} />}
            error={errors.username?.message}
            success={usernameAvailable === true}
            {...register('username')}
          />
          
          {checkingUsername && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-blue-400"
            >
              Checking username availability...
            </motion.p>
          )}
          
          {usernameAvailable === false && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              Username is already taken
            </motion.p>
          )}

          {/* Email */}
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />

          {/* Password */}
          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a strong password"
            icon={<Lock size={18} />}
            showPasswordToggle
            error={errors.password?.message}
            {...register('password')}
          />

          {/* Password Strength Meter */}
          {watchedPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <PasswordStrengthMeter password={watchedPassword} />
            </motion.div>
          )}

          {/* Confirm Password */}
          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            icon={<Lock size={18} />}
            showPasswordToggle
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          {/* Terms and Newsletter */}
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 text-red-500 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                {...register('agreeToTerms')}
              />
              <div className="text-sm text-gray-300">
                <span>I agree to the </span>
                <Link
                  href="/terms"
                  className="text-red-400 hover:text-red-300 underline"
                >
                  Terms of Service
                </Link>
                <span> and </span>
                <Link
                  href="/privacy"
                  className="text-red-400 hover:text-red-300 underline"
                >
                  Privacy Policy
                </Link>
                {errors.agreeToTerms && (
                  <p className="text-red-400 text-xs mt-1">{errors.agreeToTerms.message}</p>
                )}
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-500 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                {...register('subscribeNewsletter')}
              />
              <span className="text-sm text-gray-300">
                Subscribe to our newsletter for security updates and tips
              </span>
            </label>
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
            Create Account
          </AuthButton>
        </motion.form>

        {/* Social Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SocialLoginButtons
            onGoogleLogin={() => handleSocialSignup('Google')}
            onGithubLogin={() => handleSocialSignup('GitHub')}
            onMicrosoftLogin={() => handleSocialSignup('Microsoft')}
            loading={isLoading}
          />
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </AuthCard>
  );
} 