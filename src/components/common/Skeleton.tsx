import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-sage-light/60';

  let variantClasses = 'rounded-md';
  if (variant === 'circular') variantClasses = 'rounded-full';
  if (variant === 'text') variantClasses = 'rounded h-4 w-full';
  if (variant === 'card') variantClasses = 'rounded-card h-48 w-full';

  const style: React.CSSProperties = {
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-surface border border-border-ui rounded-card p-5 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="w-20 h-5" />
      <Skeleton className="w-16 h-5 rounded-full" />
    </div>
    <Skeleton className="w-full h-32 rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-3" />
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-border-ui">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-16 h-7 rounded-btn" />
    </div>
  </div>
);

export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 5 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }).map((_, idx) => (
      <td key={idx} className="py-3.5 px-4">
        <Skeleton className="w-full h-4" />
      </td>
    ))}
  </tr>
);
