import { memo, useCallback, type ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { SidebarNav } from '@/components/common/Chat/SidebarNav';
import { Topbar } from '@/components/common/Chat/Topbar';
import { useSidebarNav } from '@/hooks/useSidebarNav';
import type { TopbarProps } from '@/types/chat';

const navRoutes: Record<string, string> = {
  chats: '/chats',
  favorites: '/favorites',
  medal: '/rewards',
  map: '/routes-map',
  community: '/community',
  settings: '/settings',
};

const getActiveNav = (pathname: string) => {
  if (pathname.startsWith('/chats') || pathname === '/dashboard') {
    return 'chats';
  }

  return Object.entries(navRoutes).find(([, route]) => pathname.startsWith(route))?.[0] ?? 'chats';
};

interface DashboardPageLayoutProps extends TopbarProps {
  children: ReactNode;
  className?: string;
  scrollable?: boolean;
}

export const DashboardPageLayout = memo(function DashboardPageLayout({
  children,
  className,
  scrollable = false,
  ...topbarProps
}: DashboardPageLayoutProps) {
  return (
    <main
      className={twMerge(
        'flex h-full min-w-0 flex-1 flex-col bg-surface-section',
        scrollable ? 'overflow-y-auto' : 'relative overflow-hidden',
        className,
      )}
    >
      <Topbar {...topbarProps} />
      {children}
    </main>
  );
});

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isMobileOpen, onMobileToggle } = useSidebarNav();

  const handleNavChange = useCallback((id: string) => {
    const route = navRoutes[id];

    if (route) {
      navigate(route);
    }
  }, [navigate]);

  return (
    <div className="flex h-screen h-dvh min-w-0 overflow-hidden bg-slate-100 font-sans text-slate-700 antialiased">
      <SidebarNav
        activeNav={getActiveNav(pathname)}
        onNavChange={handleNavChange}
        attachedToContent={pathname === '/chats/fares' || pathname === '/chats/hotels'}
        isMobileOpen={isMobileOpen}
        onMobileToggle={onMobileToggle}
      />
      <Outlet />
    </div>
  );
};
