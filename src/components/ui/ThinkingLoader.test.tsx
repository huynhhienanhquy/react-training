// ThinkingLoader.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThinkingLoader } from './ThinkingLoader';

describe('ThinkingLoader', () => {
  it('renders the default text', () => {
    render(<ThinkingLoader />);

    expect(
      screen.getByText('Travelpal is thinking...'),
    ).toBeInTheDocument();
  });

  it('renders a custom text', () => {
    render(<ThinkingLoader text="Finding the best flights..." />);

    expect(
      screen.getByText('Finding the best flights...'),
    ).toBeInTheDocument();
  });

  it('renders an animated SVG spinner', () => {
    const { container } = render(<ThinkingLoader />);

    const spinner = container.querySelector('svg');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'animate-spin',
      'w-4',
      'h-4',
      'text-slate-400',
      'shrink-0',
    );
    expect(spinner).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders all spinner line segments', () => {
    const { container } = render(<ThinkingLoader />);

    expect(container.querySelectorAll('svg line')).toHaveLength(12);
  });

  it('applies layout styles to the container', () => {
    const { container } = render(<ThinkingLoader />);

    expect(container.firstElementChild).toHaveClass(
      'flex',
      'items-center',
      'gap-2.5',
      'py-2',
      'px-1',
      'text-slate-400',
      'select-none',
    );
  });

  it('applies text styles', () => {
    render(<ThinkingLoader />);

    expect(screen.getByText('Travelpal is thinking...')).toHaveClass(
      'text-sm',
      'font-normal',
      'text-slate-400/90',
      'tracking-wide',
    );
  });
});
