import type { ReactNode } from 'react';
import { SidebarNav } from '@/components/chat/SidebarNav/SidebarNav';
import { Topbar } from '@/components/chat/Topbar/Topbar';
import { useSidebarNav } from '@/hooks/useSidebarNav';
import type { TopbarProps } from '@/types/chat';

interface DashboardLayoutProps {
  children: ReactNode;
  topbarProps: TopbarProps;
  secondarySidebar?: ReactNode;
  mainClassName?: string;
}

export const DashboardLayout = ({
  children,
  topbarProps,
  secondarySidebar,
  mainClassName = '',
}: DashboardLayoutProps) => {
  const { activeNav, setActiveNav, isMobileOpen, onMobileToggle } =
    useSidebarNav();

  return (
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      <SidebarNav
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobileOpen={isMobileOpen}
        onMobileToggle={onMobileToggle}
      />

      {secondarySidebar}

      <main
        className={`flex-1 bg-surface-section flex flex-col h-full overflow-y-auto ${mainClassName}`}
      >
        <Topbar {...topbarProps} />
        {children}
      </main>
    </div>
  );
};
