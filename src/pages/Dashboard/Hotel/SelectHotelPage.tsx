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
import bookingIcon from '@/assets/images/booking-logo.png';
import expediaIcon from '@/assets/images/expedia-logo.png';

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
  const navigateBackToChat = useCallback(() => navigate('/chats'), [navigate]);
  const handleBackToChat = onBackToChat ?? navigateBackToChat;
  const handleStartNewChat = onStartNewChat ?? navigateBackToChat;
  const [isComparePrice, setIsComparePrice] = useState(false);

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
      alert(
        `The hotel you have chosen: ${
          selectedHotel.hotelName || 'Hotel'
        }`,
      );
    }
  }, [onSelectHotel]);

  const handleRetry = useCallback(() => window.location.reload(), []);
  const handleComparePriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComparePrice(event.target.checked);
  }, []);
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

            {/* HEADER SECTION:*/}
            <div className="flex flex-col items-start gap-3 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <SectionHeader title="Other available accommodations" />
              </div>

              {/* Compare Price Checkbox */}
              <label className="flex shrink-0 cursor-pointer select-none items-center gap-2 self-end sm:self-auto">
                <input
                  type="checkbox"
                  checked={isComparePrice}
                  onChange={handleComparePriceChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  Compare price
                </span>
              </label>
            </div>

            {/* LIST ACCOMMODATIONS */}
            <div className="space-y-4">
              {hotelList.map((hotel) => {
                const hotelImage = hotel.coverImage || hotel.images?.[0] || defaultHotelImage;
                const mainPrice = hotel.priceBreakdown?.roomRate || hotel.roomOptions?.[0]?.price || 1200;

                return (
                  <div
                    key={hotel.id }
                    className="flex flex-col items-stretch gap-5 rounded-card border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5 md:flex-row md:gap-6 md:p-6"
                  >
                    {/* Information on the left */}
                    <div className="flex flex-1 flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 min-w-0">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shrink-0 bg-slate-200 shadow-xs">
                        <img
                          src={hotelImage}
                          alt={hotel.hotelName || 'Hotel'}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-4 w-full">
                        <div>
                          <h3 className="truncate text-xl font-bold tracking-tight text-ink-alt sm:text-2xl">
                            {hotel.hotelName || 'Five Star Hotel, Lagos'}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wide mt-1">
                            {hotel.location || hotel.address || 'IKEJA, LAGOS'}
                          </p>
                        </div>

                        {/* Comparison table of source options */}
                        {isComparePrice && (
                        <div className="space-y-3 pt-1">
                          <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={bookingIcon}
                                alt="Booking.com"
                                className="w-4 h-4 object-contain rounded-xs shrink-0"
                              />
                              <span className="font-semibold text-ink-alt">Booking.com</span>
                            </div>
                            <span className="font-bold text-ink-alt">${mainPrice}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={expediaIcon}
                                alt="Expedia"
                                className="w-4 h-4 object-contain rounded-xs shrink-0"
                              />
                              <span className="font-semibold text-ink-alt">Expedia</span>
                            </div>
                            <span className="font-bold text-ink-alt">${mainPrice}</span>
                          </div>
                        </div>
                        )}
                      </div>
                    </div>

                    {/* Price column & Booking button on the right */}
                    <div className="flex shrink-0 flex-col items-stretch justify-between gap-3 border-t border-slate-200/60 pt-4 sm:flex-row sm:items-center md:min-w-160 md:flex-col md:items-end md:justify-center md:gap-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      <span className="text-2xl font-bold tracking-tight text-ink-alt sm:text-3xl">
                        ${mainPrice}
                      </span>

                      <Button
                        type="button"
                        variant="light"
                        size="none"
                        className="w-full rounded-2xl bg-primary-soft px-6 py-3 text-xs text-primary-strong sm:w-auto sm:text-sm"
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
