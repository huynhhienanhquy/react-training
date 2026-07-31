import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatInputBox } from './ChatInputBox'
import { useState } from 'react'

const meta: Meta<typeof ChatInputBox> = {
  title: 'Chat/ChatInputBox',
  component: ChatInputBox,
}

export default meta
type Story = StoryObj<typeof meta>

const ChatInputBoxWithState = (args: { isRecording?: boolean }) => {
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(args.isRecording || false)

  return (
    <ChatInputBox
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      onSend={() => alert('Send: ' + inputMessage)}
      isRecording={isRecording}
      setIsRecording={setIsRecording}
    />
  )
}

export const Default: Story = {
  render: () => <ChatInputBoxWithState />,
}

export const Recording: Story = {
  render: () => <ChatInputBoxWithState isRecording />,
}

export const WithText: Story = {
  render: () => {
    const [inputMessage, setInputMessage] = useState('Find flights to Lagos')
    const [isRecording, setIsRecording] = useState(false)

    return (
      <ChatInputBox
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSend={() => {}}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
      />
    )
  },
}
