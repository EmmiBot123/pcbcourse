import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type Palette = 'cobalt' | 'amber' | 'indigo' | 'obsidian';

export interface PaletteOption {
  id: Palette;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
}

export const PALETTE_OPTIONS: PaletteOption[] = [
  {
    id: 'cobalt',
    name: 'Cobalt & Copper',
    description: 'KiCad CAD Blue + Hardware Copper (Default)',
    primaryColor: '#2563eb',
    accentColor: '#d97706',
  },
  {
    id: 'amber',
    name: 'Amber & Titanium',
    description: 'Hardware Gold/Copper + Obsidian',
    primaryColor: '#d97706',
    accentColor: '#2563eb',
  },
  {
    id: 'indigo',
    name: 'Electric Indigo',
    description: 'Modern AI Studio + Cyan',
    primaryColor: '#4f46e5',
    accentColor: '#0ea5e9',
  },
  {
    id: 'obsidian',
    name: 'High-Contrast Slate',
    description: 'Minimalist Engineering Monochrome',
    primaryColor: '#0f172a',
    accentColor: '#2563eb',
  },
];

interface ThemeContextType {
  theme: Theme;
  palette: Palette;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setPalette: (palette: Palette) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('aronlabz_theme') as Theme;
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [palette, setPaletteState] = useState<Palette>(() => {
    const saved = localStorage.getItem('aronlabz_palette') as Palette;
    if (saved === 'cobalt' || saved === 'amber' || saved === 'indigo' || saved === 'obsidian') return saved;
    return 'cobalt';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('aronlabz_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', palette);
    localStorage.setItem('aronlabz_palette', palette);
  }, [palette]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setPalette = (newPalette: Palette) => {
    setPaletteState(newPalette);
  };

  return (
    <ThemeContext.Provider value={{ theme, palette, toggleTheme, setTheme, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
