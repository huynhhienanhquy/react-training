import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthLayout } from "./AuthLayout";

// Mock LoadingOverlay
vi.mock("@/components/Loading/LoadingOverlay", () => ({
  LoadingOverlay: ({ isVisible }: { isVisible: boolean }) => (
    <div data-testid="loading-overlay">
      {isVisible ? "Loading" : "Not Loading"}
    </div>
  ),
}));

describe("AuthLayout", () => {
  it("renders children", () => {
    render(
      <AuthLayout>
        <div>Login Form</div>
      </AuthLayout>
    );

    expect(screen.getByText("Login Form")).toBeInTheDocument();
  });

  it("shows loading overlay when isLoading is true", () => {
    render(
      <AuthLayout isLoading={true}>
        <div>Content</div>
      </AuthLayout>
    );

    expect(
      screen.getByTestId("loading-overlay")
    ).toHaveTextContent("Loading");
  });

  it("hides loading overlay when isLoading is false", () => {
    render(
      <AuthLayout isLoading={false}>
        <div>Content</div>
      </AuthLayout>
    );

    expect(
      screen.getByTestId("loading-overlay")
    ).toHaveTextContent("Not Loading");
  });

  it("uses false as the default value for isLoading", () => {
    render(
      <AuthLayout>
        <div>Content</div>
      </AuthLayout>
    );

    expect(
      screen.getByTestId("loading-overlay")
    ).toHaveTextContent("Not Loading");
  });

  it("renders the marketing text", () => {
    render(
      <AuthLayout>
        <div>Content</div>
      </AuthLayout>
    );

    expect(
      screen.getByText(/Discover Amazing Deals/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Tripal is designed to ease trip/i)
    ).toBeInTheDocument();
  });
});
