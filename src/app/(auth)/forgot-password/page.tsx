import { AuthCard } from '@/components/features/auth/AuthCard';
import { AuthInput } from '@/components/features/auth/AuthInput';
import { AuthButton } from '@/components/features/auth/AuthButton';
import { Shield } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | Hacker\'s Paradise',
  description: 'Reset your password securely and regain access to your cybersecurity dashboard.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard>
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center">
          <Shield size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
        <p className="text-gray-400">Enter your email address and we\'ll send you a link to reset your password.</p>
      </div>
      <form className="space-y-4 mt-8">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
        />
        <AuthButton type="submit" className="w-full" size="lg">
          Send Reset Link
        </AuthButton>
      </form>
    </AuthCard>
  );
} 