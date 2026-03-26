# Módulo 4: Áreas de Vida - Documentação UI/UX

**Versão:** 1.0  
**Data:** 25/03/2026  
**Wireframe:** `tracking/wireframes/modulo-03-areas-de-vida.md`

---

## 1. Visão Geral

O módulo de **Áreas de Vida** permite que os usuários organizem suas metas em categorias específicas de vida, facilitando o acompanhamento e a priorização de objetivos em diferentes dimensões pessoais e profissionais.

### 1.1 Fluxo de Navegação

```
/areas (Lista)
    │
    ├── [+ Nova Área] ──> (/areas/new)
    │
    ├── [Card Clique] ──> /areas/:id (Detalhe)
    │       │
    │       ├── [Editar] ──> /areas/:id/edit
    │       │       │
    │       │       ├── [Salvar] ──> /areas/:id
    │       │       │
    │       │       └── [Cancelar] ──> /areas/:id
    │       │
    │       ├── [Excluir] ──> Modal de Confirmação
    │       │       │
    │       │       ├── [Confirmar] ──> /areas
    │       │       │
    │       │       └── [Cancelar] ──> Fecha Modal
    │       │
    │       └── [Voltar] ──> /areas
    │
    └── [Excluir no Card] ──> Modal de Confirmação
```

---

## 2. Lista de Áreas de Vida

**Rota:** `/areas`  
**Método:** `GET`  
**Componente:** Server Component

### 2.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [GP] Goal Planner     [🔍 Buscar...]        [☀️/🌙] [👤]   │ ← Header
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Áreas de Vida                              [+ Nova Área]  │
│   Gerencie as categorias da sua vida                       │
│                                                             │
│   [🔍 Buscar áreas...]            [Filtrar: Todas ▼]       │
│                                                             │
│   ┌──────────────────────┐  ┌──────────────────────┐       │
│   │ ● CARREIRA           │  │ ● SAÚDE              │       │
│   │ 5 metas              │  │ 3 metas              │       │
│   │ ████████░░ 80%       │  │ ██████░░░░ 60%       │       │
│   │ [✏️] [🗑️]            │  │ [✏️] [🗑️]            │       │
│   └──────────────────────┘  └──────────────────────┘       │
│                                                             │
│   ┌──────────────────────┐  ┌──────────────────────┐       │
│   │ ● FINANÇAS           │  │ ● FAMÍLIA            │       │
│   │ 2 metas              │  │ 4 metas              │       │
│   │ ████░░░░░░ 40%       │  │ ███████░░░ 70%       │       │
│   │ [✏️] [🗑️]            │  │ [✏️] [🗑️]            │       │
│   └──────────────────────┘  └──────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Estrutura de Componentes

| Componente       | Tipo      | Descrição               |
| ---------------- | --------- | ----------------------- |
| `AreasListPage`  | Server    | Página principal        |
| `PageHeader`     | UI        | Título + descrição      |
| `SearchInput`    | Client    | Campo de busca          |
| `FilterDropdown` | Client    | Filtro por status       |
| `AreasGrid`      | Container | Grid responsivo         |
| `AreaCard`       | Card      | Card de área individual |
| `EmptyState`     | UI        | Estado vazio            |

### 2.3 Component: AreasListPage

```tsx
// app/areas/page.tsx
import { Suspense } from 'react';
import { AreasList } from './_components/AreasList';
import { AreasListSkeleton } from './_components/AreasListSkeleton';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata = {
  title: 'Áreas de Vida | Goal Planner',
  description: 'Gerencie as categorias da sua vida',
};

export default function AreasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Áreas de Vida"
        description="Gerencie as categorias da sua vida"
      />

      <Suspense fallback={<AreasListSkeleton />}>
        <AreasList />
      </Suspense>
    </div>
  );
}
```

### 2.4 Component: AreaCard

```tsx
// app/areas/_components/AreaCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { Area } from '@prisma/client';

interface AreaCardProps {
  area: Area & {
    _count: { goals: number };
    progress: number;
  };
  onDelete: (id: string) => void;
}

export function AreaCard({ area, onDelete }: AreaCardProps) {
  const router = useRouter();

  return (
    <div
      className="
        group relative bg-white dark:bg-neutral-900
        rounded-xl border border-neutral-200 dark:border-neutral-800
        p-5 cursor-pointer
        transition-all duration-200
        hover:shadow-lg hover:border-amber-500/50
        hover:-translate-y-1
      "
      onClick={() => router.push(`/areas/${area.id}`)}
    >
      {/* Indicador de cor */}
      <div
        className="absolute top-4 left-4 w-3 h-3 rounded-full"
        style={{ backgroundColor: area.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 pl-5">
        <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          {area.name}
        </h3>

        {/* Actions - appear on hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/areas/${area.id}/edit`);
            }}
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-amber-500 transition-colors"
            aria-label="Editar área"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(area.id);
            }}
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-red-500 transition-colors"
            aria-label="Excluir área"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <p className="text-sm text-neutral-500 mb-3 pl-5">
        {area._count.goals} {area._count.goals === 1 ? 'meta' : 'metas'}
      </p>

      {/* Progress Bar */}
      <div className="pl-5">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
          <span>Progresso</span>
          <span className="font-medium text-amber-600">{area.progress}%</span>
        </div>
        <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${area.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

### 2.5 Component: EmptyState

```tsx
// app/areas/_components/EmptyState.tsx
'use client';

import { Target, Plus } from 'lucide-react';
import Link from 'next/link';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
        <Target className="w-10 h-10 text-neutral-400" />
      </div>

      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        Nenhuma área cadastrada
      </h3>

      <p className="text-neutral-500 mb-6 max-w-sm">
        Comece criando categorias para organizar suas metas e acompanhar seu
        progresso.
      </p>

      <Link
        href="/areas/new"
        className="
          inline-flex items-center gap-2
          px-5 py-2.5 bg-amber-500 hover:bg-amber-600
          text-white font-medium rounded-lg
          transition-colors duration-200
          hover:shadow-lg hover:shadow-amber-500/25
        "
      >
        <Plus className="w-5 h-5" />
        Nova Área
      </Link>
    </div>
  );
}
```

### 2.6 Props & Interfaces

```typescript
// types/area.ts
interface Area {
  id: string;
  name: string;
  description: string | null;
  color: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    goals: number;
  };
  progress: number; // Calculated field (0-100)
}

interface AreasListProps {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
}
```

### 2.7 Estados

| Estado    | Descrição          | UI                         |
| --------- | ------------------ | -------------------------- |
| `loading` | Carregando áreas   | `<AreasListSkeleton />`    |
| `error`   | Erro na requisição | `<ErrorState />` com retry |
| `empty`   | Nenhuma área       | `<EmptyState />`           |
| `success` | Áreas carregadas   | Grid de `<AreaCard />`     |

---

## 3. Detalhe da Área de Vida

**Rota:** `/areas/[id]`  
**Método:** `GET /areas/[id]`  
**Componente:** Server Component

### 3.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Home > Áreas de Vida > Carreira           [Voltar]          │
│                                    [✏️ Editar] [🗑️]         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ● CARREIRA                                               │
│   Construir uma carreira sólida e satisfatória            │
│   Criada em: 15 de Janeiro de 2026                        │
│                                                             │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│   │Total   │ │Concluídas│ │Em Andam.│ │Atrasadas│          │
│   │   5    │ │   2    │ │   2    │ │   1    │              │
│   └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                             │
│   Progresso: ████████░░░░░░ 40%                           │
│                                                             │
│   ────────────────────────────────────────────────────     │
│                                                             │
│   Metas (Todas ▼)                      [+ Nova Meta]      │
│                                                             │
│   ☐ Tornar-se Engenheiro Senior                         │
│      Prazo: 31/12/2026    Alta prioridade                │
│                                                             │
│   ☑ Aprender nova tecnologia                              │
│      Prazo: 30/06/2026    Média prioridade               │
│                                                             │
│   ☐ Mentorar desenvolvedores júnior                       │
│      Prazo: 31/03/2026    Alta prioridade                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Estrutura de Componentes

| Componente       | Tipo      | Descrição                        |
| ---------------- | --------- | -------------------------------- |
| `AreaDetailPage` | Server    | Página de detalhe                |
| `Breadcrumb`     | UI        | Navegação hierárquica            |
| `StatsGrid`      | Container | Cards de estatísticas            |
| `StatCard`       | Card      | Card de estatística individual   |
| `ProgressBar`    | UI        | Barra de progresso geral         |
| `GoalsList`      | Container | Lista de metas                   |
| `GoalItem`       | Item      | Meta individual                  |
| `QuickAddGoal`   | Client    | Campo rápido para adicionar meta |

### 3.3 Component: StatsGrid

```tsx
// app/areas/[id]/_components/StatsGrid.tsx
import { Trophy, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface StatsGridProps {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

export function StatsGrid({
  total,
  completed,
  inProgress,
  overdue,
}: StatsGridProps) {
  const stats = [
    { label: 'Total', value: total, icon: Trophy, color: 'neutral' },
    {
      label: 'Concluídas',
      value: completed,
      icon: CheckCircle,
      color: 'green',
    },
    { label: 'Em Andamento', value: inProgress, icon: Clock, color: 'amber' },
    { label: 'Atrasadas', value: overdue, icon: AlertCircle, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="
              bg-white dark:bg-neutral-900
              rounded-xl border border-neutral-200 dark:border-neutral-800
              p-4 text-center
            "
          >
            <Icon className={`w-5 h-5 mx-auto mb-2 text-${stat.color}-500`} />
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {stat.value}
            </p>
            <p className="text-sm text-neutral-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
```

### 3.4 Component: GoalItem

```tsx
// app/areas/[id]/_components/GoalItem.tsx
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, AlertCircle, Clock } from 'lucide-react';

interface GoalItemProps {
  goal: {
    id: string;
    title: string;
    dueDate: Date | null;
    priority: 'low' | 'medium' | 'high';
    isCompleted: boolean;
  };
  onToggleComplete: (id: string) => void;
}

const priorityConfig = {
  low: { label: 'Baixa', color: 'neutral' },
  medium: { label: 'Média', color: 'amber' },
  high: { label: 'Alta', color: 'red' },
};

export function GoalItem({ goal, onToggleComplete }: GoalItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const priority = priorityConfig[goal.priority];
  const isOverdue =
    goal.dueDate && new Date(goal.dueDate) < new Date() && !goal.isCompleted;

  const handleToggle = async () => {
    setIsLoading(true);
    await onToggleComplete(goal.id);
    setIsLoading(false);
  };

  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-lg
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        hover:border-amber-500/30 transition-colors
        ${goal.isCompleted ? 'opacity-60' : ''}
      `}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`
          flex-shrink-0 w-5 h-5 rounded-md border-2
          flex items-center justify-center
          transition-all duration-200
          ${
            goal.isCompleted
              ? 'bg-amber-500 border-amber-500'
              : 'border-neutral-300 hover:border-amber-500'
          }
        `}
      >
        {goal.isCompleted && <Check className="w-3 h-3 text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${goal.isCompleted ? 'line-through text-neutral-500' : 'text-neutral-900 dark:text-neutral-100'}`}
        >
          {goal.title}
        </p>

        <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
          {goal.dueDate && (
            <span
              className={`flex items-center gap-1 ${isOverdue ? 'text-red-500' : ''}`}
            >
              {isOverdue ? (
                <AlertCircle className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              {format(new Date(goal.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
            </span>
          )}

          <span
            className={`
            px-2 py-0.5 rounded-full text-xs font-medium
            ${priority.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
            ${priority.color === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
            ${priority.color === 'neutral' ? 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400' : ''}
          `}
          >
            {priority.label} prioridade
          </span>
        </div>
      </div>
    </div>
  );
}
```

### 3.5 Component: QuickAddGoal

```tsx
// app/areas/[id]/_components/QuickAddGoal.tsx
'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface QuickAddGoalProps {
  areaId: string;
  onAdd: (title: string) => Promise<void>;
}

export function QuickAddGoal({ areaId, onAdd }: QuickAddGoalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    await onAdd(title.trim());
    setTitle('');
    setIsOpen(false);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="
          inline-flex items-center gap-2
          px-4 py-2 text-sm font-medium
          text-amber-600 bg-amber-50 dark:bg-amber-900/20
          rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40
          transition-colors
        "
      >
        <Plus className="w-4 h-4" />
        Nova Meta
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da meta..."
        className="
          flex-1 px-3 py-2 text-sm
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          rounded-lg focus:outline-none focus:border-amber-500
          placeholder:text-neutral-400
        "
        autoFocus
      />
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="
          px-3 py-2 bg-amber-500 hover:bg-amber-600
          text-white text-sm font-medium rounded-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Adicionar'}
      </button>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="
          px-3 py-2 text-neutral-500 hover:text-neutral-700
          text-sm transition-colors
        "
      >
        Cancelar
      </button>
    </form>
  );
}
```

---

## 4. Edição de Área de Vida

**Rota:** `/areas/[id]/edit`  
**Método:** `GET` + `PUT`  
**Componente:** Client Component (formulário)

### 4.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Home > Áreas de Vida > Carreira > Editar   [Voltar]        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Editar Área de Vida                                       │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ Nome *                                               │   │
│   │ [Carreira                                       ]    │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ Descrição                                            │   │
│   │ [Construir uma carreira sólida e satisfatória ]    │   │
│   │                                         (500 car)    │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Cor de Identificação                                      │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐                      │
│   │  │ │  │ │  │ │  │ │  │ │  │ │  │                      │
│   └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘                     │
│   (Azul selecionado)                                        │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ Status: Ativo  [○────●]                             │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   Metas Associadas (2)                                      │
│   • Tornar-se Engenheiro Senior                            │
│   • Aprender nova tecnologia                                │
│                                                             │
│        [Cancelar]          [Salvar Alterações]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Component: EditAreaForm

```tsx
// app/areas/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ColorPicker } from '@/components/ui/color-picker';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  description: string;
  color: string;
  isActive: boolean;
}

const COLORS = [
  { name: 'Azul', value: '#3B82F6' },
  { name: 'Verde', value: '#10B981' },
  { name: 'Amarelo', value: '#F59E0B' },
  { name: 'Laranja', value: '#F97316' },
  { name: 'Roxo', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Cinza', value: '#6B7280' },
];

export default function EditAreaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      color: '#3B82F6',
      isActive: true,
    },
  });

  const selectedColor = watch('color');

  useEffect(() => {
    // Fetch area data
    setIsLoading(true);
    fetch(`/api/areas/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setValue('name', data.name);
        setValue('description', data.description || '');
        setValue('color', data.color);
        setValue('isActive', data.isActive);
      })
      .finally(() => setIsLoading(false));
  }, [params.id, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    try {
      await fetch(`/api/areas/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      router.push(`/areas/${params.id}`);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </button>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Editar Área de Vida
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', {
              required: 'Nome é obrigatório',
              maxLength: 100,
            })}
            className="
              w-full px-4 py-2.5
              bg-white dark:bg-neutral-900
              border border-neutral-200 dark:border-neutral-800
              rounded-lg focus:outline-none focus:border-amber-500
              transition-colors
            "
            placeholder="Ex: Carreira, Saúde, Finanças..."
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Descrição <span className="text-neutral-400">(opcional)</span>
          </label>
          <textarea
            {...register('description', { maxLength: 500 })}
            rows={3}
            className="
              w-full px-4 py-2.5
              bg-white dark:bg-neutral-900
              border border-neutral-200 dark:border-neutral-800
              rounded-lg focus:outline-none focus:border-amber-500
              transition-colors resize-none
            "
            placeholder="Descreva o propósito desta área..."
          />
          <p className="mt-1 text-xs text-neutral-400 text-right">
            {watch('description')?.length || 0}/500 caracteres
          </p>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Cor de Identificação
          </label>
          <ColorPicker
            colors={COLORS}
            value={selectedColor}
            onChange={(color) => setValue('color', color)}
          />
        </div>

        {/* Status Toggle */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Status
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setValue('isActive', true)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  watch('isActive')
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                }
              `}
            >
              Ativo
            </button>
            <button
              type="button"
              onClick={() => setValue('isActive', false)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  !watch('isActive')
                    ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                }
              `}
            >
              Inativo
            </button>
          </div>
        </div>

        {/* Metas Associadas (readonly) */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Metas Associadas
          </h3>
          <div className="space-y-2">
            {/* Renderizar metas associadas - readonly */}
            <p className="text-sm text-neutral-500">Carregando metas...</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="
              flex-1 px-4 py-2.5
              border border-neutral-200 dark:border-neutral-700
              text-neutral-700 dark:text-neutral-300
              font-medium rounded-lg
              hover:bg-neutral-50 dark:hover:bg-neutral-800
              transition-colors
            "
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="
              flex-1 flex items-center justify-center gap-2
              px-4 py-2.5
              bg-amber-500 hover:bg-amber-600
              text-white font-medium rounded-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
```

### 4.3 Component: ColorPicker

```tsx
// components/ui/color-picker.tsx
interface ColorPickerProps {
  colors: { name: string; value: string }[];
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ colors, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onChange(color.value)}
          className={`
            w-8 h-8 rounded-full
            transition-all duration-200
            ${
              value === color.value
                ? 'ring-2 ring-offset-2 ring-amber-500 scale-110'
                : 'hover:scale-105'
            }
          `}
          style={{ backgroundColor: color.value }}
          aria-label={color.name}
          title={color.name}
        />
      ))}

      {/* Custom color input */}
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-full cursor-pointer opacity-0 absolute inset-0"
        />
        <div className="w-8 h-8 rounded-full border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center">
          <span className="text-xs text-neutral-400">+</span>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Modal de Confirmação de Exclusão

**Componente:** `<DeleteConfirmationModal />`

### 5.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│         ┌─────────────────────────────────┐                │
│         │                                 │                │
│         │      ⚠️                         │                │
│         │                                 │                │
│         │   Confirmar Exclusão            │                │
│         │                                 │                │
│         │   Tem certeza que deseja       │                │
│         │   excluir "Carreira"?           │                │
│         │                                 │                │
│         │   Esta ação não pode ser       │                │
│         │   desfeita. As 5 metas         │                │
│         │   associadas não serão         │                │
│         │   excluídas.                   │                │
│         │                                 │                │
│         │  [Cancelar]    [Excluir]       │                │
│         │                                 │                │
│         └─────────────────────────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Component: DeleteConfirmationModal

```tsx
// components/ui/delete-confirmation-modal.tsx
'use client';

import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  affectedItems?: string[];
  onConfirm: () => Promise<void>;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  title = 'Confirmar Exclusão',
  message,
  affectedItems,
  onConfirm,
}: DeleteConfirmationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao excluir:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          <p className="text-neutral-600 dark:text-neutral-400">{message}</p>

          {affectedItems && affectedItems.length > 0 && (
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-left">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Itens afetados:
              </p>
              <ul className="space-y-1">
                {affectedItems.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-neutral-500 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Excluir'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 6. Responsividade

### 6.1 Breakpoints

| Breakpoint       | Layout               |
| ---------------- | -------------------- |
| `< 640px`        | Lista única vertical |
| `640px - 1024px` | Grid 2 colunas       |
| `> 1024px`       | Grid 2-3 colunas     |

### 6.2 Grid Implementation

```tsx
// Grid responsivo
<div
  className="
  grid gap-4
  grid-cols-1        // Mobile
  sm:grid-cols-2     // Tablet
  lg:grid-cols-2     // Desktop
  xl:grid-cols-3     // Large
"
>
  {/* Cards */}
</div>
```

---

## 7. Validações

### 7.1 Formulário de Edição

| Campo     | Regra              | Mensagem                                      |
| --------- | ------------------ | --------------------------------------------- |
| Nome      | Obrigatório        | "Nome é obrigatório"                          |
| Nome      | Mín 2 caracteres   | "Nome deve ter pelo menos 2 caracteres"       |
| Nome      | Máx 100 caracteres | "Nome deve ter no máximo 100 caracteres"      |
| Descrição | Máx 500 caracteres | "Descrição deve ter no máximo 500 caracteres" |
| Cor       | Obrigatória        | Seleção obrigatória                           |
| Status    | Default: true      | -                                             |

---

## 8. Acessibilidade

- [ ] `role="region"` na página de lista
- [ ] `aria-label` em botões de ação
- [ ] `aria-current="page"` em breadcrumb
- [ ] `aria-live="polite"` em estados de loading
- [ ] Contraste WCAG AA
- [ ] Focus visible em todos os inputs
- [ ] Labels associados aos inputs
- [ ] Keyboard navigation completa

---

## 9. Testes Recomendados

| ID   | Caso               | Resultado                     |
| ---- | ------------------ | ----------------------------- |
| TC01 | Criar nova área    | Área aparece na lista         |
| TC02 | Editar área        | Alterações salvas             |
| TC03 | Excluir área       | Modal confirma, área removida |
| TC04 | Buscar área        | Lista filtra em tempo real    |
| TC05 | Filtrar por status | Apenas áreas do status shown  |
| TC06 | Mobile             | Layout responsivo funciona    |
| TC07 | Dark mode          | Cores adequadas               |

---

## 10. Histórico de Versões

| Versão | Data       | Alterações                           |
| ------ | ---------- | ------------------------------------ |
| 1.0    | 25/03/2026 | Versão inicial baseada em wireframes |
