# Wireframe: Loading / Skeleton

**Módulo:** Layout  
**arquivo:** `loading-skeleton.md`  
**Versão:** 1.0  
**Data:** 25/03/2026

---

## 1. Visão Geral

O componente **Skeleton** é utilizado para indicar carregamento de conteúdo na interface. Ele substitui os dados reais durante o carregamento, proporcionando feedback visual ao usuário enquanto a informação é buscada.

---

## 2. Especificações Técnicas

### 2.1 Dimensões

| Propriedade          | Valor                     |
| -------------------- | ------------------------- |
| Animação             | Pulse (suave)             |
| Duração              | 1.5s por ciclo            |
| Cor base (light)     | #E2E8F0                   |
| Cor base (dark)      | #334155                   |
| Cor destaque (light) | #F1F5F9                   |
| Cor destaque (dark)  | #475569                   |
| Border-radius        | 4px (padrão), 8px (cards) |

### 2.2 Animação

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton {
  animation: pulse 1.5s ease-in-out infinite;
}
```

---

## 3. Componentes de Skeleton

### 3.1 Skeleton de Card

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │                                 │ │  ← Imagem (opcional)
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ████████████████████████████████   │  ← Título
│                                     │
│ ████████████████████████████████   │  ← Texto linha 1
│ ████████████████████████████████   │  ← Texto linha 2
│ ███████████████████████            │  ← Texto linha 3
│                                     │
│ ████████                           │  ← Badge/Ação
└─────────────────────────────────────┘
```

### 3.2 Skeleton de Lista

```
┌─────────────────────────────────────┐
│ ┌──────┐  █████████████████████   │
│ │ IMG  │  ████████████████████     │
│ └──────┘  ████████                 │
│           ─────────────────────     │
│ ┌──────┐  █████████████████████   │
│ │ IMG  │  ████████████████████     │
│ └──────┘  ████████                 │
│           ─────────────────────     │
│ ┌──────┐  █████████████████████   │
│ │ IMG  │  ████████████████████     │
│ └──────┘  ████████                 │
└─────────────────────────────────────┘
```

### 3.3 Skeleton de Texto

```
┌─────────────────────────────────────┐
│ ████████████████████████████████    │
│ ████████████████████████████████    │
│ ████████████████████████           │
└─────────────────────────────────────┘

         ou

│ ████ │ ████████ │ ████████████ │
```

### 3.4 Skeleton de Avatar

```
┌──────┐
│      │
│  ○   │  ← Círculo
│      │
└──────┘
  40px
```

---

## 4. Implementação

### 4.1 Componente Skeleton Base

```tsx
// components/ui/Skeleton.tsx
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse rounded
        bg-neutral-200 dark:bg-neutral-700
        ${className}
      `}
    />
  );
}
```

### 4.2 Card Skeleton

```tsx
// components/skeletons/CardSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-border p-4">
      {/* Imagem opcional */}
      <Skeleton className="w-full h-48 rounded-lg mb-4" />

      {/* Título */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Texto */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />

      {/* Badge/Ação */}
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
  );
}
```

### 4.3 Lista Skeleton

```tsx
// components/skeletons/ListSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          {/* Avatar/Thumbnail */}
          <Skeleton className="w-12 h-12 rounded-full" />

          {/* Texto */}
          <div className="flex-1">
            <Skeleton className="h-5 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 4.4 Tabela Skeleton

```tsx
// components/skeletons/TableSkeleton.tsx
import { Skeleton } from '@/components/ui/Skeleton';

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-t border-border">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}
```

---

## 5. Estados de Conteúdo

### 5.1 Loading (Esqueleto)

Utilizado enquanto os dados estão sendo carregados:

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │         [SKELETON]             │ │
│ └─────────────────────────────────┘ │
│                                     │
│         Carregando dados...         │
└─────────────────────────────────────┘
```

### 5.2 Error (Erro)

Utilizado quando há falha no carregamento:

```
┌─────────────────────────────────────┐
│                                     │
│              ⚠️                     │
│                                     │
│    Não foi possível carregar        │
│         os dados.                   │
│                                     │
│         [Tentar novamente]          │
│                                     │
└─────────────────────────────────────┘
```

### 5.3 Empty (Vazio)

Utilizado quando não há dados para exibir:

```
┌─────────────────────────────────────┐
│                                     │
│              📭                    │
│                                     │
│       Nenhum item encontrado        │
│                                     │
│    Comece criando uma nova meta!    │
│                                     │
│         [+ Nova Meta]              │
│                                     │
└─────────────────────────────────────┘
```

### 5.4 Success (Sucesso)

Dados carregados normalmente:

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │         [CONTEÚDO]              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 6. Fluxo de Estados

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
      ├── Sim ──► [MENSAGEM DE ERRO]
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
           └── Não ──► [ESTADO VAZIO]
```

---

## 7. Exemplo de Uso com React Query

```tsx
// Exemplo com React Query
import { useQuery } from '@tanstack/react-query';
import { CardSkeleton } from './skeletons/CardSkeleton';

function MetasList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['metas'],
    queryFn: fetchMetas,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Erro ao carregar: {error.message}</p>
        <button onClick={() => refetch()} className="mt-4">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-8">
        <p>Nenhuma meta encontrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((meta) => (
        <MetaCard key={meta.id} meta={meta} />
      ))}
    </div>
  );
}
```

---

## 8. Acessibilidade

- [ ] Skeleton não deve ser focusável
- [ ] Usar `aria-busy="true"` no container enquanto carrega
- [ ] Adicionar texto descritivo para screen readers (ex: "Carregando...")
- [ ] Não usar apenas cor para indicar estado

---

## 9. Testes

| ID   | Caso                      | Resultado Esperado             |
| ---- | ------------------------- | ------------------------------ |
| TC01 | Carregar página com dados | Skeleton visível brevemente    |
| TC02 | Carregar página sem dados | Estado vazio exibido           |
| TC03 | Erro na requisição        | Mensagem de erro exibida       |
| TC04 | Animação em loop          | Skeleton pulsa continuamente   |
| TC05 | Dark mode                 | Cores adequadas no tema escuro |

---

## 10. Histórico de Versões

| Versão | Data       | Alterações     |
| ------ | ---------- | -------------- |
| 1.0    | 25/03/2026 | Versão inicial |

---

**Fim do documento**
