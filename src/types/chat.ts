
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'flight' | 'hotel' | 'places' | 'itinerary';
  data?: unknown;
}

export interface ChatSession {
  id: string;
  title: string;
  group?: string;
}










