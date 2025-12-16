import { useMemo } from 'react';
import { createTheme } from './createTheme';
import { useColorScheme } from '../app/providers/ThemeProvider';

export const useAppTheme = () => {
  const { mode } = useColorScheme();
  const theme = useMemo(() => createTheme(mode), [mode]);
  return { theme };
};
