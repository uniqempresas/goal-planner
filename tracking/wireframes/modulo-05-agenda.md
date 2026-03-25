# Módulo 5 - Agenda

O Módulo Agenda é o centro de execução diária do Goal Planner, permitindo que o usuário planeje e acompanhe suas tarefas diárias através do sistema de Time Blocking. Este módulo integra-se diretamente com as metas cadastradas no Módulo de Metas, transformando objetivos de longo prazo em ações concretas do dia a dia.

---

## 1. Agenda Diária (Today View)

**Rota:** `/agenda/hoje`

### Layout

A tela de Agenda Diária apresenta uma visão organizada do dia atual com estrutura de Time Blocks verticais. O layout utiliza cards para cada bloco de tempo, com destaque visual para o ONE Thing no topo. A barra lateral esquerda contém navegação rápida entre dias, enquanto a área principal exibe os blocos de tempo organizados cronologicamente.

A estrutura segue o conceito de "Deep Work", onde as tarefas mais importantes recebem atenção prioritária e proteção contra interrupções. O design utiliza cores distintas para cada tipo de bloco: azul para manhã, verde para tarde, roxo para noite, e vermelho/alerta para tarefas atrasadas.

### Estrutura de Time Blocks

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Goal Planner          [Notificações] [Perfil]     │
├────────────┬────────────────────────────────────────────────┤
│            │  ┌──────────────────────────────────────────┐   │
│  < Janeiro 2026 >                                          │
│  Seg  Ter  Qua  Qui  Sex  Sáb  Dom                        │
│   23  24  25  26  27  28  29                             │
│            │  │ 🔴 ONE THING                             │   │
│  ────────  │  │ [Nome da tarefa mais importante]         │   │
│            │  │ Meta: [Nome da Meta]                     │   │
│  HOJE      │  │ ⏱ 09:00 - 10:30                          │   │
│  24/01     │  │ [Botão: Concluir] [Botão: Editar]        │   │
│            │  └──────────────────────────────────────────┘   │
│  Amanhã   │  ┌──────────────────────────────────────────┐   │
│  25/01     │  │ ⏰ TAREFAS ATRASADAS (2)                 │   │
│            │  │ • Tarefa atrasada 1                      │   │
│  Esta      │  │ • Tarefa atrasada 2                      │   │
│  Semana    │  │ [Botão: Fazer agora]                     │   │
│            │  └──────────────────────────────────────────┘   │
│  ────────  │                                                │
│            │  ┌──────────────────────────────────────────┐   │
│  Metas     │  │ 🌅 MANHÃ (06:00 - 12:00)                  │   │
│  Ativas    │  │ • Revisão de código - 08:00              │   │
│            │  │ • Reunião de alinhamento - 10:00         │   │
│  • Meta 1  │  │ • Tarefa adicional - 11:00               │   │
│  • Meta 2  │  │ [Botão: + Adicionar tarefa]              │   │
│            │  └──────────────────────────────────────────┘   │
│            │                                                │
│            │  ┌──────────────────────────────────────────┐   │
│            │  │ ☀️ TARDE (12:00 - 18:00)                 │   │
│            │  │ • Desenvolvimento Feature X - 14:00     │   │
│            │  │ • Documentação - 16:00                   │   │
│            │  └──────────────────────────────────────────┘   │
│            │                                                │
│            │  ┌──────────────────────────────────────────┐   │
│            │  │ 🌙 NOITE (18:00 - 23:00)                 │   │
│            │  │ • Revisão do dia - 19:00                │   │
│            │  │ • Planejamento tomorrow - 21:00        │   │
│            │  └──────────────────────────────────────────┘   │
│            │                                                │
│            │  ┌──────────────────────────────────────────┐   │
│            │  │ 🔄 RECORRENTES                           │   │
│            │  │ • Meditação matinal (diário)            │   │
│            │  │ • Leitura (diário)                      │   │
│            │  └──────────────────────────────────────────┘   │
│            │                                                │
│            │  ┌──────────────────────────────────────────┐   │
│            │  │ ✓ HÁBITOS                                │   │
│            │  │ [ ] Exercício físico                    │   │
│            │  │ [x] Beber 2L água                        │   │
│            │  │ [ ] Meditar 10min                       │   │
│            │  └──────────────────────────────────────────┘   │
└────────────┴────────────────────────────────────────────────┘
```

### Componentes Principais

- **Header:** Logo, menu de navegação principal, botão de notificações com badge de alertas, avatar do usuário.
- **Sidebar Esquerda:** Calendário mini mensal navegável, atalhos para "Hoje", "Amanhã", visualização rápida da semana, lista de metas ativas com progresso.
- **Card ONE Thing:** Container destacado com borda grossa, gradiente suave, ícone de foco, botão de conclusão proeminente.
- **Cards de Time Blocks:** Containers com header mostrando horário, corpo com lista de tarefas, footer com botão de adicionar.
- **Lista de Tarefas:** Cada item mostra título, horário (opcional), meta vinculada, indicador de prioridade, botões de ação rápida.
- **Lista de Hábitos:** Checkboxes interativos com progress bar de conclusão diária.
- **Indicadores de Estado:** Badge para tarefas atrasadas, pill para tarefas concluídas, animação para tarefa em andamento.

### Campos

- **Data:** Selecionador de data (padrão: hoje)
- **Visualização:** Toggle entre lista/grade (futuro)
- **Filtro:** Dropdown para filtrar por meta

### Ações

- **Navegação entre dias:** Setas no calendário ou clique direto na data
- **ONE Thing:** Clique para expandir detalhes, botão "Concluir" para marcar como feito
- **Tarefa:** Clique para abrir modal de detalhes, arrastar para reordenar
- **Botão Flutuante (+):** Abre modal para criar nova tarefa rápida
- **Arrastar e Soltar:** Mover tarefas entre blocos de horário

### Fluxo de Navegação

1. Usuário acessa `/agenda/hoje` (rota padrão do módulo)
2. Sistema carrega tarefas do dia atual agrupadas por time block
3. ONE Thing é destacado automaticamente baseado em prioridade
4. Tarefas atrasadas aparecem em destaque vermelho
5. Usuário pode clicar em qualquer tarefa para ver detalhes ou concluir
6. Navegação lateral permite mudar para outros dias rapidamente

---

## 2. Planejamento Semanal

**Rota:** `/agenda/semana`

### Layout

A tela de Planejamento Semanal exibe uma visão panorâmica de 7 dias em formato de grade horizontal. Cada coluna representa um dia da semana, com os time blocks organizados verticalmente. O layout permite visualização macro da semana e identificação rápida de dias sobrecarregados ou com baixa ocupação.

O header contém o controle de navegação entre semanas e um resumo do progresso semanal. A área principal mostra as colunas dos dias com cards de tarefas. A barra lateral direita oferece ferramentas de planejamento como "Arraste para preencher" e Templates de dia.

### Estrutura de Time Blocks (Visão Semanal)

```
┌────────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Goal Planner    < Semana 20-26 Jan 2026 >    [+ Nova Semana]     │
├────────────────────────────────────────────────────────────────────────────┤
│         DOM(19)   SEG(20)   TER(21)   QUA(22)   QUI(23)   SEX(24)   SAB(25)│
│            │        │         │         │         │         │        │     │
│ ONE        │        │    X    │    X    │         │    X    │        │     │
│ THING      │        │ [Tarefa]│ [Tarefa]│         │ [Tarefa]│         │     │
│            │        │         │         │         │         │        │     │
│ ─────────  │ ─────  │  ─────  │  ─────  │  ─────  │  ─────  │  ───── │     │
│            │        │         │         │         │         │        │     │
│ MANHÃ      │  [vazio]│ [Tarefa]│ [Tarefa]│ [Tarefa]│ [Tarefa]│ [vazio]│     │
│            │        │ [Tarefa]│         │ [Tarefa]│         │        │     │
│            │        │         │         │         │         │        │     │
│ ─────────  │ ─────  │  ─────  │  ─────  │  ─────  │  ─────  │  ───── │     │
│            │        │         │         │         │         │        │     │
│ TARDE      │ [Tarefa]│ [Tarefa]│ [vazio] │ [Tarefa]│ [Tarefa]│ [vazio]│     │
│            │         │         │         │         │         │        │     │
│            │        │         │         │         │         │        │     │
│ ─────────  │ ─────  │  ─────  │  ─────  │  ─────  │  ─────  │  ───── │     │
│            │        │         │         │         │         │        │     │
│ NOITE      │ [Tarefa]│ [Tarefa]│ [Tarefa]│ [Tarefa]│ [vazio] │ [vazio]│     │
│            │         │         │         │         │         │        │     │
│ ─────────  │ ─────  │  ─────  │  ─────  │  ─────  │  ─────  │  ───── │     │
│            │        │         │         │         │         │        │     │
│ HÁBITOS    │  ▪▪▪▪  │  ▪▪▪▪▪  │  ▪▪▪  │  ▪▪▪  │  ▪▪▪  │  ▪▪  │     │
│ RECORRENTES│  ▪▪▪▪  │  ▪▪▪  │  ▪▪  │  ▪▪  │  ▪▪  │  ▪  │     │
│            │        │         │         │         │         │        │     │
├────────────────────────────────────────────────────────────────────────────┤
│ Legenda: X = ONE Thing   [vazio] = Dia vazio   ▪ = Concluído   │ = Carga │
└────────────────────────────────────────────────────────────
```

### Componentes Principais

- **Navegador de Semanas:** Controles anterior/próximo, seletor de semana específico, indicador de semana atual.
- **Grade de 7 Colunas:** Uma coluna por dia, com scroll vertical para cada dia.
- **Células de Time Block:** Containers compactos para cada período (Manhã, Tarde, Noite) em cada dia.
- **Indicador de Carga:** Barra de progresso ou indicador visual de ocupação do dia.
- **Mini Cards de Tarefa:** Versão resumida do card de tarefa mostrando apenas título e horário.
- **Resumo Semanal:** Widget no header mostrando tarefas concluídas vs planejadas.
- **Ferramentas de Planejamento:** Botões de ação para copiar tarefas, aplicar templates, limpar dia.

### Campos

- **Semana:** Selecionador de semana (padrão: semana atual)
- **Zoom:** Controle para expandir/contratar visualização dos blocos

### Ações

- **Clique na célula:** Abre modal para adicionar tarefa naquele dia/bloco
- **Arrastar tarefa:** Mover tarefa entre dias e blocos
- **Duplo clique na tarefa:** Abre edição rápida
- **Botão "Copiar dia":** Duplica todas as tarefas de um dia para outro

### Fluxo de Navegação

1. Usuário acessa `/agenda/semana`
2. Sistema carrega planejamento da semana atual
3. Usuário visualiza distribuição de tarefas
4. Pode clicar em dia específico para editar details
5. Arrastar tarefas entre dias para reprogramar
6. Botão de navegação leva para semanas anteriores/próximas

---

## 3. Criar Tarefa Diária

**Rota:** `/agenda/tarefas/criar`

### Layout

A tela de criação de tarefa apresenta um formulário centralizado em um card com sombras suaves. O layout é dividido em seções: informações básicas, vinculação com meta, agendamento e configurações avançadas. A estrutura segue ordem lógica de preenchimento, começando pelo título (mais importante) e avançando para detalhes.

O header contém botão de retorno e título "Nova Tarefa". O corpo do formulário utiliza inputs com labels flutuantes e validação em tempo real. A sidebar direita mostra um preview em tempo real de como a tarefa aparecerá na agenda.

### Estrutura de Time Blocks (não aplicável - formulário)

### Campos

**Seção 1: Informações Básicas**

- **Título da Tarefa:** Input texto (obrigatório, máx 100 caracteres)
- **Descrição:** Textarea (opcional, máx 500 caracteres)
- **Meta Vinculada:** Dropdown de seleção com busca (obrigatório)
  - Lista de metas ativas do usuário
  - Opção "Sem meta específica"
- **Prioridade:** Radio buttons ou Pills (Alta, Média, Baixa)

**Seção 2: Agendamento**

- **Data:** Date picker (padrão: hoje)
- **Horário de Início:** Time picker (opcional)
- **Duração:** Select (15min, 30min, 45min, 1h, 1h30, 2h, custom)
- **Time Block:** Select automático baseado no horário
  - Manhã (06:00-12:00)
  - Tarde (12:00-18:00)
  - Noite (18:00-23:00)

**Seção 3: Recorrência**

- **Tarefa Recorrente:** Toggle switch
- **Tipo de Recorrência:** Select (Diário, Dias úteis, Semanal, Personalizado)
- **Dias da Semana:** Checkboxes (se semanal)
- **Data de Término:** Date picker (opcional, para recorrências)

**Seção 4: Configurações Avançadas**

- **Notificações:** Toggle switch
  - Tipos: Popup, Email, SMS
- **Cor da Etiqueta:** Color picker (opcional)
- **Arquivo Anexos:** File upload (opcional)

### Ações

- **Salvar:** Cria a tarefa e redireciona para a agenda do dia
- **Salvar e Criar Outro:** Salva e limpa formulário para nova tarefa
- **Cancelar:** Retorna para a página anterior
- **Salvar como Rascunho:** Salva sem validar obrigatoriedades

### Fluxo de Navegação

1. Usuário clica em "+" na Agenda Diária ou Semanal
2. Sistema redireciona para `/agenda/tarefas/criar`
3. Usuário preenche os campos seguindo a estrutura do formulário
4. Meta é obrigatória - usuário deve selecionar ou criar nova meta
5. Ao salvar, redireciona para a agenda do dia selecionado
6. Cancelar retorna para a página de origem

---

## 4. Editar Tarefa Diária

**Rota:** `/agenda/tarefas/:id/editar`

### Layout

A tela de edição espelha a estrutura da tela de criação, mas os campos são pré-preenchidos com os dados existentes da tarefa. O layout adiciona informações adicionais como histórico de modificações, datas de criação e conclusão, e vinculados (metas/resultados esperados).

O header exibe o ID da tarefa para referência e botão de excluir. A estrutura de campos é idêntica à criação, com a adição de campos de leitura como "Criado em" e "Última edição". A sidebar mostra o mesmo preview em tempo real.

### Estrutura de Time Blocks (não aplicável - formulário de edição)

### Campos

**Seção 1: Informações Básicas** (igual à criação)

- **Título da Tarefa:** Input texto
- **Descrição:** Textarea
- **Meta Vinculada:** Dropdown
- **Prioridade:** Radio buttons

**Seção 2: Agendamento** (igual à criação)

- **Data:** Date picker
- **Horário:** Time picker
- **Duração:** Select
- **Time Block:** Select

**Seção 3: Recorrência** (igual à criação)

- Toggle e configurações de recorrência
- **Editar série?** Checkbox (se for instância de recorrente)

**Seção 4: Metadados** (apenas leitura)

- **Criado em:** Data e hora
- **Última edição:** Data e hora
- **Status:** Badge (Pendente, Em Andamento, Concluída, Atrasada)

**Seção 5: Configurações Avançadas** (igual à criação)

- Notificações, cor, anexos

### Ações

- **Salvar:** Atualiza tarefa e mantém na página
- **Salvar e Voltar:** Atualiza e retorna para a agenda
- **Excluir:** Abre modal de confirmação
- **Duplicar:** Cria cópia da tarefa
- **Mover para Outro Dia:** Atalho para alterar data

### Fluxo de Navegação

1. Usuário clica em tarefa na agenda
2. Modal de detalhes abre
3. Usuário clica em "Editar"
4. Sistema redireciona para `/agenda/tarefas/:id/editar`
5. Usuário modifica campos necessários
6. Salvar atualiza e retorna para agenda

---

## 5. Modais

### 5.1 Modal de Marcar Tarefa Concluída

**Trigger:** Clique no botão "Concluir" em qualquer tarefa

### Layout

Modal pequeno e focado (400px de largura), centralizado na tela com backdrop escuro. O conteúdo é direto: pergunta de confirmação, detalhes da tarefa, e opções de feedback.

```
┌─────────────────────────────────────────┐
│  ✓ Marcar como Concluída                │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  [Ícone] Título da Tarefa         │  │
│  │  Meta: Nome da Meta               │  │
│  │  ⏱ 09:00 - 10:30                  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  🎯 Como você se sentiu fazendo isso?   │
│  (emoji reactions: 😊 😐 😤 😴)         │
│                                         │
│  📝 Notas rápidas (opcional)             │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ☐ Não mostrar novamente hoje          │
│                                         │
│  ┌─────────────┐   ┌─────────────────┐  │
│  │  Cancelar   │   │  ✓ Concluir     │  │
│  └─────────────┘   └─────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Campos

- **Tarefa:** Display (apenas leitura)
- **Emoji Sentimento:** Selector de 4 emojis
- **Notas:** Textarea opcional para quick reflection
- **Não mostrar novamente:** Checkbox

### Ações

- **Concluir:** Marca tarefa como feita, fecha modal, atualiza lista
- **Cancelar:** Fecha modal sem alterações

### Fluxo

1. Usuário clica "Concluir" em tarefa
2. Modal abre com detalhes da tarefa
3. Usuário pode adicionar emoji e notas
4. Confirmação fecha modal e atualiza UI com animação de conclusão

---

### 5.2 Modal de Adiar Tarefa

**Trigger:** Clique em "Adiar" ou "Mover" em tarefa

### Layout

Modal de tamanho médio (500px), com duas abas: "Adiar" e "Mover para Dia". A estrutura facilita tanto o adiamento simples quanto a reprogramação completa.

```
┌─────────────────────────────────────────────────┐
│  Reprogramar Tarefa                    [X]    │
├─────────────────────────────────────────────────┤
│  [ Adiar ]  [ Mover para Dia ]                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Título: Tarefa de Exemplo                     │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  📅 ADIAR PARA:                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  [Calendário Interativo]                │   │
│  │  S   T   Q   Q   S   S   D             │   │
│  │  20  21  22  23  24  25  26             │   │
│  │  [x]  [x]  [ ]  [ ]  [ ]  [ ]  [ ]      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ⏰ Novo horário (opcional):                    │
│  ┌─────────────────────────────────────────┐   │
│  │  [Time Picker]                          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Motivo do adiamento:                          │
│  ┌─────────────────────────────────────────┐   │
│  │  [Dropdown: Reunião, Doente,           │   │
│  │   Prioridade alterada, Outro]          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ☐ Aplicar mesma programação para próximas     │
│    ocorrências (se tarefa recorrente)          │
│                                                 │
│  ┌─────────────┐   ┌─────────────────────────┐ │
│  │  Cancelar    │   │  ✓ Confirmar           │ │
│  └─────────────┘   └─────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Campos

- **Data:** Date picker com calendário
- **Horário:** Time picker (opcional)
- **Motivo:** Dropdown com opções comuns
- **Aplicar a série:** Checkbox (apenas para recorrentes)

### Ações

- **Confirmar:** Reprograma tarefa, fecha modal, atualiza lista
- **Cancelar:** Fecha modal sem alterações

### Fluxo

1. Usuário clica "Adiar" em tarefa
2. Modal abre com calendário
3. Usuário seleciona nova data/horário
4. Opcionalmente seleciona motivo
5. Confirmação atualiza tarefa e fecha modal

---

### 5.3 Modal de Detalhes da Tarefa

**Trigger:** Clique no corpo da tarefa (não nos botões de ação)

### Layout

Modal de tamanho grande (600px), com layout de duas colunas. Coluna esquerda contém informações principais, direita contém ações e metadados.

```
┌─────────────────────────────────────────────────────────┐
│  Detalhes da Tarefa                              [X]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────┐  ┌─────────────────────┐  │
│  │                         │  │  AÇÕES RÁPIDAS      │  │
│  │  🎯 Título Grande da    │  │                     │  │
│  │     Tarefa              │  │  [ ✓ Concluir ]     │  │
│  │                         │  │  [ ⏳ Adiar     ]   │  │
│  │  📋 Descrição           │  │  [ ✏️ Editar    ]   │  │
│  │  Texto descritivo da    │  │  [ 📤 Mover     ]   │  │
│  │  tarefa com detalhes    │  │  [ 🗑️ Excluir   ]   │  │
│  │  importantes...         │  │                     │  │
│  │                         │  └─────────────────────┘  │
│  │  Meta: [Nome da Meta]   │                           │
│  │  ─────────────────────   │  METADADOS                 │
│  │  📅 24/01/2026           │  ─────────────────────    │
│  │  ⏰ 09:00 - 10:30        │  Criado: 20/01/2026      │
│  │  ⚡ Alta Prioridade      │  Editado: 23/01/2026     │
│  │  🏷️ Trabalho             │  Status: Pendente        │
│  │                         │  Recorrência: Não         │
│  │  🔔 Notificações        │                           │
│  │  Ativas                 │  RESULTADOS               │
│  │  • 15min antes          │  ─────────────────────    │
│  │  • No início            │  Nenhum resultado         │
│  │                         │  adicionado               │
│  │  📎 Anexos (2)          │                           │
│  │  • arquivo.pdf          │  [+ Adicionar Resultado]  │
│  │  • imagem.png           │                            │
│  └─────────────────────────┘                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Campos

Esta tela é primariamente de visualização. Os campos são todos "display only":

- **Título:** Display
- **Descrição:** Display
- **Meta:** Display com link para página da meta
- **Data/Horário:** Display
- **Prioridade:** Display com badge colorido
- **Etiqueta:** Display
- **Notificações:** Lista
- **Anexos:** Lista com links para download
- **Metadados:** Datas e status

### Ações

- **Concluir:** Abre modal de conclusão
- **Adiar:** Abre modal de adiamento
- **Editar:** Redireciona para página de edição
- **Mover:** Abre modal deadiamento com aba "Mover"
- **Excluir:** Abre modal de confirmação de exclusão
- **Adicionar Resultado:** Campo para adicionar outcome/resultado

### Fluxo

1. Usuário clica na tarefa
2. Modal de detalhes abre com todas informações
3. Usuário pode executar ações rápidas
4. Qualquer modificação fecha o modal e atualiza a lista

---

### 5.4 Modal de Configuração de Notificação

**Trigger:** Clique no ícone de sino na tarefa ou nas configurações globais

### Layout

Modal de tamanho pequeno (450px), focado em configurações de notificação. Estrutura em grupos de switches e opções.

```
┌─────────────────────────────────────────────────┐
│  🔔 Configurações de Notificação         [X]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Lembrete para: "Título da Tarefa"             │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  NOTIFICAÇÕES DO APP                            │
│  ─────────────────────────────────────────     │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Lembrete antes do horário              │   │
│  │  [Toggle: ON]                            │   │
│  │                                          │   │
│  │  Quando:                                 │   │
│  │  [Select: 5min | 15min | 30min | 1h]    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Notificação no horário                 │   │
│  │  [Toggle: ON]                            │   │
│  │                                          │   │
│  │  Texto customizado:                     │   │
│  │  [Input text]                            │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  OUTROS CANAIS                                  │
│  ─────────────────────────────────────────     │
│                                                 │
│  📧 Email                                       │
│  [Toggle: OFF]                                 │
│                                                 │
│  📱 SMS                                        │
│  [Toggle: OFF]                                 │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  ⏰ Não Perturbe                                 │
│  Ativar modo DnD durante esta tarefa           │
│  [Toggle: OFF]                                 │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Salvar configurações                    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Campos

**Notificações do App:**

- **Lembrete antes:** Toggle + Select de tempo (5min, 15min, 30min, 1h, custom)
- **Notificação no horário:** Toggle + Input de texto customizado
- **Som:** Toggle para som/notificação silenciosa

**Outros Canais:**

- **Email:** Toggle + configuração adicional se ativo
- **SMS:** Toggle + configuração adicional se ativo

**Configurações Especiais:**

- **Modo DnD:** Toggle para ativar Não Perturbe durante a tarefa

### Ações

- **Salvar:** Aplica configurações e fecha modal
- **Reset:** Restaura para configurações padrão
- **Testar Notificação:** Envia notificação de teste

### Fluxo

1. Usuário clica no ícone de sino
2. Modal abre com configurações atuais
3. Usuário ajusta preferências
4. Salvar aplica e fecha modal

---

## Resumo de Navegação

```
/agenda/hoje (Tela Principal)
    │
    ├── [+]
    │   └── /agenda/tarefas/criar
    │       │
    │       └── [Salvar] → /agenda/hoje
    │
    ├── [Clique na tarefa]
    │   └── Modal de Detalhes
    │       │
    │       ├── [Concluir] → Modal de Conclusão
    │       ├── [Adiar] → Modal de Adiamento
    │       ├── [Editar] → /agenda/tarefas/:id/editar
    │       └── [Excluir] → Modal de Confirmação
    │
    └── [Sidebar: Semanal]
        └── /agenda/semana
            │
            └── [Clique na célula]
                └── Modal de Criação Rápida
```

---

## Regras de Negócio para Time Blocks

1. **ONE Thing:** Apenas uma tarefa pode ser designada como ONE Thing por dia. Selecionar uma nova remove a anterior.
2. **Tarefas Atrasadas:** Exibidas automaticamente quando a data de vencimento < data atual. Não aparecem em time blocks específicos.
3. **Classificação Automática:** Tarefas com horário são automaticamente alocadas no bloco correto (Manhã/Tarde/Noite). Tarefas sem horário aparecem como "Sem horário específico".
4. **Hábitos:** Sempre visíveis, com checkboxes para acompanhamento diário.
5. **Recorrentes:** Appecem em todos os dias designados, com indicador visual de instância vs template.
