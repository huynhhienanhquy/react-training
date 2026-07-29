// FavoriteButton.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FavoriteButton } from './FavoriteButton';

vi.mock('../../../assets/icons/heart-blue.png', () => ({
  default: '/assets/heart-blue.png',
}));

describe('FavoriteButton', () => {
  it('renders a button with the favorite icon', () => {
    render(<FavoriteButton isFavorite={false} onToggle={vi.fn()} />);

    const button = screen.getByRole('button');
    const icon = screen.getByAltText('Favorite');

    expect(button).toHaveAttribute('type', 'button');
    expect(icon).toHaveAttribute('src', '/assets/heart-blue.png');
  });

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn();

    render(<FavoriteButton isFavorite={false} onToggle={onToggle} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('applies inactive styles when isFavorite is false', () => {
    render(<FavoriteButton isFavorite={false} onToggle={vi.fn()} />);

    const button = screen.getByRole('button');
    const icon = screen.getByAltText('Favorite');

    expect(button).toHaveClass('bg-[#EEF2FF]', 'hover:bg-blue-100');
    expect(button).not.toHaveClass('bg-blue-600');

    expect(icon).toHaveClass('opacity-70', 'hover:opacity-100');
    expect(icon).not.toHaveClass('invert', 'scale-110');
  });

  it('applies active styles when isFavorite is true', () => {
    render(<FavoriteButton isFavorite onToggle={vi.fn()} />);

    const button = screen.getByRole('button');
    const icon = screen.getByAltText('Favorite');

    expect(button).toHaveClass(
      'bg-blue-600',
      'text-white',
      'shadow-md',
      'shadow-blue-200',
    );

    expect(icon).toHaveClass('brightness-0', 'invert', 'scale-110');
    expect(icon).not.toHaveClass('opacity-70');
  });

  it('merges a custom className with default classes', () => {
    render(
      <FavoriteButton
        isFavorite={false}
        onToggle={vi.fn()}
        className="custom-favorite-button"
      />,
    );

    expect(screen.getByRole('button')).toHaveClass('custom-favorite-button');
  });
});
