import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FareCards, type FareOption } from './FareCards'

const MOCK_FLIGHT_LOGO =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232563EB"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>'

const MOCK_FARE_OPTIONS: FareOption[] = [
  {
    id: 'economy',
    name: 'Economy Standard',
    airline: 'Emirates',
    price: 450,
    features: [
      '1x Carry-on bag (7kg)',
      '1x Checked bag (23kg)',
      'Standard seat selection',
      'Flight change with fee',
    ],
  },
  {
    id: 'business',
    name: 'Business Class',
    airline: 'Emirates',
    price: 1250,
    features: [
      '2x Carry-on bags (10kg each)',
      '2x Checked bags (32kg each)',
      'Priority check-in & Boarding',
      'Lounge access included',
      'Lie-flat seats & Premium dining',
      'Free flight changes & refund',
    ],
  },
]

const meta: Meta<typeof FareCards> = {
  title: 'Fare/FareCards',
  component: FareCards,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-slate-50 max-w-3xl mx-auto">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    selectedFareId: {
      control: { type: 'radio' },
      options: ['economy', 'business'],
    },
    onSelectFare: { action: 'fareSelected' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultEconomySelected: Story = {
  args: {
    fareOptions: MOCK_FARE_OPTIONS,
    selectedFareId: 'economy',
    defaultFlightLogo: MOCK_FLIGHT_LOGO,
  },
}

export const BusinessSelected: Story = {
  args: {
    fareOptions: MOCK_FARE_OPTIONS,
    selectedFareId: 'business',
    defaultFlightLogo: MOCK_FLIGHT_LOGO,
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState<'economy' | 'business'>('economy')

    return (
      <FareCards
        {...args}
        selectedFareId={selectedId}
        onSelectFare={(id) => {
          setSelectedId(id)
          args.onSelectFare?.(id)
        }}
      />
    )
  },
  args: {
    fareOptions: MOCK_FARE_OPTIONS,
    defaultFlightLogo: MOCK_FLIGHT_LOGO,
  },
}
