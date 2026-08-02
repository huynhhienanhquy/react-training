import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecommendationWrapper } from './RecommendationWrapper'

const meta: Meta<typeof RecommendationWrapper> = {
  title: 'Components/Recommendations/RecommendationWrapper',
  component: RecommendationWrapper,
  tags: ['autodocs'],
  args: {
    onSeeAll: () => {},
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Top Recommendations',
    children: <div className="p-4 text-center text-slate-500">Recommendation Content Here</div>,
  },
}

export const WithSeeAll: Story = {
  args: {
    title: 'Popular Destinations',
    children: <div className="p-4 text-center text-slate-500">Destination Cards Here</div>,
    onSeeAll: () => {},
  },
}

export const CustomSeeAllText: Story = {
  args: {
    title: 'Nearby Hotels',
    children: <div className="p-4 text-center text-slate-500">Hotel Cards Here</div>,
    onSeeAll: () => {},
    seeAllText: 'View All Hotels',
  },
}

export const WithMultipleChildren: Story = {
  args: {
    title: 'Trending Flights',
    children: (
      <div className="flex flex-col gap-2">
        <div className="bg-slate-50 p-3 rounded-lg text-sm">Flight 1 - $200</div>
        <div className="bg-slate-50 p-3 rounded-lg text-sm">Flight 2 - $300</div>
        <div className="bg-slate-50 p-3 rounded-lg text-sm">Flight 3 - $400</div>
      </div>
    ),
    onSeeAll: () => {},
  },
}
