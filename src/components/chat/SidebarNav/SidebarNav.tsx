import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfileMenu } from '@/hooks/useProfileMenu';

import logo from '@/assets/icons/Logo.png';
import iconChat from '@/assets/icons/chat.png';
import iconHeart from '@/assets/icons/heart.png';
import iconMedal from '@/assets/icons/medal.png';
import iconMap from '@/assets/icons/map.png';
import iconCommunity from '@/assets/icons/people.png';
import iconSettings from '@/assets/icons/setting.png';
import userAvatar from '@/assets/icons/user.png';
import { type SidebarNavProps } from "@/types/chat";
import { Button } from "@/components/Button/Button";

export const SidebarNav = ({ activeNav, setActiveNav, isMobileOpen, onMobileToggle }: SidebarNavProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    isOpen: showProfileMenu,
    ref: menuRef,
    toggle: toggleProfileMenu,
    close: closeProfileMenu,
  } = useProfileMenu();

  const navItems = [
    { id: 'chats', icon: iconChat, alt: 'Chats' },
    { id: 'favorites', icon: iconHeart, alt: 'Favorites' },
    { id: 'medal', icon: iconMedal, alt: 'Medal' },
    { id: 'map', icon: iconMap, alt: 'Routes Map' },
    { id: 'community', icon: iconCommunity, alt: 'Community' },
    { id: 'settings', icon: iconSettings, alt: 'Settings' },
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
        <button
          onClick={onMobileToggle}
          className="md:hidden fixed top-3 left-3 z-30 w-11 h-11 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-125 min-w-80 bg-surface-sidebar border-r-10 border-surface-section flex-col items-center justify-between py-6 z-20 shrink-0 select-none">        <div className="flex flex-col items-center gap-7 w-full px-2">
          {/* App Logo */}
          <button className="w-11 h-11 rounded-2xl flex items-center justify-center p-1.5 hover:opacity-90 transition mt-3">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </button>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-3.5 items-center w-full">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition p-2.5 ${
                    isActive
                      ? 'bg-blue-50 border border-blue-200 shadow-sm shadow-blue-100/50'
                      : 'bg-transparent border border-transparent hover:bg-white/80 hover:border-slate-200/60'
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className={`w-5 h-5 object-contain transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 scale-105 [filter:invert(38%)_sepia(88%)_saturate(2421%)_hue-rotate(200deg)_brightness(98%)_contrast(96%)]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Avatar & Logout Popover */}
        <div className="relative mb-4" ref={menuRef}>
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="pentagon-clip" clipPathUnits="objectBoundingBox">
                <path d="M 0.5 0.05 C 0.52 0.05, 0.93 0.32, 0.95 0.35 C 0.97 0.38, 0.88 0.88, 0.85 0.92 C 0.82 0.96, 0.18 0.96, 0.15 0.92 C 0.12 0.88, 0.03 0.38, 0.05 0.35 C 0.07 0.32, 0.48 0.05, 0.5 0.05 Z" />
              </clipPath>
            </defs>
          </svg>

          <button
            onClick={toggleProfileMenu}
            className="w-17 h-17 transition transform active:scale-95 flex items-center justify-center focus:outline-none relative drop-shadow-sm"
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
          </button>

          {/* Dropdown Logout */}
          {showProfileMenu && (
            <div className="absolute bottom-2 left-16 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition"
              >
                <span>Log out</span>
              </button>
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
              <button className="w-11 h-11 rounded-2xl flex items-center justify-center p-1.5">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </button>

              <nav className="flex flex-col gap-3.5 items-center w-full">
                {navItems.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveNav(item.id);
                        onMobileToggle?.();
                      }}
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition p-2.5 ${
                        isActive
                          ? 'bg-blue-50 border border-blue-200 shadow-sm shadow-blue-100/50'
                          : 'bg-transparent border border-transparent hover:bg-white/80 hover:border-slate-200/60'
                      }`}
                    >
                      <img
                        src={item.icon}
                        alt={item.alt}
                        className={`w-5 h-5 object-contain transition-all duration-200 ${
                          isActive
                            ? 'opacity-100 scale-105 [filter:invert(38%)_sepia(88%)_saturate(2421%)_hue-rotate(200deg)_brightness(98%)_contrast(96%)]'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      />
                    </button>
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
