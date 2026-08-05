import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ChatHistorySidebar, type ChatSession } from "./ChatHistorySidebar";

const sessions: ChatSession[] = [
  {
    id: "1",
    title: "Flight to Lagos",
    group: "TODAY",
  },
  {
    id: "2",
    title: "Hotel in Bahamas",
    group: "YESTERDAY",
  },
  {
    id: "3",
    title: "Trip to Japan",
    group: "TODAY",
  },
];

describe("ChatHistorySidebar", () => {
  it("renders all chat sessions", () => {
    render(
      <ChatHistorySidebar
        searchQuery=""
        onSearchChange={() => {}}
        sessions={sessions}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    );

    expect(screen.getByText("Flight to Lagos")).toBeInTheDocument();
    expect(screen.getByText("Hotel in Bahamas")).toBeInTheDocument();
    expect(screen.getByText("Trip to Japan")).toBeInTheDocument();
  });

  it("filters sessions by search query", () => {
    render(
      <ChatHistorySidebar
        searchQuery="hotel"
        onSearchChange={() => {}}
        sessions={sessions}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    );

    expect(screen.getByText("Hotel in Bahamas")).toBeInTheDocument();
    expect(
      screen.queryByText("Flight to Lagos")
    ).not.toBeInTheDocument();
  });

  it("calls setSearchQuery when typing in search input", async () => {
    const user = userEvent.setup();
    const setSearchQuery = vi.fn();

    render(
      <ChatHistorySidebar
        searchQuery=""
        onSearchChange={setSearchQuery}
        sessions={sessions}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    );

    await user.type(
      screen.getByPlaceholderText("Search"),
      "flight"
    );

    expect(setSearchQuery).toHaveBeenCalled();
  });

  it("calls onSelectSession when a session is clicked", async () => {
    const user = userEvent.setup();
    const onSelectSession = vi.fn();

    render(
      <ChatHistorySidebar
        searchQuery=""
        onSearchChange={() => {}}
        sessions={sessions}
        activeSessionId={null}
        onSelectSession={onSelectSession}
      />
    );

    await user.click(screen.getByText("Flight to Lagos"));

    expect(onSelectSession).toHaveBeenCalledWith("1");
  });

  it("highlights the active session", () => {
    render(
      <ChatHistorySidebar
        searchQuery=""
        onSearchChange={() => {}}
        sessions={sessions}
        activeSessionId="2"
        onSelectSession={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: "Hotel in Bahamas" })
    ).toHaveClass("bg-surface-active");
  });

  it("renders grouped session titles", () => {
    render(
      <ChatHistorySidebar
        searchQuery=""
        onSearchChange={() => {}}
        sessions={sessions}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    );

    expect(screen.getByText("TODAY")).toBeInTheDocument();
    expect(screen.getByText("YESTERDAY")).toBeInTheDocument();
  });

  it("shows 'No chats found' when no session matches search", () => {
    render(
      <ChatHistorySidebar
        searchQuery="xyz"
        onSearchChange={() => {}}
        sessions={sessions}
        activeSessionId={null}
        onSelectSession={() => {}}
      />
    );

    expect(screen.getByText("No chats found")).toBeInTheDocument();
  });
});
