import { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { Project } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Gauge, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const slaVariant: Record<Project['slaHealth'], 'success' | 'default' | 'warning' | 'danger'> = {
  Excellent: 'success',
  Healthy: 'default',
  'At Risk': 'warning',
  Critical: 'danger'
};

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    dataService.getProjects().then(setProjects);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects portfolio"
        description="Launch governance, SLA presets, and team roles across every transformation program."
        actions={
          <Button className="rounded-full" type="button" onClick={() => alert('Project creation wizard coming soon!')}>
            <PlusCircle className="mr-2 h-4 w-4" /> New project
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-xs uppercase tracking-wide text-gray-400">{project.code}</p>
                </div>
                <Badge variant={slaVariant[project.slaHealth]}>{project.slaHealth}</Badge>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-500 dark:text-gray-300">
                <p>{project.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl bg-primary-50/80 p-4 text-primary-600">
                    <p className="font-semibold text-lg">{project.openIssues}</p>
                    <p className="text-[11px] uppercase tracking-widest">Open</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50/80 p-4 text-emerald-600">
                    <p className="font-semibold text-lg">{project.closedIssues}</p>
                    <p className="text-[11px] uppercase tracking-widest">Resolved</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Gauge className="h-4 w-4" />
                  {project.components.length} components, {project.supportUsers.length} support leads
                </div>
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => navigate(`/app/projects/${project.id}`)}
                  type="button"
                >
                  View project
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
