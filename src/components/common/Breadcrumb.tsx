import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={twMerge('flex items-center text-xs text-text-muted', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
        <li>
          <Link
            to="/dashboard"
            className="text-text-muted hover:text-deep-teal flex items-center transition-colors"
            title="Bosh sahifa"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-1.5 whitespace-nowrap">
              <ChevronRight className="w-3.5 h-3.5 text-text-soft shrink-0" />
              {isLast || !item.href ? (
                <span className="font-medium text-text-main truncate max-w-[200px] sm:max-w-[300px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-deep-teal transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
