import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ItineraryCardWidget } from './ItineraryCardWidget';
import { getItineraries } from '@/services/travelService';


vi.mock('@/services/travelService', () => ({
  getItineraries: vi.fn(),
}));


vi.mock('@/components/common/Button', () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button onClick={onClick}>
      {children}
    </button>
  ),
}));


describe('ItineraryCardWidget', () => {


  beforeEach(() => {
    vi.clearAllMocks();
  });



  it('renders widget title', () => {

    render(
      <ItineraryCardWidget
        itinerary={[]}
      />
    );


    expect(
      screen.getByText('Suggested Itinerary')
    )
      .toBeInTheDocument();

  });



  it('renders itinerary data from props', () => {

    render(
      <ItineraryCardWidget
        itinerary={[
          {
            day: 1,
            dateTitle: 'Paris Adventure',
            activities: [
              {
                id: '1',
                title: 'Visit Eiffel Tower',
                time: '10:00 AM',
                location: 'Paris',
              },
            ],
          },
        ]}
      />
    );


    expect(
      screen.getByText('Paris Adventure')
    )
      .toBeInTheDocument();


    expect(
      screen.getByText('Visit Eiffel Tower')
    )
      .toBeInTheDocument();


    expect(
      screen.getByText('Paris')
    )
      .toBeInTheDocument();


    expect(
      screen.getByText('10:00 AM')
    )
      .toBeInTheDocument();

  });



  it('shows empty message when itinerary is empty', () => {

    render(
      <ItineraryCardWidget
        itinerary={[]}
      />
    );


    expect(
      screen.getByText(
        /No schedule has been created/i
      )
    )
      .toBeInTheDocument();

  });



  it('calls onViewAll when button clicked', async () => {

    const user = userEvent.setup();

    const onViewAll = vi.fn();


    render(
      <ItineraryCardWidget
        itinerary={[]}
        onViewAll={onViewAll}
      />
    );


    await user.click(
      screen.getByText(
        'View Full Itinerary Details'
      )
    );


    expect(onViewAll)
      .toHaveBeenCalledTimes(1);

  });



  it('shows loading when fetching API', () => {


    vi.mocked(getItineraries)
      .mockImplementation(
        () => new Promise(() => {})
      );


    render(
      <ItineraryCardWidget />
    );


    expect(
      screen.getByText(
        /Loading schedule from server/i
      )
    )
      .toBeInTheDocument();

  });



  it('renders itinerary from API', async () => {


    vi.mocked(getItineraries)
      .mockResolvedValue([
        {
          day: 1,
          dateTitle: 'Tokyo Trip',
          activities: [
            {
              id: 'a1',
              title: 'Tokyo Tower',
              time: '09:00',
              location: 'Tokyo',
            },
          ],
        },
      ]);


    render(
      <ItineraryCardWidget />
    );


    expect(
      await screen.findByText(
        'Tokyo Trip'
      )
    )
      .toBeInTheDocument();


    expect(
      screen.getByText(
        'Tokyo Tower'
      )
    )
      .toBeInTheDocument();

  });



  it('shows error when API failed', async () => {


    vi.mocked(getItineraries)
      .mockRejectedValue(
        new Error('Server error')
      );


    render(
      <ItineraryCardWidget />
    );


    expect(
      await screen.findByText(
        'Server error'
      )
    )
      .toBeInTheDocument();

  });

});
