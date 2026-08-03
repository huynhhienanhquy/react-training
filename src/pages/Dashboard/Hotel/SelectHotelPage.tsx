import React, { useCallback, useState } from 'react';

import { SidebarNav } from '@/components/chat/SidebarNav';
import { Topbar } from '@/components/chat/Topbar';
import { SectionHeader } from '@/components/FlightFare/SectionHeader';

import { getHotelDetailsApi } from '@/services/hotelService';
import { Button } from '@/components/Button';

import type {
  HotelData,
  SelectHotelPageProps,
} from '@/types/hotel';

import defaultHotelImg from '@/assets/icons/ellipse.png';
import bookingIcon from '@/assets/icons/booking.png';
import expediaIcon from '@/assets/icons/expedia.png';

import { useAsyncData } from '@/hooks/useAsyncData';
import { useSidebarNav } from '@/hooks/useSidebarNav';
import { useChatTitle } from '@/hooks/useChatTitle';
import { useSelectedHotel, getSavedHotel } from '@/hooks/useSelectedHotel';

export const SelectHotelPage = ({
  chatTitle,
  messages = [],
  onBackToChat,
  onStartNewChat,
  onSelectHotel,
}: SelectHotelPageProps) => {
  const { activeNav, setActiveNav, isMobileOpen, onMobileToggle } =
    useSidebarNav();
  const [isComparePrice, setIsComparePrice] = useState(false);

  const { selectHotel } = useSelectedHotel();

  // Fetch hotel data
  const fetchHotels = useCallback(
    async (): Promise<HotelData[]> => {
      const rawData = await getHotelDetailsApi();

      let dataList: HotelData[] = Array.isArray(rawData)
        ? rawData
        : [rawData];

      //Synchronize with LocalStorage.If a hotel was previously selected,move it to the top of the list.
      const savedHotel = getSavedHotel();

      if (savedHotel?.hotelName) {
        dataList = [
          savedHotel,
          ...dataList.filter(
            (hotel) => hotel.id !== savedHotel.id,
          ),
        ];
      }

      if (dataList.length === 0) {
        throw new Error(
          'No matching hotel data available.',
        );
      }

      return dataList;
    },
    [],
  );

  const {
    data: hotelData,
    loading,
    error,
  } = useAsyncData<HotelData[]>(fetchHotels);

  const hotelList = hotelData ?? [];

  // Handle the Topbar header display
  const resolvedChatTitle = useChatTitle(
    chatTitle,
    messages,
    'Other available accommodations',
  );

  // Handling when clicking "Book Hotel"
  const handleBookHotel = (
    e: React.MouseEvent,
    selectedHotel: HotelData,
  ) => {
    e.stopPropagation();

    selectHotel(selectedHotel);

    if (onSelectHotel) {
      onSelectHotel(selectedHotel);
    } else {
      alert(
        `The hotel you have chosen: ${
          selectedHotel.hotelName || 'Hotel'
        }`,
      );
    }
  };

  return (
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      {/* 1. Sidebar Navigation  */}
      <SidebarNav
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobileOpen={isMobileOpen}
        onMobileToggle={onMobileToggle}
      />

      {/* 2. Main Content */}
      <main className="flex-1 bg-surface-section flex flex-col h-full overflow-y-auto">
        {/* Topbar */}
        <Topbar
          isBreadcrumbMode={true}
          chatTitle={resolvedChatTitle}
          messages={messages}
          onBackToChat={onBackToChat}
          onNewChat={onStartNewChat}
        />

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
                onClick={() => window.location.reload()}
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
            <div className="flex items-center justify-between pb-2 gap-4">
              <div className="flex items-center gap-2">
                {/* The Back button is dedicated to mobile devices. */}
                {onBackToChat && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="none"
                    className="md:hidden p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-200/60 active:scale-95"
                    onClick={onBackToChat}
                    aria-label="Go back to chat"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button>
                )}

                <SectionHeader title="Other available accommodations" />
              </div>

              {/* Compare Price Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none shrink-0">
                <input
                  type="checkbox"
                  checked={isComparePrice}
                  onChange={(e) => setIsComparePrice(e.target.checked)}
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
                const hotelImage = hotel.coverImage || hotel.images?.[0] || defaultHotelImg;
                const mainPrice = hotel.priceBreakdown?.roomRate || hotel.roomOptions?.[0]?.price || 1200;

                return (
                  <div
                    key={hotel.id }
                    className="bg-white rounded-card p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-stretch gap-6"
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
                          <h3 className="text-xl sm:text-2xl font-extrabold text-ink-alt tracking-tight truncate">
                            {hotel.hotelName || 'Five Star Hotel, Lagos'}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wide mt-1">
                            {hotel.location || hotel.address || 'IKEJA, LAGOS'}
                          </p>
                        </div>

                        {/* Comparison table of source options */}
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
                      </div>
                    </div>

                    {/* Price column & Booking button on the right */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200/60 md:pl-8 shrink-0 min-w-160">
                      <span className="text-2xl sm:text-3xl font-black text-ink-alt tracking-tight">
                        ${mainPrice}
                      </span>

                      <Button
                        type="button"
                        variant="light"
                        size="none"
                        className="px-6 py-3 bg-primary-soft text-primary-strong text-xs sm:text-sm rounded-2xl"
                        onClick={(e) => handleBookHotel(e, hotel)}
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
      </main>
    </div>
  );
};
