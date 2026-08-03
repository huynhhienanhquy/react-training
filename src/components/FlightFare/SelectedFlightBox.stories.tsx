import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectedFlightBox } from './SelectedFlightBox'
import HeartIcon from '@/assets/icons/heart'

const MOCK_AIRLINE_LOGO =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232563EB"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>'

const meta: Meta<typeof SelectedFlightBox> = {
  title: 'Fare/SelectedFlightBox',
  component: SelectedFlightBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-slate-50 max-w-xl mx-auto">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    airlineName: { control: 'text' },
    cancellationPolicy: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const RoundTrip: Story = {
  args: {
    airlineName: 'Qatar Airways',
    defaultFlightLogo: MOCK_AIRLINE_LOGO,
    iconHeart: HeartIcon,
    cancellationPolicy:
      'Refundable up to 24 hours before departure (fee may apply).',
    legs: [
      {
        id: 'leg-1',
        times: '08:30 - 14:15',
        route: 'SGN - DOH',
        duration: '7h 45m',
        stops: 'Non-stop',
      },
      {
        id: 'leg-2',
        times: '18:00 - 06:20 (+1)',
        route: 'DOH - SGN',
        duration: '8h 20m',
        stops: 'Non-stop',
      },
    ],
  },
}

export const OneWay: Story = {
  args: {
    airlineName: 'Vietnam Airlines',
    defaultFlightLogo: MOCK_AIRLINE_LOGO,
    iconHeart: HeartIcon,
    cancellationPolicy:
      'Non-refundable. Ticket change allowed with a fee.',
    legs: [
      {
        id: 'leg-1',
        times: '10:00 - 12:15',
        route: 'HAN - DAD',
        duration: '2h 15m',
        stops: 'Direct',
      },
    ],
  },
}

export const MultiStop: Story = {
  args: {
    airlineName: 'Emirates',
    defaultFlightLogo: MOCK_AIRLINE_LOGO,
    iconHeart: HeartIcon,
    cancellationPolicy:
      'Free cancellation within 24 hours of booking.',
    legs: [
      {
        id: 'leg-1',
        times: '23:55 - 11:30 (+1)',
        route: 'SGN - DXB - LHR',
        duration: '15h 35m',
        stops: '1 Stop (DXB)',
      },
    ],
  },
}
