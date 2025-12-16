import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routes/router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useAppTheme } from '../theme/useAppTheme';

export const App = () => {
  const { theme } = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </ThemeProvider>
  );
};
