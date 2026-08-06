import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ChatMessageList } from ".";
import type { PlaceData, DayItinerary } from "@/types/travel";

// Mock scrollIntoView
beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

// Mock ThinkingLoader
vi.mock("@/components/Thinking/ThinkingLoader", () => ({
  ThinkingLoader: ({ text }: { text: string }) => <div>{text}</div>,
}));

// Mock FlightRecommendations
vi.mock("@/components/Recommendations/FlightRecommendations", () => ({
  FlightRecommendations: ({
    onBookNow,
  }: {
    onBookNow: (id: string) => void;
  }) => (
    <button onClick={() => onBookNow("flight-1")}>
      Flight Widget
    </button>
  ),
}));

type MockHotel = {
  id: string;
};

// Mock HotelRecommendations
vi.mock("@/components/Recommendations/HotelRecommendations", () => ({
  HotelRecommendations: ({
    onBookNow,
  }: {
    onBookNow: (hotel: string | MockHotel) => void;
  }) => (
    <button onClick={() => onBookNow({ id: "hotel-1" })}>
      Hotel Widget
    </button>
  ),
}));

// Mock PlacesCardWidget
vi.mock("@/components/Recommendations/PlacesCardWidget", () => ({
  PlacesCardWidget: ({
    places,
    onViewAll,
  }: {
    places?: PlaceData[];
    onViewAll: () => void;
  }) => (
    <button onClick={onViewAll}>
      Places Widget ({places?.length ?? 0})
    </button>
  ),
}));

// Mock ItineraryCardWidget
vi.mock("@/components/Recommendations/ItineraryCardWidget", () => ({
  ItineraryCardWidget: ({
    itinerary,
    onViewAll,
  }: {
    itinerary?: DayItinerary[];
    onViewAll: () => void;
  }) => (
    <button onClick={onViewAll}>
      Itinerary Widget ({itinerary?.length ?? 0})
    </button>
  ),
}));

describe("ChatMessageList", () => {
  it("renders user message", () => {
    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "user",
            text: "Hello",
          },
        ]}
        isTyping={false}
      />
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders AI message", () => {
    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "Hi there",
          },
        ]}
        isTyping={false}
      />
    );

    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("shows thinking loader", () => {
    render(<ChatMessageList messages={[]} isTyping={true} />);

    expect(
      screen.getByText("Travelpal is thinking...")
    ).toBeInTheDocument();
  });

  it("renders flight recommendation widget", () => {
    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "flight to Paris",
          },
        ]}
        isTyping={false}
      />
    );

    expect(screen.getByText("Flight Widget")).toBeInTheDocument();
  });

  it("calls onBookFlight", async () => {
    const user = userEvent.setup();
    const onBookFlight = vi.fn();

    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "flight",
          },
        ]}
        isTyping={false}
        onBookFlight={onBookFlight}
      />
    );

    await user.click(screen.getByText("Flight Widget"));

    expect(onBookFlight).toHaveBeenCalledWith("flight-1");
  });

  it("renders hotel recommendation widget", () => {
    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "hotel in bahamas",
          },
        ]}
        isTyping={false}
      />
    );

    expect(screen.getByText("Hotel Widget")).toBeInTheDocument();
  });

  it("calls onBookHotel", async () => {
    const user = userEvent.setup();
    const onBookHotel = vi.fn();

    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "hotel",
          },
        ]}
        isTyping={false}
        onBookHotel={onBookHotel}
      />
    );

    await user.click(screen.getByText("Hotel Widget"));

    expect(onBookHotel).toHaveBeenCalledWith(
      expect.objectContaining({ id: "hotel-1" }),
    );
  });

  it("renders places widget", () => {
    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "",
            type: "places",
            data: [],
          },
        ]}
        isTyping={false}
      />
    );

    expect(
      screen.getByText(/Places Widget/)
    ).toBeInTheDocument();
  });

  it("calls onViewAllPlaces", async () => {
    const user = userEvent.setup();
    const onViewAllPlaces = vi.fn();

    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "",
            type: "places",
            data: [],
          },
        ]}
        isTyping={false}
        onViewAllPlaces={onViewAllPlaces}
      />
    );

    await user.click(screen.getByText(/Places Widget/));

    expect(onViewAllPlaces).toHaveBeenCalled();
  });

  it("renders itinerary widget", () => {
    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "",
            type: "itinerary",
            data: [],
          },
        ]}
        isTyping={false}
      />
    );

    expect(
      screen.getByText(/Itinerary Widget/)
    ).toBeInTheDocument();
  });

  it("calls onViewAllItinerary", async () => {
    const user = userEvent.setup();
    const onViewAllItinerary = vi.fn();

    render(
      <ChatMessageList
        messages={[
          {
            id: "1",
            sender: "ai",
            text: "",
            type: "itinerary",
            data: [],
          },
        ]}
        isTyping={false}
        onViewAllItinerary={onViewAllItinerary}
      />
    );

    await user.click(screen.getByText(/Itinerary Widget/));

    expect(onViewAllItinerary).toHaveBeenCalled();
  });
});
