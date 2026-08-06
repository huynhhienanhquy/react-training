import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '.';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Continue</Button>);

    expect(
      screen.getByRole('button', { name: 'Continue' }),
    ).toBeInTheDocument();
  });

  it('uses primary and large styles by default', () => {
    render(<Button>Continue</Button>);

    const button = screen.getByRole('button', { name: 'Continue' });

    expect(button).toHaveClass(
      'from-primary',
      'to-primary-dark',
      'text-white',
      'w-full',
      'py-4',
      'text-base',
    );
  });

  it.each([
    ['primary', 'bg-gradient-to-r'],
    ['secondary', 'bg-primary-light'],
    ['social', 'bg-social-bg'],
    ['dark', 'bg-slate-900'],
    ['ghost', 'bg-transparent'],
  ] as const)('applies %s variant styles', (variant, expectedClass) => {
    render(
      <Button variant={variant} size="md">
        Button
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      expectedClass,
    );
  });

  it.each([
    ['sm', 'px-3'],
    ['md', 'px-5'],
    ['lg', 'w-full'],
  ] as const)('applies %s size styles', (size, expectedClass) => {
    render(
      <Button size={size}>
        Button
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      expectedClass,
    );
  });

  it('calls the provided onClick handler', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Book now</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Book now' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders left and right icons when not loading', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Continue
      </Button>,
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('disables button and shows spinner while loading', () => {
    const onClick = vi.fn();

    const { container } = render(
      <Button
        isLoading
        onClick={onClick}
        leftIcon={<span data-testid="left-icon">←</span>}
      >
        Continue
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Continue' });

    expect(button).toBeDisabled();
    expect(container.querySelector('svg')).toHaveClass('animate-spin');
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('remains disabled when disabled prop is true', () => {
    render(<Button disabled>Unavailable</Button>);

    expect(
      screen.getByRole('button', { name: 'Unavailable' }),
    ).toBeDisabled();
  });

  it('merges custom className and native button props', () => {
    render(
      <Button
        className="custom-button"
        aria-label="Custom label"
        type="submit"
      >
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Custom label' });

    expect(button).toHaveClass('custom-button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
