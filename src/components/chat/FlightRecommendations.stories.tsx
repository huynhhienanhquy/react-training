import type { Meta, StoryObj } from '@storybook/react-vite'
import { FlightRecommendations } from './FlightRecommendations'
import type { FlightOption } from './FlightRecommendations'

const meta: Meta<typeof FlightRecommendations> = {
  title: 'Chat/FlightRecommendations',
  component: FlightRecommendations,
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const MOCK_FLIGHTS: FlightOption[] = [
  {
    id: '1',
    airline: 'AirPeace Airways, Nigerian',
    outbound: { time: '9:15am - 9:15pm', route: 'QOW - LAG', duration: '9h 24m', stops: '1 stop' },
    returnLeg: { time: '4:25am - 10:20pm', route: 'LAG - QOW', duration: '9h 24m', stops: '1 stop' },
    price: '$1,200',
    tag: 'Cheap',
  },
  {
    id: '2',
    airline: 'Green Africa Airways',
    outbound: { time: '6:00am - 2:30pm', route: 'QOW - LAG', duration: '8h 30m', stops: 'Direct' },
    returnLeg: { time: '3:00pm - 11:30pm', route: 'LAG - QOW', duration: '8h 30m', stops: 'Direct' },
    price: '$1,500',
    tag: 'Fastest',
  },
]

export const Default: Story = {
  args: {
    title: 'Recommended Flights For a Round Trip Journey',
    flights: MOCK_FLIGHTS,
    onBookNow: (id) => alert('Book flight: ' + id),
    onSeeAll: () => alert('See all flights'),
  },
}
