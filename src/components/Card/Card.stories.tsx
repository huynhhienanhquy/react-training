import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'surface'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div className="p-6 text-slate-700">Card content</div>,
    variant: 'default',
  },
}

export const Surface: Story = {
  args: {
    children: <div className="p-6 text-slate-700">Surface card content</div>,
    variant: 'surface',
  },
}

export const CustomClass: Story = {
  args: {
    children: <div className="p-6 text-slate-700">Card with extra rounding</div>,
    className: 'rounded-2xl',
  },
}
