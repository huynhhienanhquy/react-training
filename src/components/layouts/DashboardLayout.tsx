import { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SidebarNav } from '@/components/common/Chat/SidebarNav';
import { useSidebarNav } from '@/hooks/useSidebarNav';

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
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      <SidebarNav
        activeNav={getActiveNav(pathname)}
        onNavChange={handleNavChange}
        isMobileOpen={isMobileOpen}
        onMobileToggle={onMobileToggle}
      />
      <Outlet />
    </div>
  );
};
