import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';

export type ChartCardProps = {
  title: string;
  action?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
};

export const ChartCard = ({ title, action, loading, children }: ChartCardProps) => (
  <Card>
    <CardHeader title={title} action={action} sx={{ pb: 0 }} />
    <CardContent>{loading ? <Skeleton variant="rounded" height={240} /> : children}</CardContent>
  </Card>
);
