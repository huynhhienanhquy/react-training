import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ChatInputBox } from "./ChatInputBox";

describe("ChatInputBox", () => {
  const defaultProps = {
    inputMessage: "",
    setInputMessage: vi.fn(),
    onSend: vi.fn(),
    isRecording: false,
    setIsRecording: vi.fn(),
  };

  it("renders textarea with placeholder", () => {
    render(<ChatInputBox {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(
        "Tell me where you are going to and how you prefer to get there"
      )
    ).toBeInTheDocument();
  });

  it("calls setInputMessage when typing", async () => {
    const user = userEvent.setup();
    const setInputMessage = vi.fn();

    render(
      <ChatInputBox
        {...defaultProps}
        setInputMessage={setInputMessage}
      />
    );

    const textarea = screen.getByPlaceholderText(
      "Tell me where you are going to and how you prefer to get there"
    );

    await user.type(textarea, "Hello");

    expect(setInputMessage).toHaveBeenCalled();
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

  it("calls setIsRecording when microphone button is clicked", async () => {
    const user = userEvent.setup();
    const setIsRecording = vi.fn();

    render(
      <ChatInputBox
        {...defaultProps}
        setIsRecording={setIsRecording}
      />
    );

    const micButton = screen.getByRole("button", {
      name: /voice input/i,
    });

    await user.click(micButton);

    expect(setIsRecording).toHaveBeenCalledTimes(1);
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
