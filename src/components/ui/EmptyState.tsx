import { Box, Button, Stack, Typography } from '@mui/material';

export type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
};

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <Box sx={{ textAlign: 'center', py: 6 }}>
    <Stack spacing={2} alignItems="center">
      {icon}
      <Typography variant="h6">{title}</Typography>
      {description && (
        <Typography color="text.secondary" maxWidth={360}>
          {description}
        </Typography>
      )}
      {action && (
        <Button variant="contained" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Stack>
  </Box>
);
