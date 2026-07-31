import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ChatPage } from './ChatPage'
import { AuthContext } from '../../../context/AuthContext'
import { fn } from '@storybook/test'

const mockAuthContext = {
  user: {
    id: 'user123',
    email: 'user@example.com',
    name: 'Test User',
  },
  login: fn(),
  register: fn(),
  logout: fn(),
  isAuthenticated: true,
}

const meta: Meta<typeof ChatPage> = {
  title: 'Pages/Dashboard/ChatPage',
  component: ChatPage,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <div className="h-screen w-full">
            <Story />
          </div>
        </AuthContext.Provider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithMessages: Story = {
  // Can't directly inject messages into ChatPage easily without props, 
  // but it's a good placeholder if we had them or mocked the DB.
}
