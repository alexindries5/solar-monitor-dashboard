import { useMemo, useState } from 'react';
import { Stack, MenuItem, TextField, Chip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { PageHeader } from '../../components/ui/PageHeader';
import { alerts } from './alerts.mock';
import { formatDateTime } from '../../lib/utils/format';

export const AlertsPage = () => {
  const [severity, setSeverity] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(
    () =>
      alerts.filter(
        (alert) => (severity === 'All' || alert.severity === severity) && (status === 'All' || alert.status === status),
      ),
    [severity, status],
  );

  const columns: GridColDef<typeof alerts[number]>[] = [
    { field: 'message', headerName: 'Message', flex: 1, minWidth: 220 },
    { field: 'park', headerName: 'Park', minWidth: 160 },
    {
      field: 'severity',
      headerName: 'Severity',
      minWidth: 120,
      renderCell: (params) => <Chip label={params.value} color={params.value === 'High' ? 'error' : params.value === 'Medium' ? 'warning' : 'default'} size="small" />,
    },
    { field: 'status', headerName: 'Status', minWidth: 140, renderCell: (params) => <Chip label={params.value} size="small" /> },
    {
      field: 'createdAt',
      headerName: 'Created',
      minWidth: 180,
      valueFormatter: ({ value }) => formatDateTime(value),
    },
  ];

  return (
    <Stack spacing={2}>
      <PageHeader title="Alerts" subtitle="Live events across all parks" />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField select label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)} sx={{ width: 160 }}>
          {['All', 'High', 'Medium', 'Low'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ width: 180 }}>
          {['All', 'Open', 'Investigating', 'Acknowledged'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <div style={{ height: 520, width: '100%' }}>
        <DataGrid rows={filtered} columns={columns} disableRowSelectionOnClick />
      </div>
    </Stack>
  );
};
