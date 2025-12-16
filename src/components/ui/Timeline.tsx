import { CheckCircle, Pending, Schedule, WarningAmber } from '@mui/icons-material';
import { Avatar, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

export type TimelineItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  status?: 'scheduled' | 'in-progress' | 'completed' | 'blocked';
};

const statusIcon = {
  scheduled: <Schedule fontSize="small" />,
  'in-progress': <Pending fontSize="small" />,
  completed: <CheckCircle fontSize="small" />,
  blocked: <WarningAmber fontSize="small" />,
};

const statusColor = {
  scheduled: 'info.main',
  'in-progress': 'warning.main',
  completed: 'success.main',
  blocked: 'error.main',
} as const;

export type TimelineProps = {
  title: string;
  items: TimelineItem[];
};

export const Timeline = ({ title, items }: TimelineProps) => (
  <Card>
    <CardContent>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <Stack spacing={2} divider={<Divider flexItem />}>
        {items.map((item) => (
          <Stack key={item.id} direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              sx={{
                bgcolor: statusColor[item.status ?? 'scheduled'],
                width: 32,
                height: 32,
              }}
            >
              {statusIcon[item.status ?? 'scheduled']}
            </Avatar>
            <Stack spacing={0.5} flex={1}>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.date}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </CardContent>
  </Card>
);
