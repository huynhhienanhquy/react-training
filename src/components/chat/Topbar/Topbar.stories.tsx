import type { Meta, StoryObj } from '@storybook/react-vite'
import { Topbar } from './Topbar'

const meta: Meta<typeof Topbar> = {
  title: 'Chat/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isBreadcrumbMode: { control: 'boolean' },
    breadcrumbLabel: { control: 'text' },
    chatTitle: { control: 'text' },
    onBackToChat: { action: 'backToChat' },
    onNewChat: { action: 'newChat' },
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
    breadcrumbLabel: 'Select Fare',
    chatTitle: 'Cheap flights to Lagos',
  },
}

export const Empty: Story = {
  args: {
    messages: [],
  },
}
