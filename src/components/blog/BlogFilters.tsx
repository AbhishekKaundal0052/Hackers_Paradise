'use client';
import React from 'react';
import { BlogCategory } from '@/types';

interface BlogFiltersProps {
  selectedCategory: BlogCategory | 'all';
  selectedTags: string[];
  onCategoryChange: (cat: BlogCategory | 'all') => void;
  onTagsChange: (tags: string[]) => void;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagsChange,
}) => {
  return (
    <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700">
      <h4 className="text-lg font-bold text-white mb-4">Filters</h4>
      <div className="mb-4">
        <label htmlFor="category-select" className="block text-gray-300 mb-1">Category</label>
        <select
          id="category-select"
          title="Category"
          className="w-full rounded bg-slate-900 text-white p-2 border border-slate-700"
          value={selectedCategory}
          onChange={e => onCategoryChange(e.target.value as BlogCategory | 'all')}
        >
          <option value="all">All Categories</option>
          {Object.values(BlogCategory).map(cat => (
            <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Selected Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map(tag => (
            <span key={tag} className="text-xs bg-purple-700 text-white px-2 py-1 rounded">
              {tag} <button onClick={() => onTagsChange(selectedTags.filter(t => t !== tag))} className="ml-1">×</button>
            </span>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button 
            onClick={() => onTagsChange([])}
            className="text-xs text-gray-400 hover:text-white"
          >
            Clear all tags
          </button>
        )}
      </div>
    </div>
  );
}; 