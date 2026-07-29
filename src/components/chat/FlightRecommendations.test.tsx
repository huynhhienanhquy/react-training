import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FlightRecommendations } from "./FlightRecommendations";
import { getFlightListApi } from "../../services/fareService";


vi.mock("../../services/fareService", async () => {
  const actual = await vi.importActual<
    typeof import("../../services/fareService")
  >("../../services/fareService");

  return {
    ...actual,
    getFlightListApi: vi.fn(),
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
    onClick?: () => void;
  }) => (
    <button onClick={onClick}>
      {children}
    </button>
  ),
}));


vi.mock("../ui/PriceDisplay", () => ({
  PriceDisplay: ({
    amount,
  }: {
    amount: string;
    size: "sm" | "md" | "lg";
  }) => (
    <span>{amount}</span>
  ),
}));


const mockedApi = vi.mocked(getFlightListApi);


const mockFlight = {
  id: "1",
  airline: "Vietnam Airlines",
  outbound: {
    time: "08:00",
    route: "SGN-HAN",
    duration: "2h",
    stops: "Direct",
  },
  returnLeg: {
    time: "18:00",
    route: "HAN-SGN",
    duration: "2h",
    stops: "Direct",
  },
  price: "$120",
};


describe("FlightRecommendations", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });



  it("renders initial flights without calling API", () => {

    render(
      <FlightRecommendations
        flights={[mockFlight]}
      />
    );


    expect(
      screen.getByText("Vietnam Airlines")
    ).toBeInTheDocument();


    expect(mockedApi)
      .not
      .toHaveBeenCalled();
  });



  it("renders multiple flights", () => {

    render(
      <FlightRecommendations
        flights={[
          mockFlight,
          {
            ...mockFlight,
            id: "2",
            airline: "Bamboo Airways",
          },
        ]}
      />
    );


    expect(
      screen.getByText("Vietnam Airlines")
    ).toBeInTheDocument();


    expect(
      screen.getByText("Bamboo Airways")
    ).toBeInTheDocument();
  });



  it("shows loading then renders API data", async () => {

    mockedApi.mockResolvedValue([
      {
        id: "1",
        destination: "Hanoi",
        tripType: "Round Trip",
        cabinClass: "Economy",
        priceUnit: "USD",
        airlineName: "VietJet",
        cancellationPolicy: "Free",
        importantInformation: [],
        priceBreakdown: {
          flightDues: 120,
          taxesAndFees: 30,
        },
        legs: [
          {
            id: "leg-1",
            times: "08:00",
            route: "SGN-HAN",
            duration: "2h",
            stops: "Direct",
          },
        ],
        fareOptions: [
          {
            id: "economy",
            name: "Economy",
            airline: "VietJet",
            price: 150,
            features: [],
          },
        ],
      },
    ]);


    render(
      <FlightRecommendations />
    );


    expect(
      screen.getByText(
        /Đang tải danh sách chuyến bay/i
      )
    ).toBeInTheDocument();


    await waitFor(() =>
      expect(
        screen.getByText("VietJet")
      ).toBeInTheDocument()
    );


    expect(
      screen.getByText("$150")
    ).toBeInTheDocument();
  });



  it("shows error message when API fails", async () => {

    mockedApi.mockRejectedValue(
      new Error("Network Error")
    );


    render(
      <FlightRecommendations />
    );


    await waitFor(() =>
      expect(
        screen.getByText("Network Error")
      ).toBeInTheDocument()
    );
  });



  it("shows empty state", async () => {

    mockedApi.mockResolvedValue([]);


    render(
      <FlightRecommendations />
    );


    await waitFor(() =>
      expect(
        screen.getByText(
          "No suitable flights were found."
        )
      ).toBeInTheDocument()
    );
  });



  it("calls onBookNow", async () => {

    const user = userEvent.setup();

    const onBookNow = vi.fn();


    render(
      <FlightRecommendations
        flights={[mockFlight]}
        onBookNow={onBookNow}
      />
    );


    await user.click(
      screen.getByText("Book Now")
    );


    expect(onBookNow)
      .toHaveBeenCalledWith("1");
  });



  it("does not crash without onBookNow", async () => {

    const user = userEvent.setup();


    render(
      <FlightRecommendations
        flights={[mockFlight]}
      />
    );


    await user.click(
      screen.getByText("Book Now")
    );


    expect(
      screen.getByText(
        "Vietnam Airlines"
      )
    ).toBeInTheDocument();
  });



  it("toggles favorite on and off", async () => {

    const user = userEvent.setup();


    render(
      <FlightRecommendations
        flights={[mockFlight]}
      />
    );


    await user.click(
      screen.getByText("Favorite")
    );


    expect(
      screen.getByText("Unfavorite")
    ).toBeInTheDocument();


    await user.click(
      screen.getByText("Unfavorite")
    );


    expect(
      screen.getByText("Favorite")
    ).toBeInTheDocument();
  });



  it("renders custom title", () => {

    render(
      <FlightRecommendations
        title="My Flights"
        flights={[]}
      />
    );


    expect(
      screen.getByText("My Flights")
    ).toBeInTheDocument();
  });



  it("renders default title when title missing", () => {
  render(
    <FlightRecommendations
      flights={[]}
    />
  );


  expect(
    screen.getByText(
      /Recommended Flights/i
    )
  ).toBeInTheDocument();
});



  it("renders API flight without fare options", async () => {
  mockedApi.mockResolvedValue([
    {
      id: "2",
      destination: "Tokyo",
      tripType: "One Way",
      cabinClass: "Economy",
      priceUnit: "USD",
      airlineName: "Japan Airlines",
      cancellationPolicy: "Free",

      priceBreakdown: {
        flightDues: 200,
        taxesAndFees: 50,
      },

      importantInformation: [],
      legs: [],
      fareOptions: [],
    },
  ]);


  render(
    <FlightRecommendations />
  );


  await waitFor(() =>
    expect(
      screen.getByText(
        "Japan Airlines"
      )
    ).toBeInTheDocument()
  );
});


});
