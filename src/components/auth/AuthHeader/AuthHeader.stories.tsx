import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthHeader } from './AuthHeader'

const meta: Meta<typeof AuthHeader> = {
  title: 'Auth/AuthHeader',
  component: AuthHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Login: Story = {
  args: {
    title: 'Continue Planning Your Trips',
    subtitle: "We're happy you're back. Let's get back to planning your adventures",
  },
}

export const Register: Story = {
  args: {
    title: 'Unlock Your Next Adventure',
    subtitle: 'Create a free account to start planning trips with Tripal',
  },
}

export const RessetPassword: Story = {
  args: {
    title: 'Reset Password',
    subtitle: 'Enter your new password below',
  },
}

export const Onboarding: Story = {
  args: {
    title: 'Let’s Get To Know You!',
    subtitle: 'Provide only the information provided so that Tripal can know you better',
  },
}

export const ForgotPassword: Story = {
  args: {
    title: 'Verify Email',
    subtitle: 'Enter your email address to receive verification OTP',
  },
}

export const VerifyOTP: Story = {
  args: {
    title: 'Enter OTP',
    subtitle: 'Enter your email address to receive verification OTP',
  },
}
