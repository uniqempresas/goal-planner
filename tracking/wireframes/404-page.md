# Wireframe: Página 404

**Módulo:** Layout  
**Arquivo:** `404-page.md`  
**Versão:** 1.0  
**Data:** 25/03/2026

---

## 1. Visão Geral

A **Página 404** é exibida quando o usuário tenta acessar uma rota que não existe no sistema. Ela fornece feedback claro sobre o erro e oferece ações para o usuário voltar a um local válido.

---

## 2. Especificações Técnicas

### 2.1 Dimensões

| Propriedade          | Valor |
| -------------------- | ----- |
| Container max-width  | 480px |
| Padding              | 24px  |
| Gap entre elementos  | 16px  |
| Tamanho do ícone     | 80px  |
| Tamanho do texto 404 | 72px  |

### 2.2 Posicionamento

- Centralizado vertical e horizontalmente
- Background: cor de fundo padrão do app

---

## 3. Layout

### 3.1 Wireframe Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
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
│    ┌─────────────────────────────────────────────────┐    │
│    │          Voltar ao Dashboard                    │    │
│    └─────────────────────────────────────────────────┘    │
│                                                             │
│    ┌─────────────────────────────────────────────────┐    │
│    │                 Ir para Home                    │    │
│    └─────────────────────────────────────────────────┘    │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Detalhamento

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │                     🔍                              │   │  ← Ícone (Search ou Warning)
│  │                                                     │   │
│  │                  404                                 │   │  ← Código de erro
│  │                                                     │   │
│  │            Página não encontrada                   │   │  ← Título
│  │                                                     │   │
│  │    A página que você está procurando não          │   │  ← Descrição
│  │    existe ou foi movida para outro lugar.         │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Voltar ao Dashboard                    │   │  ← Botão Primário
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Ir para Home                        │   │  ← Botão Secundário
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Componentes

### 4.1 Ícone

- **Ícone:** SearchIcon ou FrownIcon
- **Tamanho:** 80px
- **Cor:** `neutral-300` (light) / `neutral-600` (dark)

### 4.2 Título

- **Texto:** "404" (grande) + "Página não encontrada"
- **Tamanho:** 72px para "404", 24px para o resto

### 4.3 Descrição

- **Texto:** "A página que você está procurando não existe ou foi movida para outro lugar."
- **Tamanho:** 16px
- **Cor:** `neutral-500`

### 4.4 Botões

| Botão               | Tipo       | Ação                            |
| ------------------- | ---------- | ------------------------------- |
| Voltar ao Dashboard | Primário   | `router.back()` ou `/dashboard` |
| Ir para Home        | Secundário | `/dashboard`                    |

---

## 5. Implementação

### 5.1 Página 404 (Next.js App Router)

```tsx
// app/[...not-found]/page.tsx
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

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
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Voltar ao Dashboard
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground font-medium rounded-lg transition-colors"
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

### 5.2 Configuração no Next.js

```tsx
// app/not-found.tsx
// Este arquivo é automaticamente renderizado quando
// uma rota não é encontrada

import { notFound } from 'next/navigation';

export default function NotFound() {
  notFound();
}
```

### 5.3 Versão com Botão Voltar

```tsx
// Com botão "Voltar" que usa history
'use client';

import { useRouter } from 'next/navigation';

export function NotFound() {
  const router = useRouter();

  return (
    <div className="...">
      {/* ... conteúdo ... */}

      <button
        onClick={() => router.back()}
        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </button>
    </div>
  );
}
```

---

## 6. Estados

### 6.1 Estado Padrão

- Exibe mensagem padrão
- Botões funcionam normalmente

### 6.2 Estado de Carregamento (se aplicável)

- Se usado com redirect, mostra spinner briefly

---

## 7. Fluxo de Navegação

```
Usuário acessa URL inválida
           │
           ▼
    ┌─────────────┐
    │   404 Page  │
    └──────┬──────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
[Dashboard]    [Home]
     │           │
     └─────┬─────┘
           │
           ▼
    Conteúdo válido
```

---

## 8. Considerações de SEO

### 8.1 Meta Tags

```tsx
// app/not-found.tsx
export const metadata = {
  title: '404 - Página não encontrada | Goal Planner',
  description: 'A página que você está procurando não existe.',
};
```

### 8.2 Status Code

A página 404 deve retornar status HTTP 404 (não 200):

```tsx
// next.config.js
// ou
// A função notFound() do Next.js já faz isso automaticamente
```

---

## 9. Acessibilidade

- [ ] Título da página deve ser descritivo
- [ ] Botões com labels claras
- [ ] Contraste adequado entre texto e fundo
- [ ] Suporte a keyboard navigation
- [ ] Screen reader announce do erro

---

## 10. Testes

| ID   | Caso                         | Resultado Esperado          |
| ---- | ---------------------------- | --------------------------- |
| TC01 | Acessar URL inexistente      | Página 404 exibida          |
| TC02 | Clicar "Voltar ao Dashboard" | Redireciona para /dashboard |
| TC03 | Clicar "Ir para Home"        | Redireciona para /          |
| TC04 | Verificar status code        | Retorna 404                 |
| TC05 | Tela mobile                  | Layout responsivo           |

---

## 11. Histórico de Versões

| Versão | Data       | Alterações     |
| ------ | ---------- | -------------- |
| 1.0    | 25/03/2026 | Versão inicial |

---

**Fim do documento**
