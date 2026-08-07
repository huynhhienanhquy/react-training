// @vitest-environment jsdom

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Register } from "./Register";

const mockNavigate = vi.fn();
const mockStartLoading = vi.fn();
const mockStopLoading = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("@/hooks/useFormState", () => ({
  useFormState: () => ({
    isLoading: false,
    startLoading: mockStartLoading,
    stopLoading: mockStopLoading,
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

vi.mock("@/components/Button/Button", () => ({
  Button: ({
    children,
    onClick,
    type,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
  }) => (
    <button type={type || "button"} onClick={onClick}>
      {children}
    </button>
  ),
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

describe("Register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page correctly", () => {
    render(<Register />);

    expect(screen.getByText("Unlock Your Next Adventure")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/)).toBeInTheDocument();
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    expect(screen.getByText("Continue with Apple")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("updates email and password inputs", async () => {
    const user = userEvent.setup();
    render(<Register />);

    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");

    await user.type(emailInput, "user@test.com");
    await user.type(passwordInput, "securepass");

    expect(emailInput).toHaveValue("user@test.com");
    expect(passwordInput).toHaveValue("securepass");
  });

  it("submits form and navigates to onboarding", async () => {
    render(<Register />);

    fireEvent.submit(
      screen.getByRole("button", { name: "Create a Free Account" }).closest("form")!
    );

    expect(mockStartLoading).toHaveBeenCalled();

    await vi.waitFor(() => {
      expect(mockStopLoading).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/onboarding");
    }, { timeout: 2000 });
  });

  it("navigates to login via footer", async () => {
    const user = userEvent.setup();
    render(<Register />);

    await user.click(screen.getByText("Sign In"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
