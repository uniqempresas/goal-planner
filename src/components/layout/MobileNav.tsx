import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Target,
  Trophy,
  Calendar,
  MoreHorizontal,
  ClipboardList,
  Award,
  Settings,
  Layout,
  LogOut,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Início', icon: Home, href: '/dashboard' },
  { id: 'areas', label: 'Áreas', icon: Target, href: '/areas' },
  { id: 'metas', label: 'Metas', icon: Trophy, href: '/metas' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, href: '/agenda' },
  { id: 'mais', label: 'Mais', icon: MoreHorizontal, href: '#mais' },
];

const moreItems = [
  { id: 'revisoes', label: 'Revisões', icon: ClipboardList, href: '/revisoes' },
  { id: 'conquistas', label: 'Conquistas', icon: Award, href: '/conquistas' },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
  },
  { id: 'templates', label: 'Templates', icon: Layout, href: '/templates' },
  { id: 'sair', label: 'Sair', icon: LogOut, href: '/logout', danger: true },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Encontrar o índice do item ativo (ignorando o '#mais')
  const activeIndex = navItems.findIndex(
    (item) => item.href !== '#mais' && location.pathname.startsWith(item.href)
  );

  // Scroll automático para centralizar o item ativo
  useEffect(() => {
    const container = containerRef.current;
    if (!container || activeIndex === -1) return;

    const itemWidth = 64;
    const containerWidth = container.clientWidth;
    const scrollPos =
      activeIndex * itemWidth - containerWidth / 2 + itemWidth / 2;

    container.scrollTo({
      left: Math.max(0, scrollPos),
      behavior: 'smooth',
    });
  }, [activeIndex]);

  const handleNavigation = (href: string) => {
    if (href === '#mais') {
      setIsSheetOpen(true);
    } else {
      navigate(href);
    }
  };

  const renderNavItem = (item: NavItem, index: number) => {
    const isActive = index === activeIndex && item.href !== '#mais';
    const isMais = item.id === 'mais';
    const Icon = item.icon;

    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item.href)}
        className={`
          flex flex-col items-center justify-center min-w-[64px] h-14 px-1 py-2
          rounded-lg transition-all duration-200 ease-out
          ${
            isActive
              ? 'text-amber-500 scale-105'
              : isMais
                ? 'text-neutral-500'
                : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className={`w-6 h-6 ${isActive ? 'w-7 h-7' : ''}`} />
        <span
          className={`text-[10px] mt-1 ${isActive ? 'font-semibold text-amber-600' : 'font-medium'}`}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-50 lg:hidden"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div
        ref={containerRef}
        className="flex items-center justify-start gap-1 px-2 overflow-x-auto scrollbar-hide snap-x"
        style={{ scrollBehavior: 'smooth' }}
      >
        {navItems.map((item, index) => {
          if (item.id === 'mais') {
            return (
              <Sheet
                key={item.id}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
              >
                <SheetTrigger>
                  <button className="flex flex-col items-center justify-center min-w-[64px] h-14 px-1 py-2 rounded-lg transition-all duration-200 ease-out text-neutral-500">
                    <MoreHorizontal className="w-6 h-6" />
                    <span className="text-[10px] mt-1 font-medium">Mais</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="pb-8">
                  <div className="flex flex-col gap-1">
                    {moreItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setIsSheetOpen(false);
                            navigate(subItem.href);
                          }}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg text-left
                            transition-colors hover:bg-neutral-100
                            ${subItem.danger ? 'text-red-500' : 'text-foreground'}
                          `}
                        >
                          <SubIcon className="w-5 h-5" />
                          <span className="font-medium">{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            );
          }
          return renderNavItem(item, index);
        })}
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
