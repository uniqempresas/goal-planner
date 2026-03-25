# Wireframe: Sidebar Desktop

**Módulo:** Layout  
**Arquivo:** `sidebar-desktop.md`  
**Versão:** 1.0  
**Data:** 25/03/2026

---

## 1. Visão Geral

A **Sidebar Desktop** é o componente principal de navegação no desktop, posicionadofixamente na parte esquerda da tela. É exibida apenas em telas maiores que `lg` (1024px) e pode estar colapsada ou expandida.

---

## 2. Especificações Técnicas

### 2.1 Dimensões

| Propriedade        | Valor Expandido | Valor Colapsado |
| ------------------ | --------------- | --------------- |
| Largura            | 260px           | 72px            |
| Altura             | 100vh           | 100vh           |
| Padding vertical   | 16px            | 16px            |
| Padding horizontal | 12px            | 12px            |
| Item height        | 44px            | 44px            |
| Gap entre itens    | 4px             | 4px             |
| Logo height        | 40px            | 40px            |

### 2.2 Breakpoints

```css
/* desktop only */
@media (min-width: 1024px) {
  .sidebar {
    display: flex;
  }
}

/* hidden on smaller screens */
@media (max-width: 1023px) {
  .sidebar {
    display: none;
  }
}
```

### 2.3 Posicionamento

```css
position: fixed;
top: 0;
left: 0;
bottom: 0;
z-index: 30;
background: var(--color-surface);
border-right: 1px solid var(--color-border);
```

---

## 3. Itens de Navegação

### 3.1 Lista Completa

| #   | ID            | Label         | Ícone (Lucide)    | Rota             |
| --- | ------------- | ------------- | ----------------- | ---------------- |
| 1   | dashboard     | Dashboard     | `LayoutDashboard` | `/dashboard`     |
| 2   | areas         | Áreas de Vida | `Target`          | `/areas`         |
| 3   | metas         | Metas         | `Trophy`          | `/metas`         |
| 4   | agenda        | Agenda        | `Calendar`        | `/agenda`        |
| 5   | semanal       | Plano Semanal | `CalendarDays`    | `/semanal`       |
| 6   | revisoes      | Revisões      | `BarChart3`       | `/revisoes`      |
| 7   | conquistas    | Conquistas    | `Award`           | `/conquistas`    |
| 8   | templates     | Templates     | `FileText`        | `/templates`     |
| 9   | configuracoes | Configurações | `Settings`        | `/configuracoes` |

### 3.2 Wireframe Visual - Expandida

```
┌──────────────────────────────┐
│ ┌────────────────────────┐  │
│ │  [GP] Goal Planner     │  │  ← Logo
│ └────────────────────────┘  │
│                              │
│ ┌────────────────────────┐  │
│ │ 🏠 Dashboard           │  │  ← Ativo
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ 🎯 Áreas de Vida       │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ 🏆 Metas               │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ 📅 Agenda              │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ 📊 Plano Semanal       │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ 📈 Revisões            │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ 🏅 Conquistas          │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ 📄 Templates           │  │
│ └────────────────────────┘  │
│                              │
│ ┌────────────────────────┐  │
│ │ ⚙️ Configurações        │  │
│ └────────────────────────┘  │
│                              │
│ ┌────────────────────────┐  │
│ │ ◀ Colapsar             │  │  ← Toggle
│ └────────────────────────┘  │
└──────────────────────────────┘
```

### 3.3 Wireframe Visual - Colapsada

```
┌────────┐
│  [GP]  │
│        │
│   🏠   │
│        │
│   🎯   │
│        │
│   🏆   │
│        │
│   📅   │
│        │
│   📊   │
│        │
│   🏅   │
│        │
│   📄   │
│        │
│   ⚙️   │
│        │
│   ▶   │
└────────┘
```

---

## 4. Estados

### 4.1 Sidebar

| Estado    | Largura | Labels visíveis | Ícones              |
| --------- | ------- | --------------- | ------------------- |
| Expandida | 260px   | Sim             | Sim                 |
| Colapsada | 72px    | Não             | Sim (centralizados) |

### 4.2 Item de Navegação

| Estado | Cor texto     | Cor background | Ícone         |
| ------ | ------------- | -------------- | ------------- |
| Normal | `neutral-600` | transparent    | `neutral-500` |
| Hover  | `neutral-900` | `neutral-100`  | `neutral-700` |
| Ativo  | `amber-600`   | `amber-50`     | `amber-500`   |
| Focus  | `amber-600`   | outline        | `amber-500`   |

---

## 5. Funcionalidades

### 5.1 Toggle Colapsar/Expandir

- **Botão:** Localizado no rodapé da sidebar
- **Ícone:** ChevronLeft (expandida) / ChevronRight (colapsada)
- **Persistência:** localStorage ('sidebar-state')
- **Animação:** 300ms ease-in-out

### 5.2 Scroll

- A sidebar tem scroll interno quando o conteúdo excede a altura
- Scrollbar customizada ou oculta

### 5.3 Itens Ativos

- O item ativo é destacado com cor de fundo `amber-50`
- O ícone e texto usam `amber-500` / `amber-600`

---

## 6. Implementação

### 6.1 Estrutura do Componente

```tsx
'use client';

import { useState, useEffect } from 'react';
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
    label: 'Piano Semanal',
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

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0 z-30
        bg-surface border-r border-border
        transition-all duration-300 ease-in-out
        flex flex-col
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
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
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-colors duration-200
                    ${
                      active
                        ? 'bg-amber-50 text-amber-600'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      active ? 'text-amber-500' : 'text-neutral-500'
                    }`}
                  />
                  {!collapsed && (
                    <span
                      className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}
                    >
                      {item.label}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t border-border">
        <button
          onClick={onToggle}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-neutral-600 hover:bg-neutral-100
            transition-colors duration-200 w-full
            ${collapsed ? 'justify-center' : ''}
          `}
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

### 6.2 Hook para Estado Persistido

```tsx
// useSidebarState.ts
import { useState, useEffect } from 'react';

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-state');
    if (stored) {
      setCollapsed(stored === 'collapsed');
    }
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        'sidebar-state',
        newValue ? 'collapsed' : 'expanded'
      );
      return newValue;
    });
  };

  return { collapsed, toggle };
}
```

---

## 7. Responsividade

### 7.1 Comportamento por Breakpoint

| Breakpoint | Comportamento  |
| ---------- | -------------- |
| < 1024px   | Oculta sidebar |
| >= 1024px  | Exibe sidebar  |

### 7.2 Layout com Sidebar

```tsx
<div className="flex">
  {/* Sidebar - apenas desktop */}
  <div className="hidden lg:block">
    <Sidebar />
  </div>

  {/* Main Content */}
  <main className={`flex-1 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}>
    {/* conteúdo */}
  </main>
</div>
```

---

## 8. Acessibilidade

- [ ] `role="navigation"` na sidebar
- [ ] `aria-label="Navegação principal"`
- [ ] `aria-current="page"` no item ativo
- [ ] `aria-expanded` no botão de toggle
- [ ] Keyboard navigation completa
- [ ] Focus visible
- [ ] Suporte a screen readers

---

## 9. Fluxo de Navegação

```
Sidebar
    │
    ├── Dashboard ──────────────► /dashboard
    │
    ├── Áreas de Vida ─────────► /areas
    │
    ├── Metas ─────────────────► /metas
    │
    ├── Agenda ────────────────► /agenda
    │
    ├── Plano Semanal ─────────► /semanal
    │
    ├── Revisões ───────────────► /revisoes
    │
    ├── Conquistas ────────────► /conquistas
    │
    ├── Templates ─────────────► /templates
    │
    ├── Configurações ─────────► /configuracoes
    │
    └── [Toggle] ──────────────► Colapsa/Expande
```

---

## 10. Testes

| ID   | Caso                     | Resultado Esperado      |
| ---- | ------------------------ | ----------------------- |
| TC01 | Tela desktop (>= 1024px) | Sidebar visível         |
| TC02 | Tela mobile (< 1024px)   | Sidebar oculta          |
| TC03 | Clicar em toggle         | Sidebar colapsa/expande |
| TC04 | Estar em /metas          | "Metas" destacado       |
| TC05 | Refresh na página        | Estado persiste         |
| TC06 | Hover em item            | Background muda         |

---

## 11. Histórico de Versões

| Versão | Data       | Alterações     |
| ------ | ---------- | -------------- |
| 1.0    | 25/03/2026 | Versão inicial |

---

**Fim do documento**
