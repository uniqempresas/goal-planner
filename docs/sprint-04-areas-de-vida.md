# Documentação Sprint 4: Áreas de Vida

## Visão Geral

Esta documentação detalha a implementação dos componentes e páginas da Sprint 4 - Áreas de Vida do Goal Planner. O módulo permite que os usuários organizem suas metas em categorias específicas de vida, facilitando o acompanhamento e a priorização de objetivos em diferentes dimensões pessoais e profissionais.

**Wireframes de Referência:** `tracking/wireframes/modulo-03-areas-de-vida.md`

---

## 1. Lista de Áreas de Vida

### 1.1 Informações Gerais

| Atributo           | Detalhe                            |
| ------------------ | ---------------------------------- |
| **Nome da Página** | Lista de Áreas de Vida             |
| **Rota**           | `/areas`                           |
| **Tipo de Página** | Listagem (Server/Client Component) |
| **Responsável**    | Frontend Developer                 |

### 1.2 Descrição Funcional

Página principal do módulo de Áreas de Vida que exibe todas as áreas cadastradas pelo usuário em um grid responsivo. Permite filtrar, buscar e navegar para detalhes de cada área.

### 1.3 Estrutura de Layout

```
┌────────────────────────────────────────────────────────────────┐
│  HEADER                                                        │
│  [Logo]  Dashboard | Metas | Áreas | Relatórios    [Avatar]  │
├────────────────────────────────────────────────────────────────┤
│  CONTENT (max-width: 1200px, centered)                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Page Header                                             │ │
│  │  ├─ Título: "Áreas de Vida"                             │ │
│  │  └─ Subtítulo: "Gerencie as categorias da sua vida"    │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Toolbar                                                 │ │
│  │  ├─ Search Input (busca por nome)                       │ │
│  │  └─ Filter Dropdown (Todas/Ativas/Inativas)             │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Grid (2 cols desktop, 1 col mobile)                     │ │
│  │  ┌─────────────┐  ┌─────────────┐                        │ │
│  │  │  AreaCard   │  │  AreaCard   │                        │ │
│  │  └─────────────┘  └─────────────┘                        │ │
│  │  ┌─────────────┐  ┌─────────────┐                        │ │
│  │  │  AreaCard   │  │  AreaCard   │                        │ │
│  │  └─────────────┘  └─────────────┘                        │ │
│  └──────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────┤
│  FOOTER                                                        │
│  Suporte | Termos | Privacidade    © 2026 Goal Planner       │
└────────────────────────────────────────────────────────────────┘
```

### 1.4 Componentes UI Necessários (shadcn/ui)

| Componente     | Utilização                         | Props Importantes                  |
| -------------- | ---------------------------------- | ---------------------------------- |
| `Button`       | Botão "Nova Área", ações nos cards | `variant`, `size`, `icon`          |
| `Input`        | Campo de busca                     | `placeholder`, `value`, `onChange` |
| `Select`       | Filtro de status                   | `options`, `value`, `onChange`     |
| `Card`         | Container do card de área          | `className`                        |
| `CardHeader`   | Cabeçalho do card                  | -                                  |
| `CardTitle`    | Nome da área                       | -                                  |
| `CardContent`  | Corpo do card                      | -                                  |
| `Badge`        | Status da área                     | `variant`                          |
| `Progress`     | Barra de progresso                 | `value`, `max`                     |
| `Avatar`       | Avatar do usuário no header        | `image`, `fallback`                |
| `DropdownMenu` | Menu do usuário                    | -                                  |
| `Separator`    | Divisões visuais                   | -                                  |
| `Skeleton`     | Loading state dos cards            | `className`                        |
| `Tooltip`      | Tooltips nos ícones de ação        | -                                  |

### 1.5 Interações do Usuário

| Ação                              | Comportamento        | Resultado                          |
| --------------------------------- | -------------------- | ---------------------------------- |
| Clicar em "Nova Área"             | Navegação            | Redireciona para `/areas/new`      |
| Clicar no Card                    | Navegação            | Redireciona para `/areas/:id`      |
| Clicar no ícone de editar (card)  | Navegação            | Redireciona para `/areas/:id/edit` |
| Clicar no ícone de excluir (card) | Abre modal           | Abre `DeleteConfirmModal`          |
| Digitar no campo de busca         | Filtro em tempo real | Filtra áreas por nome              |
| Selecionar filtro                 | Filtro por status    | Mostra áreas conforme status       |
| Hover no card                     | Efeito visual        | Elevação, borda destacada          |

### 1.6 Estados da Página

#### Estado de Carregamento (Loading)

- Exibir `Skeleton` no lugar de cada Card
- Dimensões: 280px x 180px (aproximadamente)
- Animação de pulso suave
- Duração: enquanto dados são carregados

#### Estado Vazio (Empty)

- Ilustração SVG/Icone de pasta vazia
- Texto: "Nenhuma área cadastrada"
- Subtítulo: "Comece criando sua primeira área de vida"
- Botão: "Criar Primeira Área"

#### Estado de Erro (Error)

- Mensagem de erro amigável
- Botão "Tentar novamente"
- Ícone de alerta

#### Estado de Sucesso (Success)

- Lista de cards normalmente
- Toast de feedback após operações (criar/editar/excluir)

---

## 2. Card de Área (AreaCard)

### 2.1 Informações Gerais

| Atributo               | Detalhe                            |
| ---------------------- | ---------------------------------- |
| **Nome do Componente** | AreaCard                           |
| **Tipo**               | Componente Reutilizável            |
| **Props**              | `area: Area`, `onEdit`, `onDelete` |

### 2.2 Estrutura do Componente

```
┌─────────────────────────────────────────┐
│  ■ [Nome da Área]              [⋮]     │
│    (cor de identificação左侧)                    │
│                                         │
│  [Quantidade] metas                    │
│                                         │
│  ████████████░░░░ 75%                  │
│  (ProgressBar)                         │
│                                         │
│  [✏️ Editar] [🗑️ Excluir]            │
└─────────────────────────────────────────┘
```

### 2.3 Interface TypeScript

```typescript
interface AreaCardProps {
  area: {
    id: string;
    name: string;
    description?: string;
    color: string;
    icon?: string;
    goalsCount: number;
    completedGoalsCount: number;
    progress: number;
    status: 'active' | 'inactive';
    createdAt: Date;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}
```

### 2.4 Componentes UI shadcn/ui

| Componente      | Utilização          |
| --------------- | ------------------- |
| `Card`          | Container principal |
| `CardHeader`    | Nome e menu         |
| `CardContent`   | Informações da área |
| `CardFooter`    | Ações               |
| `Progress`      | Barra de progresso  |
| `Button` (icon) | Editar/Excluir      |
| `DropdownMenu`  | Menu de ações       |

### 2.5 Estilização

- **Borda esquerda:** 4px solid com a cor da área
- **Border radius:** 12px (moderno)
- **Sombra:** `shadow-sm`, hover: `shadow-md`
- **Transição:** 200ms ease-in-out

---

## 3. Modal de Confirmação de Exclusão

### 3.1 Informações Gerais

| Atributo               | Detalhe                       |
| ---------------------- | ----------------------------- |
| **Nome do Componente** | DeleteConfirmModal            |
| **Tipo**               | Componente de Dialog          |
| **Rota**               | Modal overlay (qualquer tela) |

### 3.2 Descrição Funcional

Modal de confirmação que aparece antes de excluir uma área. Evita exclusões acidentais e informa o usuário sobre as consequências.

### 3.3 Estrutura do Componente

```
┌────────────────────────────────────────────────┐
│                                                │
│         ┌────────────────────────────────┐     │
│         │                                │     │
│         │           ⚠️                   │     │
│         │                                │     │
│         │    Confirmar Exclusão         │     │
│         │                                │     │
│         │  Tem certeza que deseja      │     │
│         │  excluir "[Nome da Área]"?    │     │
│         │                                │     │
│         │  Esta ação não pode ser      │     │
│         │  desfeita. As [N] metas      │     │
│         │  associadas não serão        │     │
│         │  excluídas.                  │     │
│         │                                │     │
│         │  [Cancelar]    [Excluir]     │     │
│         │                                │     │
│         └────────────────────────────────┘     │
│                                                │
└────────────────────────────────────────────────┘
```

### 3.4 Componentes UI Necessários (shadcn/ui)

| Componente             | Utilização                        |
| ---------------------- | --------------------------------- |
| `Dialog`               | Container do modal                |
| `DialogTrigger`        | Botão que abre (opcional)         |
| `DialogContent`        | Corpo do modal                    |
| `DialogHeader`         | Cabeçalho                         |
| `DialogTitle`          | Título                            |
| `DialogDescription`    | Mensagem explicativa              |
| `DialogFooter`         | Botões de ação                    |
| `Button`               | Confirmar (destructive), Cancelar |
| `AlertCircle` (Lucide) | Ícone de alerta                   |

### 3.5 Interface TypeScript

```typescript
interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  affectedItems?: number;
  onConfirm: () => void;
  isLoading?: boolean;
}
```

### 3.6 Interações do Usuário

| Ação                 | Comportamento                              |
| -------------------- | ------------------------------------------ |
| Clicar em "Excluir"  | Executa exclusão, fecha modal, redireciona |
| Clicar em "Cancelar" | Fecha modal sem ação                       |
| Clicar no backdrop   | Fecha modal                                |
| Pressionar Escape    | Fecha modal                                |
| Durante loading      | Botão desabilitado com spinner             |

---

## 4. Detalhe da Área de Vida

### 4.1 Informações Gerais

| Atributo           | Detalhe                 |
| ------------------ | ----------------------- |
| **Nome da Página** | Detalhe da Área de Vida |
| **Rota**           | `/areas/:id`            |
| **Tipo de Página** | Server/Client Component |

### 4.2 Descrição Funcional

Página de visualização detalhada de uma área específica, incluindo estatísticas, progresso e lista de metas associadas.

### 4.3 Estrutura de Layout

```
┌────────────────────────────────────────────────────────────────┐
│  HEADER                                                        │
│  [Logo]  Dashboard | Metas | Áreas | Relatórios    [Avatar]  │
├────────────────────────────────────────────────────────────────┤
│  BREADCRUMB                                                    │
│  Home > Áreas de Vida > [Nome da Área]          [Voltar]      │
├────────────────────────────────────────────────────────────────┤
│  CONTENT (max-width: 1000px, centered)                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Area Header                                              │ │
│  │  ├─ ■ [Nome da Área]                                     │ │
│  │  ├─ Descrição                                            │ │
│  │  └─ "Criada em: [Data]"                                  │ │
│  │                                                           │ │
│  │  [✏️ Editar] [🗑️ Excluir]                              │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Stats Grid (4 cols)                                      │ │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                        │ │
│  │  │Total│ │Concl.│ │Andam.│ │Atras.│                       │ │
│  │  │  5  │ │  2  │ │  2  │ │  1  │                        │ │
│  │  └─────┘ └─────┘ └─────┘ └─────┘                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Progress Section                                        │ │
│  │  Progresso: ██████████░░░░░░░ 40%                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Goals Section                                            │ │
│  │  ├─ Filter Tabs (Todas/Ativas/Concluídas)               │ │
│  │  └─ [+ Nova Meta]                                        │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Goal Item                                            │ │ │
│  │  │ ☐ [Título da Meta]                    [Editar]     │ │ │
│  │  │    Prazo: [Data] | Prioridade: [Alta/Média/Baixa] │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### 4.4 Componentes UI Necessários (shadcn/ui)

| Componente    | Utilização                         |
| ------------- | ---------------------------------- |
| `Breadcrumb`  | Navegação estrutural               |
| `Button`      | Ações (Editar, Excluir, Nova Meta) |
| `Card`        | Container de estatísticas          |
| `CardContent` | Valor da estatística               |
| `Progress`    | Barra de progresso                 |
| `Checkbox`    | Marcar meta como concluída         |
| `Badge`       | Prioridade, status                 |
| `Tabs`        | Filtrar metas por status           |
| `Separator`   | Divisões                           |

### 4.5 Estados da Página

| Estado      | Descrição                    | Componente                |
| ----------- | ---------------------------- | ------------------------- |
| Loading     | Skeleton dos cards e lista   | `Skeleton`                |
| Empty Goals | Nenhuma meta na área         | Empty State + Botão criar |
| Error       | Erro ao carregar             | Mensagem + retry          |
| Success     | Dados carregados normalmente | -                         |

---

## 5. Edição de Área de Vida

### 5.1 Informações Gerais

| Atributo           | Detalhe                       |
| ------------------ | ----------------------------- |
| **Nome da Página** | Editar Área de Vida           |
| **Rota**           | `/areas/:id/edit`             |
| **Tipo de Página** | Formulário (Client Component) |

### 5.2 Descrição Funcional

Formulário para editar uma área existente, incluindo nome, descrição, cor e status.

### 5.3 Estrutura de Layout

```
┌────────────────────────────────────────────────────────────────┐
│  HEADER                                                        │
│  [Logo]  Dashboard | Metas | Áreas | Relatórios    [Avatar]  │
├────────────────────────────────────────────────────────────────┤
│  BREADCRUMB                                                    │
│  Home > Áreas de Vida > [Nome] > Editar         [Voltar]      │
├────────────────────────────────────────────────────────────────┤
│  CONTENT (max-width: 600px, centered)                          │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Page Title: "Editar Área de Vida"                      │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Form                                                    │ │
│  │  ├─ Nome *                                              │ │
│  │  │  [________________________]                           │ │
│  │  │                                                       │ │
│  │  ├─ Descrição                                           │ │
│  │  │  [________________________]                           │ │
│  │  │  (500 caracteres)                                    │ │
│  │  │                                                       │ │
│  │  ├─ Cor de Identificação                                │ │
│  │  │  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐  [+ Custom]   │ │
│  │  │  │  │ │  │ │  │ │  │ │  │ │  │ │  │               │ │
│  │  │  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘               │ │
│  │  │  (Selecionado: Azul)                                 │ │
│  │  │                                                       │ │
│  │  ├─ Status                                              │ │
│  │  │  Ativo  [○────●]                                     │ │
│  │  │                                                       │ │
│  │  ├─ Metas Associadas (N)                                │ │
│  │  │  • Meta 1                                            │ │
│  │  │  • Meta 2                                            │ │
│  │  │  (somente visualização)                             │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Form Actions                                           │ │
│  │  [Cancelar]              [Salvar Alterações]           │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### 5.4 Campos do Formulário

| Campo     | Tipo         | Obrigatório | Validação                 | Padrão         |
| --------- | ------------ | ----------- | ------------------------- | -------------- |
| Nome      | Text         | Sim         | Min 2, máx 100 caracteres | -              |
| Descrição | Textarea     | Não         | Máx 500 caracteres        | -              |
| Cor       | Color Picker | Sim         | Predefined ou hex custom  | Azul (#3B82F6) |
| Status    | Toggle       | Sim         | Ativo/Inativo             | Ativo          |

### 5.5 Cores Predefinidas

| Nome    | Hexadecimal | Emoção                        |
| ------- | ----------- | ----------------------------- |
| Azul    | `#3B82F6`   | Profissional, confiança       |
| Verde   | `#10B981`   | Crescimento, saúde            |
| Amarelo | `#F59E0B`   | Energia, cautela              |
| Laranja | `#F97316`   | Motivação, ação               |
| Roxo    | `#8B5CF6`   | Criatividade, espiritualidade |
| Pink    | `#EC4899`   | Amor, relacionamentos         |
| Cinza   | `#6B7280`   | Neutro, geral                 |

### 5.6 Componentes UI Necessários (shadcn/ui)

| Componente    | Utilização              |
| ------------- | ----------------------- |
| `Breadcrumb`  | Navegação estrutural    |
| `Button`      | Ações do formulário     |
| `Input`       | Campo de nome           |
| `Textarea`    | Campo de descrição      |
| `Label`       | Labels dos campos       |
| `Switch`      | Toggle de status        |
| `Card`        | Container do formulário |
| `CardHeader`  | Título do formulário    |
| `CardContent` | Campos do formulário    |
| `CardFooter`  | Botões de ação          |
| `Separator`   | Divisões                |

### 5.7 Interface TypeScript

```typescript
interface EditAreaFormProps {
  area: Area;
  onSubmit: (data: AreaFormData) => Promise<void>;
  onCancel: () => void;
}

interface AreaFormData {
  name: string;
  description?: string;
  color: string;
  status: 'active' | 'inactive';
}
```

### 5.8 Estados do Formulário

| Estado     | Descrição          | Visual                                 |
| ---------- | ------------------ | -------------------------------------- |
| Idle       | Pronto para edição | Campos vazios/preenchidos              |
| Submitting | Enviando dados     | Spinner no botão, campos desabilitados |
| Success    | Salvo com sucesso  | Redirect + Toast                       |
| Error      | Erro no servidor   | Mensagem de erro + Toast               |

### 5.9 Validações

- Nome é obrigatório, mínimo 2 caracteres
- Nome não pode duplicar (outras áreas)
- Descrição opcional, máximo 500 caracteres
- Cor obrigatória (pelo menos uma seleção)
- Status default: ativo

---

## 6. Criação de Nova Área

### 6.1 Informações Gerais

| Atributo           | Detalhe                       |
| ------------------ | ----------------------------- |
| **Nome da Página** | Criar Área de Vida            |
| **Rota**           | `/areas/new`                  |
| **Tipo de Página** | Formulário (Client Component) |

### 6.2 Descrição Funcional

Formulário para criar uma nova área de vida. Estrutura idêntica à página de edição, mas sem dados pré-preenchidos.

### 6.3 Diferenças da Página de Edição

| Aspecto             | Criar               | Editar                |
| ------------------- | ------------------- | --------------------- |
| Rota                | `/areas/new`        | `/areas/:id/edit`     |
| Título              | "Nova Área de Vida" | "Editar Área de Vida" |
| Dados               | Vazios              | Pré-preenchidos       |
| Campos obrigatórios | Todos               | Alguns opcionais      |

### 6.4 Campos do Formulário

Igual à página de edição (seção 5.4).

---

## 7. Estado Vazio (Empty State)

### 7.1 Informações Gerais

| Atributo               | Detalhe                        |
| ---------------------- | ------------------------------ |
| **Nome do Componente** | EmptyState                     |
| **Tipo**               | Componente Reutilizável        |
| **Localização**        | Lista de Áreas, Lista de Metas |

### 7.2 Estrutura do Componente

```
┌────────────────────────────────────────┐
│                                        │
│           ┌──────────┐                 │
│           │   📁     │                 │
│           └──────────┘                 │
│                                        │
│     Nenhuma área cadastrada            │
│                                        │
│  Comece criando sua primeira área      │
│  de vida para organizar suas metas     │
│                                        │
│    [+ Criar Primeira Área]            │
│                                        │
└────────────────────────────────────────┘
```

### 7.3 Componentes UI Necessários

| Componente      | Utilização             |
| --------------- | ---------------------- |
| `Box` ou `div`  | Container centralizado |
| `Icon` (Lucide) | Ícone ilustrativo      |
| `Heading`       | Título                 |
| `Text`          | Subtítulo              |
| `Button`        | Ação principal         |

---

## 8. Mock Data - Áreas de Vida

### 8.1 Estrutura de Dados

```typescript
interface Area {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  status: 'active' | 'inactive';
  goals: Goal[];
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

interface Goal {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completedAt?: Date;
  areaId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 8.2 Dados de Exemplo

```typescript
const mockAreas: Area[] = [
  {
    id: '1',
    name: 'Carreira',
    description: 'Construir uma carreira sólida e satisfatória',
    color: '#3B82F6',
    icon: 'Briefcase',
    status: 'active',
    goals: [
      {
        id: 'g1',
        title: 'Tornar-se Engenheiro Senior',
        status: 'in_progress',
        priority: 'high',
        dueDate: new Date('2026-12-31'),
        areaId: '1',
      },
      {
        id: 'g2',
        title: 'Aprender nova tecnologia',
        status: 'completed',
        priority: 'medium',
        dueDate: new Date('2026-06-30'),
        completedAt: new Date('2026-03-15'),
        areaId: '1',
      },
    ],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-03-10'),
    order: 0,
  },
  {
    id: '2',
    name: 'Saúde',
    description: 'Manter corpo e mente saudáveis',
    color: '#10B981',
    icon: 'Heart',
    status: 'active',
    goals: [...],
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-03-12'),
    order: 1,
  },
  {
    id: '3',
    name: 'Finanças',
    description: 'Controle financeiro e investimentos',
    color: '#F59E0B',
    icon: 'Wallet',
    status: 'active',
    goals: [...],
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-03-08'),
    order: 2,
  },
  {
    id: '4',
    name: 'Família',
    description: 'Tempo de qualidade com a família',
    color: '#EC4899',
    icon: 'Users',
    status: 'active',
    goals: [...],
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-03-05'),
    order: 3,
  },
];
```

---

## 9. Hook Customizado - useAreas

### 9.1 Estrutura do Hook

```typescript
// hooks/useAreas.ts
import { useState, useCallback } from 'react';
import { mockAreas } from '@/data/mockAreas';
import type { Area } from '@/types/area';

export function useAreas() {
  const [areas, setAreas] = useState<Area[]>(mockAreas);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAreaById = useCallback(
    (id: string) => {
      return areas.find((area) => area.id === id);
    },
    [areas]
  );

  const createArea = useCallback(
    async (data: Omit<Area, 'id' | 'createdAt' | 'updatedAt' | 'goals'>) => {
      setIsLoading(true);
      try {
        // Simular chamada de API
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newArea: Area = {
          ...data,
          id: crypto.randomUUID(),
          goals: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setAreas((prev) => [...prev, newArea]);
        return newArea;
      } catch (err) {
        setError('Erro ao criar área');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateArea = useCallback(async (id: string, data: Partial<Area>) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setAreas((prev) =>
        prev.map((area) =>
          area.id === id ? { ...area, ...data, updatedAt: new Date() } : area
        )
      );
    } catch (err) {
      setError('Erro ao atualizar área');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteArea = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAreas((prev) => prev.filter((area) => area.id !== id));
    } catch (err) {
      setError('Erro ao excluir área');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reorderAreas = useCallback((newOrder: string[]) => {
    setAreas((prev) => {
      const areaMap = new Map(prev.map((area) => [area.id, area]));
      return newOrder.map((id, index) => ({
        ...areaMap.get(id)!,
        order: index,
      }));
    });
  }, []);

  return {
    areas,
    isLoading,
    error,
    getAreaById,
    createArea,
    updateArea,
    deleteArea,
    reorderAreas,
  };
}
```

---

## 10. Ordenação Drag & Drop

### 10.1 Biblioteca Recomendada

Utilizar `@dnd-kit/core` e `@dnd-kit/sortable` para implementação de drag & drop.

### 10.2 Componentes Necessários

```typescript
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
```

### 10.3 Estrutura de Implementação

- **SortableCard:** Wrapper do Card com funcionalidade de ordenação
- **DndContext:** Container que gerencia o estado de drag
- **onDragEnd:** Callback que atualiza a ordem das áreas

---

## 11. Seletor de Ícones

### 11.1 Biblioteca Recomendada

Utilizar `lucide-react` para ícones.

### 11.2 Ícones Disponíveis

| Categoria | Ícones                                           |
| --------- | ------------------------------------------------ |
| Trabalho  | `Briefcase`, `Laptop`, `Code`, `GraduationCap`   |
| Saúde     | `Heart`, `Activity`, `Apple`, `Dumbbell`         |
| Finanzas  | `Wallet`, `DollarSign`, `PieChart`, `TrendingUp` |
| Familia   | `Users`, `Home`, `Baby`, `Heart`                 |
| Pessoal   | `Star`, `Smile`, `Coffee`, `Book`                |
| Outros    | `Target`, `Flag`, `Calendar`, `MapPin`           |

### 11.3 Interface do Seletor

```typescript
interface IconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
  availableIcons: string[];
}
```

---

## 12. Resumo de Responsabilidades

| Componente/Página    | Responsabilidade                         |
| -------------------- | ---------------------------------------- |
| `/areas`             | Listar todas as áreas, filtrar, buscar   |
| `/areas/:id`         | Visualizar detalhes da área e suas metas |
| `/areas/new`         | Criar nova área                          |
| `/areas/:id/edit`    | Editar área existente                    |
| `AreaCard`           | Exibir área em formato de card           |
| `DeleteConfirmModal` | Confirmação de exclusão                  |
| `EmptyState`         | Estado vazio                             |
| `useAreas`           | Hook de gerenciamento de estado          |
| `IconPicker`         | Seleção de ícone                         |
| `ColorPicker`        | Seleção de cor                           |

---

## 13. Próximos Passos

1. **Setup do Mock Data** - Criar arquivo com dados de exemplo
2. **Criar Hook** - Implementar `useAreas` com mock
3. **Criar Componentes Base** - EmptyState, AreaCard
4. **Implementar Lista** - Página `/areas`
5. **Implementar Modal de Exclusão** - DeleteConfirmModal
6. **Implementar Detalhes** - Página `/areas/:id`
7. **Implementar Edição** - Página `/areas/:id/edit`
8. **Implementar Criação** - Página `/areas/new`
9. **Adicionar Drag & Drop** - Ordenação
10. **Testes** - Verificar todas as interações

---

_Documento gerado em: 25/03/2026_
_Última atualização: Sprint 4 - Áreas de Vida_
