import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { dataService } from '../../services/dataService';
import { Issue, Priority } from '../../types';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Filter, PlusCircle } from 'lucide-react';

const priorityVariant: Record<Priority, 'default' | 'danger' | 'warning' | 'success'> = {
  Critical: 'danger',
  High: 'warning',
  Medium: 'default',
  Low: 'success'
};

export const IssuesListPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'ALL'>('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    dataService.getIssues().then((data) => {
      setIssues(data);
      setLoading(false);
    });
  }, []);

  const filteredIssues = useMemo(() => {
    if (selectedPriority === 'ALL') return issues;
    return issues.filter((issue) => issue.priority === selectedPriority);
  }, [issues, selectedPriority]);

  const columns = useMemo<ColumnDef<Issue>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        cell: ({ row }) => (
          <button
            className="font-medium text-primary-600 transition hover:text-primary-500"
            onClick={() => navigate(`/app/issues/${row.original.id}`)}
          >
            {row.original.id}
          </button>
        )
      },
      {
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => (
          <div className="max-w-sm">
            <p className="font-medium text-gray-900 dark:text-gray-100">{row.original.title}</p>
            <p className="text-xs text-gray-500">Component: {row.original.component}</p>
          </div>
        )
      },
      {
        header: 'Project',
        accessorKey: 'projectId'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>
      },
      {
        header: 'Priority',
        accessorKey: 'priority',
        cell: ({ row }) => <Badge variant={priorityVariant[row.original.priority]}>{row.original.priority}</Badge>
      },
      {
        header: 'Assignee',
        accessorKey: 'assignedTo'
      },
      {
        header: 'Updated',
        accessorKey: 'updatedAt',
        cell: ({ row }) => formatDistanceToNow(new Date(row.original.updatedAt), { addSuffix: true })
      },
      {
        header: '',
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-600"
            onClick={() => navigate(`/app/issues/${row.original.id}`)}
          >
            View <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )
      }
    ],
    [navigate]
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Issues & Escalations"
        description="Align business expectations and engineering throughput with a single pane for triage, SLA, and Jira sync."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Filter className="mr-2 h-4 w-4" /> Advanced filters
            </Button>
            <Button className="rounded-full" onClick={() => navigate('/app/issues/new')}>
              <PlusCircle className="mr-2 h-4 w-4" /> Raise issue
            </Button>
          </div>
        }
      />
      <div className="flex flex-wrap gap-3">
        {(['ALL', 'Critical', 'High', 'Medium', 'Low'] as const).map((priority) => (
          <Button
            key={priority}
            variant={selectedPriority === priority ? 'primary' : 'ghost'}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedPriority(priority as Priority | 'ALL')}
          >
            {priority}
          </Button>
        ))}
      </div>
      <DataTable
        data={loading ? [] : filteredIssues}
        columns={columns}
        emptyState={loading ? 'Loading issues...' : 'No issues match the selected filters.'}
      />
    </div>
  );
};
