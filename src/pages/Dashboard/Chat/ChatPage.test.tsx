// @vitest-environment jsdom

import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatPage } from "./ChatPage";

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("@/components/chat/SidebarNav/SidebarNav", () => ({
  SidebarNav: () => <div>SidebarNav</div>,
}));

vi.mock("@/components/chat/ChatHistorySidebar/ChatHistorySidebar", () => ({
  ChatHistorySidebar: ({
    sessions,
    onSelectSession,
  }: {
    sessions: { id: string; title: string }[];
    onSelectSession: (id: string) => void;
  }) => (
    <div>
      ChatHistorySidebar
      {sessions.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelectSession(s.id)}
        >
          {s.title}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("@/components/chat/Topbar/Topbar", () => ({
  Topbar: ({
    onNewChat,
  }: {
    onNewChat?: () => void;
  }) => (
    <button onClick={onNewChat}>
      Start New Chat
    </button>
  ),
}));

vi.mock("@/components/chat/WelcomeState/WelcomeState", () => ({
  WelcomeState: ({
    onSelectPrompt,
  }: {
    onSelectPrompt: (text: string) => void;
  }) => (
    <button
      onClick={() =>
        onSelectPrompt("Cheap flights to Lagos")
      }
    >
      Prompt
    </button>
  ),
}));

vi.mock("@/components/chat/ChatMessageList/ChatMessageList", () => ({
  ChatMessageList: ({
    messages,
    onBookFlight,
    onBookHotel,
  }: {
    messages: { text: string }[];
    onBookFlight: () => void;
    onBookHotel: () => void;
  }) => (
    <div>
      {messages.map((m) => (
        <div key={m.text}>{m.text}</div>
      ))}

      <button onClick={onBookFlight}>
        Book Flight
      </button>

      <button onClick={onBookHotel}>
        Book Hotel
      </button>
    </div>
  ),
}));

vi.mock("@/components/chat/ChatInputBox/ChatInputBox", () => ({
  ChatInputBox: ({
    onSend,
  }: {
    onSend: () => void;
  }) => (
    <button onClick={onSend}>
      Send
    </button>
  ),
}));

describe("ChatPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders welcome state initially", () => {
    render(<ChatPage />);

    expect(
      screen.getByText("Prompt")
    ).toBeInTheDocument();
  });

  it("creates a new chat after selecting a prompt", async () => {
    const user = userEvent.setup();

    render(<ChatPage />);

    await user.click(screen.getByText("Prompt"));

    await waitFor(() => {
      expect(screen.getAllByText(/Cheap flights to Lagos/i).length).toBeGreaterThan(0);
    });
  });

  it("navigates to the fare route", async () => {
    const user = userEvent.setup();

    render(<ChatPage />);

    await user.click(screen.getByText("Prompt"));

    await waitFor(() => {
      expect(screen.getAllByText(/Cheap flights to Lagos/i).length).toBeGreaterThan(0);
    });

    await waitFor(() =>
      expect(
        screen.getByText("Book Flight")
      ).toBeInTheDocument()
    );

    await user.click(screen.getByText("Book Flight"));

    expect(mockNavigate).toHaveBeenCalledWith('/chats/fares');
  });

  it("navigates to the hotel route", async () => {
    const user = userEvent.setup();

    render(<ChatPage />);

    await user.click(screen.getByText("Prompt"));

    await waitFor(() => {
      expect(screen.getAllByText(/Cheap flights to Lagos/i).length).toBeGreaterThan(0);
    });

    await waitFor(() => expect(screen.getByText('Book Hotel')).toBeInTheDocument());
    await user.click(screen.getByText('Book Hotel'));

    expect(mockNavigate).toHaveBeenCalledWith('/chats/hotels');
  });

  it("starts a new chat", async () => {
    const user = userEvent.setup();

    render(<ChatPage />);

    await user.click(screen.getByText("Prompt"));

    await waitFor(() => {
      expect(screen.getAllByText(/Cheap flights to Lagos/i).length).toBeGreaterThan(0);
    });

    await user.click(
      screen.getByText("Start New Chat")
    );

    expect(
      screen.getByText("Prompt")
    ).toBeInTheDocument();
  });
});
