import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h3" gutterBottom>
        Unauthorized
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        You do not have permission to access this page.
      </Typography>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Box>
  );
};
