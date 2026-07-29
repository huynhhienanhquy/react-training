import type { Meta, StoryObj } from '@storybook/react-vite'
import { FavoriteButton } from './FavoriteButton'

const meta: Meta<typeof FavoriteButton> = {
  title: 'UI/FavoriteButton',
  component: FavoriteButton,
  argTypes: {
    isFavorite: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Inactive: Story = {
  args: { isFavorite: false, onToggle: () => {} },
}

export const Active: Story = {
  args: { isFavorite: true, onToggle: () => {} },
}

export const CustomClass: Story = {
  args: { isFavorite: false, onToggle: () => {}, className: 'shadow-md' },
}
