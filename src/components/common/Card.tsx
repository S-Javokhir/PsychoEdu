import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padded?: boolean | 'sm' | 'md' | 'lg' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  padded = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
    true: 'p-5',
    false: 'p-0',
  };

  const padKey = typeof padded === 'boolean' ? (padded ? 'md' : 'none') : padded;

  return (
    <div
      className={twMerge(
        clsx(
          'bg-surface border border-border-ui rounded-card shadow-subtle transition-all duration-300 ease-out',
          hoverable && 'hover:shadow-elevated hover:border-teal-300 hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer',
          paddingClasses[padKey],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
