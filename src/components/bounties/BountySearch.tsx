import React from 'react';

interface BountySearchProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  sortBy: 'reward' | 'deadline' | 'difficulty' | 'newest';
  onSortChange: (val: 'reward' | 'deadline' | 'difficulty' | 'newest') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (val: 'grid' | 'list') => void;
}

export const BountySearch: React.FC<BountySearchProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <input
        type="text"
        placeholder="Search bounties..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="flex-1 rounded bg-slate-900 text-white p-2 border border-slate-700"
      />
      <label htmlFor="sort-select" className="sr-only">Sort By</label>
      <select
        id="sort-select"
        title="Sort By"
        className="rounded bg-slate-900 text-white p-2 border border-slate-700"
        value={sortBy}
        onChange={e => onSortChange(e.target.value as any)}
      >
        <option value="newest">Newest</option>
        <option value="reward">Reward</option>
        <option value="deadline">Deadline</option>
        <option value="difficulty">Difficulty</option>
      </select>
      <div className="flex gap-2">
        <button
          className={`rounded p-2 border ${viewMode === 'grid' ? 'bg-purple-700 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-gray-400'}`}
          onClick={() => onViewModeChange('grid')}
        >
          Grid
        </button>
        <button
          className={`rounded p-2 border ${viewMode === 'list' ? 'bg-purple-700 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-gray-400'}`}
          onClick={() => onViewModeChange('list')}
        >
          List
        </button>
      </div>
    </div>
  );
}; 