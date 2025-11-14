import { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { TooltipProps } from 'recharts';

interface ChartContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const ChartContainer = ({ children, title, description, className }: ChartContainerProps) => (
  <div className={cn('rounded-3xl border border-gray-100 bg-white/60 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60', className)}>
    {(title || description) && (
      <div className="mb-4">
        {title && <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</h3>}
        {description && <p className="text-xs text-gray-400">{description}</p>}
      </div>
    )}
    <div className="h-60 w-full">{children}</div>
  </div>
);

export const ChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white/90 px-4 py-2 text-xs text-gray-600 shadow-lg dark:border-gray-800 dark:bg-gray-900/90 dark:text-gray-300">
        <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: entry.color ?? '#0e6dff' }} />
            <span>
              {entry.name}: <span className="font-semibold text-gray-900 dark:text-gray-100">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ChartTooltipContent = ChartTooltip;
