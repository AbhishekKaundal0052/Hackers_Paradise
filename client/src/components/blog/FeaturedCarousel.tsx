'use client';
import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Eye, Heart, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeaturedCarouselProps {
  posts: BlogPost[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f16] shadow-2xl relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="relative h-[400px] md:h-[500px]"
          >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
               <motion.img 
                 initial={{ scale: 1.1 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 8 }}
                 src={currentPost.coverImage || '/api/placeholder/1200/600'} 
                 alt={currentPost.title}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-[#0a0f16]/60 to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16] via-transparent to-transparent opacity-80" />
            </div>
            
            {/* Content Overlay */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-red-500 text-white border-0 text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-lg shadow-red-500/20">
                    Featured Research
                  </Badge>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase tracking-widest bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <Clock className="w-3 h-3 text-red-400" />
                    {currentPost.readTime} min read
                  </div>
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
                    {currentPost.category.replace(/_/g, ' ')}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                  {currentPost.title}
                </h3>
                
                <p className="text-gray-400 text-lg md:text-xl line-clamp-2 max-w-2xl font-medium leading-relaxed">
                  {currentPost.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-red-500/30 overflow-hidden p-0.5">
                       <img 
                         src={currentPost.author.avatar || '/api/placeholder/48/48'} 
                         alt={currentPost.author.username} 
                         className="w-full h-full rounded-full object-cover" 
                       />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm tracking-tight">{currentPost.author.username}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Lead Researcher</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-white/40">
                       <Eye className="w-4 h-4 text-red-500/50" />
                       <span className="text-sm font-bold tracking-tighter">{currentPost.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40">
                       <Heart className="w-4 h-4 text-purple-500/50" />
                       <span className="text-sm font-bold tracking-tighter">{currentPost.likes.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${currentPost.slug}`} className="sm:ml-auto">
                    <Button className="bg-white text-black hover:bg-red-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl group/btn">
                      Access Data
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Hover Only */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-red-500 transition-all shadow-2xl group/prev"
          >
            <ChevronLeft className="w-6 h-6 group-hover/prev:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-red-500 transition-all shadow-2xl group/next"
          >
            <ChevronRight className="w-6 h-6 group-hover/next:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Progress Bar at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
           <motion.div 
             key={currentIndex}
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 8, ease: "linear" }}
             className="h-full bg-gradient-to-r from-red-500 to-purple-600"
           />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-6">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
               setDirection(index > currentIndex ? 1 : -1);
               setCurrentIndex(index);
            }}
            className="relative h-1.5 transition-all duration-300 rounded-full overflow-hidden"
            style={{ width: index === currentIndex ? '40px' : '12px' }}
          >
             <div className={cn(
                "absolute inset-0 transition-colors",
                index === currentIndex ? "bg-red-500" : "bg-white/10 hover:bg-white/20"
             )} />
          </button>
        ))}
      </div>
    </div>
  );
};
