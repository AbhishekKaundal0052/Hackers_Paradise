'use client';

import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Wifi, Shield } from 'lucide-react';
import { CommunityStats } from '@/types/community';

interface CommunityHeaderProps {
  stats: CommunityStats[];
}

export function CommunityHeader({ stats }: CommunityHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-900/20 via-purple-900/20 to-red-900/20 border-b border-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(178,95,251,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold"
            >
              <span className="bg-gradient-to-r from-red-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                Cybersecurity
              </span>
              <br />
              <span className="text-white">Community Hub</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Connect, learn, and grow with 15,000+ security professionals worldwide
            </motion.p>
          </motion.div>

          {/* Live Member Count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center space-x-3"
          >
            <div className="flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Live</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-white font-bold text-lg">2,341</span>
              <span className="text-gray-400">members online</span>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="glass-card-dark p-6 rounded-xl text-center hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Icon className="w-6 h-6 text-red-400" />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{stat.trend}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center space-x-2 text-sm text-gray-400"
          >
            <Shield className="w-4 h-4 text-green-400" />
            <span>Enterprise-grade security • End-to-end encryption</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 