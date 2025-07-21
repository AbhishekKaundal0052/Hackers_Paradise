import { LoginForm } from '@/components/features/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Hacker\'s Paradise',
  description: 'Sign in to your cybersecurity dashboard and access hands-on labs, bounties, and more.',
};

export default function SignInPage() {
  return <LoginForm />;
} 