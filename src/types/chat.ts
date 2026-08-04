import type { HotelData } from './hotel';
import type { PlaceData, DayItinerary } from './travel';

export type MessageData = PlaceData[] | DayItinerary[];

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'flight' | 'hotel' | 'places' | 'itinerary';
  data?: MessageData;
}

export interface ChatSession {
  id: string;
  title: string;
  group?: string;
}

// Props definition for managing chat input, recording, and submission
export interface ChatInputBoxProps {
  inputMessage: string;
  setInputMessage: (val: string) => void;
  onSend: () => void;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChatHistorySidebarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
}

export interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onBookFlight?: (flightId?: string) => void;
  onBookHotel?: (hotel: HotelData) => void;
  onViewAllPlaces?: (places?: PlaceData[]) => void;
  onViewAllItinerary?: (itinerary?: DayItinerary[]) => void;
}


export interface SidebarNavProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

export interface TopbarProps {
  isBreadcrumbMode?: boolean;
  breadcrumbLabel?: string;
  chatTitle?: string;
  messages?: ChatMessage[];
  onBackToChat?: () => void;
  onNewChat?: () => void;
}

export interface WelcomeStateProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
}
