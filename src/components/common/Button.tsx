import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out active:scale-[0.97] active:brightness-95 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none cursor-pointer';

  const variantClasses = {
    primary: 'bg-deep-teal text-white hover:bg-teal-800 focus:ring-deep-teal shadow-subtle hover:shadow-card',
    secondary: 'bg-teal-50 text-teal-700 hover:bg-teal-100 focus:ring-teal-300',
    outline: 'border border-border-ui bg-surface text-text-main hover:bg-sage-light hover:border-teal-300 focus:ring-teal-200 shadow-subtle hover:shadow-card',
    ghost: 'text-text-muted hover:text-text-main hover:bg-sage-light focus:ring-sage',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-subtle hover:shadow-card',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-btn gap-1.5',
    md: 'text-sm px-4 py-2 rounded-btn gap-2',
    lg: 'text-base px-5 py-2.5 rounded-btn gap-2.5',
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon && iconPosition === 'left' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      
      {children}

      {!loading && icon && iconPosition === 'right' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
    </button>
  );
};
