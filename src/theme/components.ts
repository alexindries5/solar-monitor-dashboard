import type { Components, Theme } from '@mui/material';

export const components = (theme: Theme): Components => ({
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 600,
      },
      contained: {
        boxShadow: '0px 10px 30px rgba(15, 110, 156, 0.22)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        boxShadow: theme.palette.mode === 'light'
          ? '0 10px 30px rgba(15, 31, 46, 0.06)'
          : '0 10px 30px rgba(0,0,0,0.35)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 14,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: '1px solid',
        borderColor: theme.palette.divider,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        fontWeight: 600,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
  },
});
