# Wireframe: Error Boundary

**Módulo:** Layout  
**Arquivo:** `error-boundary.md`  
**Versão:** 1.0  
**Data:** 25/03/2026

---

## 1. Visão Geral

O **Error Boundary** é um componente React que intercepta erros de JavaScript em qualquer parte da árvore de componentes filhos, mostrando uma UI de fallback amigável em vez de/crash da aplicação.

Diferente da página 404 (para rotas inválidas), o Error Boundary captura erros de runtime (exceções não tratadas) nos componentes.

---

## 2. Especificações Técnicas

### 2.1 Comportamento

- Captura erros em componentes filhos
- Mantém o estado de erro até que seja resetado
- Permite ao usuário tentar novamente
- Pode ser configurado por rota (segmento)

### 2.2 Localização

No Next.js App Router, o arquivo `error.tsx` é automaticamente um Error Boundary:

```
app/
├── layout.tsx
├── page.tsx
├── error.tsx          ← Error Boundary para esta rota
├── dashboard/
│   ├── page.tsx
│   └── error.tsx      ← Error Boundary específico
└── ...
```

---

## 3. Layout

### 3.1 Wireframe Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│                          ⚠️                                 │
│                                                             │
│                    Algo deu errado                          │
│                                                             │
│      Pedimos desculpas, mas ocorreu um erro inesperado     │
│               ao carregar esta página.                     │
│                                                             │
│    ┌─────────────────────────────────────────────────┐      │
│    │              Tentar novamente                   │      │
│    └─────────────────────────────────────────────────┘      │
│                                                             │
│          Erro: [mensagem de erro (opcional)]              │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Detalhamento

```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │                        ⚠️                          │    │  ← Ícone (AlertTriangle)
│  │                        80px                        │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│              Algo deu errado                               │  ← Título
│                                                             │
│   Pedimos desculpas, mas ocorreu um erro inesperado        │  ← Descrição
│            ao carregar esta página.                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Tentar novamente                      │    │  ← Botão Retry
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│          Erro: Something went wrong...                     │  ← Debug (opcional)
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Componentes

### 4.1 Ícone

- **Ícone:** AlertTriangleIcon
- **Tamanho:** 80px
- **Cor:** `red-500` ou `amber-500`

### 4.2 Título

- **Texto:** "Algo deu errado"
- **Tamanho:** 24px
- **Cor:** `text-primary`

### 4.3 Descrição

- **Texto:** "Pedimos desculpas, mas ocorreu um erro inesperado ao carregar esta página."
- **Tamanho:** 16px
- **Cor:** `text-secondary`

### 4.4 Botão Retry

- **Texto:** "Tentar novamente"
- **Ícone:** RefreshIcon (opcional)
- **Ação:** Chama `reset()` para tentar renderizar novamente

### 4.5 Mensagem de Erro (Debug)

- Visível apenas em desenvolvimento
- Opcional em produção (via flag)

---

## 5. Implementação

### 5.1 Error Boundary (Next.js)

```tsx
// app/error.tsx
'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: Log do erro para um serviço de monitoramento
    console.error('Application error:', error);
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

        {/* Botão Retry */}
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Tentar novamente
        </button>

        {/* Debug info - apenas em desenvolvimento */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400 font-mono">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 5.2 Versão com Suporte a Error Digest

```tsx
// app/error.tsx (versão mais completa)
'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Bug } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log para serviço de monitoramento (Sentry, etc.)
    console.error('Error boundary triggered:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="w-20 h-20 mx-auto text-red-500 mb-6" />

        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Algo deu errado
        </h2>

        <p className="text-neutral-500 mb-6">
          Pedimos desculpas, mas ocorreu um erro inesperado ao carregar esta
          página.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Tentar novamente
          </button>

          <button
            onClick={() => (window.location.href = '/dashboard')}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground font-medium rounded-lg transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>

        {/* Detalhes do erro (development only) */}
        {(process.env.NODE_ENV === 'development' || showDetails) && (
          <div className="mt-6 text-left">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-neutral-500 hover:text-foreground flex items-center gap-1 mb-2"
            >
              <Bug className="w-4 h-4" />
              {showDetails ? 'Ocultar' : 'Mostrar'} detalhes do erro
            </button>

            {showDetails && (
              <pre className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs overflow-auto max-h-40">
                {error.message}
                {'\n'}
                {error.digest && `Digest: ${error.digest}`}
                {'\n'}
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 5.3 Global Error (Erros não capturados)

```tsx
// app/global-error.tsx
// Este componente captura erros que o error.tsx não consegue

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
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Algo deu muito errado</h2>
            <p className="mb-4">Por favor, recarregue a página.</p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-amber-500 text-white rounded"
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

---

## 6. Estados

### 6.1 Estado Inicial

- Erro capturado
- UI de fallback exibida
- Botão de retry disponível

### 6.2 Estado de Reset

- Usuário clicou em retry
- Componente tenta renderizar novamente
- Se sucesso, retorna ao conteúdo normal
- Se erro, mantém UI de fallback

---

## 7. Fluxo de Funcionamento

```
Erro ocorre em componente
          │
          ▼
┌─────────────────────────┐
│   Error Boundary        │
│   (error.tsx)          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Exibe UI de fallback │
│   com botão retry      │
└────────────┬────────────┘
             │
      ┌──────┴──────┐
      │             │
  [Retry]      [Navegar]
      │             │
      ▼             ▼
  Re-render    Dashboard
  componente      ou Home
```

---

## 8. Diferença entre Error Types

| Tipo         | Arquivo            | O que captura                   |
| ------------ | ------------------ | ------------------------------- |
| 404          | `not-found.tsx`    | Rotas que não existem           |
| Error        | `error.tsx`        | Erros de runtime em componentes |
| Global Error | `global-error.tsx` | Erros não capturados (root)     |

---

## 9. Acessibilidade

- [ ] Mensagem de erro descritiva
- [ ] Botão de retry visível e acessível
- [ ] Contraste adequado
- [ ] ARIA live region para announcements
- [ ] Não expor stack traces em produção

---

## 10. Testes

| ID   | Caso                      | Resultado Esperado            |
| ---- | ------------------------- | ----------------------------- |
| TC01 | Erro em componente        | UI de fallback exibida        |
| TC02 | Clicar "Tentar novamente" | Componente re-renderiza       |
| TC03 | Erro persiste             | Mantém UI de fallback         |
| TC04 | Acessar rota inexistente  | 404 page (não error boundary) |
| TC05 | Erro não tratadas         | Global error boundary         |

---

## 11. Histórico de Versões

| Versão | Data       | Alterações     |
| ------ | ---------- | -------------- |
| 1.0    | 25/03/2026 | Versão inicial |

---

**Fim do documento**
