import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatHistorySidebar } from '.'
import type { ChatSession } from '.'

const meta: Meta<typeof ChatHistorySidebar> = {
  title: 'Chat/ChatHistorySidebar',
  component: ChatHistorySidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    searchQuery: { control: 'text' },
    onSearchChange: { action: 'searchQueryChanged' },
    onSelectSession: { action: 'sessionSelected' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const MOCK_SESSIONS: ChatSession[] = [
  { id: '1', title: 'Cheap flights to Lagos', group: 'TODAY' },
  { id: '2', title: 'Hotels in Bahamas', group: 'TODAY' },
  { id: '3', title: 'Restaurants in Victoria Island', group: 'YESTERDAY' },
  { id: '4', title: 'Trip to Paris itinerary', group: 'YESTERDAY' },
  { id: '5', title: 'Flights from New York to London', group: 'LAST 7 DAYS' },
  { id: '6', title: 'Best time to visit Tokyo', group: 'LAST 7 DAYS' },
]

export const Default: Story = {
  args: {
    searchQuery: '',
    sessions: MOCK_SESSIONS,
    activeSessionId: '1',
  },
}

export const WithSearch: Story = {
  args: {
    searchQuery: 'flights',
    sessions: MOCK_SESSIONS,
    activeSessionId: null,
  },
}

export const Empty: Story = {
  args: {
    searchQuery: '',
    sessions: [],
    activeSessionId: null,
  },
}
