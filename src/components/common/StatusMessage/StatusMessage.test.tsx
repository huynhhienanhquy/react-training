import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusMessage } from './index';

describe('StatusMessage', () => {
  it('renders the message', () => {
    render(<StatusMessage message="Success" />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('returns null when message is empty', () => {
    const { container } = render(<StatusMessage message="" />);

    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    render(<StatusMessage message="Updated successfully" className="mt-4" />);

    expect(screen.getByRole('status')).toHaveClass('mt-4');
  });

  it('has correct accessibility attributes', () => {
    render(<StatusMessage message="Success" />);

    const statusMessage = screen.getByRole('status');

    expect(statusMessage).toHaveAttribute('aria-live', 'polite');
  });
});