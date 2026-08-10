// SelectedFlightBox.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SelectedFlightBox, type FlightLeg } from '.';
import HeartIcon from '@/components/common/Icons/HeartIcon';

vi.mock('../SectionHeader', () => ({
  SectionHeader: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

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
    <section data-testid="flight-card" data-variant={variant} className={className}>
      {children}
    </section>
  ),
}));

const legs: FlightLeg[] = [
  {
    id: 'outbound',
    times: '08:30 - 14:15',
    route: 'Bangkok → Tokyo',
    duration: '5h 45m',
    stops: 'Non-stop',
  },
  {
    id: 'return',
    times: '16:00 - 21:30',
    route: 'Tokyo → Bangkok',
    duration: '6h 30m',
    stops: '1 stop',
  },
];

const defaultProps = {
  airlineName: 'Vietnam Airlines',
  defaultFlightLogo: '/vietnam-airlines.png',
  iconHeart: HeartIcon,
  legs,
  cancellationPolicy: 'Free cancellation within 24 hours.',
};

describe('SelectedFlightBox', () => {
  it('renders selected-flight details', () => {
    render(<SelectedFlightBox {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: 'Selected flights' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Vietnam Airlines')).toBeInTheDocument();
    expect(screen.getByAltText('Vietnam Airlines')).toHaveAttribute(
      'src',
      '/vietnam-airlines.png',
    );

    expect(screen.getByText('08:30 - 14:15')).toBeInTheDocument();
    expect(
      screen.getByText('Bangkok → Tokyo • 5h 45m • Non-stop'),
    ).toBeInTheDocument();

    expect(screen.getByText('16:00 - 21:30')).toBeInTheDocument();
    expect(
      screen.getByText('Tokyo → Bangkok • 6h 30m • 1 stop'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Free cancellation within 24 hours.'),
    ).toBeInTheDocument();
  });

  it('renders Card with surface variant', () => {
    render(<SelectedFlightBox {...defaultProps} />);

    const card = screen.getByTestId('flight-card');
    expect(card).toHaveAttribute('data-variant', 'surface');
    expect(card).toHaveClass('p-6', 'space-y-4');
  });

  it('renders favorite and change-flight controls', () => {
    render(<SelectedFlightBox {...defaultProps} />);

    expect(screen.getByRole('button', { pressed: false })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Change Flight' }),
    ).toBeInTheDocument();
  });

  it('toggles favorite styles after clicking the favorite button', () => {
    render(<SelectedFlightBox {...defaultProps} />);

    const favoriteButton = screen.getByRole('button', { pressed: false });

    expect(favoriteButton).toHaveClass('bg-primary-light');
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(favoriteButton!);

    expect(favoriteButton).toHaveClass('bg-blue-600');
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(favoriteButton!);

    expect(favoriteButton).toHaveClass('bg-primary-light');
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
  });
});
