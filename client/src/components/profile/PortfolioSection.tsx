'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, Code, Search, Star } from 'lucide-react';
import { PortfolioItem } from '@/types/profile';

const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    type: 'project',
    title: 'Web Security Scanner',
    description: 'Advanced web application security scanner with OWASP Top 10 detection capabilities.',
    technologies: ['Python', 'Django', 'React', 'PostgreSQL'],
    images: ['/portfolio/scanner1.jpg', '/portfolio/scanner2.jpg'],
    links: {
      github: 'https://github.com/cyber-hunter/web-scanner',
      live: 'https://webscanner.demo.com'
    },
    date: new Date('2024-01-15'),
    featured: true
  },
  {
    id: '2',
    type: 'writeup',
    title: 'XSS Bypass Techniques',
    description: 'Comprehensive analysis of modern XSS bypass techniques and mitigation strategies.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    images: ['/portfolio/xss1.jpg'],
    links: {
      paper: 'https://cyberhunter.dev/xss-bypass-paper'
    },
    date: new Date('2024-02-20'),
    featured: true
  },
  {
    id: '3',
    type: 'tool',
    title: 'Network Reconnaissance Tool',
    description: 'Automated network reconnaissance and vulnerability assessment tool.',
    technologies: ['Go', 'Docker', 'Redis'],
    images: ['/portfolio/recon1.jpg', '/portfolio/recon2.jpg'],
    links: {
      github: 'https://github.com/cyber-hunter/network-recon'
    },
    date: new Date('2024-03-10'),
    featured: false
  },
  {
    id: '4',
    type: 'research',
    title: 'Zero-Day Exploit Analysis',
    description: 'In-depth analysis of a discovered zero-day vulnerability in popular web framework.',
    technologies: ['Assembly', 'C++', 'GDB'],
    images: ['/portfolio/zeroday1.jpg'],
    links: {
      paper: 'https://cyberhunter.dev/zeroday-analysis'
    },
    date: new Date('2024-03-25'),
    featured: true
  }
];

const typeIcons = {
  project: Code,
  writeup: FileText,
  tool: Code,
  research: FileText
};

const typeColors = {
  project: 'from-blue-500 to-cyan-500',
  writeup: 'from-green-500 to-emerald-500',
  tool: 'from-purple-500 to-pink-500',
  research: 'from-red-500 to-orange-500'
};

export function PortfolioSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredPortfolio = mockPortfolio.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Portfolio</h2>
          <p className="text-gray-400">Showcase of cybersecurity projects and research</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search portfolio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          aria-label="Filter by project type"
        >
          <option value="all">All Types</option>
          <option value="project">Projects</option>
          <option value="writeup">Writeups</option>
          <option value="tool">Tools</option>
          <option value="research">Research</option>
        </select>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolio.map((item, index) => {
          const Icon = typeIcons[item.type];
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card-dark rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group ${
                item.featured ? 'ring-2 ring-yellow-500/50' : ''
              }`}
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${typeColors[item.type]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {item.featured && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-400">
                      +{item.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.links.github && (
                      <a
                        href={item.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/50 hover:bg-purple-500/20 border border-gray-700 hover:border-purple-500/50 rounded-lg transition-all duration-200 group"
                      >
                        <Github className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                      </a>
                    )}
                    {item.links.live && (
                      <a
                        href={item.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/50 hover:bg-green-500/20 border border-gray-700 hover:border-green-500/50 rounded-lg transition-all duration-200 group"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                      </a>
                    )}
                    {item.links.paper && (
                      <a
                        href={item.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-500/50 rounded-lg transition-all duration-200 group"
                      >
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPortfolio.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No portfolio items found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
} 