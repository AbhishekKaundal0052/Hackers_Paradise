'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Star, Users, Award, Search, Filter } from 'lucide-react';
import { Skill, skillCategories } from '@/types/profile';

interface SkillsExpertiseProps {
  compact?: boolean;
}

const mockSkills: Skill[] = [
  {
    name: 'Web Application Security',
    category: 'technical',
    level: 5,
    endorsements: 45,
    verified: true,
    certificationDate: new Date('2023-06-15')
  },
  {
    name: 'Network Penetration Testing',
    category: 'technical',
    level: 4,
    endorsements: 32,
    verified: true,
    certificationDate: new Date('2023-08-22')
  },
  {
    name: 'Cryptography',
    category: 'technical',
    level: 4,
    endorsements: 28,
    verified: false
  },
  {
    name: 'Malware Analysis',
    category: 'technical',
    level: 3,
    endorsements: 19,
    verified: true,
    certificationDate: new Date('2024-01-10')
  },
  {
    name: 'Social Engineering',
    category: 'soft',
    level: 4,
    endorsements: 23,
    verified: false
  },
  {
    name: 'Incident Response',
    category: 'technical',
    level: 4,
    endorsements: 31,
    verified: true,
    certificationDate: new Date('2023-11-05')
  },
  {
    name: 'OSCP',
    category: 'certification',
    level: 5,
    endorsements: 0,
    verified: true,
    certificationDate: new Date('2023-05-20')
  },
  {
    name: 'CEH',
    category: 'certification',
    level: 5,
    endorsements: 0,
    verified: true,
    certificationDate: new Date('2022-12-10')
  }
];

const levelColors = {
  1: 'from-gray-500 to-gray-400',
  2: 'from-green-500 to-emerald-400',
  3: 'from-blue-500 to-cyan-400',
  4: 'from-purple-500 to-pink-400',
  5: 'from-red-500 to-orange-400'
};

const levelLabels = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
  5: 'Master'
};

export function SkillsExpertise({ compact = false }: SkillsExpertiseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSkills = mockSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const renderSkillBar = (skill: Skill) => {
    const percentage = (skill.level / 5) * 100;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">{skill.name}</span>
            {skill.verified && (
              <CheckCircle className="w-4 h-4 text-green-400" />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">{levelLabels[skill.level]}</span>
            {skill.category === 'certification' && skill.certificationDate && (
              <span className="text-xs text-blue-400">{formatDate(skill.certificationDate)}</span>
            )}
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${levelColors[skill.level]} h-2 rounded-full transition-all duration-1000`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {skill.category !== 'certification' && (
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{skill.endorsements} endorsements</span>
            </div>
            <button className="text-red-400 hover:text-red-300 transition-colors">
              Endorse
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Skills & Expertise</h2>
          <p className="text-gray-400">Technical skills and certifications</p>
        </div>
        {!compact && (
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">
              {mockSkills.filter(s => s.verified).length} verified
            </span>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      {!compact && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
            aria-label="Filter by skill category"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="soft">Soft Skills</option>
            <option value="certification">Certifications</option>
          </select>
        </div>
      )}

      {/* Skills Grid */}
      <div className="space-y-6">
        {/* Technical Skills */}
        {!compact && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Technical Skills</span>
            </h3>
            <div className="space-y-4">
              {filteredSkills.filter(skill => skill.category === 'technical').map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card-dark p-4 rounded-lg"
                >
                  {renderSkillBar(skill)}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {!compact && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>Soft Skills</span>
            </h3>
            <div className="space-y-4">
              {filteredSkills.filter(skill => skill.category === 'soft').map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card-dark p-4 rounded-lg"
                >
                  {renderSkillBar(skill)}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span>Certifications</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.filter(skill => skill.category === 'certification').map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card-dark p-4 rounded-lg border border-yellow-500/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: skill.level }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                {skill.certificationDate && (
                  <div className="text-xs text-gray-400">
                    Certified {formatDate(skill.certificationDate)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compact View */}
        {compact && (
          <div className="space-y-4">
            {filteredSkills.slice(0, 6).map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card-dark p-4 rounded-lg"
              >
                {renderSkillBar(skill)}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No skills found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
} 