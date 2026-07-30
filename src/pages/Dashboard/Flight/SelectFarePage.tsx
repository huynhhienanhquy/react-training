import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { SidebarNav } from '../../../components/SectionChatPage/SidebarNav';

import iconHeart from '../../../assets/icons/heart-blue.png';
import defaultFlightLogo from '../../../assets/icons/ellipse.png';
import { SectionHeader } from '../../../components/SectionHeader/SectionHeader';

import { Topbar, type ChatMessage } from '../../../components/SectionChatPage/Topbar';
import { FareHeader } from '../../../components/FlightFare/FareHeader';
import { SelectedFlightBox } from '../../../components/FlightFare/SelectedFlightBox';
import { FareCards } from '../../../components/FlightFare/FareCards';
import { PriceDetailsSidebar } from '../../../components/FlightFare/PriceDetailsSidebar';

// Import Service & Types
import { getFareDetailsApi } from '../../../services/fareService';
import type { FareData } from '../../../types/flight';

interface SelectFarePageProps {
  chatTitle?: string;
  messages?: ChatMessage[];
  onBackToChat?: () => void;
  onStartNewChat?: () => void;
}

export const SelectFarePage: React.FC<SelectFarePageProps> = ({
  chatTitle,
  messages = [],
  onBackToChat,
  onStartNewChat,
}) => {
  const [activeNav, setActiveNav] = useState('chats');
  const [selectedFareId, setSelectedFareId] = useState<'economy' | 'business'>('economy');

  // State API data management
  const [fareData, setFareData] = useState<FareData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Call the Service when a component is mounted.
  useEffect(() => {
    const fetchFare = async () => {
      try {
        setLoading(true);
        setError(null);

        // Calling APIs via Service
        const rawData = await getFareDetailsApi();

        //  Flexible handling of cases where MockAPI returns a list array.
        const data = Array.isArray(rawData) ? rawData[0] : rawData;

        if (data) {
          setFareData(data);
        } else {
          setError('No matching flight data available.');
        }
      } catch (err: unknown) {
        console.error('Error loading flights data:', err);

        // Standard TypeScript error handling
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || err.message || 'Server connection error');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unable to retrieve flight data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFare();
  }, []);

  // Title Chat
  const firstUserMessage = messages.find((m) => m.sender === 'user')?.text;
  const resolvedChatTitle =
    chatTitle ||
    firstUserMessage ||
    `Cheap flights to ${fareData?.destination ? fareData.destination.split('-')[0].trim() : 'Destination'}`;

  // Securely calculate ticket data with Optional Chaining.
  const fareOptions = fareData?.fareOptions || [];
  const selectedFare =
    fareOptions.find((f) => f.id === selectedFareId) ||
    fareOptions[0];

  const priceBreakdown = fareData?.priceBreakdown || { flightDues: 0, taxesAndFees: 0 };

  const totalAmount = selectedFare && fareData
    ? selectedFare.price + priceBreakdown.flightDues + priceBreakdown.taxesAndFees
    : 0;

  return (
    <div className="bg-slate-100 font-helvetica text-slate-700 h-screen overflow-hidden flex antialiased">
      {/* 1. Sidebar Navigation */}
      <SidebarNav activeNav={activeNav} setActiveNav={setActiveNav} />

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
              <p className="text-sm font-medium text-slate-500">Loading flight information...</p>
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
                className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* MAIN DATA GRID */}
        {!loading && !error && fareData && selectedFare && (
          <div className="max-w-6xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <FareHeader
                destination={fareData.destination || ''}
                tripType={fareData.tripType || ''}
                cabinClass={fareData.cabinClass || ''}
                price={selectedFare.price}
                priceUnit={fareData.priceUnit || ''}
              />

              <SelectedFlightBox
                airlineName={fareData.airlineName || ''}
                defaultFlightLogo={defaultFlightLogo}
                iconHeart={iconHeart}
                legs={fareData.legs || []}
                cancellationPolicy={fareData.cancellationPolicy || ''}
              />

              <FareCards
                fareOptions={fareOptions}
                selectedFareId={selectedFareId}
                defaultFlightLogo={defaultFlightLogo}
                onSelectFare={(id) => setSelectedFareId(id as 'economy' | 'business')}
              />

              <div className="space-y-3 pt-2">
                <SectionHeader title="Important information" />
                <div className="bg-surface p-6 rounded-3xl border border-slate-100 text-xs text-slate-400 leading-relaxed space-y-2 shadow-sm">
                  {(fareData.importantInformation || []).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Details Sticky Sidebar */}
            <div className="lg:col-span-1">
              <PriceDetailsSidebar
                pricePerTraveller={selectedFare.price}
                flightDues={priceBreakdown.flightDues}
                taxesAndFees={priceBreakdown.taxesAndFees}
                totalAmount={totalAmount}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
