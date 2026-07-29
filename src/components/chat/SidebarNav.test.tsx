import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SidebarNav } from "./SidebarNav";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogout = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    logout: mockLogout,
  }),
}));

vi.mock("../../hooks/useClickOutside", () => ({
  useClickOutside: () => ({
    current: null,
  }),
}));

describe("SidebarNav", () => {
  const setActiveNav = vi.fn();
  const onMobileToggle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("renders chat navigation", () => {
    render(
      <SidebarNav
        activeNav="chats"
        setActiveNav={setActiveNav}
      />
    );

    expect(screen.getByAltText("Chats")).toBeInTheDocument();
  });


  it("calls setActiveNav when clicking chat", async () => {
    const user = userEvent.setup();

    render(
      <SidebarNav
        activeNav="chats"
        setActiveNav={setActiveNav}
      />
    );

    await user.click(screen.getByAltText("Chats"));

    expect(setActiveNav).toHaveBeenCalledWith("chats");
  });


  it("renders active chat style", () => {
    render(
      <SidebarNav
        activeNav="chats"
        setActiveNav={setActiveNav}
      />
    );

    const chatButton = screen
      .getByAltText("Chats")
      .closest("button");

    expect(chatButton).toHaveClass("bg-blue-50");
  });


  it("opens profile menu when avatar clicked", async () => {
    const user = userEvent.setup();

    render(
      <SidebarNav
        activeNav="chats"
        setActiveNav={setActiveNav}
      />
    );

    await user.click(screen.getByAltText("User Avatar"));

    expect(screen.getByText("Log out")).toBeInTheDocument();
  });


  it("calls logout and navigate when clicking logout", async () => {
    const user = userEvent.setup();

    mockLogout.mockResolvedValueOnce(undefined);

    render(
      <SidebarNav
        activeNav="chats"
        setActiveNav={setActiveNav}
      />
    );


    await user.click(screen.getByAltText("User Avatar"));

    await user.click(screen.getByText("Log out"));


    expect(mockLogout).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/login", {
      replace: true,
    });
  });


  it("calls onMobileToggle when hamburger clicked", async () => {
    const user = userEvent.setup();

    render(
      <SidebarNav
        activeNav="chats"
        setActiveNav={setActiveNav}
        onMobileToggle={onMobileToggle}
      />
    );


    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(onMobileToggle).toHaveBeenCalledTimes(1);
  });


  it("renders mobile drawer when opened", () => {
    render(
      <SidebarNav
        activeNav="chats"
        setActiveNav={setActiveNav}
        isMobileOpen={true}
        onMobileToggle={onMobileToggle}
      />
    );

    expect(
      screen.getByText("Log out")
    ).toBeInTheDocument();
  });
});
