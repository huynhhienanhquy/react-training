import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'social', 'dark', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Create a Free Account', variant: 'primary', size: 'lg' },
}

export const Secondary: Story = {
  args: { children: 'Book Now', variant: 'secondary', size: 'sm' },
}

export const Social: Story = {
  args: {
    children: 'Continue with Google',
    variant: 'social',
    size: 'md',
    leftIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
  },
}

export const Dark: Story = {
  args: { children: 'View Full Itinerary', variant: 'dark', size: 'md', className: 'w-full' },
}

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost', size: 'md' },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    variant: 'primary',
    size: 'lg',
    rightIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
}

export const Loading: Story = {
  args: { children: 'Please wait...', variant: 'primary', size: 'lg', isLoading: true },
}

export const Disabled: Story = {
  args: { children: 'Submit', variant: 'primary', size: 'lg', disabled: true },
}

export const Small: Story = {
  args: { children: 'Start New Chat', variant: 'primary', size: 'sm' },
}
