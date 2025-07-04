'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Clock, Star, Users, Zap, Grid3X3, List, Play, Lock, CheckCircle, TrendingUp, Share2, Download, Heart, Target, Code } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import { Badge } from '@/components/ui/badge'
import {
   formatDuration, formatCurrency
} from '@/lib/utils'
import { CourseCategory, Difficulty, Course, UserRole } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Ethical Hacking Fundamentals',
    description: 'Learn the basics of ethical hacking and penetration testing',
    shortDescription: 'Master the fundamentals of ethical hacking',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.BEGINNER,
    category: CourseCategory.PENETRATION_TESTING,
    duration: 480,
    lessons: [
      { id: '1', title: 'Introduction to Ethical Hacking', description: 'Overview of ethical hacking principles and methodologies', duration: 30, content: '', exercises: [], order: 1 },
      { id: '2', title: 'Reconnaissance Techniques', description: 'Learn passive and active reconnaissance methods', duration: 45, content: '', exercises: [], order: 2 },
      { id: '3', title: 'Scanning and Enumeration', description: 'Network scanning and service enumeration', duration: 60, content: '', exercises: [], order: 3 }
    ],
    instructor: {
      id: '1',
      username: 'John Smith',
      email: 'john@hackersparadise.com',
      role: UserRole.HUNTER,
      level: 25,
      experience: 5000,
      badges: [
        {
          id: '1',
          name: 'CERTIFIED_ETHICAL_HACKER',
          description: 'Certified Ethical Hacker',
          icon: 'shield',
          color: 'green',
          unlockedAt: new Date()
        },
        {
          id: '2',
          name: 'OSCP',
          description: 'Offensive Security Certified Professional',
          icon: 'target',
          color: 'red',
          unlockedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.8,
    enrolledCount: 1250,
    price: 99,
    isFree: false,
    tags: ['ethical-hacking', 'penetration-testing', 'cybersecurity'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Web Application Security',
    description: 'Comprehensive guide to securing web applications',
    shortDescription: 'Secure web applications from vulnerabilities',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.INTERMEDIATE,
    category: CourseCategory.WEB_SECURITY,
    duration: 720,
    lessons: [
      { id: '1', title: 'OWASP Top 10', description: 'Overview of the OWASP Top 10 vulnerabilities', duration: 60, content: '', exercises: [], order: 1 },
      { id: '2', title: 'SQL Injection', description: 'Understanding and preventing SQL Injection', duration: 90, content: '', exercises: [], order: 2 },
      { id: '3', title: 'XSS Prevention', description: 'Cross-site scripting and prevention techniques', duration: 75, content: '', exercises: [], order: 3 }
    ],
    instructor: {
      id: '2',
      username: 'Sarah Johnson',
      email: 'sarah@hackersparadise.com',
      role: UserRole.HUNTER,
      level: 30,
      experience: 8000,
      badges: [
        {
          id: '1',
          name: 'CERTIFIED_ETHICAL_HACKER',
          description: 'Certified Ethical Hacker',
          icon: 'shield',
          color: 'green',
          unlockedAt: new Date()
        },
        {
          id: '2',
          name: 'OSCP',
          description: 'Offensive Security Certified Professional',
          icon: 'target',
          color: 'red',
          unlockedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.9,
    enrolledCount: 890,
    price: 149,
    isFree: false,
    tags: ['web-security', 'owasp', 'vulnerabilities'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Network Security Essentials',
    description: 'Master network security and defense strategies',
    shortDescription: 'Essential network security concepts',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.BEGINNER,
    category: CourseCategory.NETWORK_SECURITY,
    duration: 360,
    lessons: [
      { id: '1', title: 'Network Fundamentals', description: 'Basics of computer networks', duration: 45, content: '', exercises: [], order: 1 },
      { id: '2', title: 'Firewall Configuration', description: 'How to configure firewalls for security', duration: 60, content: '', exercises: [], order: 2 },
      { id: '3', title: 'Intrusion Detection', description: 'Detecting and responding to intrusions', duration: 45, content: '', exercises: [], order: 3 }
    ],
    instructor: {
      id: '3',
      username: 'Mike Chen',
      email: 'mike@hackersparadise.com',
      role: UserRole.HUNTER,
      level: 20,
      experience: 3000,
      badges: [
        {
          id: '1',
          name: 'CERTIFIED_ETHICAL_HACKER',
          description: 'Certified Ethical Hacker',
          icon: 'shield',
          color: 'green',
          unlockedAt: new Date()
        },
        {
          id: '2',
          name: 'OSCP',
          description: 'Offensive Security Certified Professional',
          icon: 'target',
          color: 'red',
          unlockedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.7,
    enrolledCount: 2100,
    price: 79,
    isFree: false,
    tags: ['network-security', 'firewall', 'defense'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Advanced Cryptography',
    description: 'Deep dive into cryptographic algorithms and protocols',
    shortDescription: 'Advanced cryptographic concepts',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.ADVANCED,
    category: CourseCategory.CRYPTOGRAPHY,
    duration: 900,
    lessons: [
      { id: '1', title: 'Cryptographic Fundamentals', description: 'Core concepts of cryptography', duration: 90, content: '', exercises: [], order: 1 },
      { id: '2', title: 'Public Key Infrastructure', description: 'Understanding PKI and its applications', duration: 120, content: '', exercises: [], order: 2 },
      { id: '3', title: 'Blockchain Security', description: 'Security in blockchain technologies', duration: 150, content: '', exercises: [], order: 3 }
    ],
    instructor: {
      id: '4',
      username: 'Dr. Emily Rodriguez',
      email: 'emily@hackersparadise.com',
      role: UserRole.HUNTER,
      level: 35,
      experience: 12000,
      badges: [
        {
          id: '1',
          name: 'CERTIFIED_ETHICAL_HACKER',
          description: 'Certified Ethical Hacker',
          icon: 'shield',
          color: 'green',
          unlockedAt: new Date()
        },
        {
          id: '2',
          name: 'OSCP',
          description: 'Offensive Security Certified Professional',
          icon: 'target',
          color: 'red',
          unlockedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.9,
    enrolledCount: 450,
    price: 199,
    isFree: false,
    tags: ['cryptography', 'encryption', 'blockchain'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    title: 'Malware Analysis Fundamentals',
    description: 'Learn to analyze and reverse engineer malware',
    shortDescription: 'Malware analysis and reverse engineering',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.INTERMEDIATE,
    category: CourseCategory.MALWARE_ANALYSIS,
    duration: 600,
    lessons: [
      { id: '1', title: 'Malware Types', description: 'Types of malware and their characteristics', duration: 60, content: '', exercises: [], order: 1 },
      { id: '2', title: 'Static Analysis', description: 'Analyzing malware without execution', duration: 90, content: '', exercises: [], order: 2 },
      { id: '3', title: 'Dynamic Analysis', description: 'Analyzing malware during execution', duration: 120, content: '', exercises: [], order: 3 }
    ],
    instructor: {
      id: '5',
      username: 'Alex Thompson',
      email: 'alex@hackersparadise.com',
      role: UserRole.HUNTER,
      level: 28,
      experience: 6000,
      badges: [
        {
          id: '1',
          name: 'CERTIFIED_ETHICAL_HACKER',
          description: 'Certified Ethical Hacker',
          icon: 'shield',
          color: 'green',
          unlockedAt: new Date()
        },
        {
          id: '2',
          name: 'OSCP',
          description: 'Offensive Security Certified Professional',
          icon: 'target',
          color: 'red',
          unlockedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.8,
    enrolledCount: 680,
    price: 129,
    isFree: false,
    tags: ['malware', 'reverse-engineering', 'analysis'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    title: 'Digital Forensics Basics',
    description: 'Introduction to digital forensics and evidence collection',
    shortDescription: 'Digital forensics fundamentals',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.BEGINNER,
    category: CourseCategory.FORENSICS,
    duration: 420,
    lessons: [
      { id: '1', title: 'Forensic Fundamentals', description: 'Fundamental concepts in digital forensics', duration: 45, content: '', exercises: [], order: 1 },
      { id: '2', title: 'Evidence Collection', description: 'How to collect and preserve digital evidence', duration: 60, content: '', exercises: [], order: 2 },
      { id: '3', title: 'Analysis Tools', description: 'Tools used in digital forensics analysis', duration: 75, content: '', exercises: [], order: 3 }
    ],
    instructor: {
      id: '6',
      username: 'Lisa Wang',
      email: 'lisa@hackersparadise.com',
      role: UserRole.HUNTER,
      level: 22,
      experience: 4000,
      badges: [
        {
          id: '1',
          name: 'CERTIFIED_ETHICAL_HACKER',
          description: 'Certified Ethical Hacker',
          icon: 'shield',
          color: 'green',
          unlockedAt: new Date()
        },
        {
          id: '2',
          name: 'OSCP',
          description: 'Offensive Security Certified Professional',
          icon: 'target',
          color: 'red',
          unlockedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    rating: 4.6,
    enrolledCount: 950,
    price: 89,
    isFree: false,
    tags: ['forensics', 'evidence', 'investigation'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// Mock user enrollment data
const userEnrollments = {
  '1': { progress: 75, lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  '3': { progress: 45, lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  '5': { progress: 20, lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) }
}

const categories = Object.values(CourseCategory)
const difficulties = Object.values(Difficulty)

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDuration, setSelectedDuration] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('popular')
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = mockCourses

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty === selectedDifficulty)
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Duration filter
    if (selectedDuration !== 'all') {
      const [min, max] = selectedDuration.split('-').map(Number)
      filtered = filtered.filter(course => {
        const hours = course.duration / 60
        if (max) {
          return hours >= min && hours <= max
        }
        return hours >= min
      })
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.enrolledCount - a.enrolledCount)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration)
        break
    }

    return filtered
  }, [searchTerm, selectedDifficulty, selectedCategory, selectedDuration, sortBy])

  const toggleFavorite = (courseId: string) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.BEGINNER:
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case Difficulty.INTERMEDIATE:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case Difficulty.ADVANCED:
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case Difficulty.EXPERT:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getCategoryIcon = (category: CourseCategory) => {
    switch (category) {
      case CourseCategory.PENETRATION_TESTING:
        return Target
      case CourseCategory.WEB_SECURITY:
        return Lock
      case CourseCategory.NETWORK_SECURITY:
        return Zap
      case CourseCategory.CRYPTOGRAPHY:
        return Lock
      case CourseCategory.FORENSICS:
        return BookOpen
      case CourseCategory.MALWARE_ANALYSIS:
        return Code
      default:
        return BookOpen
    }
  }

  const CourseCard = ({ course }: { course: Course }) => {
    const isEnrolled = userEnrollments[course.id as keyof typeof userEnrollments]
    const isFavorite = favorites.includes(course.id)
    const CategoryIcon = getCategoryIcon(course.category)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="group"
      >
        <Card className="cyber-card overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
          {/* Course Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
              <Play className="w-12 h-12 text-white/50 group-hover:text-white transition-colors" />
            </div>
            
            {/* Progress Overlay */}
            {isEnrolled && (
              <div className="absolute top-2 left-2 right-2">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${isEnrolled.progress}%` }}
                  />
                </div>
                <div className="text-xs text-white mt-1">{isEnrolled.progress}% Complete</div>
              </div>
            )}

            {/* Favorite Button */}
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(course.id)
              }}
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-400 fill-red-400' : 'text-white'}`} />
            </Button>

            {/* Difficulty Badge */}
            <Badge className={`absolute bottom-2 left-2 ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </Badge>

            {/* Price Badge */}
            <Badge className="absolute bottom-2 right-2 bg-primary/20 text-primary border-primary/30">
              {course.isFree ? 'Free' : `$${course.price}`}
            </Badge>
          </div>

          <CardContent className="p-4">
            {/* Course Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.shortDescription}
                  </p>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-purple-600" />
                <span>{course.instructor.username}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.enrolledCount}</span>
                  </div>
                </div>
                <CategoryIcon className="w-4 h-4 text-primary" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Instructor Badges */}
              <div className="flex flex-wrap gap-1">
                {course.instructor.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary">
                    {badge.name}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                {isEnrolled ? (
                  <Button className="flex-1 cyber-button">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                ) : (
                  <Button className="flex-1 cyber-button">
                    {course.isFree ? 'Enroll Free' : 'Enroll Now'}
                  </Button>
                )}
                <Button size="sm" variant="outline" className="cyber-button-secondary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const CourseListItem = ({ course }: { course: Course }) => {
    const isEnrolled = userEnrollments[course.id as keyof typeof userEnrollments]
    const isFavorite = favorites.includes(course.id)
    const CategoryIcon = getCategoryIcon(course.category)

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 5 }}
      >
        <Card className="cyber-card cursor-pointer transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              {/* Course Image */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-20 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <Play className="w-8 h-8 text-white/50" />
                </div>
                {isEnrolled && (
                  <div className="absolute -bottom-1 left-0 right-0">
                    <div className="w-full bg-white/20 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-purple-600 h-1 rounded-full"
                        style={{ width: `${isEnrolled.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {course.isFree ? 'Free' : `$${course.price}`}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-purple-600" />
                    <span>{course.instructor.username}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledCount} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CategoryIcon className="w-4 h-4 text-primary" />
                    <span>{course.category.replace('_', ' ')}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Instructor Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.instructor.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge.name}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {isEnrolled ? (
                    <Button className="cyber-button">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  ) : (
                    <Button className="cyber-button">
                      {course.isFree ? 'Enroll Free' : 'Enroll Now'}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(course.id)
                    }}
                    className="cyber-button-secondary"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-400 fill-red-400' : ''}`} />
                  </Button>
                  <Button size="sm" variant="outline" className="cyber-button-secondary">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Simulate loading on mount
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Layout showSidebar={true}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="cyber-title text-4xl mb-2">Course Catalog</h1>
          <p className="cyber-subtitle">
            Master cybersecurity with our comprehensive course library
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search courses, topics, or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 focus:border-primary"
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Filters */}
            <div className="flex flex-wrap items-center space-x-4">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40 bg-white/5 border-white/10">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white/5 border-white/10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="penetration_testing">Penetration Testing</SelectItem>
                  <SelectItem value="web_security">Web Security</SelectItem>
                  <SelectItem value="network_security">Network Security</SelectItem>
                  <SelectItem value="cryptography">Cryptography</SelectItem>
                  <SelectItem value="forensics">Forensics</SelectItem>
                  <SelectItem value="malware_analysis">Malware Analysis</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-40 bg-white/5 border-white/10">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="0-2">0-2 hours</SelectItem>
                  <SelectItem value="2-5">2-5 hours</SelectItem>
                  <SelectItem value="5-10">5-10 hours</SelectItem>
                  <SelectItem value="10-">10+ hours</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white/5 border-white/10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="cyber-button-secondary"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className="cyber-button-secondary"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} of {mockCourses.length} courses
          </p>
        </motion.div>

        {/* Course Grid/List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-full rounded-xl bg-white/10" />
              ))}
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredCourses.map((course) => (
                <CourseListItem key={course.id} course={course} />
          ))}
        </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedDifficulty('all')
                setSelectedCategory('all')
                setSelectedDuration('all')
              }}
              className="cyber-button"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  )
} 