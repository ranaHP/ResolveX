import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { Issue } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { CalendarClock, CheckCircle2, Clock, ExternalLink, MessageSquare, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export const IssueDetailPage = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    if (!issueId) return;
    dataService.getIssueById(issueId).then((data) => setIssue(data ?? null));
  }, [issueId]);

  if (!issue) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-gray-500">Loading issue...</div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${issue.title}`}
        description={`Issue ${issue.id} • Linked project ${issue.projectId}`}
        actions={
          <div className="flex items-center gap-3">
            {issue.jiraKey && (
              <Button variant="outline" size="sm" className="rounded-full">
                View Jira <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
            <Button variant="primary" className="rounded-full">
              Update status
            </Button>
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div className="space-y-6 lg:col-span-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">{issue.status}</Badge>
                <Badge variant="danger">{issue.priority} priority</Badge>
                <Badge variant="warning">{issue.criticality} criticality</Badge>
                {issue.jiraKey && <Badge variant="success">Jira {issue.jiraKey}</Badge>}
              </div>
              <p>{issue.description}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/70">
                  <p className="text-xs uppercase tracking-wide text-gray-400">Created by</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{issue.createdBy}</p>
                  <p className="text-xs text-gray-400">{format(new Date(issue.createdAt), 'PPpp')}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/70">
                  <p className="text-xs uppercase tracking-wide text-gray-400">Assigned to</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{issue.assignedTo}</p>
                  <p className="text-xs text-gray-400">ETA {format(new Date(issue.eta ?? issue.updatedAt), 'PP')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3].map((event) => (
                <div key={event} className="flex gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Elena Gomez</p>
                    <p>Added an internal note regarding the expected fix timeline.</p>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              {issue.attachments.length === 0 ? (
                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white/40 px-5 py-6 text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-900/40">
                  <Paperclip className="h-4 w-4" />
                  No attachments uploaded
                </div>
              ) : (
                <ul className="space-y-3 text-sm text-primary-500">
                  {issue.attachments.map((file, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Paperclip className="h-4 w-4" /> {file}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <CalendarClock className="h-4 w-4 text-primary-500" />
                <div>
                  <p>Created {format(new Date(issue.createdAt), 'PPpp')}</p>
                  <span className="text-xs text-gray-400">Initial intake by business</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-amber-500" />
                <div>
                  <p>SLA due {format(new Date(issue.slaDue ?? issue.createdAt), 'PPpp')}</p>
                  <span className="text-xs text-gray-400">4 hours remaining</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <div>
                  <p>Latest update {format(new Date(issue.updatedAt), 'PPpp')}</p>
                  <span className="text-xs text-gray-400">Status changed to {issue.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full rounded-full">
                Request update
              </Button>
              <Button variant="outline" className="w-full rounded-full">
                Adjust priority
              </Button>
              <Button variant="outline" className="w-full rounded-full">
                Set reminder
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
