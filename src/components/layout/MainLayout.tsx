import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { DesktopSidebar, MobileSidebar } from './Sidebar';
import MobileNav from './MobileNav';
import { useSidebarState } from '@/hooks/useSidebarState';

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { collapsed, toggle } = useSidebarState();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div
          className={`hidden lg:block fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ${
            collapsed ? 'w-[72px]' : 'w-[260px]'
          }`}
        >
          <DesktopSidebar collapsed={collapsed} onToggle={toggle} />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main
          className={`flex-1 min-h-[calc(100vh-4rem)] pb-16 transition-all duration-300 ${
            collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
