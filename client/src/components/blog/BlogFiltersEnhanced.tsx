'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  X, 
  Tag, 
  Check,
  Grid3X3,
  List as ListIcon,
  TrendingUp,
  Clock,
  Eye
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BlogCategory } from '@/types'
import { cn } from '@/lib/utils'

interface BlogFiltersEnhancedProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  sortBy: string
  setSortBy: (value: string) => void
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
  totalResults: number
  totalPosts: number
  popularTags: string[]
}

export const BlogFiltersEnhanced: React.FC<BlogFiltersEnhancedProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalResults,
  totalPosts,
  popularTags
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedTags([])
    setSortBy('newest')
  }

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedCategory !== 'all' || 
    selectedTags.length > 0

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Primary Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 min-w-0 w-full md:min-w-[400px] group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/90 via-red-500/50 to-purple-600/90 rounded-2xl blur-sm opacity-25 group-focus-within:opacity-50 group-focus-within:blur-[6px] transition-all duration-500" />
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-red-400 transition-colors shrink-0 pointer-events-none" />
            <Input
              placeholder="Search articles, research, or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-11 h-14 w-full min-w-0 bg-[#0a0f16]/95 border border-white/10 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 rounded-2xl text-base md:text-lg text-white placeholder:text-gray-400 placeholder:font-medium transition-all shadow-inner"
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className={cn(
              "h-14 px-6 gap-2 border-white/10 bg-[#0a0f16] hover:bg-white/5 transition-all rounded-xl",
              isExpanded && "border-red-500/50 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
            )}
          >
            <Filter className={cn("w-5 h-5 transition-transform duration-300", isExpanded && "rotate-180")} />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <div className="ml-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]" />
            )}
          </Button>

          <div className="flex bg-[#0a0f16] border border-white/10 rounded-xl p-1 h-14">
            <button
              type="button"
              aria-label="Grid view"
              title="Grid view"
              onClick={() => setViewMode('grid')}
              className={cn(
                "px-4 rounded-lg flex items-center justify-center transition-all",
                viewMode === 'grid' 
                    ? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                    : "text-muted-foreground hover:text-white"
              )}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="List view"
              title="List view"
              onClick={() => setViewMode('list')}
              className={cn(
                "px-4 rounded-lg flex items-center justify-center transition-all",
                viewMode === 'list' 
                    ? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                    : "text-muted-foreground hover:text-white"
              )}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-[#0a0f16]/50 border border-white/10 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-400" />
                  Category
                </label>
                <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  <FilterOption 
                    label="All Categories" 
                    active={selectedCategory === 'all'} 
                    onClick={() => setSelectedCategory('all')} 
                  />
                  {Object.values(BlogCategory).map((cat) => (
                    <FilterOption 
                      key={cat}
                      label={cat.replace(/_/g, ' ')} 
                      active={selectedCategory === cat} 
                      onClick={() => setSelectedCategory(cat)} 
                    />
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-400" />
                  Popular Tags
                </label>
                <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar p-1">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                        selectedTags.includes(tag)
                          ? "bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                          : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex gap-4 items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="text-white font-medium">{totalResults}</span> of {totalPosts} articles
                  </p>
                  {hasActiveFilters && (
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Clear all filters
                    </button>
                  )}
               </div>
               
               <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Sort By:</span>
                  <div className="flex bg-[#0a0f16] border border-white/10 rounded-lg p-0.5">
                    {[
                      { id: 'newest', label: 'Newest', icon: Clock },
                      { id: 'popular', label: 'Popular', icon: Eye },
                      { id: 'trending', label: 'Trending', icon: TrendingUp },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSortBy(opt.id)}
                        className={cn(
                          "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all",
                          sortBy === opt.id 
                            ? "bg-white/10 text-white" 
                            : "text-muted-foreground hover:text-white"
                        )}
                      >
                        <opt.icon className="w-3 h-3" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isExpanded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
           <div className="flex gap-4 items-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-white font-medium">{totalResults}</span> research papers and tutorials
              </p>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Quick Access:</span>
              <div className="flex gap-2">
                {['TUTORIAL', 'RESEARCH', 'CASE_STUDY'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? 'all' : cat)}
                    className={cn(
                      "text-[10px] px-3 py-1 rounded-full border transition-all capitalize font-bold tracking-wider",
                      selectedCategory === cat 
                        ? "bg-gradient-to-r from-red-500 to-purple-600 text-white border-transparent shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                        : "border-white/10 text-muted-foreground hover:border-white/30"
                    )}
                  >
                    {cat.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

const FilterOption = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-between group",
      active 
        ? "bg-white/5 text-red-400 font-medium border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.05)]" 
        : "text-muted-foreground hover:bg-white/5 hover:text-white"
    )}
  >
    <span className="capitalize">{label}</span>
    {active ? (
      <Check className="w-4 h-4 animate-in zoom-in duration-200" />
    ) : (
      <div className="w-3 h-3 rounded-full border border-white/10 group-hover:border-white/30 transition-colors" />
    )}
  </button>
)
