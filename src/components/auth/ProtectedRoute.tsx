import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '../../types';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/authSlice';

interface ProtectedRouteProps {
  roles?: Role[];
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { user } = useAppSelector(selectAuth);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};
