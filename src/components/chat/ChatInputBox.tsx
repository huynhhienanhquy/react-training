// src/components/chat/ChatInputBox.tsx
import React from 'react';

// 💡 Import các file Icon local từ thư mục assets của bạn
import iconPlus from '../../assets/icons/add-dark.png';
import iconMic from '../../assets/icons/microphone-2.png';
import iconSend from '../../assets/icons/send-2.png';

interface ChatInputBoxProps {
  inputMessage: string;
  setInputMessage: (val: string) => void;
  onSend: () => void;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  inputMessage,
  setInputMessage,
  onSend,
  isRecording,
  setIsRecording,
}) => {
  return (
    <div className="w-full max-w-3xl bg-white rounded-3xl p-4 md:p-5 shadow-xl shadow-slate-200/60 border border-slate-200/80 transition focus-within:border-blue-400">
      <textarea
        rows={2}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder="Tell me where you are going to and how you prefer to get there"
        className="w-full resize-none text-slate-700 placeholder-slate-400 italic text-sm md:text-base focus:outline-none bg-transparent"
      />

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
        {/* Nút Plus / Add attachment */}
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 transition p-2">
          <img
            src={iconPlus}
            alt="Add attachment"
            className="w-5 h-5 object-contain opacity-40 hover:opacity-70"
          />
        </button>

        <div className="flex items-center gap-3">
          {/* Nút Voice / Microphone */}
          <button
            onClick={() => setIsRecording((prev) => !prev)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition p-2 ${
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

          {/* Nút Send */}
          <button
            onClick={onSend}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center p-2.5 shadow-md shadow-blue-500/30 transition transform active:scale-95 shrink-0"
          >
            <img
              src={iconSend}
              alt="Send message"
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
