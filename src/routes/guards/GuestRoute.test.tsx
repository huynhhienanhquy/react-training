import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { GuestRoute } from "./GuestRoute";

const mockUseAuth = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("GuestRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing while loading", () => {
    mockUseAuth.mockReturnValue({
      loading: true,
      user: null,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders guest page when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects authenticated user to dashboard", () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      user: {
        id: "1",
        email: "test@example.com",
      },
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/dashboard" element={<div>Dashboard</div>} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
