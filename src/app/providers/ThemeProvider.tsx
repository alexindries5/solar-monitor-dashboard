import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PaletteMode } from '@mui/material';

const STORAGE_KEY = 'solar-theme-mode';

type ThemeContextValue = {
  mode: PaletteMode;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PaletteMode | null;
    return stored ?? 'light';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(
    () => ({ mode, toggleMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useColorScheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useColorScheme must be used within ThemeProvider');
  return ctx;
};
