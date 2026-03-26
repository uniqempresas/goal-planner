---
date: 2026-03-25T14:30:00Z-03:00
researcher: Vibe Researcher
git_commit: current
branch: main
repository: goal_planner_uat2
topic: Sprint 4 - Módulo de Áreas de Vida (CRUD Completo)
tags: [sprint-4, areas-de-vida, crud, frontend, react, typescript]
status: complete
last_updated: 2026-03-25
last_updated_by: Vibe Researcher
---

# PRD - Sprint 4: Módulo de Áreas de Vida (CRUD Completo)

**Data:** 25 de Março de 2026  
**Versão:** 1.0  
**Sprint:** 4  
**Projeto:** Goal Planner  
**Stack:** React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui

---

## 1. Visão Geral

### 1.1 Objetivo da Sprint

Implementar o módulo de **Áreas de Vida** com funcionalidade CRUD (Create, Read, Update, Delete) completa utilizando dados mockados. Este módulo permite que os usuários organizem suas metas em categorias específicas de vida, facilitando o acompanhamento e a priorização de objetivos em diferentes dimensões pessoais e profissionais.

### 1.2 Escopo

- Criação de novas áreas de vida
- Visualização de listagem de áreas com busca e filtros
- Edição de áreas existentes
- Exclusão de áreas com confirmação
- Página de detalhes de uma área específica
- Ordenação de áreas via drag & drop
- Sistema de cores e ícones customizados
- Estado vazio (empty state)

### 1.3 Dependências

- **Sprint 3:** Layout Base e Menu Mobile - DEVE estar concluída
- Componentes UI shadcn/ui já instalados (Button, Input, Dialog, Select, etc.)
- Hook de autenticação mockado (useAuth) já implementado
- Design system configurado com cores e tipografia

---

## 2. Funcionalidades Detalhadas

### 2.1 Mock Data para Áreas de Vida

**Arquivo:** `src/data/mockAreas.ts`

Estrutura de dados já implementada com as seguintes áreas pré-definidas:

| ID  | Nome     | Cor     | Ícone     | Status   | Metas |
| --- | -------- | ------- | --------- | -------- | ----- |
| 1   | Carreira | #3B82F6 | Briefcase | active   | 3     |
| 2   | Saúde    | #10B981 | Heart     | active   | 3     |
| 3   | Finanças | #F59E0B | Wallet    | active   | 2     |
| 4   | Família  | #EC4899 | Users     | active   | 2     |
| 5   | Estudos  | #8B5CF6 | BookOpen  | active   | 1     |
| 6   | Lazer    | #06B6D4 | Smile     | inactive | 0     |

**Tipo TypeScript (já definido em `src/types/index.ts`):**

```typescript
interface Area {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  status: AreaStatus; // 'active' | 'inactive'
  goals: Goal[];
  createdAt: string;
  updatedAt: string;
  order: number;
}

interface Goal {
  id: string;
  title: string;
  description?: string;
  status: GoalStatus; // 'pending' | 'in_progress' | 'completed' | 'overdue'
  priority: GoalPriority; // 'low' | 'medium' | 'high'
  dueDate?: string;
  completedAt?: string;
  areaId: string;
  createdAt: string;
  updatedAt: string;
}
```

### 2.2 Hook Customizado useAreas

**Arquivo:** `src/hooks/useAreas.ts` (já implementado)

Funcionalidades já implementadas:

- `getAreaById(id)` - Retorna área pelo ID
- `calculateStats(areaId)` - Calcula estatísticas (total, concluídas, em andamento, atrasadas, progresso %)
- `createArea(data)` - Cria nova área
- `updateArea(id, data)` - Atualiza área existente
- `deleteArea(id)` - Exclui área
- `reorderAreas(newOrder)` - Reordena áreas via drag & drop
- `filterAreas(filter)` - Filtra por status
- `searchAreas(query)` - Busca por nome
- `getFilteredAreas(filter, searchQuery)` - Combinação de filtros e busca

### 2.3 Página de Listagem de Áreas de Vida

**Rota:** `/areas`  
**Componente:** `src/pages/areas/AreasList.tsx` (já implementado)

**Elementos:**

- Título "Áreas de Vida" com descrição
- Campo de busca em tempo real
- Dropdown de filtro por status (Todas, Ativas, Inativas)
- Botão "Nova Área"
- Grid responsivo de cards (1 coluna mobile, 2 colunas desktop)
- Modal de confirmação de exclusão

### 2.4 Componente de Card para Área

**Arquivo:** `src/components/areas/AreaCard.tsx`

Elementos do card:

- Indicador de cor (círculo)
- Nome da área
- Quantidade de metas
- Barra de progresso
- Botões de editar e excluir (visíveis no hover)
- Clique no card navega para detalhes

### 2.5 Modal de Criação de Nova Área

**Rota:** `/areas/new`  
**Componente:** `src/pages/areas/AreaFormPage.tsx`

**Campos do formulário:**

- Nome (obrigatório, máx. 100 caracteres)
- Descrição (opcional, máx. 500 caracteres)
- Cor de identificação (seletor de cores predefinidas + custom)
- Ícone (seletor de ícones da biblioteca lucide-react)
- Status (toggle ativo/inativo)

### 2.6 Modal de Edição de Área

**Rota:** `/areas/:id/edit`  
**Componente:** `src/pages/areas/AreaFormPage.tsx` (reutiliza componente de criação)

Mesmos campos da criação, pré-preenchidos com dados existentes.

### 2.7 Exclusão de Área com Confirmação

**Componente:** `src/components/areas/DeleteConfirmModal.tsx`

Funcionalidades:

- Modal de confirmação com ícone de alerta
- Nome da área a ser excluída
- Contagem de metas afetadas
- Botões Cancelar e Excluir
- Loading state durante exclusão

### 2.8 Página de Detalhes de uma Área

**Rota:** `/areas/:id`  
**Componente:** `src/pages/areas/AreaDetail.tsx`

Elementos:

- Breadcrumb de navegação
- Nome da área em destaque
- Cor e ícone
- Descrição
- Data de criação
- Estatísticas (Total, Concluídas, Em Andamento, Atrasadas)
- Barra de progresso geral
- Lista de metas filtrável
- Quick add para novas metas

### 2.9 Ordenação de Áreas (Drag & Drop)

**Funcionalidade:** Reordenar áreas na listagem alterando a propriedade `order`

- Arrastar e soltar cards na lista
- Persistir nova ordem no estado
- Atualizar numeração de prioridade

### 2.10 Sistema de Cores Customizadas

**Arquivo:** `src/lib/constants.ts`

Cores predefinidas disponíveis:

| Nome    | Hex     | Significado                   |
| ------- | ------- | ----------------------------- |
| Azul    | #3B82F6 | Profissional, confiança       |
| Verde   | #10B981 | Crescimento, saúde            |
| Amarelo | #F59E0B | Energia, cautela              |
| Laranja | #F97316 | Motivação, ação               |
| Roxo    | #8B5CF6 | Criatividade, espiritualidade |
| Pink    | #EC4899 | Amor, relacionamentos         |
| Cinza   | #6B7280 | Neutro, geral                 |
| Ciano   | #06B6D4 | Calma, comunicação            |

### 2.11 Sistema de Ícones

**Fonte:** Biblioteca lucide-react

Categorias de ícones disponíveis:

- **Trabalho:** Briefcase, Laptop, Code, GraduationCap
- **Saúde:** Heart, Activity, Apple, Dumbbell
- **Finanças:** Wallet, DollarSign, PieChart, TrendingUp
- **Família:** Users, Home, Baby
- **Pessoal:** Star, Smile, Coffee, BookOpen
- **Outros:** Target, Flag, Calendar, MapPin, Plane, Music, Gamepad2, Palette

### 2.12 Estado Vazio (Empty State)

**Arquivo:** Componente inline em `src/pages/areas/AreasList.tsx`

Elementos:

- Ícone ilustrativo
- Título: "Nenhuma área cadastrada"
- Mensagem explicativa
- Botão de ação para criar primeira área

---

## 3. Fluxos de Usuário

### 3.1 Fluxo: Criar Nova Área

```
1. Usuário acessa /areas
2. Clica no botão "Nova Área"
3. Sistema navega para /areas/new
4. Usuário preenche formulário (nome, descrição, cor, ícone)
5. Clica em "Salvar"
6. Sistema cria área e navega para /areas/:id
7. Toast de sucesso exibido
```

### 3.2 Fluxo: Editar Área

```
1. Usuário acessa /areas
2. Clica no ícone de editar no card OU acessa /areas/:id e clica em "Editar"
3. Sistema navega para /areas/:id/edit
4. Usuário modifica campos desejados
5. Clica em "Salvar Alterações"
6. Sistema atualiza área e navega para /areas/:id
7. Toast de sucesso exibido
```

### 3.3 Fluxo: Excluir Área

```
1. Usuário acessa /areas
2. Clica no ícone de excluir no card
3. Modal de confirmação abre
4. Usuário visualiza nome e quantidade de metas afetadas
5. Clica em "Excluir"
6. Sistema remove área e atualiza lista
7. Toast de sucesso exibido
```

### 3.4 Fluxo: Visualizar Detalhes

```
1. Usuário acessa /areas
2. Clica no card da área
3. Sistema navega para /areas/:id
4. Usuário visualiza estatísticas, progresso e metas
5. Pode editar, excluir ou adicionar novas metas
```

### 3.5 Fluxo: Buscar e Filtrar

```
1. Usuário acessa /areas
2. Digita no campo de busca → lista filtra em tempo real
3. Seleciona filtro de status → lista atualiza
4. Busca e filtro podem ser combinados
```

---

## 4. Dados Mockados - Estrutura Completa

### 4.1 Arquivos de Dados

| Arquivo                 | Descrição                       |
| ----------------------- | ------------------------------- |
| `src/data/mockAreas.ts` | Array de objetos Area com metas |
| `src/types/index.ts`    | Interfaces TypeScript           |
| `src/lib/constants.ts`  | Cores e ícones predefinidos     |

### 4.2 Dados de Exemplo (mockAreas.ts)

```typescript
// 6 áreas pré-definidas com dados realistas
// Cada área contém:
// - id único
// - name (nome da área)
// - description (descrição opcional)
// - color (código hex)
// - icon (nome do ícone lucide-react)
// - status ('active' | 'inactive')
// - goals (array de objetos Goal)
// - createdAt, updatedAt (timestamps)
// - order (número para ordenação)
```

### 4.3Validações

| Campo     | Regra              | Mensagem                                      |
| --------- | ------------------ | --------------------------------------------- |
| Nome      | Obrigatório        | "Nome é obrigatório"                          |
| Nome      | Mín 2 caracteres   | "Nome deve ter pelo menos 2 caracteres"       |
| Nome      | Máx 100 caracteres | "Nome deve ter no máximo 100 caracteres"      |
| Descrição | Máx 500 caracteres | "Descrição deve ter no máximo 500 caracteres" |
| Cor       | Obrigatória        | Seleção obrigatória (default: #3B82F6)        |
| Status    | Default: active    | -                                             |

---

## 5. Critérios de Aceite

### 5.1 Criação de Área

- [ ] Usuário consegue acessar página de criação via botão "Nova Área"
- [ ] Formulário valida campos obrigatórios
- [ ] Usuário pode selecionar cor de uma paleta predefinida
- [ ] Usuário pode selecionar ícone de uma lista categorizada
- [ ] Usuário pode definir status (ativo/inativo)
- [ ] Após criação, área aparece na lista
- [ ] Toast de sucesso é exibido

### 5.2 Edição de Área

- [ ] Usuário pode acessar página de edição via ícone no card ou botão na página de detalhes
- [ ] Formulário é pré-preenchido com dados existentes
- [ ] Alterações são salvas corretamente
- [ ] Após edição, dados atualizados são exibidos
- [ ] Toast de sucesso é exibido

### 5.3 Exclusão de Área

- [ ] Usuário pode excluir área via ícone no card ou botão na página de detalhes
- [ ] Modal de confirmação abre com informações relevantes
- [ ] Usuário pode cancelar ou confirmar exclusão
- [ ] Após exclusão, área é removida da lista
- [ ] Toast de sucesso é exibido

### 5.4 Ordenação

- [ ] Áreas aparecem em ordem de prioridade (campo `order`)
- [ ] Usuário pode reordenar áreas via drag & drop (se implementado)
- [ ] Nova ordem é refletida na listagem

### 5.5 Aparência

- [ ] Cada área exibe cor distintiva
- [ ] Cada área exibe ícone representativo
- [ ] Barra de progresso reflete % de metas concluídas
- [ ] Interface responsiva (mobile, tablet, desktop)

### 5.6 Busca e Filtro

- [ ] Campo de busca filtra áreas por nome em tempo real
- [ ] Filtro de status (Todas/Ativas/Inativas) funciona corretamente
- [ ] Busca e filtro podem ser combinados

### 5.7 Estado Vazio

- [ ] Quando não há áreas, mensagem explicativa é exibida
- [ ] Botão para criar primeira área está presente e funcional

---

## 6. Tech & Design - Decisões de Implementação

### 6.1 Stack Tecnológico

| Tecnologia      | Versão | Uso                          |
| --------------- | ------ | ---------------------------- |
| React           | 19.x   | Framework UI                 |
| TypeScript      | 5.x    | Tipagem estática             |
| Vite            | 8.x    | Build tool                   |
| Tailwind CSS    | 4.x    | Estilização                  |
| shadcn/ui       | 4.x    | Componentes UI               |
| React Router    | 7.x    | Roteamento                   |
| Lucide React    | 1.6.x  | Ícones                       |
| React Hook Form | 7.x    | Gerenciamento de formulários |
| Zod             | 3.x    | Validação de schemas         |
| Sonner          | 2.x    | Notificações toast           |

### 6.2 Estrutura de Pastas

```
src/
├── components/
│   ├── areas/
│   │   ├── AreaCard.tsx        # Card de área individual
│   │   ├── AreaForm.tsx        # Formulário de criação/edição
│   │   ├── ColorPicker.tsx     # Seletor de cores
│   │   ├── DeleteConfirmModal.tsx # Modal de exclusão
│   │   └── IconPicker.tsx      # Seletor de ícones
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   └── Sidebar.tsx
│   └── ui/                     # Componentes shadcn/ui
├── data/
│   └── mockAreas.ts            # Dados mockados
├── hooks/
│   ├── useAreas.ts             # Hook principal de áreas
│   └── useAuth.tsx             # Hook de autenticação
├── lib/
│   ├── constants.ts            # Cores, ícones, validações
│   └── utils.ts                # Utilitários
├── pages/
│   └── areas/
│       ├── AreasList.tsx       # Listagem de áreas
│       ├── AreaDetail.tsx      # Detalhes de área
│       └── AreaFormPage.tsx    # Página de formulário
├── routes.tsx                  # Configuração de rotas
└── types/
    └── index.ts               # Definições de tipos
```

### 6.3 Componentes shadcn/ui Utilizados

- Button
- Input
- Dialog
- Select
- Switch
- Card
- Skeleton
- Textarea
- Label

### 6.4 Bibliotecas Adicionais

- **lucide-react:** Ícones consistentes com design system
- **react-hook-form + zod:** Validação de formulários robusta
- **sonner:** Notificações toast modernas
- **tailwind-merge + clsx:** Utilitários para className

### 6.5 Decisões de Design

**Cores:** Tom primary é `#F59E0B` (Amarelo/Alaranjado - energia, ação)  
**Tipografia:** Geist Variable (sans-serif moderno)  
**Border Radius:** Padrão shadcn/ui (0.5rem)  
**Responsividade:** Mobile-first com breakpoints Tailwind

### 6.6 Padrões de Código

- Componentes funcionais com TypeScript
- Hooks customizados para lógica de negócio
- Separação clara entre dados (mock) e apresentação (componentes)
- Validação no cliente com Zod
- Estados de loading e erro tratados
- Acessibilidade básica (labels, roles)

---

## 7. Histórico de Versões

| Versão | Data       | Descrição             |
| ------ | ---------- | --------------------- |
| 1.0    | 25/03/2026 | Versão inicial do PRD |

---

## 8. Referências

- **Frontend Docs:** `tracking/docs/frontend/modulo-areas-de-vida.md`
- **Wireframes:** `tracking/wireframes/modulo-03-areas-de-vida.md`
- **ROADMAP.md:** `tracking/ROADMAP.md` (Sprint 4)
- **Specs Anteriores:** `tracking/specs/SPEC-2026-03-25-areas-de-vida.md`

---

## 9. Observações

- Esta sprint foca apenas no CRUD de **Áreas de Vida**. As metas associadas são visualizadas mas não possuem CRUD completo nesta sprint (será implementado na Sprint 5).
- Todos os dados são **mockados** e persistidos apenas em memória (state React). Não há persistência real ainda (Supabase será integrado na Sprint 13).
- A funcionalidade de **drag & drop** para reordenação requer biblioteca adicional (ex: @dnd-kit ou react-beautiful-dnd) - implementar se necessário.
