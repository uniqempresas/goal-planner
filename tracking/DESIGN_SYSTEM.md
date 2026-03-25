# Design System - Goal Planner

**Última Atualização:** 24/03/2026  
**Versão:** 1.0.0

---

## 1. Cores

### 1.1 Paleta Principal (Blue Baby)

Cores primárias baseadas em azul claro, suaves e acessíveis.

```css
/* Blue Baby - Primary */
--color-primary-50: #EFF6FF;
--color-primary-100: #DBEAFE;
--color-primary-200: #BFDBFE;
--color-primary-300: #93C5FD;
--color-primary-400: #60A5FA;
--color-primary-500: #3B82F6;  /* Principal */
--color-primary-600: #2563EB;
--color-primary-700: #1D4ED8;
--color-primary-800: #1E40AF;
--color-primary-900: #1E3A8A;
```

### 1.2 Cores Accent (Destaque)

```css
/* Amber - Accent para ONE Thing */
--color-accent-50: #FFFBEB;
--color-accent-100: #FEF3C7;
--color-accent-200: #FDE68A;
--color-accent-300: #FCD34D;
--color-accent-400: #FBBF24;
--color-accent-500: #F59E0B;  /* Principal */
--color-accent-600: #D97706;
--color-accent-700: #B45309;
--color-accent-800: #92400E;
--color-accent-900: #78350F;
```

### 1.3 Cores Semânticas

```css
/* Semantic Colors */
--color-success: #10B981;   /* Emerald 500 */
--color-warning: #F59E0B;   /* Amber 500 */
--color-error: #EF4444;     /* Red 500 */
--color-info: #3B82F6;      /* Blue 500 */
```

### 1.4 Cores Neutras

```css
/* Neutrals - Slate */
--color-neutral-50: #F8FAFC;
--color-neutral-100: #F1F5F9;
--color-neutral-200: #E2E8F0;
--color-neutral-300: #CBD5E1;
--color-neutral-400: #94A3B8;
--color-neutral-500: #64748B;
--color-neutral-600: #475569;
--color-neutral-700: #334155;
--color-neutral-800: #1E293B;
--color-neutral-900: #0F172A;
--color-neutral-950: #020617;
```

### 1.5 Tema Escuro (Dark Mode)

```css
/* Dark Mode - Slate Invertido */
--color-dark-background: #0F172A;
--color-dark-surface: #1E293B;
--color-dark-surface-elevated: #334155;
--color-dark-border: #475569;
--color-dark-text-primary: #F8FAFC;
--color-dark-text-secondary: #94A3B8;
--color-dark-text-muted: #64748B;
```

### 1.6 Cores Configuráveis pelo Usuário

O sistema permite que o usuário altere a cor primária em runtime:

```typescript
type UserColorPreset = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'custom';

interface ThemeConfig {
  primaryColor: UserColorPreset;
  accentColor: string;
  mode: 'light' | 'dark' | 'system';
}
```

---

## 2. Tipografia

### 2.1 Família Principal: Poppins

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

--font-family: 'Poppins', sans-serif;
```

### 2.2 Escalas Tipográficas

| Token | Tamanho | Peso | Uso |
|-------|---------|------|-----|
| text-xs | 12px | 400 | Labels pequenas, timestamps |
| text-sm | 14px | 400 | Corpo secundário |
| text-base | 16px | 400 | Corpo principal |
| text-lg | 18px | 500 | Subtítulos |
| text-xl | 20px | 600 | Títulos pequenos |
| text-2xl | 24px | 700 | Títulos de seção |
| text-3xl | 30px | 700 | Títulos de página |
| text-4xl | 36px | 700 | Hero headlines |

### 2.3 Pesos

| Peso | Valor | Uso |
|------|-------|-----|
| Light | 300 | Decorações sutis |
| Regular | 400 | Corpo de texto |
| Medium | 500 | Labels, navegação |
| Semi-Bold | 600 | Subtítulos, emphasis |
| Bold | 700 | Títulos, CTAs |

---

## 3. Espaçamento (8-Point Grid)

### 3.1 Sistema de Espaçamento

```css
--space-1: 4px;   /* half-step */
--space-2: 8px;   /* base */
--space-3: 12px;  /* tight */
--space-4: 16px;  /* default */
--space-5: 20px;  /* relaxed */
--space-6: 24px;  /* comfortable */
--space-8: 32px;  /* spacious */
--space-10: 40px; /* large */
--space-12: 48px; /* xl */
--space-16: 64px; /* 2xl */
--space-20: 80px; /* 3xl */
```

### 3.2 Padding Padrão

```css
--padding-sm: 8px;
--padding-md: 16px;
--padding-lg: 24px;
--padding-xl: 32px;
```

### 3.3 Gap Padrão

```css
--gap-xs: 4px;
--gap-sm: 8px;
--gap-md: 16px;
--gap-lg: 24px;
--gap-xl: 32px;
```

---

## 4. Bordas e Radius

### 4.1 Radius Suave (8px)

```css
--radius-sm: 4px;
--radius-md: 8px;    /* Padrão - suave */
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;  /* Pills, avatars */
```

### 4.2 Bordas

```css
--border-width: 1px;
--border-color: #E2E8F0;        /* Light mode */
--border-color-dark: #475569;    /* Dark mode */
```

---

## 5. Sombras (Sutis)

### 5.1 Hierarchy de Sombras

```css
/* Sutis - minimalistas */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-xl: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

### 5.2 Uso Recomendado

| Sombra | Uso |
|--------|-----|
| shadow-sm | Elementos inline, chips |
| shadow-md | Cards, dropdowns |
| shadow-lg | Modais, popovers |
| shadow-xl | Dialogs, sidebars |

---

## 6. shadcn/ui - Componentes

### 6.1 Componentes Base Instalados

| Componente | Categoria | Props Principais |
|------------|-----------|------------------|
| Button | Action | variant, size, disabled |
| Input | Form | type, placeholder, error |
| Label | Form | htmlFor, required |
| Textarea | Form | rows, resize |
| Select | Form | options, value, onChange |
| Checkbox | Form | checked, indeterminate |
| Radio | Form | options, value |
| Switch | Form | checked, onChange |
| Card | Layout | title, description, footer |
| Dialog | Overlay | open, onOpenChange |
| DropdownMenu | Navigation | items, trigger |
| NavigationMenu | Navigation | items |
| Sheet | Overlay | side, open |
| Tabs | Navigation | value, onValueChange |
| Progress | Feedback | value, max |
| Skeleton | Feedback | variant, animation |
| Toast | Feedback | title, description |
| Tooltip | Feedback | content, side |
| Avatar | Display | src, fallback, size |
| Badge | Display | variant, color |
| Separator | Layout | orientation |

### 6.2 Componentes Customizados

| Componente | Descrição | Arquivo |
|------------|-----------|---------|
| MobileNav | Menu inferior mobile | components/MobileNav.tsx |
| GoalCard | Card de meta com progresso | components/GoalCard.tsx |
| TimeBlock | Bloco de tempo agenda | components/TimeBlock.tsx |
| OneThingBadge | Badge de prioridade | components/OneThingBadge.tsx |
| ProgressRing | Anel de progresso | components/ProgressRing.tsx |

---

## 7. Layout

### 7.1 Breakpoints

```css
/* Mobile First */
--breakpoint-xs: 480px;   /* Mobile large */
--breakpoint-sm: 640px;    /* Mobile landscape */
--breakpoint-md: 768px;    /* Tablet */
--breakpoint-lg: 1024px;   /* Desktop */
--breakpoint-xl: 1280px;   /* Desktop large */
--breakpoint-2xl: 1536px;  /* Desktop XL */
```

### 7.2 Layout Desktop

```
┌─────────────────────────────────────────────────────────┐
│ Header (h: 64px)                                        │
│ [Logo] [Search] [Theme Toggle] [User Avatar]            │
├────────────┬────────────────────────────────────────────┤
│ Sidebar    │ Main Content                               │
│ (w: 240px) │ (max-w: screen-xl, mx: auto)             │
│            │                                            │
│ - Dashboard│ [Breadcrumb]                              │
│ - Áreas    │                                            │
│ - Metas    │ Page Content                               │
│ - Agenda   │                                            │
│ - Revisões │                                            │
│ - Conquistas                                           │
│ - Config   │                                            │
└────────────┴────────────────────────────────────────────┘
```

### 7.3 Layout Mobile

```
┌─────────────────────┐
│ Header (h: 56px)    │
├─────────────────────┤
│                     │
│   Main Content      │
│   (p: 16px)         │
│                     │
│                     │
├─────────────────────┤
│ MobileNav (h: 64px) │
│ [1][2][●][4][5]     │
└─────────────────────┘
```

---

## 8. Menu Mobile Inferior

### 8.1 Especificação Técnica

```typescript
interface MobileNavProps {
  items: NavItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
}
```

### 8.2 Comportamento

- **5 itens visíveis** (módulo atual no centro)
- **2 módulos à esquerda** + **2 módulos à direita** do ativo
- **Scroll horizontal** com snap para centro
- **Indicador ativo:** Ícone maior + cor accent
- **Barra de rolagem** infinita com transições suaves

### 8.3 Estrutura de Itens

```typescript
const mobileNavItems = [
  { id: 'dashboard', label: 'Início', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'areas', label: 'Áreas', icon: Target, href: '/areas' },
  { id: 'metas', label: 'Metas', icon: Trophy, href: '/metas' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, href: '/agenda' },
  { id: 'mais', label: 'Mais', icon: MoreHorizontal, href: '/mais' },
];
```

### 8.4 Visual

```
┌────────────────────────────────────────┐
│              App Content                │
│                                          │
│                                          │
├────────────────────────────────────────┤
│  🏠    🎯    📅    ⚡    ⋯            │
│ Início Áreas Metas Agenda Mais         │
│        ● (ativo)                       │
└────────────────────────────────────────┘
         ↑ scroll horizontal ↑
```

---

## 9. Ícones

### 9.1 Biblioteca: Heroicons

```bash
npm install @heroicons/react
```

### 9.2 Categorias

| Categoria | Ícones |
|-----------|--------|
| Navigation | home, folder, target, calendar, chart-bar |
| Actions | plus, pencil, trash, check, x-mark |
| Status | check-circle, exclamation-circle, clock |
| Social | user, users, share |
| UI | search, bell, cog, menu, dots-horizontal |

---

## 10. Animações

### 10.1 Transições

```css
/* Duração curta para micro-interações */
--transition-fast: 150ms;
--transition-normal: 200ms;
--transition-slow: 300ms;

/* Easing */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 10.2 Animações Recomendadas

| Animação | Uso | Duração |
|----------|-----|---------|
| fade-in | Entrada de elementos | 200ms |
| slide-up | Modal, toast | 200ms |
| scale-in | Botões, badges | 150ms |
| pulse | Indicadores | 2s infinite |

---

## 11. Accessibility

### 11.1 Requisitos

- **WCAG 2.1 AA** compliance
- **Focus visible** em todos os elementos interativos
- **ARIA labels** em ícones e botões
- **Contrast ratio** mínimo 4.5:1
- **Reduced motion** support

### 11.2 Skip Links

```html
<a href="#main-content" class="skip-link">
  Pular para o conteúdo principal
</a>
```

---

## 12. Exemplos de Uso

### 12.1 Botão Primário

```tsx
<Button variant="default" size="lg">
  Criar Meta
</Button>
```

### 12.2 Card de Meta

```tsx
<Card className="shadow-md border-radius-md">
  <CardHeader>
    <CardTitle>Meta Anual 2026</CardTitle>
  </CardHeader>
  <CardContent>
    <Progress value={65} />
  </CardContent>
</Card>
```

### 12.3 Input com Label

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="seu@email.com" />
</div>
```

---

## 13. Próximos Passos

1. [ ] Implementar Tailwind config com estas variáveis
2. [ ] Configurar shadcn/ui no projeto
3. [ ] Criar componente MobileNav
4. [ ] Implementar tema (light/dark)
5. [ ] Criar layout base
6. [ ] Testar responsividade

---

**Documento criado em:** 24/03/2026  
**Próxima revisão:** Antes do desenvolvimento do MVP
