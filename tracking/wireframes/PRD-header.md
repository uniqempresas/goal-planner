# PRD - Header do Goal Planner

**Data:** 25/03/2026  
**Versão:** 1.0  
**Módulo:** Layout / Navegação  
**Status:** Pronto para Planejamento

---

## 1. Visão Geral

O **Header** é o componente principal de navegação superior do Goal Planner. Fica fixo no topo da aplicação em todas as páginas autenticadas e contém elementos de navegação principal, busca global, controle de tema e acesso ao perfil do usuário.

### 1.1 Objetivo

Fornecer uma barra de navegação consistente que permita ao usuário:

- Identificar visualmente a aplicação (logo)
- Acessar rapidamente funcionalidades principais (busca)
- Alternar entre temas claro e escuro
- Acessar notificações
- Gerenciar seu perfil e configurações

### 1.2 Escopo

Este PRD cobre o componente Header completo incluindo todas as variações (desktop e mobile), dropdowns de usuário e comportamento de busca.

---

## 2. Funcionalidades

### 2.1 Logo GP

- **Descrição:** Identificação visual da aplicação
- **Desktop:** Texto "GP" + "Goal Planner"
- **Mobile:** Apenas texto "GP"
- **Comportamento:** Link para o Dashboard (/dashboard)

### 2.2 Busca Global

- **Descrição:** Campo de busca para encontrar metas, áreas e tarefas
- **Visibilidade:** Apenas desktop (telas >= 768px)
- **Placeholder:** "Buscar metas, áreas, tarefas..."
- **Atalho:** Cmd+K / Ctrl+K para focar o campo

### 2.3 Toggle Tema (Light/Dark)

- **Descrição:** Botão para alternar entre modo claro e escuro
- **Ícone:** Sol (☀️) para modo claro, Lua (🌙) para modo escuro
- **Persistência:** Salva a preferência no localStorage

### 2.4 Notificações

- **Descrição:** Ícone com badge indicando notificações não lidas
- **Comportamento:** Link para página de notificações

### 2.5 Avatar do Usuário + Dropdown

- **Descrição:** Avatar clicável que abre menu de opções
- **Dropdown itens:**
  - Informações do usuário (nome + email)
  - Configurações (/configuracoes)
  - Sair (logout)

---

## 3. Requisitos

### 3.1 Requisitos Funcionais

| ID   | Requisito                                                 | Prioridade  |
| ---- | --------------------------------------------------------- | ----------- |
| RF01 | O header deve ser fixo no topo da página                  | Obrigatório |
| RF02 | O logo deve redirecionar para /dashboard                  | Obrigatório |
| RF03 | A busca deve ser ocultada em telas menores que 768px      | Obrigatório |
| RF04 | O toggle de tema deve alternar entre light e dark mode    | Obrigatório |
| RF05 | O tema selecionado deve persistir no localStorage         | Obrigatório |
| RF06 | O avatar deve abrir um dropdown ao ser clicado            | Obrigatório |
| RF07 | O dropdown deve conter opção de configurações             | Obrigatório |
| RF08 | O dropdown deve conter opção de logout                    | Obrigatório |
| RF09 | O campo de busca deve suportar atalho Cmd+K/Ctrl+K        | Desejável   |
| RF10 | O ícone de notificações deve mostrar badge com quantidade | Desejável   |

### 3.2 Requisitos Não-Funcionais

| ID    | Requisito                                                   | Prioridade  |
| ----- | ----------------------------------------------------------- | ----------- |
| RNF01 | Tempo de carregamento do componente < 100ms                 | Obrigatório |
| RNF02 | Suporte a browsers modernos (Chrome, Firefox, Safari, Edge) | Obrigatório |
| RNF03 | Compatibilidade com screen readers (WCAG AA)                | Obrigatório |
| RNF04 | Transições suaves entre estados (300ms)                     | Desejável   |

### 3.3 Requisitos de Design

| ID   | Requisito                        | Valor                         |
| ---- | -------------------------------- | ----------------------------- |
| RD01 | Altura do header                 | 64px (desktop), 56px (mobile) |
| RD02 | Padding horizontal               | 24px                          |
| RD03 | Gap entre elementos              | 16px                          |
| RD04 | Tamanho máximo do campo de busca | 400px                         |
| RD05 | Tamanho do avatar                | 40px                          |
| RD06 | Tamanho dos ícones               | 24px                          |
| RD07 | Border radius padrão             | 8px                           |

---

## 4. Wireframe Simplificado

### 4.1 Desktop (≥768px)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [GP] Goal Planner      🔍 Buscar metas, áreas, tarefas...       ☀️ 🔔 [👤]│
│   Logo                    Campo de busca              Tema  Notif. Avatar    │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Mobile (<768px)

```
┌─────────────────────────────────────┐
│ ☰  [GP]                            🔔 [👤]│
│ Menu  Logo                   Notif. Avatar│
└─────────────────────────────────────┘
```

### 4.3 Dropdown do Usuário

```
┌─────────────────────────────────┐
│  👤                              │
│  Nome do Usuário                │
│  email@usuario.com              │
├─────────────────────────────────┤
│  ⚙️  Configurações              │
│  🚪  Sair                        │
└─────────────────────────────────┘
```

---

## 5. Comportamentos Esperados

### 5.1 Estados do Header

| Estado      | Comportamento                                |
| ----------- | -------------------------------------------- |
| Padrão      | Exibe todos os elementos conforme breakpoint |
| Scroll      | Header permanece fixo (position: fixed)      |
| Tema claro  | Fundo branco, texto escuro                   |
| Tema escuro | Fundo escuro (#0F172A), texto claro          |

### 5.2 Estados da Busca

| Estado     | Comportamento                       |
| ---------- | ----------------------------------- |
| Default    | Campo vazio com placeholder e ícone |
| Focus      | Borda destacada na cor primária     |
| Com texto  | Ícone de busca permanece            |
| Resultados | Dropdown com resultados da busca    |

### 5.3 Estados do Dropdown

| Estado      | Comportamento             |
| ----------- | ------------------------- |
| Fechado     | Dropdown oculto           |
| Aberto      | Menu expandido para baixo |
| Clique fora | Fecha o dropdown          |

### 5.4 Breakpoints

| Breakpoint | Largura | Comportamento                        |
| ---------- | ------- | ------------------------------------ |
| Mobile     | < 768px | Busca oculta, menu hamburger visível |
| Tablet+    | ≥ 768px | Busca visível, logo completo         |

---

## 6. Critérios de Aceite

### 6.1 Critérios de Aceite Geral

| ID   | Critério                                            | Método de Validação                  |
| ---- | --------------------------------------------------- | ------------------------------------ |
| CA01 | O header é exibido em todas as páginas autenticadas | Acesso a /dashboard, /metas, /agenda |
| CA02 | O header permanece fixo ao rolar a página           | Scroll na página                     |
| CA03 | O logo redireciona corretamente para /dashboard     | Click no logo                        |
| CA04 | O tema alterna corretamente entre light e dark      | Click no toggle                      |
| CA05 | O tema persiste após refresh da página              | Refresh após mudança                 |

### 6.2 Critérios de Busca

| ID   | Critério                                | Método de Validação  |
| ---- | --------------------------------------- | -------------------- |
| CA06 | Busca é visível apenas em telas ≥ 768px | Redimensionar janela |
| CA07 | Placeholder correto é exibido           | Verificação visual   |
| CA08 | Atalho Cmd+K focaliza o campo           | Pressionar Cmd+K     |

### 6.3 Critérios de Dropdown

| ID   | Critério                             | Método de Validação    |
| ---- | ------------------------------------ | ---------------------- |
| CA09 | Dropdown abre ao clicar no avatar    | Click no avatar        |
| CA10 | Dropdown fecha ao clicar fora        | Click fora do dropdown |
| CA11 | Nome e email do usuário são exibidos | Verificação visual     |
| CA12 | Link de configurações funciona       | Click em Configurações |
| CA13 | Botão de sair funciona               | Click em Sair          |

### 6.4 Critérios de Responsividade

| ID   | Critério                            | Método de Validação     |
| ---- | ----------------------------------- | ----------------------- |
| CA14 | Layout correto em mobile (< 768px)  | Device toolbar / resize |
| CA15 | Layout correto em desktop (≥ 768px) | Window maximize         |
| CA16 | Elementos não se sobrepõem          | Verificação visual      |

### 6.5 Critérios de Acessibilidade

| ID   | Critério                            | Método de Validação       |
| ---- | ----------------------------------- | ------------------------- |
| CA17 | Elementos são navegáveis via Tab    | Keyboard navigation       |
| CA18 | Focus visível em todos os elementos | Tab através dos elementos |
| CA19 | Labels ARIA presentes               | Inspect no código         |

---

## 7. Dependências

### 7.1 Bibliotecas

| Biblioteca   | Versão | Uso                                |
| ------------ | ------ | ---------------------------------- |
| React        | 19+    | Framework                          |
| TypeScript   | 5.x    | Tipagem                            |
| Tailwind CSS | v4     | Estilização                        |
| lucide-react | Latest | Ícones                             |
| shadcn/ui    | Latest | Componentes (Avatar, DropdownMenu) |
| next-themes  | Latest | Gerenciamento de tema              |

### 7.2 Componentes shadcn/ui Utilizados

- Avatar
- DropdownMenu
- Input (para campo de busca)

### 7.3 Rota Dependente

- /dashboard (destino do logo)
- /configuracoes (link do dropdown)
- /notificacoes (link do ícone de notificações)

---

## 8. Out of Scope

Os seguintes itens NÃO estão Included neste PRD:

- Funcionalidade de busca (implementação do backend)
- Página de notificações
- Menu hamburger mobile (existe componente separado: MobileNav)
- Sistema de alertas/toast no header

---

## 9. Referências

- Wireframe detalhado: `tracking/wireframes/header.md`
- Design System: `tracking/DESIGN_SYSTEM.md`
- Design tokens: `src/index.css`

---

## 10. Histórico de Versões

| Versão | Data       | Descrição             |
| ------ | ---------- | --------------------- |
| 1.0    | 25/03/2026 | Versão inicial do PRD |

---

**Fim do documento**
