// InfoRow.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InfoRow } from '.';

describe('InfoRow', () => {
  it('renders the label and value', () => {
    render(<InfoRow label="Flight dues" value="$30" />);

    expect(screen.getByText('Flight dues')).toBeInTheDocument();
    expect(screen.getByText('$30')).toBeInTheDocument();
  });

  it('applies layout and label styles to the row', () => {
    render(<InfoRow label="Taxes and fees" value="$20" />);

    const row = screen.getByText('Taxes and fees').parentElement;

    expect(row).toHaveClass(
      'flex',
      'justify-between',
      'text-slate-500',
      'text-xs',
      'md:text-sm',
    );
  });

  it('applies emphasized value styles', () => {
    render(<InfoRow label="Total" value="$300" />);

    expect(screen.getByText('$300')).toHaveClass(
      'font-semibold',
      'text-brand-dark',
    );
  });

  it('merges custom className into the row', () => {
    render(
      <InfoRow
        label="Price per traveller"
        value="$250"
        className="pt-4 border-t custom-row"
      />,
    );

    const row = screen.getByText('Price per traveller').parentElement;

    expect(row).toHaveClass('pt-4', 'border-t', 'custom-row');
  });
});
