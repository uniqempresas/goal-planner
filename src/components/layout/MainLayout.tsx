import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Sidebar, MobileSidebar } from './Sidebar';
import MobileNav from './MobileNav';

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)]">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] pb-16">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
