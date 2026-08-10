// @vitest-environment jsdom

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Onboarding } from "./Onboarding";

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

vi.mock('@/components/common/Auth/AuthLayout', () => ({
  AuthLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/common/Auth/AuthHeader', () => ({
  AuthHeader: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  ),
}));

vi.mock('@/components/common/Button', () => ({
  Button: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <button type="submit">{children}</button>,
}));

vi.mock('@/components/common/Auth/AuthFooter', () => ({
  AuthFooter: ({
    actionText,
    onActionClick,
  }: {
    actionText: string;
    onActionClick: () => void;
  }) => <button onClick={onActionClick}>{actionText}</button>,
}));

describe("Onboarding", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page correctly", () => {
    render(<Onboarding />);

    expect(screen.getByText("Let's Get To Know You!")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("updates full name input", async () => {
    const user = userEvent.setup();
    render(<Onboarding />);

    const nameInput = screen.getByLabelText("Full Name");
    await user.type(nameInput, "John Doe");

    expect(nameInput).toHaveValue("John Doe");
  });

  it("submits form and navigates to dashboard", async () => {
    render(<Onboarding />);

    fireEvent.submit(screen.getByRole("button", { name: "Start Planning Trips" }).closest("form")!);

    expect(mockStartLoading).toHaveBeenCalled();

    await vi.waitFor(() => {
      expect(mockStopLoading).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    }, { timeout: 2000 });
  });

  it("navigates to login via footer", async () => {
    const user = userEvent.setup();
    render(<Onboarding />);

    await user.click(screen.getByText("Sign In"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
