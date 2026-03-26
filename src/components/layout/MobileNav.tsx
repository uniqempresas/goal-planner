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
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Início', icon: Home, href: '/dashboard' },
  { id: 'areas', label: 'Áreas', icon: Target, href: '/areas' },
  { id: 'goals', label: 'Metas', icon: Trophy, href: '/metas/grandes' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, href: '/agenda' },
  { id: 'mais', label: 'Mais', icon: MoreHorizontal, href: '#mais' },
];

const moreItems = [
  { id: 'weekly', label: 'Semanal', icon: Calendar, href: '/weekly' },
  { id: 'reviews', label: 'Revisões', icon: ClipboardList, href: '/reviews' },
  {
    id: 'achievements',
    label: 'Conquistas',
    icon: Award,
    href: '/achievements',
  },
  { id: 'settings', label: 'Configurações', icon: Settings, href: '/settings' },
  { id: 'templates', label: 'Templates', icon: Layout, href: '/templates' },
  { id: 'sair', label: 'Sair', icon: LogOut, href: '/logout', danger: true },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeIndex = navItems.findIndex(
    (item) => item.href !== '#mais' && location.pathname.startsWith(item.href)
  );

  useEffect(() => {
    if (!isMounted || !containerRef.current || activeIndex === -1) return;

    const container = containerRef.current;
    const itemWidth = 64;
    const containerWidth = container.clientWidth;
    const scrollPos =
      activeIndex * itemWidth - containerWidth / 2 + itemWidth / 2;

    container.scrollTo({
      left: Math.max(0, scrollPos),
      behavior: 'smooth',
    });
  }, [activeIndex, isMounted]);

  const handleNavigation = (href: string) => {
    if (href === '#mais') {
      setIsSheetOpen(true);
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50 lg:hidden"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div
        ref={containerRef}
        className="flex items-center justify-center gap-1 px-2 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {navItems.map((item, index) => {
          const isActive = index === activeIndex && item.href !== '#mais';
          const isMais = item.id === 'mais';
          const Icon = item.icon;

          if (isMais) {
            return (
              <Sheet
                key={item.id}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
              >
                <button
                  className="flex flex-col items-center justify-center min-w-[64px] h-14 px-2 rounded-lg transition-all duration-200 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setIsSheetOpen(true)}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[10px] mt-1 font-medium">Mais</span>
                </button>
                <SheetContent side="bottom" className="pb-8">
                  <div className="flex flex-col gap-1">
                    {moreItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setIsSheetOpen(false);
                            if (subItem.id === 'sair') {
                              navigate('/login');
                            } else {
                              navigate(subItem.href);
                            }
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

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={`
                flex flex-col items-center justify-center min-w-[64px] h-14 px-2
                rounded-lg transition-all duration-200 ease-out
                ${
                  isActive
                    ? 'text-amber-500 scale-105'
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
