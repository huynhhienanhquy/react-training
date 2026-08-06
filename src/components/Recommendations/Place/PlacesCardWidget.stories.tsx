import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlacesCardWidget } from '.'
import type { PlaceData } from '@/types/travel'

const meta: Meta<typeof PlacesCardWidget> = {
  title: 'Chat/PlacesCardWidget',
  component: PlacesCardWidget,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onViewAll: { action: 'viewAllPlaces' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const MOCK_PLACES: PlaceData[] = [
  {
    id: '1',
    name: 'La Maison Restaurant',
    location: '123 Beach Road, Victoria Island',
    category: 'food',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'National Museum',
    location: 'City Center, Lagos',
    category: 'sightseeing',
    rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Mega Plaza Mall',
    location: 'Marina, Lagos Island',
    category: 'shopping',
    rating: 4.0,
    imageUrl: 'https://images.unsplash.com/photo-1519567770579-c2fc33e2c3ef?auto=format&fit=crop&w=800&q=80',
  },
]

export const Default: Story = {
  args: {
    places: MOCK_PLACES,
  },
}

export const SinglePlace: Story = {
  args: {
    places: [MOCK_PLACES[0]],
  },
}

export const Loading: Story = {
  args: {},
}
