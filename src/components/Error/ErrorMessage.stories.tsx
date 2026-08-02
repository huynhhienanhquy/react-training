import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorMessage } from './ErrorMessage'

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithMessage: Story = {
  args: { message: 'Invalid email or password. Please try again.' },
}

export const Empty: Story = {
  args: { message: '' },
}

export const CustomClass: Story = {
  args: { message: 'Something went wrong.', className: 'text-red-600 font-bold' },
}
