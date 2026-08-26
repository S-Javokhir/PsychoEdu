import React from 'react';
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Qidirish...',
  className,
  ...props
}) => {
  return (
    <div className={twMerge('relative w-full max-w-md', className)}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            'w-full pl-9 pr-8 py-2 text-sm bg-surface border border-border-ui rounded-input text-text-main placeholder-text-soft shadow-subtle',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-teal-300'
          )
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-main"
          aria-label="Tozalash"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
