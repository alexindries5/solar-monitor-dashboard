import { Assessment, CloudDownload, Insights, Layers, PictureAsPdf } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { ChartCard } from '../../components/ui/ChartCard';
import { InfoBanner } from '../../components/ui/InfoBanner';
import { DataGridToolbar } from '../../components/ui/DataGridToolbar';
import { formatNumber } from '../../lib/utils/format';
import { monthlyProduction, reportStats, reportsTableRows } from './reports.mock';

const columns: GridColDef[] = [
  { field: 'period', headerName: 'Period', flex: 1 },
  { field: 'energyMwh', headerName: 'Energy (MWh)', flex: 1, valueFormatter: ({ value }) => `${formatNumber(value, 0)} MWh` },
  { field: 'uptime', headerName: 'Uptime', flex: 0.8, valueFormatter: ({ value }) => `${value}%` },
  { field: 'pr', headerName: 'Performance Ratio', flex: 1, valueFormatter: ({ value }) => `${value}%` },
  {
    field: 'revenue',
    headerName: 'Revenue',
    flex: 1,
    valueFormatter: ({ value }) => `$${formatNumber(value / 1000, 1)}k`,
  },
  { field: 'alarms', headerName: 'Alarms', flex: 0.6 },
];

export const ReportsPage = () => {
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Reports"
        subtitle="Analytical exports and quarter-over-quarter insights"
        actions={
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="outlined" startIcon={<Assessment />}>
              Create custom report
            </Button>
            <Button variant="contained" startIcon={<CloudDownload />} color="secondary">
              Export latest
            </Button>
          </Stack>
        }
      />

      <Grid container spacing={2.5}>
        {reportStats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <StatCard icon={stat.icon} label={stat.label} value={stat.value} delta={stat.delta} color="success" />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <ChartCard title="Production vs Revenue">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlyProduction} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="energy"
                  name="Energy (MWh)"
                  stroke={theme.palette.primary.main}
                  fill={theme.palette.primary.light}
                  fillOpacity={0.25}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue ($k)"
                  stroke={theme.palette.secondary.main}
                  fill={theme.palette.secondary.light}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <InfoBanner
            icon={<Insights />}
            title="Board-ready PDF"
            description="Download a polished executive summary with portfolio yield, performance ratio, and availability trends."
            actionLabel="Download PDF"
            onAction={() => {}}
            tone="success"
          />
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={1.5}>
                <PictureAsPdf color="secondary" />
                <Box>
                  <Typography variant="h6">Last export</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Delivered to leadership inbox yesterday at 09:12
                  </Typography>
                </Box>
              </Stack>
              <Stack spacing={1}>
                <Chip label="Q2 2024" color="secondary" size="small" />
                <Typography variant="body2" color="text.secondary">
                  Includes sections for PR breakdown, loss tree, weather-adjusted performance, and alarm response times.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Layers color="primary" />
              <Typography variant="h6">Quarterly performance</Typography>
            </Stack>
            <Chip label="Benchmarking enabled" color="success" size="small" />
          </Stack>
          <DataGrid
            autoHeight
            rows={reportsTableRows}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
            slots={{ toolbar: DataGridToolbar }}
            slotProps={{ toolbar: { actions: <Button size="small">Export CSV</Button> } }}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};
