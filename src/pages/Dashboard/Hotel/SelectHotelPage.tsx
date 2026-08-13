import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SectionHeader } from '@/components/features/flights/SectionHeader';

import { getHotels } from '@/services/hotelService';
import { Button } from '@/components/common/Button';

import type {
  HotelData,
  SelectHotelPageProps,
} from '@/types/hotel';

import defaultHotelImage from '@/assets/images/travel-provider-logo.png';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useChatTitle } from '@/hooks/useChatTitle';
import { DashboardPageLayout } from '@/components/layouts/DashboardLayout';

export const SelectHotelPage = ({
  chatTitle,
  messages = [],
  onBackToChat,
  onStartNewChat,
  onSelectHotel,
  selectedHotel,
}: SelectHotelPageProps) => {
  const navigate = useNavigate();
  const [bookingMessage, setBookingMessage] = useState('');
  const navigateBackToChat = useCallback(() => navigate('/chats'), [navigate]);
  const handleBackToChat = onBackToChat ?? navigateBackToChat;
  const handleStartNewChat = onStartNewChat ?? navigateBackToChat;

  // Fetch hotel data
  const fetchHotels = useCallback(
    async (): Promise<HotelData[]> => {
      let hotels = await getHotels();

      if (selectedHotel?.id) {
        hotels = [
          selectedHotel,
          ...hotels.filter(
            (hotel) => hotel.id !== selectedHotel.id,
          ),
        ];
      }

      if (hotels.length === 0) {
        throw new Error(
          'No matching hotel data available.',
        );
      }

      return hotels;
    },
    [selectedHotel],
  );

  const {
    data: hotelData,
    loading,
    error,
  } = useAsyncData<HotelData[]>(fetchHotels);

  const hotelList = useMemo(() => hotelData ?? [], [hotelData]);

  // Handle the Topbar header display
  const resolvedChatTitle = useChatTitle(
    chatTitle,
    messages,
    'Other available accommodations',
  );

  // Handling when clicking "Book Hotel"
  const handleBookHotel = useCallback((
    e: React.MouseEvent,
    selectedHotel: HotelData,
  ) => {
    e.stopPropagation();

    if (onSelectHotel) {
      onSelectHotel(selectedHotel);
    } else {
      setBookingMessage(
        `Selected hotel: ${selectedHotel.hotelName || 'Hotel'}`,
      );
    }
  }, [onSelectHotel]);

  const handleRetry = useCallback(() => window.location.reload(), []);
  const createBookHotelHandler = useCallback(
    (hotel: HotelData) => (event: React.MouseEvent) => handleBookHotel(event, hotel),
    [handleBookHotel],
  );

  return (
      <DashboardPageLayout
        scrollable
        isBreadcrumbMode
        breadcrumbLabel="Select Hotel"
        chatTitle={resolvedChatTitle}
        messages={messages}
        onBackToChat={handleBackToChat}
        onNewChat={handleStartNewChat}
      >
        {/* LOADING STATE */}
        {loading && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-500">Loading accommodation list...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 max-w-md text-center">
              <p className="font-semibold">{error}</p>
              <Button
                type="button"
                variant="danger"
                size="sm"
                className="mt-4"
                onClick={handleRetry}
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* MAIN DATA GRID  */}
        {!loading && !error && (
          <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">

            {bookingMessage && (
              <p
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
              >
                {bookingMessage}
              </p>
            )}

            {/* HEADER SECTION:*/}
            <div className="pb-2">
              <div className="min-w-0">
                <SectionHeader title="Other available accommodations" />
              </div>
            </div>

            {/* LIST ACCOMMODATIONS */}
            <div className="space-y-4">
              {hotelList.map((hotel) => {
                const hotelImage = hotel.coverImage || hotel.images?.[0] || defaultHotelImage;
                const mainPrice = hotel.priceBreakdown?.roomRate || hotel.roomOptions?.[0]?.price || 1200;

                return (
                  <div
                    key={hotel.id }
                    className="flex h-auto w-full min-w-0 flex-col items-stretch gap-5 rounded-2xl bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5 md:p-6 desktop:h-select-hotel-card desktop:w-select-hotel-card desktop:flex-row desktop:gap-6"
                  >
                    {/* Information on the left */}
                    <div className="flex min-w-0 flex-1 flex-col items-stretch gap-5 sm:flex-row sm:items-start md:gap-6">
                      <div className="h-44 w-full shrink-0 overflow-hidden rounded-lg bg-slate-200 shadow-xs sm:h-36 sm:w-36 desktop:h-[179px] desktop:w-[179px]">
                        <img
                          src={hotelImage}
                          alt={hotel.hotelName || 'Hotel'}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-full min-w-0 flex-1 pt-1">
                        <div>
                          <h3 className="truncate text-xl font-bold tracking-tight text-ink-alt sm:text-2xl">
                            {hotel.hotelName || 'Five Star Hotel, Lagos'}
                          </h3>
                          <p className="mt-2 text-xs font-medium uppercase text-slate-500 sm:text-base">
                            {hotel.location || hotel.address || 'IKEJA, LAGOS'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price column & Booking button on the right */}
                    <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-slate-200/60 pt-4 desktop:w-[126px] desktop:flex-col desktop:items-end desktop:justify-end desktop:border-l desktop:border-t-0 desktop:pl-4 desktop:pt-0">
                      <span className="text-[24px] font-bold tracking-tight text-ink-alt">
                        ${mainPrice}
                      </span>

                      <Button
                        type="button"
                        variant="light"
                        size="none"
                        className="h-12 w-[110px] rounded-xl bg-primary-soft px-4 text-[16px] font-medium text-primary-strong"
                        onClick={createBookHotelHandler(hotel)}
                      >
                        Book Hotel
                      </Button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}
      </DashboardPageLayout>
  );
};
