---
date: '2026-03-25T10:00:00-03:00'
researcher: vibe-researcher
git_commit: current
branch: current
repository: goal_planner_uat2
topic: 'Sistema de Dark Mode para o Goal Planner'
tags: [dark-mode, theme-toggle, ui-improvement]
status: complete
last_updated: '2026-03-25'
last_updated_by: vibe-researcher
---

# PRD - Sistema de Dark Mode

**Data**: 25 de Março de 2026  
**Versão**: 1.0  
**Tipo**: Feature de Interface (UI)

---

## 1. Visão Geral

### Descrição do Projeto

Implementação de um sistema completo de Dark Mode para o Goal Planner, permitindo que usuários alternem entre temas claro e escuro, com persistência de preferência e suporte a preferências do sistema operacional.

### Contexto Atual

- O projeto já possui CSS Variables definidas no `src/index.css` para light/dark mode
- O Header.tsx já contém um toggle de tema básico, mas sem persistência
- O design system já define as cores dark no bloco `.dark` do Tailwind CSS

### Escopo

- Toggle de tema no Header (ícone sol/lua)
- Persistência de preferência em localStorage
- Suporte a `prefers-color-scheme` do sistema operacional
- Transição suave entre temas

---

## 2. Funcionalidades

### 2.1 Toggle de Tema no Header

- **Descrição**: Botão no header para alternar entre modo claro e escuro
- **Localização**: Header.tsx, lado direito (próximo ao botão de notificações)
- **Ícones**:
  - Lua (Moon) para tema claro → alternar para dark
  - Sol (Sun) para tema escuro → alternar para light
- **Estado inicial**: basear-se no localStorage ou prefers-color-scheme

### 2.2 Persistência em localStorage

- **Chave**: `goal-planner-theme` ou `theme`
- **Valores válidos**: `'light' | 'dark'`
- **Comportamento**: Salvar preference do usuário automaticamente ao mudar
- **Restoring**: Ao carregar a página, ler do localStorage primeiro

### 2.3 Suporte a prefers-color-scheme

- **Descrição**: Respeitar preferência do sistema operacional caso não haja valor no localStorage
- **Ordem de prioridade**:
  1. localStorage (preferência explícita do usuário)
  2. prefers-color-scheme (configuração do SO)
  3. fallback para light (default)

### 2.4 Transições Suaves

- **Descrição**: Animação suave ao alternar entre temas
- **Implementação**: CSS transitions nas variáveis de cor (0.2s - 0.3s)
- **Elementos afetados**: background, text, border, cores de componentes

---

## 3. Requisitos Técnicos

### 3.1 Stack Tecnológico

- **Framework**: React 19
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Persistência**: localStorage API

### 3.2 Estrutura de Arquivos Envolvidos

- `src/index.css` - CSS Variables existentes (já configuradas)
- `src/components/layout/Header.tsx` - Toggle button
- `src/App.tsx` - Provider de tema (sugestão: criar hook ou context)

### 3.3 CSS Variables já Existentes (src/index.css)

O projeto já possui as seguintes variáveis configuradas:

```css
/* Light Mode (:root) */
--background, --foreground
--card, --card-foreground
--popover, --popover-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring

/* Dark Mode (.dark) */
Mesmas variáveis com valores escuros
```

### 3.4 Hook/Context Sugerido

Criar um hook `useTheme()` ou context `ThemeProvider` para gerenciar:

- Estado atual do tema
- Função para alternar tema
- Efeitos colaterais (aplicar classe ao documentElement)
- Leitura/escrita no localStorage

---

## 4. Requisitos Não Funcionais

### 4.1 Performance

- Troca de tema instantânea (sem reload)
- Sem impacto no bundle size
- Carregamento rápido da preferência tema (SSR-friendly)

### 4.2 Acessibilidade

- Contraste adequado em ambos os modos
- Elementos visíveis claramente no dark mode
- Suporte a prefers-reduced-motion (opcional)

### 4.3 Compatibilidade

- Funcionar em todos os navegadores modernos
- Fallback para light mode se localStorage não disponível

---

## 5. Critérios de Aceite

### 5.1 Funcionalidade

- [ ] Toggle de tema visível no Header com ícones de sol/lua
- [ ] Clicar no toggle alterna corretamente entre light e dark mode
- [ ] Classe `.dark` é aplicada/removida no elemento `<html>` ou `<body>`
- [ ] Preferência é salva no localStorage ao mudar o tema
- [ ] Ao recarregar a página, o tema salvo no localStorage é restaurado
- [ ] Se não houver localStorage, usa prefers-color-scheme do SO

### 5.2 Design/UI

- [ ] Elementos do UI estão com cores corretas em modo escuro
- [ ] Textos são legíveis em ambos os modos
- [ ] Bordas e separadores visíveis no dark mode
- [ ] Transição suave ao trocar de tema (efeito visual)

### 5.3 Testes

- [ ] Testar alternância light → dark → light
- [ ] Testar persistência após refresh da página
- [ ] Testar em browser com prefers-color-scheme: dark
- [ ] Testar em browser com prefers-color-scheme: light

---

## 6. Estrutura Sugerida de Implementação

```
src/
├── hooks/
│   └── useTheme.ts          # Hook para gerenciar tema
├── components/
│   ├── layout/
│   │   └── Header.tsx       # Toggle button (já existe, modificar)
│   └── ui/
│       └── ThemeToggle.tsx  # (Opcional) Componente isolated
├── context/
│   └── ThemeContext.tsx     # (Opcional) Context se necessário
└── App.tsx                  # Aplicar theme provider
```

---

## 7. Histórico de Decisões

- **25/03/2026**: Decision - Sistema de dark mode usar CSS Variables do Tailwind CSS nativas
- **25/03/2026**: Decision - Armazenar preferência em localStorage com chave 'goal-planner-theme'

---

## 8. Referências

- Arquivo: `src/index.css:81-124` - CSS Variables existentes
- Arquivo: `src/components/layout/Header.tsx:22-28` - Toggle atual (sem persistência)
- tracking/wireframes/dark-mode.md - Wireframe visual existente
