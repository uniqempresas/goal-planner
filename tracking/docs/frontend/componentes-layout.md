# Componentes de Layout - Documentação UI/UX

**Versão:** 1.0  
**Data:** 25/03/2026

Este documento abrange os componentes de layout fundamentais da aplicação:

- Header (Navegação Superior)
- Sidebar Desktop
- Menu Mobile Inferior

---

## 1. Header

**Wireframe:** `tracking/wireframes/header.md`

### 1.1 Visão Geral

O Header é o componente principal de navegação superior, fixo no topo da aplicação em todas as páginas autenticadas. Contém: logo, busca global, toggle de tema, notificações e avatar do usuário.

### 1.2 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [GP] Goal Planner     [🔍 Buscar...]        [☀️/🌙] [🔔] [👤]│
└─────────────────────────────────────────────────────────────┘
        │              │                    │     │      │
        │              │                    │     │      └── Avatar + Dropdown
        │              │                    │     └─── Notifications
        │              │                    └─── Theme Toggle
        │              └─── Search (desktop only)
        └─── Logo + Brand
```

### 1.3 Especificações

| Propriedade        | Valor         |
| ------------------ | ------------- |
| Altura             | 64px          |
| Padding horizontal | 24px          |
| Z-index            | 40            |
| Posição            | fixed, top: 0 |

### 1.4 Componente: Header

```tsx
// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  Loader2,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menu on route change
  useEffect(() => setUserMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 h-16 z-40 transition-all duration-200',
        'bg-background/80 backdrop-blur-md border-b border-border',
        scrolled && 'shadow-sm'
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl font-bold text-amber-500">GP</span>
          <span className="hidden md:block text-lg font-semibold text-foreground">
            Goal Planner
          </span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar metas, áreas, tarefas..."
              onFocus={() => setSearchOpen(true)}
              className="
                w-full pl-10 pr-4 py-2
                bg-neutral-100 dark:bg-neutral-800
                border border-transparent
                rounded-lg
                text-sm
                placeholder:text-neutral-400
                focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20
                transition-all
              "
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-neutral-400 bg-neutral-200 dark:bg-neutral-700 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-neutral-600" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="
              p-2 rounded-lg
              hover:bg-neutral-100 dark:hover:bg-neutral-800
              text-neutral-600 dark:text-neutral-400
              hover:text-amber-500
              transition-all duration-300
            "
            aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          >
            <div className="relative w-5 h-5">
              <Sun
                className={cn(
                  'w-5 h-5 absolute inset-0 transition-all duration-300',
                  theme === 'dark'
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                )}
              />
              <Moon
                className={cn(
                  'w-5 h-5 absolute inset-0 transition-all duration-300',
                  theme === 'dark'
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                )}
              />
            </div>
          </button>

          {/* Notifications */}
          <button
            className="
              relative p-2 rounded-lg
              hover:bg-neutral-100 dark:hover:bg-neutral-800
              text-neutral-600 dark:text-neutral-400
              hover:text-amber-500
              transition-colors
            "
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
          </button>

          {/* Avatar + Dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-foreground">
                      {user?.name || 'Usuário'}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {user?.email || 'email@exemplo.com'}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/configuracoes"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Configurações
                    </Link>
                    <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## 2. Sidebar Desktop

**Wireframe:** `tracking/wireframes/sidebar-desktop.md`

### 2.1 Visão Geral

A Sidebar Desktop é o componente de navegação principal para telas maiores que 1024px. Pode estar expandida (260px) ou colapsada (72px).

### 2.2 Especificações

| Propriedade | Expandida | Colapsada |
| ----------- | --------- | --------- |
| Largura     | 260px     | 72px      |
| Altura      | 100vh     | 100vh     |
| Item height | 44px      | 44px      |
| Breakpoint  | >= 1024px | >= 1024px |

### 2.3 Itens de Navegação

| ID            | Label         | Ícone           | Rota           |
| ------------- | ------------- | --------------- | -------------- |
| dashboard     | Dashboard     | LayoutDashboard | /dashboard     |
| areas         | Áreas de Vida | Target          | /areas         |
| metas         | Metas         | Trophy          | /metas         |
| agenda        | Agenda        | Calendar        | /agenda        |
| semanal       | Plano Semanal | CalendarDays    | /semanal       |
| revisoes      | Revisões      | BarChart3       | /revisoes      |
| conquistas    | Conquistas    | Award           | /conquistas    |
| templates     | Templates     | FileText        | /templates     |
| configuracoes | Configurações | Settings        | /configuracoes |

### 2.4 Componente: Sidebar

```tsx
// components/layout/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Target,
  Trophy,
  Calendar,
  CalendarDays,
  BarChart3,
  Award,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  { id: 'areas', label: 'Áreas de Vida', icon: Target, href: '/areas' },
  { id: 'metas', label: 'Metas', icon: Trophy, href: '/metas' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, href: '/agenda' },
  {
    id: 'semanal',
    label: 'Plano Semanal',
    icon: CalendarDays,
    href: '/semanal',
  },
  { id: 'revisoes', label: 'Revisões', icon: BarChart3, href: '/revisoes' },
  { id: 'conquistas', label: 'Conquistas', icon: Award, href: '/conquistas' },
  { id: 'templates', label: 'Templates', icon: FileText, href: '/templates' },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
  },
];

export function Sidebar({
  collapsed: controlledCollapsed,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize state from localStorage or controlled prop
  useEffect(() => {
    setMounted(true);
    if (controlledCollapsed !== undefined) {
      setCollapsed(controlledCollapsed);
    } else {
      const stored = localStorage.getItem('sidebar-state');
      if (stored) setCollapsed(stored === 'collapsed');
    }
  }, [controlledCollapsed]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const toggle = () => {
    const newValue = !collapsed;
    setCollapsed(newValue);
    localStorage.setItem('sidebar-state', newValue ? 'collapsed' : 'expanded');
    onToggle?.();
  };

  if (!mounted) return null;

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 z-30',
        'bg-background border-r border-border',
        'transition-all duration-300 ease-in-out',
        'flex flex-col',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        {collapsed ? (
          <span className="text-2xl font-bold text-amber-500">GP</span>
        ) : (
          <span className="text-xl font-bold text-amber-500">Goal Planner</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-hide">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                    'transition-all duration-200',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    active
                      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                      : 'text-neutral-600 dark:text-neutral-400',
                    collapsed && 'justify-center'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 flex-shrink-0',
                      active ? 'text-amber-500' : 'text-neutral-500'
                    )}
                  />
                  {!collapsed && (
                    <span
                      className={cn(
                        'text-sm font-medium',
                        active && 'font-semibold'
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t border-border">
        <button
          onClick={toggle}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg',
            'text-neutral-600 dark:text-neutral-400',
            'hover:bg-neutral-100 dark:hover:bg-neutral-800',
            'transition-colors duration-200 w-full',
            collapsed && 'justify-center'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Colapsar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
```

### 2.5 Responsividade

```tsx
// Layout wrapper
<div className="flex">
  {/* Sidebar - apenas desktop */}
  <div className="hidden lg:block">
    <Sidebar collapsed={collapsed} onToggle={handleToggle} />
  </div>

  {/* Main Content */}
  <main
    className={cn(
      'flex-1 min-h-screen pt-16 transition-all duration-300',
      'lg:pl-[260px]',
      collapsed && 'lg:pl-[72px]'
    )}
  >
    {/* conteúdo */}
  </main>
</div>
```

---

## 3. Menu Mobile Inferior

**Wireframe:** `tracking/wireframes/layout-mobile-menu-v2.md`

### 3.1 Visão Geral

O Menu Mobile Inferior (v2) é o componente de navegação para dispositivos móveis. Posicionado fixamente na parte inferior, exibe todos os 8 itens com scroll horizontal manual.

### 3.2 Itens de Navegação (v2)

| #   | ID            | Label         | Ícone     | Rota           |
| --- | ------------- | ------------- | --------- | -------------- |
| 1   | inicio        | Início        | Home      | /dashboard     |
| 2   | areas         | Áreas         | Target    | /areas         |
| 3   | metas         | Metas         | Trophy    | /metas         |
| 4   | agenda        | Agenda        | Calendar  | /agenda        |
| 5   | revisoes      | Revisões      | BarChart3 | /revisoes      |
| 6   | conquistas    | Conquistas    | Award     | /conquistas    |
| 7   | configuracoes | Configurações | Settings  | /configuracoes |
| 8   | templates     | Templates     | FileText  | /templates     |

### 3.3 Especificações

| Propriedade  | Valor            |
| ------------ | ---------------- |
| Altura       | 64px             |
| Largura item | 64px (min)       |
| Gap          | 4px              |
| Breakpoint   | < 1024px         |
| Posição      | fixed, bottom: 0 |

### 3.4 Componente: MobileNav

```tsx
// components/layout/MobileNav.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Home,
  Target,
  Trophy,
  Calendar,
  BarChart3,
  Award,
  Settings,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início', href: '/dashboard', icon: Home },
  { id: 'areas', label: 'Áreas', href: '/areas', icon: Target },
  { id: 'metas', label: 'Metas', href: '/metas', icon: Trophy },
  { id: 'agenda', label: 'Agenda', href: '/agenda', icon: Calendar },
  { id: 'revisoes', label: 'Revisões', href: '/revisoes', icon: BarChart3 },
  { id: 'conquistas', label: 'Conquistas', href: '/conquistas', icon: Award },
  {
    id: 'configuracoes',
    label: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
  },
  { id: 'templates', label: 'Templates', href: '/templates', icon: FileText },
];

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  // Encontrar índice ativo baseado na rota
  const activeIndex = navItems.findIndex((item) => {
    return pathname === item.href || pathname.startsWith(item.href + '/');
  });

  // Scroll suave para centralizar item ativo
  useEffect(() => {
    if (containerRef.current && activeIndex !== -1) {
      const container = containerRef.current;
      const itemWidth = 72; // 64px + 8px gap
      const targetScroll =
        activeIndex * itemWidth - container.clientWidth / 2 + itemWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    <nav
      role="navigation"
      aria-label="Navegação principal"
      className="
        fixed bottom-0 left-0 right-0 h-16
        bg-background/95 backdrop-blur-md
        border-t border-border
        z-50
        lg:hidden
      "
    >
      <div
        ref={containerRef}
        className="flex items-center justify-start gap-1 px-2 h-full overflow-x-auto scrollbar-hide"
      >
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-[64px] h-14 px-2 py-2',
                'rounded-lg transition-all duration-200',
                'tap-highlight-transparent',
                isActive
                  ? 'text-amber-500'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6" />
              <span
                className={cn(
                  'text-xs mt-1 truncate max-w-[60px]',
                  isActive ? 'font-semibold' : 'font-medium'
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
```

### 3.5 CSS Utilities

```css
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Touch tap highlight */
.tap-highlight-transparent {
  -webkit-tap-highlight-color: transparent;
}
```

---

## 4. Layout Composition

### 4.1 App Layout (Server Component)

```tsx
// app/layout.tsx
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header user={{ name: 'Usuário', email: 'user@example.com' }} />

          {/* Desktop Layout */}
          <div className="hidden lg:flex">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="lg:pl-[260px] min-h-screen pt-16 pb-20 lg:pb-0">
            {children}
          </main>

          {/* Mobile Navigation */}
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 5. Acessibilidade

### Header

- [ ] `role="banner"` no header
- [ ] `aria-label="Cabeçalho principal"`
- [ ] `aria-label` em todos os botões
- [ ] Keyboard navigation (Tab)
- [ ] Focus visible

### Sidebar

- [ ] `role="navigation"`
- [ ] `aria-label="Navegação principal"`
- [ ] `aria-current="page"` no item ativo
- [ ] `aria-expanded` no toggle
- [ ] Keyboard navigation completa

### Mobile Nav

- [ ] `role="navigation"`
- [ ] `aria-label="Navegação principal"`
- [ ] `aria-current="page"` no item ativo
- [ ] Touch target mínimo 44x44px

---

## 6. Histórico de Versões

| Versão | Data       | Alterações                           |
| ------ | ---------- | ------------------------------------ |
| 1.0    | 25/03/2026 | Versão inicial baseada em wireframes |
