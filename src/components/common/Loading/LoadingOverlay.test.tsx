// LoadingOverlay.test.tsx
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LoadingOverlay } from '.';

vi.mock('@/assets/images/app-logo.png', () => ({
  default: '/assets/logo.png',
}));

describe('LoadingOverlay', () => {
  it('renders the loading overlay by default', () => {
    render(<LoadingOverlay />);

    expect(document.body.querySelector('.fixed.inset-0')).toBeInTheDocument();
  });

  it('does not render when isVisible is false', () => {
    const { container } = render(<LoadingOverlay isVisible={false} />);

    expect(container).toBeEmptyDOMElement();
    expect(document.body.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
  });

  it('renders when isVisible is true', () => {
    render(<LoadingOverlay isVisible />);

    expect(document.body.querySelector('.fixed.inset-0')).toBeInTheDocument();
  });

  it('renders the logo with the imported image source', () => {
    render(<LoadingOverlay />);

    const logo = document.body.querySelector('img[src="/assets/logo.png"]');

    expect(logo).toHaveAttribute('alt', '');
    expect(logo).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies full-screen overlay styles', () => {
    render(<LoadingOverlay />);

    const overlay = document.body.querySelector('.fixed.inset-0');

    expect(overlay).toHaveClass(
      'fixed',
      'inset-0',
      'z-50',
      'flex',
      'items-center',
      'justify-center',
      'h-screen',
      'w-screen',
      'bg-white/60',
    );
  });

  it('renders an animated spinner', () => {
    render(<LoadingOverlay />);

    const spinner = document.body.querySelector('.animate-spin');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'rounded-full',
      'border-4',
      'border-gray-200/70',
      'border-l-primary',
      'border-t-primary',
    );
  });
});
