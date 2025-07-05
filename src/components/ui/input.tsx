import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        aria-label={label}
        className="w-full px-3 py-2 rounded-lg bg-[#181f2a] border border-[#232b3b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition"
        {...props}
      />
    </div>
  )
);
Input.displayName = 'Input';
