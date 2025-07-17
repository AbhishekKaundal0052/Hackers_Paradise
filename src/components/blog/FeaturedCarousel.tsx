'use client';
import React, { useState } from 'react';
import { BlogPost } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Eye, Heart, Clock } from 'lucide-react';

interface FeaturedCarouselProps {
  posts: BlogPost[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  return (
    <div className="relative">
      <Card className="bg-slate-800/80 border-slate-700 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-64 md:h-80">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentPost.coverImage})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-700 text-white">Featured</Badge>
                <Badge className="bg-blue-700 text-white">{currentPost.readTime} min read</Badge>
                <span className="text-xs text-gray-300 uppercase">{currentPost.category}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentPost.title}</h3>
              <p className="text-gray-200 mb-4 line-clamp-2">{currentPost.excerpt}</p>
              
              {/* Author and Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={currentPost.author.avatar || '/public/avatar.svg'} 
                    alt={currentPost.author.username} 
                    className="w-10 h-10 rounded-full bg-white object-cover" 
                  />
                  <div>
                    <div className="text-white font-semibold">{currentPost.author.username}</div>
                    <div className="text-xs text-gray-300">{new Date(currentPost.publishedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{currentPost.views}</span>
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{currentPost.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      {posts.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            title="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            title="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              title={`Go to slide ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 