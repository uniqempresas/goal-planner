---
date: 2026-03-25T15:00:00-03:00
researcher: vibe-researcher
git_commit: current
branch: master
repository: goal_planner_uat2
topic: Sistema de Loading e Skeleton para Goal Planner
tags: [loading, skeleton, feedback, ui-components, react, typescript, tailwind]
status: complete
last_updated: 2026-03-25
last_updated_by: vibe-researcher
---

# PRD: Sistema de Loading e Skeleton

**Date:** 2026-03-25  
**Researcher:** vibe-researcher  
**Repository:** goal_planner_uat2  
**Topic:** Sistema de Loading e Skeleton para Goal Planner

---

## 1. Visão Geral

O **Sistema de Loading e Skeleton** é um componente fundamental de feedback visual do Goal Planner. Ele proporciona uma experiência de usuário suave durante o carregamento de conteúdo, indicando que dados estão sendo buscados enquanto substitui temporariamente o conteúdo real por placeholders visuais que mimetizam a estrutura final da página.

Este documento detalha os requisitos técnicos, funcionais e de design para a implementação completa do sistema de loading states, incluindo o componente Skeleton genérico, os estados de erro e vazio, e as animações de pulse padronizadas para a aplicação.

O sistema será implementado utilizando React 19 com TypeScript, seguindo os padrões estabelecidos no Design System do projeto e utilizando Tailwind CSS v4 para estilização, integrado com a biblioteca tw-animate-css já configurada no projeto.

---

## 2. Contexto e Análise do Código Existente

### 2.1 Análise do Wireframe Existente

O projeto já possui um wireframe detalhado para o sistema de skeleton em `tracking/wireframes/loading-skeleton.md`. Este wireframe fornece as especificações técnicas fundamentais que devem ser seguidas:

As dimensões especificadas incluem animação pulse suave com duração de 1.5s por ciclo. As cores base definidas são #E2E8F0 para modo claro e #334155 para modo escuro, com cores de destaque sendo #F1F5F9 e #475569 respectivamente. O border-radius padrão é 4px, sendo 8px para cards.

O wireframe define quatro componentes principais de skeleton: Card Skeleton para exibição de conteúdo em cards, List Skeleton para listas de itens, Text Skeleton para parágrafos de texto, e Avatar Skeleton para placeholders de imagens de perfil.

### 2.2 Análise do Design System

O Design System do projeto em `tracking/DESIGN_SYSTEM.md` estabelece as variáveis de cores e tokens de design que devem ser utilizados:

O sistema utiliza cores neutras na escala neutral-50 até neutral-950, cores primárias na escala primary-50 até primary-900, cores de sucesso na escala success-50 até success-900, e cores de erro na escala error-50 até error-900.

As animações recomendadas incluem fade-in para entrada de elementos com 200ms, slide-up para modais e toasts com 200ms, scale-in para botões e badges com 150ms, e pulse para indicadores com 2s infinite.

### 2.3 Stack Tecnológico do Projeto

O projeto utiliza React 19 como biblioteca principal de interface, TypeScript para type safety, Tailwind CSS v4 para estilização com o sistema de @theme, shadcn/ui para componentes base, e tw-animate-css para animações.

A biblioteca lucide-react fornece os ícones necessários para os estados de feedback.

### 2.4 Gap Identificado

A análise identificou que não existe nenhum componente de skeleton implementado atualmente no projeto. A busca por arquivos contendo "skeleton" ou "Skeleton" em src/components não retornou resultados, confirmando que este é um componente completamente novo a ser desenvolvido.

O wireframe existente fornece toda a especificação necessária, mas precisa ser traduzido em componentes React funcionais que sigam os padrões do projeto.

---

## 3. Requisitos Funcionais

### 3.1 Componente Skeleton Genérico

O componente Skeleton base deve ser um bloco de construção reutilizável que serve como foundation para todos os outros componentes de skeleton. Ele deve aceitar props para customização de dimensões, cores e animação.

O componente deve suportar a prop className para permitir estilização adicional via classes Tailwind. Deve utilizar automaticamente as cores de skeleton corretas baseadas no tema atual (light/dark). A animação de pulse deve ser suave e não distraente, adequada para uso em qualquer parte da interface.

### 3.2 Estados de Conteúdo

O sistema deve suportar quatro estados principais de conteúdo que cobrem todos os cenários de carregamento de dados:

O estado **Loading** (Esqueleto) é utilizado enquanto os dados estão sendo carregados. Este estado exibe placeholders visuais que mimetizam a estrutura do conteúdo que será carregado, proporcionando feedback imediato ao usuário de que a aplicação está funcionando.

O estado **Error** (Erro) é exibido quando há falha no carregamento dos dados. Este estado deve mostrar uma mensagem clara indicando o problema, bersama um botão de ação para tentar novamente. O design deve seguir a identidade visual do projeto, utilizando as cores de erro definidas no Design System.

O estado **Empty** (Vazio) é utilizado quando não há dados para exibir. Diferente do estado de erro, isso representa uma condição válida onde o usuário simplesmente não possui dados ainda. O design deve ser acolhedor e incentivador, sugerindo ações que o usuário pode tomar para criar conteúdo.

O estado **Success** (Sucesso) é o estado final onde os dados reais são exibidos normalmente após o carregamento bem-sucedido.

### 3.3 Componentes de Skeleton Especializados

O sistema deve fornecer os seguintes componentes especializados prontos para uso:

**CardSkeleton** deve simular a estrutura de um card típico do Goal Planner, incluindo espaço opcional para imagem, linhas para título, linhas para descrição, e espaço para badge ou botão de ação. Deve ser configurável para mostrar ou ocultar a imagem.

**ListSkeleton** deve simular uma lista de itens com avatar/thumbnail e texto ao lado. Deve aceitar um parâmetro count para definir o número de itens a serem exibidos, permitindo flexibilidade para diferentes tamanhos de lista.

**TextSkeleton** deve simular parágrafos de texto com diferentes larguras. Deve suportar múltiplas linhas com larguras variadas para criar um efeito natural.

**TableSkeleton** deve simular uma tabela com header e linhas. Deve aceitar parâmetros para número de colunas e número de linhas, sendo útil para telas de dados tabulares.

**AvatarSkeleton** deve simular um avatar circular de usuário. Deve suportar diferentes tamanhos configuráveis.

### 3.4 Hook de Gerenciamento de Estado

O sistema deve fornecer um hook customizado que facilita a gestão dos estados de carregamento em componentes. Este hook deve abstrair a lógica de states (isLoading, isError, isEmpty, data) e fornecer métodos便捷 para manipulação.

O hook deve se integrar facilmente com bibliotecas de data fetching como React Query ou SWR, fornecendo uma interface unificada para os diferentes estados.

---

## 4. Requisitos Técnicos

### 4.1 Stack Tecnológico

A implementação deve utilizar React 19 como biblioteca principal, aproveitando recursos modernos como Concurrent Rendering e Automatic Batching para performance.

A linguagem TypeScript deve ser utilizada em todos os arquivos, garantindo type safety completo com interfaces bem definidas para todas as props e estados.

A estilização deve ser feita exclusivamente com Tailwind CSS v4, utilizando o sistema de @theme já configurado no projeto. As classes utilitárias do Tailwind devem ser preferidas sobre estilos inline ou CSS customizado.

As animações devem utilizar preferencialmente a biblioteca tw-animate-css já instalada no projeto, complementada com classes nativas de animação do Tailwind quando necessário.

### 4.2 Estrutura de Arquivos

A estrutura de arquivos recomendada para a implementação é:

```
src/
├── components/
│   ├── ui/
│   │   └── Skeleton.tsx          # Componente Skeleton base
│   └── skeletons/
│       ├── CardSkeleton.tsx       # Skeleton de card
│       ├── ListSkeleton.tsx       # Skeleton de lista
│       ├── TextSkeleton.tsx       # Skeleton de texto
│       ├── TableSkeleton.tsx      # Skeleton de tabela
│       ├── AvatarSkeleton.tsx     # Skeleton de avatar
│       └── index.ts              # Exportações barrel
│   └── states/
│       ├── LoadingState.tsx       # Componente de estado de loading
│       ├── ErrorState.tsx         # Componente de estado de erro
│       ├── EmptyState.tsx        # Componente de estado vazio
│       └── ContentSwitch.tsx      # Componente switcher de estados
├── hooks/
│   └── useContentState.ts        # Hook para gerenciamento de estados
└── lib/
    └── constants.ts               # Constantes de configuração
```

### 4.3 Tipos e Interfaces

A implementação deve definir as seguintes interfaces TypeScript:

```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

interface CardSkeletonProps {
  showImage?: boolean;
  className?: string;
}

interface ListSkeletonProps {
  count?: number;
  showAvatar?: boolean;
  className?: string;
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

type ContentState = 'loading' | 'success' | 'error' | 'empty';

interface ContentStateProps<T> {
  state: ContentState;
  data?: T;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  error?: Error;
  onRetry?: () => void;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  children: (data: T) => ReactNode;
}
```

### 4.4 Integração com tw-animate-css

O projeto já possui a biblioteca tw-animate-css configurada no index.css. A implementação deve utilizar as animações fornecidas por esta biblioteca sempre que possível.

Para o skeleton, deve-se utilizar a animação de pulse que já vem disponível no Tailwind via classe animate-pulse, complementada com a animação tw-animate-pulse se necessário para resultados mais sutis.

### 4.5 Suporte a Dark Mode

O sistema deve suportar automaticamente o tema claro e escuro. As cores do skeleton devem se adaptar ao tema atual, utilizando as variáveis CSS definidas no index.css.

As cores para modo claro devem ser bg-neutral-200 ou bg-muted, e para modo escuro devem ser bg-neutral-800 ou bg-muted-foreground/20.

---

## 5. Especificações de Design

### 5.1 Cores do Skeleton

O skeleton deve seguir as cores especificadas no wireframe existente:

Para modo claro, a cor base deve ser neutral-200 (#e5e5e5) e a cor de destaque (durante a animação) deve ser neutral-100 (#f5f5f5).

Para modo escuro, a cor base deve ser neutral-800 (#262626) e a cor de destaque deve ser neutral-700 (#404040).

O sistema deve detectar automaticamente o tema atual e aplicar as cores apropriadas, eliminando a necessidade de especificar cores diferentes manualmente.

### 5.2 Tipografia

A tipografia dos estados de erro e vazio deve seguir os padrões definidos no Design System:

O tamanho do título deve ser text-lg ou text-xl com peso font-semibold.

O tamanho da mensagem deve ser text-sm ou text-base com peso font-regular.

A cor do texto deve ser muted-foreground para mensagens secundárias e destructive ou error para mensagens de erro.

### 5.3 Animações

A animação de pulse para skeleton deve ter as seguintes características:

A duração deve ser de 1.5s por ciclo, utilizando timing function ease-in-out.

A variação de opacidade deve ser de 1 (completo) para 0.5 (metade) e de volta para 1.

O loop deve ser infinito, contínuo enquanto o componente estiver visível.

A implementação deve utilizar a classe animate-pulse do Tailwind, que segue exatamente estas especificações.

### 5.4 Espaçamento

O espaçamento deve seguir o sistema de 8-point grid definido no Design System:

O padding interno dos componentes deve ser múltiplo de 4px (space-1, space-2, space-3, space-4).

O gap entre elementos deve seguir os padrões de gap-xs (4px), gap-sm (8px), gap-md (16px).

O margin entre componentes de skeleton deve ser space-4 (16px) por padrão.

### 5.5 Bordas e Radius

O border-radius deve seguir os valores definidos no Design System:

Para skeleton de texto, deve-se utilizar radius-sm (4px).

Para skeleton de cards, deve-se utilizar radius-md (8px) ou o valor padrão do Card.

Para skeleton de avatar, deve-se utilizar radius-full para criar círculos perfeitos.

---

## 6. Wireframes Visuais

### 6.1 Card Skeleton

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │                                 │ │  ← Imagem (opcional)
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ████████████████████████████████   │  ← Título
│                                     │
│ ████████████████████████████████   │  ← Texto linha 1
│ ████████████████████████████████   │  ← Texto linha 2
│ ███████████████████████            │  ← Texto linha 3
│                                     │
│ ████████                           │  ← Badge/Ação
└─────────────────────────────────────┘
```

### 6.2 List Skeleton

```
┌─────────────────────────────────────┐
│ ┌──────┐  █████████████████████   │
│ │      │  ████████████████████     │
│ │  ○   │  ████████                 │
│ │      │  ─────────────────────     │
│ └──────┘                            │
│ ┌──────┐  █████████████████████   │
│ │      │  ████████████████████     │
│ │  ○   │  ████████                 │
│ │      │  ─────────────────────     │
│ └──────┘                            │
│ ┌──────┐  █████████████████████   │
│ │      │  ████████████████████     │
│ │  ○   │  ████████                 │
│ │      │                            │
│ └──────┘                            │
└─────────────────────────────────────┘
```

### 6.3 Estados de Erro e Vazio

**Estado de Erro:**

```
┌─────────────────────────────────────┐
│                                     │
│              ⚠️                     │
│           (AlertCircle)             │
│                                     │
│    Não foi possível carregar        │
│         os dados.                   │
│                                     │
│    [Button: Tentar novamente]       │
│                                     │
└─────────────────────────────────────┘
```

**Estado Vazio:**

```
┌─────────────────────────────────────┐
│                                     │
│              📭                    │
│           (Inbox tray)              │
│                                     │
│       Nenhum item encontrado        │
│                                     │
│    Comece criando uma nova meta!    │
│                                     │
│    [Button: + Nova Meta]           │
│                                     │
└─────────────────────────────────────┘
```

### 6.4 Fluxo de Estados

```
Carregando dados
      │
      ▼
┌────────────────┐
│   isLoading    │──── Sim ────► [SKELETON]
│   (true)       │
└────────────────┘
      │
      │ Não
      ▼
┌────────────────┐
│    Error?      │
└────────────────┘
      │
      ├── Sim ──► [MENSAGEM DE ERRO]
      │
      └── Não
           │
           ▼
      ┌────────────────┐
      │   hasData?     │
      └────────────────┘
           │
           ├── Sim ──► [CONTEÚDO]
           │
           └── Não ──► [ESTADO VAZIO]
```

---

## 7. Exemplos de Uso

### 7.1 Exemplo com React Query

```tsx
import { useQuery } from '@tanstack/react-query';
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';
import { ErrorState } from '@/components/states/ErrorState';
import { EmptyState } from '@/components/states/EmptyState';

function MetasList() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['metas'],
    queryFn: fetchMetas,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Erro ao carregar metas"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="Nenhuma meta encontrada"
        message="Comece criando uma nova meta!"
        actionLabel="+ Nova Meta"
        onAction={() => navigate('/metas/new')}
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((meta) => (
        <MetaCard key={meta.id} meta={meta} />
      ))}
    </div>
  );
}
```

### 7.2 Exemplo com Hook Customizado

```tsx
import { useContentState } from '@/hooks/useContentState';
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';

function MetasList() {
  const { state, data, retry } = useContentState({
    queryKey: ['metas'],
    queryFn: fetchMetas,
  });

  if (state === 'loading') {
    return <CardSkeleton count={6} />;
  }

  if (state === 'error') {
    return <ErrorState onRetry={retry} />;
  }

  if (state === 'empty') {
    return <EmptyState />;
  }

  return <MetasGrid metas={data} />;
}
```

---

## 8. Critérios de Aceite

### 8.1 Funcionalidade

O componente Skeleton base deve renderizar corretamente com as cores adequadas ao tema atual (light/dark), e deve aceitar props de width, height, variant e className.

Todos os componentes especializados (CardSkeleton, ListSkeleton, TextSkeleton, TableSkeleton, AvatarSkeleton) devem funcionar corretamente e seguir as especificações do wireframe.

Os estados de erro e vazio devem exibir mensagens claras e botões de ação funcionais quando apropriado.

A animação de pulse deve ser suave e contínua, com duração de aproximadamente 1.5s por ciclo.

### 8.2 Integração

O hook useContentState deve integrar-se facilmente com React Query e outras bibliotecas de data fetching.

Os componentes devem ser facilmente integráveis em qualquer parte da aplicação, sem dependências externas complexas.

### 8.3 Responsividade

Os skeletons devem adaptar-se corretamente a diferentes tamanhos de tela, mantendo proporções adequadas.

O sistema deve funcionar tanto em modo desktop quanto mobile.

### 8.4 Acessibilidade

O skeleton não deve ser focusável, utilizando tabindex="-1" ou equivalentes.

O container pai deve utilizar aria-busy="true" enquanto os dados estão carregando.

Deve haver texto descritivo para screen readers indicando o estado de carregamento.

Não se deve utilizar apenas cor para indicar estados, complementando com ícones e texto.

Deve-se respeitar a preferência do usuário por reduced-motion desabilitando animações quando apropriado.

### 8.5 Testes

Os seguintes cenários de teste devem ser verificados:

A página com dados deve mostrar o skeleton brevemente durante o carregamento.

A página sem dados deve exibir o estado vazio apropriado.

A requisição com erro deve exibir a mensagem de erro e o botão de retry.

A animação de pulse deve ocorrer em loop contínuo enquanto visível.

O dark mode deve exibir cores adequadas para o tema escuro.

---

## 9. Referências e Recursos

### 9.1 Arquivos do Projeto

Os seguintes arquivos existentes são relevantes para a implementação:

- `tracking/wireframes/loading-skeleton.md` - Wireframe de referência com especificações
- `tracking/DESIGN_SYSTEM.md` - Sistema de design com tokens de cores e spacing
- `src/index.css` - Configuração de temas e variáveis CSS
- `src/components/ui/` - Componentes UI existentes para参考
- `package.json` - Dependências do projeto

### 9.2 Recursos Externos

Os seguintes recursos externos devem ser consultados para implementação:

- Documentação do Tailwind CSS para classes de animação eutilities
- Documentação do tw-animate-css para animações disponíveis
- Documentação do shadcn/ui para padrões de componentes
- Documentação do lucide-react para ícones de feedback
- Melhores práticas de UX para loading states

---

## 10. Histórico de Versões

| Versão | Data       | Alterações                                             |
| ------ | ---------- | ------------------------------------------------------ |
| 1.0    | 25/03/2026 | Versão inicial do PRD para Sistema de Loading/Skeleton |

---

**Fim do documento**
