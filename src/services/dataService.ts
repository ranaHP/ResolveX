import { mockData } from './mockData';
import { DashboardStats, Issue, JiraIssuePayload, JiraProject, Project, TrendPoint, User } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dataService = {
  async getDashboard(): Promise<{ stats: DashboardStats; trends: TrendPoint[]; statuses: Record<string, number>; priorities: Record<string, number> }> {
    await delay(400);
    const statusDistribution = mockData.issues.reduce<Record<string, number>>((acc, issue) => {
      acc[issue.status] = (acc[issue.status] ?? 0) + 1;
      return acc;
    }, {});

    const priorityDistribution = mockData.issues.reduce<Record<string, number>>((acc, issue) => {
      acc[issue.priority] = (acc[issue.priority] ?? 0) + 1;
      return acc;
    }, {});

    return {
      stats: mockData.dashboardStats,
      trends: mockData.trends,
      statuses: statusDistribution,
      priorities: priorityDistribution
    };
  },

  async getIssues(): Promise<Issue[]> {
    await delay(300);
    return mockData.issues;
  },

  async getIssueById(id: string): Promise<Issue | undefined> {
    await delay(250);
    return mockData.issues.find((issue) => issue.id === id);
  },

  async getProjects(): Promise<Project[]> {
    await delay(300);
    return mockData.projects;
  },

  async getProjectById(id: string): Promise<Project | undefined> {
    await delay(250);
    return mockData.projects.find((project) => project.id === id);
  },

  async getUsers(): Promise<User[]> {
    await delay(250);
    return mockData.users;
  },

  async getJiraProjects(): Promise<JiraProject[]> {
    await delay(300);
    return mockData.jiraProjects;
  },

  async createJiraTicket(payload: JiraIssuePayload): Promise<{ success: boolean; key: string }> {
    await delay(500);
    return {
      success: true,
      key: `${payload.jiraProjectId.toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`
    };
  }
};
