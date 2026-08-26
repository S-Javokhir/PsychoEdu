import React from 'react';
import type { VideoState } from '../../types';
import { Badge } from '../common/Badge';

interface VideoStatusBadgeProps {
  status: VideoState;
  size?: 'sm' | 'md';
  className?: string;
}

export const VideoStatusBadge: React.FC<VideoStatusBadgeProps> = ({
  status,
  size = 'md',
  className,
}) => {
  switch (status) {
    case 'Published':
      return (
        <Badge variant="success" size={size} dot className={className}>
          E’lon qilingan
        </Badge>
      );
    case 'Approved':
      return (
        <Badge variant="teal" size={size} dot className={className}>
          Tasdiqlangan
        </Badge>
      );
    case 'Under Review':
      return (
        <Badge variant="warning" size={size} dot className={className}>
          Ko‘rib chiqilmoqda
        </Badge>
      );
    case 'Changes Requested':
      return (
        <Badge variant="warning" size={size} dot className={className}>
          Qayta ishlashda
        </Badge>
      );
    case 'Submitted':
      return (
        <Badge variant="sage" size={size} dot className={className}>
          Yuborilgan
        </Badge>
      );
    case 'Rejected':
      return (
        <Badge variant="danger" size={size} dot className={className}>
          Rad etilgan
        </Badge>
      );
    case 'Archived':
      return (
        <Badge variant="neutral" size={size} className={className}>
          Arxivlangan
        </Badge>
      );
    case 'Draft':
    default:
      return (
        <Badge variant="neutral" size={size} className={className}>
          Qoralama
        </Badge>
      );
  }
};
