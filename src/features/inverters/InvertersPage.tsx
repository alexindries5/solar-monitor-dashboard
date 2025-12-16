import { Box, Card, CardContent, Typography } from '@mui/material';
import { PageHeader } from '../../components/ui/PageHeader';

export const InvertersPage = () => (
  <Box>
    <PageHeader title="Inverters" subtitle="Inventory of inverters across parks" />
    <Card>
      <CardContent>
        <Typography color="text.secondary">Inverter list and filters will be added here.</Typography>
      </CardContent>
    </Card>
  </Box>
);
