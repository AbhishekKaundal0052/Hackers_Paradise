'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Clock, Star, Users, Zap } from 'lucide-react'
import Layout from '@/components/layout/Layout'
// import CyberCard from '@/components/common/CyberCard'
import CyberButton from '@/components/common/CyberButton'
import { Badge } from '@/components/ui/badge'
import {
   formatDuration, formatCurrency
} from '@/lib/utils'
import { CourseCategory, Difficulty } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'

// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Web Application Penetration Testing',
    description: 'Learn to identify and exploit vulnerabilities in web applications',
    shortDescription: 'Master web app security testing',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.INTERMEDIATE,
    category: CourseCategory.WEB_SECURITY,
    duration: 480,
    instructor: { username: 'John Doe', avatar: '/api/placeholder/40/40' },
    rating: 4.8,
    enrolledCount: 1250,
    price: 99,
    isFree: false,
    tags: ['OWASP', 'Burp Suite', 'SQL Injection'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Network Security Fundamentals',
    description: 'Build a strong foundation in network security principles',
    shortDescription: 'Essential network security concepts',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.BEGINNER,
    category: CourseCategory.NETWORK_SECURITY,
    duration: 360,
    instructor: { username: 'Jane Smith', avatar: '/api/placeholder/40/40' },
    rating: 4.6,
    enrolledCount: 2100,
    price: 0,
    isFree: true,
    tags: ['TCP/IP', 'Firewalls', 'VPN'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Advanced Malware Analysis',
    description: 'Deep dive into malware reverse engineering and analysis',
    shortDescription: 'Reverse engineer malicious software',
    thumbnail: '/api/placeholder/400/250',
    difficulty: Difficulty.EXPERT,
    category: CourseCategory.MALWARE_ANALYSIS,
    duration: 720,
    instructor: { username: 'Mike Johnson', avatar: '/api/placeholder/40/40' },
    rating: 4.9,
    enrolledCount: 450,
    price: 199,
    isFree: false,
    tags: ['IDA Pro', 'x86 Assembly', 'PE Files'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
]

const categories = Object.values(CourseCategory)
const difficulties = Object.values(Difficulty)

export default function CoursesPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, _setSelectedCategory] = useState<CourseCategory | 'all'>('all')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDifficulty, _setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, _setSearchQuery] = useState('')

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  return (
    <Layout showSidebar={false}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="cyber-title text-4xl mb-4">Cybersecurity Courses</h1>
          <p className="cyber-subtitle max-w-2xl mx-auto">
            Master the art of cybersecurity with our comprehensive course library. 
            From beginner to advanced, we have everything you need to become a security expert.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                title="Course Category"
                aria-label="Course Category"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                title="Course Difficulty"
                aria-label="Course Difficulty"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="cyber-card h-full flex flex-col">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/50" />
                  </div>
                  <Badge className="absolute top-4 left-4">
                    {course.category}
                  </Badge>
                  {course.price === 0 && (
                    <Badge className="absolute top-4 right-4 bg-green-500">
                      Free
                    </Badge>
                  )}
                </div>
                <CardHeader className="flex-1">
                  <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{course.shortDescription}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDuration(course.duration)}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        {course.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <Badge variant="secondary">{course.difficulty}</Badge>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {course.enrolledCount}
                      </span>
                    </div>
                  </div>
                  <CyberButton
                    variant={course.isFree ? "outline" : "primary"}
                    size="sm"
                    fullWidth
                    icon={<Zap className="w-4 h-4" />}
                  >
                    {course.isFree ? 'Enroll Free' : formatCurrency(course.price)}
                  </CyberButton>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-cyber font-semibold text-white mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  )
} 