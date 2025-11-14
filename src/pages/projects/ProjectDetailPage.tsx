import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { Project } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { Users, Wrench, ShieldCheck } from 'lucide-react';

export const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!projectId) return;
    dataService.getProjectById(projectId).then((payload) => setProject(payload ?? null));
  }, [projectId]);

  if (!project) {
    return <div className="text-sm text-gray-500">Loading project...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={project.name}
        description={`Project code ${project.code} • ${project.components.length} components • ${project.openIssues} open issues`}
        actions={
          <Button variant="secondary" className="rounded-full">
            Edit project
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div className="space-y-6 lg:col-span-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-3 text-xs">
                <Badge variant="outline">Status: {project.status}</Badge>
                <Badge variant="success">Managers: {project.managers.length}</Badge>
                <Badge variant="warning">Biz users: {project.bizUsers.length}</Badge>
                <Badge variant="default">Support leads: {project.supportUsers.length}</Badge>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Components</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.components.map((component) => (
                    <span key={component} className="rounded-full bg-primary-50 px-4 py-1 text-xs text-primary-600">
                      {component}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team & roles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white/70 p-5 dark:border-gray-800 dark:bg-gray-900/70">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Business stakeholders</p>
                    <p className="text-xs text-gray-400">{project.bizUsers.length} assigned</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white/70 p-5 dark:border-gray-800 dark:bg-gray-900/70">
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Support engineering</p>
                    <p className="text-xs text-gray-400">{project.supportUsers.length} specialists</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white/70 p-5 dark:border-gray-800 dark:bg-gray-900/70">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">SLA posture</p>
                    <p className="text-xs text-gray-400">{project.slaHealth}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div className="space-y-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Project quick actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full rounded-full">
                Assign team members
              </Button>
              <Button variant="outline" className="w-full rounded-full">
                Configure SLAs
              </Button>
              <Button variant="outline" className="w-full rounded-full">
                Manage Jira mapping
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
