// SectionHeader.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeader } from '.';

describe('SectionHeader', () => {
  it('renders the provided title', () => {
    render(<SectionHeader title="Selected flights" />);

    expect(
      screen.getByRole('heading', { name: 'Selected flights', level: 3 }),
    ).toBeInTheDocument();
  });

  it('renders an h3 element', () => {
    render(<SectionHeader title="Price details" />);

    expect(screen.getByText('Price details').tagName).toBe('H3');
  });

  it('applies default heading styles', () => {
    render(<SectionHeader title="Fare options" />);

    expect(screen.getByText('Fare options')).toHaveClass(
      'text-sm',
      'font-bold',
      'text-brand-dark',
      'md:text-base',
    );
  });

  it('merges a custom className', () => {
    render(
      <SectionHeader
        title="Booking summary"
        className="mt-6 custom-section-header"
      />,
    );

    expect(screen.getByText('Booking summary')).toHaveClass(
      'mt-6',
      'custom-section-header',
    );
  });
});
