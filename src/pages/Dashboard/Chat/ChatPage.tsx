import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarNav } from '@/components/chat/SidebarNav/index';
import { ChatHistorySidebar } from '@/components/chat/ChatHistorySidebar/index';
import { Topbar } from '@/components/chat/Topbar/index';
import { WelcomeState } from '@/components/chat/WelcomeState/index';
import { ChatMessageList } from '@/components/chat/ChatMessageList/index';
import { ChatInputBox } from '@/components/chat/ChatInputBox/ChatInputBox';
import { useChatSessions } from '@/hooks/useChatSessions';
import { useSidebarNav } from '@/hooks/useSidebarNav';

export const ChatPage = () => {
  const navigate = useNavigate();
  const { activeNav, setActiveNav, isMobileOpen, onMobileToggle } =
    useSidebarNav();
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);


  const {
    sessions,
    activeSessionId,
    currentMessages,
    isTyping,
    sendMessage,
    startNewChat,
    selectSession,
  } = useChatSessions();

  const suggestionPrompts = [
    'Cheap flights from my location to Lagos',
    'Trending places to visit in Akwa-Ibom',
    'Plan a trip for the Calabar carnival',
    'How much will it cost to travel the Bahamas from Mali?',
    'Find Business Class flight from Owerri to Delta',
    'Routes from Miami to Long Island Beach',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (sendMessage(text)) {
      setInputMessage('');
    }
  };

  // New chat button
  const handleStartNewChat = () => {
    setInputMessage('');
    startNewChat();
  };

  // Select a chat from the Sidebar
  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId);
  }

  return (
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      <SidebarNav activeNav={activeNav} onNavChange={setActiveNav} isMobileOpen={isMobileOpen} onMobileToggle={onMobileToggle} />

      <div className="ml-1.5">
        <ChatHistorySidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
        />
      </div>

      <main className="flex-1 bg-surface-section flex flex-col h-full relative overflow-hidden">
        <Topbar
          onNewChat={handleStartNewChat}
        />

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-6 pt-2 flex flex-col justify-between items-center max-w-5xl mx-auto w-full">
          {currentMessages.length === 0 ? (
            <WelcomeState
              prompts={suggestionPrompts}
              onSelectPrompt={(p) => handleSendMessage(p)}
            />
          ) : (
            <ChatMessageList
              messages={currentMessages}
              isTyping={isTyping}
              onBookFlight={() => navigate('/chats/fares')}
              onBookHotel={() => navigate('/chats/hotels')}
            />
          )}

          <ChatInputBox
            inputMessage={inputMessage}
            onInputChange={setInputMessage}
            onSend={() => handleSendMessage()}
            isRecording={isRecording}
            onToggleRecording={() => setIsRecording((prev) => !prev)}
          />
        </div>
      </main>
    </div>
  );
};
