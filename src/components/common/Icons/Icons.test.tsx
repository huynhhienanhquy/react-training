import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AddIcon from './AddIcon';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowRightIcon from './ArrowRightIcon';
import HeartIcon from './HeartIcon';
import HotelIcon from './HotelIcon';
import MapIcon from './MapIcon';
import MedalIcon from './MedalIcon';
import MessageIcon from './MessageIcon';
import MicrophoneIcon from './MicrophoneIcon';
import PeopleIcon from './PeopleIcon';
import SearchIcon from './SearchIcon';
import SendIcon from './SendIcon';
import SettingsIcon from './SettingsIcon';
import { Icon } from './Icon';

const titledIcons = [
  AddIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  HeartIcon,
  MapIcon,
  MedalIcon,
  MessageIcon,
  MicrophoneIcon,
  PeopleIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
];

describe('common icons', () => {
  it.each(titledIcons)('renders an accessible title and custom presentation props', (TitledIcon) => {
    render(
      <TitledIcon
        title="Descriptive icon"
        titleId="icon-title"
        width={20}
        height={18}
        color="red"
      />,
    );

    expect(screen.getByTitle('Descriptive icon')).toHaveAttribute('id', 'icon-title');
  });

  it('renders simple SVG icons', () => {
    const { container } = render(<HotelIcon className="hotel-icon" />);
    expect(container.querySelector('.hotel-icon')).toBeInTheDocument();
  });

  it.each(['arrow-left', 'arrow-right', 'eye', 'eye-off', 'spinner'] as const)(
    'renders the %s generic icon',
    (name) => {
      const { container } = render(
        <Icon name={name} width={16} height={17} color="blue" data-testid={name} />,
      );
      expect(container.querySelector(`[data-testid="${name}"]`)).toBeInTheDocument();
    },
  );
});
