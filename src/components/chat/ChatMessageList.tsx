import React, { useEffect, useRef } from 'react';
import { ThinkingLoader } from '../ui/ThinkingLoader';
import { FlightRecommendations } from './FlightRecommendations';
import { HotelRecommendations } from './HotelRecommendations';
import { PlacesCardWidget } from './PlacesCardWidget';
import { ItineraryCardWidget } from './ItineraryCardWidget';
import { DEFAULT_PLACES, type PlaceItem } from './placesData';
import { DEFAULT_ITINERARY, type DayItinerary } from './itineraryData';


export type MessageData = PlaceItem[] | DayItinerary[] | unknown;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'flight' | 'hotel' | 'places' | 'itinerary';
  data?: MessageData;
}

interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onBookFlight?: (flightId?: string) => void;
  onViewAllPlaces?: (places?: PlaceItem[]) => void;
  onViewAllItinerary?: (itinerary?: DayItinerary[]) => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping,
  onBookFlight,
  onViewAllPlaces,
  onViewAllItinerary,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="w-full flex-1 overflow-y-auto space-y-4 py-4 px-2">
      {messages.map((msg, index) => {
        const textLower = msg.text.toLowerCase();

        // Get the user's message right before it (if available).
        const prevMsg = index > 0 ? messages[index - 1] : null;
        const prevTextLower = prevMsg ? prevMsg.text.toLowerCase() : '';

        // Flight
        const isFlightType =
          msg.type === 'flight' ||
          (msg.sender === 'ai' && (textLower.includes('flight') || prevTextLower.includes('flight')));

        // Hotel
        const isHotelType =
          msg.type === 'hotel' ||
          (msg.sender === 'ai' && (textLower.includes('hotel') || prevTextLower.includes('hotel') || textLower.includes('bahamas')));

        // Places
        const isPlacesType =
          msg.type === 'places' ||
          (msg.sender === 'ai' && (
            textLower.includes('place') ||
            textLower.includes('địa điểm') ||
            prevTextLower.includes('places') ||
            prevTextLower.includes('địa điểm')
          ));

        // Itinerary
        const isItineraryType =
          msg.type === 'itinerary' ||
          (msg.sender === 'ai' && (
            textLower.includes('itinerary') ||
            textLower.includes('lịch trình') ||
            prevTextLower.includes('itinerary') ||
            prevTextLower.includes('lịch trình')
          ));

        // Get the data if available; otherwise, get DEFAULT_PLACES for Places.
        const placesData = (Array.isArray(msg.data) && msg.data.length > 0)
          ? (msg.data as PlaceItem[])
          : DEFAULT_PLACES;

       const itineraryData = (Array.isArray(msg.data) && msg.data.length > 0)
          ? (msg.data as DayItinerary[])
          : DEFAULT_ITINERARY;

        return (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start gap-3'}`}
          >
            <div className="flex flex-col gap-2 max-w-2xl w-full">
              {/* Text message content */}
              <div
                className={`px-5 py-3 rounded-2xl shadow-sm text-sm md:text-base whitespace-pre-line w-fit ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none ml-auto'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* Flight*/}
              {isFlightType && msg.sender === 'ai' && (
                <FlightRecommendations
                  title="Recommended Flights For a Round Trip Journey"
                  onBookNow={(id) => {
                    if (onBookFlight) onBookFlight(id);
                  }}
                />
              )}

              {/* Hotel*/}
              {isHotelType && msg.sender === 'ai' && (
                <HotelRecommendations
                  title="Recommended Hotels For a Three-Night Staycation"
                  onBookNow={(id) => console.log(`Book Hotel ${id}`)}
                  onSeeAll={() => console.log('See all recommendations')}
                />
              )}

              {/* Place */}
              {isPlacesType && msg.sender === 'ai' && (
                <PlacesCardWidget
                  places={placesData}
                  onViewAll={() => onViewAllPlaces?.(placesData)}
                />
              )}

              {/* itinerary */}
              {isItineraryType && msg.sender === 'ai' && itineraryData && (
                <ItineraryCardWidget
                  itinerary={itineraryData}
                  onViewAll={() => onViewAllItinerary?.(itineraryData)}
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Display Loader while AI is responding */}
      {isTyping && (
        <div className="flex items-center gap-3 pl-1">
          <ThinkingLoader text="Travelpal is thinking..." />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
