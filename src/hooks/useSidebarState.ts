import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sidebar-state';

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCollapsed(stored === 'collapsed');
    } else {
      setCollapsed(false);
    }
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      if (prev === null) return true;
      const newValue = !prev;
      localStorage.setItem(STORAGE_KEY, newValue ? 'collapsed' : 'expanded');
      return newValue;
    });
  };

  return { collapsed: collapsed ?? false, toggle, setCollapsed };
}
