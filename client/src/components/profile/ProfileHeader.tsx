'use client';

import { motion } from 'framer-motion';
import { Edit, MapPin, Globe, Twitter, Linkedin, Github, Star, Trophy, Users, Clock } from 'lucide-react';
import { UserProfile } from '@/types/profile';

const mockProfile: UserProfile = {
  id: '1',
  username: 'cyber_hunter',
  realName: 'Alex Chen',
  avatar: '/avatars/user1.jpg',
  coverImage: '/covers/cyber-cover.jpg',
  bio: 'Senior security researcher with 8+ years experience in web application security and penetration testing. Passionate about finding vulnerabilities and helping others learn cybersecurity.',
  location: 'San Francisco, CA',
  website: 'https://cyberhunter.dev',
  social: {
    twitter: 'https://twitter.com/cyber_hunter',
    linkedin: 'https://linkedin.com/in/alexchen',
    github: 'https://github.com/cyber-hunter'
  },
  joinDate: new Date('2022-01-15'),
  lastActive: new Date(),
  reputation: 15420,
  level: 42,
  title: 'Senior Security Researcher'
};

export function ProfileHeader() {
  const isOwnProfile = true; // This would be determined by auth context

  const formatJoinDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // const formatLastActive = (date: Date) => {
  //   const now = new Date();
  //   const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
  //   if (diffInHours < 1) return 'Just now';
  //   if (diffInHours < 24) return `${diffInHours}h ago`;
  //   return `${Math.floor(diffInHours / 24)}d ago`;
  // };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 via-purple-900/50 to-red-900/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(178,95,251,0.1),transparent_50%)]" />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Matrix-style background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff0000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      {/* Profile Info */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-20 md:-mt-16">
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-red-500 shadow-2xl shadow-red-500/50 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                {mockProfile.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
                  {mockProfile.username}
                </span>
              </h1>
              
              {mockProfile.realName && (
                <p className="text-xl text-gray-300">{mockProfile.realName}</p>
              )}
              
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>{mockProfile.title}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-red-400" />
                  <span>Level {mockProfile.level}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>{mockProfile.reputation.toLocaleString()} reputation</span>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-gray-300 max-w-2xl"
            >
              {mockProfile.bio}
            </motion.p>

            {/* Location and Website */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center md:justify-start space-x-4 mt-4 text-sm text-gray-400"
            >
              {mockProfile.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{mockProfile.location}</span>
                </div>
              )}
              {mockProfile.website && (
                <a
                  href={mockProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Joined {formatJoinDate(mockProfile.joinDate)}</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center md:justify-start space-x-3 mt-4"
            >
              {mockProfile.social.twitter && (
                <a
                  href={mockProfile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 hover:bg-red-500/20 border border-gray-700 hover:border-red-500/50 rounded-lg transition-all duration-200 group"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                </a>
              )}
              {mockProfile.social.linkedin && (
                <a
                  href={mockProfile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-500/50 rounded-lg transition-all duration-200 group"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                </a>
              )}
              {mockProfile.social.github && (
                <a
                  href={mockProfile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 hover:bg-purple-500/20 border border-gray-700 hover:border-purple-500/50 rounded-lg transition-all duration-200 group"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Edit Profile Button */}
          {isOwnProfile && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg hover:from-red-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
} 