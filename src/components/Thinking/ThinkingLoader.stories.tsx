import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThinkingLoader } from './ThinkingLoader'

const meta: Meta<typeof ThinkingLoader> = {
  title: 'UI/ThinkingLoader',
  component: ThinkingLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomText: Story = {
  args: { text: 'Searching for flights...' },
}
