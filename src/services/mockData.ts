import { DashboardStats, Issue, JiraProject, Project, TrendPoint, User } from '../types';
import { addDays, formatISO, subDays } from 'date-fns';

const now = new Date();

const users: User[] = [
  {
    id: 'u1',
    name: 'Ava Patel',
    email: 'ava@fixmate.io',
    role: 'ADMIN_MANAGER',
    avatar: 'https://i.pravatar.cc/150?img=1',
    projects: ['p1', 'p2'],
    status: 'Active'
  },
  {
    id: 'u2',
    name: 'Marcus Lee',
    email: 'marcus@fixmate.io',
    role: 'PROJECT_MANAGER',
    avatar: 'https://i.pravatar.cc/150?img=2',
    projects: ['p1'],
    status: 'Active'
  },
  {
    id: 'u3',
    name: 'Elena Gomez',
    email: 'elena@fixmate.io',
    role: 'PROJECT_SUPPORT',
    avatar: 'https://i.pravatar.cc/150?img=3',
    projects: ['p1'],
    status: 'Active'
  },
  {
    id: 'u4',
    name: 'Noah Chen',
    email: 'noah@fixmate.io',
    role: 'PROJECT_BIZ_USER',
    avatar: 'https://i.pravatar.cc/150?img=4',
    projects: ['p1'],
    status: 'Active'
  },
  {
    id: 'u5',
    name: 'Sophia Martinez',
    email: 'sophia@fixmate.io',
    role: 'PROJECT_SUPPORT',
    avatar: 'https://i.pravatar.cc/150?img=5',
    projects: ['p2'],
    status: 'Active'
  }
];

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Aurora Banking',
    code: 'AUR',
    status: 'Active',
    description: 'Digital banking experience modernization for enterprise customers.',
    managers: ['u2'],
    bizUsers: ['u4'],
    supportUsers: ['u3'],
    openIssues: 24,
    closedIssues: 112,
    slaHealth: 'Healthy',
    components: ['Payments', 'Authentication', 'Notifications']
  },
  {
    id: 'p2',
    name: 'Nova Commerce',
    code: 'NOV',
    status: 'Active',
    description: 'E-commerce storefront platform supporting multi-tenant deployments.',
    managers: ['u1'],
    bizUsers: [],
    supportUsers: ['u5'],
    openIssues: 12,
    closedIssues: 89,
    slaHealth: 'At Risk',
    components: ['Catalog', 'Checkout', 'Analytics']
  }
];

const issues: Issue[] = Array.from({ length: 18 }).map((_, index) => {
  const project = projects[index % projects.length];
  const createdAt = subDays(now, index * 2);
  const updatedAt = addDays(createdAt, index % 5);
  const priorities = ['Critical', 'High', 'Medium', 'Low'] as const;
  const statuses = [
    'New',
    'Support Review',
    'In Progress',
    'Pending',
    'Fixed',
    'Done',
    'De-prioritized',
    'Waiting for developer feedback'
  ] as const;
  return {
    id: `FM-${1000 + index}`,
    title: `Issue #${index + 1} impacting ${project.name}`,
    projectId: project.id,
    status: statuses[index % statuses.length],
    priority: priorities[index % priorities.length],
    criticality: priorities[(index + 1) % priorities.length],
    component: project.components[index % project.components.length],
    createdBy: users[(index + 1) % users.length].id,
    assignedTo: users[(index + 2) % users.length].id,
    jiraKey: index % 3 === 0 ? `AUR-${300 + index}` : undefined,
    createdAt: formatISO(createdAt),
    updatedAt: formatISO(updatedAt),
    eta: formatISO(addDays(updatedAt, 5)),
    slaDue: formatISO(addDays(createdAt, 7)),
    description:
      'Detailed context of the issue including business impact, reproduction steps, and screenshots.',
    attachments: [],
    notes: 'Business requesting expedited support.',
    reminders: []
  };
});

const dashboardStats: DashboardStats = {
  totalProjects: projects.length,
  totalOpenIssues: issues.filter((issue) => issue.status !== 'Done' && issue.status !== 'Fixed').length,
  criticalIssues: issues.filter((issue) => issue.priority === 'Critical').length,
  overdueIssues: issues.filter((issue) => new Date(issue.slaDue ?? now) < now).length,
  assignedToMe: 5,
  createdByMe: 8
};

const trends: TrendPoint[] = Array.from({ length: 12 }).map((_, i) => ({
  date: formatISO(subDays(now, (11 - i) * 7), { representation: 'date' }),
  value: Math.floor(Math.random() * 40) + 10
}));

const jiraProjects: JiraProject[] = [
  {
    id: 'jira-1',
    key: 'AUR',
    name: 'Aurora Banking',
    components: ['Payments', 'Authentication', 'Notifications']
  },
  {
    id: 'jira-2',
    key: 'NOV',
    name: 'Nova Commerce',
    components: ['Catalog', 'Checkout', 'Analytics']
  }
];

export const mockData = {
  users,
  projects,
  issues,
  dashboardStats,
  trends,
  jiraProjects
};
