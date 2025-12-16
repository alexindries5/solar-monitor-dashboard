import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Topbar } from '../../components/navigation/Topbar';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';

export const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 9 }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ pb: 6 }}>
          <Breadcrumbs />
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
