import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'goal-planner-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // 1. Obter tema inicial (só executa no client)
  useEffect(() => {
    setMounted(true);

    // Verifica localStorage primeiro
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && (stored === 'light' || stored === 'dark')) {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    // Fallback: prefers-color-scheme
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    setTheme(systemTheme);
    applyTheme(systemTheme);
  }, []);

  // 2. Função para aplicar tema ao document
  const applyTheme = useCallback((newTheme: Theme) => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  }, []);

  // 3. Função para alternar tema
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, [theme, applyTheme]);

  return { theme, toggleTheme, mounted };
}
