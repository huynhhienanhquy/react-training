import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext'; // Đảm bảo đúng đường dẫn tới AuthProvider.tsx

import logo from '../../assets/icons/Logo.png';
import iconChat from '../../assets/icons/chat.png';
import iconHeart from '../../assets/icons/heart.png';
import iconMedal from '../../assets/icons/medal.png';
import iconMap from '../../assets/icons/map.png';
import iconCommunity from '../../assets/icons/people.png';
import iconSettings from '../../assets/icons/setting.png';
import userAvatar from '../../assets/icons/user.png';

interface SidebarNavProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeNav, setActiveNav }) => {
  const navigate = useNavigate();

  // Get the logout (or setUser) function from AuthContext.
  const { logout } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'chats', icon: iconChat, alt: 'Chats' },
    { id: 'favorites', icon: iconHeart, alt: 'Favorites' },
    { id: 'medal', icon: iconMedal, alt: 'Medal' },
    { id: 'map', icon: iconMap, alt: 'Routes Map' },
    { id: 'community', icon: iconCommunity, alt: 'Community' },
    { id: 'settings', icon: iconSettings, alt: 'Settings' },
  ];

  // The logout handler function has been updated.
  const handleLogout = async () => {
    try {
      //  1. Close the dropdown menu.
      setShowProfileMenu(false);

      // 2. Call the logout function in AuthContext to clear the user and token states.
      if (logout) {
        await logout();
      } else {
        localStorage.clear();
        sessionStorage.clear();
      }

      // 3.Redirect to login page
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="w-18 md:w-20 bg-[#F8F9FB] border-r-[10px] border-[#EEF3FC] flex flex-col items-center justify-between py-6 z-20 shrink-0 select-none">
      <div className="flex flex-col items-center gap-7 w-full px-2">
        {/* App Logo */}
        <button className="w-11 h-11 rounded-2xl flex items-center justify-center p-1.5 hover:opacity-90 transition">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </button>

        {/* 🔹 Navigation Items*/}
        <nav className="flex flex-col gap-3.5 items-center w-full">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition p-2.5 ${
                  isActive
                    ? 'bg-white border border-blue-200 shadow-sm shadow-blue-100/50'
                    : 'bg-transparent border border-transparent hover:bg-white/80 hover:border-slate-200/60'
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  className={`w-5 h-5 object-contain transition-all duration-200 ${
                    isActive
                      ? 'opacity-100 scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Avatar & Logout Popover */}
      <div className="relative" ref={menuRef}>
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="pentagon-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.5 0.05 C 0.52 0.05, 0.93 0.32, 0.95 0.35 C 0.97 0.38, 0.88 0.88, 0.85 0.92 C 0.82 0.96, 0.18 0.96, 0.15 0.92 C 0.12 0.88, 0.03 0.38, 0.05 0.35 C 0.07 0.32, 0.48 0.05, 0.5 0.05 Z" />
            </clipPath>
          </defs>
        </svg>

        <button
          onClick={() => setShowProfileMenu((prev) => !prev)}
          className="w-12 h-12 transition transform active:scale-95 flex items-center justify-center focus:outline-none relative drop-shadow-sm"
        >
          {/* 1. Outer White Border */}
          <div
            className="w-full h-full bg-white flex items-center justify-center p-1"
            style={{ clipPath: 'url(#pentagon-clip)' }}
          >
            {/* 2.Inner Avatar */}
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
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-xs font-semibold text-slate-800 truncate">Alex Developer</p>
              <p className="text-[10px] text-slate-400 truncate">user@gmail.com</p>
            </div>

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
  );
};
