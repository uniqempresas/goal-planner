# Módulo 3 - Áreas de Vida

Este documento apresenta os wireframes detalhados para o módulo de Áreas de Vida do Goal Planner. O módulo permite que os usuários organizem suas metas em categorias específicas de vida, facilitando o acompanhamento e a priorização de objetivos em diferentes dimensões pessoais e profissionais.

---

## 1. Lista de Áreas de Vida

**Rota:** `/areas`

### Layout

- **Header:** Barra de navegação superior com logo do Goal Planner à esquerda, menu de navegação centralizado (Dashboard, Metas, Áreas de Vida, Relatórios) e avatar do usuário com menu dropdown à direita.
- **Content:** Container centralizado com largura máxima de 1200px, contendo título da página, botão de adicionar nova área, Cards em grid responsivo (2 colunas em desktop, 1 coluna em tablet/mobile).
- **Footer:** Barra inferior com links de suporte, termos e privacidade, copyright.

### Componentes

- **Page Header:** Título "Áreas de Vida" com descrição "Gerencie as categorias da sua vida"
- **Add Button:** Botão flutuante ou fixo no topo com ícone "+" e texto "Nova Área"
- **Area Card:** Card contendo nome da área, cor de identificação, quantidade de metas associadas, progresso geral, mini barra de progresso
- **Empty State:** Ilustração com mensagem "Nenhuma área cadastrada" quando não houver áreas
- **Search Bar:** Campo de busca para filtrar áreas por nome
- **Filter Dropdown:** Dropdown para filtrar por status (Todas, Ativas, Inativas)

### Campos

- Não aplicável para esta tela (apenas visualização)

### Ações

- **Nova Área:** Redireciona para `/areas/new`
- **Card (clique):** Navega para `/areas/:id` (Detalhe da Área)
- **Card (ícone editar):** Navega para `/areas/:id/edit`
- **Card (ícone excluir):** Abre Modal de Confirmação de Exclusão
- **Buscar:** Filtra a lista em tempo real
- **Filtrar:** Mostra apenas áreas conforme status selecionado

---

## 2. Detalhe da Área de Vida

**Rota:** `/areas/:id`

### Layout

- **Header:** Breadcrumb (Home > Áreas de Vida > [Nome da Área]), botão de voltar, ações rápidas (Editar, Excluir)
- **Content:** Container centralizado com informações da área, lista de metas associadas organizada por status, estatisticas
- **Sidebar (opcional):** Resumo rápido da área (progresso total, metas concluídas, próximas tarefas)

### Componentes

- **Area Header:** Nome da área em destaque, cor de identificação, descrição, data de criação
- **Stats Card:** Cards de estatística (Total de Metas, Concluídas, Em Andamento, Atrasadas)
- **Progress Section:** Barra de progresso geral da área com percentual
- **Goals List:** Lista de metas filtrável por status (Todas, Ativas, Concluídas)
- **Goal Item:** Item de meta com checkbox de conclusão, título, prazo, prioridade, tags
- **Quick Add:** Campo rápido para adicionar nova meta nesta área
- **Empty Goals State:** Mensagem "Nenhuma meta nesta área" com botão para criar

### Campos

- Não aplicável para esta tela (apenas visualização e interação com metas)

### Ações

- **Voltar:** Retorna para `/areas`
- **Editar:** Navega para `/areas/:id/edit`
- **Excluir:** Abre Modal de Confirmação de Exclusão
- **Criar Meta:** Abre formulário inline ou navega para criação de meta
- **Marcar Meta (checkbox):** Alterna status de conclusão da meta
- **Clicar Meta:** Navega para detalhe da meta
- **Filtrar Metas:** Filtra lista por status

---

## 3. Edição de Área de Vida

**Rota:** `/areas/:id/edit`

### Layout

- **Header:** Breadcrumb com botão de voltar, título "Editar Área"
- **Content:** Formulário centralizado em container (max-width: 600px)
- **Footer:** Botões de Cancelar e Salvar alterações

### Componentes

- **Page Title:** "Editar Área de Vida"
- **Form Container:** Card contendo o formulário
- **Name Input:** Campo de texto para nome da área (obrigatório)
- **Description Textarea:** Campo de área de texto para descrição (opcional)
- **Color Picker:** Seletor de cor com predefined colors e opção custom
- **Status Toggle:** Toggle switch para Ativo/Inativo
- **Goals Preview:** Lista preview das metas associadas (apenas visualização)
- **Form Actions:** Botões de ação do formulário

### Campos

- **Nome:** Texto (obrigatório, máx. 100 caracteres)
- **Descrição:** Texto longo (opcional, máx. 500 caracteres)
- **Cor:** Selector de cor (predefined: Azul, Verde, Amarelo, Laranja, Roxo, Pink, Cinza; Custom: hexadecimal)
- **Status:** Toggle (Ativo/Inativo)

### Ações

- **Cancelar:** Retorna para `/areas/:id` (sem salvar)
- **Salvar:** Valida e salva as alterações, redireciona para `/areas/:id`
- **Voltar:** Retorna para `/areas/:id` (sem salvar)

---

## 4. Modal de Confirmação de Exclusão

**Rota:** Modal overlay (em qualquer tela)

### Layout

- **Overlay:** Fundo semi-transparente (backdrop blur)
- **Modal Container:** Card centralizado (max-width: 400px) com bordas arredondadas, sombra
- **Content:** Ícone de alerta, título, mensagem explicativa, botões de ação

### Componentes

- **Warning Icon:** Ícone de exclamação em círculo (laranja/amarelo)
- **Title:** "Confirmar Exclusão"
- **Message:** Texto explicando ação e consequências
- **Affected Items:** Lista de itens que serão afetados (ex: "3 metas serão desprotegidas")
- **Confirm Button:** Botão vermelho "Excluir"
- **Cancel Button:** Botão secundário "Cancelar"

### Campos

- Não aplicável (modal de confirmação)

### Ações

- **Excluir:** Remove a área e redireciona para `/areas` (após sucesso)
- **Cancelar:** Fecha o modal sem realizar ação
- **Click outside:** Fecha o modal (com confirmação se houver alterações)

---

## Fluxo de Navegação

```
/areas (Lista)
    │
    ├── [+ Nova Área] ──> (/areas/new - não coberto neste módulo)
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
            │
            ├── [Confirmar] ──> /areas (sem a área)
            │
            └── [Cancelar] ──> Fecha Modal
```

---

##wireframe-visual-resumo

### Wireframe 1: Lista de Áreas (`/areas`)

```
┌─────────────────────────────────────────────────────────┐
│ [Logo]    Dashboard  Metas  Áreas  Relatórios    [👤]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Áreas de Vida                              [+ Nova]  │
│   Gerencie as categorias da sua vida                   │
│                                                         │
│   [🔍 Buscar áreas...]            [Filtrar: Todas ▼]  │
│                                                         │
│   ┌──────────────────────┐  ┌──────────────────────┐    │
│   │ ■ CARREIRA          │  │ ■ SAÚDE              │    │
│   │ 5 metas              │  │ 3 metas              │    │
│   │ ████████░░ 80%       │  │ ██████░░░░ 60%       │    │
│   │ [✏️] [🗑️]            │  │ [✏️] [🗑️]            │    │
│   └──────────────────────┘  └──────────────────────┘    │
│                                                         │
│   ┌──────────────────────┐  ┌──────────────────────┐    │
│   │ ■ FINANÇAS           │  │ ■ FAMÍLIA            │    │
│   │ 2 metas              │  │ 4 metas              │    │
│   │ ████░░░░░░ 40%       │  │ ███████░░░ 70%       │    │
│   │ [✏️] [🗑️]            │  │ [✏️] [🗑️]            │    │
│   └──────────────────────┘  └──────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Wireframe 2: Detalhe da Área (`/areas/:id`)

```
┌─────────────────────────────────────────────────────────┐
│ Home > Áreas de Vida > Carreira           [Voltar]     │
│                                    [✏️ Editar] [🗑️]     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ■ CARREIRA                                           │
│   Construir uma carreira sólida e satisfatória        │
│   Criada em: 15 de Janeiro de 2026                    │
│                                                         │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│   │Total   │ │Concluídas│ │Em Andam.│ │Atrasadas│        │
│   │   5    │ │   2    │ │   2    │ │   1    │         │
│   └────────┘ └────────┘ └────────┘ └────────┘         │
│                                                         │
│   Progresso: ████████░░░░░░ 40%                        │
│                                                         │
│   ─────────────────────────────────────────────────    │
│                                                         │
│   Metas (Todas ▼)                      [+ Nova Meta]   │
│                                                         │
│   ☐ Tornar-se Engenheiro Senior                         │
│      Prazo: 31/12/2026    Alta prioridade              │
│                                                         │
│   ☑ Aprender nova tecnologia                            │
│      Prazo: 30/06/2026    Média prioridade            │
│                                                         │
│   ☐ Mentorar desenvolvedores júnior                     │
│      Prazo: 31/03/2026    Alta prioridade              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Wireframe 3: Edição de Área (`/areas/:id/edit`)

```
┌─────────────────────────────────────────────────────────┐
│ Home > Áreas de Vida > Carreira > Editar   [Voltar]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Editar Área de Vida                                   │
│                                                         │
│   ┌─────────────────────────────────────────────────┐  │
│   │ Nome *                                           │  │
│   │ [Carreira                                   ]    │  │
│   └─────────────────────────────────────────────────┘  │
│                                                         │
│   ┌─────────────────────────────────────────────────┐  │
│   │ Descrição                                        │  │
│   │ [Construir uma carreira sólida e satisfatória ] │  │
│   │                                         (500 car)│  │
│   └─────────────────────────────────────────────────┘  │
│                                                         │
│   Cor de Identificação                                  │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐                 │
│   │  │ │  │ │  │ │  │ │  │ │  │ │  │                 │
│   └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘                │
│   (Azul selecionado)                                    │
│                                                         │
│   ┌─────────────────────────────────────────────────┐  │
│   │ Status: Ativo  [○────●]                         │  │
│   └─────────────────────────────────────────────────┘  │
│                                                         │
│   Metas Associadas (2)                                  │
│   • Tornar-se Engenheiro Senior                        │
│   • Aprender nova tecnologia                            │
│                                                         │
│        [Cancelar]          [Salvar Alterações]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Wireframe 4: Modal de Confirmação de Exclusão

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│         ┌─────────────────────────────────┐             │
│         │                                 │             │
│         │      ⚠️                         │             │
│         │                                 │             │
│         │   Confirmar Exclusão           │             │
│         │                                 │             │
│         │   Tem certeza que deseja       │             │
│         │   excluir "Carreira"?           │             │
│         │                                 │             │
│         │   Esta ação não pode ser       │             │
│         │   desfeita. As 5 metas         │             │
│         │   associadas não serão         │             │
│         │   excluídas.                   │             │
│         │                                 │             │
│         │  [Cancelar]    [Excluir]       │             │
│         │                                 │             │
│         └─────────────────────────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Detalhes de Implementação

### Cores Recomendadas (predefined)
- **Azul:** #3B82F6 (profissional, confiança)
- **Verde:** #10B981 (crescimento, saúde)
- **Amarelo:** #F59E0B (energia, cautela)
- **Laranja:** #F97316 (motivação, ação)
- **Roxo:** #8B5CF6 (criatividade, espiritualidade)
- **Pink:** #EC4899 (amor, relacionamentos)
- **Cinza:** #6B7280 (neutro, geral)

### Responsividade
- **Desktop (>1024px):** Grid de 2-3 colunas
- **Tablet (768px-1024px):** Grid de 2 colunas
- **Mobile (<768px):** Lista única vertical

### Validações do Formulário
- Nome obrigatório, mínimo 2 caracteres
- Descrição opcional, máximo 500 caracteres
- Cor obrigatória (pelo menos uma seleção)
- Status default: Ativo

### Estados de Loading
- Skeleton loading durante fetch de dados
- Spinner no botão durante submit
- Toast de sucesso/error após operações
