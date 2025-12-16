import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, Card, CardContent, Chip, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { Bolt, ElectricBolt, ErrorOutline, LightMode } from '@mui/icons-material';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { dashboardStats, energyByDay, powerToday, recentAlerts } from './dashboard.mock';
import { formatNumber } from '../../lib/utils/format';

export const DashboardPage = () => {
  return (
    <Stack spacing={3}>
      <PageHeader title="Dashboard" subtitle="Overview of your solar fleet" />

      <Grid container spacing={2.5}>
        {dashboardStats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <StatCard
              icon={<Bolt />}
              label={stat.label}
              value={`${formatNumber(stat.value, stat.unit === '%' ? 0 : 1)} ${stat.unit}`.trim()}
              delta={stat.delta}
              color={stat.label === 'Active Alerts' ? 'error' : 'success'}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <ChartCard title="Power Today">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={powerToday} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="power" stroke="#00607a" fill="#c2e8f0" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <ChartCard title="Energy by Day (last 7 days)">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={energyByDay}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="energy" fill="#00a7c4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Recent Alerts</Typography>
                <Chip label="Last 24h" size="small" color="warning" />
              </Stack>
              <List>
                {recentAlerts.map((alert) => (
                  <Box key={alert.id}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={alert.message}
                        secondary={
                          <Stack direction="row" spacing={1} alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                            <Typography variant="caption" color="text.secondary">
                              {alert.time}
                            </Typography>
                            <Chip label={alert.severity} size="small" color={alert.severity === 'High' ? 'error' : 'warning'} />
                          </Stack>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <LightMode color="warning" />
                <Box>
                  <Typography variant="h6">Performance snapshot</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ideal conditions ahead with mild temperatures and clear skies.
                  </Typography>
                </Box>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Peak Irradiance
                    </Typography>
                    <Typography variant="h5">980 W/m²</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Expected PR
                    </Typography>
                    <Typography variant="h5">84%</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Available Capacity
                    </Typography>
                    <Typography variant="h5">12.4 MWp</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Availability
                    </Typography>
                    <Typography variant="h5" color="success.main">
                      98.2%
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack direction="row" spacing={2} mt={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ElectricBolt color="primary" />
                  <Typography variant="body2">Grid stable</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ErrorOutline color="warning" />
                  <Typography variant="body2">Low priority maintenance</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};
