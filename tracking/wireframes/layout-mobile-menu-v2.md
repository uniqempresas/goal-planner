# Especificação: Menu Mobile Inferior v2.0

**Módulo:** Layout  
**Arquivo:** `layout-mobile-menu-v2.md`  
**Versão:** 2.0  
**Data:** 25/03/2026

---

## 1. Visão Geral

O **Menu Mobile Inferior v2.0** é o componente principal de navegação no mobile, posicionado fixamente na parte inferior da tela. Nesta nova versão, todos os itens de navegação são exibidos diretamente em uma barra de rolagem horizontal, sem a necessidade de um item "Mais" que abre um sheet.

---

## 2. Lista Completa de Itens

### 2.1 Itens de Navegação

Todos os itens são clicáveis e acessíveis diretamente, sem sub-menus ou expansão.

| #   | ID            | Label         | Ícone (Lucide React) | Rota             |
| --- | ------------- | ------------- | -------------------- | ---------------- |
| 1   | inicio        | Início        | `Home`               | `/dashboard`     |
| 2   | areas         | Áreas         | `Target`             | `/areas`         |
| 3   | metas         | Metas         | `Trophy`             | `/metas`         |
| 4   | agenda        | Agenda        | `Calendar`           | `/agenda`        |
| 5   | revisoes      | Revisões      | `BarChart3`          | `/revisoes`      |
| 6   | conquistas    | Conquistas    | `Award`              | `/conquistas`    |
| 7   | configuracoes | Configurações | `Settings`           | `/configuracoes` |
| 8   | templates     | Templates     | `FileText`           | `/templates`     |

### 2.2 Representação Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    CONTEÚDO DO APP                          │
│                    (Scrollável)                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ │  🏠  │ │  🎯  │ │  🏆  │ │  📅  │ │  📊  │ │  🏅  │   │
│ │Início│ │Áreas │ │ Metas│ │Agenda│ │Revis.│ │Conqu.│   │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │
│                                                             │
│ ┌──────┐ ┌──────┐                                         │
│ │  ⚙️  │ │  📄  │  ← Scroll horizontal para ver mais    │
│ │ Conf.│ │Templ.│                                         │
│ └──────┘ └──────┘                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Especificações Técnicas

### 3.1 Dimensões

| Propriedade        | Valor       |
| ------------------ | ----------- |
| Altura total       | 64px        |
| Altura do ícone    | 24px        |
| Largura do item    | 64px (fixa) |
| Padding vertical   | 8px         |
| Padding horizontal | 8px         |
| Gap entre itens    | 4px         |

### 3.2 Posicionamento

```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 50;
background: var(--color-surface);
border-top: 1px solid var(--color-border);
```

### 3.3 Layout

- **Container:** Flexbox com `flex-row`
- **Overflow:** `overflow-x-auto` (scroll horizontal)
- **Scroll:** Scroll manual (usuário arrasta)
- **Snap:** `snap-x snap-mandatory` (opcional, para snapping)

```tsx
<div className="flex items-center justify-start gap-1 px-2 overflow-x-auto scrollbar-hide">
  {/* itens */}
</div>
```

---

## 4. Comportamento de Scroll

### 4.1 Scroll Horizontal Manual

- O usuário pode arrastar o menu horizontalmente para ver todos os itens
- Scroll suave com inércia natural do touch
- Não há scroll automático ao trocar de página

### 4.2 Scroll Suave ao Clicar (Opcional)

Quando o usuário clica em um item, o container pode rolar suavemente para centralizar o item clicado:

```tsx
const scrollToItem = (index: number) => {
  const container = containerRef.current;
  if (!container) return;

  const itemWidth = 72; // 64px + 8px gap
  const scrollPosition =
    index * itemWidth - container.clientWidth / 2 + itemWidth / 2;

  container.scrollTo({
    left: scrollPosition,
    behavior: 'smooth',
  });
};
```

### 4.3 Estado Ativo

O item ativo deve ser destacado visualmente:

| Propriedade       | Valor Normal            | Valor Ativo           |
| ----------------- | ----------------------- | --------------------- |
| Cor do ícone      | `neutral-500` (#64748B) | `amber-500` (#F59E0B) |
| Cor do label      | `neutral-500`           | `amber-500`           |
| Tamanho do ícone  | 24px                    | 24px (sem mudança)    |
| Font-weight label | 500 (medium)            | 600 (semibold)        |

---

## 5. Estilização

### 5.1 Cores

```tsx
// Ícone inativo
<Icon className="w-6 h-6 text-neutral-500" />

// Ícone ativo
<Icon className="w-6 h-6 text-amber-500" />
```

### 5.2 Label

```tsx
// Label normal
<span className="text-xs font-medium text-neutral-500">Label</span>

// Label ativo
<span className="text-xs font-semibold text-amber-500">Label</span>
```

### 5.3 Estados

| Estado  | Ícone         | Label                       | Background    |
| ------- | ------------- | --------------------------- | ------------- |
| Normal  | `neutral-500` | `neutral-500`               | transparent   |
| Ativo   | `amber-500`   | `amber-500` + font-semibold | transparent   |
| Hover   | `neutral-700` | `neutral-700`               | `neutral-100` |
| Pressed | `scale-95`    | opacity 0.8                 | -             |

### 5.4 Item Completo

```tsx
<button
  onClick={() => onNavigate(item.href)}
  className={`
    flex flex-col items-center justify-center
    min-w-[64px] h-14 px-2
    rounded-lg transition-all duration-200
    ${
      isActive
        ? 'text-amber-500'
        : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
    }
  `}
>
  <Icon className="w-6 h-6" />
  <span
    className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}
  >
    {item.label}
  </span>
</button>
```

---

## 6. Responsividade

### 6.1 Comportamento

- O container mostra quantos itens couberem na tela
- Itens restantes são acessíveis via scroll horizontal manual
- Não há limite fixo de itens visíveis — depende da largura da tela

### 6.2 Largura de Tela x Itens Visíveis

| Largura da Tela           | Itens Aproximados Visíveis |
| ------------------------- | -------------------------- |
| 320px (iPhone SE)         | 4 itens                    |
| 375px (iPhone 12/13)      | 5 itens                    |
| 414px (iPhone 11 Pro Max) | 5-6 itens                  |
| 480px                     | 6 itens                    |

### 6.3 Ocultar em Telas Maiores

O menu mobile deve ser ocultado em telas maiores que `lg` (1024px):

```tsx
<div className="lg:hidden fixed bottom-0 left-0 right-0">
  <MobileNav />
</div>
```

---

## 7. Implementação

### 7.1 Definição dos Itens

```tsx
import {
  Home,
  Target,
  Trophy,
  Calendar,
  BarChart3,
  Award,
  Settings,
  FileText,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const mobileNavItems: NavItem[] = [
  { id: 'inicio', label: 'Início', href: '/dashboard', icon: Home },
  { id: 'areas', label: 'Áreas', href: '/areas', icon: Target },
  { id: 'metas', label: 'Metas', href: '/metas', icon: Trophy },
  { id: 'agenda', label: 'Agenda', href: '/agenda', icon: Calendar },
  { id: 'revisoes', label: 'Revisões', href: '/revisoes', icon: BarChart3 },
  { id: 'conquistas', label: 'Conquistas', href: '/conquistas', icon: Award },
  {
    id: 'configuracoes',
    label: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
  },
  { id: 'templates', label: 'Templates', href: '/templates', icon: FileText },
];
```

### 7.2 Componente MobileNav

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { mobileNavItems } from './mobileNavItems';

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  // Encontrar o índice do item ativo baseado na rota atual
  const activeIndex = mobileNavItems.findIndex((item) => {
    // Verificar se a rota atual começa com o href do item
    // Isso permite que sub-rotas também destaquem o item correto
    return pathname === item.href || pathname.startsWith(item.href + '/');
  });

  // Scroll suave para o item ativo quando a página muda
  useEffect(() => {
    if (containerRef.current && activeIndex !== -1) {
      const container = containerRef.current;
      const itemWidth = 72; // 64px + 8px gap
      const targetScroll =
        activeIndex * itemWidth - container.clientWidth / 2 + itemWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    <nav
      role="navigation"
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-50"
    >
      <div
        ref={containerRef}
        className="flex items-center justify-start gap-1 px-2 overflow-x-auto scrollbar-hide"
      >
        {mobileNavItems.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`
                flex flex-col items-center justify-center
                min-w-[64px] h-14 px-2 py-2
                rounded-lg transition-all duration-200
                ${
                  isActive
                    ? 'text-amber-500'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6" />
              <span
                className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
```

### 7.3 CSS Adicional (Tailwind + CSS)

```css
/* Ocultar scrollbar mas manter funcionalidade */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Opcional: Snap horizontal */
.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-center {
  scroll-snap-align: center;
}
```

---

## 8. Acessibilidade

### 8.1 Requisitos

- [ ] `role="navigation"` no elemento nav
- [ ] `aria-label="Navegação principal"`
- [ ] `aria-current="page"` no item ativo
- [ ] Tab focus visível
- [ ] Suporte a voice-over
- [ ] Touch target mínimo 44x44px (nossos itens são 64x64px ✅)

### 8.2 Keyboard Navigation

```
Tab → Move entre itens
Enter/Space → Ativa item (navega para a página)
```

---

## 9. Comparação: v1 vs v2

| Aspecto         | v1 (Atual)       | v2 (Nova)                     |
| --------------- | ---------------- | ----------------------------- |
| Itens visíveis  | 5 (fixos)        | 8 (scroll horizontal)         |
| Item "Mais"     | Sim (abre sheet) | Removido                      |
| Sub-itens       | 5 (em sheet)     | 0 (todos expostos)            |
| Scroll manual   | Não (automático) | Sim (manual + opcional suave) |
| Itens clicáveis | 5                | 8                             |

---

## 10. Histórico de Versões

| Versão | Data       | Alterações                                                         |
| ------ | ---------- | ------------------------------------------------------------------ |
| 1.0    | 24/03/2026 | Versão inicial com 5 itens + "Mais"                                |
| 2.0    | 25/03/2026 | Remoção do "Mais", todos os 8 itens expostos com scroll horizontal |

---

**Fim do documento**
