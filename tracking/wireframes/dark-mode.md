# Wireframe: Dark Mode

**Módulo:** Layout  
**Arquivo:** `dark-mode.md`  
**Versão:** 1.0  
**Data:** 25/03/2026

---

## 1. Visão Geral

O **Dark Mode** é o sistema de alternância de tema claro/escuro do Goal Planner. Permite que o usuário escolha entre o tema claro (padrão) e o tema escuro, com persistência de preferência no localStorage.

---

## 2. Especificações Técnicas

### 2.1 Toggle no Header

O toggle de tema está localizado no Header, próximo ao avatar do usuário:

```
┌─────────────────────────────────────────────────────────────┐
│ [GP] Goal Planner     [🔍 Buscar...]        [☀️/🌙] [🔔] [👤]│
│                                        ↑
│                                   Toggle Theme
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Posicionamento

| Propriedade | Valor              |
| ----------- | ------------------ |
| Localização | Header, após busca |
| Ícone       | SunIcon / MoonIcon |
| Tamanho     | 24px               |
| Padding     | 8px                |

### 2.3 Estados do Toggle

| Estado           | Ícone    | Ação               |
| ---------------- | -------- | ------------------ |
| Light mode ativo | SunIcon  | Alterna para dark  |
| Dark mode ativo  | MoonIcon | Alterna para light |

---

## 3. Cores do Design System

### 3.1 Light Mode (Padrão)

| Token                      | Valor   | Uso                  |
| -------------------------- | ------- | -------------------- |
| `--color-background`       | #FFFFFF | Fundo principal      |
| `--color-surface`          | #FFFFFF | Cards, modais        |
| `--color-surface-elevated` | #F8FAFC | Superfícies elevadas |
| `--color-border`           | #E2E8F0 | Bordas               |
| `--color-text-primary`     | #0F172A | Texto principal      |
| `--color-text-secondary`   | #64748B | Texto secundário     |
| `--color-accent-50`        | #FFFBEB | Fundo destacado      |
| `--color-accent-500`       | #F59E0B | Cor de destaque      |
| `--color-accent-600`       | #D97706 | Hover em destaque    |

### 3.2 Dark Mode

| Token                      | Valor   | Uso                  |
| -------------------------- | ------- | -------------------- |
| `--color-background`       | #0F172A | Fundo principal      |
| `--color-surface`          | #1E293B | Cards, modais        |
| `--color-surface-elevated` | #334155 | Superfícies elevadas |
| `--color-border`           | #334155 | Bordas               |
| `--color-text-primary`     | #F8FAFC | Texto principal      |
| `--color-text-secondary`   | #94A3B8 | Texto secundário     |
| `--color-accent-50`        | #451A03 | Fundo destacado      |
| `--color-accent-500`       | #F59E0B | Cor de destaque      |
| `--color-accent-600`       | #FBBF24 | Hover em destaque    |

### 3.3 Paleta Completa

#### Neutral (Escala)

| Shade | Light   | Dark    |
| ----- | ------- | ------- |
| 50    | #F8FAFC | #0F172A |
| 100   | #F1F5F9 | #1E293B |
| 200   | #E2E8F0 | #334155 |
| 300   | #CBD5E1 | #475569 |
| 400   | #94A3B8 | #64748B |
| 500   | #64748B | #94A3B8 |
| 600   | #475569 | #CBD5E1 |
| 700   | #334155 | #E2E8F0 |
| 800   | #1E293B | #F1F5F9 |
| 900   | #0F172A | #F8FAFC |

#### Amber (Destaque)

| Shade | Light   | Dark    |
| ----- | ------- | ------- |
| 50    | #FFFBEB | #451A03 |
| 100   | #FEF3C7 | #78350F |
| 200   | #FDE68A | #92400E |
| 300   | #FCD34D | #B45309 |
| 400   | #FBBF24 | #D97706 |
| 500   | #F59E0B | #F59E0B |
| 600   | #D97706 | #FBBF24 |
| 700   | #B45309 | #FCD34D |
| 800   | #92400E | #FDE68A |
| 900   | #78350F | #FEF3C7 |

---

## 4. Implementação

### 4.1 Configuração next-themes

```tsx
// providers/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="gp-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
```

### 4.2 Componente Toggle

```tsx
// components/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
      aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
            theme === 'dark'
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}
```

### 4.3 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },
      },
    },
  },
};
```

### 4.4 CSS Variables

```css
/* globals.css */
@layer base {
  :root {
    --color-background: #ffffff;
    --color-surface: #ffffff;
    --color-surface-elevated: #f8fafc;
    --color-border: #e2e8f0;
    --color-text-primary: #0f172a;
    --color-text-secondary: #64748b;
    --color-accent-50: #fffbeb;
    --color-accent-100: #fef3c7;
    --color-accent-200: #fde68a;
    --color-accent-300: #fcd34d;
    --color-accent-400: #fbbf24;
    --color-accent-500: #f59e0b;
    --color-accent-600: #d97706;
    --color-accent-700: #b45309;
    --color-accent-800: #92400e;
    --color-accent-900: #78350f;
  }

  .dark {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-surface-elevated: #334155;
    --color-border: #334155;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #94a3b8;
    --color-accent-50: #451a03;
    --color-accent-100: #78350f;
    --color-accent-200: #92400e;
    --color-accent-300: #b45309;
    --color-accent-400: #d97706;
    --color-accent-500: #f59e0b;
    --color-accent-600: #fbbf24;
    --color-accent-700: #fcd34d;
    --color-accent-800: #fde68a;
    --color-accent-900: #fef3c7;
  }
}
```

---

## 5. Persistência

### 5.1 localStorage

- **Chave:** `gp-theme`
- **Valores:** `'light'` | `'dark'`
- **Fallback:** `'light'` (se não definido)

### 5.2 Verificação de Preferência do Sistema

```tsx
// Opcional: Detectar preferência do sistema
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';
```

---

## 6. Transições

### 6.1 Transição de Cores

Todas as transições de tema devem ter uma duração suave:

```css
/* Transição global */
* {
  transition-property: background-color, border-color, color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

/* Ou desabilitar transição no toggle para evitar flash */
.disable-transition-on-change * {
  transition: none !important;
}
```

### 6.2 Animação do Toggle

```tsx
// Animação de rotação
<div className="transition-transform duration-300 rotate-0">
  {/* Sol */}
</div>
<div className="transition-transform duration-300 -rotate-90">
  {/* Lua */}
</div>
```

---

## 7. Considerações de Acessibilidade

### 7.1 Requisitos

- [ ] Contraste mínimo WCAG AA para todos os elementos em ambos os temas
- [ ] Ícone do toggle deve ter `aria-label` descritivo
- [ ] Estado do tema deve ser anunciado pelo screen reader
- [ ] Não deve haver flash ao carregar a página (SSR)

### 7.2 Evitar Flash

```tsx
// Evitar flash de tema incorreto
// No _app.tsx ou layout.tsx:
useEffect(() => {
  document.documentElement.classList.remove('disable-transition-on-change');
}, []);
```

---

## 8. Fluxo de Funcionamento

```
Usuário acessa aplicação
         │
         ▼
┌─────────────────────────┐
│  Verifica localStorage  │
│  - "gp-theme" existe?   │
└────────────┬────────────┘
             │
     ┌───────┴───────┐
     │                │
    SIM              NÃO
     │                │
     ▼                ▼
┌──────────┐   ┌─────────────┐
│ Usa tema │   │ Usa tema    │
│ salvo    │   │ padrão      │
└──────────┘   │ ("light")   │
              └─────────────┘
                   │
                   ▼
┌──────────────────────────────────┐
│  Aplica classe "dark" ao html   │
│  (se tema for "dark")           │
└──────────────────────────────────┘
```

---

## 9. Testes

| ID   | Caso                           | Resultado Esperado        |
| ---- | ------------------------------ | ------------------------- |
| TC01 | Carregar página                | Tema salvo é aplicado     |
| TC02 | Clicar no toggle               | Tema alterna com animação |
| TC03 | Refresh na página              | Tema persiste             |
| TC04 | Usuário nunca definiu tema     | Tema claro aplicado       |
| TC05 | Verificar cores em ambos temas | Contraste adequado        |

---

## 10. Histórico de Versões

| Versão | Data       | Alterações     |
| ------ | ---------- | -------------- |
| 1.0    | 25/03/2026 | Versão inicial |

---

**Fim do documento**
