import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Início', icon: Home, href: '/dashboard' },
  { id: 'areas', label: 'Áreas', icon: Target, href: '/areas' },
  { id: 'metas', label: 'Metas', icon: Trophy, href: '/metas' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, href: '/agenda' },
  { id: 'revisoes', label: 'Revisões', icon: BarChart3, href: '/revisoes' },
  { id: 'conquistas', label: 'Conquistas', icon: Award, href: '/conquistas' },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
  },
  { id: 'templates', label: 'Templates', icon: FileText, href: '/templates' },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Encontrar o índice do item ativo baseado na rota atual
  const activeIndex = navItems.findIndex(
    (item) =>
      location.pathname === item.href ||
      location.pathname.startsWith(item.href + '/')
  );

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const renderNavItem = (item: NavItem, index: number) => {
    const isActive = index === activeIndex;
    const Icon = item.icon;

    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item.href)}
        className={`
          flex flex-col items-center justify-center min-w-[64px] h-14 px-2 py-2
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
        {navItems.map((item, index) => renderNavItem(item, index))}
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
