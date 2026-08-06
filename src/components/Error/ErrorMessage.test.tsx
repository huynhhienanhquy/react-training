// ErrorMessage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from '.';

describe('ErrorMessage', () => {
  it('renders the provided error message', () => {
    render(<ErrorMessage message="Email is required" />);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('does not render anything when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders semantic paragraph element', () => {
    render(<ErrorMessage message="Invalid password" />);

    expect(screen.getByText('Invalid password').tagName).toBe('P');
  });

  it('applies default error styling', () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText('Something went wrong')).toHaveClass(
      'text-sm',
      'text-red-500',
      'font-medium',
      'bg-red-50/50',
      'rounded-lg',
      'border',
      'border-red-100/40',
      'text-center',
    );
  });

  it('merges a custom className', () => {
    render(
      <ErrorMessage
        message="Custom error"
        className="mt-4 custom-error-message"
      />,
    );

    expect(screen.getByText('Custom error')).toHaveClass(
      'mt-4',
      'custom-error-message',
    );
  });
});
