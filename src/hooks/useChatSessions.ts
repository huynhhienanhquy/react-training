import { useState } from 'react';
import type { ChatMessage, ChatSession } from '@/types/chat';

export interface UseChatSessionsResult {
  sessions: ChatSession[];
  activeSessionId: string | null;
  sessionMessages: Record<string, ChatMessage[]>;
  currentMessages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (text: string) => boolean;
  startNewChat: () => void;
  selectSession: (sessionId: string) => void;
}

const DEFAULT_AI_TEXT =
  "I'd be happy to help you plan that! Here are the best deals and travel packages.";

const detectMessageType = (
  query: string,
): { text: string; type: 'text' | 'flight' | 'hotel' } => {
  if (
    query.includes('hotel') ||
    query.includes('hotels') ||
    query.includes('bahamas') ||
    query.includes('staycation')
  ) {
    return {
      text: 'Sure! I have some excellent recommendation for your trip to Bahamas. My recommendations are tailored for a round trip',
      type: 'hotel',
    };
  }

  if (
    query.includes('flight') ||
    query.includes('flights') ||
    query.includes('lagos') ||
    query.includes('bay')
  ) {
    return {
      text: 'Sure! I have some excellent recommendation for flights from your location to Lagos. My recommendations are tailored for a round trip.',
      type: 'flight',
    };
  }

  return { text: DEFAULT_AI_TEXT, type: 'text' };
};

export const useChatSessions = (): UseChatSessionsResult => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [isTyping, setIsTyping] = useState(false);

  const currentMessages = activeSessionId
    ? sessionMessages[activeSessionId] || []
    : [];

  const sendMessage = (text: string): boolean => {
    const trimmed = text.trim();
    if (!trimmed) return false;

    let targetSessionId = activeSessionId;

    // If no chat session is selected yet -> create a new one
    if (!targetSessionId) {
      targetSessionId = Date.now().toString();
      const newSession: ChatSession = {
        id: targetSessionId,
        title:
          trimmed.length > 28
            ? trimmed.substring(0, 28) + '...'
            : trimmed,
        group: 'TODAY',
      };

      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(targetSessionId);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
    };

    // Save the user's message to the corresponding session.
    setSessionMessages((prev) => ({
      ...prev,
      [targetSessionId!]: [
        ...(prev[targetSessionId!] || []),
        userMsg,
      ],
    }));

    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const { text: aiText, type: messageType } =
        detectMessageType(trimmed.toLowerCase());

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        type: messageType,
      };

      setSessionMessages((prev) => ({
        ...prev,
        [targetSessionId!]: [
          ...(prev[targetSessionId!] || []),
          aiMsg,
        ],
      }));

      setIsTyping(false);
    }, 1200);

    return true;
  };

  const startNewChat = () => {
    setActiveSessionId(null);
  };

  const selectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };

  return {
    sessions,
    activeSessionId,
    sessionMessages,
    currentMessages,
    isTyping,
    sendMessage,
    startNewChat,
    selectSession,
  };
};
