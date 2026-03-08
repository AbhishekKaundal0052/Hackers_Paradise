'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  X, 
  DollarSign, 
  BarChart, 
  Tag, 
  SortAsc,
  Check,
  Grid3X3,
  List as ListIcon,
  Activity
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BountyCategory, Difficulty, BountyStatus } from '@/types'
import { cn } from '@/lib/utils'

interface BountyFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedDifficulty: string
  setSelectedDifficulty: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
  totalResults: number
  totalBounties: number
}

export const BountyFiltersEnhanced: React.FC<BountyFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalResults,
  totalBounties,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedDifficulty('all')
    setSelectedCategory('all')
    setSelectedStatus('all')
    setSortBy('newest')
  }

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedDifficulty !== 'all' || 
    selectedCategory !== 'all' || 
    selectedStatus !== 'all'

  return (
    <div className="space-y-6">
      {/* Search and Primary Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-red-400 transition-colors" />
            <Input
              placeholder="Search bounties, companies, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-[#0a0f16] border-white/10 focus:border-red-500/50 focus:ring-0 rounded-xl text-lg transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
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
            <div className="p-6 bg-[#0a0f16]/50 border border-white/10 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Category */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-red-400" />
                  Category
                </label>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  <FilterOption 
                    label="All Categories" 
                    active={selectedCategory === 'all'} 
                    onClick={() => setSelectedCategory('all')} 
                  />
                  {Object.values(BountyCategory).map((cat) => (
                    <FilterOption 
                      key={cat}
                      label={cat.replace(/_/g, ' ')} 
                      active={selectedCategory === cat} 
                      onClick={() => setSelectedCategory(cat)} 
                    />
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-purple-400" />
                  Difficulty
                </label>
                <div className="space-y-1.5">
                  <FilterOption 
                    label="All Levels" 
                    active={selectedDifficulty === 'all'} 
                    onClick={() => setSelectedDifficulty('all')} 
                  />
                  {Object.values(Difficulty).map((diff) => (
                    <FilterOption 
                      key={diff}
                      label={diff} 
                      active={selectedDifficulty === diff} 
                      onClick={() => setSelectedDifficulty(diff)} 
                    />
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-400" />
                  Status
                </label>
                <div className="space-y-1.5">
                  <FilterOption 
                    label="All Status" 
                    active={selectedStatus === 'all'} 
                    onClick={() => setSelectedStatus('all')} 
                  />
                  {Object.values(BountyStatus).map((status) => (
                    <FilterOption 
                      key={status}
                      label={status.replace(/_/g, ' ')} 
                      active={selectedStatus === status} 
                      onClick={() => setSelectedStatus(status)} 
                    />
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                  <SortAsc className="w-4 h-4 text-purple-400" />
                  Sort By
                </label>
                <div className="space-y-1.5">
                  {[
                    { label: 'Newest First', value: 'newest' },
                    { label: 'Highest Reward', value: 'reward' },
                    { label: 'Closing Soon', value: 'deadline' },
                    { label: 'Difficulty', value: 'difficulty' },
                  ].map((opt) => (
                    <FilterOption 
                      key={opt.value}
                      label={opt.label} 
                      active={sortBy === opt.value} 
                      onClick={() => setSortBy(opt.value)} 
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
               <div className="flex gap-4 items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="text-white font-medium">{totalResults}</span> of {totalBounties} bounties
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
               <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20 px-3 py-1">
                      {selectedCategory.replace(/_/g, ' ')}
                    </Badge>
                  )}
                  {selectedDifficulty !== 'all' && (
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-3 py-1">
                      {selectedDifficulty}
                    </Badge>
                  )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isExpanded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
           <div className="flex gap-4 items-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-white font-medium">{totalResults}</span> bounties matching your search
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
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Quick Filter:</span>
              <div className="flex gap-2">
                {['OPEN', 'IN_PROGRESS'].map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(selectedStatus === status ? 'all' : status)}
                    className={cn(
                      "text-[10px] px-3 py-1 rounded-full border transition-all capitalize font-bold tracking-wider",
                      selectedStatus === status 
                        ? "bg-gradient-to-r from-red-500 to-purple-600 text-white border-transparent shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                        : "border-white/10 text-muted-foreground hover:border-white/30"
                    )}
                  >
                    {status.replace(/_/g, ' ')}
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
