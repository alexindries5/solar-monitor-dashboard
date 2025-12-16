import type React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Notifications,
  Search,
} from '@mui/icons-material';
import { useState } from 'react';
import { useColorScheme } from '../../app/providers/ThemeProvider';
import { useAuth } from '../../features/auth/useAuth';

export const Topbar = () => {
  const { toggleMode, mode } = useColorScheme();
  const { state, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: 72 }}>
        <TextField
          placeholder="Search parks, assets..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 360 }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={toggleMode} color="primary">
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <IconButton>
          <Badge variant="dot" color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={handleMenu}
            sx={{ cursor: 'pointer' }}
          >
            <Avatar sx={{ width: 36, height: 36 }}>
              {state.user?.name.charAt(0) ?? 'U'}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">
                {state.user?.name ?? 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {state.user?.role ?? 'Guest'}
              </Typography>
            </Box>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            keepMounted
          >
            <MenuItem disabled>{state.user?.email}</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
