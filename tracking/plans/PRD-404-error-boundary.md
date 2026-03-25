---
date: 2026-03-25T18:20:00.000Z
researcher: vibe-researcher
git_commit: 753ffaebcd70ad4b894259321f179d04cdbb2bca
branch: main
repository: uniqempresas/goal_planner_uat2
topic: 'PRD: Página 404 e Error Boundary'
tags: [research, layout, error-handling, react-router]
status: complete
last_updated: 2026-03-25
last_updated_by: vibe-researcher
---

# Research: Página 404 e Error Boundary

**Date**: 2026-03-25T18:20:00-03:00
**Researcher**: vibe-researcher
**Git Commit**: 753ffaebcd70ad4b894259321f179d04cdbb2bca
**Branch**: main
**Repository**: uniqempresas/goal_planner_uat2

## Research Question

Criar o Product Requirements Document (PRD) para a página 404 e Error Boundary do Goal Planner, adaptando os wireframes existentes (feitos para Next.js) para React 19 + React Router v7 + Vite.

## Summary

O Goal Planner é uma aplicação React 19 com TypeScript, usando Vite como bundler e React Router v7 para navegação. Os wireframes existentes foram criados para Next.js App Router, mas a aplicação atual usa uma arquitetura diferente que requer implementação manual tanto da página 404 quanto do Error Boundary. A implementação será baseada nos padrões existentes da aplicação (shadcn UI, Tailwind CSS v4, lucide-react).

## Detailed Findings

### Stack Tecnológico Atual

- **Framework**: React 19.2.4
- **Routing**: React Router v7.13.2 (createBrowserRouter)
- **Bundler**: Vite 8.0.2
- **Styling**: Tailwind CSS v4.2.2
- **UI Components**: shadcn (Button, Card, etc.)
- **Icons**: lucide-react 1.6.0

### Estrutura de Rotas Atual

O arquivo `src/routes.tsx` define as rotas usando `createBrowserRouter` do React Router. Atualmente não existe tratamento para rotas inexistentes nem Error Boundary global.

**Rotas existentes:**

- `/` - Redirect para dashboard
- `/dashboard` - Dashboard principal
- `/profile` - Perfil do usuário
- `/login` - Página de login
- `/register` - Página de registro
- `/recover-password` - Recuperação de senha

### Componentes UI shadcn Disponíveis

- Button (`src/components/ui/button.tsx`)
- Card (`src/components/ui/card.tsx`)
- Input (`src/components/ui/input.tsx`)
- Avatar (`src/components/ui/avatar.tsx`)
- Dropdown Menu (`src/components/ui/dropdown-menu.tsx`)
- Dialog (`src/components/ui/dialog.tsx`)
- Sheet (`src/components/ui/sheet.tsx`)
- Label (`src/components/ui/label.tsx`)

### Adaptações Necessárias (Next.js → React Router)

| Recurso        | Next.js App Router | React Router v7                   |
| -------------- | ------------------ | --------------------------------- |
| Página 404     | `not-found.tsx`    | Rota catch-all `*`                |
| Error Boundary | `error.tsx`        | Componente `ErrorBoundary` manual |
| Global Error   | `global-error.tsx` | `rootBoundary` no Router          |

## Code References

- `src/routes.tsx:1-108` - Definição de rotas com createBrowserRouter
- `src/App.tsx:1-8` - RouterProvider integrando rotas
- `src/components/ui/button.tsx` - Componente Button disponível
- `src/components/layout/MainLayout.tsx` - Layout principal

## Architecture Documentation

### Padrão para Página 404 em React Router v7

```tsx
// Adicionar rota catch-all no final de routes.tsx
{
  path: '*',
  element: <NotFound />,
}
```

### Padrão para Error Boundary em React 19

O React 19 não tem Error Boundary built-in como o Next.js. Precisa-se criar um componente wrapper que capture erros via `componentDidCatch` (class component) ou usar a API `useRouteError` do React Router para erros de rota.

## Historical Context (from tracking/)

- `tracking/wireframes/404-page.md` - Wireframe existente (Next.js)
- `tracking/wireframes/error-boundary.md` - Wireframe existente (Next.js)
- `tracking/DESIGN_SYSTEM.md` - Sistema de design do projeto

## Open Questions

- O Error Boundary deve ser global (todas as rotas) ou por segmento (por rota)?
- Devemos implementar logging de erros para serviços externos (Sentry, etc)?
- O botão "Voltar" deve usar `router.back()` ou navegar para dashboard?

---

**Fim da pesquisa. PRD será gerado a seguir.**
