import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

const mockUseAuth = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading screen while loading", () => {
    mockUseAuth.mockReturnValue({
      loading: true,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Loading Tripal Session...")
    ).toBeInTheDocument();
  });

  it("redirects to login when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Login Page")
    ).toBeInTheDocument();
  });

  it("renders protected content when user is authenticated", () => {
    mockUseAuth.mockReturnValue({
      loading: false,
      user: {
        id: "1",
        email: "test@example.com",
      },
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Protected Content")
    ).toBeInTheDocument();
  });
});
