import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'goal-planner-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Aplicar tema via class no html
  useEffect(() => {
    setMounted(true);

    // Verifica localStorage primeiro
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && (stored === 'light' || stored === 'dark')) {
      setTheme(stored);
      document.documentElement.classList.add(stored);
      return;
    }

    // Fallback: prefers-color-scheme
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    setTheme(systemTheme);
    document.documentElement.classList.add(systemTheme);
  }, []);

  // Função para alternar tema
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  return { theme, toggleTheme, mounted };
}
