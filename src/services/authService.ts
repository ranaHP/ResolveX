import { AuthResponse, LoginPayload, Role, User } from '../types';
import { mockData } from './mockData';

const roleMap: Record<string, Role> = {
  admin: 'ADMIN',
  manager: 'PROJECT_MANAGER',
  biz: 'PROJECT_BIZ_USER',
  support: 'PROJECT_SUPPORT',
  super: 'ADMIN_MANAGER'
};

const storageKey = 'fixmate-auth';

const persistAuth = (data: AuthResponse | null) => {
  if (typeof window === 'undefined') return;
  if (data) {
    window.localStorage.setItem(storageKey, JSON.stringify(data));
  } else {
    window.localStorage.removeItem(storageKey);
  }
};

const readAuth = (): AuthResponse | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthResponse;
  } catch (error) {
    return null;
  }
};

export const authService = {
  async login({ username, password, remember }: LoginPayload): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!password || password.length < 4) {
      throw new Error('Invalid credentials');
    }

    const roleKey = username.split('@')[0] ?? 'biz';
    const role = roleMap[roleKey as keyof typeof roleMap] ?? 'PROJECT_BIZ_USER';

    const user: User =
      mockData.users.find((item) => item.email === username) ??
      mockData.users.find((item) => item.role === role) ?? {
        id: 'u-temp',
        name: 'Guest User',
        email: username,
        role,
        projects: mockData.projects.map((project) => project.id),
        status: 'Active'
      };

    const auth: AuthResponse = {
      token: `token-${Date.now()}`,
      user
    };

    if (remember) {
      persistAuth(auth);
    }

    return auth;
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    persistAuth(null);
  },

  restoreSession(): AuthResponse | null {
    return readAuth();
  }
};
