import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatMessageList } from '../ChatMessageList/ChatMessageList'
import type { ChatMessage } from '@/types/chat'

const meta: Meta<typeof ChatMessageList> = {
  title: 'Chat/ChatMessageList',
  component: ChatMessageList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isTyping: { control: 'boolean' },
    onBookFlight: { action: 'bookFlight' },
    onBookHotel: { action: 'bookHotel' },
    onViewAllPlaces: { action: 'viewAllPlaces' },
    onViewAllItinerary: { action: 'viewAllItinerary' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock Data
const TEXT_MESSAGES: ChatMessage[] = [
  { id: 'm1', sender: 'user', text: 'Find cheap flights from Owerri to Lagos', type: 'text' },
  { id: 'm2', sender: 'ai', text: "I found several options for your trip from Owerri to Lagos. Here's what's available:", type: 'flight' },
]

const FLIGHT_MESSAGES: ChatMessage[] = [
  { id: 'm3', sender: 'user', text: 'Show me flights to Lagos', type: 'text' },
  {
    id: 'm4',
    sender: 'ai',
    text: 'Here are the best flight options for you:',
    type: 'flight',
  },
]

const HOTEL_MESSAGES: ChatMessage[] = [
  { id: 'm5', sender: 'user', text: 'Find me top hotels in the Bahamas', type: 'text' },
  {
    id: 'm6',
    sender: 'ai',
    text: 'Here are some top recommended hotels for your stay in the Bahamas:',
    type: 'hotel',
  },
]

const PLACES_MESSAGES: ChatMessage[] = [
  { id: 'm7', sender: 'user', text: 'What places should I visit in Da Nang?', type: 'text' },
  {
    id: 'm8',
    sender: 'ai',
    text: 'Here are some popular places you should definitely check out in Da Nang:',
    type: 'places',
    data: [
      {
        id: 'p1',
        name: 'Ba Na Hills',
        location: 'Da Nang, Vietnam',
        imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500',
        rating: 4.8,
        category: 'Attraction',
      },
      {
        id: 'p2',
        name: 'My Khe Beach',
        location: 'Da Nang, Vietnam',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500',
        rating: 4.7,
        category: 'Beach',
      },
    ],
  },
]

const ITINERARY_MESSAGES: ChatMessage[] = [
  { id: 'm9', sender: 'user', text: 'Can you create a 2-day itinerary for Paris?', type: 'text' },
  {
    id: 'm10',
    sender: 'ai',
    text: "Here's a suggested 2-day itinerary for your trip to Paris:",
    type: 'itinerary',
    data: [
      {
        id: 'day-1',
        day: 1,
        dateTitle: 'Arrival & Iconic Landmarks',
        activities: [
          {
            id: 'act-1',
            title: 'Visit Eiffel Tower & Champ de Mars',
            location: 'Champ de Mars, Paris',
            time: '09:00 AM',
          },
          {
            id: 'act-2',
            title: 'Explore Louvre Museum',
            location: 'Rue de Rivoli, Paris',
            time: '02:00 PM',
          },
          {
            id: 'act-3',
            title: 'Seine River Sunset Cruise',
            location: 'Port de la Bourdonnais',
            time: '06:30 PM',
          },
        ],
      },
      {
        id: 'day-2',
        day: 2,
        dateTitle: 'Art, Culture & Montmartre',
        activities: [
          {
            id: 'act-4',
            title: 'Walk around Montmartre & Sacré-Cœur',
            location: 'Montmartre, Paris',
            time: '10:00 AM',
          },
          {
            id: 'act-5',
            title: 'Lunch at Cafe de Flore',
            location: 'St Germain des Prés',
            time: '01:00 PM',
          },
        ],
      },
    ],
  },
]

// Stories
export const WithTyping: Story = {
  args: {
    messages: FLIGHT_MESSAGES,
    isTyping: true,
  },
}

export const FlightRecommendations: Story = {
  args: {
    messages: TEXT_MESSAGES,
    isTyping: false,
  },
}

export const HotelRecommendations: Story = {
  args: {
    messages: HOTEL_MESSAGES,
    isTyping: false,
  },
}

export const PlacesRecommendations: Story = {
  args: {
    messages: PLACES_MESSAGES,
    isTyping: false,
  },
}

export const ItineraryRecommendations: Story = {
  args: {
    messages: ITINERARY_MESSAGES,
    isTyping: false,
  },
}

export const Empty: Story = {
  args: {
    messages: [],
    isTyping: false,
  },
}
