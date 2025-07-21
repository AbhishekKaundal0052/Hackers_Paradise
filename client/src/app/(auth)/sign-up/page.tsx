import { SignUpForm } from '@/components/features/auth/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Hacker\'s Paradise',
  description: 'Create your account and join the cybersecurity elite at Hacker\'s Paradise.',
};

export default function SignUpPage() {
  return <SignUpForm />;
} 