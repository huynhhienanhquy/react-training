// FareHeader.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FareHeader } from '.';

vi.mock('@/components/common/Card', () => ({
  Card: ({
    children,
    variant,
    className,
  }: {
    children: React.ReactNode;
    variant: string;
    className?: string;
  }) => (
    <section data-testid="card" data-variant={variant} className={className}>
      {children}
    </section>
  ),
}));

vi.mock('@/components/common/PriceDisplay', () => ({
  PriceDisplay: ({
    amount,
    size,
  }: {
    amount: string;
    size: string;
  }) => (
    <span data-testid="price-display" data-size={size}>
      {amount}
    </span>
  ),
}));

describe('FareHeader', () => {
  const defaultProps = {
    destination: 'Bangkok to Tokyo',
    tripType: 'Round trip',
    cabinClass: 'Business',
    price: 450,
    priceUnit: 'per passenger',
  };

  it('renders destination and flight details', () => {
    render(<FareHeader {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: 'Bangkok to Tokyo' }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Round trip • Business'),
    ).toBeInTheDocument();
  });

  it('renders formatted price and its unit', () => {
    render(<FareHeader {...defaultProps} />);

    expect(screen.getByTestId('price-display')).toHaveTextContent('$450');
    expect(screen.getByTestId('price-display')).toHaveAttribute(
      'data-size',
      'md',
    );
    expect(screen.getByText('per passenger')).toBeInTheDocument();
  });

  it('passes surface variant and layout classes to Card', () => {
    render(<FareHeader {...defaultProps} />);

    const card = screen.getByTestId('card');

    expect(card).toHaveAttribute('data-variant', 'surface');
    expect(card).toHaveClass(
      'p-6',
      'flex',
      'items-center',
      'justify-between',
    );
  });
});
