import React, { useState } from 'react';
import { SidebarNav } from '../components/chat/SidebarNav';

import iconHeart from '../assets/icons/heart-blue.png';
import defaultFlightLogo from '../assets/icons/ellipse.png';

import { Topbar } from '../components/chat/Topbar';
import { FareHeader } from '../components/fare/FareHeader';
import { SelectedFlightBox } from '../components/fare/SelectedFlightBox';
import { FareCards } from '../components/fare/FareCards';
import { PriceDetailsSidebar } from '../components/fare/PriceDetailsSidebar';

const MOCK_FARE_DATA = {
  id: 'flight-001',
  destination: 'Lagos - Abuja',
  tripType: 'Round Trip',
  cabinClass: 'Economy',
  priceUnit: 'per person',
  airlineName: 'AirPeace Airways, Nigerian',
  legs: [
    {
      id: 'leg-1',
      times: '9:15am - 9:15pm',
      route: 'QOW - LAG',
      duration: '9h 24m',
      stops: '1 stop',
    },
    {
      id: 'leg-2',
      times: '4:25am - 10:20pm',
      route: 'LAG - QOW',
      duration: '9h 24m',
      stops: '1 stop',
    },
  ],
  cancellationPolicy: 'Free cancellation within 43 hours of booking',
  fareOptions: [
    {
      id: 'economy' as const,
      name: 'ECONOMY',
      airline: 'AirPeace Airways, Nigerian',
      price: 1200,
      features: Array(5).fill('Free cancellation within 43 hours of booking'),
    },
    {
      id: 'business' as const,
      name: 'BUSINESS',
      airline: 'AirPeace Airways, Nigerian',
      price: 1600,
      features: Array(5).fill('Free cancellation within 43 hours of booking'),
    },
  ],
  importantInformation: [
    "Once confirmed, airline change penalties and restrictions apply. Most tickets are non-refundable. See your airline's full fare rules here. Airline tickets are non-transferrable. Name changes or adjustments are not allowed once purchased. Airfares and flight availability are not guaranteed until purchased.",
    'You will be issued electronic tickets. All travelers will need a valid passport and you may also need to show additional documentation at your destination and/or in connecting countries.',
  ],
  priceBreakdown: {
    flightDues: 100,
    taxesAndFees: 40,
  },
};

interface SelectFarePageProps {
  chatTitle?: string; // Tiêu đề đoạn chat truyền từ ngoài vào
  onBackToChat?: () => void;
  onStartNewChat?: () => void;
}

export const SelectFarePage: React.FC<SelectFarePageProps> = ({
  chatTitle = 'Cheap flights to Lagos',
  onBackToChat,
  onStartNewChat,
}) => {
  const [activeNav, setActiveNav] = useState('chats');
  const [selectedFareId, setSelectedFareId] = useState<'economy' | 'business'>('economy');

  // Retrieve selected data tickets from JSON.
  const selectedFare =
    MOCK_FARE_DATA.fareOptions.find((f) => f.id === selectedFareId) ||
    MOCK_FARE_DATA.fareOptions[0];

  // Calculate the total amount
  const totalAmount =
    selectedFare.price +
    MOCK_FARE_DATA.priceBreakdown.flightDues +
    MOCK_FARE_DATA.priceBreakdown.taxesAndFees;

  return (
    <div className="bg-slate-100 font-sans text-slate-700 h-screen overflow-hidden flex antialiased">
      {/* 1. Sidebar Navigation */}
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* 2. Main Content */}
      <main className="flex-1 bg-[#EEF3FC] flex flex-col h-full overflow-y-auto">
        {/* topbar displays Breadcrumb mode. */}
        <Topbar
          isBreadcrumbMode={true}
          chatTitle={chatTitle}
          onBackToChat={onBackToChat}
          onNewChat={onStartNewChat}
        />

        {/* Content Body Grid */}
        <div className="max-w-6xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CỘT TRÁI (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header Flight */}
            <FareHeader
              destination={MOCK_FARE_DATA.destination}
              tripType={MOCK_FARE_DATA.tripType}
              cabinClass={MOCK_FARE_DATA.cabinClass}
              price={selectedFare.price}
              priceUnit={MOCK_FARE_DATA.priceUnit}
            />

            {/* Selected Flights Box */}
            <SelectedFlightBox
              airlineName={MOCK_FARE_DATA.airlineName}
              defaultFlightLogo={defaultFlightLogo}
              iconHeart={iconHeart}
              legs={MOCK_FARE_DATA.legs}
              cancellationPolicy={MOCK_FARE_DATA.cancellationPolicy}
            />

            {/* Select Fare Cards */}
            <FareCards
              fareOptions={MOCK_FARE_DATA.fareOptions}
              selectedFareId={selectedFareId}
              defaultFlightLogo={defaultFlightLogo}
              onSelectFare={setSelectedFareId}
            />

            {/* Important Information */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Important information
              </h3>

              <div className="bg-[#FAFBFD] p-6 rounded-3xl border border-slate-100 text-xs text-slate-400 leading-relaxed space-y-2 shadow-sm">
                {MOCK_FARE_DATA.importantInformation.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

          </div>

          {/* Price Details Sticky Sidebar */}
          <div className="lg:col-span-1">
            <PriceDetailsSidebar
              pricePerTraveller={selectedFare.price}
              flightDues={MOCK_FARE_DATA.priceBreakdown.flightDues}
              taxesAndFees={MOCK_FARE_DATA.priceBreakdown.taxesAndFees}
              totalAmount={totalAmount}
            />
          </div>

        </div>
      </main>
    </div>
  );
};
