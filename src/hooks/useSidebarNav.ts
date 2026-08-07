import { useState } from 'react';

export interface UseSidebarNavResult {
  activeNav: string;
  setActiveNav: (id: string) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export const useSidebarNav = (
  initialNav = 'chats',
): UseSidebarNavResult => {
  const [activeNav, setActiveNav] = useState(initialNav);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const onMobileToggle = () => setIsMobileOpen((prev) => !prev);

  return { activeNav, setActiveNav, isMobileOpen, onMobileToggle };
};
