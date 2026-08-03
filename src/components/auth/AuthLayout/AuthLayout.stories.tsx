import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthLayout } from './AuthLayout'
import { AuthHeader } from '../AuthHeader/AuthHeader'
import { AuthFooter } from '../AuthFooter/AuthFooter'
import { Button } from '../../Button/Button'
import { InputField } from '../../InputField/InputField'

const meta: Meta<typeof AuthLayout> = {
  title: 'Auth/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isLoading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoading: false,
    children: (
      <div className="flex flex-col gap-6">
        <AuthHeader
          title="Continue Planning Your Trips"
          subtitle="Welcome back. Let's get back to planning your adventures"
        />
        <InputField label="Email address" type="email" placeholder="Enter your email" />
        <InputField label="Password" type="password" placeholder="Enter your password" />
        <Button>Sign In</Button>
        <AuthFooter questionText="Don't have an account?" actionText="Sign Up" onActionClick={() => {}} />
      </div>
    ),
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: <div />,
  },
}
