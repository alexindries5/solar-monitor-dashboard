import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { DashboardLayout } from '../layout/DashboardLayout';
import { LoginPage } from '../../features/auth/LoginPage';
import { DashboardPage } from '../../features/dashboard/DashboardPage';
import { ParksPage } from '../../features/parks/ParksPage';
import { ParkDetailsPage } from '../../features/parks/ParkDetailsPage';
import { InvertersPage } from '../../features/inverters/InvertersPage';
import { AlertsPage } from '../../features/alerts/AlertsPage';
import { SettingsPage } from '../../features/settings/SettingsPage';
import { RequireAuth } from '../../features/auth/RequireAuth';
import { RequireRole } from '../../features/auth/RequireRole';
import { NotFoundPage } from './NotFoundPage';
import { UnauthorizedPage } from './UnauthorizedPage';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/parks" element={<ParksPage />} />
          <Route path="/parks/:parkId" element={<ParkDetailsPage />} />
          <Route path="/inverters" element={<InvertersPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route element={<RequireRole roles={['Admin', 'Manager']} />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
