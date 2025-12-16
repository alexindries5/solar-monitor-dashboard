import type { PaletteMode, PaletteOptions } from '@mui/material';

export const getPalette = (mode: PaletteMode): PaletteOptions => {
  const isLight = mode === 'light';
  return {
    mode,
    primary: {
      main: '#0f6e9c',
      light: '#4fa3ca',
      dark: '#0a4d72',
      contrastText: '#f7fbff',
    },
    secondary: {
      main: '#845ef7',
      light: '#b197fc',
      dark: '#5f3dc4',
      contrastText: '#f7f5ff',
    },
    background: {
      default: isLight ? '#f5f7fb' : '#0b1021',
      paper: isLight ? '#ffffff' : '#0f172a',
    },
    text: {
      primary: isLight ? '#0f172a' : '#e2e8f0',
      secondary: isLight ? '#475467' : '#cbd5e1',
    },
    divider: isLight ? 'rgba(16, 24, 40, 0.12)' : 'rgba(255,255,255,0.08)',
    success: {
      main: '#22c55e',
    },
    warning: {
      main: '#f4a30d',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#00b2ff',
    },
  };
};
