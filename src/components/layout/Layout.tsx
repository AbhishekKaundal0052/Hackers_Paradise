'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Button } from '@/components/ui/button'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  user?: {
    name: string
    email: string
    avatar?: string
    role: string
    level: number
    experience: number
    nextLevelExp: number
  }
  stats?: {
    coursesCompleted: number
    bountiesWon: number
    totalPoints: number
    streak: number
  }
  recentActivity?: Array<{
    id: string
    type: 'course' | 'bounty' | 'achievement' | 'login'
    title: string
    description: string
    timestamp: string
    icon: string
  }>
}

// Extract background pattern as a reusable component
function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  )
}

export default function Layout({ 
  children, 
  showSidebar = false,
  user,
  stats,
  recentActivity
}: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [_notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <BackgroundPattern />
      
      {/* Header */}
      <Header 
        user={user}
        notifications={_notifications}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <Sidebar 
            user={user}
            stats={stats}
            recentActivity={recentActivity}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`pt-16 transition-all duration-300 ${
          showSidebar ? 'md:ml-80' : ''
        }`}
      >
        {/* Content Container */}
        <div className="min-h-[calc(100vh-4rem)]">
          {children}
        </div>

        {/* Footer */}
        <Footer />
      </motion.main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => {
              // Close sidebar on mobile overlay click
              // This would need to be handled by parent component
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Page transition wrapper component
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Loading component for route transitions
export function RouteLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      />
      <span className="ml-3 text-muted-foreground">Loading...</span>
    </div>
  )
}

// Error boundary wrapper
export function ErrorBoundary() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <BackgroundPattern />
      <div className="text-center">
        <h2 className="cyber-title text-2xl mb-4">Something went wrong</h2>
        <p className="cyber-subtitle mb-6">Don&apos;t worry, even the best hackers encounter bugs</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="cyber-button"
        >
          Reload Page
        </Button>
      </div>
    </div>
  )
}