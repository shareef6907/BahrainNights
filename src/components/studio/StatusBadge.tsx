'use client';

import {
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Send,
  AlertCircle,
  Wifi,
  WifiOff,
} from 'lucide-react';

type StatusType =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'scheduled'
  | 'posted'
  | 'rejected'
  | 'active'
  | 'inactive'
  | 'not_connected';

interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

const statusConfig: Record<
  StatusType,
  {
    label: string;
    color: string;
    bgColor: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  draft: {
    label: 'Draft',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    icon: Clock,
  },
  pending_review: {
    label: 'Pending',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    icon: AlertCircle,
  },
  approved: {
    label: 'Approved',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    icon: CheckCircle,
  },
  scheduled: {
    label: 'Scheduled',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    icon: Calendar,
  },
  posted: {
    label: 'Posted',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    icon: Send,
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    icon: XCircle,
  },
  active: {
    label: 'Active',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    icon: Wifi,
  },
  inactive: {
    label: 'Inactive',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    icon: WifiOff,
  },
  not_connected: {
    label: 'Not Connected',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    icon: WifiOff,
  },
};

export default function StatusBadge({
  status,
  showIcon = true,
  size = 'sm',
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 ${sizeClasses[size]} ${config.bgColor} ${config.color} rounded-full font-medium`}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      {config.label}
    </span>
  );
}
