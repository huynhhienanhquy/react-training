// LoadingOverlay.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LoadingOverlay } from '.';

vi.mock('../../assets/icons/Logo.png', () => ({
  default: '/assets/logo.png',
}));

describe('LoadingOverlay', () => {
  it('renders the loading overlay by default', () => {
    render(<LoadingOverlay />);

    expect(screen.getByAltText('Tripal Logo')).toBeInTheDocument();
  });

  it('does not render when isVisible is false', () => {
    const { container } = render(<LoadingOverlay isVisible={false} />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByAltText('Tripal Logo')).not.toBeInTheDocument();
  });

  it('renders when isVisible is true', () => {
    render(<LoadingOverlay isVisible />);

    expect(screen.getByAltText('Tripal Logo')).toBeInTheDocument();
  });

  it('renders the logo with the imported image source', () => {
    render(<LoadingOverlay />);

    expect(screen.getByAltText('Tripal Logo')).toHaveAttribute(
      'src',
      '/assets/logo.png',
    );
  });

  it('applies full-screen overlay styles', () => {
    const { container } = render(<LoadingOverlay />);

    const overlay = container.firstElementChild;

    expect(overlay).toHaveClass(
      'fixed',
      'inset-0',
      'z-50',
      'flex',
      'items-center',
      'justify-center',
      'bg-black/20',
      'backdrop-blur-xs',
    );
  });

  it('renders an animated spinner', () => {
    const { container } = render(<LoadingOverlay />);

    const spinner = container.querySelector('.animate-spin');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'rounded-full',
      'border-3',
      'border-t-blue-500',
      'border-l-blue-400',
    );
  });
});
