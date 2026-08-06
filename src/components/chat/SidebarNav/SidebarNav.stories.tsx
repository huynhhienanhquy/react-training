import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { SidebarNav } from '.'
import { AuthProvider } from '../../../context/AuthProvider'

const meta: Meta<typeof SidebarNav> = {
  title: 'Chat/SidebarNav',
  component: SidebarNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <div className="h-screen bg-slate-100 flex">
            <Story />
          </div>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    activeNav: {
      control: { type: 'select' },
      options: ['chats', 'favorites', 'medal', 'map', 'community', 'settings'],
    },
    setActiveNav: { action: 'navigated' },
    onMobileToggle: { action: 'mobileToggled' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultDesktop: Story = {
  args: {
    activeNav: 'chats',
    isMobileOpen: false,
  },
}

export const MapActive: Story = {
  args: {
    activeNav: 'map',
    isMobileOpen: false,
  },
}

export const MobileDrawerOpen: Story = {
  args: {
    activeNav: 'chats',
    isMobileOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
