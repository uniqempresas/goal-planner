# Estados de UI - Documentação UI/UX

**Versão:** 1.0  
**Data:** 25/03/2026

Este documento abrange os estados de UI e tratamento de erros:

- Loading Skeleton
- 404 Page
- Error Boundary
- Dark Mode / Theme System

---

## 1. Loading Skeleton

**Wireframe:** `tracking/wireframes/loading-skeleton.md`

### 1.1 Visão Geral

O componente Skeleton é utilizado para indicar carregamento de conteúdo durante a busca de dados, proporcionando feedback visual ao usuário.

### 1.2 Especificações

| Propriedade      | Valor                     |
| ---------------- | ------------------------- |
| Animação         | Pulse (suave)             |
| Duração          | 1.5s por ciclo            |
| Border radius    | 4px (padrão), 8px (cards) |
| Cor base (light) | #E2E8F0                   |
| Cor base (dark)  | #334155                   |

### 1.3 Componente: Skeleton Base

```tsx
// components/ui/Skeleton.tsx
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded',
        'bg-neutral-200 dark:bg-neutral-700',
        className
      )}
    />
  );
}
```

### 1.4 Skeleton de Card (para Lista de Áreas)

```tsx
// components/skeletons/AreaCardSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function AreaCardSkeleton() {
  return (
    <div
      className="
      bg-white dark:bg-neutral-900
      rounded-xl border border-neutral-200 dark:border-neutral-800
      p-5
    "
    >
      {/* Cor indicator + Title */}
      <div className="flex items-start gap-3 mb-3">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="h-6 w-3/4 rounded" />
      </div>

      {/* Meta count */}
      <Skeleton className="h-4 w-20 rounded mb-3 ml-6" />

      {/* Progress bar */}
      <div className="ml-6">
        <div className="flex justify-between mb-1">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-8 rounded" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  );
}
```

### 1.5 Skeleton de Lista (para Detalhe de Área)

```tsx
// components/skeletons/GoalsListSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function GoalsListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            flex items-center gap-4 p-4 rounded-lg
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
          "
        >
          {/* Checkbox */}
          <Skeleton className="w-5 h-5 rounded" />

          {/* Content */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <div className="flex gap-2">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 1.6 Skeleton de Stats

```tsx
// components/skeletons/StatsGridSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="
            bg-white dark:bg-neutral-900
            rounded-xl border border-neutral-200 dark:border-neutral-800
            p-4 text-center
          "
        >
          <Skeleton className="w-5 h-5 mx-auto mb-2 rounded" />
          <Skeleton className="h-8 w-12 mx-auto rounded mb-1" />
          <Skeleton className="h-4 w-16 mx-auto rounded" />
        </div>
      ))}
    </div>
  );
}
```

### 1.7 Skeleton de Página Inteira

```tsx
// components/skeletons/AreasListSkeleton.tsx
import { AreaCardSkeleton } from './AreaCardSkeleton';

export function AreasListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      {/* Grid */}
      <div
        className="
        grid gap-4
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      "
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <AreaCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
```

### 1.8 Uso com React Query / Server Components

```tsx
// app/areas/page.tsx
import { Suspense } from 'react';
import { AreasList } from './_components/AreasList';
import { AreasListSkeleton } from '@/components/skeletons/AreasListSkeleton';

export default function AreasPage() {
  return (
    <Suspense fallback={<AreasListSkeleton />}>
      <AreasList />
    </Suspense>
  );
}
```

---

## 2. Página 404

**Wireframe:** `tracking/wireframes/404-page.md`

### 2.1 Visão Geral

Exibida quando o usuário tenta acessar uma rota inexistente. Fornece feedback claro e ações para voltar a locais válidos.

### 2.2 Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          🔍                                │
│                                                             │
│                       404                                   │
│                                                             │
│                  Página não encontrada                     │
│                                                             │
│     A página que você está procurando não existe          │
│            ou foi movida para outro lugar.                │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │          Voltar ao Dashboard                     │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │                 Ir para Home                    │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Componente: NotFound

```tsx
// app/not-found.tsx
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone */}
        <div className="mb-8">
          <Search className="w-20 h-20 mx-auto text-neutral-300 dark:text-neutral-600" />
        </div>

        {/* Código 404 */}
        <h1 className="text-7xl font-bold text-amber-500 mb-4">404</h1>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Página não encontrada
        </h2>

        {/* Descrição */}
        <p className="text-neutral-500 mb-8">
          A página que você está procurando não existe ou foi movida para outro
          lugar.
        </p>

        {/* Botões */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="
              flex items-center justify-center gap-2
              w-full py-3 px-4
              bg-amber-500 hover:bg-amber-600
              text-white font-medium rounded-lg
              transition-all duration-200
              hover:shadow-lg hover:shadow-amber-500/25
            "
          >
            <Home className="w-5 h-5" />
            Voltar ao Dashboard
          </Link>

          <Link
            href="/"
            className="
              flex items-center justify-center gap-2
              w-full py-3 px-4
              border border-border
              hover:bg-neutral-100 dark:hover:bg-neutral-800
              text-foreground font-medium rounded-lg
              transition-colors
            "
          >
            <ArrowLeft className="w-5 h-5" />
            Ir para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## 3. Error Boundary

**Wireframe:** `tracking/wireframes/error-boundary.md`

### 3.1 Visão Geral

O Error Boundary captura erros de runtime (exceções não tratadas) em componentes filhos, exibindo uma UI de fallback amigável. Diferente da página 404 (rotas inválidas), captura erros de JavaScript.

### 3.2 Tipos de Error

| Tipo         | Arquivo            | O que captura                   |
| ------------ | ------------------ | ------------------------------- |
| 404          | `not-found.tsx`    | Rotas que não existem           |
| Error        | `error.tsx`        | Erros de runtime em componentes |
| Global Error | `global-error.tsx` | Erros não capturados (root)     |

### 3.3 Componente: Error Boundary (error.tsx)

```tsx
// app/error.tsx
'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Bug, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  // Log para serviço de monitoramento (Sentry, etc.)
  useEffect(() => {
    console.error('Error boundary triggered:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone */}
        <div className="mb-6">
          <AlertTriangle className="w-20 h-20 mx-auto text-red-500" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Algo deu errado
        </h2>

        {/* Descrição */}
        <p className="text-neutral-500 mb-6">
          Pedimos desculpas, mas ocorreu um erro inesperado ao carregar esta
          página.
        </p>

        {/* Botões */}
        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="
              w-full flex items-center justify-center gap-2
              py-3 px-4
              bg-amber-500 hover:bg-amber-600
              text-white font-medium rounded-lg
              transition-all duration-200
              hover:shadow-lg hover:shadow-amber-500/25
            "
          >
            <RefreshCw className="w-5 h-5" />
            Tentar novamente
          </button>

          <button
            onClick={() => (window.location.href = '/dashboard')}
            className="
              w-full flex items-center justify-center gap-2
              py-3 px-4
              border border-border
              hover:bg-neutral-100 dark:hover:bg-neutral-800
              text-foreground font-medium rounded-lg
              transition-colors
            "
          >
            <Home className="w-5 h-5" />
            Voltar ao Dashboard
          </button>
        </div>

        {/* Detalhes do erro (development only) */}
        {(process.env.NODE_ENV === 'development' || showDetails) && (
          <div className="mt-6 text-left">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="
                text-sm text-neutral-500 hover:text-foreground
                flex items-center gap-1 mb-2
                transition-colors
              "
            >
              <Bug className="w-4 h-4" />
              {showDetails ? 'Ocultar' : 'Mostrar'} detalhes do erro
            </button>

            {showDetails && (
              <pre
                className="
                p-4 bg-neutral-100 dark:bg-neutral-800
                rounded-lg text-xs overflow-auto max-h-40
                text-neutral-700 dark:text-neutral-300
                font-mono whitespace-pre-wrap
              "
              >
                {error.message}
                {'\n\n'}
                {error.digest && `Digest: ${error.digest}`}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 3.4 Global Error (global-error.tsx)

```tsx
// app/global-error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-background">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Algo deu muito errado
            </h2>
            <p className="text-neutral-500 mb-6">
              Por favor, recarregue a página ou tente novamente.
            </p>
            <button
              onClick={() => reset()}
              className="
                px-6 py-3
                bg-amber-500 hover:bg-amber-600
                text-white font-medium rounded-lg
                transition-colors
              "
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
```

### 3.5 Loading (loading.tsx)

```tsx
// app/loading.tsx
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-4" />
        <p className="text-neutral-500">Carregando...</p>
      </div>
    </div>
  );
}
```

---

## 4. Dark Mode / Theme System

**Wireframe:** `tracking/wireframes/dark-mode.md`

### 4.1 Visão Geral

Sistema de alternância de tema claro/escuro com persistência no localStorage. Toggle localizado no Header.

### 4.2 Cores do Design System

#### Light Mode (Padrão)

| Token            | Valor   | Uso                  |
| ---------------- | ------- | -------------------- |
| background       | #FFFFFF | Fundo principal      |
| surface          | #FFFFFF | Cards, modais        |
| surface-elevated | #F8FAFC | Superfícies elevadas |
| border           | #E2E8F0 | Bordas               |
| text-primary     | #0F172A | Texto principal      |
| text-secondary   | #64748B | Texto secundário     |
| accent-50        | #FFFBEB | Fundo destacado      |
| accent-500       | #F59E0B | Cor de destaque      |
| accent-600       | #D97706 | Hover em destaque    |

#### Dark Mode

| Token            | Valor   | Uso                  |
| ---------------- | ------- | -------------------- |
| background       | #0F172A | Fundo principal      |
| surface          | #1E293B | Cards, modais        |
| surface-elevated | #334155 | Superfícies elevadas |
| border           | #334155 | Bordas               |
| text-primary     | #F8FAFC | Texto principal      |
| text-secondary   | #94A3B8 | Texto secundário     |
| accent-50        | #451A03 | Fundo destacado      |
| accent-500       | #F59E0B | Cor de destaque      |
| accent-600       | #FBBF24 | Hover em destaque    |

### 4.3 Componente: ThemeProvider

```tsx
// components/providers/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
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

### 4.5 Tailwind Config

```js
// tailwind.config.js
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
        foreground: 'var(--color-text-primary)',
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

### 4.6 Theme Toggle (já incluso no Header)

```tsx
// No Header.tsx - toggle de tema
<button
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
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
```

### 4.7 Persistência

| Chave      | Valor                 | Descrição   |
| ---------- | --------------------- | ----------- |
| `gp-theme` | `'light'` \| `'dark'` | Tema salvo  |
| fallback   | `'light'`             | Tema padrão |

---

## 5. Fluxo de Estados

```
Carregando dados
      │
      ▼
┌────────────────┐
│   isLoading    │──── Sim ────► [SKELETON]
│   (true)       │
└────────────────┘
      │
      │ Não
      ▼
┌────────────────┐
│    Error?      │
└────────────────┘
      │
      ├── Sim ──► [ERROR BOUNDARY]
      │
      └── Não
           │
           ▼
      ┌────────────────┐
      │   hasData?     │
      └────────────────┘
           │
           ├── Sim ──► [CONTEÚDO]
           │
           └── Não ──► [EMPTY STATE]
```

---

## 6. Acessibilidade

### Skeleton

- [ ] Skeleton não deve ser focusável
- [ ] `aria-busy="true"` no container enquanto carrega
- [ ] Texto descritivo para screen readers
- [ ] Não usar apenas cor para indicar estado

### 404 Page

- [ ] Título da página descritivo
- [ ] Botões com labels claras
- [ ] Contraste adequado
- [ ] Keyboard navigation

### Error Boundary

- [ ] Mensagem de erro descritiva
- [ ] Botão de retry visível e acessível
- [ ] Contraste adequado
- [ ] Não expor stack traces em produção

### Dark Mode

- [ ] Contraste mínimo WCAG AA
- [ ] Ícone do toggle com `aria-label` descritivo
- [ ] Estado do tema anunciado pelo screen reader
- [ ] Não deve haver flash ao carregar (SSR)

---

## 7. Histórico de Versões

| Versão | Data       | Alterações                           |
| ------ | ---------- | ------------------------------------ |
| 1.0    | 25/03/2026 | Versão inicial baseada em wireframes |
