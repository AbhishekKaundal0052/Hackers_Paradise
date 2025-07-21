import React from 'react';
import { BountyCategory, Difficulty, BountyStatus } from '@/types';

interface BountyFiltersProps {
  selectedCategory: BountyCategory | 'all';
  selectedDifficulty: Difficulty | 'all';
  selectedStatus: BountyStatus | 'all';
  rewardRange: [number, number];
  onCategoryChange: (cat: BountyCategory | 'all') => void;
  onDifficultyChange: (diff: Difficulty | 'all') => void;
  onStatusChange: (status: BountyStatus | 'all') => void;
  onRewardRangeChange: (range: [number, number]) => void;
}

export const BountyFilters: React.FC<BountyFiltersProps> = ({
  selectedCategory,
  selectedDifficulty,
  selectedStatus,
  rewardRange,
  onCategoryChange,
  onDifficultyChange,
  onStatusChange,
  onRewardRangeChange,
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
          onChange={e => onCategoryChange(e.target.value as BountyCategory | 'all')}
        >
          <option value="all">All</option>
          {Object.values(BountyCategory).map(cat => (
            <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="difficulty-select" className="block text-gray-300 mb-1">Difficulty</label>
        <select
          id="difficulty-select"
          title="Difficulty"
          className="w-full rounded bg-slate-900 text-white p-2 border border-slate-700"
          value={selectedDifficulty}
          onChange={e => onDifficultyChange(e.target.value as Difficulty | 'all')}
        >
          <option value="all">All</option>
          {Object.values(Difficulty).map(diff => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="status-select" className="block text-gray-300 mb-1">Status</label>
        <select
          id="status-select"
          title="Status"
          className="w-full rounded bg-slate-900 text-white p-2 border border-slate-700"
          value={selectedStatus}
          onChange={e => onStatusChange(e.target.value as BountyStatus | 'all')}
        >
          <option value="all">All</option>
          {Object.values(BountyStatus).map(status => (
            <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="reward-range-min" className="block text-gray-300 mb-1">Reward Range (${rewardRange[0]} - ${rewardRange[1]})</label>
        <input
          id="reward-range-min"
          title="Minimum Reward"
          type="range"
          min={0}
          max={50000}
          step={500}
          value={rewardRange[0]}
          onChange={e => onRewardRangeChange([Number(e.target.value), rewardRange[1]])}
          className="w-full accent-purple-500 mb-2"
        />
        <input
          id="reward-range-max"
          title="Maximum Reward"
          type="range"
          min={0}
          max={50000}
          step={500}
          value={rewardRange[1]}
          onChange={e => onRewardRangeChange([rewardRange[0], Number(e.target.value)])}
          className="w-full accent-purple-500"
        />
      </div>
    </div>
  );
}; 