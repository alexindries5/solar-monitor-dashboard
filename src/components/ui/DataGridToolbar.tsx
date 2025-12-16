import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Stack } from '@mui/material';

export const DataGridToolbar = ({ actions }: { actions?: React.ReactNode }) => (
  <GridToolbarContainer>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" width="100%">
      <GridToolbarQuickFilter placeholder="Search" />
      {actions}
    </Stack>
  </GridToolbarContainer>
);
