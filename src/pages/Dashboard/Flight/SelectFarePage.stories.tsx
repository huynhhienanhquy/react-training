import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { SelectFarePage } from './SelectFarePage'
import { fn } from '@storybook/test'

const meta: Meta<typeof SelectFarePage> = {
  title: 'Pages/Dashboard/SelectFarePage',
  component: SelectFarePage,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="h-screen w-full">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onBackToChat: fn(),
    onStartNewChat: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    chatTitle: 'Cheap flights to Lagos',
  },
}

export const Loading: Story = {}

export const Error: Story = {}

export const Empty: Story = {}
