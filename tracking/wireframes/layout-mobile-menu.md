# Wireframe: Menu Mobile Inferior

**Módulo:** Layout  
**Arquivo:** `layout-03-mobile-menu.md`  
**Versão:** 1.0

---

## 1. Visão Geral

O **Menu Mobile Inferior** é o componente principal de navegação no mobile, posicionado fixamente na parte inferior da tela. Ele exibe 5 módulos visíveis com scroll horizontal, onde o módulo atual fica centralizado.

---

## 2. Especificações Técnicas

### 2.1 Dimensões

| Propriedade | Valor |
|-------------|-------|
| Altura total | 64px |
| Altura do ícone | 24px |
| Largura do item | 64px |
| Padding vertical | 8px |
| Padding horizontal | 4px |
| Gap entre itens | 8px |

### 2.2 Posicionamento

```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 50;
background: var(--color-surface);
border-top: 1px solid var(--color-border);
```

---

## 3. Itens de Navegação

### 3.1 Lista de Itens

| # | ID | Label | Ícone (Heroicons) | Rota |
|---|-----|-------|-------------------|------|
| 1 | dashboard | Início | `HomeIcon` | `/dashboard` |
| 2 | areas | Áreas | `TargetIcon` | `/areas` |
| 3 | metas | Metas | `TrophyIcon` | `/metas` |
| 4 | agenda | Agenda | `CalendarIcon` | `/agenda` |
| 5 | mais | Mais | `EllipsisHorizontalIcon` | menu expandido |

### 3.2 Sub-itens do "Mais"

Ao clicar em "Mais", abre um menu dropdown com:

- Revisões (`/revisoes`)
- Conquistas (`/conquistas`)
- Configurações (`/configuracoes`)
- Templates (`/templates`)
- Sair (`/logout`)

---

## 4. Comportamento Visual

### 4.1 Estado Normal

```
┌────────────────────────────────────────┐
│  🏠    🎯    📅    ⚡    ⋯            │
│ Início Áreas Metas Agenda Mais         │
└────────────────────────────────────────┘
```

### 4.2 Estado Ativo (Agenda)

Quando o usuário está na página de Agenda:

```
┌────────────────────────────────────────┐
│  🏠    🎯  [📅]   ⚡    ⋯            │
│ Início Áreas Metas Agenda Mais         │
│         └─ Centralizado (ativo) ─┘     │
└────────────────────────────────────────┘
```

- **Ícone ativo:** 28px (maior que os outros 24px)
- **Cor do ícone ativo:** `var(--color-accent-500)` (#F59E0B)
- **Ícones inativos:** `var(--color-neutral-500)` (#64748B)
- **Label ativo:** `var(--color-accent-600)` com bold

### 4.3 Scroll Horizontal

Quando o usuário navega entre páginas:

1. O item clicado scrolla suavemente para o centro
2. O scroll é automático (não manual)
3. Há um buffer de 2 itens de cada lado do ativo
4. A transição leva 300ms com `ease-out`

```
Posição 1 (Dashboard): [1][2][3][4][5]
Posição 2 (Áreas):     [1][2][3][4][5]
Posição 3 (Metas):     [1][2][3][4][5]
Posição 4 (Agenda):    [1][2][3][4][5]
Posição 5 (Mais):      [1][2][3][4][5]
```

---

## 5. Wireframe Visual

### 5.1 Layout ASCII

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              CONTEÚDO DO APP                   │
│              (Scrollável)                      │
│                                                 │
│                                                 │
├─────────────────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│  │ 🏠  │ │ 🎯  │ │ 📅  │ │ ⚡  │ │ ⋯  │     │
│  │     │ │     │ │     │ │     │ │     │     │
│  │Início│ │Áreas│ │Metas│ │Agenda│ │Mais│     │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘     │
│   item    item   [ATIVO]  item    item         │
└─────────────────────────────────────────────────┘
```

### 5.2 Detalhamento do Item

```
┌──────────────────┐
│                  │
│     [ICON]       │  24px (normal)
│     24x24        │  28px (ativo)
│                  │
│    [LABEL]       │  text-xs
│    text-xs       │  font-medium (ativo)
│                  │
└──────────────────┘
  width: 64px
  padding: 8px
```

---

## 6. Estados

### 6.1 Estado Normal
- Ícone: `neutral-500`
- Label: `neutral-500`
- Background: transparent

### 6.2 Estado Ativo
- Ícone: `accent-500` (#F59E0B)
- Label: `accent-600` + font-semibold
- Background: `accent-50` (light) / `accent-900/20` (dark)

### 6.3 Estado Hover
- Ícone: `neutral-700`
- Background: `neutral-100`

### 6.4 Estado Pressed
- Escala: 0.95
- Opacidade: 0.8

---

## 7. Implementação

### 7.1 Componente React (Estrutura)

```tsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MobileNavProps {
  activeRoute: string;
  items: NavItem[];
  onNavigate: (route: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export function MobileNav({ activeRoute, items, onNavigate }: MobileNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = items.findIndex(item => item.href === activeRoute);

  useEffect(() => {
    // Scroll automático para centralizar o item ativo
    if (containerRef.current) {
      const itemWidth = 64;
      const scrollPosition = (activeIndex * itemWidth) - (window.innerWidth / 2) + (itemWidth / 2);
      containerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [activeIndex]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-50">
      <div 
        ref={containerRef}
        className="flex items-center justify-start gap-2 px-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.href)}
              className={`
                flex flex-col items-center justify-center 
                w-16 h-14 rounded-lg transition-all
                snap-center
                ${isActive 
                  ? 'text-accent-500 scale-110' 
                  : 'text-neutral-500 hover:text-neutral-700'
                }
              `}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'w-7 h-7' : ''}`} />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>
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

### 7.2 CSS Adicional

```css
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

### 7.3 Sub-menu "Mais"

```tsx
// Ao clicar em "Mais", abre um Sheet (shadcn)
<Sheet>
  <SheetTrigger asChild>
    <button className="flex flex-col items-center justify-center w-16 h-14">
      <EllipsisHorizontalIcon className="w-6 h-6" />
      <span className="text-xs mt-1">Mais</span>
    </button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <nav className="space-y-2">
      <SheetLink href="/revisoes">📊 Revisões</SheetLink>
      <SheetLink href="/conquistas">🏆 Conquistas</SheetLink>
      <SheetLink href="/configuracoes">⚙️ Configurações</SheetLink>
      <SheetLink href="/templates">📋 Templates</SheetLink>
      <Separator />
      <SheetLink href="/logout" className="text-red-500">Sair</SheetLink>
    </nav>
  </SheetContent>
</Sheet>
```

---

## 8. Responsividade

### 8.1 Breakpoints

| Breakpoint | Comportamento |
|------------|---------------|
| xs (< 480px) | Menu inferior fixo |
| sm (480-639px) | Menu inferior fixo |
| md (640-767px) | Sidebar colapsado + Menu inferior |
| lg (768px+) | Sidebar completo, menu oculto |

### 8.2 Transição para Desktop

A partir de `lg: 1024px`, o menu inferior é ocultado e substituído pela sidebar desktop:

```tsx
// No componente
<div className="hidden lg:flex">
  {/* Sidebar desktop */}
</div>
<div className="lg:hidden">
  {/* MobileNav */}
</div>
```

---

## 9. Acessibilidade

### 9.1 Requisitos

- [ ] Role="navigation" no elemento nav
- [ ] aria-label="Navegação principal"
- [ ] aria-current="page" no item ativo
- [ ] Tab focus visível
- [ ] Suporte a voice-over
- [ ] Touch target mínimo 44x44px

### 9.2 Keyboard Navigation

```
Tab → Move entre itens
Enter/Space → Ativa item
Esc → Fecha sub-menu
```

---

## 10. Testes

### 10.1 Casos de Teste

| ID | Caso | Resultado Esperado |
|----|------|-------------------|
| TC01 | Abrir app no mobile | Menu visível na parte inferior |
| TC02 | Clicar em "Metas" | Scroll para centralizar Metas |
| TC03 | Estar em "/agenda" | Agenda destacado como ativo |
| TC04 | Clicar em "Mais" | Sheet abre com sub-itens |
| TC05 | Rotacionar tela | Layout se adapta |
| TC06 | Tela 320px | Todos os itens cabem |

---

## 11. Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 24/03/2026 | Versão inicial |

---

**Fim do documento**
