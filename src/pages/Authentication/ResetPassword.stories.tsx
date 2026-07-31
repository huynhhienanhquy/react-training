import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ResetPassword } from './ResetPassword'

const meta: Meta<typeof ResetPassword> = {
  title: 'Pages/Authentication/ResetPassword',
  component: ResetPassword,
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

export const WithError: Story = {}
