import { useNavigate } from 'react-router-dom';
import MenuIcon from '@/components/icons/MenuIcon';
import { useAuth } from '@/hooks/useAuth';
import { useProfileMenu } from '@/hooks/useProfileMenu';
import { PentagonClipPath } from '@/components/icons/PentagonClipPath';

import appLogo from '@/assets/images/app-logo.png';
import ChatIcon from '@/components/icons/MessageIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import MedalIcon from '@/components/icons/MedalIcon';
import MapIcon from '@/components/icons/MapIcon';
import CommunityIcon from '@/components/icons/PeopleIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';
import userAvatar from '@/assets/images/user-avatar.png';
import { type SidebarNavProps } from "@/types/chat";
import { Button } from "@/components/Button";

export const SidebarNav = ({ activeNav, onNavChange, isMobileOpen, onMobileToggle }: SidebarNavProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  return (
    <>
      {/* Mobile hamburger button */}
      {onMobileToggle && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-3 left-3 z-30 w-11 h-11 bg-white rounded-xl shadow-md border border-slate-100"
          onClick={onMobileToggle}
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
                  onClick={() => onNavChange(item.id)}
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
            <div className="absolute bottom-2 left-16 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <Button
                type="button"
                variant="ghost"
                size="none"
                className="w-full justify-start text-left px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 gap-2.5"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onMobileToggle} />
          <aside className="relative w-18 bg-surface-sidebar h-full flex flex-col items-center justify-between py-6 z-50 shadow-2xl select-none animate-in slide-in-from-left duration-200">
            <div className="flex flex-col items-center gap-7 w-full px-10">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-11 h-11 rounded-2xl p-1.5"
                leftIcon={
                  <img
                    src={appLogo}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                }
              />

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
                      className={`w-11 h-11 rounded-2xl p-2.5 ${
                        isActive
                          ? 'bg-blue-50 border border-blue-200 shadow-sm shadow-blue-100/50'
                          : 'bg-transparent border border-transparent hover:bg-white/80 hover:border-slate-200/60'
                      }`}
                      onClick={() => {
                        onNavChange(item.id);
                        onMobileToggle?.();
                      }}
                      leftIcon={
                        <Icon
                          aria-label={item.alt}
                          className={`w-5 h-5 object-contain transition-all duration-200 ${
                            isActive
                              ? 'opacity-100 scale-105 filter-logo-active'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        />
                      }
                    />
                  );
                })}
              </nav>
            </div>

            {/* The logout button, in the form of a small icon or text, fits perfectly within a width of 18 inches.*/}
            <Button
              type="button"
              variant="danger"
              size="sm"
              className="text-xxs px-2 py-1.5 rounded-lg"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </aside>
        </div>
      )}
    </>
  );
};
