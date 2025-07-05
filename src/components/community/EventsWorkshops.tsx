'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, Star, Play, Video, Users2, Trophy } from 'lucide-react';
import { CommunityEvent } from '@/types/community';

const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Advanced Web Application Penetration Testing',
    description: 'Learn advanced techniques for web app security testing including OWASP Top 10 exploitation.',
    type: 'workshop',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    duration: 4,
    maxParticipants: 25,
    currentParticipants: 18,
    instructor: 'cyber_hunter',
    difficulty: 'Advanced',
    tags: ['Web Security', 'OWASP', 'Penetration Testing'],
    isLive: false,
    image: '/events/web-pentest.jpg',
    location: 'Virtual',
    price: 99
  },
  {
    id: '2',
    title: 'Live CTF Challenge: Crypto Break',
    description: 'Real-time capture the flag challenge focused on cryptographic vulnerabilities.',
    type: 'ctf',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    duration: 6,
    maxParticipants: 100,
    currentParticipants: 67,
    instructor: 'crypto_master',
    difficulty: 'Intermediate',
    tags: ['Cryptography', 'CTF', 'Live'],
    isLive: true,
    image: '/events/crypto-ctf.jpg',
    location: 'Virtual',
    price: 0
  },
  {
    id: '3',
    title: 'Malware Analysis Fundamentals',
    description: 'Introduction to static and dynamic malware analysis techniques.',
    type: 'webinar',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    duration: 2,
    maxParticipants: 50,
    currentParticipants: 23,
    instructor: 'malware_analyst',
    difficulty: 'Beginner',
    tags: ['Malware', 'Analysis', 'Reverse Engineering'],
    isLive: false,
    image: '/events/malware-analysis.jpg',
    location: 'Virtual',
    price: 49
  }
];

const eventTypeIcons = {
  workshop: Video,
  webinar: Play,
  ctf: Trophy,
  meetup: Users2
};

const eventTypeColors = {
  workshop: 'from-blue-500 to-cyan-500',
  webinar: 'from-purple-500 to-pink-500',
  ctf: 'from-red-500 to-orange-500',
  meetup: 'from-green-500 to-emerald-500'
};

export function EventsWorkshops() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredEvents = mockEvents.filter(event => 
    selectedType === 'all' || event.type === selectedType
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Starting soon';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Events & Workshops</h2>
          <p className="text-gray-400">Join live sessions, workshops, and challenges</p>
        </div>
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          aria-label="Filter by event type"
        >
          <option value="all">All Events</option>
          <option value="workshop">Workshops</option>
          <option value="webinar">Webinars</option>
          <option value="ctf">CTF Challenges</option>
          <option value="meetup">Meetups</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event, index) => {
          const Icon = eventTypeIcons[event.type];
          const isFull = event.currentParticipants >= event.maxParticipants;
          const isLive = event.isLive;
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-dark p-6 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${eventTypeColors[event.type]} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">{event.difficulty}</span>
                      {isLive && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-red-400">Live</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">${event.price}</div>
                  <div className="text-xs text-gray-400">
                    {event.currentParticipants}/{event.maxParticipants}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{event.duration} hours</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>Instructor: {event.instructor}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Registration</span>
                  <span>{Math.round((event.currentParticipants / event.maxParticipants) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {getTimeUntil(event.date)}
                </div>
                <button
                  disabled={isFull}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isFull
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-purple-500 text-white hover:from-red-600 hover:to-purple-600'
                  }`}
                >
                  {isFull ? 'Full' : event.price === 0 ? 'Join Free' : 'Register'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No events found</h3>
          <p className="text-gray-500">Check back later for upcoming events</p>
        </motion.div>
      )}
    </div>
  );
} 