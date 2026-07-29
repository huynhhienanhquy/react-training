import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthFooter } from './AuthFooter'

const meta: Meta<typeof AuthFooter> = {
  title: 'Auth/AuthFooter',
  component: AuthFooter,
  argTypes: {
    questionText: { control: 'text' },
    actionText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SignIn: Story = {
  args: {
    questionText: "Don't have an account?",
    actionText: 'Sign Up',
    onActionClick: () => alert('Navigate to Sign Up'),
  },
}

export const SignUp: Story = {
  args: {
    questionText: 'Already have an account?',
    actionText: 'Sign In',
    onActionClick: () => alert('Navigate to Sign In'),
  },
}
