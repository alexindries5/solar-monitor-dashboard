import { useMemo } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from '../../features/auth/AuthContext';
import { useAppTheme } from '../../theme/useAppTheme';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <ThemeProvider>
      <ThemedProviders client={queryClient}>{children}</ThemedProviders>
    </ThemeProvider>
  );
};

const ThemedProviders = ({ children, client }: { children: React.ReactNode; client: QueryClient }) => {
  const { theme } = useAppTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <QueryClientProvider client={client}>
          <AuthProvider>{children}</AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};
