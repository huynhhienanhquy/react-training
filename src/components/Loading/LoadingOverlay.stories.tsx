import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoadingOverlay } from './LoadingOverlay'

const meta: Meta<typeof LoadingOverlay> = {
  title: 'UI/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isVisible: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Visible: Story = {
  args: { isVisible: true },
}

export const Hidden: Story = {
  args: { isVisible: false },
}
