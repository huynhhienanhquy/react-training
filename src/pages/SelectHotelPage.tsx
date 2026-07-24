import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { SidebarNav } from '../components/chat/SidebarNav';
import { Topbar, type ChatMessage } from '../components/chat/Topbar';
import { SectionHeader } from '../components/ui/SectionHeader';
import { getHotelDetailsApi, type HotelData } from '../services/hotelService';

interface SelectHotelPageProps {
  chatTitle?: string;
  messages?: ChatMessage[];
  onBackToChat?: () => void;
  onStartNewChat?: () => void;
}

export const SelectHotelPage: React.FC<SelectHotelPageProps> = ({
  chatTitle,
  messages = [],
  onBackToChat,
  onStartNewChat,
}) => {
  const [activeNav, setActiveNav] = useState('chats');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('standard');

  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        setError(null);

        const rawData = await getHotelDetailsApi();
        const data = Array.isArray(rawData) ? rawData[0] : rawData;

        if (data) {
          setHotelData(data);
          if (data.roomOptions?.[0]?.id) {
            setSelectedRoomId(data.roomOptions[0].id);
          }
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

    fetchHotel();
  }, []);

  const roomOptions = hotelData?.roomOptions || [];
  const selectedRoom = roomOptions.find((r) => r.id === selectedRoomId) || roomOptions[0];

  const priceBreakdown = hotelData?.priceBreakdown || { roomRate: 0, taxesAndFees: 0 };
  const totalAmount = selectedRoom ? selectedRoom.price + priceBreakdown.taxesAndFees : 0;

  return (
    <div className="bg-slate-100 font-helvetica text-slate-700 h-screen overflow-hidden flex antialiased">
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="flex-1 bg-surface-section flex flex-col h-full overflow-y-auto">
        <Topbar
          isBreadcrumbMode={true}
          chatTitle={chatTitle || hotelData?.hotelName || 'Hotel Booking'}
          messages={messages}
          onBackToChat={onBackToChat}
          onNewChat={onStartNewChat}
        />

        {loading && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-500">Loading hotel information...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 max-w-md text-center">
              <p className="font-semibold">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && hotelData && selectedRoom && (
          <div className="max-w-6xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Hotel Information & Room Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hotel Header */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Hotel Stay
                </span>
                <h1 className="text-2xl font-bold text-slate-900">{hotelData.hotelName}</h1>
                <p className="text-sm text-slate-500">📍 {hotelData.address || hotelData.location}</p>
                <div className="flex items-center gap-2 pt-2 text-sm">
                  <span className="font-bold text-amber-500">⭐ {hotelData.rating}</span>
                  <span className="text-slate-400">({hotelData.reviewCount} Evaluate)</span>
                </div>
              </div>

              {/* Select Room Section */}
              <div className="space-y-3">
                <SectionHeader title="Select Room Class" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roomOptions.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-slate-900">{room.name}</h3>
                          <span className="text-lg font-bold text-blue-600">${room.price}</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">🛏️ {room.bedType} • 👥 Max {room.maxGuests} guests</p>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {(room.features || []).map((feat, idx) => (
                            <li key={idx}>✓ {feat}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Important Info */}
              <div className="space-y-3 pt-2">
                <SectionHeader title="Important Information" />
                <div className="bg-white p-6 rounded-3xl border border-slate-100 text-xs text-slate-500 space-y-2">
                  {(hotelData.importantInformation || []).map((info, idx) => (
                    <p key={idx}>{info}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Billing Sheet*/}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">Price Details</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Room Rate ({selectedRoom.name})</span>
                    <span className="font-semibold text-slate-800">${selectedRoom.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span className="font-semibold text-slate-800">${priceBreakdown.taxesAndFees}</span>
                  </div>
                </div>
                <div className="border-t pt-3 flex justify-between items-center text-slate-900">
                  <span className="font-bold text-base">Total Amount</span>
                  <span className="font-bold text-xl text-blue-600">${totalAmount}</span>
                </div>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition">
                  Confirm Hotel Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
