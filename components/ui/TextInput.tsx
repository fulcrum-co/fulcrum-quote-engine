'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-[#1a1a1a]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${error ? 'border-[#dc2626]' : 'border-[#e5e7eb]'}
            focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent
            placeholder:text-[#9ca3af]
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-[#dc2626]">{error}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
