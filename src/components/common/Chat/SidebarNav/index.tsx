import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@/components/common/Icons/MenuIcon';
import { useAuth } from '@/hooks/useAuth';
import { useProfileMenu } from '@/hooks/useProfileMenu';
import { PentagonClipPath } from '@/components/common/Icons/PentagonClipPath';

import appLogo from '@/assets/images/app-logo.png';
import ChatIcon from '@/components/common/Icons/MessageIcon';
import HeartIcon from '@/components/common/Icons/HeartIcon';
import MedalIcon from '@/components/common/Icons/MedalIcon';
import MapIcon from '@/components/common/Icons/MapIcon';
import CommunityIcon from '@/components/common/Icons/PeopleIcon';
import SettingsIcon from '@/components/common/Icons/SettingsIcon';
import userAvatar from '@/assets/images/user-avatar.png';
import { type SidebarNavProps } from "@/types/chat";
import { Button } from '@/components/common/Button';
import { useTheme } from '@/hooks/useTheme';

export const SidebarNav = memo(function SidebarNav({ activeNav, onNavChange, isMobileOpen, onMobileToggle }: SidebarNavProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const {
    isOpen: showProfileMenu,
    ref: menuRef,
    toggle: toggleProfileMenu,
    close: closeProfileMenu,
  } = useProfileMenu();

  const navItems = [
    { id: 'chats', icon: ChatIcon, alt: 'Chats' },
    { id: 'favorites', icon: HeartIcon, alt: 'Favorites' },
    { id: 'medal', icon: MedalIcon, alt: 'Medal' },
    { id: 'map', icon: MapIcon, alt: 'Routes Map' },
    { id: 'community', icon: CommunityIcon, alt: 'Community' },
    { id: 'settings', icon: SettingsIcon, alt: 'Settings' },
  ];

  const handleLogout = async () => {
    try {
      closeProfileMenu();
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const createNavHandler = (id: string, closeMobile = false) => () => {
    onNavChange(id);
    if (closeMobile) onMobileToggle?.();
  };

  return (
    <>
      {/* Mobile hamburger button */}
      {onMobileToggle && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="fixed left-3 top-3 z-30 h-10 w-10 rounded-xl border border-slate-100 bg-white p-0 shadow-md md:hidden"
          onClick={onMobileToggle}
          aria-label="Open navigation"
          leftIcon={<MenuIcon className="w-5 h-5 text-slate-700" />}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-125 min-w-80 bg-surface-sidebar border-r-10 border-surface-section flex-col items-center justify-between py-6 z-20 shrink-0 select-none">        <div className="flex flex-col items-center gap-7 w-full px-2">
          {/* App Logo */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-11 h-11 rounded-2xl p-1.5 hover:opacity-90 mt-3"
            leftIcon={
              <img
                src={appLogo}
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            }
          />

          {/* Navigation Items */}
          <nav className="flex flex-col gap-3.5 items-center w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <Button
                  key={item.id}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`w-11 h-11 min-w-11 min-h-11 !p-0 !flex !items-center !justify-center !rounded-xl ${
                    isActive
                      ? 'bg-blue-50 border-2 border-blue-200 shadow-sm shadow-blue-100/50'
                      : 'bg-transparent border-2 border-transparent hover:bg-white/80 hover:border-slate-200/60'
                  }`}
                  onClick={createNavHandler(item.id)}
                >
                  <Icon
                    aria-label={item.alt}
                    className={`block w-5 h-5 object-contain transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 scale-105 filter-logo-active'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                </Button>
              );
            })}
          </nav>
        </div>

        {/* User Avatar & Logout Popover */}
        <div className="relative mb-4" ref={menuRef}>
          <PentagonClipPath />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-17 h-17 md:w-17 md:h-17 transition transform active:scale-95 focus:outline-none relative drop-shadow-sm"
            onClick={toggleProfileMenu}
          >
            <div
              className="w-full h-full bg-white flex items-center justify-center p-1"
              style={{ clipPath: 'url(#pentagon-clip)' }}
            >
              <div
                className="w-full h-full bg-slate-200 overflow-hidden"
                style={{ clipPath: 'url(#pentagon-clip)' }}
              >
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          </Button>

          {/* Dropdown Logout */}
          {showProfileMenu && (
            <div className="absolute bottom-2 left-16 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="none"
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-medium dark:text-slate-100 dark:hover:bg-slate-700"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  aria-pressed={isDark}
                >
                  {isDark ? 'Light mode' : 'Dark mode'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="none"
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onMobileToggle} />
          <aside className="relative z-50 flex h-full w-64 max-w-[85vw] flex-col justify-between bg-surface-sidebar p-4 shadow-2xl select-none animate-in slide-in-from-left duration-200">
            <div className="w-full">
              <div className="mb-8 flex items-center gap-3 px-2">
                <img
                  src={appLogo}
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-base font-bold text-ink">Tripal</span>
              </div>

              <nav className="flex w-full flex-col gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <Button
                      key={item.id}
                      type="button"
                      variant="ghost"
                      size="none"
                      className={`h-11 w-full justify-start gap-3 rounded-xl px-3 text-sm ${
                        isActive
                          ? 'border border-blue-200 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50'
                          : 'border border-transparent hover:border-slate-200/60 hover:bg-white/80'
                      }`}
                      onClick={createNavHandler(item.id, true)}
                      leftIcon={
                        <Icon
                          aria-label={item.alt}
                          className={`h-5 w-5 object-contain transition-all duration-200 ${
                            isActive
                              ? 'opacity-100 scale-105 filter-logo-active'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        />
                      }
                    >
                      {item.alt}
                    </Button>
                  );
                })}
              </nav>
            </div>

            <div className="w-full border-t border-slate-200 pt-4">
              <div className="mb-4 flex items-center gap-3 px-2">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="truncate text-sm font-semibold text-slate-700">My account</span>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="none"
                  className="h-10 w-full justify-start rounded-xl px-3 text-sm dark:text-slate-100 dark:hover:bg-slate-700"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  aria-pressed={isDark}
                >
                  {isDark ? 'Light mode' : 'Dark mode'}
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  size="none"
                  className="h-10 w-full justify-start rounded-xl px-3 text-sm"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
});
