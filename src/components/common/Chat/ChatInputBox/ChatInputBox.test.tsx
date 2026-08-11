import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ChatInputBox } from "./ChatInputBox";

describe("ChatInputBox", () => {
  const defaultProps = {
    inputMessage: "",
    onInputChange: vi.fn(),
    onSend: vi.fn(),
    isRecording: false,
    onToggleRecording: vi.fn(),
  };

  it("renders textarea with placeholder", () => {
    render(<ChatInputBox {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(
        "Tell me where you are going to and how you prefer to get there"
      )
    ).toBeInTheDocument();
  });

  it("shows the multicolor glow only while thinking", () => {
    const { rerender } = render(<ChatInputBox {...defaultProps} />);
    const input = screen.getByPlaceholderText(
      "Tell me where you are going to and how you prefer to get there"
    );

    expect(input.parentElement?.parentElement).toHaveAttribute("data-thinking", "false");
    expect(input.parentElement?.parentElement).toHaveClass("border-slate-200/80");

    rerender(<ChatInputBox {...defaultProps} isThinking />);

    expect(input.parentElement?.parentElement).toHaveAttribute("data-thinking", "true");
    expect(input.parentElement?.parentElement).toHaveClass("before:opacity-55");
    expect(input.parentElement?.parentElement).not.toHaveClass("border-slate-200/80");
  });

  it("calls onInputChange when typing", async () => {
    const user = userEvent.setup();
    const onInputChange = vi.fn();

    render(
      <ChatInputBox
        {...defaultProps}
        onInputChange={onInputChange}
      />
    );

    const textarea = screen.getByPlaceholderText(
      "Tell me where you are going to and how you prefer to get there"
    );

    await user.type(textarea, "Hello");

    expect(onInputChange).toHaveBeenCalled();
  });

  it("calls onSend when send button is clicked", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();

    render(
      <ChatInputBox
        {...defaultProps}
        onSend={onSend}
      />
    );

    const sendButton = screen.getByRole("button", {
      name: /send message/i,
    });

    await user.click(sendButton);

    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it("centers every toolbar icon inside its button", () => {
    render(<ChatInputBox {...defaultProps} />);

    ["Add attachment", "Voice input", "Send message"].forEach((name) => {
      expect(screen.getByRole("button", { name })).toHaveClass("gap-0", "!p-0");
    });
  });

  it("calls onSend when pressing Enter", () => {
    const onSend = vi.fn();

    render(
      <ChatInputBox
        {...defaultProps}
        onSend={onSend}
      />
    );

    const textarea = screen.getByPlaceholderText(
      "Tell me where you are going to and how you prefer to get there"
    );

    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it("does not call onSend when pressing Shift + Enter", () => {
    const onSend = vi.fn();

    render(
      <ChatInputBox
        {...defaultProps}
        onSend={onSend}
      />
    );

    const textarea = screen.getByPlaceholderText(
      "Tell me where you are going to and how you prefer to get there"
    );

    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
    });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("calls onToggleRecording when microphone button is clicked", async () => {
    const user = userEvent.setup();
    const onToggleRecording = vi.fn();

    render(
      <ChatInputBox
        {...defaultProps}
        onToggleRecording={onToggleRecording}
      />
    );

    const micButton = screen.getByRole("button", {
      name: /voice input/i,
    });

    await user.click(micButton);

    expect(onToggleRecording).toHaveBeenCalledTimes(1);
  });

  it("shows recording style when isRecording is true", () => {
    render(
      <ChatInputBox
        {...defaultProps}
        isRecording={true}
      />
    );

    const micButton = screen.getByRole("button", {
      name: /voice input/i,
    });

    expect(micButton).toHaveClass("bg-red-50");
    expect(micButton).toHaveClass("animate-pulse");
  });
});
