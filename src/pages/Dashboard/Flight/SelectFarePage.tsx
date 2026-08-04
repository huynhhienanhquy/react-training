import  { useCallback, useState } from 'react';

import iconHeart from '@/assets/icons/heart-blue.png';
import defaultFlightLogo from '@/assets/icons/ellipse.png';
import { SectionHeader } from '@/components/FlightFare/SectionHeader/SectionHeader';

import { FareHeader } from '@/components/FlightFare/FareHeader';
import { SelectedFlightBox } from '@/components/FlightFare/SelectedFlightBox';
import { FareCards } from '@/components/FlightFare/FareCards';
import { PriceDetailsSidebar } from '@/components/FlightFare/PriceDetailsSidebar';

import { getFareDetailsApi } from '@/services/fareService';
import type {
  FareData,
  SelectFarePageProps,
} from '@/types/flight';

import { useAsyncData } from '@/hooks/useAsyncData';
import { useChatTitle } from '@/hooks/useChatTitle';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ErrorState, LoadingState } from '@/components/common/AsyncState';

export const SelectFarePage = ({
  chatTitle,
  messages = [],
  onBackToChat,
  onStartNewChat,
}: SelectFarePageProps) => {
  const [selectedFareId, setSelectedFareId] =
    useState<'economy' | 'business'>('economy');

  // Fetch fare data
  const fetchFare = useCallback(async (): Promise<FareData> => {
    const rawData = await getFareDetailsApi();

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
    <DashboardLayout
      topbarProps={{
        isBreadcrumbMode: true,
        chatTitle: resolvedChatTitle,
        messages,
        onBackToChat,
        onNewChat: onStartNewChat,
      }}
    >

        {/* LOADING STATE */}
        {loading && <LoadingState message="Loading flight information..." />}

        {/* ERROR STATE */}
        {error && !loading && (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
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
    </DashboardLayout>
  );
};
