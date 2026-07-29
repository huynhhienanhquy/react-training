import type { Meta, StoryObj } from '@storybook/react-vite'
import { FareHeader } from './FareHeader'

const meta: Meta<typeof FareHeader> = {
  title: 'Fare/FareHeader',
  component: FareHeader,
  decorators: [
    (Story) => (
      <div className="p-6 bg-slate-50 max-w-2xl mx-auto">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    destination: { control: 'text' },
    tripType: { control: 'text' },
    cabinClass: { control: 'text' },
    price: { control: { type: 'number', min: 0 } },
    priceUnit: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 1. Chuyến bay khứ hồi (Mặc định)
export const RoundTrip: Story = {
  args: {
    destination: 'Lagos to Owerri',
    tripType: 'Round trip',
    cabinClass: 'Economy Class',
    price: 320,
    priceUnit: 'per passenger',
  },
}

// 2. Chuyến bay Hạng Thương gia (Business Class)
export const BusinessClass: Story = {
  args: {
    destination: 'Tokyo to Paris',
    tripType: 'Round trip',
    cabinClass: 'Business Class',
    price: 2450,
    priceUnit: 'total base fare',
  },
}

// 3. Chuyến bay Một chiều (One way)
export const OneWay: Story = {
  args: {
    destination: 'Da Nang to Hanoi',
    tripType: 'One way',
    cabinClass: 'Economy Class',
    price: 85,
    priceUnit: 'incl. taxes & fees',
  },
}
