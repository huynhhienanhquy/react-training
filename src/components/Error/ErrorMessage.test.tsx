import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('announces a visible error', () => {
    render(<ErrorMessage message="Unable to sign in" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to sign in');
  });

  it('renders nothing without an error', () => {
    const { container } = render(<ErrorMessage message="" />);

    expect(container).toBeEmptyDOMElement();
  });
});
