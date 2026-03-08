'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface HeaderProps {
  notifications?: number;
}

const navigationItems = [
  { name: 'COURSES', href: '/courses', icon: Shield },
  { name: 'BOUNTIES', href: '/bounties', icon: Zap },
  { name: 'BLOG', href: '/blog', icon: Shield },
  { name: 'COMMUNITY', href: '/community', icon: Shield },
  { name: 'PROFILE', href: '/profile', icon: User },
];

export default function Header({ 
  notifications = 0
}: HeaderProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Mock search results - replace with actual search logic
    if (query.length > 2) {
      setSearchResults([
        'Ethical Hacking Fundamentals',
        'Network Security Basics',
        'Web Application Security',
        'Penetration Testing',
        'Cryptography Essentials'
      ].filter(item => item.toLowerCase().includes(query.toLowerCase())));
    } else {
      setSearchResults([]);
    }
  };

  const displayName = user ? `${user.firstName} ${user.lastName}` : '';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-card-dark backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      {/* Full-width container - prevent overflow on mobile */}
      <div className="w-full min-w-0 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo - compact on mobile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 min-w-0"
          >
            <Link href="/" className="flex items-center space-x-2 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-cyber font-bold text-base sm:text-xl text-white truncate hidden sm:inline">
                Hacker&apos;s Paradise
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - centered page links only */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="nav-link flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions - search + auth + notifications (desktop only on mobile, hamburger shows all in sheet) */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-4 min-w-0 flex-shrink-0">
            {/* Search Bar (desktop only) */}
            <div className="hidden md:flex items-center max-w-md mx-2 relative flex-1 min-w-0">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses, bounties..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="pl-10 pr-4 p-2 rounded-lg bg-white/5 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {isSearchFocused && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-1 glass-card-dark rounded-lg border border-white/10 overflow-hidden"
                    >
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-white/5 cursor-pointer text-sm text-white"
                        >
                          {result}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Notifications (desktop only - mobile: in hamburger sheet) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:block relative p-2 rounded-lg glass hover:bg-white/10 transition-colors"
            >
              <Bell className="w-5 h-5 text-white" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </Badge>
              )}
            </motion.button>

            {/* User Menu (desktop only - mobile: in hamburger sheet) */}
            {isAuthenticated && user ? (
              <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={displayName} />
                      <AvatarFallback className="bg-primary text-white font-cyber">
                        {user.firstName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block text-sm font-medium text-white">
                      {user.username}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="glass-card-dark border-white/10 text-white"
                >
                  <DropdownMenuLabel className="text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <Link href="/profile">
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="hover:bg-white/10 cursor-pointer text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="cyber-button">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu - visible only on md and below */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg glass hover:bg-white/10 transition-colors touch-manipulation"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-white" />
                </motion.button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="glass-card-dark border-l border-white/10 w-[min(320px,85vw)] p-0 flex flex-col [&>button:last-of-type]:hidden"
              >
                <div className="flex flex-col h-full overflow-y-auto">
                  {/* Mobile sheet header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                    <span className="font-cyber font-bold text-lg text-white">
                      Menu
                    </span>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 h-10 w-10"
                        aria-label="Close menu"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="p-4 shrink-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search courses, bounties..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 bg-white/5 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation - all main links */}
                  <nav className="flex-1 px-2 pb-4">
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3.5 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-white min-h-[48px] touch-manipulation"
                        >
                          <item.icon className="w-5 h-5 shrink-0" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Notifications (mobile) */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3.5 rounded-lg hover:bg-white/10 w-full text-left text-white min-h-[48px] touch-manipulation"
                      >
                        <Bell className="w-5 h-5 shrink-0" />
                        <span className="font-medium">Notifications</span>
                        {notifications > 0 && (
                          <Badge className="ml-auto bg-primary text-xs">
                            {notifications > 9 ? '9+' : notifications}
                          </Badge>
                        )}
                      </button>
                    </div>
                  </nav>

                  {/* Mobile Auth - Sign In / Get Started or User */}
                  <div className="border-t border-white/10 p-4 shrink-0 space-y-2">
                    {isAuthenticated && user ? (
                      <>
                        <div className="flex items-center space-x-3 px-2 py-2">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} alt={displayName} />
                            <AvatarFallback className="bg-primary text-white">
                              {user.firstName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{displayName}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                          </div>
                        </div>
                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                        </Link>
                        <Button 
                          onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                          }}
                          variant="ghost" 
                          className="w-full justify-start text-red-400 hover:bg-white/10"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="block">
                          <Button variant="ghost" className="w-full text-white hover:bg-white/10 h-12">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="block">
                          <Button className="cyber-button w-full h-12">
                            Get Started
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
} 