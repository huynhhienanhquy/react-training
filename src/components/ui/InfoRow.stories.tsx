import type { Meta, StoryObj } from '@storybook/react-vite'
import { InfoRow } from './InfoRow'

const meta: Meta<typeof InfoRow> = {
  title: 'UI/InfoRow',
  component: InfoRow,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Airline', value: 'Emirates' },
}

export const Price: Story = {
  args: { label: 'Total', value: '$1,200' },
}

export const CustomClass: Story = {
  args: { label: 'Duration', value: '9h 24m', className: 'text-sm' },
}
