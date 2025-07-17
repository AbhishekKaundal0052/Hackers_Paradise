'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, MapPin, Calendar, MessageSquare, Video, Code, Users, UserCheck, Award } from 'lucide-react';
import { MentorProfile } from '@/types/community';

const mockMentors: MentorProfile[] = [
  {
    id: '1',
    mentor: {
      id: '1',
      username: 'cyber_hunter',
      avatar: '/avatars/user1.jpg',
      reputation: 15420,
      specialties: ['Web Security', 'Penetration Testing', 'Bug Bounties'],
      status: 'online',
      badges: [],
      joinDate: new Date('2022-01-15'),
      lastActive: new Date(),
      mentorshipOffered: true,
      level: 42,
      bio: 'Senior security researcher with 8+ years experience in web application security and penetration testing.',
      location: 'San Francisco, CA',
      company: 'Google Security'
    },
    expertise: ['Web Security', 'OWASP Top 10', 'Penetration Testing', 'Bug Bounty Programs'],
    experience: '8+ years in cybersecurity',
    availability: 'available',
    rating: 4.9,
    reviewCount: 127,
    sessionTypes: ['one-on-one', 'group', 'code-review'],
    priceRange: '$50-100/hour',
    bio: 'I specialize in web application security and have helped hundreds of students master penetration testing techniques. I offer personalized guidance for bug bounty programs and real-world security challenges.',
    certifications: ['OSCP', 'CEH', 'CISSP'],
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    mentor: {
      id: '2',
      username: 'malware_analyst',
      avatar: '/avatars/user2.jpg',
      reputation: 12890,
      specialties: ['Malware Analysis', 'Reverse Engineering', 'Threat Hunting'],
      status: 'away',
      badges: [],
      joinDate: new Date('2021-08-22'),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      mentorshipOffered: true,
      level: 38,
      bio: 'Malware analyst specializing in advanced persistent threats and ransomware analysis.',
      location: 'Austin, TX',
      company: 'CrowdStrike'
    },
    expertise: ['Malware Analysis', 'Reverse Engineering', 'Threat Hunting', 'Incident Response'],
    experience: '6+ years in threat intelligence',
    availability: 'busy',
    rating: 4.8,
    reviewCount: 89,
    sessionTypes: ['one-on-one', 'code-review'],
    priceRange: '$75-125/hour',
    bio: 'Expert in malware analysis and reverse engineering. I can help you understand how malware works and develop skills in threat hunting and incident response.',
    certifications: ['GREM', 'GCFA', 'GCIH'],
    languages: ['English']
  },
  {
    id: '3',
    mentor: {
      id: '3',
      username: 'crypto_master',
      avatar: '/avatars/user3.jpg',
      reputation: 9870,
      specialties: ['Cryptography', 'Blockchain Security', 'Zero-Knowledge Proofs'],
      status: 'online',
      badges: [],
      joinDate: new Date('2023-03-10'),
      lastActive: new Date(),
      mentorshipOffered: true,
      level: 35,
      bio: 'Cryptography researcher focused on breaking weak implementations and developing secure protocols.',
      location: 'Boston, MA',
      company: 'MIT'
    },
    expertise: ['Cryptography', 'Blockchain Security', 'Zero-Knowledge Proofs', 'Cryptographic Attacks'],
    experience: '5+ years in cryptography research',
    availability: 'available',
    rating: 4.7,
    reviewCount: 56,
    sessionTypes: ['one-on-one', 'group'],
    priceRange: '$60-90/hour',
    bio: 'Cryptography expert with deep knowledge of cryptographic algorithms and their vulnerabilities. I can help you understand crypto attacks and secure implementations.',
    certifications: ['PhD Cryptography', 'CISSP'],
    languages: ['English', 'French']
  }
];

const availabilityColors = {
  available: 'bg-green-500',
  busy: 'bg-yellow-500',
  full: 'bg-red-500'
};

const availabilityLabels = {
  available: 'Available',
  busy: 'Busy',
  full: 'Full'
};

export function MentorshipHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  const allExpertise = Array.from(new Set(mockMentors.flatMap(mentor => mentor.expertise)));

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.mentor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise = selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise);
    const matchesAvailability = selectedAvailability === 'all' || mentor.availability === selectedAvailability;
    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Mentorship Hub</h2>
          <p className="text-gray-400">Connect with experienced cybersecurity professionals</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>
        
        <select
          value={selectedExpertise}
          onChange={(e) => setSelectedExpertise(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          aria-label="Filter by expertise"
        >
          <option value="all">All Expertise</option>
          {allExpertise.map(expertise => (
            <option key={expertise} value={expertise}>{expertise}</option>
          ))}
        </select>

        <select
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          aria-label="Filter by availability"
        >
          <option value="all">All Availability</option>
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="full">Full</option>
        </select>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
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
                    {mentor.mentor.username.charAt(0).toUpperCase()}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${availabilityColors[mentor.availability]} rounded-full border-2 border-gray-900`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{mentor.mentor.username}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 ${availabilityColors[mentor.availability]} rounded-full`} />
                    <span className="text-xs text-gray-400">{availabilityLabels[mentor.availability]}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{mentor.priceRange}</div>
                <div className="flex items-center space-x-1">
                  {renderStars(mentor.rating)}
                  <span className="text-xs text-gray-400">({mentor.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {mentor.bio}
            </p>

            {/* Expertise */}
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.expertise.slice(0, 3).map(expertise => (
                <span
                  key={expertise}
                  className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-400"
                >
                  {expertise}
                </span>
              ))}
              {mentor.expertise.length > 3 && (
                <span className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-400">
                  +{mentor.expertise.length - 3} more
                </span>
              )}
            </div>

            {/* Session Types */}
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.sessionTypes.map(type => (
                <div
                  key={type}
                  className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs"
                >
                  {type === 'one-on-one' && <UserCheck className="w-3 h-3 text-purple-400" />}
                  {type === 'group' && <Users className="w-3 h-3 text-purple-400" />}
                  {type === 'code-review' && <Code className="w-3 h-3 text-purple-400" />}
                  <span className="text-purple-400">{type}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.certifications.map(cert => (
                <span
                  key={cert}
                  className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Location and Experience */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{mentor.mentor.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{mentor.experience}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm hover:bg-red-500/30 transition-colors">
                Book Session
              </button>
              <button className="flex-1 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 text-sm hover:bg-purple-500/30 transition-colors">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <UserCheck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No mentors found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
} 