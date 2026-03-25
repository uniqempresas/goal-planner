import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  Calendar,
  FileText,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  mobile?: boolean;
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/areas', icon: Target, label: 'Áreas de Vida' },
  { href: '/goals', icon: Target, label: 'Metas' },
  { href: '/agenda', icon: Calendar, label: 'Agenda' },
  { href: '/weekly', icon: FileText, label: 'Planejamento' },
  { href: '/reviews', icon: FileText, label: 'Revisões' },
  { href: '/achievements', icon: Trophy, label: 'Conquistas' },
  { href: '/settings', icon: Settings, label: 'Configurações' },
];

export function Sidebar({
  isOpen = true,
  onClose,
  mobile = false,
}: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const content = (
    <div
      className={cn(
        'flex flex-col h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800',
        collapsed ? 'w-16' : 'w-64',
        mobile && 'w-full'
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

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={mobile ? onClose : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
                collapsed && 'justify-center'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button - Desktop only */}
      {!mobile && (
        <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
          <Button
            variant="ghost"
            className={cn('w-full', collapsed ? 'justify-center' : '')}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Recolher</span>
              </>
            )}
          </Button>
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
export function DesktopSidebar() {
  return <Sidebar />;
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
