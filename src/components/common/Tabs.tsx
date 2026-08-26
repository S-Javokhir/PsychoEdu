import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div className={twMerge('flex border-b border-border-ui overflow-x-auto no-scrollbar', className)}>
      <nav className="flex space-x-1 sm:space-x-4" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={twMerge(
                clsx(
                  'flex items-center gap-2 py-3 px-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors duration-150',
                  isActive
                    ? 'border-deep-teal text-deep-teal font-semibold'
                    : 'border-transparent text-text-muted hover:text-text-main hover:border-border-ui'
                )
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={twMerge(
                    clsx(
                      'text-xs py-0.5 px-2 rounded-full font-medium',
                      isActive
                        ? 'bg-sage-light text-teal-800'
                        : 'bg-gray-100 text-gray-600'
                    )
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
