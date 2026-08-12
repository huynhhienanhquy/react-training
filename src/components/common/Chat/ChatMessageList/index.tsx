import { memo } from 'react';
import { ThinkingLoader } from '@/components/common/Thinking';
import { FlightRecommendations } from '@/pages/Dashboard/Chat/sections/Recommendations/FlightRecommendations';
import { HotelRecommendations } from '@/pages/Dashboard/Chat/sections/Recommendations/HotelRecommendations';
import { PlacesCardWidget } from '@/pages/Dashboard/Chat/sections/Recommendations/PlacesCardWidget';
import { ItineraryCardWidget } from '@/pages/Dashboard/Chat/sections/Recommendations/ItineraryCardWidget';
import type { PlaceData, DayItinerary } from '@/types/travel';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import type { ChatMessageListProps } from '@/types/chat';
import { LazyRender } from '@/components/common/LazyRender';
import type { HotelOption } from '@/types/hotel';

// Custom payload inside a chat message
export const ChatMessageList = memo(function ChatMessageList({
  messages,
  isTyping,
  onBookFlight,
  onBookHotel,
  onViewAllPlaces,
  onViewAllItinerary,
}: ChatMessageListProps) {
  const { ref: messagesEndRef } = useAutoScroll(messages, isTyping);

  return (
    <div className="w-full max-w-4xl flex-1 space-y-4 overflow-y-auto px-2 py-4 scrollbar-hide lg:max-w-none lg:px-0 min-[1441px]:!max-w-[908px]">
      {messages.map((msg, index) => {
        const textLower = msg.text.toLowerCase();

        const prevMsg = index > 0 ? messages[index - 1] : null;
        const prevTextLower = prevMsg ? prevMsg.text.toLowerCase() : '';

        const isFlightType =
          msg.type === 'flight' ||
          (msg.sender === 'ai' &&
            (textLower.includes('flight') ||
              prevTextLower.includes('flight')));

        const isHotelType =
          msg.type === 'hotel' ||
          (msg.sender === 'ai' &&
            (textLower.includes('hotel') ||
              prevTextLower.includes('hotel') ||
              textLower.includes('bahamas')));

        const isPlacesType =
          msg.type === 'places' ||
          (msg.sender === 'ai' &&
            (textLower.includes('place') ||
              prevTextLower.includes('places') ||
              prevTextLower.includes('place')));

        const isItineraryType =
          msg.type === 'itinerary' ||
          (msg.sender === 'ai' &&
            (textLower.includes('itinerary') ||
              prevTextLower.includes('itinerary')));

        const placesData =
          msg.type === 'places' &&
          Array.isArray(msg.data) &&
          msg.data.length > 0
            ? (msg.data as PlaceData[])
            : undefined;

        const itineraryData =
          msg.type === 'itinerary' &&
          Array.isArray(msg.data) &&
          msg.data.length > 0
            ? (msg.data as DayItinerary[])
            : undefined;

        const handleBookFlightNow = (id?: string) => onBookFlight?.(id);
        const handleBookHotelNow = (hotel: HotelOption) => {
          if (!onBookHotel) return;

          onBookHotel(
            hotel.rawData ?? {
              id: hotel.id,
              hotelName: hotel.name,
              description: hotel.description,
              coverImage: hotel.imageUrl,
            },
          );
        };
        const handleSeeAllHotels = () => undefined;
        const handleViewAllPlaces = () => onViewAllPlaces?.(placesData);
        const handleViewAllItinerary = () => onViewAllItinerary?.(itineraryData);

        return (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user'
                ? 'justify-end'
                : 'items-start gap-3'
            }`}
          >
            <div className="flex min-w-0 w-full flex-col gap-2 desktop:w-chat-input desktop:shrink-0">
              {msg.text && (
                <div
                  className={`max-w-full break-words text-sm md:text-base whitespace-pre-line w-fit ${
                    msg.sender === 'user'
                      ? 'ml-auto rounded-2xl rounded-br-none border border-slate-100 bg-white px-3.5 py-3.5 text-slate-900 shadow-none'
                      : 'bg-transparent border-none text-slate-800 p-0 shadow-none'
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {isFlightType && msg.sender === 'ai' && (
                <LazyRender>
                  <FlightRecommendations
                    title="Recommended Flights For a Round Trip Journey"
                    onBookNow={handleBookFlightNow}
                  />
                </LazyRender>
              )}

              {isHotelType && msg.sender === 'ai' && (
                <LazyRender>
                  <HotelRecommendations
                    title="Recommended Hotels For a Three-Night Staycation"
                    onBookNow={handleBookHotelNow}
                    onSeeAll={handleSeeAllHotels}
                  />
                </LazyRender>
              )}

              {isPlacesType && msg.sender === 'ai' && (
                <LazyRender>
                  <PlacesCardWidget
                    places={placesData}
                    onViewAll={handleViewAllPlaces}
                  />
                </LazyRender>
              )}

              {isItineraryType && msg.sender === 'ai' && (
                <LazyRender>
                  <ItineraryCardWidget
                    itinerary={itineraryData}
                    onViewAll={handleViewAllItinerary}
                  />
                </LazyRender>
              )}
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="flex items-center gap-3 pl-1">
          <ThinkingLoader text="Travelpal is thinking..." />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
});
