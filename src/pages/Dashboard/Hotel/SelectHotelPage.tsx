import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { SidebarNav } from '../../../components/SectionChatPage/SidebarNav';
import { Topbar, type ChatMessage } from '../../../components/SectionChatPage/Topbar';
import { SectionHeader } from '../../../components/SectionHeader/SectionHeader';
import { getHotelDetailsApi } from '../../../services/hotelService';
import type { HotelData } from '../../../types/hotel';

import defaultHotelImg from '../../../assets/icons/ellipse.png';
import bookingIcon from '../../../assets/icons/booking.png';
import expediaIcon from '../../../assets/icons/expedia.png';

interface SelectHotelPageProps {
  chatTitle?: string;
  messages?: ChatMessage[];
  onBackToChat?: () => void;
  onStartNewChat?: () => void;
  onSelectHotel?: (hotel: HotelData) => void;
}

export const SelectHotelPage = ({
  chatTitle,
  messages = [],
  onBackToChat,
  onStartNewChat,
  onSelectHotel,
}: SelectHotelPageProps) => {
  const [activeNav, setActiveNav] = useState('chats');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isComparePrice, setIsComparePrice] = useState(false);

  // State manages the hotel listing data.
  const [hotelList, setHotelList] = useState<HotelData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieving API data when a component is mounted.
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        const rawData = await getHotelDetailsApi();
        let dataList: HotelData[] = Array.isArray(rawData) ? rawData : [rawData];

        // SYNCHRONIZE: Read selected data from LocalStorage (if available) to prioritize it at the top.
        const savedHotelJson = localStorage.getItem('selectedHotel');
        if (savedHotelJson) {
          try {
            const savedHotel: HotelData = JSON.parse(savedHotelJson);
            if (savedHotel && savedHotel.hotelName) {
              dataList = [savedHotel, ...dataList.filter((h) => h.id !== savedHotel.id)];
            }
          } catch (e) {
            console.error('Error parsing saved hotel:', e);
          }
        }

        if (dataList.length > 0) {
          setHotelList(dataList);
        } else {
          setError('No matching hotel data available.');
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || err.message || 'Server connection error');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unable to retrieve hotel data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Handle the Topbar header display similarly to SelectFarePage.
  const firstUserMessage = messages.find((m) => m.sender === 'user')?.text;
  const resolvedChatTitle =
    chatTitle ||
    firstUserMessage ||
    'Other available accommodations';

  // Handling when clicking "Book Hotel"
  const handleBookHotel = (e: React.MouseEvent, selectedHotel: HotelData) => {
    e.stopPropagation();
    localStorage.setItem('selectedHotel', JSON.stringify(selectedHotel));

    if (onSelectHotel) {
      onSelectHotel(selectedHotel);
    } else {
      alert(`The hotel you have chosen: ${selectedHotel.hotelName || 'Hotel'}`);
    }
  };

  return (
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      {/* 1. Sidebar Navigation  */}
      <SidebarNav
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobileOpen={isMobileOpen}
        onMobileToggle={() => setIsMobileOpen(!isMobileOpen)}
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
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition cursor-pointer"
              >
                Retry
              </button>
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
                  <button
                    onClick={onBackToChat}
                    className="md:hidden p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
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
                  </button>
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
              {hotelList.map((hotel, index) => {
                const hotelImage = hotel.coverImage || hotel.images?.[0] || defaultHotelImg;
                const mainPrice = hotel.priceBreakdown?.roomRate || hotel.roomOptions?.[0]?.price || 1200;

                return (
                  <div
                    key={hotel.id || index}
                    className="bg-white rounded-[28px] p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-stretch gap-6"
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
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F0C3B] tracking-tight truncate">
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
                              <span className="font-semibold text-[#0F0C3B]">Booking.com</span>
                            </div>
                            <span className="font-bold text-[#0F0C3B]">${mainPrice}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={expediaIcon}
                                alt="Expedia"
                                className="w-4 h-4 object-contain rounded-xs shrink-0"
                              />
                              <span className="font-semibold text-[#0F0C3B]">Expedia</span>
                            </div>
                            <span className="font-bold text-[#0F0C3B]">${mainPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price column & Booking button on the right */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200/60 md:pl-8 shrink-0 min-w-[160px]">
                      <span className="text-2xl sm:text-3xl font-black text-[#0F0C3B] tracking-tight">
                        ${mainPrice}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleBookHotel(e, hotel)}
                        className="px-6 py-3 bg-[#EAF1FF] hover:bg-blue-100 text-[#2563EB] font-bold text-xs sm:text-sm rounded-2xl transition-colors duration-150 active:scale-95 cursor-pointer"
                      >
                        Book Hotel
                      </button>
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
