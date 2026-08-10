// @vitest-environment jsdom

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VerifyOTP } from "./VerifyOTP";

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

vi.mock('@/components/common/Button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button type="submit">{children}</button>,
}));

describe("VerifyOTP", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page correctly", () => {
    vi.useFakeTimers();
    render(<VerifyOTP />);

    expect(screen.getByRole("heading", { name: "Enter OTP" })).toBeInTheDocument();
    expect(screen.getByText("Verify OTP")).toBeInTheDocument();
    expect(screen.getByText(/Resend in 00:29/)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("has 6 OTP input boxes", () => {
    vi.useFakeTimers();
    render(<VerifyOTP />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
    vi.useRealTimers();
  });

  it("accepts digits in OTP boxes", () => {
    render(<VerifyOTP />);

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });

    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
  });

  it("handles paste of 6-digit code", () => {
    vi.useFakeTimers();
    render(<VerifyOTP />);

    const inputs = screen.getAllByRole("textbox");

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => "123456" },
    });

    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("3");
    expect(inputs[3]).toHaveValue("4");
    expect(inputs[4]).toHaveValue("5");
    expect(inputs[5]).toHaveValue("6");
    vi.useRealTimers();
  });

  it("counts down timer from 29", () => {
    vi.useFakeTimers();
    render(<VerifyOTP />);

    expect(screen.getByText(/Resend in 00:29/)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/Resend in 00:26/)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("shows resend button after timer reaches 0", () => {
    vi.useFakeTimers();
    render(<VerifyOTP />);

    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(screen.getByText("Resend OTP")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("resends OTP when clicking resend", () => {
    vi.useFakeTimers();
    render(<VerifyOTP />);

    act(() => {
      vi.advanceTimersByTime(30000);
    });

    fireEvent.click(screen.getByText("Resend OTP"));

    expect(screen.getByText(/Resend in 00:29/)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("submits form and navigates to reset password", () => {
    vi.useFakeTimers();
    render(<VerifyOTP />);

    fireEvent.submit(screen.getByText("Verify OTP").closest("form")!);

    expect(mockStartLoading).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1600);
    });

    expect(mockStopLoading).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/reset-password");
    vi.useRealTimers();
  });
});
