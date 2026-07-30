import type { Meta, StoryObj } from '@storybook/react-vite'
import { ItineraryCardWidget } from './ItineraryCardWidget'
import type { DayItinerary } from '../../services/travelService'

const meta: Meta<typeof ItineraryCardWidget> = {
  title: 'Chat/ItineraryCardWidget',
  component: ItineraryCardWidget,
}

export default meta
type Story = StoryObj<typeof meta>

const MOCK_ITINERARY: DayItinerary[] = [
  {
    day: 1,
    dateTitle: 'Monday, March 15',
    activities: [
      { id: 'a1', title: 'Arrival & Hotel Check-in', time: '2:00 PM', location: 'Marriott Hotel' },
      { id: 'a2', title: 'Welcome Dinner', time: '7:00 PM', location: 'Skyview Restaurant' },
    ],
  },
  {
    day: 2,
    dateTitle: 'Tuesday, March 16',
    activities: [
      { id: 'a3', title: 'City Tour', time: '9:00 AM', location: 'Downtown' },
      { id: 'a4', title: 'Beach Time', time: '2:00 PM', location: 'Paradise Beach' },
      { id: 'a5', title: 'Sunset Cruise', time: '5:30 PM', location: 'Marina' },
    ],
  },
]

export const Default: Story = {
  args: {
    itinerary: MOCK_ITINERARY,
    onViewAll: () => alert('View full itinerary'),
  },
}

export const SingleDay: Story = {
  args: {
    itinerary: [MOCK_ITINERARY[0]],
  },
}

export const Loading: Story = {
  args: {},
}
