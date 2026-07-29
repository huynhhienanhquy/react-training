// @vitest-environment jsdom

import React from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ForgotPassword } from "./ForgotPassword";

const mockNavigate = vi.fn();
const mockStartLoading = vi.fn();
const mockStopLoading = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../hooks/useFormState", () => ({
  useFormState: () => ({
    isLoading: false,
    startLoading: mockStartLoading,
    stopLoading: mockStopLoading,
  }),
}));

vi.mock("../components/auth/AuthLayout", () => ({
  AuthLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("../components/auth/AuthHeader", () => ({
  AuthHeader: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  ),
}));

vi.mock("../components/ui/InputField", () => ({
  InputField: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }) => (
    <input
      aria-label={label}
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock("../components/ui/Button", () => ({
  Button: ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <button type="submit">
      {children}
    </button>
  ),
}));

vi.mock("../components/auth/AuthFooter", () => ({
  AuthFooter: ({
    actionText,
    onActionClick,
  }: {
    actionText: string;
    onActionClick: () => void;
  }) => (
    <button onClick={onActionClick}>
      {actionText}
    </button>
  ),
}));

describe("ForgotPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renders page correctly", () => {
    render(<ForgotPassword />);

    expect(
      screen.getByText("Verify Email")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Enter your email address to receive verification OTP"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /send otp code/i,
      })
    ).toBeInTheDocument();
  });

  it("updates email input", async () => {
    const user = userEvent.setup();
    render(<ForgotPassword />);

    const input = screen.getByLabelText("Email address");
    await user.type(input, "test@example.com");

    expect(input).toHaveValue("test@example.com");
  });

  it("submits form and navigates after timeout", async () => {
    render(<ForgotPassword />);

    fireEvent.submit(
      screen
        .getByRole("button", {
          name: /send otp code/i,
        })
        .closest("form")!
    );

    expect(mockStartLoading).toHaveBeenCalled();

    await vi.waitFor(() => {
      expect(mockStopLoading).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(
        "OTP code has been sent to your email!"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/verify-otp");
    }, { timeout: 2000 });
  });

  it("navigates to register when clicking Sign Up", async () => {
    const user = userEvent.setup();
    render(<ForgotPassword />);

    await user.click(screen.getByText("Sign Up"));
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
