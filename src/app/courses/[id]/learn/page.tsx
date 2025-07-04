'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  BookOpen,
  Code,
  FileText,
  CheckCircle,
  Lock,
  ChevronLeft,
  ChevronRight,
  Save,
  Download,
  Share2,
  Timer,
  Terminal,
  Target
} from 'lucide-react';

// Mock lesson data
const mockLesson = {
  id: '1',
  title: 'Introduction to Ethical Hacking',
  description: 'Learn the fundamental principles and methodologies of ethical hacking.',
  type: 'video',
  duration: 1800, // 30 minutes in seconds
  content: `
# Introduction to Ethical Hacking

## What is Ethical Hacking?

Ethical hacking, also known as penetration testing or white-hat hacking, involves authorized attempts to gain unauthorized access to computer systems, applications, or data to identify security vulnerabilities.

## Key Principles

1. **Authorization**: Always obtain proper permission before testing
2. **Scope**: Clearly define what systems can be tested
3. **Documentation**: Maintain detailed records of all activities
4. **Responsibility**: Report findings responsibly and securely

## The Hacking Methodology

### 1. Reconnaissance
- Passive information gathering
- Active information gathering
- Social engineering techniques

### 2. Scanning and Enumeration
- Network scanning
- Port scanning
- Service enumeration

### 3. Gaining Access
- Exploiting vulnerabilities
- Password attacks
- Social engineering

### 4. Maintaining Access
- Backdoors
- Rootkits
- Trojans

### 5. Covering Tracks
- Log manipulation
- File hiding
- Evidence removal
  `,
  codeExamples: [
    {
      language: 'python',
      title: 'Basic Port Scanner',
      code: `import socket
import sys

def scan_port(host, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except:
        return False

def scan_host(host, start_port=1, end_port=1024):
    open_ports = []
    for port in range(start_port, end_port + 1):
        if scan_port(host, port):
            open_ports.append(port)
            print(f"Port {port} is open")
    return open_ports

# Usage
host = "192.168.1.1"
open_ports = scan_host(host)
print(f"Found {len(open_ports)} open ports")`
    }
  ],
  quiz: {
    questions: [
      {
        id: '1',
        question: 'What is the primary goal of ethical hacking?',
        options: [
          'To cause damage to systems',
          'To identify and fix security vulnerabilities',
          'To steal sensitive information',
          'To disrupt services'
        ],
        correctAnswer: 1
      }
    ]
  }
};

export default function LearningModulePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(mockLesson.duration);
  const [activeTab, setActiveTab] = useState('content');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Simulate video progress
    const interval = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / duration) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout showSidebar={false}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-black/50 border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="cyber-button-secondary">
                <ChevronLeft className="w-4 h-4" />
                Back to Course
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-white">{mockLesson.title}</h1>
                <p className="text-sm text-muted-foreground">Lesson 1 of 8</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <Progress value={progress} className="w-32" />
              <Button
                size="sm"
                variant={showNotes ? "default" : "outline"}
                onClick={() => setShowNotes(!showNotes)}
                className="cyber-button-secondary"
              >
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Video Player */}
            <div className="relative bg-black">
              <div className="aspect-video bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70">Video Player</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  
                  <div className="flex-1">
                    <Progress value={(currentTime / duration) * 100} className="h-1" />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex-1 bg-gray-900">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-4 bg-white/5 rounded-none">
                  <TabsTrigger value="content" className="cyber-tab">Content</TabsTrigger>
                  <TabsTrigger value="code" className="cyber-tab">Code Examples</TabsTrigger>
                  <TabsTrigger value="quiz" className="cyber-tab">Quiz</TabsTrigger>
                  <TabsTrigger value="resources" className="cyber-tab">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="flex-1 p-6 overflow-y-auto">
                  <Card className="cyber-card">
                    <CardContent className="p-6">
                      <div className="prose prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                          {mockLesson.content}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="code" className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {mockLesson.codeExamples.map((example, index) => (
                      <Card key={index} className="cyber-card">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Code className="w-5 h-5 text-primary" />
                            <span>{example.title}</span>
                            <Badge variant="secondary">{example.language}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-black/50 rounded-lg p-4 border border-white/10">
                            <pre className="text-sm text-green-400 overflow-x-auto">
                              <code>{example.code}</code>
                            </pre>
                          </div>
                          <div className="flex items-center space-x-2 mt-4">
                            <Button size="sm" className="cyber-button">
                              <Terminal className="w-4 h-4 mr-2" />
                              Run Code
                            </Button>
                            <Button size="sm" variant="outline" className="cyber-button-secondary">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="flex-1 p-6 overflow-y-auto">
                  <Card className="cyber-card">
                    <CardContent className="p-6">
                      <div className="text-center space-y-6">
                        <Target className="w-16 h-16 text-primary mx-auto" />
                        <h3 className="text-xl font-semibold text-white">Quiz Coming Soon</h3>
                        <p className="text-muted-foreground">
                          Interactive quiz functionality will be available soon.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="flex-1 p-6 overflow-y-auto">
                  <Card className="cyber-card">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Additional Resources</h3>
                          <div className="grid gap-4">
                            <div className="flex items-center space-x-3 p-4 border border-white/10 rounded-lg">
                              <FileText className="w-5 h-5 text-primary" />
                              <div className="flex-1">
                                <h4 className="font-medium text-white">Course Slides</h4>
                                <p className="text-sm text-muted-foreground">PDF presentation</p>
                              </div>
                              <Button size="sm" variant="outline" className="cyber-button-secondary">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center space-x-3 p-4 border border-white/10 rounded-lg">
                              <Code className="w-5 h-5 text-primary" />
                              <div className="flex-1">
                                <h4 className="font-medium text-white">Practice Scripts</h4>
                                <p className="text-sm text-muted-foreground">Python and Bash examples</p>
                              </div>
                              <Button size="sm" variant="outline" className="cyber-button-secondary">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Notes Sidebar */}
          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-l border-white/10 bg-gray-900"
              >
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-semibold text-white mb-2">My Notes</h3>
                  <p className="text-sm text-muted-foreground">Take notes during the lesson</p>
                </div>
                
                <div className="p-4">
                  <Textarea
                    placeholder="Start taking notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[400px] bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
                  />
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Button size="sm" className="cyber-button">
                      <Save className="w-4 h-4 mr-2" />
                      Save Notes
                    </Button>
                    <Button size="sm" variant="outline" className="cyber-button-secondary">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-black/50 border-t border-white/10 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="cyber-button-secondary"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Lesson
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-lg font-semibold text-white">{Math.round(progress)}%</div>
              </div>
              <Progress value={progress} className="w-32" />
            </div>
            
            <Button
              className="cyber-button"
            >
              Next Lesson
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 