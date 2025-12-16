import React, { useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  SpaceDashboard,
  SolarPower,
  Bolt,
  Warning,
  Settings,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import type { Role } from '../../features/auth/auth.types';
import { useAuth } from '../../features/auth/useAuth';

const drawerWidth = 260;

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles?: Role[];
};

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <SpaceDashboard /> },
  { label: 'Parks', path: '/parks', icon: <SolarPower /> },
  { label: 'Inverters', path: '/inverters', icon: <Bolt /> },
  { label: 'Alerts', path: '/alerts', icon: <Warning /> },
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings />,
    roles: ['Admin', 'Manager'],
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { state } = useAuth();

  const renderItem = (item: NavItem) => {
    if (item.roles && (!state.user || !item.roles.includes(state.user.role)))
      return null;
    return (
      <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          component={NavLink}
          to={item.path}
          sx={{
            borderRadius: 1.5,
            mx: 1,
            '&.active': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
          {!collapsed && <ListItemText primary={item.label} />}
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: collapsed ? 80 : drawerWidth,
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.drawer,
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : drawerWidth,
          boxSizing: 'border-box',
          p: 1,
          zIndex: (theme) => theme.zIndex.drawer,
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
        }}
      >
        {!collapsed && (
          <Stack spacing={0.2}>
            <Typography variant="h6">Solar Monitor</Typography>
            <Typography variant="caption" color="text.secondary">
              Premium Dashboard
            </Typography>
          </Stack>
        )}
        <IconButton onClick={() => setCollapsed((prev) => !prev)} size="small">
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        <List>{navItems.map(renderItem)}</List>
      </Box>
    </Drawer>
  );
};
