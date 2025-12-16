import { useNavigate } from 'react-router-dom';
import { Button, Chip, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataGridToolbar } from '../../components/ui/DataGridToolbar';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { fetchParks } from './parks.api';
import type { Park } from './parks.types';
import { formatNumber } from '../../lib/utils/format';

export const ParksPage = () => {
  const navigate = useNavigate();
  const { data: parks, isLoading } = useQuery<Park[]>({ queryKey: ['parks'], queryFn: fetchParks });

  const columns: GridColDef<Park>[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
    { field: 'location', headerName: 'Location', flex: 1, minWidth: 140 },
    {
      field: 'capacity',
      headerName: 'Capacity (kWp)',
      minWidth: 140,
      valueFormatter: ({ value }) => formatNumber(value, 0),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Online' ? 'success' : params.value === 'Degraded' ? 'warning' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'currentPower',
      headerName: 'Current Power (kW)',
      minWidth: 160,
      valueFormatter: ({ value }) => formatNumber(value, 1),
    },
    {
      field: 'todayEnergy',
      headerName: 'Today Energy (kWh)',
      minWidth: 160,
      valueFormatter: ({ value }) => formatNumber(value, 0),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <Button size="small" onClick={() => navigate(`/parks/${params.row.id}`)}>
          View
        </Button>
      ),
    },
  ];

  if (isLoading) return <LoadingScreen message="Loading parks..." />;

  if (!parks?.length) {
    return <EmptyState title="No parks found" description="Add your first solar park to get started." />;
  }

  return (
    <Stack spacing={2}>
      <PageHeader title="Parks" subtitle="Manage PV sites and monitor production" />
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={parks}
          columns={columns}
          disableRowSelectionOnClick
          onRowClick={(params) => navigate(`/parks/${params.row.id}`)}
          slots={{ toolbar: DataGridToolbar }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </div>
    </Stack>
  );
};
