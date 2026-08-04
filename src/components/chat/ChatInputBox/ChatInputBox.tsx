import { type ChatInputBoxProps } from '@/types/chat'
import { useEnterToSend } from '@/hooks/useEnterToSend'
import { Button } from '@/components/Button/Button'
import AddIcon from '@/components/icons/AddIcon'
import MicrophoneIcon from '@/components/icons/MicrophoneIcon'
import SendIcon from '@/components/icons/SendIcon'

export const ChatInputBox = ({
  inputMessage,
  setInputMessage,
  onSend,
  isRecording,
  setIsRecording,
}: ChatInputBoxProps) => {
  const handleKeyDown = useEnterToSend(onSend)

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl p-20 md:p-10 shadow-xl shadow-slate-200/60 border border-slate-200/80 transition focus-within:border-blue-400">
      <textarea
        rows={2}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tell me where you are going to and how you prefer to get there"
        className="-translate-y-5 -translate-x-4 w-full resize-none text-slate-700 placeholder-slate-400 italic text-sm md:text-base focus:outline-none bg-transparent"
      />

      <div className="flex items-center justify-between pt-2 mt-2">
        {/* Attachment */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="-translate-x-7 translate-y-2 w-9 h-9 rounded-full p-2"
          aria-label="Add attachment"
          leftIcon={
            <AddIcon
              width={20}
              height={20}
              color="#6B6B6B"
              aria-hidden="true"
            />
          }
        />

        <div className="flex items-center gap-3">
          {/* Voice recording */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`w-10 h-10 md:w-9 md:h-9 rounded-full p-2 ${
              isRecording ? 'bg-red-50 animate-pulse' : 'hover:bg-slate-100'
            }`}
            onClick={() => setIsRecording((prev) => !prev)}
            aria-label={
              isRecording
                ? 'Voice input: stop recording'
                : 'Voice input: start recording'
            }
            aria-pressed={isRecording}
            leftIcon={
              <MicrophoneIcon
                width={20}
                height={20}
                color={isRecording ? '#EF4444' : '#6B6B6B'}
                aria-hidden="true"
              />
            }
          />

          {/* Send */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-11 h-11 md:w-14 md:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-2.5 shadow-md shadow-blue-500/30 shrink-0"
            onClick={onSend}
            aria-label="Send message"
            leftIcon={
              <SendIcon
                width={20}
                height={20}
                color="#FFFFFF"
                aria-hidden="true"
              />
            }
          />
        </div>
      </div>
    </div>
  )
}
