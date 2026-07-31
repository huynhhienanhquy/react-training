import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { SelectHotelPage } from './SelectHotelPage'
import { fn } from '@storybook/test'

const meta: Meta<typeof SelectHotelPage> = {
  title: 'Pages/Dashboard/SelectHotelPage',
  component: SelectHotelPage,
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
    onSelectHotel: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    chatTitle: 'Hotels in Bahamas',
  },
}

export const Loading: Story = {}

export const Error: Story = {}

export const Empty: Story = {}
