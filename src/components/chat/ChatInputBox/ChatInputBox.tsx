import React from 'react';

import iconPlus from '@/assets/icons/add-dark.png';
import iconMic from '@/assets/icons/microphone-2.png';
import iconSend from '@/assets/icons/send-2.png';
import { type ChatInputBoxProps } from "@/types/chat";
import { useEnterToSend } from '@/hooks/useEnterToSend';

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
        <button className="-translate-x-7 translate-y-2  w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition p-2 cursor-pointer">
          <img
            src={iconPlus}
            alt="Add attachment"
            className="w-5 h-5 object-contain opacity-40 hover:opacity-70"
          />
        </button>

        <div className="flex items-center gap-3">
          {/* Voice Recording Toggle Button */}
          <button
            onClick={() => setIsRecording((prev) => !prev)}
            className={`w-10 h-10 md:w-9 md:h-9 rounded-full flex items-center justify-center transition p-2 ${
              isRecording ? 'bg-red-50 animate-pulse' : 'hover:bg-slate-100'
            }`}
          >
            <img
              src={iconMic}
              alt="Voice input"
              className={`w-5 h-5 object-contain transition ${
                isRecording ? 'filter-red' : 'opacity-40 hover:opacity-70'
              }`}
            />
          </button>

          {/* Message Submit Button */}
          <button
            onClick={onSend}
            className="w-11 h-11 md:w-14 md:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center p-2.5 shadow-md shadow-blue-500/30 transition transform active:scale-95 shrink-0"
          >
            <img
              src={iconSend}
              alt="Send message"
              className="w-5 h-5 object-contain filter brightness-0 invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
