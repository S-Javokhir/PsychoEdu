import React from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, hint, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-text-main mb-1.5">
            {label}
          </label>
        )}
        <div className="relative rounded-input shadow-subtle">
          <select
            id={selectId}
            ref={ref}
            className={twMerge(
              clsx(
                'block w-full appearance-none rounded-input border bg-surface text-sm text-text-main py-2 pl-3 pr-9 transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500',
                error ? 'border-red-400 focus:ring-red-400' : 'border-border-ui hover:border-teal-300',
                className
              )
            )}
            {...props}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-muted">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
