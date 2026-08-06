import { ThinkingLoader } from '@/components/Thinking';
import { FlightRecommendations } from '@/components/Recommendations/Flight';
import { HotelRecommendations } from '@/components/Recommendations/Hotel';
import { PlacesCardWidget } from '@/components/Recommendations/Place';
import { ItineraryCardWidget } from '@/components/Recommendations/Itinerary';
import type { PlaceData, DayItinerary } from '@/types/travel';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import type { ChatMessageListProps } from '@/types/chat';

// Custom payload inside a chat message
export const ChatMessageList = ({
  messages,
  isTyping,
  onBookFlight,
  onBookHotel,
  onViewAllPlaces,
  onViewAllItinerary,
}: ChatMessageListProps) => {
  const { ref: messagesEndRef } = useAutoScroll(messages, isTyping);

  return (
    <div className="w-full flex-1 overflow-y-auto space-y-4 py-4 px-2 scrollbar-hide">
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

        return (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user'
                ? 'justify-end'
                : 'items-start gap-3'
            }`}
          >
            <div className="flex flex-col gap-2 max-w-2xl w-full">
              {msg.text && (
                <div
                  className={`text-sm md:text-base whitespace-pre-line w-fit ${
                    msg.sender === 'user'
                      ? 'bg-white text-slate-900 px-6 py-4 rounded-2xl rounded-br-none ml-auto shadow-none border border-slate-100'
                      : 'bg-transparent border-none text-slate-800 p-0 shadow-none'
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {isFlightType && msg.sender === 'ai' && (
                <FlightRecommendations
                  title="Recommended Flights For a Round Trip Journey"
                  onBookNow={(id) => {
                    if (onBookFlight) {
                      onBookFlight(id);
                    }
                  }}
                />
              )}

              {isHotelType && msg.sender === 'ai' && (
                <HotelRecommendations
                  title="Recommended Hotels For a Three-Night Staycation"
                  onBookNow={(hotel) => {
                    if (!onBookHotel) return;

                    onBookHotel(
                      hotel.rawData ?? {
                        id: hotel.id,
                        hotelName: hotel.name,
                        description: hotel.description,
                        coverImage: hotel.imageUrl,
                      },
                    );
                  }}
                  onSeeAll={() => {
                    /* TODO: Implement see all */
                  }}
                />
              )}

              {isPlacesType && msg.sender === 'ai' && (
                <PlacesCardWidget
                  places={placesData}
                  onViewAll={() => onViewAllPlaces?.(placesData)}
                />
              )}

              {isItineraryType && msg.sender === 'ai' && (
                <ItineraryCardWidget
                  itinerary={itineraryData}
                  onViewAll={() => onViewAllItinerary?.(itineraryData)}
                />
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
};
