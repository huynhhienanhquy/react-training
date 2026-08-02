// @vitest-environment jsdom

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResetPassword } from "./ResetPassword";

const mockNavigate = vi.fn();
const mockStartLoading = vi.fn();
const mockStopLoading = vi.fn();
const mockSetError = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("@/hooks/useFormState", () => ({
  useFormState: () => ({
    isLoading: false,
    error: "",
    startLoading: mockStartLoading,
    stopLoading: mockStopLoading,
    setError: mockSetError,
  }),
}));

vi.mock("@/components/auth/AuthLayout/AuthLayout", () => ({
  AuthLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/auth/AuthHeader/AuthHeader", () => ({
  AuthHeader: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  ),
}));

vi.mock("@/components/Input/InputField", () => ({
  InputField: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }) => <input aria-label={label} value={value} onChange={onChange} />,
}));

vi.mock("@/components/Button/Button", () => ({
  Button: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <button type="submit">{children}</button>,
}));

vi.mock("@/components/Error/ErrorMessage", () => ({
  ErrorMessage: ({ message }: { message: string | null }) =>
    message ? <div role="alert">{message}</div> : null,
}));

vi.mock("@/components/auth/AuthFooter/AuthFooter", () => ({
  AuthFooter: ({
    actionText,
    onActionClick,
  }: {
    actionText: string;
    onActionClick: () => void;
  }) => <button onClick={onActionClick}>{actionText}</button>,
}));

describe("ResetPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renders page correctly", () => {
    render(<ResetPassword />);

    expect(screen.getByRole("heading", { name: "Reset Password" })).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm New Password")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("updates password inputs", async () => {
    const user = userEvent.setup();
    render(<ResetPassword />);

    const newPassword = screen.getByLabelText("New Password");
    const confirmPassword = screen.getByLabelText("Confirm New Password");

    await user.type(newPassword, "newpass123");
    await user.type(confirmPassword, "newpass123");

    expect(newPassword).toHaveValue("newpass123");
    expect(confirmPassword).toHaveValue("newpass123");
  });

  it("shows error when passwords do not match", async () => {
    const user = userEvent.setup();
    render(<ResetPassword />);

    await user.type(screen.getByLabelText("New Password"), "pass1");
    await user.type(screen.getByLabelText("Confirm New Password"), "pass2");

    await user.click(screen.getByRole("button", { name: "Reset Password" }));

    expect(mockSetError).toHaveBeenCalledWith("Passwords do not match. Please check again.");
  });

  it("submits and navigates on success", async () => {
    render(<ResetPassword />);

    fireEvent.submit(screen.getByRole("button", { name: "Reset Password" }).closest("form")!);

    expect(mockStartLoading).toHaveBeenCalled();

    await vi.waitFor(() => {
      expect(mockStopLoading).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Password reset successfully! Redirecting to Sign In...");
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    }, { timeout: 2000 });
  });

  it("navigates to register via footer", async () => {
    const user = userEvent.setup();
    render(<ResetPassword />);

    await user.click(screen.getByText("Sign Up"));
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
