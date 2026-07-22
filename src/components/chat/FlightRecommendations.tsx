// src/components/chat/FlightRecommendations.tsx
import React, { useState } from 'react';

// 🔹 Import icon local từ folder assets
import iconHeart from '../../assets/icons/heart-blue.png';
import defaultFlightLogo from '../../assets/icons/ellipse.png'; // Hoặc icon hãng máy bay trong folder của bạn

export interface FlightLeg {
  time: string;       // "9:15am - 9:15pm"
  route: string;      // "QOW - LAG"
  duration: string;   // "9h 24m"
  stops: string;      // "1 stop"
}

export interface FlightOption {
  id: string;
  airline: string;
  logoUrl?: string;
  outbound: FlightLeg;
  returnLeg: FlightLeg;
  price: string;      // "$1200"
  tag?: string;        // "Cheap"
  isFavorite?: boolean;
}

interface FlightRecommendationsProps {
  title?: string;
  flights?: FlightOption[];
  onBookNow?: (flightId: string) => void;
}

const DEFAULT_FLIGHTS: FlightOption[] = [
  {
    id: '1',
    airline: 'AirPeace Airways, Nigerian',
    outbound: {
      time: '9:15am - 9:15pm',
      route: 'QOW - LAG',
      duration: '9h 24m',
      stops: '1 stop',
    },
    returnLeg: {
      time: '4:25am - 10:20pm',
      route: 'LAG - QOW',
      duration: '9h 24m',
      stops: '1 stop',
    },
    price: '$1200',
    tag: 'Cheap',
  },
  {
    id: '2',
    airline: 'AirPeace Airways, Nigerian',
    outbound: {
      time: '9:15am - 9:15pm',
      route: 'QOW - LAG',
      duration: '9h 24m',
      stops: '1 stop',
    },
    returnLeg: {
      time: '4:25am - 10:20pm',
      route: 'LAG - QOW',
      duration: '9h 24m',
      stops: '1 stop',
    },
    price: '$1200',
    tag: 'Cheap',
  },
];

export const FlightRecommendations: React.FC<FlightRecommendationsProps> = ({
  title = "Recommended Flights For a Round Trip Journey",
  flights = DEFAULT_FLIGHTS,
  onBookNow,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-[#F4F7FE] p-5 rounded-3xl space-y-4 my-2 border border-slate-100/60 shadow-sm max-w-2xl">
      {/* Tiêu đề */}
      <h3 className="text-base md:text-lg font-bold text-[#14153E]">
        {title}
      </h3>

      {/* Danh sách thẻ chuyến bay */}
      <div className="space-y-3.5">
        {flights.map((flight) => {
          const isFav = favorites[flight.id] || flight.isFavorite;

          return (
            <div
              key={flight.id}
              className="bg-[#FAFBFD] hover:bg-white rounded-2xl p-4 md:p-5 transition-all duration-200 border border-slate-100/80 flex flex-col gap-3 shadow-sm"
            >
              {/* Header: Logo + Hãng hàng không & Nút Tim + Nút Book Now */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* 🔹 Icon chuyến bay / Logo hãng từ folder icons */}
                  <div className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={flight.logoUrl || defaultFlightLogo}
                      alt={flight.airline}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-500">
                    {flight.airline}
                  </span>
                </div>

                {/* Nút Tim & Nút Book Now */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(flight.id)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition p-2 ${
                      isFav
                        ? 'bg-blue-100 border border-blue-200'
                        : 'bg-[#EEF3FC] hover:bg-blue-100/60'
                    }`}
                  >
                    {/* 🔹 Icon Heart từ folder icons */}
                    <img
                      src={iconHeart}
                      alt="Favorite"
                      className={`w-4 h-4 object-contain transition-all ${
                        isFav ? 'scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => onBookNow && onBookNow(flight.id)}
                    className="px-4 py-2 bg-[#EEF3FC] hover:bg-blue-600 hover:text-white text-blue-600 text-xs font-semibold rounded-xl transition-all duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Thông tin 2 chiều & Tag Cheap / Giá */}
              <div className="flex items-end justify-between pt-1">
                {/* Thời gian & chặng bay */}
                <div className="space-y-2 text-xs md:text-sm">
                  {/* Chuyến đi */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#14153E] w-32">
                      {flight.outbound.time}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {flight.outbound.route} • {flight.outbound.duration} • {flight.outbound.stops}
                    </span>
                  </div>

                  {/* Chuyến về */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#14153E] w-32">
                      {flight.returnLeg.time}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {flight.returnLeg.route} • {flight.returnLeg.duration} • {flight.returnLeg.stops}
                    </span>
                  </div>
                </div>

                {/* Badge Cheap & Giá tiền */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {flight.tag && (
                    <span className="px-3 py-0.5 bg-[#EAF8F0] text-[#22C55E] text-[11px] font-semibold rounded-full border border-green-200/50">
                      {flight.tag}
                    </span>
                  )}
                  <span className="text-lg md:text-xl font-bold text-[#14153E] tracking-tight">
                    {flight.price}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
