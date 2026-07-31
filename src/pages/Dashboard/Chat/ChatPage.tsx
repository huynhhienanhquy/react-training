import React, { useState } from 'react';
import { SidebarNav } from '@/components/chat/SidebarNav/SidebarNav';
import { ChatHistorySidebar, type ChatSession } from '../../../components/chat/ChatHistorySidebar/ChatHistorySidebar';
import { Topbar } from '@/components/chat/Topbar/Topbar';
import { WelcomeState } from '@/components/chat/WelcomeState/WelcomeState';
import { ChatMessageList, type ChatMessage } from '@/components/chat/ChatMessageList/ChatMessageList';
import { ChatInputBox } from '@/components/chat/ChatInputBox/ChatInputBox';
import { SelectFarePage } from '@/pages/Dashboard/Flight/SelectFarePage';
import { SelectHotelPage } from '@/pages/Dashboard/Hotel/SelectHotelPage';

export const ChatPage = () => {
  const [activeNav, setActiveNav] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isViewingFare, setIsViewingFare] = useState(false);
  const [isViewingHotel, setIsViewingHotel] = useState(false);

  // Manage chat and messaging sessions by session ID.
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<Record<string, ChatMessage[]>>({});

  // Get the current message list based on activeSessionId
  const currentMessages = activeSessionId ? sessionMessages[activeSessionId] || [] : [];

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
    if (!text.trim()) return;

    let targetSessionId = activeSessionId;

    // If you haven't selected a chat session yet -> Create a new chat session
    if (!targetSessionId) {
      targetSessionId = Date.now().toString();
      const newSession: ChatSession = {
        id: targetSessionId,
        title: text.length > 28 ? text.substring(0, 28) + '...' : text,
        group: 'TODAY',
      };

      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(targetSessionId);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    // Save the user's message to the corresponding session.
    setSessionMessages((prev) => ({
      ...prev,
      [targetSessionId!]: [...(prev[targetSessionId!] || []), userMsg],
    }));

    setInputMessage('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const userQuery = text.toLowerCase();

      let aiText = "I'd be happy to help you plan that! Here are the best deals and travel packages.";
      let messageType: 'text' | 'flight' | 'hotel' = 'text';

      if (userQuery.includes('hotel') || userQuery.includes('hotels') || userQuery.includes('bahamas') || userQuery.includes('staycation')) {
        aiText = "Sure! I have some excellent recommendation for your trip to Bahamas. My recommendations are tailored for a round trip";
        messageType = 'hotel';
      } else if (userQuery.includes('flight') || userQuery.includes('flights') || userQuery.includes('lagos') || userQuery.includes('bay')) {
        aiText = "Sure! I have some excellent recommendation for flights from your location to Lagos. My recommendations are tailored for a round trip.";
        messageType = 'flight';
      }

      //Initialize AI message object
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        type: messageType,
      };

      // Update message state
      setSessionMessages((prev) => ({
        ...prev,
        [targetSessionId!]: [...(prev[targetSessionId!] || []), aiMsg],
      }));

      setIsTyping(false);
    }, 1200);
  };

  // New chat button
  const handleStartNewChat = () => {
    setInputMessage('');
    setActiveSessionId(null);
    setIsViewingFare(false);
    setIsViewingHotel(false);
  };

  // Select a chat from the Sidebar
  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
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
        onBackToChat={() => setIsViewingHotel(false)}
        onStartNewChat={handleStartNewChat}
      />
    );
  }

  return (
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} isMobileOpen={isMobileMenuOpen} onMobileToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <ChatHistorySidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
      />

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
              onBookHotel={() => setIsViewingHotel(true)}
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
