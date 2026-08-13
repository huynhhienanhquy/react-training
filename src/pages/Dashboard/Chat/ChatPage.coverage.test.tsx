import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatPage } from './ChatPage';

const navigate = vi.fn();
const sendMessage = vi.fn();
const startNewChat = vi.fn();
const selectSession = vi.fn();

let messages: Array<{ id: string; text: string }> = [];

vi.mock('react-router-dom', () => ({ useNavigate: () => navigate }));

vi.mock('@/hooks/useChatSessions', () => ({
  useChatSessions: () => ({
    sessions: [{ id: 'session-1', title: 'Trip' }],
    activeSessionId: 'session-1',
    currentMessages: messages,
    isTyping: false,
    sendMessage,
    startNewChat,
    selectSession,
  }),
}));

vi.mock('@/components/layouts/DashboardLayout', () => ({
  DashboardPageLayout: ({ children, onNewChat }: { children: React.ReactNode; onNewChat: () => void }) => (
    <main><button onClick={onNewChat}>New chat</button>{children}</main>
  ),
}));

vi.mock('@/components/common/Chat/ChatHistorySidebar/index', () => ({
  ChatHistorySidebar: ({ onSearchChange, onSelectSession }: {
    onSearchChange: (value: string) => void;
    onSelectSession: (id: string) => void;
  }) => (
    <aside>
      <button onClick={() => onSearchChange('lagos')}>Search</button>
      <button onClick={() => onSelectSession('session-1')}>Select session</button>
    </aside>
  ),
}));

vi.mock('@/components/common/Chat/WelcomeState/index', () => ({
  WelcomeState: ({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) => (
    <button onClick={() => onSelectPrompt('Suggested trip')}>Suggestion</button>
  ),
}));

vi.mock('@/components/common/Chat/ChatMessageList/index', () => ({
  ChatMessageList: ({ onBookFlight, onBookHotel }: {
    onBookFlight: () => void;
    onBookHotel: () => void;
  }) => (
    <section>
      Messages
      <button onClick={onBookFlight}>Book flight</button>
      <button onClick={onBookHotel}>Book hotel</button>
    </section>
  ),
}));

vi.mock('@/components/common/Chat/ChatInputBox', () => ({
  ChatInputBox: ({ inputMessage, isRecording, onInputChange, onSend, onToggleRecording }: {
    inputMessage: string;
    isRecording: boolean;
    onInputChange: (value: string) => void;
    onSend: () => void;
    onToggleRecording: () => void;
  }) => (
    <div>
      <span>{inputMessage}</span>
      <span>{isRecording ? 'Recording' : 'Idle'}</span>
      <button onClick={() => onInputChange('Typed trip')}>Type</button>
      <button onClick={onSend}>Send</button>
      <button onClick={onToggleRecording}>Record</button>
    </div>
  ),
}));

describe('ChatPage callback coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    messages = [];
    sendMessage.mockReturnValue(true);
  });

  it('sends typed and suggested messages and clears accepted input', () => {
    render(<ChatPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Type' }));
    expect(screen.getByText('Typed trip')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(sendMessage).toHaveBeenCalledWith('Typed trip');

    fireEvent.click(screen.getByRole('button', { name: 'Suggestion' }));
    expect(sendMessage).toHaveBeenCalledWith('Suggested trip');
  });

  it('keeps input when sending is rejected', () => {
    sendMessage.mockReturnValue(false);
    render(<ChatPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Type' }));
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('Typed trip')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Suggestion' }));
  });

  it('handles session, new-chat and recording actions', () => {
    render(<ChatPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Select session' }));
    fireEvent.click(screen.getByRole('button', { name: 'New chat' }));
    fireEvent.click(screen.getByRole('button', { name: 'Record' }));

    expect(selectSession).toHaveBeenCalledWith('session-1');
    expect(startNewChat).toHaveBeenCalledOnce();
    expect(screen.getByText('Recording')).toBeInTheDocument();
  });

  it('renders messages and opens booking routes', () => {
    messages = [{ id: 'message-1', text: 'Result' }];
    render(<ChatPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Book flight' }));
    fireEvent.click(screen.getByRole('button', { name: 'Book hotel' }));
    expect(navigate).toHaveBeenNthCalledWith(1, '/chats/fares');
    expect(navigate).toHaveBeenNthCalledWith(2, '/chats/hotels');
  });
});
