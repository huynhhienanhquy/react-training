import type { Meta, StoryObj } from '@storybook/react-vite'
import { WelcomeState } from '.'

const meta: Meta<typeof WelcomeState> = {
  title: 'Chat/WelcomeState',
  component: WelcomeState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    prompts: { control: 'object' },
    onSelectPrompt: { action: 'promptSelected' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const DEFAULT_PROMPTS = [
  'I want to find cheap flights to Lagos',
  'Looking for a 5-star hotel in Lagos with beach views',
  'Find me the best restaurants in Victoria Island',
]

export const Default: Story = {
  args: {
    prompts: DEFAULT_PROMPTS,
  },
}
