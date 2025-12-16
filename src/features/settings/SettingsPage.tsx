import { Box, Card, CardContent, Stack, Switch, Typography } from '@mui/material';
import { PageHeader } from '../../components/ui/PageHeader';
import { useColorScheme } from '../../app/providers/ThemeProvider';

export const SettingsPage = () => {
  const { mode, toggleMode } = useColorScheme();
  return (
    <Box>
      <PageHeader title="Settings" subtitle="Personalize your dashboard experience" />
      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle1">Appearance</Typography>
                <Typography color="text.secondary">Toggle between light and dark themes.</Typography>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">Light</Typography>
                <Switch checked={mode === 'dark'} onChange={toggleMode} />
                <Typography variant="body2">Dark</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Profile</Typography>
            <Typography color="text.secondary">Profile editing will be available soon.</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};
