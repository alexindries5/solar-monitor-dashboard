import { Skeleton, Stack } from '@mui/material';

export const CardSkeleton = () => (
  <Stack spacing={1}>
    <Skeleton variant="text" width={120} />
    <Skeleton variant="rounded" height={120} />
  </Stack>
);
