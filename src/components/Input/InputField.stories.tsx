import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputField } from '.'

const meta: Meta<typeof InputField> = {
  title: 'UI/InputField',
  component: InputField,
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password'] },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: { label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
}

export const Email: Story = {
  args: { label: 'Email address', type: 'email', placeholder: 'Enter your email' },
}

export const Password: Story = {
  args: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
}

export const WithValue: Story = {
  args: { label: 'Email address', type: 'email', value: 'user@example.com' },
}
