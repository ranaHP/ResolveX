import * as React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-primary-100 text-primary-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  outline: 'border border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-300'
};

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => (
  <span
    className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', variants[variant], className)}
    {...props}
  />
);
