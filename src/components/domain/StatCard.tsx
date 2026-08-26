import React from 'react';
import { Card } from '../common/Card';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  icon,
  iconBg = 'bg-teal-50',
  iconColor = 'text-deep-teal',
}) => {
  return (
    <Card padded="md" className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-text-muted mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-text-main tracking-tight">{value}</h3>
        {subtext && <p className="text-xs text-text-muted mt-1">{subtext}</p>}
      </div>
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', iconBg, iconColor)}>
        {icon}
      </div>
    </Card>
  );
};
