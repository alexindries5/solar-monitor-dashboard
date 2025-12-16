import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you are looking for does not exist.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Go Home
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Stack>
    </Box>
  );
};
