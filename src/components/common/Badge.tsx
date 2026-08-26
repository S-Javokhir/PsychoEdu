import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'teal' | 'sage' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-deep-teal text-white',
    teal: 'bg-teal-50 text-teal-800 border border-teal-200',
    sage: 'bg-sage-light text-teal-900 border border-sage',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
  };

  const dotClasses = {
    primary: 'bg-white',
    teal: 'bg-teal-600',
    sage: 'bg-teal-700',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    neutral: 'bg-gray-400',
  };

  const sizeClasses = {
    sm: 'text-[11px] font-medium px-2 py-0.5 rounded-full gap-1.5',
    md: 'text-xs font-medium px-2.5 py-1 rounded-full gap-1.5',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center whitespace-nowrap shrink-0 tracking-tight select-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotClasses[variant])} />
      )}
      {children}
    </span>
  );
};
