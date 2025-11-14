import { useEffect, useMemo, useState } from 'react';
import { dataService } from '../../services/dataService';
import { Issue } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { LifeBuoy, Timer, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../components/ui/badge';

export const MyWorkPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    dataService.getIssues().then(setIssues);
  }, []);

  const myIssues = useMemo(() => issues.slice(0, 5), [issues]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="My workload"
        description="Track what needs your immediate focus across business escalations, engineering follow-ups, and Jira syncs."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Assigned" value={myIssues.length} icon={<LifeBuoy className="h-5 w-5 text-primary-500" />} />
        <StatCard title="Due today" value={2} icon={<Timer className="h-5 w-5 text-amber-500" />} tone="negative" />
        <StatCard title="Awaiting feedback" value={1} icon={<AlertTriangle className="h-5 w-5 text-rose-500" />} />
        <StatCard title="Resolved this week" value={4} icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} tone="positive" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Focus list</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-gray-100 dark:divide-gray-800">
          {myIssues.map((issue) => (
            <div key={issue.id} className="flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{issue.title}</p>
                <p className="text-xs text-gray-500">
                  Updated {formatDistanceToNow(new Date(issue.updatedAt), { addSuffix: true })} • {issue.projectId}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{issue.status}</Badge>
                <Badge variant="danger">{issue.priority}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
