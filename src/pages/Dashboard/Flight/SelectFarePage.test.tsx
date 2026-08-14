import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SelectFarePage } from './SelectFarePage';

import { useAsyncData } from '@/hooks/useAsyncData';
import { toast } from '@/services/toast';

import type { FareData } from '@/types/flight';

const mockNavigate = vi.fn();
const mockRefetch = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@/hooks/useAsyncData', () => ({
  useAsyncData: vi.fn(),
}));

vi.mock('@/hooks/useChatTitle', () => ({
  useChatTitle: (
    chatTitle: string | undefined,
    _messages: unknown[],
    fallbackTitle: string,
  ) => chatTitle || fallbackTitle,
}));

vi.mock('@/services/toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
    dismiss: vi.fn(),
  },
}));

vi.mock('@/components/layouts/DashboardLayout', () => ({
  DashboardPageLayout: ({
    children,
    chatTitle,
    breadcrumbLabel,
    onBackToChat,
    onNewChat,
  }: {
    children: React.ReactNode;
    chatTitle: string;
    breadcrumbLabel: string;
    onBackToChat: () => void;
    onNewChat: () => void;
  }) => (
    <div>
      <h1>{chatTitle}</h1>
      <p>{breadcrumbLabel}</p>

      <button type="button" onClick={onBackToChat}>
        Back to chat
      </button>

      <button type="button" onClick={onNewChat}>
        New chat
      </button>

      {children}
    </div>
  ),
}));

vi.mock('@/components/features/flights/FareHeader', () => ({
  FareHeader: ({
    destination,
    price,
  }: {
    destination: string;
    price: number;
  }) => (
    <div>
      <span>{destination}</span>
      <span>Fare price: {price}</span>
    </div>
  ),
}));

vi.mock('@/components/features/flights/SelectedFlightBox', () => ({
  SelectedFlightBox: ({
    airlineName,
  }: {
    airlineName: string;
  }) => <div>{airlineName}</div>,
}));

vi.mock('@/components/features/flights/FareCards', () => ({
  FareCards: ({
    selectedFareId,
    onSelectFare,
  }: {
    selectedFareId: string;
    onSelectFare: (id: string) => void;
  }) => (
    <div>
      <span>Selected fare: {selectedFareId}</span>

      <button
        type="button"
        onClick={() => onSelectFare('economy')}
      >
        Select Economy
      </button>

      <button
        type="button"
        onClick={() => onSelectFare('business')}
      >
        Select Business
      </button>
    </div>
  ),
}));

vi.mock('@/components/features/flights/PriceDetailsSidebar', () => ({
  PriceDetailsSidebar: ({
    totalAmount,
  }: {
    totalAmount: number;
  }) => <div>Total amount: {totalAmount}</div>,
}));

vi.mock('@/components/features/flights/SectionHeader', () => ({
  SectionHeader: ({ title }: { title: string }) => (
    <h2>{title}</h2>
  ),
}));

const fareData: FareData = {
  id: 'flight-1',
  destination: 'Lagos - London',
  tripType: 'Round trip',
  cabinClass: 'Economy',
  airlineName: 'Test Airline',
  priceUnit: 'per traveller',
  cancellationPolicy: 'Non-refundable',
  legs: [],
  fareOptions: [
    {
      id: 'economy',
      name: 'Economy',
      airline: 'Test Airline',
      features: ['Carry-on baggage'],
      price: 1000,
    },
    {
      id: 'business',
      name: 'Business',
      airline: 'Test Airline',
      features: ['Lounge access'],
      price: 2000,
    },
  ],
  priceBreakdown: {
    flightDues: 100,
    taxesAndFees: 50,
  },
  importantInformation: [
    'Passport is required.',
    'Arrive two hours before departure.',
  ],
};

const mockUseAsyncData = vi.mocked(useAsyncData);
const mockToastInfo = vi.mocked(toast.info);
const mockToastSuccess = vi.mocked(toast.success);

describe('SelectFarePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseAsyncData.mockReturnValue({
      data: fareData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });
  });

  it('renders loading state', () => {
    mockUseAsyncData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: mockRefetch,
    });

    render(<SelectFarePage messages={[]} />);

    expect(
      screen.getByText('Loading flight information...'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Test Airline'),
    ).not.toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseAsyncData.mockReturnValue({
      data: null,
      loading: false,
      error: 'Unable to load flight information.',
      refetch: mockRefetch,
    });

    render(<SelectFarePage messages={[]} />);

    expect(
      screen.getByText('Unable to load flight information.'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Retry' }),
    ).toBeInTheDocument();
  });

  it('calls refetch and shows info toast when retry is clicked', () => {
    mockUseAsyncData.mockReturnValue({
      data: null,
      loading: false,
      error: 'Unable to load flight information.',
      refetch: mockRefetch,
    });

    render(<SelectFarePage messages={[]} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Retry' }),
    );

    expect(mockToastInfo).toHaveBeenCalledWith(
      'Reloading flight information...',
    );
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders economy fare by default', () => {
    render(<SelectFarePage messages={[]} />);

    expect(
      screen.getByText('Cheap flights to Lagos'),
    ).toBeInTheDocument();

    expect(screen.getByText('Select Fare')).toBeInTheDocument();
    expect(screen.getByText('Test Airline')).toBeInTheDocument();

    expect(
      screen.getByText('Selected fare: economy'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Fare price: 1000'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Total amount: 1150'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Passport is required.'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Arrive two hours before departure.'),
    ).toBeInTheDocument();
  });

  it('selects business fare and shows success toast', () => {
    render(<SelectFarePage messages={[]} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Select Business',
      }),
    );

    expect(
      screen.getByText('Selected fare: business'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Fare price: 2000'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Total amount: 2150'),
    ).toBeInTheDocument();

    expect(mockToastSuccess).toHaveBeenCalledWith(
      'Selected Business fare',
    );
  });

  it('selects economy fare and shows success toast', () => {
    render(<SelectFarePage messages={[]} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Select Economy',
      }),
    );

    expect(mockToastSuccess).toHaveBeenCalledWith(
      'Selected Economy fare',
    );
  });

  it('uses provided chat title', () => {
    render(
      <SelectFarePage
        chatTitle="My flight"
        messages={[]}
      />,
    );

    expect(screen.getByText('My flight')).toBeInTheDocument();
  });

  it('calls provided back handler', () => {
    const onBackToChat = vi.fn();

    render(
      <SelectFarePage
        messages={[]}
        onBackToChat={onBackToChat}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Back to chat',
      }),
    );

    expect(onBackToChat).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to chats when default back handler is used', () => {
    render(<SelectFarePage messages={[]} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Back to chat',
      }),
    );

    expect(mockNavigate).toHaveBeenCalledWith('/chats');
  });

  it('navigates to chats when new chat is clicked', () => {
    render(<SelectFarePage messages={[]} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'New chat',
      }),
    );

    expect(mockNavigate).toHaveBeenCalledWith('/chats');
  });

  it('does not render main content when fare data is null', () => {
    mockUseAsyncData.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<SelectFarePage messages={[]} />);

    expect(
      screen.queryByText('Test Airline'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText('Important information'),
    ).not.toBeInTheDocument();
  });
});
