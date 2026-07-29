import type { Meta, StoryObj } from '@storybook/react-vite'
import { SectionHeader } from './SectionHeader'

const meta: Meta<typeof SectionHeader> = {
  title: 'UI/SectionHeader',
  component: SectionHeader,
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Flight Details' },
}

export const CustomClass: Story = {
  args: { title: 'Hotel Information', className: 'text-blue-600' },
}
