import React from "react";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { HotelRecommendations } from "./HotelRecommendations";
import { getHotelListApi } from "../../services/hotelService";
import type { HotelData } from "../../services/hotelService";


vi.mock("../../services/hotelService", async () => {
  const actual = await vi.importActual<
    typeof import("../../services/hotelService")
  >("../../services/hotelService");

  return {
    ...actual,
    getHotelListApi: vi.fn(),
  };
});


vi.mock("./RecommendationWrapper", () => ({
  RecommendationWrapper: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));


vi.mock("../ui/button/FavoriteButton", () => ({
  FavoriteButton: ({
    isFavorite,
    onToggle,
  }: {
    isFavorite: boolean;
    onToggle: () => void;
  }) => (
    <button onClick={onToggle}>
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  ),
}));


vi.mock("../ui/Button", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button onClick={onClick}>
      {children}
    </button>
  ),
}));


const mockedGetHotelListApi = vi.mocked(getHotelListApi);



const mockHotel: HotelData = {
  id: "hotel-1",
  hotelName: "Hilton Hotel",
  location: "Bahamas",
  address: "123 Beach Street",
  rating: 4.8,
  reviewCount: 250,
  priceUnit: "USD",

  coverImage: "hotel.jpg",
  imageUrl: "hotel.jpg",

  images: [
    "hotel-1.jpg",
    "hotel-2.jpg",
  ],

  description:
    "Luxury hotel with ocean view",

  amenities: [
    "Free Wifi",
    "Swimming Pool",
  ],

  cancellationPolicy:
    "Free cancellation",

  roomOptions: [
    {
      id: "standard",
      name: "Standard Room",
      price: 150,
      bedType: "King Bed",
      maxGuests: 2,
      features: [
        "Wifi",
        "Air Conditioner",
      ],
    },
  ],

  importantInformation: [
    "Check-in after 14:00",
  ],

  priceBreakdown: {
    roomRate: 150,
    taxesAndFees: 20,
  },
};



describe("HotelRecommendations", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });



  it("renders hotel from props", () => {

    render(
      <HotelRecommendations
        hotels={[
          {
            id: "1",
            name: "Hilton",
            description: "Luxury hotel",
            price: 200,
          },
        ]}
      />
    );


    expect(
      screen.getByText("Hilton")
    ).toBeInTheDocument();

  });



  it("does not call API when hotels prop exists", () => {

    render(
      <HotelRecommendations
        hotels={[
          {
            id: "1",
            name: "Hilton",
            description: "Luxury hotel",
            price: 200,
          },
        ]}
      />
    );


    expect(
      mockedGetHotelListApi
    ).not.toHaveBeenCalled();

  });



  it("shows loading state", () => {

    mockedGetHotelListApi.mockImplementation(
      () =>
        new Promise(() => {
          // keep pending
        })
    );


    render(
      <HotelRecommendations />
    );


    expect(
      screen.getByText(
        /Đang tải danh sách khách sạn/i
      )
    ).toBeInTheDocument();

  });



  it("renders hotel data from API", async () => {

    mockedGetHotelListApi.mockResolvedValue([
      mockHotel,
    ]);


    render(
      <HotelRecommendations />
    );


    await waitFor(() => {

      expect(
        screen.getByText(
          "Hilton Hotel"
        )
      ).toBeInTheDocument();

    });


    expect(
      screen.getByText(
        "$150"
      )
    ).toBeInTheDocument();

  });



  it("shows empty state when API returns empty array", async () => {

    mockedGetHotelListApi.mockResolvedValue([]);


    render(
      <HotelRecommendations />
    );


    await waitFor(() => {

      expect(
        screen.getByText(
          "No suitable hotels were found."
        )
      ).toBeInTheDocument();

    });

  });



  it("shows error message when API fails", async () => {

    mockedGetHotelListApi.mockRejectedValue(
      new Error("Network Error")
    );


    render(
      <HotelRecommendations />
    );


    await waitFor(() => {

      expect(
        screen.getByText(
          "Network Error"
        )
      ).toBeInTheDocument();

    });

  });



  it("calls onBookNow when clicking Book Now", async () => {

    const user = userEvent.setup();

    const onBookNow = vi.fn();


    render(
      <HotelRecommendations
        hotels={[
          {
            id: "hotel-1",
            name: "Hilton",
            description: "Luxury",
            price: 150,
          },
        ]}
        onBookNow={onBookNow}
      />
    );


    await user.click(
      screen.getByRole(
        "button",
        {
          name: /book now/i,
        }
      )
    );


    expect(
      onBookNow
    ).toHaveBeenCalledTimes(1);


    expect(
      onBookNow.mock.calls[0][0]
    ).toMatchObject({
      id: "hotel-1",
      name: "Hilton",
    });

  });



  it("stores selected hotel into localStorage", async () => {

    const user = userEvent.setup();


    render(
      <HotelRecommendations
        hotels={[
          {
            id: "hotel-1",
            name: "Hilton",
            description: "Luxury",
            price: 150,
          },
        ]}
      />
    );


    await user.click(
      screen.getByRole(
        "button",
        {
          name: /book now/i,
        }
      )
    );


    const storedHotel =
      localStorage.getItem(
        "selectedHotel"
      );


    expect(
      storedHotel
    ).not.toBeNull();

  });



  it("toggles favorite button", async () => {

    const user = userEvent.setup();


    render(
      <HotelRecommendations
        hotels={[
          {
            id: "hotel-1",
            name: "Hilton",
            description: "Luxury",
            price: 150,
          },
        ]}
      />
    );


    await user.click(
      screen.getByText(
        "Favorite"
      )
    );


    expect(
      screen.getByText(
        "Unfavorite"
      )
    ).toBeInTheDocument();

  });



  it("renders custom title", () => {

    render(
      <HotelRecommendations
        title="Recommended Luxury Hotels"
        hotels={[]}
      />
    );


    expect(
      screen.getByText(
        "Recommended Luxury Hotels"
      )
    ).toBeInTheDocument();

  });

});
