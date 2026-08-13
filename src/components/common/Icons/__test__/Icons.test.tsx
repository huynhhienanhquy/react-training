import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AddIcon from '../AddIcon';
import ArrowDownIcon from '../ArrowDownIcon';
import ArrowRightIcon from '../ArrowRightIcon';
import HeartIcon from '../HeartIcon';
import MapIcon from '../MapIcon';
import MedalIcon from '../MedalIcon';
import MessageIcon from '../MessageIcon';
import MicrophoneIcon from '../MicrophoneIcon';
import PeopleIcon from '../PeopleIcon';
import SearchIcon from '../SearchIcon';
import SendIcon from '../SendIcon';
import SettingsIcon from '../SettingsIcon';
import HotelIcon from '../HotelIcon';

describe('common icons', () => {
  it.each([
    AddIcon, ArrowDownIcon, ArrowRightIcon, HeartIcon, MapIcon, MedalIcon,
    MessageIcon, MicrophoneIcon, PeopleIcon, SearchIcon, SendIcon, SettingsIcon,
  ])('renders an accessible title and custom presentation props', (Icon) => {
    const { unmount } = render(
      <Icon title="Test icon" titleId="test-icon" width={24} height={25} color="red" />,
    );
    expect(screen.getByTitle('Test icon')).toHaveAttribute('id', 'test-icon');
    expect(screen.getByTitle('Test icon').closest('svg')).toHaveAttribute('width', '24');
    unmount();
  });

  it('renders the hotel icon', () => {
    const { container } = render(<HotelIcon className="hotel" />);
    expect(container.querySelector('svg')).toHaveClass('hotel');
  });

  it('renders ArrowRightIcon without an optional title', () => {
    const { container } = render(<ArrowRightIcon />);
    expect(container.querySelector('title')).not.toBeInTheDocument();
  });
});
