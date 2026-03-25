import {
  Search,
  Moon,
  Sun,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="flex h-16 items-center gap-4 px-4">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-xl text-primary-600"
        >
          <span>GP</span>
          <span className="hidden sm:inline">Goal Planner</span>
        </Link>

        {/* Search - Desktop */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="search"
              placeholder="Buscar metas, áreas..."
              className="pl-9 bg-neutral-50 dark:bg-neutral-800"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 relative">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary-100 text-primary-600">
                  U
                </AvatarFallback>
              </Avatar>
            </Button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md border z-50">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    Minha Conta
                  </div>
                  <div className="h-px bg-border my-1" />
                  <button
                    className="relative flex cursor-default items-center gap-1.5 rounded-md w-full px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent"
                    onClick={() => {}}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </button>
                  <Link
                    to="/settings"
                    className="relative flex cursor-default items-center gap-1.5 rounded-md w-full px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Link>
                  <div className="h-px bg-border my-1" />
                  <button
                    className="relative flex cursor-default items-center gap-1.5 rounded-md w-full px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent text-error-600"
                    onClick={() => {}}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
