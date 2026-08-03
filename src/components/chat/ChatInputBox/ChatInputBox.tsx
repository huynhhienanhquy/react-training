
import iconPlus from '@/assets/icons/add-dark.png';
import iconMic from '@/assets/icons/microphone-2.png';
import iconSend from '@/assets/icons/send-2.png';
import { useEnterToSend } from '@/hooks/useEnterToSend';
import { Button } from '@/components/Button/Button';

// Props definition for managing chat input, recording, and submission
export interface ChatInputBoxProps {
  inputMessage: string;
  setInputMessage: (val: string) => void;
  onSend: () => void;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatInputBox = ({
  inputMessage,
  setInputMessage,
  onSend,
  isRecording,
  setIsRecording,
}: ChatInputBoxProps) => {
  const handleKeyDown = useEnterToSend(onSend);

  return (
    /* Floating chat input container with focus state highlight */
    <div className="w-full max-w-4xl bg-white rounded-3xl p-20 md:p-10   shadow-xl shadow-slate-200/60 border border-slate-200/80 transition focus-within:border-blue-400">

      {/* Multiline Textarea for prompt input */}
      <textarea
        rows={2}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tell me where you are going to and how you prefer to get there"
        className=" -translate-y-5 -translate-x-4 w-full resize-none text-slate-700 placeholder-slate-400 italic text-sm md:text-base focus:outline-none bg-transparent"
      />

      {/* Action Toolbar */}
      <div className="flex items-center justify-between pt-2 mt-2">
        {/* Attachment / Plus Action Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="-translate-x-7 translate-y-2 w-9 h-9 rounded-full p-2"
          leftIcon={
            <img
              src={iconPlus}
              alt="Add attachment"
              className="w-5 h-5 object-contain opacity-40 hover:opacity-70"
            />
          }
        />

        <div className="flex items-center gap-3">
          {/* Voice Recording Toggle Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`w-10 h-10 md:w-9 md:h-9 rounded-full p-2 ${
              isRecording ? 'bg-red-50 animate-pulse' : 'hover:bg-slate-100'
            }`}
            onClick={() => setIsRecording((prev) => !prev)}
            leftIcon={
              <img
                src={iconMic}
                alt="Voice input"
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
            className="w-11 h-11 md:w-14 md:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-2.5 shadow-md shadow-blue-500/30 shrink-0"
            onClick={onSend}
            leftIcon={
              <img
                src={iconSend}
                alt="Send message"
                className="w-5 h-5 object-contain filter brightness-0 invert"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
