import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export const LoadingScreen = ({ message = 'Loading...' }: { message?: string }) => (
  <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
    <Stack spacing={2} alignItems="center">
      <CircularProgress />
      <Typography color="text.secondary">{message}</Typography>
    </Stack>
  </Box>
);
