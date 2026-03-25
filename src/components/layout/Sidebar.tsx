import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  Trophy,
  Calendar,
  CalendarDays,
  BarChart3,
  Award,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  mobile?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  {
    id: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  { id: 'areas', href: '/areas', icon: Target, label: 'Áreas de Vida' },
  { id: 'metas', href: '/goals', icon: Trophy, label: 'Metas' },
  { id: 'agenda', href: '/agenda', icon: Calendar, label: 'Agenda' },
  {
    id: 'semanal',
    href: '/weekly',
    icon: CalendarDays,
    label: 'Plano Semanal',
  },
  { id: 'revisoes', href: '/reviews', icon: BarChart3, label: 'Revisões' },
  { id: 'conquistas', href: '/achievements', icon: Award, label: 'Conquistas' },
  { id: 'templates', href: '/templates', icon: FileText, label: 'Templates' },
  {
    id: 'configuracoes',
    href: '/settings',
    icon: Settings,
    label: 'Configurações',
  },
];

export function Sidebar({
  isOpen = true,
  onClose,
  mobile = false,
  collapsed = false,
  onToggle,
}: SidebarProps) {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const content = (
    <div
      className={cn(
        'flex flex-col h-full bg-surface border-r border-border',
        mobile ? 'w-full' : collapsed ? 'w-[72px]' : 'w-[260px]',
        'transition-all duration-300 ease-in-out'
      )}
    >
      {/* Mobile Close Button */}
      {mobile && onClose && (
        <div className="flex justify-end p-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Logo - Desktop only */}
      {!mobile && (
        <div
          className={cn(
            'h-10 flex items-center justify-center border-b border-border',
            collapsed ? 'px-2' : 'px-3'
          )}
        >
          {collapsed ? (
            <span className="text-xl font-bold text-amber-500">GP</span>
          ) : (
            <span className="text-lg font-bold text-amber-500">
              Goal Planner
            </span>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.id}>
                <Link
                  to={item.href}
                  onClick={mobile ? onClose : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                    'transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
                    active
                      ? 'bg-amber-50 text-amber-600'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                    collapsed ? 'justify-center' : '',
                    mobile && 'text-base py-3'
                  )}
                  title={collapsed ? item.label : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 flex-shrink-0',
                      active ? 'text-amber-500' : 'text-neutral-500'
                    )}
                  />
                  {!collapsed && (
                    <span
                      className={cn(
                        'text-sm font-medium',
                        active && 'font-semibold'
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button - Desktop only */}
      {!mobile && (
        <div className="p-3 border-t border-border">
          <button
            onClick={onToggle}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg',
              'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
              'transition-colors duration-200',
              'w-full',
              collapsed ? 'justify-center' : ''
            )}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Colapsar</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  // Mobile: Use overlay
  if (mobile) {
    if (!isOpen) return null;
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
          {content}
        </div>
      </>
    );
  }

  return content;
}

// Desktop Sidebar wrapper
export function DesktopSidebar({
  collapsed = false,
  onToggle,
}: {
  collapsed: boolean;
  onToggle?: () => void;
}) {
  return <Sidebar collapsed={collapsed} onToggle={onToggle} />;
}

// Mobile Sidebar wrapper
export function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return <Sidebar isOpen={isOpen} onClose={onClose} mobile />;
}
