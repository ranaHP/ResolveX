import { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { DashboardStats, DistributionDatum, TrendPoint } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/button';
import { ChartTooltipContent } from '../../components/visuals/ChartContainer';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Flame, LifeBuoy, Timer } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/slices/authSlice';

interface DashboardState {
  stats: DashboardStats | null;
  trends: TrendPoint[];
  statusDistribution: DistributionDatum[];
  priorityDistribution: DistributionDatum[];
  loading: boolean;
}

const palette = ['#0e6dff', '#22d3ee', '#fb7185', '#facc15', '#22c55e'];

export const DashboardPage = () => {
  const [state, setState] = useState<DashboardState>({
    stats: null,
    trends: [],
    statusDistribution: [],
    priorityDistribution: [],
    loading: true
  });
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dataService.getDashboard().then((payload) => {
      setState({
        stats: payload.stats,
        trends: payload.trends,
        statusDistribution: Object.entries(payload.statuses).map(([name, value]) => ({ name, value })),
        priorityDistribution: Object.entries(payload.priorities).map(([name, value]) => ({ name, value })),
        loading: false
      });
    });
  }, []);

  return (
    <div className="space-y-10">
      <PageHeader
        title={`Welcome back${user ? `, ${user.name.split(' ')[0]}` : ''}`}
        description="Monitor SLA health, issue velocity, and Jira sync efficiency across your FixMate workspace."
        actions={
          <Button variant="secondary" className="rounded-full px-5">
            Create issue
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={state.stats?.totalProjects ?? '—'}
          description="Active portfolios"
          icon={<BriefcaseBusiness className="h-5 w-5 text-primary-500" />}
        />
        <StatCard
          title="Open Issues"
          value={state.stats?.totalOpenIssues ?? '—'}
          description="Across all projects"
          icon={<LifeBuoy className="h-5 w-5 text-primary-500" />}
          trend="+4.2% vs last week"
          tone="negative"
        />
        <StatCard
          title="Critical Issues"
          value={state.stats?.criticalIssues ?? '—'}
          description="Require immediate attention"
          icon={<Flame className="h-5 w-5 text-rose-500" />}
          trend="-1.1% vs last week"
          tone="positive"
        />
        <StatCard
          title="Overdue"
          value={state.stats?.overdueIssues ?? '—'}
          description="Past SLA targets"
          icon={<Timer className="h-5 w-5 text-amber-500" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Issue growth</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">Weekly new issues opened in the last 12 weeks.</p>
            </div>
            <Button variant="ghost" size="sm">Last 12 weeks</Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={state.trends}>
                  <defs>
                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0e6dff" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#0e6dff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="date" stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="value" stroke="#0e6dff" strokeWidth={2} fill="url(#colorPrimary)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie dataKey="value" data={state.statusDistribution} innerRadius={50} outerRadius={80} paddingAngle={4}>
                      {state.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Priority mix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer>
                  <BarChart data={state.priorityDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                    <XAxis dataKey="name" stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(100,116,139,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}> 
                      {state.priorityDistribution.map((entry, index) => (
                        <Cell key={`priority-${index}`} fill={palette[(index + 1) % palette.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Recent escalations</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track the latest escalations across business, support, and engineering teams.
              </p>
            </div>
            <Button variant="outline" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-gray-400">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="px-4 py-3">Issue</th>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="px-4 py-3">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 dark:divide-gray-800 dark:text-gray-200">
                  {state.loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-4 py-4">
                            <div className="h-3 w-32 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-3 w-20 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-3 w-16 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-3 w-14 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-3 w-24 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-3 w-24 rounded-full bg-gray-200/70 dark:bg-gray-800/70" />
                          </td>
                        </tr>
                      ))
                    : state.statusDistribution.slice(0, 5).map((item, index) => (
                        <tr key={index} className="transition hover:bg-primary-50/40 dark:hover:bg-gray-800/60">
                          <td className="px-4 py-4 font-medium text-gray-900 dark:text-gray-100">FM-{400 + index}</td>
                          <td className="px-4 py-4">Aurora Banking</td>
                          <td className="px-4 py-4">{item.name}</td>
                          <td className="px-4 py-4">Critical</td>
                          <td className="px-4 py-4">2 hours ago</td>
                          <td className="px-4 py-4">Elena Gomez</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
