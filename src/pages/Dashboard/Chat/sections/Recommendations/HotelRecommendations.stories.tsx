import type { Meta, StoryObj } from '@storybook/react-vite'
import { HotelRecommendations } from './HotelRecommendations'
import type { HotelOption } from './HotelRecommendations'

const meta: Meta<typeof HotelRecommendations> = {
  title: 'Chat/HotelRecommendations',
  component: HotelRecommendations,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    onBookNow: { action: 'bookHotel' },
    onSeeAll: { action: 'seeAllHotels' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const MOCK_HOTELS: HotelOption[] = [
  {
    id: '1',
    name: 'Five Star Hotel, Bahamas',
    description: 'Exclusive suites and large rooms dedicated to your comfort and luxury. Free wifi available',
    price: 1200,
    tag: 'Cheap',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Marriott Resort & Spa',
    description: 'Beachfront luxury resort with infinity pool and world-class dining',
    price: 2500,
    tag: 'Popular',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  },
]

export const Default: Story = {
  args: {
    title: 'Recommended Hotels For a Three-Night Staycation',
    hotels: MOCK_HOTELS,
  },
}
