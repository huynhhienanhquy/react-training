import React, { useEffect, useRef } from 'react';
import { ThinkingLoader } from '../../../../components/ui/ThinkingLoader';
import { FlightRecommendations } from '../Recommendations/FlightRecommendations';
import { HotelRecommendations } from '../Recommendations/HotelRecommendations';
import { PlacesCardWidget } from '../Recommendations/PlacesCardWidget';
import { ItineraryCardWidget } from '../Recommendations/ItineraryCardWidget';
import type { PlaceData, DayItinerary } from '../../../../services/travelService';

// Custom payload inside a chat message
export type MessageData = PlaceData[] | DayItinerary[] | unknown;

// Type definition for an individual chat message item
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'flight' | 'hotel' | 'places' | 'itinerary';
  data?: MessageData;
}

// Props definition for managing chat message list rendering and callbacks
interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onBookFlight?: (flightId?: string) => void;
  onBookHotel?: (hotelId?: string) => void;
  onViewAllPlaces?: (places?: PlaceData[]) => void;
  onViewAllItinerary?: (itinerary?: DayItinerary[]) => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping,
  onBookFlight,
  onBookHotel,
  onViewAllPlaces,
  onViewAllItinerary,
}) => {
  // Reference for auto-scrolling to the latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to bottom whenever messages array updates or typing state changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    /* Message stream container with custom hidden scrollbars */
    <div className="w-full flex-1 overflow-y-auto space-y-4 py-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {messages.map((msg, index) => {
        const textLower = msg.text.toLowerCase();

        // Get the previous message to infer context if necessary
        const prevMsg = index > 0 ? messages[index - 1] : null;
        const prevTextLower = prevMsg ? prevMsg.text.toLowerCase() : '';

        // Detect if current message should render Flight recommendations
        const isFlightType =
          msg.type === 'flight' ||
          (msg.sender === 'ai' && (textLower.includes('flight') || prevTextLower.includes('flight')));

        // Detect if current message should render Hotel recommendations
        const isHotelType =
          msg.type === 'hotel' ||
          (msg.sender === 'ai' && (textLower.includes('hotel') || prevTextLower.includes('hotel') || textLower.includes('bahamas')));

        // Detect if current message should render Places widget
        const isPlacesType =
          msg.type === 'places' ||
          (msg.sender === 'ai' && (
            textLower.includes('place') ||
            textLower.includes('địa điểm') ||
            prevTextLower.includes('places') ||
            prevTextLower.includes('địa điểm')
          ));

        // Detect if current message should render Itinerary widget
        const isItineraryType =
          msg.type === 'itinerary' ||
          (msg.sender === 'ai' && (
            textLower.includes('itinerary') ||
            textLower.includes('lịch trình') ||
            prevTextLower.includes('itinerary') ||
            prevTextLower.includes('lịch trình')
          ));

        // Pass custom payload if exists; otherwise undefined so widgets fetch via API
        const placesData = (Array.isArray(msg.data) && msg.data.length > 0)
          ? (msg.data as PlaceData[])
          : undefined;

        const itineraryData = (Array.isArray(msg.data) && msg.data.length > 0)
          ? (msg.data as DayItinerary[])
          : undefined;

        return (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start gap-3'}`}
          >
            <div className="flex flex-col gap-2 max-w-2xl w-full">
              {/* Message text bubble */}
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

              {/* Render Flight Recommendation Card */}
              {isFlightType && msg.sender === 'ai' && (
                <FlightRecommendations
                  title="Recommended Flights For a Round Trip Journey"
                  onBookNow={(id) => {
                    if (onBookFlight) onBookFlight(id);
                  }}
                />
              )}

              {/* Render Hotel Recommendation Card */}
              {isHotelType && msg.sender === 'ai' && (
                <HotelRecommendations
                  title="Recommended Hotels For a Three-Night Staycation"
                  onBookNow={(hotel) => {
                    if (!onBookHotel) return;

                    if (typeof hotel === 'string') {
                      onBookHotel(hotel);
                    } else if (hotel && typeof hotel === 'object' && 'id' in hotel) {
                      onBookHotel(String(hotel.id));
                    }
                  }}
                  onSeeAll={() => console.log('See all recommendations')}
                />
              )}

              {/* Render Places Card Widget */}
              {isPlacesType && msg.sender === 'ai' && (
                <PlacesCardWidget
                  places={placesData}
                  onViewAll={() => onViewAllPlaces?.(placesData)}
                />
              )}

              {/* Render Itinerary Card Widget */}
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

      {/* Render AI thinking indicator when processing a query */}
      {isTyping && (
        <div className="flex items-center gap-3 pl-1">
          <ThinkingLoader text="Travelpal is thinking..." />
        </div>
      )}

      {/* Scroll anchor target */}
      <div ref={messagesEndRef} />
    </div>
  );
};
