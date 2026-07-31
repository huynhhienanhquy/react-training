import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { VerifyOTP } from './VerifyOTP'

const meta: Meta<typeof VerifyOTP> = {
  title: 'Pages/Authentication/VerifyOTP',
  component: VerifyOTP,
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
