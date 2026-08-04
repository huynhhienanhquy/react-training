import { useState } from 'react';
import { DEFAULT_NAV_ID } from '@/config/navigation';

export interface UseSidebarNavResult {
  activeNav: string;
  setActiveNav: (id: string) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export const useSidebarNav = (
  initialNav = DEFAULT_NAV_ID,
): UseSidebarNavResult => {
  const [activeNav, setActiveNav] = useState(initialNav);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const onMobileToggle = () => setIsMobileOpen((prev) => !prev);

  return { activeNav, setActiveNav, isMobileOpen, onMobileToggle };
};
