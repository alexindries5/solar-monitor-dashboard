import { AssignmentInd, BuildCircle, Engineering, Inventory2 } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Timeline } from '../../components/ui/Timeline';
import { DataGridToolbar } from '../../components/ui/DataGridToolbar';
import { maintenanceTimeline, spareStock, workOrders } from './maintenance.mock';

const workOrderColumns: GridColDef[] = [
  { field: 'site', headerName: 'Site', flex: 1 },
  { field: 'priority', headerName: 'Priority', flex: 0.8 },
  { field: 'assignee', headerName: 'Assignee', flex: 1 },
  { field: 'dueDate', headerName: 'Due date', flex: 0.8 },
  { field: 'status', headerName: 'Status', flex: 0.8 },
];

export const MaintenancePage = () => (
  <Stack spacing={3}>
    <PageHeader
      title="Maintenance"
      subtitle="Stay ahead of preventive tasks and work orders"
      actions={<Chip label="SLA 2h" color="warning" />}
    />

    <Grid container spacing={2.5}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<BuildCircle />} label="Open tasks" value="18" delta="+3 vs last week" color="error" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<AssignmentInd />} label="Assigned" value="12" delta="7 in progress" color="success" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<Engineering />} label="Technicians" value="6 on-shift" delta="+1" color="success" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<Inventory2 />} label="Critical spares" value="4 low" delta="Action required" color="error" />
      </Grid>
    </Grid>

    <Grid container spacing={2.5}>
      <Grid item xs={12} md={7}>
        <Timeline title="Work order timeline" items={maintenanceTimeline} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
              <Inventory2 color="primary" />
              <Typography variant="h6">Spare stock snapshot</Typography>
            </Stack>
            <Stack spacing={2}>
              {spareStock.map((item) => (
                <Box key={item.label}>
                  <Stack direction="row" justifyContent="space-between" mb={0.5}>
                    <Typography variant="subtitle2">{item.label}</Typography>
                    <Chip
                      size="small"
                      label={item.status}
                      color={item.status === 'Critical' ? 'error' : item.status === 'Reorder recommended' ? 'warning' : 'success'}
                    />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(100, (item.quantity / 50) * 100)}
                    sx={{ height: 8, borderRadius: 999 }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Engineering color="secondary" />
            <Typography variant="h6">Active work orders</Typography>
          </Stack>
          <Chip label="Auto-assign enabled" color="success" size="small" />
        </Stack>
        <DataGrid
          autoHeight
          rows={workOrders}
          columns={workOrderColumns}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          slots={{ toolbar: DataGridToolbar }}
          slotProps={{ toolbar: { actions: <Chip label="Sync CMMS" size="small" /> } }}
        />
      </CardContent>
    </Card>
  </Stack>
);
