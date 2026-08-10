import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Topbar } from ".";
import type { ChatMessage } from "@/types/chat";

// Mock Button component
vi.mock("../../../../components/Button/Button", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button onClick={onClick}>
      {children}
    </button>
  ),
}));

describe("Topbar", () => {
  const messages: ChatMessage[] = [
    {
      id: "1",
      sender: "user",
      text: "I want to travel to Paris next month",
    },
  ];


  it("renders chat title from first user message", () => {
    render(
      <Topbar
        messages={messages}
      />
    );

    expect(
      screen.getByRole("heading")
    ).toHaveTextContent(
      /I want to travel to Paris/
    );
  });


  it("renders custom chatTitle when provided", () => {
    render(
      <Topbar
        chatTitle="My Paris Trip"
        messages={messages}
      />
    );

    expect(
      screen.getByText("My Paris Trip")
    ).toBeInTheDocument();
  });


  it("truncates long user message title", () => {
    const longMessages: ChatMessage[] = [
      {
        id: "1",
        sender: "user",
        text: "This is a very long travel request message that should be truncated",
      },
    ];

    render(
      <Topbar
        messages={longMessages}
      />
    );


    expect(
      screen.getByRole("heading")
    ).toHaveTextContent(
      "This is a very long travel req..."
    );
  });


  it("renders empty title when there is no message", () => {
    const { container } = render(
      <Topbar messages={[]} />
    );


    const heading = container.querySelector("h2");


    expect(
      heading?.textContent
    ).toBe("");
  });


  it("renders breadcrumb mode", () => {
    render(
      <Topbar
        isBreadcrumbMode
        chatTitle="Tokyo Trip"
      />
    );


    expect(
      screen.getByText("Select Fare")
    ).toBeInTheDocument();


    expect(
      screen.getByText("Tokyo Trip")
    ).toBeInTheDocument();
  });


  it("calls onBackToChat when clicking breadcrumb button", async () => {
    const user = userEvent.setup();

    const onBackToChat = vi.fn();


    render(
      <Topbar
        isBreadcrumbMode
        chatTitle="Tokyo Trip"
        onBackToChat={onBackToChat}
      />
    );


    await user.click(
      screen.getByText("Tokyo Trip")
    );


    expect(onBackToChat)
      .toHaveBeenCalledTimes(1);
  });


  it("calls onNewChat when clicking Start New Chat button", async () => {
    const user = userEvent.setup();

    const onNewChat = vi.fn();


    render(
      <Topbar
        onNewChat={onNewChat}
      />
    );


    await user.click(
      screen.getByText("Start New Chat")
    );


    expect(onNewChat)
      .toHaveBeenCalledTimes(1);
  });

  it("hides the Start New Chat button when onNewChat is not provided", () => {
    render(<Topbar isBreadcrumbMode chatTitle="Tokyo Trip" />);

    expect(
      screen.queryByText("Start New Chat")
    ).not.toBeInTheDocument();
  });


  it("renders mobile back button when breadcrumb mode enabled", () => {
    render(
      <Topbar
        isBreadcrumbMode
        onBackToChat={vi.fn()}
      />
    );


    const buttons = screen.getAllByRole("button");


    expect(buttons.length)
      .toBeGreaterThanOrEqual(1);
  });


  it("does not crash without optional props", () => {
    expect(() => {
      render(
        <Topbar />
      );
    }).not.toThrow();
  });
});
