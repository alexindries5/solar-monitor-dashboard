import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { Role } from './auth.types';

export const RequireRole = ({ roles }: { roles: Role[] }) => {
  const { state } = useAuth();

  if (!state.user) return <Navigate to="/unauthorized" replace />;
  if (!roles.includes(state.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
