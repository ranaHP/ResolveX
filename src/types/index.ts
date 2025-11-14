export type Role =
  | 'ADMIN'
  | 'ADMIN_MANAGER'
  | 'PROJECT_BIZ_USER'
  | 'PROJECT_MANAGER'
  | 'PROJECT_SUPPORT';

export type IssueStatus =
  | 'New'
  | 'Support Review'
  | 'In Progress'
  | 'Pending'
  | 'Fixed'
  | 'Done'
  | 'De-prioritized'
  | 'Waiting for developer feedback'
  | 'Business Accepted'
  | 'Need More Info';

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type Criticality = 'Critical' | 'High' | 'Medium' | 'Low';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  projects: string[];
  status: 'Active' | 'Blocked';
}

export interface Project {
  id: string;
  name: string;
  code: string;
  status: 'Active' | 'On Hold' | 'Closed';
  description: string;
  managers: string[];
  bizUsers: string[];
  supportUsers: string[];
  openIssues: number;
  closedIssues: number;
  slaHealth: 'Excellent' | 'Healthy' | 'At Risk' | 'Critical';
  components: string[];
}

export interface Issue {
  id: string;
  title: string;
  projectId: string;
  status: IssueStatus;
  priority: Priority;
  criticality: Criticality;
  component: string;
  createdBy: string;
  assignedTo: string | null;
  jiraKey?: string;
  createdAt: string;
  updatedAt: string;
  eta?: string;
  slaDue?: string;
  description: string;
  notes?: string;
  attachments: string[];
  reminders?: string[];
}

export interface LoginPayload {
  username: string;
  password: string;
  remember: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  totalProjects: number;
  totalOpenIssues: number;
  criticalIssues: number;
  overdueIssues: number;
  assignedToMe: number;
  createdByMe: number;
}

export interface TrendPoint {
  date: string;
  value: number;
}

export interface DistributionDatum {
  name: string;
  value: number;
}

export interface IssueFilterState {
  search: string;
  projectIds: string[];
  statuses: IssueStatus[];
  priorities: Priority[];
  assignees: string[];
  createdBy: string[];
  components: string[];
  dateRange: [string | null, string | null];
}

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  components: string[];
}

export interface JiraIssuePayload {
  issueId: string;
  jiraProjectId: string;
  component: string;
  labels: string[];
}
