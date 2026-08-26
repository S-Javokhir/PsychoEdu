import React from 'react';
import type { CameraState } from '../../types';
import { Badge } from '../common/Badge';

interface CameraStatusBadgeProps {
  state: CameraState;
  size?: 'sm' | 'md';
  className?: string;
}

export const CameraStatusBadge: React.FC<CameraStatusBadgeProps> = ({
  state,
  size = 'md',
  className,
}) => {
  switch (state) {
    case 'Live':
      return (
        <Badge variant="success" size={size} dot className={className}>
          JONLI EFIR
        </Badge>
      );
    case 'Recording':
      return (
        <Badge variant="warning" size={size} dot className={className}>
          YOZIB OLINMOQDA
        </Badge>
      );
    case 'Online':
      return (
        <Badge variant="teal" size={size} dot className={className}>
          Yoniq (Kutilmoqda)
        </Badge>
      );
    case 'Preparing':
      return (
        <Badge variant="sage" size={size} dot className={className}>
          Tayyorlanmoqda
        </Badge>
      );
    case 'Stream Error':
      return (
        <Badge variant="danger" size={size} dot className={className}>
          Aloqa uzildi
        </Badge>
      );
    case 'Offline':
    default:
      return (
        <Badge variant="neutral" size={size} dot className={className}>
          O‘chiq
        </Badge>
      );
  }
};
