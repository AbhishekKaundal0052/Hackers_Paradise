"use client"

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, children, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        aria-label={label}
        className="w-full px-3 py-2 rounded-lg bg-[#181f2a] border border-[#232b3b] text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition"
        {...props}
      >
        {children}
      </select>
    </div>
  )
);
Select.displayName = 'Select';
