import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ChatInputBox } from './ChatInputBox'

const meta: Meta<typeof ChatInputBox> = {
  title: 'Chat/ChatInputBox',
  component: ChatInputBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    inputMessage: { control: 'text' },
    isRecording: { control: 'boolean' },
    onSend: { action: 'sent' },
    setInputMessage: { action: 'inputChanged' },
    setIsRecording: { action: 'recordingToggled' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const ChatInputBoxWithState = (args: Story['args'] = {}) => {
  const [inputMessage, setInputMessage] = useState(args.inputMessage || '')
  const [isRecording, setIsRecording] = useState(args.isRecording || false)

  return (
    <ChatInputBox
      inputMessage={inputMessage}
      setInputMessage={(value) => {
        setInputMessage(value)
        args.setInputMessage?.(value)
      }}
      onSend={() => {
        args.onSend?.()
        setInputMessage('')
      }}
      isRecording={isRecording}
      setIsRecording={(value) => {
        setIsRecording(value)
        args.setIsRecording?.(value)
      }}
    />
  )
}

export const Default: Story = {
  render: (args) => <ChatInputBoxWithState {...args} />,
}

export const Recording: Story = {
  render: (args) => <ChatInputBoxWithState {...args} />,
  args: { isRecording: true },
}

export const WithText: Story = {
  render: (args) => <ChatInputBoxWithState {...args} />,
  args: { inputMessage: 'Find flights to Lagos' },
}
