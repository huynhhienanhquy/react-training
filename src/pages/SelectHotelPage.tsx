import React, { useState } from 'react';
import { SidebarNav } from '../components/chat/SidebarNav';
import { Topbar } from '../components/chat/Topbar';
import { BookButton } from '../components/ui/button/BookButton';

// Provider option data structure
interface ProviderOption {
  name: string;
  price: string;
  iconBgColor: string;
  logoLetter: string;
}

// Accommodation item interface
interface AccommodationItem {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  bestPrice: string;
  providers: ProviderOption[];
}

interface SelectHotelPageProps {
  onBackToChat?: () => void;
  onStartNewChat?: () => void;
  onBookHotel?: (hotelId: string, providerName: string) => void;
}

// Mock dataset matching UI design
const ACCOMMODATION_LIST: AccommodationItem[] = [
  {
    id: 'hotel-1',
    name: 'Five Star Hotel, Lagos',
    location: 'IKEJA, LAGOS',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
    bestPrice: '$1200',
    providers: [
      { name: 'Booking.com', price: '$1200', iconBgColor: 'bg-[#003580]', logoLetter: 'B' },
      { name: 'Expedia', price: '$1200', iconBgColor: 'bg-[#FFCC00] text-black', logoLetter: '↗' },
    ],
  },
  {
    id: 'hotel-2',
    name: 'Five Star Hotel, Lagos',
    location: 'IKEJA, LAGOS',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    bestPrice: '$1200',
    providers: [
      { name: 'Booking.com', price: '$1200', iconBgColor: 'bg-[#003580]', logoLetter: 'B' },
      { name: 'Expedia', price: '$1200', iconBgColor: 'bg-[#FFCC00] text-black', logoLetter: '↗' },
    ],
  },
  {
    id: 'hotel-3',
    name: 'Five Star Hotel, Lagos',
    location: 'IKEJA, LAGOS',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    bestPrice: '$1200',
    providers: [
      { name: 'Booking.com', price: '$1200', iconBgColor: 'bg-[#003580]', logoLetter: 'B' },
      { name: 'Expedia', price: '$1200', iconBgColor: 'bg-[#FFCC00] text-black', logoLetter: '↗' },
    ],
  },
  {
    id: 'hotel-4',
    name: 'Five Star Hotel, Lagos',
    location: 'IKEJA, LAGOS',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    bestPrice: '$1200',
    providers: [
      { name: 'Booking.com', price: '$1200', iconBgColor: 'bg-[#003580]', logoLetter: 'B' },
      { name: 'Expedia', price: '$1200', iconBgColor: 'bg-[#FFCC00] text-black', logoLetter: '↗' },
    ],
  },
];

export const SelectHotelPage: React.FC<SelectHotelPageProps> = ({
  onBackToChat,
  onStartNewChat,
  onBookHotel,
}) => {
  const [activeNav, setActiveNav] = useState('chats');
  const [comparePrice, setComparePrice] = useState(false);

  return (
    <div className="bg-[#EEF2FF]/60 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      {/* Sidebar Navigation */}
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Topbar with Breadcrumb Navigation */}
        <Topbar
          isBreadcrumbMode={true}
          chatTitle="Cheap flights to Lagos"
          onBackToChat={onBackToChat}
          onNewChat={onStartNewChat}
        />

        {/* Main Layout Container */}
        <div className="max-w-4xl w-full mx-auto px-6 py-8 space-y-6">
          {/* Header Bar: Title & Compare Price Checkbox */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-base font-bold text-[#1E1B4B]">
              Other available accommodations
            </h2>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={comparePrice}
                onChange={(e) => setComparePrice(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Compare price</span>
            </label>
          </div>

          {/* Cards List matching UI design */}
          <div className="space-y-5">
            {ACCOMMODATION_LIST.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl p-5 flex flex-col sm:flex-row items-stretch justify-between shadow-xs border border-slate-100/60 overflow-hidden"
              >
                {/* Left Section: Square Image & Hotel Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 pr-0 sm:pr-6">
                  {/* Square Hotel Thumbnail */}
                  <div className="w-full sm:w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Hotel Info & Providers List */}
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <h3 className="text-lg font-bold text-[#1E1B4B] tracking-tight">
                        {hotel.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400 tracking-wider mt-0.5">
                        {hotel.location}
                      </p>
                    </div>

                    {/* Booking Providers Rates */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100/80 w-full max-w-md">
                      {hotel.providers.map((prov, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer hover:opacity-80 transition"
                          onClick={() => onBookHotel?.(hotel.id, prov.name)}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${prov.iconBgColor}`}
                            >
                              {prov.logoLetter}
                            </span>
                            <span className="text-slate-800 font-semibold">{prov.name}</span>
                          </div>
                          <span className="font-bold text-slate-900">{prov.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Section: Featured Price & Primary Action CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-center w-full sm:w-36 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-100/80 sm:pl-6 shrink-0 gap-3">
                  <span className="text-2xl font-black text-[#1E1B4B] tracking-tight">
                    {hotel.bestPrice}
                  </span>

                  <BookButton
                    variant="wide"
                    onClick={() => onBookHotel?.(hotel.id, hotel.providers[0]?.name || 'Direct')}
                  >
                    Book Hotel
                  </BookButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
