import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthFooter } from '.'

const meta: Meta<typeof AuthFooter> = {
  title: 'Auth/AuthFooter',
  component: AuthFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    questionText: { control: 'text' },
    actionText: { control: 'text' },
    onActionClick: { action: 'actionClicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SignIn: Story = {
  args: {
    questionText: "Don't have an account?",
    actionText: 'Sign Up',
  },
}

export const SignUp: Story = {
  args: {
    questionText: 'Already have an account?',
    actionText: 'Sign In',
  },
}
