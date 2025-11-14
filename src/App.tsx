import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { IssuesListPage } from './pages/issues/IssuesListPage';
import { IssueDetailPage } from './pages/issues/IssueDetailPage';
import { IssueCreatePage } from './pages/issues/IssueCreatePage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { ProjectDetailPage } from './pages/projects/ProjectDetailPage';
import { UsersPage } from './pages/users/UsersPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { MyWorkPage } from './pages/mywork/MyWorkPage';
import { JiraPage } from './pages/jira/JiraPage';
import { AccessDeniedPage } from './pages/errors/AccessDeniedPage';
import { useAppDispatch } from './store/hooks';
import { authService } from './services/authService';
import { setToken, setUser } from './store/slices/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = authService.restoreSession();
    if (auth) {
      dispatch(setUser(auth.user));
      dispatch(setToken(auth.token));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="access-denied" element={<AccessDeniedPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="app">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="issues">
              <Route index element={<IssuesListPage />} />
              <Route path="new" element={<IssueCreatePage />} />
              <Route path=":issueId" element={<IssueDetailPage />} />
            </Route>
            <Route path="projects" element={<ProtectedRoute roles={['ADMIN', 'ADMIN_MANAGER', 'PROJECT_MANAGER']} />}>
              <Route index element={<ProjectsPage />} />
              <Route path=":projectId" element={<ProjectDetailPage />} />
            </Route>
            <Route path="users" element={<ProtectedRoute roles={['ADMIN', 'ADMIN_MANAGER']} />}>
              <Route index element={<UsersPage />} />
            </Route>
            <Route path="settings" element={<ProtectedRoute roles={['ADMIN', 'ADMIN_MANAGER']} />}>
              <Route index element={<SettingsPage />} />
            </Route>
            <Route path="my-work" element={<MyWorkPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="jira" element={<ProtectedRoute roles={['PROJECT_SUPPORT', 'PROJECT_MANAGER', 'ADMIN', 'ADMIN_MANAGER']} />}>
              <Route index element={<JiraPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
