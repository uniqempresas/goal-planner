# Módulo 2 - Dashboard

Este documento apresenta os wireframes detalhados de todas as telas, formulários e modais do módulo Dashboard do Goal Planner.

---

## 1. Dashboard Principal

**Rota:** `/dashboard`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                              │
│ ┌────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Avatar] Olá, Maria!  [ONE Thing: "Finalizar projeto X"]     [🔔] [⚙️]       │ │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                         │
│ ┌────────────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                                 │ │
│ │  SEÇÃO: ONE THING HOJE                                                          │ │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │ │
│ │  │                                                                         │   │ │
│ │  │   ⭐ SUA PRIORIDADE DE HOJE                                              │   │ │
│ │  │                                                                         │   │ │
│ │  │   ┌───────────────────────────────────────────────────────────────┐     │   │ │
│ │  │   │                                                               │     │   │ │
│ │  │   │   "Finalizar relatório mensal de vendas"                     │     │   │ │
│ │  │   │                                                               │     │   │ │
│ │  │   │   ████████████████░░░░░░░░░░  60%                          │     │   │ │
│ │  │   │                                                               │     │   │ │
│ │  │   │   Prazo: Hoje, 18:00                                         │     │   │ │
│ │  │   │                                                               │     │   │ │
│ │  │   └───────────────────────────────────────────────────────────────┘     │   │ │
│ │  │                                                                         │   │ │
│ │  │   [Marcar como Concluído]  [Editar]  [Adiar]                       │   │ │
│ │  │                                                                         │   │ │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                 │ │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐ │
│ │  SEÇÃO: MÉTRICAS DO DIA                                                        │ │
│ │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │ │
│ │  │  ⏱️          │  │  ✅           │  │  📝           │  │  🎯           │   │ │
│ │  │  2h 30m      │  │  3/5          │  │  12           │  │  85%          │   │ │
│ │  │  Foco Total │  │  Concluídos   │  │  Tarefas     │  │  Produtiv.   │   │ │
│ │  └───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘   │ │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐ │
│ │  SEÇÃO: LISTA DE TAREFAS DE HOJE                          [+ Nova Tarefa]   │ │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │ │
│ │  │ ☐  08:00 - Reunião de equipe                              [⭐] [✏️] [🗑️]│   │ │
│ │  │ ☑  09:30 - Revisar documento                                        [↩️]  │   │ │
│ │  │ ☐  10:00 - Trabalhar no projeto X                        [⭐] [✏️] [🗑️]│   │ │
│ │  │ ☐  14:00 - Call com cliente                               [⭐] [✏️] [🗑️]│   │ │
│ │  │ ☐  16:00 - Preparar apresentação                            [⭐] [✏️] [🗑️]│   │ │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │ │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐ │
│ │  SEÇÃO: METAS DA SEMANA                                  [+ Nova Meta]      │ │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │ │
│ │  │                                                                         │   │ │
│ │  │  📈 Meta: Ler 2 livros este mês                                        │   │ │
│ │  │       ████████████░░░░░░░  50%  (1/2 livros)                          │   │ │
│ │  │                                                                         │   │ │
│ │  │  💰 Meta: Economizar R$ 500                                            │   │ │
│ │  │       ████████░░░░░░░░░░░  80%  (R$ 400 salvos)                      │   │ │
│ │  │                                                                         │   │ │
│ │  │  🏃 Meta: Correr 3x por semana                                         │   │ │
│ │  │       ██████████████████  100%  (3/3 semanas)                         │   │ │
│ │  │                                                                         │   │ │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │ │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐ │
│ │  SEÇÃO: CONQUISTAS                                    [+ Ver Todas]          │ │
│ │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                   │ │
│ │  │  🏆           │  │  🔥           │  │  ⭐           │                   │ │
│ │  │  Sequência   │  │  5 dias       │  │  Primeiro    │                   │ │
│ │  │  7 dias      │  │  consecutivos │  │  objetivo    │                   │ │
│ │  │              │  │              │  │  concluído    │                   │ │
│ │  └───────────────┘  └───────────────┘  └───────────────┘                   │ │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────┐
│ FOOTER (Navegação Mobile)                                                          │
│ [🏠 Dashboard]  [📋 Tarefas]  [🎯 Metas]  [📊 Relatórios]  [⚙️ Config]          │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Header Bar**: Saudação, ONE Thing atual, notificações, configurações
- **ONE Thing Card**: Card destacado com a tarefa prioritária do dia
- **Progress Bar**: Barra de progresso visual para tarefas
- **Metrics Cards**: 4 cards com métricas do dia (tempo foco, tarefas concluídas, tarefas do dia, produtividade)
- **Task List**: Lista de tarefas de hoje com checkboxes
- **Goals List**: Lista de metas da semana/mês com progresso
- **Achievements Section**: Conquistas e badges
- **Floating Action Button (FAB)**: Botão flutuante para adicionar nova tarefa (mobile)
- **Bottom Navigation**: Navegação inferior (mobile)

### Ações

- **ONE Thing Card**:
  - [Marcar como Concluído]: Completa a tarefa e abre Modal de Feedback
  - [Editar]: Abre modal para editar a ONE Thing
  - [Adiar]: Adia para amanhã
- **Task List**:
  - [Checkbox]: Alterna status da tarefa
  - [⭐]: Define como prioritária (ONE Thing)
  - [✏️]: Edita tarefa
  - [🗑️]: Exclui tarefa
  - [↩️]: Restaura tarefa concluída
- **Metas**:
  - [+ Nova Meta]: Abre modal para criar nova meta
  - Progress bar clicável para ver detalhes
- **Conquistas**:
  - [+ Ver Todas]: Navega para página de conquistas

### Fluxo de Navegação

```
Dashboard (/dashboard)
    │
    ├── [ONE Thing > Marcar como Concluído] ────► Modal de Feedback de Progresso
    │
    ├── [ONE Thing > Editar] ───────────────────► Modal de Definir ONE Thing
    │
    ├── [ONE Thing > Adiar] ─────────────────────► Adia tarefa (confirmação toast)
    │
    ├── [Tarefa > Checkbox] ──────────────────────► Alterna status (toast feedback)
    │
    ├── [Tarefa > ⭐] ────────────────────────────► Define como ONE Thing
    │
    ├── [Tarefa > ✏️] ────────────────────────────► Modal Editar Tarefa
    │
    ├── [Tarefa > 🗑️] ────────────────────────────► Confirmação > Remove tarefa
    │
    ├── [+ Nova Tarefa] ──────────────────────────► Modal Criar Tarefa
    │
    ├── [+ Nova Meta] ────────────────────────────► Modal Criar Meta
    │
    ├── [Ver Todas (Conquistas)] ─────────────────► Página Conquistas (/achievements)
    │
    ├── [🔔 Notificações] ───────────────────────► Dropdown/Modal de notificações
    │
    └── [⚙️ Configurações] ───────────────────────► Página Configurações (/settings)
```

### Estados

- **Empty State (ONE Thing)**: Quando não há ONE Thing definida, mostra card convidativo para definir
- **Loading**: Skeleton loading para componentes
- **Error**: Mensagem de erro com botão de retry
- **With Data**: Dashboard populado com dados do usuário

---

## 2. Modal de Definir ONE Thing

**Tipo:** Modal/Dialog

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║  ⭐ DEFINIR ONE THING                                  [X]   ║ │
│  ╠═══════════════════════════════════════════════════════════════╣ │
│  ║                                                               ║ │
│  ║  Qual é a ÚNICA coisa mais importante que você precisa     ║ │
│  ║  concluir hoje?                                              ║ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                         │ ║ │
│  ║  │  📝 Título da tarefa *                                  │ ║ │
│  ║  │  "Finalizar relatório mensal"                          │ ║ │
│  ║  │                                                         │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                         │ ║ │
│  ║  │  📅 Prazo (opcional)                                    │ ║ │
│  ║  │  [Hoje, 18:00                              ▼]           │ ║ │
│  ║  │                                                         │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                         │ ║ │
│  ║  │  📝 Descrição (opcional)                                │ ║ │
│  ║  │                                                         │ ║ │
│  ║  │  Detalhes adicionais sobre a tarefa...                 │ ║ │
│  ║  │                                                         │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                         │ ║ │
│  ║  │  🏷️ Categoria                                           │ ║ │
│  ║  │  [Trabalho] [Pessoal] [Estudos] [+Nova]                │ ║ │
│  ║  │                                                         │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ─────────────────────────────────────────────────────────   ║ │
│  ║                                                               ║ │
│  ║  ┌───────────────────────────┐  ┌───────────────────────────┐║ │
│  ║  │      CANCELAR             │  │     SALVAR                 │║ │
│  ║  └───────────────────────────┘  └───────────────────────────┘║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Modal Header**: Título "DEFINIR ONE THING" e botão de fechar
- **Motivational Text**: Texto explicativo sobre o conceito
- **Title Input**: Campo de título da tarefa (obrigatório)
- **Deadline Picker**: Seletor de data/hora para prazo
- **Description Textarea**: Campo de descrição opcional
- **Category Selector**: Seletor de categoria com opções predefinidas
- **Action Buttons**: Cancelar e Salvar

### Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| title | text | Título da tarefa (obrigatório, máx. 100 caracteres) |
| deadline | datetime | Prazo da tarefa (opcional) |
| description | textarea | Descrição detalhada (opcional, máx. 500 caracteres) |
| category | select | Categoria da tarefa: Trabalho, Pessoal, Estudos, Saúde, Finances (opcional) |

### Ações

- **SALVAR**: Salva a ONE Thing e fecha o modal, atualiza o Dashboard
- **CANCELAR**: Fecha o modal sem salvar
- **X (Fechar)**: Fecha o modal sem salvar
- **Categoria**: Seleciona uma categoria existente ou cria nova
- **Deadline**: Abre date picker para selecionar data/hora

### Fluxo de Navegação

```
Dashboard
    │
    ├── [ONE Thing > Editar] ─────────────► Modal Definir ONE Thing
    │                                          │
    │                                          ├── [SALVAR] ──► Dashboard atualizado
    │                                          │
    │                                          └── [CANCELAR/X] ──► Dashboard (sem alterações)
    │
    └── [+ Nova Tarefa] (selecionar como prioridade) ──► Modal Definir ONE Thing
```

### Estados do Modal

- **Default**: Campos vazios ou com dados existentes (modo edição)
- **Validation Error**: Bordas vermelhas em campos inválidos
- **Loading**: Botão com spinner, campos desabilitados
- **Success**: Modal fechado com toast de sucesso

### Validações

- **title**: Obrigatório, mínimo 3 caracteres
- **deadline**: Se fornecido, deve ser data futura
- **description**: Opcional

---

## 3. Modal de Feedback de Progresso

**Tipo:** Modal/Dialog (aparece após completar ONE Thing)

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║                                                                     ║ │
│  ║                    🎉 PARABÉNS!                                  ║ │
│  ║               Você completou sua ONE Thing!                      ║ │
│  ║                                                                     ║ │
│  ║           ═══════════════════════════════════                   ║ │
│  ║                                                                     ║ │
│  ║  ┌─────────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                             │ ║ │
│  ║  │       "Finalizar relatório mensal de vendas"               │ ║ │
│  ║  │                                                             │ ║ │
│  ║  └─────────────────────────────────────────────────────────────┘ ║ │
│  ║                                                                     ║ │
│  ║  ═══════════════════════════════════════════════════════════   ║ │
│  ║                                                                     ║ │
│  ║  📊 SUA EVOLUÇÃO HOJE                                             ║ │
│  ║                                                                     ║ │
│  ║  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐        ║ │
│  ║  │   ⏱️        │  │   ✅         │  │   🔥         │        ║ │
│  ║  │  2h 30m      │  │  4/5          │  │  3 dias      │        ║ │
│  ║  │  Tempo Foco  │  │  Concluídos   │  │  Sequência   │        ║ │
│  ║  └───────────────┘  └───────────────┘  └───────────────┘        ║ │
│  ║                                                                     ║ │
│  ║  ═══════════════════════════════════════════════════════════   ║ │
│  ║                                                                     ║ │
│  ║  💬 COMO VOCÊ SE SENTE?                                          ║ │
│  ║                                                                     ║ │
│  ║  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐║ │
│  ║  │  😊     │  │  😌     │  │  💪     │  │  😴     │  │  🤔    │║ │
│  ║  │ Produt. │  │ Calmo   │  │ Podero. │  │ Cansado │  │Confuso │║ │
│  ║  │         │  │         │  │         │  │         │  │        │║ │
│  ║  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └────────┘║ │
│  ║                                                                     ║ │
│  ║  ═══════════════════════════════════════════════════════════   ║ │
│  ║                                                                     ║ │
│  ║  📝 NOTA DO DIA (opcional)                                       ║ │
│  ║                                                                     ║ │
│  ║  ┌─────────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                             │ ║ │
│  ║  │  Como foi seu dia? O que aprendeu?                        │ ║ │
│  ║  │                                                             │ ║ │
│  ║  └─────────────────────────────────────────────────────────────┘ ║ │
│  ║                                                                     ║ │
│  ║  ────────────────────────────────────────────────────────────     ║ │
│  ║                                                                     ║ │
│  ║  ┌───────────────────────────────────────────────────────────┐   ║ │
│  │              CONTINUAR PARA PRÓXIMA TAREFA                   │   ║ │
│  │                                                               │   ║ │
│  └───────────────────────────────────────────────────────────────┘   ║ │
│  ║                                                                     ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Celebration Header**: Título de parabéns com emoji
- **Completed Task Display**: Card com a tarefa concluída
- **Daily Stats**: 3 cards com estatísticas do dia
- **Mood Selector**: 5 opções de humor/emocional
- **Journal Note**: Campo de nota/opinião do dia
- **Primary CTA**: Botão "Continuar para Próxima Tarefa"

### Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| mood | radio/select | Humor do usuário: Produtivo, Calmo, Poderoso, Cansado, Confuso (opcional) |
| journalNote | textarea | Nota/reflexão do dia (opcional, máx. 500 caracteres) |

### Ações

- **Selecionar Humor**: Registra o humor do usuário (pode pular)
- **Escrever Nota**: Adiciona uma nota/reflexão opcional
- **Continuar para Próxima Tarefa**: Fecha o modal, marca próxima tarefa como ONE Thing (se houver)
- **X (Fechar)**: Fecha o modal sem ações adicionais

### Fluxo de Navegação

```
Modal de Feedback de Progresso
    │
    ├── [Selecionar Humor] ───────────────────► Registra humor (feedback visual)
    │
    ├── [Escrever Nota] ───────────────────────► Registra nota (auto-save)
    │
    ├── [Continuar para Próxima Tarefa] ──────► Dashboard
    │                                              (se houver próxima tarefa > sugere como ONE Thing)
    │
    └── [X] ───────────────────────────────────► Dashboard
```

### Estados do Modal

- **Default**: Moda aberto com tarefa concluída e estatísticas
- **Mood Selected**: Emoji destacado com borda
- **Note Saved**: Indicador de nota salva
- **Loading**: Botão com spinner ao processar
- **With Next Task**: Botão mostra "Definir próxima como ONE Thing"

### Considerações de UX

1. **Momento de Celebração**: Este é um momento de positivity reinforcement
2. **Feedback Visual**: Animações de confete ou celebração
3. **Progresso Visível**: Mostrar estatísticas do dia reforça o hábito
4. **Baixo atrito**: Usuário pode pular humor e nota se preferir
5. **Sugestão Inteligente**: Se houver tarefas pendentes, sugerir a próxima

---

## Resumo do Fluxo do Módulo Dashboard

```
Dashboard (/dashboard)
    │
    ├── [Completar ONE Thing]
    │       │
    │       └──► Modal Feedback Progresso
    │                    │
    │                    ├── [Continuar] ──► Dashboard
    │                    │
    │                    └── [X] ───────────► Dashboard
    │
    ├── [Editar ONE Thing]
    │       │
    │       └──► Modal Definir ONE Thing
    │                    │
    │                    ├── [Salvar] ─────► Dashboard
    │                    │
    │                    └── [Cancelar] ───► Dashboard
    │
    ├── [Gerenciar Tarefas]
    │       │
    │       ├── [+ Nova Tarefa] ──► Modal Criar Tarefa
    │       ├── [Editar] ───────────► Modal Editar Tarefa
    │       ├── [Excluir] ─────────► Confirmação > Remove
    │       └── [Completar] ───────► Checkbox toggle
    │
    ├── [Gerenciar Metas]
    │       │
    │       ├── [+ Nova Meta] ──────► Modal Criar Meta
    │       └── [Ver Detalhes] ────► Expande meta
    │
    └── [Navegação Principal]
            │
            ├── [Tarefas] ───────────► /tasks
            ├── [Metas] ─────────────► /goals
            ├── [Relatórios] ───────► /reports
            └── [Configurações] ─────► /settings
```

---

## Componentes Reutilizáveis do Módulo

### Progress Bar
```
███████████████░░░░░░░░░  60%
│ Progress: 0-100% │
│ States: default, complete, delayed │
```

### Metric Card
```
┌───────────────┐
│  ⏱️          │
│  2h 30m      │
│  Foco Total  │
└───────────────┘
│ Icon + Value + Label │
```

### Task Item
```
☐  [Hora] - Título da tarefa              [⭐] [✏️] [🗑️]
   │       │                                 │    │    │
   │       └── Checkbox                      │    │    └── Delete
   │                                         │    └── Edit
   └── Horário (opcional)                   └── Priority Star
```

### Mood Selector
```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│  😊 │ │  😌 │ │  💪 │ │  😴 │ │  🤔 │
│     │ │     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘
  Selecionável (single choice)
```

---

## Considerações de UX/UI para o Módulo

1. **ONE Thing em Destaque**: O conceito de "Uma Única Coisa" deve ser visualmente prioritário
2. **Feedback Imediato**: Toast notifications para todas as ações
3. **Progresso Visível**: Barras de progresso e métricas motivacionais
4. **Mobile-First**: Navegação inferior no mobile, sidebar no desktop
5. **Conquitas Gamificadas**: Badges e recompensas para manter engajamento
6. **Dark Mode**: Suporte a tema escuro para conforto visual
7. **Acessibilidade**: Contraste adequado, labels claros, keyboard navigation
