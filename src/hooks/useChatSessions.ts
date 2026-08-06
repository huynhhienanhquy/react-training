import { useEffect, useRef, useState } from 'react';
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

  return {
    text: DEFAULT_AI_TEXT,
    type: 'text',
  };
};

export const useChatSessions = (): UseChatSessionsResult => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [isTyping, setIsTyping] = useState(false);

  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(
    new Set(),
  );

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });

      timeoutRefs.current.clear();
    };
  }, []);

  const currentMessages = activeSessionId
    ? sessionMessages[activeSessionId] || []
    : [];

  const sendMessage = (text: string): boolean => {
    const trimmed = text.trim();

    if (!trimmed) return false;

    let targetSessionId = activeSessionId;

    if (!targetSessionId) {
      targetSessionId = crypto.randomUUID();

      const newSession: ChatSession = {
        id: targetSessionId,
        title:
          trimmed.length > 28
            ? `${trimmed.substring(0, 28)}...`
            : trimmed,
        group: 'TODAY',
      };

      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(targetSessionId);
    }

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: trimmed,
    };

    setSessionMessages((prev) => ({
      ...prev,
      [targetSessionId!]: [
        ...(prev[targetSessionId!] || []),
        userMsg,
      ],
    }));

    setIsTyping(true);

    const timeoutId = setTimeout(() => {
      const { text: aiText, type: messageType } =
        detectMessageType(trimmed.toLowerCase());

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
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
      timeoutRefs.current.delete(timeoutId);
    }, 1200);

    timeoutRefs.current.add(timeoutId);

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
