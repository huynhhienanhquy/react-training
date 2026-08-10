import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';

import HeartIcon from '@/components/common/Icons/HeartIcon';
import defaultFlightLogo from '@/assets/images/travel-provider-logo.png';
import { SectionHeader } from '@/components/features/flights/SectionHeader';

import { FareHeader } from '@/components/features/flights/FareHeader';
import { SelectedFlightBox } from '@/components/features/flights/SelectedFlightBox';
import { FareCards } from '@/components/features/flights/FareCards';
import { PriceDetailsSidebar } from '@/components/features/flights/PriceDetailsSidebar';

import { getFlights } from '@/services/fareService';
import type {
  FareData,
  SelectFarePageProps,
} from '@/types/flight';

import { useAsyncData } from '@/hooks/useAsyncData';
import { useChatTitle } from '@/hooks/useChatTitle';
import { DashboardPageLayout } from '@/components/layouts/DashboardLayout';

export const SelectFarePage = ({
  chatTitle,
  messages = [],
  onBackToChat,
}: SelectFarePageProps) => {
  const navigate = useNavigate();
  const navigateBackToChat = useCallback(() => navigate('/chats'), [navigate]);
  const handleBackToChat = onBackToChat ?? navigateBackToChat;
  const [selectedFareId, setSelectedFareId] =
    useState<'economy' | 'business'>('economy');

  // Fetch fare data
  const fetchFare = useCallback(async (): Promise<FareData> => {
    const rawData = await getFlights();

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
  const fareOptions = useMemo(() => fareData?.fareOptions ?? [], [fareData]);

  const selectedFare = useMemo(() =>
    fareOptions.find(
      (fare) => fare.id === selectedFareId,
    ) ?? fareOptions[0], [fareOptions, selectedFareId]);

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

  const handleRetry = useCallback(() => window.location.reload(), []);
  const handleSelectFare = useCallback((id: string) => {
    setSelectedFareId(id as 'economy' | 'business');
  }, []);

  return (
      <DashboardPageLayout
        scrollable
        className="font-helvetica"
        isBreadcrumbMode
        breadcrumbLabel="Select Fare"
        chatTitle={resolvedChatTitle}
        messages={messages}
        onBackToChat={handleBackToChat}
      >
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
                onClick={handleRetry}
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
                onSelectFare={handleSelectFare}
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
      </DashboardPageLayout>
  );
};
