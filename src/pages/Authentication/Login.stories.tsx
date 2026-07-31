import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { Login } from './Login'
import { AuthContext } from '../../context/AuthContext'
import { fn } from '@storybook/test'

const mockAuthContext = {
  user: null,
  login: fn(),
  register: fn(),
  logout: fn(),
  isAuthenticated: false,
}

const meta: Meta<typeof Login> = {
  title: 'Pages/Authentication/Login',
  component: Login,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <Story />
        </AuthContext.Provider>
      </BrowserRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  // Since we use internal useFormState for loading, we can't easily force it from props in this component without MSW or interacting.
  // We can simulate it by showing the story where user clicks submit.
}

export const WithError: Story = {}
