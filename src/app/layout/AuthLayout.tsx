import { Outlet } from 'react-router-dom';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { ElectricBolt, LightMode, SolarPower } from '@mui/icons-material';

export const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
      }}
    >
      <Grid container sx={{ flex: 1 }}>
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            alignItems: 'center',
            justifyContent: 'center',
            px: 6,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: (theme) =>
                `radial-gradient(circle at 0% 0%, ${theme.palette.primary.light}33, transparent 55%),
                 radial-gradient(circle at 100% 100%, ${theme.palette.secondary.main}33, transparent 55%)`,
            }}
          />
          <Stack spacing={3} sx={{ position: 'relative', maxWidth: 460 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <SolarPower fontSize="large" />
              <Typography variant="h4">Solar Monitor</Typography>
            </Stack>
            <Typography variant="h6">
              Real‑time visibility into your photovoltaic fleet.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Track performance ratio, availability and active alerts across all
              parks from a single operations console.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip
                icon={<LightMode />}
                label="Irradiance-aware insights"
                color="secondary"
                size="small"
              />
              <Chip
                icon={<ElectricBolt />}
                label="Live grid status"
                color="default"
                size="small"
                variant="outlined"
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, sm: 4 },
            py: { xs: 4, sm: 6 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 420 }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
