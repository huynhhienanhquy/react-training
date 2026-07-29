import type { Meta, StoryObj } from '@storybook/react-vite'
import { PriceDetailsSidebar } from './PriceDetailsSidebar'

const meta: Meta<typeof PriceDetailsSidebar> = {
  title: 'Fare/PriceDetailsSidebar',
  component: PriceDetailsSidebar,
  decorators: [
    (Story) => (
      <div className="p-6 bg-slate-50 max-w-sm mx-auto">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    pricePerTraveller: { control: { type: 'number', min: 0 } },
    flightDues: { control: { type: 'number', min: 0 } },
    taxesAndFees: { control: { type: 'number', min: 0 } },
    totalAmount: { control: { type: 'number', min: 0 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 1. Cho 1 hành khách (Đơn giản)
export const SingleTraveller: Story = {
  args: {
    pricePerTraveller: 320,
    flightDues: 45,
    taxesAndFees: 35,
    totalAmount: 400,
  },
}

// 2. Cho nhóm hành khách (Nhiều người / Giá tổng cao)
export const FamilyGroup: Story = {
  args: {
    pricePerTraveller: 1280, // Cho 4 người
    flightDues: 180,
    taxesAndFees: 140,
    totalAmount: 1600,
  },
}

// 3. Khuyến mãi / Miễn phí phụ phí
export const DiscountedFare: Story = {
  args: {
    pricePerTraveller: 199,
    flightDues: 0,
    taxesAndFees: 21,
    totalAmount: 220,
  },
}
