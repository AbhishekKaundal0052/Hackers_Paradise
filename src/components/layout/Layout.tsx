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

export default function Layout({ 
  children, 
  showSidebar = false,
  user,
  stats,
  recentActivity
}: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  // Geometric background pattern
  const backgroundPattern = (
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

  // Loading animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {backgroundPattern}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="cyber-title text-2xl mb-2">Hacker's Paradise</h2>
          <p className="cyber-subtitle">Loading your security journey...</p>
          <div className="loading-dots mt-4">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {backgroundPattern}
      
      {/* Header */}
      <Header 
        user={user}
        notifications={notifications}
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
        {/* Page Transition Overlay */}
        <motion.div
          className="fixed inset-0 bg-black z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content Container */}
        <div className="min-h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={typeof window !== 'undefined' ? window.location.pathname : 'default'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
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

      {/* Keyboard Navigation Support */}
      <div className="sr-only">
        <button 
          onClick={() => {
            // Focus management for keyboard navigation
            const mainContent = document.querySelector('main')
            if (mainContent) {
              (mainContent as HTMLElement).focus()
            }
          }}
        >
          Skip to main content
        </button>
      </div>

      {/* Screen Reader Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {/* Dynamic announcements for screen readers */}
      </div>
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
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {backgroundPattern}
      <div className="text-center">
        <h2 className="cyber-title text-2xl mb-4">Something went wrong</h2>
        <p className="cyber-subtitle mb-6">Don't worry, even the best hackers encounter bugs</p>
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