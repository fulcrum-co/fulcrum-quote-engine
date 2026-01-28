'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, maxLength, showCount = true, value, className = '', ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-[#1a1a1a]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 rounded-lg border resize-none
            ${error ? 'border-[#dc2626]' : 'border-[#e5e7eb]'}
            focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent
            placeholder:text-[#9ca3af]
            ${className}
          `}
          rows={4}
          {...props}
        />
        <div className="flex justify-between">
          {error && (
            <p className="text-sm text-[#dc2626]">{error}</p>
          )}
          {showCount && maxLength && (
            <p className={`text-sm ml-auto ${currentLength > maxLength * 0.9 ? 'text-[#d97706]' : 'text-[#6b7280]'}`}>
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
