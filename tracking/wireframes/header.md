# Wireframe: Header

**Módulo:** Layout  
**Arquivo:** `header.md`  
**Versão:** 1.0  
**Data:** 25/03/2026

---

## 1. Visão Geral

O **Header** é o componente principal de navegação superior do Goal Planner. Fica fixo no topo da aplicação em todas as páginas autenticadas e contém elementos de navegação, busca, controle de tema e perfil do usuário.

---

## 2. Layout

### 2.1 Wireframe Visual

```
┌─────────────────────────────────────────────────────────────┐
│ [GP] Goal Planner     [🔍 Buscar...]        [☀️/🌙] [🔔] [👤]│
│  Logo                    Busca (desktop)    Toggle  Notif. Avatar
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Detalhamento por Seção

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────┐ ┌─────────────────────┐ ┌────────────────────┐ │
│ │  LOGO   │ │      BUSCA          │ │  ICONS & AVATAR   │ │
│ │  (GP)   │ │   (apenas desktop)  │ │  ☀️ 🌙 🔔  👤     │ │
│ └─────────┘ └─────────────────────┘ └────────────────────┘ │
│  48px     │      flex-1 (max 400px)    │    gap: 16px     │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Especificações Técnicas

### 3.1 Dimensões

| Propriedade        | Valor |
| ------------------ | ----- |
| Altura total       | 64px  |
| Padding horizontal | 24px  |
| Gap entre itens    | 16px  |
| Logo width         | 48px  |
| Busca max-width    | 400px |
| Avatar size        | 40px  |
| Icon size          | 24px  |

### 3.2 Posicionamento

```css
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 40;
background: var(--color-surface);
border-bottom: 1px solid var(--color-border);
```

### 3.3 Responsividade

| Breakpoint   | Comportamento |
| ------------ | ------------- |
| md (< 768px) | Busca oculta  |
| md+ (768px+) | Busca visível |

---

## 4. Componentes

### 4.1 Logo

```
┌─────────┐
│  [GP]   │
│  Goal   │
│ Planner │
└─────────┘
```

- **Texto:** "Goal Planner" ou "GP" (mobile)
- **Ícone:** GP (letras estilizadas ou ícone)
- **Link:** Redireciona para `/dashboard`
- **Tamanho:** 32px altura (desktop), 28px (mobile)

### 4.2 Busca (Apenas Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ 🔍  Buscar metas, áreas, tarefas...                         │
└─────────────────────────────────────────────────────────────┘
```

- **Placeholder:** "Buscar metas, áreas, tarefas..."
- **Ícone:** SearchIcon (esquerda)
- **Visibilidade:** Apenas em telas >= 768px
- **Funcionalidade:** Busca global
- **Tecla de atalho:** Cmd+K / Ctrl+K

### 4.3 Toggle Tema (Sol/Lua)

```
┌────────┐
│ ☀️/🌙  │
└────────┘
```

- **Ícone:** SunIcon / MoonIcon
- **Estado ativo:**
  - Sol (☀️) = modo claro ativo
  - Lua (🌙) = modo escuro ativo
- **Transição:** Animação de rotação 180° (300ms)
- **Persistência:** localStorage ('theme')

### 4.4 Ícone de Notificações

```
┌────────┐
│ 🔔    │
│ 3     │  ← Badge com número
└────────┘
```

- **Ícone:** BellIcon
- **Badge:** Número de notificações não lidas
- **Link:** Redireciona para `/notificacoes`
- **Estado:** Indicador visual de novas notificações

### 4.5 Avatar do Usuário com Dropdown

```
┌────────┐
│  👤    │  ← Avatar circular
│        │
└────────┘
   │
   ▼
┌────────────────────────────────────────┐
│ ┌──────┐                               │
│ │ 👤   │  Nome do Usuário             │
│ └──────┘  email@usuario.com            │
├────────────────────────────────────────┤
│ 🔧 Configurações                       │
│ ⚙️  Preferências                       │
├────────────────────────────────────────┤
│ 🚪 Sair                                │
└────────────────────────────────────────┘
```

- **Avatar:** Imagem do usuário ou iniciais
- **Fallback:** Circle com iniciais (primeira letra do nome)
- **Dropdown:** Menu com opções ao clicar
- **Itens do dropdown:**
  - Perfil (nome + email)
  - Configurações (`/configuracoes`)
  - Preferências
  - Separador
  - Sair (`/logout`)

---

## 5. Estados

### 5.1 Busca

| Estado  | Descrição                     |
| ------- | ----------------------------- |
| Default | Campo vazio, ícone visível    |
| Focus   | Borda destacada, shadow       |
| Typing  | Texto digitado, ícone limpo   |
| Results | Dropdown com resultados       |
| Empty   | "Nenhum resultado encontrado" |

### 5.2 Toggle Tema

| Estado     | Ícone    | Cor background     |
| ---------- | -------- | ------------------ |
| Light mode | SunIcon  | theme-toggle-light |
| Dark mode  | MoonIcon | theme-toggle-dark  |

### 5.3 Avatar

| Estado        | Descrição          |
| ------------- | ------------------ |
| Default       | Imagem ou iniciais |
| Hover         | Borda destacada    |
| Loading       | Skeleton           |
| Dropdown open | Menu expandido     |

---

## 6. Implementação

### 6.1 Estrutura do Componente

```tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Sun, Moon, Bell, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <a href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-500">GP</span>
          <span className="hidden md:block text-lg font-semibold">
            Goal Planner
          </span>
        </a>

        {/* Busca - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar metas, áreas, tarefas..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-transparent focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-4">
          {/* Toggle Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Notificações */}
          <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
          </button>

          {/* Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
                <div className="p-3 border-b border-border">
                  <p className="font-medium">{user?.name || 'Usuário'}</p>
                  <p className="text-sm text-neutral-500">
                    {user?.email || 'email@exemplo.com'}
                  </p>
                </div>
                <div className="py-1">
                  <a
                    href="/configuracoes"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <Settings className="w-4 h-4" />
                    Configurações
                  </a>
                  <button className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-500">
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
```

### 6.2 Atalho de Busca (Cmd+K)

```tsx
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
```

---

## 7. Fluxo de Navegação

```
Header
    │
    ├── [Logo] ──────────────────► Dashboard (/dashboard)
    │
    ├── [Busca] ─────────────────► Resultados de busca
    │
    ├── [Toggle Tema] ────────────► Alterna light/dark
    │
    ├── [Notificações] ──────────► /notificacoes
    │
    └── [Avatar]
          │
          ├── [Configurações] ────► /configuracoes
          │
          └── [Sair] ─────────────► /logout
```

---

## 8. Acessibilidade

- [ ] `role="banner"` no header
- [ ] `aria-label="Cabeçalho principal"`
- [ ] `aria-label` em todos os botões (busca, tema, notificações, perfil)
- [ ] Keyboard navigation completa (Tab)
- [ ] Focus visible em todos os elementos interativos
- [ ] Suporte a screen readers
- [ ] Contraste mínimo WCAG AA

---

## 9. Testes

| ID   | Caso                              | Resultado Esperado         |
| ---- | --------------------------------- | -------------------------- |
| TC01 | Abrir qualquer página autenticada | Header visível no topo     |
| TC02 | Clicar no logo                    | Redireciona para Dashboard |
| TC03 | Clicar no toggle tema             | Tema alterna com animação  |
| TC04 | Clicar no avatar                  | Dropdown abre com opções   |
| TC05 | Tela mobile (< 768px)             | Busca ocultada             |
| TC06 | Pressionar Cmd+K                  | Campo de busca focado      |

---

## 10. Histórico de Versões

| Versão | Data       | Alterações     |
| ------ | ---------- | -------------- |
| 1.0    | 25/03/2026 | Versão inicial |

---

**Fim do documento**
