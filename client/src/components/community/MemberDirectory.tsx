'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Star, MapPin, Building, Clock } from 'lucide-react';
import { CommunityMember } from '@/types/community';

const mockMembers: CommunityMember[] = [
  {
    id: '1',
    username: 'cyber_hunter',
    avatar: '/avatars/user1.jpg',
    reputation: 15420,
    specialties: ['Web Security', 'Penetration Testing', 'Bug Bounties'],
    status: 'online',
    badges: [
      { id: '1', name: 'Security Expert', description: 'Top contributor', icon: '🏆', color: 'text-yellow-400', rarity: 'legendary' },
      { id: '2', name: 'Bug Hunter', description: 'Found 50+ vulnerabilities', icon: '🐛', color: 'text-green-400', rarity: 'epic' }
    ],
    joinDate: new Date('2022-01-15'),
    lastActive: new Date(),
    mentorshipOffered: true,
    level: 42,
    bio: 'Senior security researcher with 8+ years experience in web application security and penetration testing.',
    location: 'San Francisco, CA',
    company: 'Google Security'
  },
  {
    id: '2',
    username: 'malware_analyst',
    avatar: '/avatars/user2.jpg',
    reputation: 12890,
    specialties: ['Malware Analysis', 'Reverse Engineering', 'Threat Hunting'],
    status: 'away',
    badges: [
      { id: '3', name: 'Malware Hunter', description: 'Analyzed 1000+ samples', icon: '🦠', color: 'text-red-400', rarity: 'epic' }
    ],
    joinDate: new Date('2021-08-22'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    mentorshipOffered: false,
    level: 38,
    bio: 'Malware analyst specializing in advanced persistent threats and ransomware analysis.',
    location: 'Austin, TX',
    company: 'CrowdStrike'
  },
  {
    id: '3',
    username: 'crypto_master',
    avatar: '/avatars/user3.jpg',
    reputation: 9870,
    specialties: ['Cryptography', 'Blockchain Security', 'Zero-Knowledge Proofs'],
    status: 'online',
    badges: [
      { id: '4', name: 'Crypto Expert', description: 'Cryptographic implementations', icon: '🔐', color: 'text-purple-400', rarity: 'rare' }
    ],
    joinDate: new Date('2023-03-10'),
    lastActive: new Date(),
    mentorshipOffered: true,
    level: 35,
    bio: 'Cryptography researcher focused on breaking weak implementations and developing secure protocols.',
    location: 'Boston, MA',
    company: 'MIT'
  },
  {
    id: '4',
    username: 'net_breaker',
    avatar: '/avatars/user4.jpg',
    reputation: 11230,
    specialties: ['Network Security', 'Wireless Security', 'Social Engineering'],
    status: 'offline',
    badges: [
      { id: '5', name: 'Network Ninja', description: 'Network penetration expert', icon: '🌐', color: 'text-blue-400', rarity: 'rare' }
    ],
    joinDate: new Date('2022-06-18'),
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    mentorshipOffered: true,
    level: 41,
    bio: 'Network security specialist with expertise in wireless networks and social engineering techniques.',
    location: 'Seattle, WA',
    company: 'Microsoft'
  },
  {
    id: '5',
    username: 'security_guru',
    avatar: '/avatars/user5.jpg',
    reputation: 18920,
    specialties: ['Security Architecture', 'Compliance', 'Risk Management'],
    status: 'online',
    badges: [
      { id: '6', name: 'Security Guru', description: 'Industry veteran', icon: '👨‍💼', color: 'text-indigo-400', rarity: 'legendary' },
      { id: '7', name: 'Mentor', description: 'Helped 100+ students', icon: '🎓', color: 'text-green-400', rarity: 'epic' }
    ],
    joinDate: new Date('2020-11-05'),
    lastActive: new Date(),
    mentorshipOffered: true,
    level: 50,
    bio: 'Security architect with 15+ years experience in enterprise security, compliance, and risk management.',
    location: 'New York, NY',
    company: 'JP Morgan Chase'
  }
];

const statusColors = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-500'
};

const statusLabels = {
  online: 'Online',
  away: 'Away',
  offline: 'Offline'
};

export function MemberDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const allSpecialties = Array.from(new Set(mockMembers.flatMap(member => member.specialties)));

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    const matchesSpecialty = selectedSpecialty === 'all' || member.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const formatJoinDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>
        
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="away">Away</option>
          <option value="offline">Offline</option>
        </select>

        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          aria-label="Filter by specialty"
        >
          <option value="all">All Specialties</option>
          {allSpecialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card-dark p-6 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[member.status]} rounded-full border-2 border-gray-900`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.username}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 ${statusColors[member.status]} rounded-full`} />
                    <span className="text-xs text-gray-400">{statusLabels[member.status]}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">{member.reputation.toLocaleString()}</span>
                </div>
                <span className="text-xs text-gray-400">Level {member.level}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {member.bio}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-4">
              {member.specialties.map(specialty => (
                <span
                  key={specialty}
                  className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-400"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {member.badges.map(badge => (
                <div
                  key={badge.id}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-800/50 rounded-full text-xs"
                  title={badge.description}
                >
                  <span className={badge.color}>{badge.icon}</span>
                  <span className="text-gray-300">{badge.name}</span>
                </div>
              ))}
            </div>

            {/* Location and Company */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Building className="w-3 h-3" />
                <span>{member.company}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Joined {formatJoinDate(member.joinDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Active {formatLastActive(member.lastActive)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm hover:bg-red-500/30 transition-colors">
                Follow
              </button>
              {member.mentorshipOffered && (
                <button className="flex-1 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm hover:bg-purple-500/30 transition-colors">
                  Mentor
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No members found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
} 