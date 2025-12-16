import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

export type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: string;
  color?: 'default' | 'success' | 'error';
};

export const StatCard = ({ icon, label, value, delta, color = 'default' }: StatCardProps) => (
  <Card>
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
          }}
        >
          {icon}
        </Box>
        <Box flex={1}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        {delta && <Chip label={delta} color={color === 'default' ? 'default' : color} size="small" />}
      </Stack>
    </CardContent>
  </Card>
);
