import { ReactNode } from 'react';
import { AuthBackground } from '@/components/features/auth/AuthBackground';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <AuthBackground />
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Auth Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
        
        {/* Right side - Visual Showcase */}
        <div className="hidden lg:flex lg:w-3/5 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-red-500/10" />
          <div className="relative z-10 flex items-center justify-center w-full p-12">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                  Hacker's Paradise
                </h1>
                <p className="text-xl text-gray-300 max-w-md mx-auto">
                  Master cybersecurity through hands-on learning, real-world challenges, and expert guidance
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                <div className="glass-card-dark p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">50K+</div>
                  <div className="text-sm text-gray-400">Security Professionals</div>
                </div>
                <div className="glass-card-dark p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">200+</div>
                  <div className="text-sm text-gray-400">Hands-on Labs</div>
                </div>
                <div className="glass-card-dark p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">95%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="glass-card-dark p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Expert Support</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live CTF Challenges</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Bug Bounty Programs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 