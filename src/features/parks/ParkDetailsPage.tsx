import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchPark } from './parks.api';
import { PageHeader } from '../../components/ui/PageHeader';
import { formatDateTime, formatNumber } from '../../lib/utils/format';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { ChartCard } from '../../components/ui/ChartCard';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { powerToday } from '../dashboard/dashboard.mock';

export const ParkDetailsPage = () => {
  const { parkId } = useParams<{ parkId: string }>();
  const { data: park, isLoading } = useQuery({ queryKey: ['park', parkId], queryFn: () => fetchPark(parkId ?? '') });
  const [tab, setTab] = useState(0);

  if (isLoading) return <LoadingScreen message="Loading park details..." />;
  if (!park) return <EmptyState title="Park not found" description="The selected park does not exist." />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title={park.name}
        subtitle={`${park.location} • Last updated ${formatDateTime(park.lastUpdated)}`}
        actions={<Chip label={park.status} color={park.status === 'Online' ? 'success' : park.status === 'Degraded' ? 'warning' : 'default'} />}
      />
      <Grid container spacing={2.5}>
        {[
          { label: 'Capacity', value: `${formatNumber(park.capacity, 0)} kWp` },
          { label: 'Current Power', value: `${formatNumber(park.currentPower, 1)} kW` },
          { label: 'Performance Ratio', value: `${formatNumber(park.performanceRatio * 100, 0)}%` },
          { label: 'Today Energy', value: `${formatNumber(park.todayEnergy, 0)} kWh` },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h5">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
            <Tab label="Overview" />
            <Tab label="Inverters" />
            <Tab label="Strings" />
            <Tab label="Events" />
          </Tabs>
          <Divider sx={{ mb: 2 }} />
          {tab === 0 && (
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={7}>
                <ChartCard title="Power Today">
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={powerToday}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area dataKey="power" type="monotone" stroke="#00607a" fill="#c2e8f0" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                <Typography color="text.secondary" paragraph>
                  Production is on track today with healthy irradiance and minimal curtailment. Performance ratio is trending
                  above target.
                </Typography>
                <Typography variant="body2">Maintenance</Typography>
                <Typography color="text.secondary" paragraph>
                  Next preventive maintenance scheduled in 12 days.
                </Typography>
              </Grid>
            </Grid>
          )}
          {tab === 1 && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Inverters
              </Typography>
              <Typography color="text.secondary">Detailed inverter table coming soon.</Typography>
            </Box>
          )}
          {tab === 2 && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Strings
              </Typography>
              <Typography color="text.secondary">String-level analytics placeholder.</Typography>
            </Box>
          )}
          {tab === 3 && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Events / Alerts
              </Typography>
              <Typography color="text.secondary">Recent park events will be displayed here.</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};
