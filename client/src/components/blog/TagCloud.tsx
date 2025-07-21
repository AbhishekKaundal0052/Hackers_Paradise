'use client';
import React from 'react';

interface TagCloudProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const TagCloud: React.FC<TagCloudProps> = ({ tags, selectedTags, onTagClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              isSelected 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}; 