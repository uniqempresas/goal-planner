---
date: 2026-03-25T14:30:00-03:00
researcher: vibe-researcher
git_commit: current
branch: master
repository: goal_planner_uat2
topic: Sidebar Desktop Navigation Component
tags: [layout, navigation, sidebar, react, typescript, shadcn-ui]
status: complete
last_updated: 2026-03-25
last_updated_by: vibe-researcher
---

# PRD: Sidebar Desktop

**Date:** 2026-03-25  
**Researcher:** vibe-researcher  
**Repository:** goal_planner_uat2  
**Topic:** Sidebar Desktop Navigation Component

---

## 1. Visão Geral

A **Sidebar Desktop** é o componente principal de navegação lateral do Goal Planner, posicionadafixamente na parte esquerda da tela. Este componente é responsável por proporcionar acesso rápido e intuitivo a todas as principais áreas da aplicação em dispositivos desktop.

A sidebar será exibida apenas em telas maiores ou iguais a `lg` (1024px), e oferece dois estados de visualização: expandida (260px de largura) e colapsada (72px de largura), permitindo ao usuário personalizar sua experiência de uso.

Este documento detalha os requisitos técnicos, funcionais e de design para a implementação completa da Sidebar Desktop, alinhada com a arquitetura existente do projeto e os padrões estabelecidos no Design System.

---

## 2. Contexto e Análise do Código Existente

### 2.1 Estado Atual do Componente

A análise do código existente revelou que já existe uma implementação parcial da sidebar em `src/components/layout/Sidebar.tsx`. Esta implementação atual possui a seguinte estrutura:

O componente Sidebar atual utiliza React Router para navegação e integra os seguintes ícones da biblioteca lucide-react: LayoutDashboard, Target, Calendar, FileText, Trophy e Settings. O componente suporta estados expandido e colapsado, com uma largura de 256px no modo expandido e 64px no modo colapsado, utilizando classes do Tailwind CSS para estilização.

A navegação atual contém 8 itens, sendo eles: Dashboard, Áreas de Vida, Metas, Agenda, Planejamento (Plano Semanal), Revisões, Conquistas e Configurações. O componente já implementa a funcionalidade de toggle para colapsar e expandir, além de suportar both desktop e mobile layouts.

### 2.2 Gap Identificado

A análise identificou os seguintes gaps entre a implementação atual e os requisitos do usuário:

Primeiramente, há uma diferença nos itens de navegação: o requisito solicita 9 itens incluindo "Templates", mas a implementação atual possui apenas 8. Além disso, existe uma inconsistência nos ícones, onde o wireframe especifica ícones diferentes dos atualmente utilizados. Há também uma questão de dimensões: o wireframe especifica 260px/72px, mas o código atual usa 256px/64px.

Outro ponto importante é que a persistência do estado não está implementada com localStorage, apenas mantém o estado em memória. Por fim, a acessibilidade precisa ser completada com os atributos ARIA adequados.

---

## 3. Requisitos Funcionais

### 3.1 Navegação

A sidebar deve conter exatamente 9 itens de navegação, cada um对应的 a uma rota específica da aplicação. Cada item deve exibir um ícone representativo da funcionalidade e um rótulo de texto. Os itens de navegação devem ser os seguintes:

O primeiro item é o **Dashboard**, que utiliza o ícone LayoutDashboard e direciona para a rota `/dashboard`. Este é o item padrão que será exibido ao acessar a aplicação.

O segundo item é **Áreas de Vida**, que utiliza o ícone Target e direciona para a rota `/areas`. Este item permite ao usuário acessar a gestão das áreas fundamentais de sua vida.

O terceiro item é **Metas**, que utiliza o ícone Trophy e direciona para a rota `/goals`. Este item dá acesso ao gerenciamento de metas do usuário.

O quarto item é **Agenda**, que utiliza o ícone Calendar e direciona para a rota `/agenda`. Este item permite visualizar e gerenciar eventos e compromissos.

O quinto item é **Plano Semanal**, que utiliza o ícone CalendarDays e direciona para a rota `/weekly`. Este item é destinado ao planejamento semanal de atividades.

O sexto item é **Revisões**, que utiliza o ícone BarChart3 e direciona para a rota `/reviews`. Este item permite acessar as revisões periódicas de progresso.

O sétimo item é **Conquistas**, que utiliza o ícone Award e direciona para a rota `/achievements`. Este item exibe as conquistas e marcos alcançados pelo usuário.

O oitavo item é **Templates**, que utiliza o ícone FileText e direciona para a rota `/templates`. Este item fornece acesso aos modelos e templates disponíveis.

O nono item é **Configurações**, que utiliza o ícone Settings e direciona para a rota `/settings`. Este item permite ao usuário acessar as configurações da aplicação.

### 3.2 Comportamento de Exibição

A sidebar deve seguir as seguintes regras de exibição baseadas no tamanho da tela:

Em telas menores que 1024px (breakpoint lg), a sidebar não deve ser exibida. Nestas situações, o menu mobile (MobileNav) será utilizado como alternativa de navegação.

Em telas maiores ou iguais a 1024px, a sidebar desktop deve ser exibidafixamente na lateral esquerda da tela, ocupando toda a altura disponível (100vh menos a altura do header).

### 3.3 Estados da Sidebar

A sidebar possui dois estados de visualização que podem ser alternados pelo usuário:

No estado **Expandido**, a sidebar possui largura de 260 pixels, exibindo tanto os ícones quanto os textos (rótulos) de todos os itens de navegação. Este é o estado padrão quando a aplicação é carregada pela primeira vez.

No estado **Colapsado**, a sidebar possui largura de 72 pixels, exibindo apenas os ícones centralizados dos itens de navegação. O texto dos itens é oculto neste estado para maximizar o espaço disponível para o conteúdo principal.

A transição entre os estados deve ser suave, com uma animação de 300ms utilizando easing padrão.

### 3.4 Item Ativo

O item de navegação correspondente à rota atual deve ser destacado visualmente. O estado ativo é caracterizado por:

O texto do item deve utilizar a cor accent (amber-600 no modo claro, amber-500 no modo escuro), indicando claramente a rota ativa.

O ícone do item ativo deve utilizar a cor accent (amber-500).

O fundo do item ativo deve ser preenchido com a cor accent-50 (tons de amber muito claros), criando um contraste visual que facilita a identificação imediata da página atual.

### 3.5 Toggle de Colapsar/Expandir

Deve existir um botão localizado na parte inferior da sidebar que permite ao usuário alternar entre os estados expandido e colapsado.

Quando a sidebar está expandida, o botão deve exibir o ícone ChevronLeft seguido do texto "Recolher".

Quando a sidebar está colapsada, o botão deve exibir apenas o ícone ChevronRight.

O estado da sidebar deve ser persistido no localStorage, especificamente na chave 'sidebar-state', para que a preferência do usuário seja mantida entre sessões.

### 3.6 Responsividade do Layout

Quando a sidebar está visível (telas >= 1024px), o conteúdo principal deve se adaptar para não ficar atrás da sidebar:

Quando expandida (260px), o conteúdo principal deve ter uma margem esquerda de 260px.

Quando colapsada (72px), o conteúdo principal deve ter uma margem esquerda de 72px.

---

## 4. Requisitos Técnicos

### 4.1 Stack Tecnológico

A implementação deve utilizar as seguintes tecnologias e bibliotecas:

O projeto utiliza **React 19** como biblioteca principal de interface de usuário, proporcionando recursos modernos como Concurrent Rendering e Automatic Batching.

A linguagem utilizada é **TypeScript**, garantindo type safety e melhor experiência de desenvolvimento com autocompletion e verificação de tipos em tempo de compilação.

A estilização é feita com **Tailwind CSS v4**, seguindo as classes utilitárias definidas no Design System do projeto.

Os componentes de interface são baseados em **shadcn/ui**, que fornece componentes acessíveis e customizáveis sobre a base do Radix UI.

Os ícones são fornecidos pela biblioteca **lucide-react**, que oferece ícones consistentes e otimizados para React.

### 4.2 Estrutura de Arquivos

A estrutura de arquivos recomendada para a implementação é:

```
src/
├── components/
│   └── layout/
│       ├── Sidebar.tsx          # Componente principal da sidebar
│       ├── SidebarItem.tsx      # Componente de item individual (opcional)
│       └── useSidebarState.ts   # Hook para gerenciar estado persistido
├── hooks/
│   └── useSidebarState.ts       # Hook customizado para estado
└── lib/
    └── constants.ts              # Constantes de configuração (itens nav)
```

### 4.3 Tipos e Interfaces

A implementação deve definir as seguintes interfaces TypeScript:

```typescript
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}
```

### 4.4 Integração com React Router

A sidebar deve utilizar o hook `useLocation` do React Router para determinar qual item está ativo. A lógica de verificação deve considerar tanto a rota exata quanto rotas filhas (prefix matching).

```typescript
const isActive = (href: string) => {
  return pathname === href || pathname.startsWith(href + '/');
};
```

---

## 5. Especificações de Design

### 5.1 Cores

A sidebar deve seguir a paleta de cores definida no Design System do projeto:

O fundo da sidebar deve ser `bg-white` no modo claro e `bg-neutral-900` no modo escuro.

A borda direita deve ser `border-neutral-200` no modo claro e `border-neutral-800` no modo escuro.

As cores de destaque (itens ativos) devem utilizar a escala `amber` do Design System.

### 5.2 Tipografia

A tipografia dos itens de navegação deve seguir os padrões definidos:

O peso da fonte deve ser `font-medium` (500) para itens normais e `font-semibold` (600) para o item ativo.

O tamanho da fonte deve ser `text-sm` (14px) para os rótulos dos itens.

### 5.3 Espaçamento

O espaçamento interno deve seguir o sistema de 8-point grid:

O padding interno do container de navegação deve ser `p-2` (8px).

O gap entre os itens deve ser `gap-1` (4px).

O padding interno de cada item deve ser `px-3 py-2` (12px horizontal, 8px vertical).

### 5.4 Animações

A transição entre os estados expandido e colapsado deve utilizar:

Duração de 300ms com `transition-all duration-300`.

Easing padrão do Tailwind: `ease-in-out`.

---

## 6. Wireframe Visual

### 6.1 Estado Expandido (260px)

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  🏠 Dashboard                                 │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  🎯 Áreas de Vida                            │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  🏆 Metas                                    │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  📅 Agenda                                   │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  📊 Plano Semanal                            │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  📈 Revisões                                 │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  🏅 Conquistas                               │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  📄 Templates                                │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │  ⚙️ Configurações                            │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  ◀  Recolher                                 │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

### 6.2 Estado Colapsado (72px)

```
┌────────┐
│        │
│   🏠   │
│        │
│   🎯   │
│        │
│   🏆   │
│        │
│   📅   │
│        │
│   📊   │
│        │
│   📈   │
│        │
│   🏅   │
│        │
│   📄   │
│        │
│   ⚙️   │
│        │
│   ▶    │
└────────┘
```

---

## 7. Critérios de Aceite

### 7.1 Funcionalidade

A sidebar deve exibir corretamente os 9 itens de navegação conforme especificado na seção de requisitos funcionais, cada um direcionando para a rota correta.

A sidebar deve ser oculta em telas menores que 1024px e visível em telas maiores ou iguais a 1024px.

O toggle de colapsar/expandir deve funcionar corretamente, alterando a largura da sidebar entre 260px e 72px.

O estado da sidebar (expandida ou colapsada) deve ser persistido no localStorage e restaurado ao carregar a página.

O item de navegação correspondente à rota atual deve estar destacado visualmente com as cores especificadas.

### 7.2 Visual

A sidebar deve corresponder às especificações de design definidas no Design System, incluindo cores, tipografia e espaçamento.

A animação de transição entre os estados deve ser suave e durar aproximadamente 300ms.

Os ícones devem ser exibidos corretamente para cada item de navegação.

### 7.3 Responsividade

O layout do conteúdo principal deve se adaptar corretamente quando a sidebar está visível, mantendo a margem esquerda apropriada.

A sidebar deve funcionar corretamente em conjunto com o header e o MobileNav existentes.

### 7.4 Acessibilidade

Todos os elementos interativos devem ter foco visível adequado para navegação por teclado.

O botão de toggle deve ter atributos ARIA apropriados para indicar seu propósito e estado atual.

O item de navegação ativo deve ter o atributo `aria-current="page"` para comunicar claramente a posição atual ao screen reader.

### 7.5 Testes

Os seguintes cenários de teste devem ser verificados:

A sidebar deve estar visível em resolução de 1024px ou superior e oculta em resoluções inferiores.

Clicar no botão de toggle deve alternar entre os estados expandido e colapsado.

Atualizar a página deve manter o último estado selecionado da sidebar.

Cada item de navegação deve direcionar para a rota correta ao ser clicado.

O item correspondente à rota atual deve estar destacado visualmente.

---

## 8. Referências e Recursos

### 8.1 Arquivos do Projeto

Os seguintes arquivos existentes são relevantes para a implementação:

- `src/components/layout/Sidebar.tsx` - Componente atual da sidebar
- `src/components/layout/MainLayout.tsx` - Layout principal que integra a sidebar
- `src/routes.tsx` - Definição das rotas da aplicação
- `tracking/DESIGN_SYSTEM.md` - Sistema de design do projeto
- `tracking/wireframes/sidebar-desktop.md` - Wireframe de referência

### 8.2 Recursos Externos

Os seguintes recursos externos devem ser consultados para implementação:

- Documentação do React Router para integração de navegação
- Documentação do Tailwind CSS para classes de estilização
- Documentação do shadcn/ui para componentes base
- Documentação do lucide-react para ícones disponíveis

---

## 9. Histórico de Versões

| Versão | Data       | Alterações                                 |
| ------ | ---------- | ------------------------------------------ |
| 1.0    | 25/03/2026 | Versão inicial do PRD para Sidebar Desktop |

---

**Fim do documento**
