# Módulo 4 - Metas Hierárquicas

Este documento apresenta os wireframes detalhados de todas as telas, formulários e modais do módulo de Metas Hierárquicas do Goal Planner. O módulo implementa o sistema de cascateamento de objetivos (Big Rocks → Annual → Monthly → Weekly) permitindo que usuários decomponham metas globais em metas acionáveis de curto prazo.

---

## Nível G - Metas Grandes (Big Goals)

### 1. Lista de Metas Grandes

**Rota:** `/metas/grandes`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                              │
│ [Logo]  Dashboard  Metas  Áreas  Relatórios                      [Avatar] [🔔] [⚙️] │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │  ┌──────────────────────────────────────────────────────────────────────┐    │   │
│ │  │                                                                      │    │   │
│ │  │   🎯 METAS GRANDES                                                  │    │   │
│ │  │   Objetivos de longo prazo que guiam sua vida                      │    │   │
│ │  │                                                                      │    │   │
│ │  │                                         [+ Nova Meta Grande]        │    │   │
│ │  │                                                                      │    │   │
│ │  └──────────────────────────────────────────────────────────────────────┘    │   │
│ │                                                                                 │
│ │  FILTROS E BUSCA                                                              │
│ │  [🔍 Buscar metas...]   [Todas ▼]  [Todos os Status ▼]  [Todas as Áreas ▼]   │
│ │                                                                                 │
│ │  LISTA DE METAS GRANDES                                                       │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                        │  │   │
│ │  │  📌 Tornar-se um líder na indústria de tecnologia                     │  │   │
│ │  │     "Ser reconhecido como especialista..."                             │  │   │
│ │  │                                                                        │  │   │
│ │  │     ████████████████░░░░░░░░░░░░  35%                                 │  │   │
│ │  │                                                                        │  │   │
│ │  │     📅 Início: 01/01/2024    🎯 Conclusão: 31/12/2026                │  │   │
│ │  │     📊 3 Metas Anuais associadas    🏃 2 Em Andamento                │  │   │
│ │  │                                                                        │  │   │
│ │  │     [👁️ Ver Detalhes]  [✏️ Editar]  [🔗 Conectar]  [🗑️ Excluir]   │  │   │
│ │  │                                                                        │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                        │  │   │
│ │  │  📌 Atingir liberdade financeira                                      │  │   │
│ │  │     "Ter investimentos que cubram minhas despesas..."                 │  │   │
│ │  │                                                                        │  │   │
│ │  │     ██████████████████████████░░  75%                                 │  │   │
│ │  │                                                                        │  │   │
│ │  │     📅 Início: 01/01/2023    🎯 Conclusão: 31/12/2028                │  │   │
│ │  │     📊 4 Metas Anuais associadas    🏃 3 Concluídas                  │  │   │
│ │  │                                                                        │  │   │
│ │  │     [👁️ Ver Detalhes]  [✏️ Editar]  [🔗 Conectar]  [🗑️ Excluir]   │  │   │
│ │  │                                                                        │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Page Header:** Título "Metas Grandes" com subtítulo explicativo
- **Primary CTA:** Botão "+ Nova Meta Grande"
- **Search Bar:** Campo de busca em tempo real
- **Filter Dropdowns:** Filtros por status, área de vida
- **Goal Card:** Card com informações da meta, progresso, datas, métricas
- **Quick Actions:** Ícones de ação rápida em cada card
- **Empty State:** Mensagem quando não há metas cadastradas
- **Pagination:** Navegação de páginas se necessário

### Ações

- **[+ Nova Meta Grande]:** Navega para `/metas/grandes/criar`
- **[Card Clique]:** Abre Modal de Detalhes da Meta
- **[👁️ Ver Detalhes]:** Abre Modal de Detalhes com métricas SMART
- **[✏️ Editar]:** Navega para `/metas/grandes/:id/editar`
- **[🔗 Conectar]:** Abre Modal de Conexão de Metas (Domino Effect)
- **[🗑️ Excluir]:** Abre Modal de Confirmação de Exclusão
- **Buscar:** Filtra lista em tempo real

---

### 2. Criar Meta Grande

**Rota:** `/metas/grandes/criar`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Grandes > Criar                                  [Voltar]     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │                                                                                 │   │
│ │  📝 CRIAR META GRANDE                                                          │   │
│ │  Defina seu objetivo de longo prazo                                           │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  TÍTULO *                                                                       │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │                                                                         │   │   │
│ │  │  Qual é o seu objetivo principal?                                      │   │   │
│ │  │  Ex: Tornar-me um líder na indústria de tecnologia                    │   │   │
│ │  │                                                                         │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  FOCUSING QUESTION *                                                            │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │                                                                         │   │   │
│ │  │  Qual é a ÚNICA coisa que, se eu fazer, fará tudo mais fácil?           │   │   │
│ │  │                                                                         │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  DESCRIÇÃO                                                                     │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │                                                                         │   │   │
│ │  │  Detalhe seu objetivo... Por que é importante? O que você quer         │   │   │
│ │  │  alcançar?                                                              │   │   │
│ │  │                                                                         │   │   │
│ │  │                                                                         │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  MÉTRICAS SMART                                                                 │   │
│ │                                                                                 │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │  Indicador          │  Valor Atual │  Valor Alvo    │  Unidade       │   │   │
│ │  ├─────────────────────┼──────────────┼────────────────┼────────────────┤   │   │
│ │  │  [+] Adicionar      │              │                │                │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  VIABILIDADE (1-10)    [███████░░░] 7/10                                     │   │
│ │  Quão realista é alcançar este objetivo?                                      │   │
│ │                                                                                 │   │
│ │  RELEVÂNCIA (1-10)     [████████░░] 9/10                                      │   │
│ │  Quão importante é este objetivo para você?                                   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  DATAS                                                                            │   │
│ │                                                                                 │   │
│ │  ┌────────────────────────────┐    ┌────────────────────────────┐             │   │
│ │  │  📅 Data de Início *       │    │  🎯 Data de Conclusão *    │             │   │
│ │  │  [15/03/2026          ▼]   │    │  [31/12/2028          ▼]   │             │   │
│ │  └────────────────────────────┘    └────────────────────────────┘             │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  ÁREA DE VIDA                                                                    │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │  [Carreira ▼]  [Finanças ▼]  [+ Nova Área]                            │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  MARCOS INTERMEDIÁRIOS                                                          │   │
│ │                                                                                 │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │  ┌────────────────────────────────────────────────────────────────┐   │  │   │
│ │  │  │ 1. Obter certificação técnica                              [🗑️]│   │  │   │
│ │  │  └────────────────────────────────────────────────────────────────┘   │  │   │
│ │  │  ┌────────────────────────────────────────────────────────────────┐   │  │   │
│ │  │  │ 2. Liderar primeiro projeto completo                         [🗑️]│   │  │   │
│ │  │  └────────────────────────────────────────────────────────────────┘   │  │   │
│ │  │  [+] Adicionar Marco                                                │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  ┌───────────────────────────┐  ┌───────────────────────────────────────────┐  │   │
│ │  │      CANCELAR             │  │         CRIAR META GRANDE                 │  │   │
│ │  └───────────────────────────┘  └───────────────────────────────────────────┘  │   │
│ │                                                                                 │   │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Campos SMART

| Campo | Tipo | Descrição |
|-------|------|-----------|
| título | text | Nome do objetivo (obrigatório, máx. 200 caracteres) |
| focusingQuestion | text | Pergunta focal que guia o objetivo (obrigatório, máx. 300 caracteres) |
| descricao | textarea | Descrição detalhada do objetivo (opcional, máx. 1000 caracteres) |
| metricas | array | Array de objetos {indicador, valorAtual, valorAlvo, unidade} |
| viabilidade | number | Score 1-10 |
| relevancia | number | Score 1-10 |
| dataInicio | date | Data de início (obrigatória) |
| dataConclusao | date | Data de conclusão (obrigatória, deve ser > dataInicio) |
| areaVida | select | Área de vida associada |
| marcos | array | Array de objetos {titulo, descricao, dataConclusao, status} |

### Ações

- **CANCELAR:** Retorna para `/metas/grandes`
- **CRIAR META GRANDE:** Valida campos obrigatórios, salva e redireciona para `/metas/grandes/:id`
- **[+] Adicionar Métrica:** Adiciona nova linha na tabela de métricas
- **[+] Adicionar Marco:** Adiciona novo campo para marco intermediário
- **Seletor de Data:** Abre date picker para seleção

---

### 3. Detalhe da Meta Grande

**Rota:** `/metas/grandes/:id`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Grandes > Tornar-se um líder...              [Voltar]         │
│                                                       [✏️ Editar] [🗑️] [🔗 Conectar] │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌──────────────────────────────────┐  ┌────────────────────────────────────────┐    │
│ │  HEADER DA META                   │  │  ESTATÍSTICAS                          │    │
│ │  ┌──────────────────────────────┐ │  │  ┌────────┐ ┌────────┐ ┌────────┐   │    │
│ │  │ 📌                            │ │  │  │Viabil. │ │Relev.  │ │Progress│   │    │
│ │  │ Tornar-se um líder           │ │  │  │  7/10  │ │  9/10  │ │  35%   │   │    │
│ │  │ na indústria de tecnologia   │ │  │  └────────┘ └────────┘ └────────┘   │    │
│ │  │                              │ │  │                                        │    │
│ │  │ "Ser reconhecido como        │ │  │  Tempo Restante: 2 anos, 9 meses     │    │
│ │  │  especialista e influencer..."│ │  │  Próximo Marco: 15/06/2026          │    │
│ │  │                              │ │  └────────────────────────────────────────┘    │
│ │  │ 📅 01/01/2024 - 31/12/2028   │ │                                              │
│ │  │ 🎯 Carreira                  │ │                                              │
│ │  └──────────────────────────────┘ │                                              │
│ └──────────────────────────────────┘                                               │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ PROGRESSO GERAL                                                                      │
│ ████████████████░░░░░░░░░░░░░░░░░░░░░░░░  35%                                     │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ MÉTRICAS SMART                            [+ Adicionar]                            │
│ ┌────────────────────┬──────────────┬──────────────┬─────────────┬────────────┐  │
│ │ Indicador          │ Valor Atual  │ Valor Alvo   │ Progresso   │  Ações     │  │
│ ├────────────────────┼──────────────┼──────────────┼─────────────┼────────────┤  │
│ │ Palestras dados    │     12       │      30      │    40%      │ [✏️] [🗑️] │  │
│ │ Artigos publicados │      5       │      20      │    25%      │ [✏️] [🗑️] │  │
│ │ Projetos liderados │      2       │       5      │    40%      │ [✏️] [�️] │  │
│ └────────────────────┴──────────────┴──────────────┴─────────────┴────────────┘  │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ MARCOS INTERMEDIÁRIOS                                                                 │
│ ┌──────────────────────────────────────────────────────────────────────────────┐   │   │
│ │ ✓ 1. Obter certificação técnica (Concluído em 15/06/2025)                  │   │   │
│ │ ○ 2. Mentorar 3 desenvolvedores (Pendente - Prazo: 31/12/2025)             │   │   │
│ │ ○ 3. Apresentar em conferência (Pendente - Prazo: 30/06/2026)             │   │   │
│ │ ○ 4. Publicar livro técnico (Pendente - Prazo: 31/12/2027)                 │   │   │
│ └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ METAS ANUAIS ASSOCIADAS (CASCATA)                                [+ Criar Anual]   │
│ ┌──────────────────────────────────────────────────────────────────────────────┐   │   │
│ │  📅 2026 ████████░░ 60%                                                       │   │   │
│ │  │ • Dominar framework de IA            [✏️] [👁️]                          │   │   │
│ │  │ • Escrever 10 artigos técnicos      [✏️] [👁️]                          │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ │  📅 2025 ████████████████ 100%                                                 │   │   │
│ │  │ • Obter certificação AWS            [✓]                                  │   │   │
│ │  │ • Começar blog técnico              [✓]                                  │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ │  📅 2024 ████████████████ 100%                                                 │   │   │
│ │  │ • Estudar gestão de projetos       [✓]                                  │   │   │
│ │  │ • Liderar primeiro projeto         [✓]                                  │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Meta Header:** Título, descrição, datas, área de vida
- **Stats Cards:** Viabilidade, relevância, progresso, tempo restante
- **Progress Bar:** Barra de progresso visual
- **Metrics Table:** Tabela de métricas com edição inline
- **Milestones List:** Lista de marcos com status
- **Cascade View:** Visualização das metas anuais vinculadas
- **Quick Actions:** Editar, excluir, conectar

### Ações

- **[Voltar]:** Retorna para `/metas/grandes`
- **[✏️ Editar]:** Navega para `/metas/grandes/:id/editar`
- **[🗑️ Excluir]:** Abre Modal de Confirmação
- **[🔗 Conectar]:** Abre Modal de Conexão de Metas
- **[+ Adicionar Métrica]:** Adiciona nova métrica
- **[+] Criar Anual:** Cria meta anual vinculada
- **[✓] Marco:** Alterna status do marco
- **[👁️] Meta Anual:** Abre detalhes da meta anual

---

### 4. Editar Meta Grande

**Rota:** `/metas/grandes/:id/editar`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Grandes > Tornar-se um líder... > Editar       [Voltar]       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ Estrutura idêntica ao "Criar Meta Grande", porém:                                  │
│                                                                                     │
│ - Campos pré-preenchidos com dados existentes                                       │
│ - Botão "SALVAR ALTERAÇÕES" em vez de "CRIAR META GRANDE"                          │
│ - Seção "Metas Associadas" mostrando metas anuais já vinculadas                   │
│ - Option de deleter a meta                                                         │
│                                                                                     │
│ DIFERENÇAS:                                                                         │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │                                                                                 │   │
│ │  🔗 METAS ASSOCIADAS (3)                                                      │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │ • 2026: Dominar framework de IA                     [Desvincular]     │   │   │
│ │  │ • 2025: Obter certificação AWS                         [Desvincular]     │   │   │
│ │  │ • 2024: Começar blog técnico                             [Desvincular]     │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  ┌───────────────────────────┐  ┌───────────────────────────────────────────┐  │   │
│ │  │      CANCELAR             │  │         SALVAR ALTERAÇÕES                  │  │   │
│ │  └───────────────────────────┘  └───────────────────────────────────────────┘  │   │
│ │                                                                                 │   │
│ │        [🗑️ Excluir Meta]                                                      │   │
│ │                                                                                 │   │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Campos SMART

Igual ao formulário de criação, todos pré-preenchidos.

### Ações

- **SALVAR ALTERAÇÕES:** Valida e salva, retorna para `/metas/grandes/:id`
- **CANCELAR:** Retorna para `/metas/grandes/:id` sem alterações
- **Desvincular:** Remove vínculo com meta anual
- **Excluir Meta:** Abre Modal de Confirmação de Exclusão

---

## Nível A - Metas Anuais (Annual Goals)

### 5. Lista de Metas Anuais

**Rota:** `/metas/annual`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                              │
│ [Logo]  Dashboard  Metas  Áreas  Relatórios                      [Avatar] [🔔] [⚙️] │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │  ┌──────────────────────────────────────────────────────────────────────┐    │   │
│ │  │                                                                      │    │   │
│ │  │   📅 METAS ANUAIS                                                  │    │   │
│ │  │   Objetivos para o ano atual                                       │    │   │
│ │  │                                                                      │    │   │
│ │  │   Ano: 2026  [< 2025]  [2026]  [2027 >]                           │    │   │
│ │  │                                                                      │    │   │
│ │  │                                         [+ Nova Meta Anual]         │    │   │
│ │  │                                                                      │    │   │
│ │  └──────────────────────────────────────────────────────────────────────┘    │   │
│ │                                                                                 │
│ │  FILTROS E BUSCA                                                              │
│ │  [🔍 Buscar metas...]   [Todas ▼]  [Todas as Áreas ▼]  [Meta Grande ▼]        │
│ │                                                                                 │
│ │  LISTA DE METAS ANUAIS                                                         │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                        │  │   │
│ │  │  📌 Dominar framework de IA                                          │  │   │
│ │  │     Meta Grande: Tornar-se líder...                                   │  │   │
│ │  │                                                                        │  │   │
│ │  │     ████████████░░░░░░░░░░░░░  60%                                   │  │   │
│ │  │                                                                        │  │   │
│ │  │     📅 Início: 01/01/2026    🎯 Conclusão: 31/12/2026                │  │   │
│ │  │     📊 8 Metas Mensais    🏃 5 Em Andamento    ✓ 2 Concluídas        │  │   │
│ │  │                                                                        │  │   │
│ │  │     [👁️ Ver Detalhes]  [✏️ Editar]  [🔗 Conectar]  [🗑️ Excluir]   │  │   │
│ │  │                                                                        │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                        │  │   │
│ │  │  📌 Economizar R$ 50.000                                              │  │   │
│ │  │     Meta Grande: Atingir liberdade financeira...                      │  │   │
│ │  │                                                                        │  │   │
│ │  │     ████████░░░░░░░░░░░░░░░░░  40%                                   │  │   │
│ │  │                                                                        │  │   │
│ │  │     📅 Início: 01/01/2026    🎯 Conclusão: 31/12/2026                │  │   │
│ │  │     📊 6 Metas Mensais    🏃 3 Em Andamento    ✓ 2 Concluídas        │  │   │
│ │  │                                                                        │  │   │
│ │  │     [👁️ Ver Detalhes]  [✏️ Editar]  [🔗 Conectar]  [🗑️ Excluir]   │  │   │
│ │  │                                                                        │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Year Selector:** Navegação entre anos
- **Page Header:** Título "Metas Anuais" com ano selecionado
- **Primary CTA:** Botão "+ Nova Meta Anual"
- **Filters:** Busca, status, área, meta grande
- **Goal Card:** Card com informações da meta, progresso, metas mensais associadas
- **Meta Grande Badge:** Indicação da meta grande pai

### Ações

- **[< 2025] / [2027 >]:** Navega para metas do ano anterior/próximo
- **[+ Nova Meta Anual]:** Navega para `/metas/annual/criar`
- Demais ações idênticas às Metas Grandes

---

### 6. Criar Meta Anual

**Rota:** `/metas/annual/criar`

### Layout

Estrutura idêntica ao formulário de "Criar Meta Grande" com as seguintes diferenças:

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Anuais > Criar                                  [Voltar]     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │  📝 CRIAR META ANUAL                                                          │   │
│ │  Defina seu objetivo para o ano de 2026                                      │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  [Fields SMART - mesma estrutura]                                             │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  VINCULAR A META GRANDE                                                        │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │                                                                         │   │   │
│ │  │  Selecione a meta grande que esta meta anual sustenta:                 │   │   │
│ │  │                                                                         │   │   │
│ │  │  ○ Tornar-se um líder na indústria de tecnologia (35%)                 │   │   │
│ │  │  ○ Atingir liberdade financeira (75%)                                  │   │   │
│ │  │                                                                         │   │   │
│ │  │  ┌─────────────────────────────────────────────────────────────────┐   │   │   │
│ │  │  │  + Criar nova Meta Grande                                     │   │   │   │
│ │  │  └─────────────────────────────────────────────────────────────────┘   │   │   │
│ │  │                                                                         │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  ┌───────────────────────────┐  ┌───────────────────────────────────────────┐  │   │
│ │  │      CANCELAR             │  │          CRIAR META ANUAL                  │  │   │
│ │  └───────────────────────────┘  └───────────────────────────────────────────┘  │   │
│ │                                                                                 │   │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
```

### Campos SMART

Igual ao formulário de Meta Grande, mais:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| metaGrande | select | Meta Grande associada (obrigatório) |
| ano | number | Ano da meta (preenchido automaticamente baseado na URL ou seleção) |

### Ações

- **CRIAR META ANUAL:** Salva e vincula à meta grande selecionada
- **Selecionar Meta Grande:** Radio button para selecionar meta grande pai
- **+ Criar Nova Meta Grande:** Navega para criar nova meta grande

---

### 7. Detalhe da Meta Anual

**Rota:** `/metas/annual/:id`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Anuais > 2026 > Dominar IA                 [Voltar]           │
│                                              [✏️ Editar] [🗑️] [🔗 Conectar]         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌──────────────────────────────────┐  ┌────────────────────────────────────────┐    │
│ │  HEADER DA META                   │  │  ESTATÍSTICAS                          │    │
│ │  ┌──────────────────────────────┐ │  │  ┌────────┐ ┌────────┐ ┌────────┐   │    │
│ │  │ 📌                            │ │  │  │Viabil. │ │Relev.  │ │Progress│   │    │
│ │  │ Dominar framework de IA      │ │  │  │  8/10  │ │  9/10  │ │  60%   │   │    │
│ │  │                              │ │  │  └────────┘ └────────┘ └────────┘   │    │
│ │  │ "Dominar ferramentas de      │ │  │                                        │    │
│ │  │  IA para aplicar em..."      │ │  │  Metas Mensais: 8 (5 em andamento)   │    │
│ │  │                              │ │  │  Concluídas: 2                        │    │
│ │  │ 📅 01/01/2026 - 31/12/2026   │ │  └────────────────────────────────────────┘    │
│ │  │ 🎯 Carreira                  │ │                                              │
│ │  │ 📊 Vinculada a: "Tornar-se   │ │                                              │
│ │  │       líder..."              │ │                                              │
│ │  └──────────────────────────────┘ │                                              │
│ └──────────────────────────────────┘                                               │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ [Seções de MÉTRICAS e MARCOS - idênticas à Meta Grande]                           │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ METAS MENSALS ASSOCIADAS (CASCATA)                              [+ Criar Mensal] │
│ ┌──────────────────────────────────────────────────────────────────────────────┐   │   │
│ │  📆 Janeiro 2026    ████████████████░░░  75%                                │   │   │
│ │  │ • Estudar fundamentos de ML          [✏️] [✓]                          │   │   │
│ │  │ • Fazer curso de Python para IA       [✏️] [✓]                          │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ │  📆 Fevereiro 2026  ██████████░░░░░░░░░░░░  40%                                │   │   │
│ │  │ • Implementar primeiro projeto IA     [✏️] [○]                          │   │   │
│ │  │ • Ler 2 livros sobre IA               [✏️] [○]                          │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ │  [...]                                                                          │   │
│ └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Ações

- **Ver Detalhes (Meta Grande):** Navega para `/metas/grandes/:id`
- Demais ações idênticas às Metas Grandes

---

### 8. Editar Meta Anual

**Rota:** `/metas/annual/:id/editar`

### Layout

Idêntico ao formulário de "Criar Meta Anual" com campos pré-preenchidos.

---

## Nível M - Metas Mensais (Monthly Goals)

### 9. Lista de Metas Mensais

**Rota:** `/metas/mensal`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                              │
│ [Logo]  Dashboard  Metas  Áreas  Relatórios                      [Avatar] [🔔] [⚙️] │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │  ┌──────────────────────────────────────────────────────────────────────┐    │   │
│ │  │                                                                      │    │   │
│ │  │   📆 METAS MENSAIS                                                 │    │   │
│ │  │   Objetivos para o mês atual                                       │    │   │
│ │  │                                                                      │    │   │
│ │  │   Mês: [< Janeiro]  Fevereiro 2026  [Março >]                      │    │   │
│ │  │                                                                      │    │   │
│ │  │                                         [+ Nova Meta Mensal]        │    │   │
│ │  │                                                                      │    │   │
│ │  └──────────────────────────────────────────────────────────────────────┘    │   │
│ │                                                                                 │
│ │  FILTROS E BUSCA                                                              │
│ │  [🔍 Buscar metas...]   [Todas ▼]  [Meta Anual ▼]  [Todas as Áreas ▼]        │
│ │                                                                                 │
│ │  VISÃO POR SEMANA                                                             │
│ │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                            │   │
│ │  │Semana 1 │ │Semana 2 │ │Semana 3 │ │Semana 4 │   Total: 4 metas         │   │
│ │  │  2 metas│ │  1 meta │ │  1 meta │ │  0 metas│                            │   │
│ │  │ ██████░░│ │ ████░░░░│ │ ████████│ │ ────────│                            │   │
│ │  └─────────┘ └─────────┘ └─────────┘ └─────────┘                            │   │
│ │                                                                                 │
│ │  LISTA DE METAS MENSAIS                                                        │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                        │  │   │
│ │  │  📌 Implementar primeiro projeto IA                                   │  │   │
│ │  │     Meta Anual: Dominar framework de IA...                            │  │   │
│ │  │                                                                        │  │   │
│ │  │     ████████████░░░░░░░░░░░░░  50%                                   │  │   │
│ │  │                                                                        │  │   │
│ │  │     📅 01/02/2026 - 28/02/2026                                        │  │   │
│ │  │     📊 3 Metas Semanais    ✓ 1 Concluída    🏃 2 Em Andamento        │  │   │
│ │  │                                                                        │  │   │
│ │  │     [👁️ Ver Detalhes]  [✏️ Editar]  [🔗 Conectar]  [🗑️ Excluir]   │  │   │
│ │  │                                                                        │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
```

### Componentes

- **Month/Year Selector:** Navegação entre meses
- **Week Overview:** Cards resumindo cada semana
- **Primary CTA:** Botão "+ Nova Meta Mensal"
- **Goal Card:** Card com informações, progresso, metas semanais associadas

### Ações

- **[< Janeiro] / [Março >]:** Navega para mês anterior/próximo
- **[+ Nova Meta Mensal]:** Navega para `/metas/mensal/criar`
- Demais ações idênticas às Metas Anuais

---

### 10. Criar Meta Mensal

**Rota:** `/metas/mensal/criar`

### Layout

Estrutura idêntica ao formulário de "Criar Meta Anual" com as seguintes adaptações:

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Mensais > Criar                                   [Voltar]   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │  📝 CRIAR META MENSAL                                                          │   │
│ │  Defina seu objetivo para Fevereiro de 2026                                    │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  [Fields SMART - mesma estrutura]                                             │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  VINCULAR A META ANUAL                                                          │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │                                                                         │   │   │
│ │  │  Selecione a meta anual que esta meta mensal sustenta:                │   │   │
│ │  │                                                                         │   │   │
│ │  │  ○ Dominar framework de IA (60%)                                       │   │   │
│ │  │  ○ Economizar R$ 50.000 (40%)                                          │   │   │
│ │  │                                                                         │   │   │
│ │  │  [+ Vincular a Nova Meta Anual]                                        │   │   │
│ │  │                                                                         │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  ┌───────────────────────────┐  ┌───────────────────────────────────────────┐  │   │
│ │  │      CANCELAR             │  │          CRIAR META MENSAL                │  │   │
│ │  └───────────────────────────┘  └───────────────────────────────────────────┘  │   │
│ │                                                                                 │   │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
```

### Ações

- **CRIAR META MENSAL:** Salva e vincula à meta anual selecionada

---

### 11. Detalhe da Meta Mensal

**Rota:** `/metas/mensal/:id`

### Layout

Idêntico ao detalhamento da Meta Anual, substituindo "Metas Mensais" por "Metas Semanais":

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Mensais > Fevereiro 2026 > Implementar projeto IA  [Voltar]  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ [HEADER + STATS - idêntico à Meta Anual]                                           │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ [MÉTRICAS + MARCOS - idênticos]                                                    │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ METAS SEMANAIS ASSOCIADAS (CASCATA)                              [+ Criar Semanal] │
│ ┌──────────────────────────────────────────────────────────────────────────────┐   │   │
│ │  📅 Semana 1 (01-07/02)      ████████████░░░░░░░░░░░  50%                  │   │   │
│ │  │ • Configurar ambiente de desenvolvimento     [✏️] [✓]                  │   │   │
│ │  │ • Estudar datasets disponíveis               [✏️] [✓]                  │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ │  📅 Semana 2 (08-14/02)      ██████░░░░░░░░░░░░░░░░░░  25%                  │   │   │
│ │  │ • Implementar modelo baseline                [✏️] [○]                │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ │  📅 Semana 3 (15-21/02)      ░░░░░░░░░░░░░░░░░░░░░░░░  0%                    │   │   │
│ │  │ • [Pendente de definição]                     [✏️]                    │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ │  📅 Semana 4 (22-28/02)      ░░░░░░░░░░░░░░░░░░░░░░░░  0%                    │   │   │
│ │  │ • [Pendente de definição]                     [✏️]                    │   │   │
│ │  └──────────────────────────────────────────────────────────────────────────│   │   │
│ └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 12. Editar Meta Mensal

**Rota:** `/metas/mensal/:id/editar`

### Layout

Idêntico ao formulário de "Criar Meta Mensal" com campos pré-preenchidos.

---

## Nível S - Metas Semanais (Weekly Goals)

### 13. Lista de Metas Semanais

**Rota:** `/metas/semanal`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                              │
│ [Logo]  Dashboard  Metas  Áreas  Relatórios                      [Avatar] [🔔] [⚙️] │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │  ┌──────────────────────────────────────────────────────────────────────┐    │   │
│ │  │                                                                      │    │   │
│ │  │   📅 METAS SEMANAIS                                                 │    │   │
│ │  │   Objetivos para a semana atual                                     │    │   │
│ │  │                                                                      │    │   │
│ │  │   Semana: [< 27 Jan - 02 Fev]  03 - 09 Fev 2026  [10 - 16 Fev >]   │    │   │
│ │  │                                                                      │    │   │
│ │  │                                         [+ Nova Meta Semanal]        │    │   │
│ │  │                                                                      │    │   │
│ │  └──────────────────────────────────────────────────────────────────────┘    │   │
│ │                                                                                 │
│ │  FILTROS E BUSCA                                                              │
│ │  [🔍 Buscar metas...]   [Todas ▼]  [Meta Mensal ▼]  [Todas as Áreas ▼]       │
│ │                                                                                 │
│ │  RESUMO DA SEMANA                                                              │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                         │  │   │
│ │  │  Segunda   Terça   Quarta   Quinta   Sexta   Sábado   Domingo        │  │   │
│ │  │  [○ 1 meta][✓]    [○ 1 meta][         ][         ][         ][        │  │   │
│ │  │                                                                         │  │   │
│ │  │  Total: 2 metas    Concluídas: 1    Em Andamento: 1                   │  │   │
│ │  │                                                                         │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ │  LISTA DE METAS SEMANAIS                                                       │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                        │  │   │
│ │  │  📌 Implementar modelo baseline                                      │  │   │
│ │  │     Meta Mensal: Implementar primeiro projeto IA...                  │  │   │
│ │  │                                                                        │  │   │
│ │  │     ██████████████░░░░░░░░░░░░░░  60%                                 │  │   │
│ │  │                                                                        │  │   │
│ │  │     📅 03/02/2026 - 09/02/2026                                         │  │   │
│ │  │     ⏰ Para sexta-feira, 18:00                                        │  │   │
│ │  │                                                                        │  │   │
│ │  │     [👁️ Ver Detalhes]  [✏️ Editar]  [🔗 Conectar]  [🗑️ Excluir]   │  │   │
│ │  │                                                                        │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ │  ┌────────────────────────────────────────────────────────────────────────┐  │   │
│ │  │                                                                        │  │   │
│ │  │  📌 Revisar documentação                                             │  │   │
│ │  │     Meta Mensal: Implementar primeiro projeto IA...                  │  │   │
│ │  │                                                                        │  │   │
│ │  │     ██████████████████████████  100%                                   │  │   │
│ │  │                                                                        │  │   │
│ │  │     📅 03/02/2026 - 09/02/2026                                         │  │   │
│ │  │     ✓ Concluída em 05/02/2026                                         │  │   │
│ │  │                                                                        │  │   │
│ │  │     [👁️ Ver Detalhes]  [✏️ Editar]  [↩️ Restaurar]                   │  │   │
│ │  │                                                                        │  │   │
│ │  └────────────────────────────────────────────────────────────────────────┘  │   │
│ │                                                                                 │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
```

### Componentes

- **Week Selector:** Navegação entre semanas
- **Weekly Calendar View:** Visualização rápida por dia
- **Primary CTA:** Botão "+ Nova Meta Semanal"
- **Goal Card:** Card com informações, progresso, data limite

### Ações

- **[< Semana Anterior] / [Próxima Semana >]:** Navega para semana anterior/próxima
- **[+ Nova Meta Semanal]:** Navega para `/metas/semanal/criar`
- **[↩️ Restaurar]:** Restaura meta concluída para pendente
- Demais ações idênticas

---

### 14. Criar Meta Semanal

**Rota:** `/metas/semanal/criar`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Semanais > Criar                                   [Voltar]   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────┐   │
│ │  📝 CRIAR META SEMANAL                                                         │   │
│ │  Defina seu objetivo para a semana de 03 - 09 de Fevereiro de 2026            │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  [Fields SMART - mesma estrutura]                                             │   │
│ │                                                                                 │   │
│ │  NOTA: Campos de data de início/conclusão são opcionais para metas semanais   │   │
│ │        Se não definidos, assumem início/fim da semana.                         │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  VINCULAR A META MENSAL                                                        │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │                                                                         │   │   │
│ │  │  Selecione a meta mensal que esta meta semanal sustenta:               │   │   │
│ │  │                                                                         │   │   │
│ │  │  ○ Implementar primeiro projeto IA (50%)                              │   │   │
│ │  │  ○ Escrever 2 artigos técnicos (30%)                                   │   │   │
│ │  │                                                                         │   │   │
│ │  │  [+ Vincular a Nova Meta Mensal]                                       │   │   │
│ │  │                                                                         │   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  DIA DA SEMANA                                                                 │   │
│ │  ┌─────────────────────────────────────────────────────────────────────────┐   │   │
│ │  │  📅 Data de Conclusão (opcional)                                        │   │   │
│ │  │  [Quarta-feira, 05/02/2026                              ▼]              │   │   │
│ │  │                                                                         │   │   │
│ │  │  └─────────────────────────────────────────────────────────────────┘   │   │
│ │  └─────────────────────────────────────────────────────────────────────────┘   │   │
│ │                                                                                 │   │
│ │  ─────────────────────────────────────────────────────────────────────────     │   │
│ │                                                                                 │   │
│ │  ┌───────────────────────────┐  ┌───────────────────────────────────────────┐  │   │
│ │  │      CANCELAR             │  │          CRIAR META SEMANAL                │  │   │
│ │  └───────────────────────────┘  └───────────────────────────────────────────┘  │   │
│ │                                                                                 │   │
│ └────────────────────────────────────────────────────────────────────────────────┘ │
```

### Ações

- **CRIAR META SEMANAL:** Salva e vincula à meta mensal selecionada

---

### 15. Detalhe da Meta Semanal

**Rota:** `/metas/semanal/:id`

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                                          │
│ Home > Metas > Metas Semanais > 03-09 Fev > Implementar modelo baseline  [Voltar] │
│                                                    [✏️ Editar] [🗑️] [🔗 Conectar] │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT                                                                        │
│                                                                                     │
│ ┌──────────────────────────────────┐  ┌────────────────────────────────────────┐    │
│ │  HEADER DA META                   │  │  ESTATÍSTICAS                          │    │
│ │  ┌──────────────────────────────┐ │  │  ┌────────┐ ┌────────┐ ┌────────┐   │    │
│ │  │ 📌                            │ │  │  │Viabil. │ │Relev.  │ │Progress│   │    │
│ │  │ Implementar modelo baseline  │ │  │  │  9/10  │ │  8/10  │ │  60%   │   │    │
│ │  │                              │ │  │  └────────┘ └────────┘ └────────┘   │    │
│ │  │ "Criar modelo de machine      │ │  │                                        │    │
│ │  │  learning baseline..."       │ │  │  Prazo: Sexta, 07/02/2026            │    │
│ │  │                              │ │  │  Dias restantes: 3                    │    │
│ │  │ 📅 03/02/2026 - 09/02/2026   │ │  └────────────────────────────────────────┘    │
│ │  │ 🎯 Meta Mensal: Implementar  │ │                                              │
│ │  │       primeiro projeto IA     │ │                                              │
│ │  └──────────────────────────────┘ │                                              │
│ └──────────────────────────────────┘                                               │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ [MÉTRICAS + MARCOS - estrutura simplificada para semanal]                         │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ CHECKLIST DE AÇÕES                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────┐   │   │
│ │  □ 1. Coletar dados de treinamento                                           │   │   │
│ │  □ 2. Preparar dados (limpeza)                                              │   │   │
│ │  □ 3. Treinar modelo inicial                                                │   │   │
│ │  □ 4. Avaliar resultados básicos                                            │   │   │
│ │  □ 5. Documentar metodologia                                                │   │   │
│ └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ ─────────────────────────────────────────────────────────────────────────────────    │
│                                                                                     │
│ ┌──────────────────────────────────────────────────────────────────────────────┐   │   │
│ │                    ✓ CONCLUIR META                                           │   │   │
│ └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Header com Stats:** Semelhante aos outros níveis
- **Checklist de Ações:** Lista de sub-tarefas para completar a meta semanal
- **Complete CTA:** Botão para marcar meta como concluída

### Ações

- **✓ CONCLUIR META:** Abre Modal de Feedback de Progresso
- **Checkbox:** Alterna status de cada ação
- Demais ações idênticas

---

### 16. Editar Meta Semanal

**Rota:** `/metas/semanal/:id/editar`

### Layout

Idêntico ao formulário de "Criar Meta Semanal" com campos pré-preenchidos.

---

## Modais

### Modal 1: Detalhes da Meta

**Tipo:** Modal/Dialog

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║  📌 DETALHES DA META                                  [X]   ║ │
│  ╠═══════════════════════════════════════════════════════════════╣ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │  TÍTULO                                                  │ ║ │
│  ║  │  Tornar-se um líder na indústria de tecnologia           │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │  FOCUSING QUESTION                                       │ ║ │
│  ║  │  Qual é a ÚNICA coisa que, se eu fazer,                  │ ║ │
│  ║  │  tornará tudo mais fácil?                                │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │  DESCRIÇÃO                                               │ ║ │
│  ║  │  Ser reconhecido como especialista e influencer...       │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ════════════════════════════════════════════════════════   ║ │
│  ║                                                               ║ │
│  ║  📊 MÉTRICAS                                                  ║ │
│  ║  ┌────────────────────────┬────────────┬────────────┬─────────┐║ │
│  ║  │ Indicador              │ Atual      │ Alvo      │ Progress│║ │
│  ║  ├────────────────────────┼────────────┼────────────┼─────────┤║ │
│  ║  │ Palestras              │    12      │    30     │   40%   │║ │
│  ║  │ Artigos                │     5      │    20     │   25%   │║ │
│  ║  └────────────────────────┴────────────┴────────────┴─────────┘║ │
│  ║                                                               ║ │
│  ║  ════════════════════════════════════════════════════════   ║ │
│  ║                                                               ║ │
│  ║  📅 DATAS                                                     ║ │
│  ║  Início: 01/01/2024    │    Conclusão: 31/12/2028            ║ │
│  ║                                                               ║ │
│  ║  ⚡ VIABILIDADE: 7/10     💎 RELEVÂNCIA: 9/10                 ║ │
│  ║                                                               ║ │
│  ════════════════════════════════════════════════════════════════╝ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  [✏️ Editar Meta]        [🔗 Conectar]        [Fechar]        │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Modal Header:** Título e botão fechar
- **Goal Details:** Campos de visualização (não-editáveis)
- **Metrics Table:** Tabela de métricas com progresso
- **Dates & Scores:** Datas e scores de viabilidade/relevância
- **Actions:** Botões de ação

### Ações

- **[X] / [Fechar]:** Fecha o modal
- **[✏️ Editar Meta]:** Fecha modal e navega para edição
- **[🔗 Conectar]:** Abre Modal de Conexão de Metas

---

### Modal 2: Visualização de Métricas SMART

**Tipo:** Modal/Dialog

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║  📊 ANÁLISE SMART                                        [X]   ║ │
│  ╠═══════════════════════════════════════════════════════════════╣ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                          │ ║ │
│  ║  │        ╔═════════════════════════════════════════╗     │ ║ │
│  ║  │        ║        🎯 PROGRESSO GERAL                 ║     │ ║ │
│  ║  │        ║        ████████████████░░░░░░░░░░░░░ 35%   ║     │ ║ │
│  ║  │        ╚═════════════════════════════════════════╝     │ ║ │
│  ║  │                                                          │ ║ │
│  ║  └─────────────────────────────────────────────────────────┘ ║ │
│  ║                                                               ║ │
│  ║  ─────────────────────────────────────────────────────────   ║ │
│  ║                                                               ║ │
│  ║  S - SPECIFIC (Especifica)      │  M - MEASURABLE (Mensurável)   ║ │
│  ║  ═══════════════════════════════╬══════════════════════════════  ║ │
│  ║  Tornar-se reconhecido como     │  • 30 Palestras              ║ │
│  ║  especialista e influencer      │  • 20 Artigos técnicos      ║ │
│  ║  na indústria de tecnologia.    │  • 5 Projetos liderados     ║ │
│  ║                                  │                            ║ │
│  ║  ────────────────────────────────╋────────────────────────────  ║ │
│  ║                                  │                            ║ │
│  ║  A - ACHIEVABLE (Alcançável)    │  R - RELEVANT (Relevante)     ║ │
│  ║  ═══════════════════════════════╬══════════════════════════════  ║ │
│  ║  Viabilidade: 7/10              │  Relevância: 9/10             ║ │
│  ║  ███████░░░░░░░░░░░░░░░░░░░░   │  █████████░░░░░░░░░░░░░░░░   ║ │
│  ║                                  │                            ║ │
│  ║  Realista com esforço           │  Muito importante para      ║ │
│  ║  consistente ao longo de 5 anos. │  carreira e desenvolvimento ║ │
│  ║                                  │  profissional.               ║ │
│  ║                                  │                            ║ │
│  ║  ────────────────────────────────╋────────────────────────────  ║ │
│  ║                                  │                            ║ │
│  ║  T - TIME-BOUND (Temporal)       │                            ║ │
│  ║  ════════════════════════════════                               ║ │
│  ║  Início: 01/01/2024                                          ║ │
│  ║  Conclusão: 31/12/2028 (5 anos)                               ║ │
│  ║                                                               ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  [Fechar]                                                     │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Progress Circle:** Visualização circular do progresso geral
- **SMART Breakdown:** 5 seções representando cada letra do acrônimo
- **Visual Indicators:** Barras e badges para viabilidade e relevância

### Ações

- **[Fechar]:** Fecha o modal

---

### Modal 3: Conexão de Metas (Domino Effect)

**Tipo:** Modal/Dialog

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║  🔗 CONEXÃO DE METAS (Domino Effect)                  [X]   ║ │
│  ╠═══════════════════════════════════════════════════════════════╣ │
│  ║                                                               ║ │
│  ║  Visualize como esta meta se conecta com suas outras metas   ║ │
│  ║  através do efeito dominó.                                   ║ │
│  ║                                                               ║ │
│  ║  ════════════════════════════════════════════════════════   ║ │
│  ║                                                               ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐ ║ │
│  ║  │                                                          │ ║ │
│  ║  │           🎯 META GRANDE (Pai)                         │ ║ │
│  ║  │        "Tornar-se líder na indústria..."               │ ║ │
│  ║  │                   │                                      │ ║ │
│  ║  │                   ▼                                      │ ║ │
│  ║  │         ╔═══════════════════╗                           │ ║ │
│  ║  │         ║   📅 META ANUAL   ║                           │ ║ │
│  ║  │         ║ "Dominar IA..."   ║                           │ ║ │
│  ║  │         ║   Progress: 60%   ║                           │ ║ │
│  ║  │         ╚═══════════════════╝                           │ ║ │
│  ║  │                   │                                      │ ║ │
│  ║  │                   ▼                                      │ ║ │
│  ║  │         ┌───────────────────┐                           │ ║ │
│  ║  │         │  📆 META MENSAL   │                           │ ║ │
│  ║  │         │ "Implementar..."   │                           │ ║ │
│  │  │         │  Progress: 50%    │                           │ ║ │
│  │  │         └───────────────────┘                           │ ║ │
│  │  │                   │                                      │ ║ │
│  │  │                   ▼                                      │ ║ │
│  │  │         ┌───────────────────┐                           │ ║ │
│  │  │         │  📅 META SEMANAL  │                           │ ║ │
│  │  │         │ "Implementar..."  │                           │ ║ │
│  │  │         │  Progress: 60%    │                           │ ║ │
│  │  │         └───────────────────┘                           │ ║ │
│  │  │                                                          │ ║ │
│  │  └─────────────────────────────────────────────────────────┘ ║ │
│  │                                                               ║ │
│  ════════════════════════════════════════════════════════════════╝ │
│                                                                     │
│  OPÇÕES DE CONEXÃO                                                   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Criar nova meta no nível:                                  │  │
│  │  [  Anual  ] [  Mensal  ] [  Semanal  ]                    │  │
│  │                                                               │  │
│  │  Vincular a meta existente:                                 │  │
│  │  [Selecionar meta ▼]                                        │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  [✏️ Editar Esta Meta]  [Criar Abaixo]  [Fechar]            │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Domino Chain:** Visualização vertical da hierarquia de metas
- **Connection Options:** Opções para criar ou vincular novas metas
- **Action Buttons:** Ações de edição e criação

### Ações

- **Criar Abaixo:** Cria nova meta no próximo nível da hierarquia
- **Vincular a Existente:** Abre seletor para vincular meta existente
- **[✏️ Editar Esta Meta]:** Fecha modal e navega para edição

---

### Modal 4: Confirmação de Exclusão

**Tipo:** Modal/Dialog

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║                                                                     ║ │
│  ║                    ⚠️ CONFIRMAR EXCLUSÃO                         ║ │
│  ║                                                                     ║ │
│  ║  ┌─────────────────────────────────────────────────────────────┐   ║ │
│  ║  │                                                             │   ║ │
│  ║  │  Você está prestes a excluir:                              │   ║ │
│  ║  │                                                             │   ║ │
│  ║  │  "Tornar-se um líder na indústria de tecnologia"          │   ║ │
│  ║  │                                                             │   ║ │
│  ║  │  Meta Grande • Criada em 01/01/2024                       │   ║ │
│  ║  │                                                             │   ║ │
│  ║  └─────────────────────────────────────────────────────────────┘   ║ │
│  ║                                                                     ║ │
│  ║  ═══════════════════════════════════════════════════════════   ║ │
│  ║                                                                     ║ │
│  ⚠️  ATENÇÃO:                                                         ║ │
│  • 3 metas anuais associadas serão desvinculadas                    ║ │
│  • Progresso geral será perdido                                      ║ │
│  • Esta ação não pode ser desfeita                                  ║ │
│  ║                                                                     ║ │
│  ════════════════════════════════════════════════════════════════   ║ │
│  ║                                                                     ║ │
│  ┌─────────────────────────────────────────────────────────────┐   ║ │
│  │         [Cancelar]                [Excluir Meta]           │   ║ │
│  │                                   (Vermelho)                 │   ║ │
│  └─────────────────────────────────────────────────────────────┘   ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

- **Warning Icon:** Ícone de alerta
- **Item Summary:** Resumo do item a ser excluído
- **Impact Warning:** Avisos sobre impacto da exclusão
- **Confirm Button:** Botão vermelho de exclusão
- **Cancel Button:** Botão secundário de cancelamento

### Ações

- **Excluir Meta:** Exclui e redireciona para lista de metas
- **Cancelar:** Fecha o modal sem exclusão

### Validações

- Se houver metas filhas, mostrar warning com contagem
- Se meta estiver concluída, avisar que progresso será perdido

---

## Fluxo de Navegação Completo

```
/metas/grandes (Lista G)
    │
    ├── [+ Nova Meta Grande] ──────► /metas/grandes/criar
    │                                       │
    │                                       ├── [Salvar] ──► /metas/grandes/:id
    │                                       │
    │                                       └── [Cancelar] ──► /metas/grandes
    │
    ├── [Card] ──► Modal Detalhes
    │       │
    │       ├── [✏️ Editar] ──► /metas/grandes/:id/editar
    │       │
    │       ├── [🔗 Conectar] ──► Modal Conexão
    │       │
    │       └── [🗑️ Excluir] ──► Modal Confirmação
    │               │
    │               └── [Confirmar] ──► /metas/grandes
    │
    └── [👁️ Métricas] ──► Modal Métricas SMART

/metas/grandes/:id (Detalhe G)
    │
    ├── [✏️ Editar] ──► /metas/grandes/:id/editar
    │
    ├── [🗑️ Excluir] ──► Modal Confirmação
    │
    ├── [🔗 Conectar] ──► Modal Conexão
    │
    ├── [Criar Anual] ──► /metas/annual/criar?parent=:id
    │
    └── [Meta Anual >] ──► /metas/annual/:id

/metas/annual (Lista A)
    │
    ├── [Ano < >] ──► Navega entre anos
    │
    ├── [+ Nova Meta Anual] ──► /metas/annual/criar
    │
    └── [Card] ──► Similar ao fluxo de G

/metas/annual/:id (Detalhe A)
    │
    ├── [Meta Grande >] ──► /metas/grandes/:id
    │
    ├── [Criar Mensal] ──► /metas/mensal/criar?parent=:id
    │
    └── [Meta Mensal >] ──► /metas/mensal/:id

/metas/mensal (Lista M)
    │
    ├── [Mês < >] ──► Navega entre meses
    │
    ├── [+ Nova Meta Mensal] ──► /metas/mensal/criar
    │
    └── [Card] ──► Similar ao fluxo

/metas/mensal/:id (Detalhe M)
    │
    ├── [Meta Anual >] ──► /metas/annual/:id
    │
    ├── [Criar Semanal] ──► /metas/semanal/criar?parent=:id
    │
    └── [Meta Semanal >] ──► /metas/semanal/:id

/metas/semanal (Lista S)
    │
    ├── [Semana < >] ──► Navega entre semanas
    │
    ├── [+ Nova Meta Semanal] ──► /metas/semanal/criar
    │
    └── [Card] ──► Similar ao fluxo

/metas/semanal/:id (Detalhe S)
    │
    ├── [Meta Mensal >] ──► /metas/mensal/:id
    │
    └── [✓ Concluir Meta] ──► Modal Feedback
```

---

## Campos SMART - Referência Completa

| Campo | Nível G | Nível A | Nível M | Nível S | Tipo | Obrigatório |
|-------|---------|---------|---------|---------|------|--------------|
| título | ✓ | ✓ | ✓ | ✓ | text | Sim |
| focusingQuestion | ✓ | ✓ | ✓ | ✓ | text | Sim |
| descricao | ✓ | ✓ | ✓ | ✓ | textarea | Não |
| metricas | ✓ | ✓ | ✓ | ✓ | array | Não |
| viabilidade | ✓ | ✓ | ✓ | ✓ | number (1-10) | Sim |
| relevancia | ✓ | ✓ | ✓ | ✓ | number (1-10) | Sim |
| dataInicio | ✓ | ✓ | ✓ | Opcional | date | Sim* |
| dataConclusao | ✓ | ✓ | ✓ | Opcional | date | Sim |
| areaVida | ✓ | ✓ | ✓ | ✓ | select | Não |
| metaPai | - | ✓ | ✓ | ✓ | select | Sim (A,M,S) |
| marcos | ✓ | ✓ | ✓ | Checklist | array | Não |

*Para metas semanais, pode ser omitido (assume início da semana)

---

## Considerações de UX/UI

### Hierarquia Visual
- **Meta Grande:** Cor mais suave, visual mais在空中, foco em visão de longo prazo
- **Meta Anual:** Cor intermediária, visual annual, destaque para progresso
- **Meta Mensal:** Cor prática, visual de mês, ênfase em actionabilidade
- **Meta Semanal:** Cor urgente, visual de semana, foco em conclusão

### Cores por Nível (Sugestão)
- **G (Grande):** Roxo/Escuro - #8B5CF6
- **A (Anual):** Azul - #3B82F6
- **M (Mensal):** Verde - #10B981
- **S (Semanal):** Laranja - #F97316

### Responsividade
- **Desktop (>1024px):** Sidebar com navegação hierárquica + conteúdo principal
- **Tablet (768-1024px):** Grid de 2 colunas para listas
- **Mobile (<768px):** Lista vertical única, navegação por tabs

### Estados de Progresso
- **0-25%:** Vermelho/Laranja - Ação urgente necessária
- **26-50%:** Amarelo - Em progresso, atenção
- **51-75%:** Verde claro - Bom caminho
- **76-99%:** Verde - Quase completo
- **100%:** Verde escuro + Badge de conclusão

### Animações
- **Transição entre níveis:** Efeito de zoom in/out
- **Progresso:** Animação de preenchimento suave
- **Conclusão:** Celebração (confete) para metas semanais/mensais

---

## Componentes Reutilizáveis

### GoalCard (Genérico)
```
┌──────────────────────────────────────┐
│ 📌 Título da Meta                     │
│ Descrição curta...                   │
│ ████████████████░░░░░░░░░  XX%     │
│ 📅 datas    📊 X metas filhas       │
│ [Ações: 👁️] [✏️] [🔗] [🗑️]         │
└──────────────────────────────────────┘
│ Props: title, description, progress, dates, childCount, status │
```

### ProgressBar
```
███████████████░░░░░░░░░  65%
│ Value: 0-100% │
│ Color: based on progress level │
│ Animated: on value change │
```

### MetricRow
```
┌────────────────┬──────────┬──────────┬─────────┐
│ Indicador      │ Atual    │ Alvo     │ Progress│
├────────────────┼──────────┼──────────┼─────────┤
│ [Nome]         │ [valor]  │ [valor]  │ [XX%]  │
└────────────────┴──────────┴──────────┴─────────┘
│ Inline edit capability │
```

### CascadeView
```
  Meta Pai
      │
      ▼
  ┌─────────┐
  │ Filho 1 │──► Neto 1.1
  │         │──► Neto 1.2
  └─────────┘
      │
      ▼
  ┌─────────┐
  │ Filho 2 │──► Neto 2.1
  └─────────┘
```

---

(End of file - total lines: 892)
