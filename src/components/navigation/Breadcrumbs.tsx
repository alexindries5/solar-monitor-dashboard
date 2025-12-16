import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link component={RouterLink} underline="hover" color="inherit" to="/dashboard">
        Home
      </Link>
      {segments.map((segment, idx) => {
        const to = `/${segments.slice(0, idx + 1).join('/')}`;
        const isLast = idx === segments.length - 1;
        return isLast ? (
          <Typography key={to} color="text.primary" textTransform="capitalize">
            {segment.replace('-', ' ')}
          </Typography>
        ) : (
          <Link key={to} component={RouterLink} underline="hover" color="inherit" to={to} textTransform="capitalize">
            {segment}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};
