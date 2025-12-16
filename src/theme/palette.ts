import type { PaletteMode, PaletteOptions } from '@mui/material';

export const getPalette = (mode: PaletteMode): PaletteOptions => {
  const isLight = mode === 'light';
  return {
    mode,
    primary: {
      main: '#00607a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00a7c4',
    },
    background: {
      default: isLight ? '#f4f6f8' : '#0b141a',
      paper: isLight ? '#ffffff' : '#101921',
    },
    text: {
      primary: isLight ? '#0b1b2b' : '#e3e8ef',
      secondary: isLight ? '#52616b' : '#a8b3c1',
    },
    divider: isLight ? 'rgba(2, 42, 68, 0.1)' : 'rgba(255,255,255,0.12)',
    success: {
      main: '#20c997',
    },
    warning: {
      main: '#ffb020',
    },
    error: {
      main: '#f04438',
    },
    info: {
      main: '#2d8eff',
    },
  };
};
