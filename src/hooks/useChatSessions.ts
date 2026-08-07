import { useEffect, useRef, useState } from 'react';
import type { ChatMessage, ChatSession } from '@/types/chat';

const CHAT_SESSIONS_STORAGE_KEY = 'travel-chat-sessions';

interface StoredChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  sessionMessages: Record<string, ChatMessage[]>;
}

const EMPTY_CHAT_STATE: StoredChatState = {
  sessions: [],
  activeSessionId: null,
  sessionMessages: {},
};

const loadStoredChatState = (): StoredChatState => {
  try {
    const storedState = localStorage.getItem(CHAT_SESSIONS_STORAGE_KEY);

    if (!storedState) return EMPTY_CHAT_STATE;

    const parsedState = JSON.parse(storedState) as Partial<StoredChatState>;

    return {
      sessions: Array.isArray(parsedState.sessions) ? parsedState.sessions : [],
      activeSessionId:
        typeof parsedState.activeSessionId === 'string'
          ? parsedState.activeSessionId
          : null,
      sessionMessages:
        parsedState.sessionMessages &&
        typeof parsedState.sessionMessages === 'object' &&
        !Array.isArray(parsedState.sessionMessages)
          ? parsedState.sessionMessages
          : {},
    };
  } catch {
    return EMPTY_CHAT_STATE;
  }
};

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
  const [storedState] = useState(loadStoredChatState);
  const [sessions, setSessions] = useState<ChatSession[]>(storedState.sessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    storedState.activeSessionId,
  );
  const [sessionMessages, setSessionMessages] = useState<
    Record<string, ChatMessage[]>
  >(storedState.sessionMessages);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(
    new Set(),
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        CHAT_SESSIONS_STORAGE_KEY,
        JSON.stringify({ sessions, activeSessionId, sessionMessages }),
      );
    } catch {
      // Keep chat usable when browser storage is unavailable.
    }
  }, [sessions, activeSessionId, sessionMessages]);

  useEffect(() => {
    const timeoutIds = timeoutRefs.current;

    return () => {
      timeoutIds.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });

      timeoutIds.clear();
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
