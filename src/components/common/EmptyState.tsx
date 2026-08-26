import React from 'react';
import { HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-surface border border-border-ui border-dashed rounded-card',
          className
        )
      )}
    >
      <div className="w-12 h-12 rounded-full bg-sage-light text-teal-700 flex items-center justify-center mb-3.5">
        {icon || <HelpCircle className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-semibold text-text-main mb-1.5">
        {title}
      </h4>
      {description && (
        <p className="text-xs sm:text-sm text-text-muted max-w-sm mb-4">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
