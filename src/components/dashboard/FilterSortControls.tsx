'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  Search, 
  SortAsc, 
  SortDesc, 
  X, 
  ChevronDown,
  Calendar,
  TrendingUp,
  Target,
  BookOpen
} from 'lucide-react';

interface FilterSortControlsProps {
  onFiltersChange: (filters: any) => void;
  onSortChange: (sort: any) => void;
  onSearchChange: (search: string) => void;
  className?: string;
}

export default function FilterSortControls({ 
  onFiltersChange, 
  onSortChange, 
  onSearchChange, 
  className = '' 
}: FilterSortControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');

  const filterOptions = [
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'bounties', label: 'Bounties', icon: Target },
    { key: 'achievements', label: 'Achievements', icon: TrendingUp },
    { key: 'deadlines', label: 'Deadlines', icon: Calendar },
  ];

  const sortOptions = [
    { key: 'recent', label: 'Most Recent' },
    { key: 'oldest', label: 'Oldest First' },
    { key: 'name', label: 'Name A-Z' },
    { key: 'name-desc', label: 'Name Z-A' },
    { key: 'priority', label: 'Priority' },
    { key: 'progress', label: 'Progress' },
  ];

  const handleFilterToggle = (filterKey: string) => {
    const newFilters = activeFilters.includes(filterKey)
      ? activeFilters.filter(f => f !== filterKey)
      : [...activeFilters, filterKey];
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSortChange = (sortKey: string) => {
    setSortBy(sortKey);
    onSortChange(sortKey);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
    setSortBy('recent');
    onFiltersChange([]);
    onSortChange('recent');
    onSearchChange('');
  };

  return (
    <Card className={`cyber-card ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search dashboard items..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 focus:border-primary"
            />
          </div>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {activeFilters.map((filter) => {
                const filterOption = filterOptions.find(f => f.key === filter);
                return (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="bg-primary/20 text-primary border-primary/30"
                  >
                    {filterOption?.label}
                    <button
                      onClick={() => handleFilterToggle(filter)}
                      className="ml-1 hover:text-white"
                      aria-label={`Remove ${filterOption?.label} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              })}
              <Button
                size="sm"
                variant="ghost"
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-white"
              >
                Clear all
              </Button>
            </motion.div>
          )}

          {/* Filter and Sort Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="cyber-button-secondary"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown 
                  className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </Button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  title="Sort by"
                >
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {sortBy.includes('desc') ? (
                  <SortDesc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                ) : (
                  <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                )}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {activeFilters.length > 0 && `${activeFilters.length} filter${activeFilters.length !== 1 ? 's' : ''} active`}
            </div>
          </div>

          {/* Expanded Filter Options */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-white/10"
              >
                <div className="grid grid-cols-2 gap-4">
                  {filterOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = activeFilters.includes(option.key);
                    
                    return (
                      <Button
                        key={option.key}
                        size="sm"
                        variant={isActive ? "default" : "outline"}
                        onClick={() => handleFilterToggle(option.key)}
                        className={`justify-start ${isActive ? 'cyber-button' : 'cyber-button-secondary'}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
} 