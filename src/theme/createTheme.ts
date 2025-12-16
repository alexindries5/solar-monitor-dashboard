import { createTheme as createMuiTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { getPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const createTheme = (mode: PaletteMode) => {
  const theme = createMuiTheme({
    palette: getPalette(mode),
    typography,
    shape: { borderRadius: 14 },
  });
  theme.components = components(theme);
  return theme;
};
