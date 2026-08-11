import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatHistorySidebar } from '@/components/common/Chat/ChatHistorySidebar/index';
import { WelcomeState } from '@/components/common/Chat/WelcomeState/index';
import { ChatMessageList } from '@/components/common/Chat/ChatMessageList/index';
import { ChatInputBox } from '@/components/common/Chat/ChatInputBox/ChatInputBox';
import { useChatSessions } from '@/hooks/useChatSessions';
import { DashboardPageLayout } from '@/components/layouts/DashboardLayout';

const SUGGESTION_PROMPTS = [
  'Cheap flights from my location to Lagos',
  'Trending places to visit in Akwa-Ibom',
  'Plan a trip for the Calabar carnival',
  'How much will it cost to travel the Bahamas from Mali?',
  'Find Business Class flight from Owerri to Delta',
  'Routes from Miami to Long Island Beach',
];

export const ChatPage = () => {
  const navigate = useNavigate();
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

  const handleSendMessage = useCallback((textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (sendMessage(text)) {
      setInputMessage('');
    }
  }, [inputMessage, sendMessage]);
  const handleSelectPrompt = useCallback((prompt: string) => {
    if (sendMessage(prompt)) setInputMessage('');
  }, [sendMessage]);

  // New chat button
  const handleStartNewChat = useCallback(() => {
    setInputMessage('');
    startNewChat();
  }, [startNewChat]);

  // Select a chat from the Sidebar
  const handleSelectSession = useCallback((sessionId: string) => {
    selectSession(sessionId);
  }, [selectSession]);

  const handleBookFlight = useCallback(() => navigate('/chats/fares'), [navigate]);
  const handleBookHotel = useCallback(() => navigate('/chats/hotels'), [navigate]);
  const handleSendCurrentMessage = useCallback(() => handleSendMessage(), [handleSendMessage]);
  const handleToggleRecording = useCallback(() => setIsRecording((prev) => !prev), []);

  return (
    <>
      <div className="hidden lg:block lg:mr-1.5">
        <ChatHistorySidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={handleSelectSession}
        />
      </div>

      <DashboardPageLayout
        messages={currentMessages}
        onNewChat={handleStartNewChat}
      >
        <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-between overflow-y-auto px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-4 md:px-8 md:pb-6 lg:max-w-none lg:px-[52px] lg:pb-14 lg:pt-8 min-[1440px]:relative min-[1440px]:pb-10">
          {currentMessages.length === 0 ? (
            <WelcomeState
              prompts={SUGGESTION_PROMPTS}
              onSelectPrompt={handleSelectPrompt}
            />
          ) : (
            <ChatMessageList
              messages={currentMessages}
              isTyping={isTyping}
              onBookFlight={handleBookFlight}
              onBookHotel={handleBookHotel}
            />
          )}

          <ChatInputBox
            inputMessage={inputMessage}
            onInputChange={setInputMessage}
            onSend={handleSendCurrentMessage}
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
          />
        </div>
      </DashboardPageLayout>
    </>
  );
};
