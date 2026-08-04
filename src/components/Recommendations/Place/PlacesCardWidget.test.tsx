import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { PlacesCardWidget } from ".";
import { getPlaceListApi } from "@/services/travelService";


vi.mock("@/services/travelService", () => ({
  getPlaceListApi: vi.fn(),
}));


vi.mock("@/components/Button/Button", () => ({
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


describe("PlacesCardWidget", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("renders widget title", () => {
    render(
      <PlacesCardWidget places={[]} />
    );

    expect(
      screen.getByText("Featured Places")
    ).toBeInTheDocument();
  });


  it("renders places with all information", () => {
    render(
      <PlacesCardWidget
        places={[
          {
            id: "1",
            name: "Eiffel Tower",
            location: "Paris",
            rating: 4.8,
            category: "sightseeing",
            imageUrl: "image.jpg",
          },
        ]}
      />
    );


    expect(
      screen.getByText("Eiffel Tower")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Paris")
    ).toBeInTheDocument();

    expect(
      screen.getByText("4.8")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sightseeing")
    ).toBeInTheDocument();
  });


  it("renders place without optional fields", () => {
    render(
      <PlacesCardWidget
        places={[
          {
            id: "1",
            name: "Unknown Place",
            location: "Vietnam",
          },
        ]}
      />
    );


    expect(
      screen.getByText("Unknown Place")
    ).toBeInTheDocument();
  });


  it("renders food category badge", () => {
    render(
      <PlacesCardWidget
        places={[
          {
            id: "1",
            name: "Restaurant",
            location: "Tokyo",
            category: "food",
          },
        ]}
      />
    );


    expect(
      screen.getByText("Cuisine")
    ).toBeInTheDocument();
  });


  it("renders shopping category badge", () => {
    render(
      <PlacesCardWidget
        places={[
          {
            id: "1",
            name: "Mall",
            location: "Japan",
            category: "shopping",
          },
        ]}
      />
    );


    expect(
      screen.getByText("Shopping")
    ).toBeInTheDocument();
  });


  it("renders sightseeing category badge", () => {
    render(
      <PlacesCardWidget
        places={[
          {
            id: "1",
            name: "Museum",
            location: "Paris",
            category: "sightseeing",
          },
        ]}
      />
    );


    expect(
      screen.getByText("Sightseeing")
    ).toBeInTheDocument();
  });


  it("renders fallback category badge", () => {
  render(
    <PlacesCardWidget
      places={[
        {
          id: "1",
          name: "Other Place",
          location: "USA",
          category: "other",
        },
      ]}
    />
  );


  expect(
    screen.getByText("other", {
      exact: true,
    })
  ).toBeInTheDocument();
});


  it("shows empty state when places empty", () => {
    render(
      <PlacesCardWidget places={[]} />
    );


    expect(
      screen.getByText(
        /No location has been chosen/i
      )
    ).toBeInTheDocument();
  });


  it("calls onViewAll when button clicked", async () => {
    const user = userEvent.setup();
    const onViewAll = vi.fn();


    render(
      <PlacesCardWidget
        places={[]}
        onViewAll={onViewAll}
      />
    );


    await user.click(
      screen.getByText(
        "See All Recommended Locations"
      )
    );


    expect(onViewAll)
      .toHaveBeenCalledTimes(1);
  });


  it("does not crash without onViewAll", async () => {
    const user = userEvent.setup();


    render(
      <PlacesCardWidget places={[]} />
    );


    await user.click(
      screen.getByText(
        "See All Recommended Locations"
      )
    );


    expect(
      screen.getByText(
        "See All Recommended Locations"
      )
    ).toBeInTheDocument();
  });


  it("shows loading state when fetching places", () => {
    vi.mocked(getPlaceListApi)
      .mockImplementation(
        () => new Promise(() => {})
      );


    render(
      <PlacesCardWidget />
    );


    expect(
      screen.getByText(
        /Loading list of locations/i
      )
    ).toBeInTheDocument();
  });


  it("renders places from API successfully", async () => {
    vi.mocked(getPlaceListApi)
      .mockResolvedValue([
        {
          id: "1",
          name: "Tokyo Tower",
          location: "Tokyo",
          category: "sightseeing",
          rating: 4.9,
        },
      ]);


    render(
      <PlacesCardWidget />
    );


    expect(
      await screen.findByText(
        "Tokyo Tower"
      )
    ).toBeInTheDocument();


    expect(
      screen.getByText("Tokyo")
    ).toBeInTheDocument();
  });


  it("shows empty state when API returns empty array", async () => {
    vi.mocked(getPlaceListApi)
      .mockResolvedValue([]);


    render(
      <PlacesCardWidget />
    );


    expect(
      await screen.findByText(
        /No location has been chosen/i
      )
    ).toBeInTheDocument();
  });


  it("shows error message when API fails", async () => {
    vi.mocked(getPlaceListApi)
      .mockRejectedValue(
        new Error("Server error")
      );


    render(
      <PlacesCardWidget />
    );


    expect(
      await screen.findByText(
        "Server error"
      )
    ).toBeInTheDocument();
  });

});
