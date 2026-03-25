import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sidebar-state';

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCollapsed(stored === 'collapsed');
    }
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEY, newValue ? 'collapsed' : 'expanded');
      return newValue;
    });
  };

  return { collapsed, toggle, setCollapsed };
}
