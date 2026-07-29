import type { Meta, StoryObj } from '@storybook/react-vite'
import { Topbar } from './Topbar'

const meta: Meta<typeof Topbar> = {
  title: 'Chat/Topbar',
  component: Topbar,
  argTypes: {
    isBreadcrumbMode: { control: 'boolean' },
    chatTitle: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    chatTitle: 'Cheap flights to Lagos',
    messages: [{ id: '1', sender: 'user', text: 'Find cheap flights from Owerri to Lagos', type: 'text' }],
  },
}

export const BreadcrumbMode: Story = {
  args: {
    isBreadcrumbMode: true,
    chatTitle: 'Cheap flights to Lagos',
    onBackToChat: () => alert('Back to chat'),
    onNewChat: () => alert('New chat'),
  },
}

export const Empty: Story = {
  args: {
    messages: [],
  },
}
