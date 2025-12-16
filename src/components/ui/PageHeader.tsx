import { Box, Stack, Typography } from '@mui/material';

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => (
  <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} justifyContent="space-between" spacing={1.5} mb={3}>
    <Box>
      <Typography variant="h4" gutterBottom>{title}</Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
    {actions}
  </Stack>
);
