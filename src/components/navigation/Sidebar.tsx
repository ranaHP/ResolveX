import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
  LucideIcon,
  LayoutDashboard,
  FolderKanban,
  Users,
  LifeBuoy,
  Settings,
  Layers,
  BriefcaseBusiness,
  BarChart4
} from 'lucide-react';
import { Role } from '../../types';

export interface NavigationItem {
  label: string;
  to: string;
  icon: LucideIcon;
  roles?: Role[];
}

const navItems: NavigationItem[] = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Issues', to: '/app/issues', icon: LifeBuoy },
  { label: 'Projects', to: '/app/projects', icon: FolderKanban, roles: ['ADMIN', 'ADMIN_MANAGER', 'PROJECT_MANAGER'] },
  { label: 'Users', to: '/app/users', icon: Users, roles: ['ADMIN', 'ADMIN_MANAGER'] },
  { label: 'My Work', to: '/app/my-work', icon: BriefcaseBusiness },
  { label: 'Reports', to: '/app/reports', icon: BarChart4 },
  { label: 'Jira Sync', to: '/app/jira', icon: Layers, roles: ['PROJECT_SUPPORT', 'PROJECT_MANAGER', 'ADMIN', 'ADMIN_MANAGER'] },
  { label: 'Settings', to: '/app/settings', icon: Settings, roles: ['ADMIN', 'ADMIN_MANAGER'] }
];

interface SidebarProps {
  role: Role | null;
  collapsed: boolean;
  isMobile?: boolean;
}

export const Sidebar = ({ role, collapsed, isMobile = false }: SidebarProps) => (
  <motion.aside
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className={cn(
      'group flex w-72 flex-col border-r border-gray-100 bg-white/80 px-6 py-8 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80',
      !isMobile && 'fixed inset-y-0 left-0 z-40 hidden xl:flex',
      collapsed && !isMobile && 'w-20 px-4'
    )}
  >
    <div className="mb-10 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-lg shadow-primary-500/20">
        <LifeBuoy className="h-6 w-6" />
      </div>
      {!collapsed && (
        <div>
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary-500">ResolveX</span>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">FixMate</h2>
        </div>
      )}
    </div>
    <nav className="space-y-2">
      {navItems
        .filter((item) => !item.roles || (role && item.roles.includes(role)))
        .map((item) => (
          <Fragment key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                  'text-gray-500 hover:text-gray-900 hover:bg-primary-50/70 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800',
                  isActive && 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          </Fragment>
        ))}
    </nav>
    <div className="mt-auto pt-10 text-xs text-gray-400">Developed by Hansana Ranaweera</div>
  </motion.aside>
);
