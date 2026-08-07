// FareCards.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FareCards, type FareOption } from '.';

vi.mock('../ui/SectionHeader', () => ({
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

vi.mock('../ui/PriceDisplay', () => ({
  PriceDisplay: ({ amount }: { amount: string }) => <span>{amount}</span>,
}));

const fareOptions: FareOption[] = [
  {
    id: 'economy',
    name: 'Economy',
    airline: 'Vietnam Airlines',
    price: 120,
    features: ['7kg cabin baggage', 'Free seat selection'],
  },
  {
    id: 'business',
    name: 'Business',
    airline: 'Vietnam Airlines',
    price: 350,
    features: ['30kg checked baggage', 'Lounge access'],
  },
];

describe('FareCards', () => {
  it('renders all fare information', () => {
    render(
      <FareCards
        fareOptions={fareOptions}
        selectedFareId="economy"
        defaultFlightLogo="/logo.png"
        onSelectFare={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Select fare' })).toBeInTheDocument();

    expect(screen.getByText('Economy')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByText('$350')).toBeInTheDocument();

    expect(screen.getByText('7kg cabin baggage')).toBeInTheDocument();
    expect(screen.getByText('Lounge access')).toBeInTheDocument();

    expect(screen.getAllByAltText('Vietnam Airlines')).toHaveLength(2);
  });

  it('highlights the selected fare and its button', () => {
    const { container } = render(
      <FareCards
        fareOptions={fareOptions}
        selectedFareId="business"
        defaultFlightLogo="/logo.png"
        onSelectFare={vi.fn()}
      />,
    );

    const cards = container.querySelectorAll('.bg-surface');
    expect(cards[0]).toHaveClass('border-slate-100');
    expect(cards[1]).toHaveClass('border-blue-500', 'ring-2');

    const buttons = screen.getAllByRole('button', { name: 'Select' });
    expect(buttons[0]).toHaveClass('bg-surface-section');
    expect(buttons[1]).toHaveClass('from-primary', 'text-white');
  });

  it('calls onSelectFare with the clicked fare id', () => {
    const onSelectFare = vi.fn();

    render(
      <FareCards
        fareOptions={fareOptions}
        selectedFareId="economy"
        defaultFlightLogo="/logo.png"
        onSelectFare={onSelectFare}
      />,
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Select' })[1]);

    expect(onSelectFare).toHaveBeenCalledTimes(1);
    expect(onSelectFare).toHaveBeenCalledWith('business');
  });
});
