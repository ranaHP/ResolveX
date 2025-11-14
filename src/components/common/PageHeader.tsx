import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className={cn('flex flex-col gap-6 md:flex-row md:items-center md:justify-between', className)}
  >
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>
      {description && <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-3">{actions}</div>}
  </motion.div>
);
