import type { Meta, StoryObj } from '@storybook/react-vite'
import { PriceDisplay } from '.'

const meta: Meta<typeof PriceDisplay> = {
  title: 'UI/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    amount: { control: 'text' },
    period: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: { amount: '$1,200', size: 'sm' },
}

export const WithPeriod: Story = {
  args: { amount: '$1,200', period: '/per night', size: 'sm' },
}

export const Medium: Story = {
  args: { amount: '$899', size: 'md' },
}

export const Large: Story = {
  args: { amount: '$2,500', size: 'lg' },
}
