
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
  onToggleRecording,
}: ChatInputBoxProps) {
  const handleKeyDown = useEnterToSend(onSend);
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(event.target.value);
  };

  return (
    /* Floating chat input container with focus state highlight */
    <div className="w-full max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xl shadow-slate-200/60 transition focus-within:border-blue-400 sm:p-4 md:rounded-3xl md:p-6">

      {/* Multiline Textarea for prompt input */}
      <textarea
        rows={2}
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Tell me where you are going to and how you prefer to get there"
        className="w-full resize-none bg-transparent px-1 text-sm italic text-slate-700 placeholder-slate-400 focus:outline-none md:text-base"
      />

      {/* Action Toolbar */}
      <div className="flex items-center justify-between pt-2 mt-2">
        {/* Attachment / Plus Action Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full p-2"
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
            className={`w-10 h-10 md:w-9 md:h-9 rounded-full p-2 ${
              isRecording ? 'bg-red-50 animate-pulse' : 'hover:bg-slate-100'
            }`}
            onClick={onToggleRecording}
            leftIcon={
              <MicrophoneIcon
                aria-label="Voice input"
                className={`w-5 h-5 object-contain transition ${
                  isRecording ? 'filter-red' : 'opacity-40 hover:opacity-70'
                }`}
              />
            }
          />

          {/* Message Submit Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-2xl bg-blue-600 p-2.5 text-white shadow-md shadow-blue-500/30 hover:bg-blue-700 md:h-12 md:w-12"
            onClick={onSend}
            leftIcon={
              <SendIcon
                aria-label="Send message"
                className="w-5 h-5 object-contain filter brightness-0 invert"
              />
            }
          />
        </div>
      </div>
    </div>
  );
});
