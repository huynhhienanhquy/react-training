
import { memo, type ChangeEvent } from 'react';
import AddIcon from '@/components/common/Icons/AddIcon';
import MicrophoneIcon from '@/components/common/Icons/MicrophoneIcon';
import SendIcon from '@/components/common/Icons/SendIcon';
import { type ChatInputBoxProps } from "@/types/chat";
import { useEnterToSend } from '@/hooks/useEnterToSend';
import { Button } from '@/components/common/Button';

export const ChatInputBox = memo(function ChatInputBox({
  inputMessage,
  onInputChange,
  onSend,
  isRecording,
  isThinking = false,
  onToggleRecording,
}: ChatInputBoxProps) {
  const handleKeyDown = useEnterToSend(onSend);
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(event.target.value);
  };

  return (
    /* Floating chat input container with focus state highlight */
    <div
      data-thinking={isThinking}
      className={`relative isolate box-border min-h-40 w-full shrink-0 overflow-hidden rounded-2xl shadow-xl sm:min-h-44 md:rounded-3xl lg:min-h-chat-input lg:rounded-card desktop:mt-auto desktop:h-chat-input desktop:w-chat-input ${        isThinking
          ? "bg-chat-thinking shadow-slate-300/60 before:absolute before:-inset-0.5 before:-z-10 before:rounded-inherit before:bg-inherit before:opacity-55 before:blur before:content-['']"
          : 'border border-slate-200/80 bg-white shadow-slate-200/60'
      }`}
    >
    <div className="relative z-10 box-border h-full w-full rounded-inherit bg-white p-3 sm:p-4 md:p-6 lg:px-8 lg:py-7 desktop:px-6 desktop:py-6">
      {/* Multiline Textarea for prompt input */}
      <textarea
        rows={2}
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Tell me where you are going to and how you prefer to get there"
        className="w-full resize-none bg-transparent px-1 text-sm italic text-slate-700 placeholder-slate-400 focus:outline-none md:text-base lg:min-h-28 lg:text-base desktop:min-h-20"
      />

      {/* Action Toolbar */}
      <div className="flex items-center justify-between pt-2 mt-2">
        {/* Attachment / Plus Action Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 gap-0 rounded-full !p-0"
          leftIcon={
            <AddIcon
              aria-label="Add attachment"
              color="currentColor"
              className="h-5 w-5 object-contain text-black transition-opacity hover:opacity-70 dark:text-white"
            />
          }
        />

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Voice Recording Toggle Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-10 w-10 gap-0 rounded-full !p-0 md:h-9 md:w-9 ${
              isRecording ? 'bg-red-50 animate-pulse' : 'hover:bg-slate-100'
            }`}
            onClick={onToggleRecording}
            leftIcon={
              <MicrophoneIcon
                aria-label="Voice input"
                className={`h-5 w-5 object-contain text-icon-strong transition ${
                  isRecording ? 'text-red-600' : 'opacity-40 hover:opacity-70'
                }`}
              />
            }
          />

          {/* Message Submit Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0 gap-0 rounded-xl bg-blue-600 !p-0 text-white shadow-md shadow-blue-500/30 hover:bg-blue-700 md:h-12 md:w-12 desktop:h-13 desktop:w-13"
            onClick={onSend}
            leftIcon={
              <SendIcon
                aria-label="Send message"
                className="h-5 w-5 object-contain text-white"
              />
            }
          />
        </div>
      </div>
      </div>
    </div>
  );
});
