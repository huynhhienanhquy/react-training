import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ForgotPassword } from './ForgotPassword'

const meta: Meta<typeof ForgotPassword> = {
  title: 'Pages/Authentication/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {}
