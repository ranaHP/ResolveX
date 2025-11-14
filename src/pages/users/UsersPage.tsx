import { useEffect, useMemo, useState } from 'react';
import { dataService } from '../../services/dataService';
import { User } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { PlusCircle, ShieldBan } from 'lucide-react';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    dataService.getUsers().then(setUsers);
  }, []);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{row.original.name}</p>
            <p className="text-xs text-gray-400">{row.original.email}</p>
          </div>
        )
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>
      },
      {
        header: 'Projects',
        accessorKey: 'projects',
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 text-xs text-gray-500">
            {row.original.projects.map((project) => (
              <span key={project} className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                {project}
              </span>
            ))}
          </div>
        )
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => (
          <Badge variant={row.original.status === 'Active' ? 'success' : 'danger'}>{row.original.status}</Badge>
        )
      },
      {
        header: 'Actions',
        cell: () => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="rounded-full">
              Edit
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full text-rose-500">
              <ShieldBan className="mr-1 h-4 w-4" /> Block
            </Button>
          </div>
        )
      }
    ],
    []
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="User governance"
        description="Onboard business and support stakeholders, assign project entitlements, and keep compliance in check."
        actions={
          <Button className="rounded-full" type="button" onClick={() => alert('User onboarding flow coming soon!')}>
            <PlusCircle className="mr-2 h-4 w-4" /> New user
          </Button>
        }
      />
      <DataTable data={users} columns={columns} />
    </div>
  );
};
