// PriceDisplay.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PriceDisplay } from './PriceDisplay';

describe('PriceDisplay', () => {
  it('renders the amount', () => {
    render(<PriceDisplay amount="$250" />);

    expect(screen.getByText('$250')).toBeInTheDocument();
  });

  it('does not render a period when none is provided', () => {
    render(<PriceDisplay amount="$250" />);

    expect(screen.queryByText('/ traveller')).not.toBeInTheDocument();
  });

  it('renders a period when provided', () => {
    render(<PriceDisplay amount="$250" period="/ traveller" />);

    expect(screen.getByText('/ traveller')).toBeInTheDocument();
    expect(screen.getByText('/ traveller')).toHaveClass(
      'text-xs',
      'text-slate-500',
      'font-medium',
    );
  });

  it('uses small size styles by default', () => {
    render(<PriceDisplay amount="$250" />);

    expect(screen.getByText('$250')).toHaveClass(
      'text-xl',
      'md:text-2xl',
      'font-black',
      'text-slate-900',
      'tracking-tight',
    );
  });

  it.each([
    ['sm', ['text-xl', 'md:text-2xl', 'font-black']],
    ['md', ['text-2xl', 'md:text-3xl', 'font-bold']],
    ['lg', ['text-2xl', 'md:text-3xl', 'font-black']],
  ] as const)('applies %s size styles', (size, expectedClasses) => {
    render(<PriceDisplay amount="$250" size={size} />);

    expect(screen.getByText('$250')).toHaveClass(...expectedClasses);
  });

  it('applies container layout styles', () => {
    render(<PriceDisplay amount="$250" />);

    const container = screen.getByText('$250').parentElement;

    expect(container).toHaveClass('flex', 'items-baseline', 'gap-1');
  });

  it('merges custom className into the container', () => {
    render(
      <PriceDisplay
        amount="$250"
        className="text-brand-dark custom-price-display"
      />,
    );

    const container = screen.getByText('$250').parentElement;

    expect(container).toHaveClass(
      'text-brand-dark',
      'custom-price-display',
    );
  });
});
