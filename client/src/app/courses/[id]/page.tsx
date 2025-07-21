'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Target, 
  Award, 
  Heart,
  Share2,
  Lock,
  Video,
  Download,
  CheckCircle
} from 'lucide-react';
import { Course, CourseCategory, Difficulty, UserRole } from '@/types';
import CertificatePreviewModal from '@/components/learning/CertificatePreviewModal';

// Mock course data
const mockCourse: Course = {
  id: '1',
  title: 'Ethical Hacking Fundamentals',
  description: 'Master the fundamentals of ethical hacking and penetration testing in this comprehensive course.',
  shortDescription: 'Master the fundamentals of ethical hacking',
  thumbnail: '/api/placeholder/1200/400',
  difficulty: Difficulty.BEGINNER,
  category: CourseCategory.PENETRATION_TESTING,
  duration: 480,
  lessons: [
    { id: '1', title: 'Introduction to Ethical Hacking', duration: 30, order: 1, description: 'Introduction to Ethical Hacking', content: 'Introduction to Ethical Hacking', exercises: [] },
    { id: '2', title: 'Reconnaissance Techniques', duration: 45, order: 2, description: 'Reconnaissance Techniques', content: 'Reconnaissance Techniques', exercises: [] },
    { id: '3', title: 'Scanning and Enumeration', duration: 60, order: 3, description: 'Scanning and Enumeration', content: 'Scanning and Enumeration', exercises: [] }
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
};

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  // const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const course = mockCourse;

  useEffect(() => {
    // Load favorite state from localStorage
    const fav = localStorage.getItem(`favorite-course-${course.id}`);
    if (fav) setIsFavorite(fav === 'true');
  }, [course.id]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      localStorage.setItem(`favorite-course-${course.id}`, String(!prev));
      return !prev;
    });
  };

  const handleShare = () => {
    const shareData = {
      title: course.title,
      text: `Check out this course: ${course.title}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    // Simulate download
    alert('Resource download started!');
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.BEGINNER:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case Difficulty.INTERMEDIATE:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case Difficulty.ADVANCED:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Layout showSidebar={true}>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Course Banner */}
            <div className="aspect-video bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-6 relative">
              <div className="text-center">
                <Play className="w-16 h-16 text-white/50 mx-auto mb-4 cursor-pointer" onClick={() => setShowTrailer(true)} />
                <p className="text-white/70">Course Preview</p>
                <Button className="mt-4 cyber-button" onClick={() => setShowTrailer(true)}>
                  Watch Trailer
                </Button>
              </div>
              {/* Trailer Modal */}
              {showTrailer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowTrailer(false)}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-black rounded-lg overflow-hidden shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <video src="/api/placeholder/video" controls autoPlay className="w-[600px] h-[340px] bg-black" />
                    <Button className="w-full cyber-button" onClick={() => setShowTrailer(false)}>
                      Close
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    <Badge variant="secondary">
                      {course.category.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-primary border-primary">
                      {course.isFree ? 'Free' : `$${course.price}`}
                    </Badge>
                  </div>

                  <h1 className="cyber-title text-3xl lg:text-4xl">{course.title}</h1>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{course.rating}</span>
                      <span className="text-muted-foreground">(24 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{course.enrolledCount} students enrolled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{formatDuration(course.duration)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enrollment Card */}
              <div className="lg:col-span-1">
                <Card className="cyber-card sticky top-8">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">
                          {course.isFree ? 'Free' : `$${course.price}`}
                        </div>
                        {!course.isFree && (
                          <div className="text-sm text-muted-foreground line-through">
                            $199
                          </div>
                        )}
                      </div>

                      <Button className="w-full cyber-button text-lg py-3">
                        Enroll Now
                      </Button>

                      <div className="text-center text-sm text-muted-foreground">
                        30-Day Money-Back Guarantee
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-white">This course includes:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <Video className="w-4 h-4 text-primary" />
                            <span>{course.lessons.length} lessons</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{formatDuration(course.duration)} of content</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-primary" />
                            <span>Certificate of completion</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={toggleFavorite}
                          className="cyber-button-secondary"
                          aria-label="Bookmark course"
                        >
                          <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-400 fill-red-400' : ''}`} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleShare} className="cyber-button-secondary" aria-label="Share course">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleDownload} className="cyber-button-secondary" aria-label="Download course resource">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button className="cyber-button" onClick={() => setShowCertificate(true)}>
                Preview Certificate
              </Button>
            </div>
            <CertificatePreviewModal
              open={showCertificate}
              onClose={() => setShowCertificate(false)}
              userName="John Smith"
              courseName={course.title}
            />
          </div>
        </motion.div>

        {/* Course Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5">
              <TabsTrigger value="overview" className="cyber-tab">Overview</TabsTrigger>
              <TabsTrigger value="curriculum" className="cyber-tab">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor" className="cyber-tab">Instructor</TabsTrigger>
              <TabsTrigger value="reviews" className="cyber-tab">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>What you&apos;ll learn</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Understand ethical hacking methodologies</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Master reconnaissance and enumeration techniques</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Learn vulnerability assessment and exploitation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="space-y-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">{formatDuration(lesson.duration)}</p>
                            </div>
                          </div>
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Instructor Tab */}
            <TabsContent value="instructor" className="space-y-6">
              <Card className="cyber-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {course.instructor.username.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {course.instructor.username}
                        </h3>
                        <p className="text-muted-foreground">
                          Certified ethical hacker with over 10 years of experience in cybersecurity.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.instructor.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary">
                            {badge.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Student Reviews</h3>
                <p className="text-muted-foreground">Reviews coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
} 