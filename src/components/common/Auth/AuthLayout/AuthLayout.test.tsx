import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthLayout } from ".";

// Mock LoadingOverlay
vi.mock('@/components/common/Loading', () => ({
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

  it('supports inset variants and renders the outlet when children are absent', () => {
    const { container } = render(<AuthLayout inset heroInset />);
    expect(container.firstChild).toHaveClass('desktop:pr-6');
    expect(container.querySelector('.bottom-18')).toBeInTheDocument();
    expect(container.querySelector('.lg\\:-translate-y-3')).not.toBeInTheDocument();
  });

  it('keeps light mode disabled after unmount when it was initially disabled', () => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = '';

    const { unmount } = render(<AuthLayout>Content</AuthLayout>);
    unmount();

    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('');
  });

  it("forces light mode while mounted and restores dark mode on unmount", () => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';

    const { unmount } = render(
      <AuthLayout>
        <div>Content</div>
      </AuthLayout>
    );

    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('light');

    unmount();

    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');

    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = '';
  });
});
