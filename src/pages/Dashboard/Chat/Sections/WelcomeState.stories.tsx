import type { Meta, StoryObj } from '@storybook/react-vite'
import { WelcomeState } from './WelcomeState'

const meta: Meta<typeof WelcomeState> = {
  title: 'Chat/WelcomeState',
  component: WelcomeState,
  argTypes: {
    prompts: { control: 'object' },
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
    onSelectPrompt: (prompt) => alert('Selected: ' + prompt),
  },
}

export const ManyPrompts: Story = {
  args: {
    prompts: [
      'Find cheap flights to Lagos',
      'Hotels with pool in Dubai',
      'Best restaurants in Paris',
      'Flights from New York to London',
      'All-inclusive resorts in Maldives',
      'Weekend getaway to Bali',
    ],
    onSelectPrompt: (prompt) => console.log(prompt),
  },
}
