import { useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProfileMenu } from '@/hooks/useProfileMenu'
import { Button } from '@/components/Button/Button'
import type { SidebarNavProps } from '@/types/chat'

import LogoIcon from '@/assets/icons/Logo.png'
import ChatIcon from '@/components/icons/MessageIcon'
import HeartIcon from '@/components/icons/HeartIcon'
import MedalIcon from '@/components/icons/MedalIcon'
import MapIcon from '@/components/icons/MapIcon'
import CommunityIcon from '@/components/icons/PeopleIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import UserIcon from '@/components/icons/PeopleIcon'

export const SidebarNav = ({
  activeNav,
  setActiveNav,
  isMobileOpen,
  onMobileToggle,
}: SidebarNavProps) => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const {
    isOpen: showProfileMenu,
    ref: menuRef,
    toggle: toggleProfileMenu,
    close: closeProfileMenu,
  } = useProfileMenu()

  const navItems = [
    { id: 'chats', icon: ChatIcon, alt: 'Chats' },
    { id: 'favorites', icon: HeartIcon, alt: 'Favorites' },
    { id: 'medal', icon: MedalIcon, alt: 'Medal' },
    { id: 'map', icon: MapIcon, alt: 'Routes Map' },
    { id: 'community', icon: CommunityIcon, alt: 'Community' },
    { id: 'settings', icon: SettingsIcon, alt: 'Settings' },
  ]

  const handleLogout = async () => {
    try {
      closeProfileMenu()
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

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
          aria-label="Open navigation menu"
          leftIcon={
            <Menu
              className="w-5 h-5 text-slate-700"
              aria-hidden="true"
            />
          }
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-125 min-w-80 bg-surface-sidebar border-r-10 border-surface-section flex-col items-center justify-between py-6 z-20 shrink-0 select-none">
        <div className="flex flex-col items-center gap-7 w-full px-2">
          {/* App Logo */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-11 h-11 rounded-2xl p-1.5 hover:opacity-90 mt-3"
            aria-label="Home"
            leftIcon={
              <LogoIcon
                aria-hidden="true"
              />
            }
          />

          {/* Navigation Items */}
          <nav className="flex flex-col gap-3.5 items-center w-full">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.id

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
                  onClick={() => setActiveNav(item.id)}
                  aria-label={item.alt}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className={`transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                </Button>
              )
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

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-17 h-17 md:w-17 md:h-17 transition transform active:scale-95 focus:outline-none relative drop-shadow-sm"
            onClick={toggleProfileMenu}
            aria-label="Open profile menu"
            aria-expanded={showProfileMenu}
          >
            <div
              className="w-full h-full bg-white flex items-center justify-center p-1"
              style={{ clipPath: 'url(#pentagon-clip)' }}
            >
              <div
                className="w-full h-full bg-slate-200 overflow-hidden"
                style={{ clipPath: 'url(#pentagon-clip)' }}
              >
                <UserIcon
                  width="100%"
                  height="100%"
                  color="#6B6B6B"
                  className="scale-110"
                  aria-hidden="true"
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
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={onMobileToggle}
          />

          <aside className="relative w-18 bg-surface-sidebar h-full flex flex-col items-center justify-between py-6 z-50 shadow-2xl select-none animate-in slide-in-from-left duration-200">
            <div className="flex flex-col items-center gap-7 w-full px-10">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-11 h-11 rounded-2xl p-1.5"
                aria-label="Home"
                leftIcon={
                  <LogoIcon
                    aria-hidden="true"
                  />
                }
              />

              <nav className="flex flex-col gap-3.5 items-center w-full">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeNav === item.id

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
                        setActiveNav(item.id)
                        onMobileToggle?.()
                      }}
                      aria-label={item.alt}
                      aria-current={isActive ? 'page' : undefined}
                      leftIcon={
                        <Icon
                          width={20}
                          height={20}
                          aria-hidden="true"
                          className={`transition-all duration-200 ${
                            isActive
                              ? 'opacity-100 scale-105'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        />
                      }
                    />
                  )
                })}
              </nav>
            </div>

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
  )
}
