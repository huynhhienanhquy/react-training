import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AuthPageLayout } from './AuthPageLayout';

vi.mock('@/components/common/Loading', () => ({
  LoadingOverlay: ({ isVisible }: { isVisible: boolean }) => (
    <div data-testid="loading-overlay">
      {isVisible ? 'Loading' : 'Not loading'}
    </div>
  ),
}));

vi.mock('@/components/common/Auth/AuthHeader', () => ({
  AuthHeader: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  ),
}));

vi.mock('@/components/common/Auth/AuthFooter', () => ({
  AuthFooter: ({
    questionText,
    actionText,
    onActionClick,
  }: {
    questionText: string;
    actionText: string;
    onActionClick: () => void;
  }) => (
    <footer>
      <span>{questionText}</span>
      <button onClick={onActionClick}>{actionText}</button>
    </footer>
  ),
}));

describe('AuthPageLayout', () => {
  it('renders header with title and subtitle', () => {
    render(
      <AuthPageLayout
        title="Sign in"
        subtitle="Welcome back"
        isLoading={false}
      >
        <div>Content</div>
      </AuthPageLayout>,
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <AuthPageLayout
        title="Sign in"
        subtitle="Welcome back"
        isLoading={false}
      >
        <div>Test content</div>
      </AuthPageLayout>,
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('shows loading overlay when isLoading is true', () => {
    render(
      <AuthPageLayout
        title="Sign in"
        subtitle="Welcome back"
        isLoading
      >
        <div>Content</div>
      </AuthPageLayout>,
    );

    expect(screen.getByTestId('loading-overlay')).toHaveTextContent('Loading');
  });

  it('renders footer when footer prop is provided', () => {
    render(
      <AuthPageLayout
        title="Sign in"
        subtitle="Welcome back"
        isLoading={false}
        footer={{
          questionText: "Don't have an account?",
          actionText: 'Sign up',
          onActionClick: vi.fn(),
        }}
      >
        <div>Content</div>
      </AuthPageLayout>,
    );

    expect(
      screen.getByText("Don't have an account?"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Sign up' }),
    ).toBeInTheDocument();
  });

  it('does not render footer when footer prop is not provided', () => {
    render(
      <AuthPageLayout
        title="Sign in"
        subtitle="Welcome back"
        isLoading={false}
      >
        <div>Content</div>
      </AuthPageLayout>,
    );

    expect(
      screen.queryByRole('button', { name: 'Sign up' }),
    ).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AuthPageLayout
        title="Sign in"
        subtitle="Welcome back"
        isLoading={false}
        className="custom-class"
      >
        <div>Content</div>
      </AuthPageLayout>,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});