# Frontend UI/UX Docs - Índice

Este diretório contém a documentação de UI/UX para o projeto Goal Planner.

## Estrutura de Documentação

### Sprint 4 - Áreas de Vida (Foco Principal)

- **[modulo-areas-de-vida.md](./modulo-areas-de-vida.md)** - Documentação completa do CRUD de Áreas de Vida

### Sprint 3 - Componentes de Layout

- **[componentes-layout.md](./componentes-layout.md)** - Header, Sidebar, Menu Mobile
- **[estados-ui.md](./estados-ui.md)** - Loading Skeleton, 404 Page, Error Boundary, Dark Mode

---

## Tecnologias e Padrões Utilizados

### Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **Componentes:** shadcn/ui + Radix UI
- **Ícones:** Lucide React
- **Animações:** Framer Motion

### Design System

- Cores: Palette Amber (destaque) + Neutral
- Tipografia: Inter (sans-serif)
- Espaçamento: 8px grid system
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)

### Padrões de Código

- Componentes Server por padrão
- Client Components apenas para interatividade
- TypeScript strict mode
- Composição de componentes via children props
