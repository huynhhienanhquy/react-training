// PriceDetailsSidebar.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PriceDetailsSidebar } from '.';

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
    <aside data-testid="price-card" data-variant={variant} className={className}>
      {children}
    </aside>
  ),
}));

vi.mock('@/components/common/InfoRow', () => ({
  InfoRow: ({ label, value }: { label: string; value: string }) => (
    <div data-testid="info-row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  ),
}));

describe('PriceDetailsSidebar', () => {
  const defaultProps = {
    pricePerTraveller: 250,
    flightDues: 30,
    taxesAndFees: 20,
    totalAmount: 300,
  };

  it('renders heading and all price breakdown rows', () => {
    render(<PriceDetailsSidebar {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: 'Price Details' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Price per traveller')).toBeInTheDocument();
    expect(screen.getByText('$250')).toBeInTheDocument();

    expect(screen.getByText('Flight dues')).toBeInTheDocument();
    expect(screen.getByText('$30')).toBeInTheDocument();

    expect(screen.getByText('Taxes and fees')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();

    expect(screen.getAllByTestId('info-row')).toHaveLength(3);
  });

  it('renders trip total', () => {
    render(<PriceDetailsSidebar {...defaultProps} />);

    expect(screen.getByText('Trip Total')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  it('renders booking platform button', () => {
    render(<PriceDetailsSidebar {...defaultProps} />);

    const button = screen.getByRole('button', {
      name: 'Select booking platform',
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full', 'bg-surface-section', 'text-blue-600');
  });

  it('passes surface variant and sticky styling to Card', () => {
    render(<PriceDetailsSidebar {...defaultProps} />);

    const card = screen.getByTestId('price-card');

    expect(card).toHaveAttribute('data-variant', 'surface');
    expect(card).toHaveClass('p-6', 'space-y-6', 'lg:sticky', 'lg:top-24');
  });
});
