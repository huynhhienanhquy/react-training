import  { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarNav } from '@/components/common/Chat/SidebarNav/index';
import { Button } from '@/components/Button/index';

import HeartIcon from '@/components/common/Icons/HeartIcon';
import defaultFlightLogo from '@/assets/images/travel-provider-logo.png';
import { SectionHeader } from '@/components/features/flights/SectionHeader';

import { Topbar } from '@/components/common/Chat/Topbar';
import { FareHeader } from '@/components/features/flights/FareHeader';
import { SelectedFlightBox } from '@/components/features/flights/SelectedFlightBox';
import { FareCards } from '@/components/features/flights/FareCards';
import { PriceDetailsSidebar } from '@/components/features/flights/PriceDetailsSidebar';

import { getFareDetails } from '@/services/fareService';
import type {
  FareData,
  SelectFarePageProps,
} from '@/types/flight';

import { useAsyncData } from '@/hooks/useAsyncData';
import { useSidebarNav } from '@/hooks/useSidebarNav';
import { useChatTitle } from '@/hooks/useChatTitle';

export const SelectFarePage = ({
  chatTitle,
  messages = [],
  onBackToChat,
  onStartNewChat,
}: SelectFarePageProps) => {
  const navigate = useNavigate();
  const handleBackToChat = onBackToChat ?? (() => navigate('/chats'));
  const handleStartNewChat = onStartNewChat ?? (() => navigate('/chats'));
  const { activeNav, setActiveNav } = useSidebarNav();
  const [selectedFareId, setSelectedFareId] =
    useState<'economy' | 'business'>('economy');

  // Fetch fare data
  const fetchFare = useCallback(async (): Promise<FareData> => {
    const rawData = await getFareDetails();

    // MockAPI can return an array or an object.
    const data = Array.isArray(rawData)
      ? rawData[0]
      : rawData;

    if (!data) {
      throw new Error('No matching flight data available.');
    }

    return data;
  }, []);

  const {
    data: fareData,
    loading,
    error,
  } = useAsyncData<FareData>(fetchFare);

  // Chat title
  const resolvedChatTitle = useChatTitle(
    chatTitle,
    messages,
    `Cheap flights to ${
      fareData?.destination
        ? fareData.destination.split('-')[0].trim()
        : 'Destination'
    }`,
  );

  // Fare options
  const fareOptions = fareData?.fareOptions ?? [];

  const selectedFare =
    fareOptions.find(
      (fare) => fare.id === selectedFareId,
    ) ?? fareOptions[0];

  // Price breakdown
  const priceBreakdown = fareData?.priceBreakdown ?? {
    flightDues: 0,
    taxesAndFees: 0,
  };

  const totalAmount =
    selectedFare && fareData
      ? selectedFare.price +
        priceBreakdown.flightDues +
        priceBreakdown.taxesAndFees
      : 0;

  return (
    <div className="bg-slate-100 font-helvetica text-slate-700 h-screen overflow-hidden flex antialiased">
      {/* 1. Sidebar Navigation */}
      <SidebarNav
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />

      {/* 2. Main Content */}
      <main className="flex-1 bg-surface-section flex flex-col h-full overflow-y-auto">
        {/* Topbar */}
        <Topbar
          isBreadcrumbMode={true}
          breadcrumbLabel="Select Fare"
          chatTitle={resolvedChatTitle}
          messages={messages}
          onBackToChat={handleBackToChat}
          onNewChat={handleStartNewChat}
        />

        {/* LOADING STATE */}
        {loading && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

              <p className="text-sm font-medium text-slate-500">
                Loading flight information...
              </p>
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
                iconHeart={HeartIcon}
                legs={fareData.legs || []}
                cancellationPolicy={
                  fareData.cancellationPolicy || ''
                }
              />

              <FareCards
                fareOptions={fareOptions}
                selectedFareId={selectedFareId}
                defaultFlightLogo={defaultFlightLogo}
                onSelectFare={(id) =>
                  setSelectedFareId(
                    id as 'economy' | 'business',
                  )
                }
              />

              <div className="space-y-3 pt-2">
                <SectionHeader title="Important information" />

                <div className="bg-surface p-6 rounded-3xl border border-slate-100 text-xs text-slate-400 leading-relaxed space-y-2 shadow-sm">
                  {(fareData.importantInformation || []).map((paragraph) => (
                    <p key={paragraph}>
                      {paragraph}
                    </p>
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
