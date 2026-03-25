# Módulo 6 - Templates

Este módulo permite aos usuários explorar e aplicar templates de metas pré-definidos para diferentes áreas da vida. Os templates servem como ponto de partida para a criação de novas metas, oferecendo estrutura e inspiração.

---

## Tela 1: Biblioteca de Templates

**Rota:** `/templates`

### Layout

A tela é organizada em formato de **grid responsivo** com as seguintes regiões:

- **Header**: Título da página "Biblioteca de Templates" + descrição introdutória
- **Barra de Filtros**: Abas horizontais para filtrar por categoria + campo de busca
- **Grid de Cards**: Cards de templates organizados em colunas (3 colunas desktop, 2 tablet, 1 mobile)
- **Footer**: Estatísticas de uso e link para criar template personalizado

### Estrutura de Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🎯 Biblioteca de Templates                                   │ │
│ │ Escolha um template para iniciar sua jornada               │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ FILTROS                                                         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [🔍 Buscar templates...]                                     │ │
│ │ -------------------------------------------------------------│ │
│ │ [Todas] [Saúde] [Carreira] [Estudos] [Finanças] [Família] │ │
│ │ [Lazer] [Desenvolvimento Pessoal]                           │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ GRID DE TEMPLATES                                               │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│ │  CARD 1      │ │  CARD 2      │ │  CARD 3      │          │
│ │  ─────────── │ │  ─────────── │ │  ─────────── │          │
│ │  [Preview]   │ │  [Preview]   │ │  [Preview]   │          │
│ │  Título      │ │  Título      │ │  Título      │          │
│ │  Categoria   │ │  Categoria   │ │  Categoria   │          │
│ │  [Ver +]     │ │  [Ver +]     │ │  [Ver +]     │          │
│ └───────────────┘ └───────────────┘ └───────────────┘          │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│ │  CARD 4      │ │  CARD 5      │ │  CARD 6      │          │
│ │  ...         │ │  ...         │ │  ...         │          │
│ └───────────────┘ └───────────────┘ └───────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER                                                          │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📊 15 templates disponíveis • Crie seu próprio template   │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

1. **Header**
   - Título principal: "Biblioteca de Templates"
   - Subtítulo explicativo sobre o propósito dos templates

2. **Barra de Busca**
   - Input de texto para busca por nome ou descrição
   - Ícone de lupa
   - Placeholder: "Buscar templates..."

3. **Filtros de Categoria (Tabs)**
   - Abas horizontais scrolláveis
   - Categorias: Todas, Saúde, Carreira, Estudos, Finanças, Família, Lazer, Desenvolvimento Pessoal
   - Estado ativo: fundo destacado, borda inferior

4. **Card de Template**
   - **Imagem/Ícone de preview**: Representação visual da meta
   - **Título do template**: Nome da meta template
   - **Categoria**: Badge colorida indicando a área
   - **Descrição curta**: 2-3 linhas resumindo o objetivo
   - **Difficulty indicator**: Indicador visual (fácil/médio/difícil)
   - **Botão "Ver Detalhes"**: Acessa a tela de detalhe
   - **Hover state**: Elevação + borda colorida

5. **Footer**
   - Contador total de templates
   - Link para criar template personalizado (se aplicável)

### Fluxo de Navegação

1. Usuário acessa `/templates` → Carrega biblioteca com todos os templates
2. Usuário clica em aba de categoria → Filtra templates por categoria
3. Usuário digita na busca → Filtra templates em tempo real
4. Usuário clica em "Ver Detalhes" → Navega para `/templates/:id`

### Categorias de Templates

| Categoria | Badge Color | Ícone |
|-----------|-------------|-------|
| Saúde | `#10B981` (Green) | ❤️ |
| Carreira | `#6366F1` (Indigo) | 💼 |
| Estudos | `#F59E0B` (Amber) | 📚 |
| Finanças | `#22C55E` (Green) | 💰 |
| Família | `#EC4899` (Pink) | 👨‍👩‍👧 |
| Lazer | `#8B5CF6` (Purple) | 🎮 |
| Desenvolvimento Pessoal | `#14B8A6` (Teal) | 🌱 |

---

## Tela 2: Detalhe do Template

**Rota:** `/templates/:id`

### Layout

A tela apresenta o **detalhamento completo** de um template específico com opção de aplicação.

- **Header**: Breadcrumb + título + botão de voltar
- **Seção Principal**: Dois painéis (esquerda: informações, direita: ações)
- **Preview da Meta**: Estrutura da meta com submeta e prazos
- **Formulário de Aplicação**: Modal ou seção integrada para criar meta

### Estrutura de Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                      │
│ Templates > Saúde > Maratona de Corrida                        │
├─────────────────────────────────────────────────────────────────┤
│ HEADER                                                          │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [← Voltar]                                                   │ │
│ │                                                              │ │
│ │ 🏃 Maratona de Corrida                                      │ │
│ │ Meta de Saúde • Dificuldade: Média                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ CONTEÚDO PRINCIPAL                                             │
│ ┌──────────────────────────────┐ ┌────────────────────────────┐ │
│ │ INFORMAÇÕES DO TEMPLATE      │ │ AÇÕES                      │ │
│ │ ──────────────────────────── │ │ ────────────────────────── │ │
│ │                              │ │                            │ │
│ │ Descrição:                   │ │ [🚀 Aplicar este Template]│ │
│ │ Complete uma maratona de     │ │                            │ │
│ │ corrida em 6 meses...        │ │ ┌────────────────────────┐ │ │
│ │                              │ │ │ Pré-visualização       │ │ │
│ │ Categoria: Saúde             │ │ │ ────────────────────── │ │ │
│ │ Dificuldade: Média           │ │ │ Meta Principal         │ │ │
│ │ Tempo estimado: 6 meses       │ │ │ └─ Submeta 1            │ │ │
│ │                              │ │ │ └─ Submeta 2            │ │ │
│ │ O que você irá conquistar:   │ │ │ └─ Submeta 3            │ │ │
│ │ • Resistência física         │ │ └────────────────────────┘ │ │
│ │ • Disciplina                 │ │                            │ │
│ │ • Saúde cardiovascular       │ │                            │ │
│ │                              │ │                            │ │
│ └──────────────────────────────┘ └────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ ESTRUTURA DA META (PREVIEW)                                    │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📋 Estrutura do Template                                    │ │
│ │ ─────────────────────────────────────────────────────────── │ │
│ │                                                              │ │
│ │  🎯 Meta Principal: [Nome da Meta]                          │ │
│ │     │                                                       │ │
│ │     ├── 📌 Submeta 1: [Título]                             │ │
│ │     │        Prazo: [Data]                                 │ │
│ │     │        Descrição: [Texto]                            │ │
│ │     │                                                       │ │
│ │     ├── 📌 Submeta 2: [Título]                             │ │
│ │     │        Prazo: [Data]                                 │ │
│ │     │        Descrição: [Texto]                            │ │
│ │     │                                                       │ │
│ │     └── 📌 Submeta 3: [Título]                             │ │
│ │              Prazo: [Data]                                 │ │
│ │              Descrição: [Texto]                            │ │
│ │                                                              │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes

1. **Breadcrumb**
   - Link para lista de templates
   - Nome da categoria
   - Título do template atual

2. **Botão Voltar**
   - Ícone de seta esquerda
   - Retorna para `/templates`

3. **Header do Template**
   - Ícone grande representativo
   - Título principal
   - Categoria + Dificuldade em badges

4. **Informações do Template**
   - **Descrição completa**: Texto detalhado sobre a meta
   - **Categoria**: Badge colorida
   - **Dificuldade**: Indicador visual (Fácil/Médio/Difícil)
   - **Tempo estimado**: Duração prevista
   - **Lista de conquistas**: Benefícios ao completar a meta

5. **Card de Preview**
   - Visualização hierárquica da estrutura
   - Meta principal no topo
   - Subtarefas hierarquizadas abaixo

6. **Botão Principal de Ação**
   - "Aplicar este Template" - botão CTA principal
   - Estilo proeminente (cor primária)

### Fluxo de Navegação

1. Usuário acessa `/templates/:id` → Carrega detalhes do template específico
2. Usuário clica em "Voltar" → Retorna para `/templates`
3. Usuário clica em "Aplicar este Template" → Abre **Modal de Aplicação**

---

## Modal: Formulário de Aplicação de Template

**Acesso:** A partir da tela de detalhe `/templates/:id`, ao clicar no botão "Aplicar este Template"

### Layout

Modal centralizado com **overlay escuro** semi-transparente. O formulário permite customizar a meta antes de criá-la.

### Estrutura de Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                          OVERLAY                                 │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │  🚀 Criar Meta a partir do Template                 │ │   │
│  │  │  ─────────────────────────────────────────────────── │ │   │
│  │  │                                                       │ │   │
│  │  │  Nome da Meta *                                      │ │   │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │   │
│  │  │  │ Maratona de Corrida 2024                       │ │ │   │
│  │  │  └─────────────────────────────────────────────────┘ │ │   │
│  │  │                                                       │ │   │
│  │  │  Área de Vida *                                      │ │   │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │   │
│  │  │  │ Saúde                                    ▼     │ │ │   │
│  │  │  └─────────────────────────────────────────────────┘ │ │   │
│  │  │                                                       │ │   │
│  │  │  Data de Início *                                    │ │   │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │   │
│  │  │  │ 📅 24/03/2026                                   │ │ │   │
│  │  │  └─────────────────────────────────────────────────┘ │ │   │
│  │  │                                                       │ │   │
│  │  │  Data de Término *                                   │ │   │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │   │
│  │  │  │ 📅 24/09/2026                                   │ │ │   │
│  │  │  └─────────────────────────────────────────────────┘ │ │   │
│  │  │                                                       │ │   │
│  │  │  Prioridade                                          │ │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐               │ │   │
│  │  │  │ 🔴 Alta │ │ 🟡 Média│ │ 🟢 Baixa│               │ │   │
│  │  │  └─────────┘ └─────────┘ └─────────┘               │ │   │
│  │  │                                                       │ │   │
│  │  │  Descrição (opcional)                               │ │   │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │   │
│  │  │  │                                                 │ │ │   │
│  │  │  │                                                 │ │ │   │
│  │  │  └─────────────────────────────────────────────────┘ │ │   │
│  │  │                                                       │ │   │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │   │
│  │  │  │ ✓ Manter as subtarefas do template             │ │ │   │
│  │  │  └─────────────────────────────────────────────────┘ │ │   │
│  │  │                                                       │ │   │
│  │  │  ─────────────────────────────────────────────────── │ │   │
│  │  │                                                       │ │   │
│  │  │  [Cancelar]                        [Criar Meta]      │ │   │
│  │  │                                                       │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │                                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Campos do Formulário

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|--------------|------------|
| Nome da Meta | Input Text | Sim | Nome personalizado para a meta. Preenchido automaticamente com o nome do template |
| Área de Vida | Select Dropdown | Sim | Selecionar qual área de vida esta meta pertence. Opções: Saúde, Carreira, Estudos, Finanças, Família, Lazer, Desenvolvimento Pessoal |
| Data de Início | Date Picker | Sim | Data de início da meta |
| Data de Término | Date Picker | Sim | Data de término prevista |
| Prioridade | Radio Buttons | Não | Nível de prioridade: Alta (🔴), Média (🟡), Baixa (🟢). Default: Média |
| Descrição | Textarea | Não | Descrição adicional ou personalizada para a meta |
| Manter Subtarefas | Checkbox | Sim (default: checked) | Opção para manter ou remover as subtarefas do template |

### Validações

1. **Nome da Meta**: Obrigatório, mínimo 3 caracteres, máximo 100 caracteres
2. **Área de Vida**: Obrigatório, seleção de uma opção
3. **Data de Início**: Obrigatório, não pode ser anterior à data atual
4. **Data de Término**: Obrigatória, deve ser posterior à data de início
5. **Descrição**: Opcional, máximo 500 caracteres

### Ações

| Botão | Ação | Comportamento |
|-------|------|----------------|
| **Cancelar** | Fechar modal | Fecha o modal sem salvar nenhuma informação |
| **Criar Meta** | Submeter formulário | Valida os campos e cria a meta baseada no template |

### Fluxo de Navegação

1. Usuário está na tela de detalhe `/templates/:id`
2. Usuário clica em "Aplicar este Template"
3. Modal abre com formulário pré-preenchido (nome do template, datas calculadas automaticamente)
4. Usuário preenche/customiza os campos
5. Usuário clica em "Criar Meta"
6. Sistema valida os dados
7. Se válido: Cria a meta + subtarefas → Fecha modal → Exibe toast de sucesso → Redireciona para `/goals` ou detalha a meta criada
8. Se inválido: Exibe mensagens de erro nos campos

### Estados do Modal

1. **Aberto**: Modal visível com formulário vazio/preenchido
2. **Processando**: Botão "Criar Meta" desabilitado com spinner, campos desabilitados
3. **Sucesso**: Toast de confirmação, redirecionamento
4. **Erro**: Mensagens de erro nos campos, botão reabilitado

---

## Resumo das Operações CRUD

### Read

- **Listar templates por categoria**: GET `/templates?category={categoria}`
  - Retorna lista de cards com informações resumidas
  - Suporte a paginação e busca por texto

- **Detalhar template**: GET `/templates/{id}`
  - Retorna informações completas do template
  - Inclui estrutura de subtarefas

### Create

- **Aplicar template**: POST `/goals` (com campo `templateId`)
  - Cria nova meta baseada no template
  - Copia todas as subtarefas definidas no template
  - Permite customização de datas, nome e área de vida
  - Opcional: copiar description, priority

---

## Componentes UI Reutilizáveis Sugeridos

Para implementação, sugere-se criar os seguintes componentes:

1. **TemplateCard**: Card para exibir template na lista
2. **CategoryBadge**: Badge colorida por categoria
3. **DifficultyIndicator**: Indicador visual de dificuldade
4. **TemplatePreview**: Visualização hierárquica da estrutura
5. **ApplicationModal**: Modal de formulário de aplicação
6. **CategoryTabs**: Abas de filtro por categoria

---

## Notas de Implementação

1. **Performance**: Implementar virtualização se a lista de templates for muito grande (>50 itens)
2. **Busca**: Implementar busca em tempo real com debounce de 300ms
3. **Imagens**: Usar placeholder otimizado para os cards (lazy loading)
4. **Responsividade**: Garantir que os filtros de categoria sejam scrolláveis em telas pequenas
5. **Feedback**: Sempre mostrar loading states durante fetch de dados
6. **Erros**: Tratar cenários de erro (API indisponível, template não encontrado) com UI apropriada
