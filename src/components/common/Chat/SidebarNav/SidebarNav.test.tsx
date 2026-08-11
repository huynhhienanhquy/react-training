import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SidebarNav } from ".";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogout = vi.fn();
const mockToggleTheme = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    logout: mockLogout,
  }),
}));

vi.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({ theme: "light", toggleTheme: mockToggleTheme }),
}));

vi.mock("@/hooks/useClickOutside", () => ({
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
        onNavChange={setActiveNav}
      />
    );

    expect(screen.getByRole("button", { name: "Chats" })).toBeInTheDocument();
  });


  it("calls setActiveNav when clicking chat", async () => {
    const user = userEvent.setup();

    render(
      <SidebarNav
        activeNav="chats"
        onNavChange={setActiveNav}
      />
    );

    await user.click(screen.getByRole("button", { name: "Chats" }));

    expect(setActiveNav).toHaveBeenCalledWith("chats");
  });


  it("renders active chat style", () => {
    render(
      <SidebarNav
        activeNav="chats"
        onNavChange={setActiveNav}
      />
    );

    const chatButton = screen.getByRole("button", { name: "Chats" });

    expect(chatButton).toHaveClass("bg-blue-50");
  });


  it("opens profile menu when avatar clicked", async () => {
    const user = userEvent.setup();

    render(
      <SidebarNav
        activeNav="chats"
        onNavChange={setActiveNav}
      />
    );

    await user.click(screen.getByAltText("User Avatar").closest("button")!);

    expect(screen.getByText("Log out")).toBeInTheDocument();
  });


  it("calls logout and navigate when clicking logout", async () => {
    const user = userEvent.setup();

    mockLogout.mockResolvedValueOnce(undefined);

    render(
      <SidebarNav
        activeNav="chats"
        onNavChange={setActiveNav}
      />
    );


    await user.click(screen.getByAltText("User Avatar").closest("button")!);

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
        onNavChange={setActiveNav}
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
        onNavChange={setActiveNav}
        isMobileOpen={true}
        onMobileToggle={onMobileToggle}
      />
    );

    expect(
      screen.getByText("Log out")
    ).toBeInTheDocument();

    const mobileLogo = screen.getAllByAltText("Logo")[1];
    const mobileDrawer = mobileLogo.closest('aside');

    expect(mobileDrawer).toHaveClass("w-64", "max-w-[85vw]");
    expect(screen.getByRole("button", { name: "Chats" })).toBeInTheDocument();
  });

  it("toggles dark mode from the profile menu", async () => {
    const user = userEvent.setup();
    render(<SidebarNav activeNav="chats" onNavChange={setActiveNav} />);

    await user.click(screen.getByAltText("User Avatar").closest("button")!);
    await user.click(screen.getByRole("button", { name: "Switch to dark mode" }));

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
