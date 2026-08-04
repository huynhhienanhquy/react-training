import  { useState } from 'react';
import { SidebarNav } from '@/components/chat/SidebarNav/SidebarNav';
import { ChatHistorySidebar } from '@/components/chat/ChatHistorySidebar/ChatHistorySidebar';
import { Topbar } from '@/components/chat/Topbar/Topbar';
import { WelcomeState } from '@/components/chat/WelcomeState/WelcomeState';
import { ChatMessageList } from '@/components/chat/ChatMessageList/ChatMessageList';
import { ChatInputBox } from '@/components/chat/ChatInputBox/ChatInputBox';
import { SelectFarePage } from '@/pages/Dashboard/Flight/SelectFarePage';
import { SelectHotelPage } from '@/pages/Dashboard/Hotel/SelectHotelPage';
import { useChatSessions } from '@/hooks/useChatSessions';
import { useSidebarNav } from '@/hooks/useSidebarNav';
import type { HotelData } from '@/types/hotel';

export const ChatPage = () => {
  const { activeNav, setActiveNav, isMobileOpen, onMobileToggle } =
    useSidebarNav();
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const [isViewingFare, setIsViewingFare] = useState(false);
  const [isViewingHotel, setIsViewingHotel] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelData | null>(null);

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
    setIsViewingFare(false);
    setIsViewingHotel(false);
    setSelectedHotel(null);
  };

  // Select a chat from the Sidebar
  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId);
    setIsViewingFare(false);
    setIsViewingHotel(false);
  };

  // If you are viewing ticket details (Select Fare)
  if (isViewingFare) {
    return (
      <SelectFarePage
        onBackToChat={() => setIsViewingFare(false)}
        onStartNewChat={handleStartNewChat}
      />
    );
  }

  // If you are viewing hotel details
  if (isViewingHotel) {
    return (
      <SelectHotelPage
        selectedHotel={selectedHotel}
        onBackToChat={() => setIsViewingHotel(false)}
        onStartNewChat={handleStartNewChat}
        onSelectHotel={setSelectedHotel}
      />
    );
  }

  return (
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} isMobileOpen={isMobileOpen} onMobileToggle={onMobileToggle} />

      <div className="ml-1.5">
        <ChatHistorySidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
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
              onBookFlight={() => setIsViewingFare(true)}
              onBookHotel={(hotel) => {
                setSelectedHotel(hotel);
                setIsViewingHotel(true);
              }}
            />
          )}

          <ChatInputBox
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSend={() => handleSendMessage()}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        </div>
      </main>
    </div>
  );
};
