import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: string;
  tone?: 'default' | 'positive' | 'negative';
}

const toneMap: Record<NonNullable<StatCardProps['tone']>, string> = {
  default: 'text-primary-600',
  positive: 'text-emerald-500',
  negative: 'text-rose-500'
};

export const StatCard = ({ title, value, description, icon, trend, tone = 'default' }: StatCardProps) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-semibold text-gray-900 dark:text-gray-50">{value}</div>
        {(description || trend) && (
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            {description && <CardDescription className="text-xs">{description}</CardDescription>}
            {trend && <span className={toneMap[tone]}>{trend}</span>}
          </div>
        )}
      </CardContent>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-500/0" />
    </Card>
  </motion.div>
);
