import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import defaultFlightLogo from '@/assets/images/travel-provider-logo.png';

import { Button } from '@/components/common/Button';
import HeartIcon from '@/components/common/Icons/HeartIcon';
import { FareCards } from '@/components/features/flights/FareCards';
import { FareHeader } from '@/components/features/flights/FareHeader';
import { PriceDetailsSidebar } from '@/components/features/flights/PriceDetailsSidebar';
import { SectionHeader } from '@/components/features/flights/SectionHeader';
import { SelectedFlightBox } from '@/components/features/flights/SelectedFlightBox';
import { DashboardPageLayout } from '@/components/layouts/DashboardLayout';

import { useAsyncData } from '@/hooks/useAsyncData';
import { useChatTitle } from '@/hooks/useChatTitle';

import { getFlights } from '@/services/fareService';
import { toast } from '@/services/toast';

import type {
  FareData,
  SelectFarePageProps,
} from '@/types/flight';

type FareId = 'economy' | 'business';

export const SelectFarePage = ({
  chatTitle,
  messages = [],
  onBackToChat,
}: SelectFarePageProps) => {
  const navigate = useNavigate();

  const navigateBackToChat = useCallback(
    () => navigate('/chats'),
    [navigate],
  );

  const handleBackToChat = onBackToChat ?? navigateBackToChat;

  const [selectedFareId, setSelectedFareId] =
    useState<FareId>('economy');

  const fetchFare = useCallback(async (): Promise<FareData> => {
    const rawData = await getFlights();

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
    refetch,
  } = useAsyncData<FareData>(fetchFare);

  const resolvedChatTitle = useChatTitle(
    chatTitle,
    messages,
    `Cheap flights to ${
      fareData?.destination
        ? fareData.destination.split('-')[0].trim()
        : 'Destination'
    }`,
  );

  const fareOptions = useMemo(
    () => fareData?.fareOptions ?? [],
    [fareData],
  );

  const selectedFare = useMemo(
    () =>
      fareOptions.find((fare) => fare.id === selectedFareId) ??
      fareOptions[0],
    [fareOptions, selectedFareId],
  );

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

  const handleRetry = useCallback(() => {
    toast.info('Reloading flight information...');
    refetch();
  }, [refetch]);

  const handleSelectFare = useCallback((id: string) => {
    const fareId = id as FareId;

    setSelectedFareId(fareId);

    toast.success(
      `Selected ${
        fareId === 'business' ? 'Business' : 'Economy'
      } fare`,
    );
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
      onNewChat={navigateBackToChat}
    >
      {loading && (
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />

            <p className="text-sm font-medium text-hotel-muted">
              Loading flight information...
            </p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="max-w-md rounded-2xl border border-hotel-error-border bg-hotel-error-bg p-6 text-center text-hotel-error-text">
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

      {!loading && !error && fareData && selectedFare && (
        <div className="mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 gap-4 p-3 sm:p-4 md:gap-6 md:p-8 desktop:max-w-none desktop:grid-cols-fare-page desktop:gap-12 desktop:px-6.5 desktop:pb-14 desktop:pt-10">
          <div className="space-y-6 lg:space-y-10">
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

              <div className="space-y-2 rounded-3xl border border-surface-active bg-surface p-6 text-xs leading-relaxed text-hotel-muted shadow-sm lg:min-h-204 lg:p-8 lg:text-base lg:leading-7">
                {(fareData.importantInformation || []).map(
                  (paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ),
                )}
              </div>
            </div>
          </div>

          <div>
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