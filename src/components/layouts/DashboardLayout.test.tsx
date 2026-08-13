import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DashboardLayout, DashboardPageLayout } from './DashboardLayout';

const mockNavigate = vi.fn();
let mockPathname = '/chats';

vi.mock('react-router-dom', () => ({
  Outlet: () => <div>Route content</div>,
  useLocation: () => ({ pathname: mockPathname }),
  useNavigate: () => mockNavigate,
}));

vi.mock('@/hooks/useSidebarNav', () => ({
  useSidebarNav: () => ({ isMobileOpen: true, onMobileToggle: vi.fn() }),
}));

vi.mock('@/components/common/Chat/SidebarNav', () => ({
  SidebarNav: ({
    activeNav,
    attachedToContent,
    onNavChange,
  }: {
    activeNav: string;
    attachedToContent: boolean;
    onNavChange: (id: string) => void;
  }) => (
    <div>
      <span>active:{activeNav}</span>
      <span>attached:{String(attachedToContent)}</span>
      <button onClick={() => onNavChange('favorites')}>Favorites</button>
      <button onClick={() => onNavChange('unknown')}>Unknown</button>
    </div>
  ),
}));

vi.mock('@/components/common/Chat/Topbar', () => ({
  Topbar: () => <header>Topbar</header>,
}));

describe('DashboardPageLayout', () => {
  it('renders the default non-scrollable layout', () => {
    render(<DashboardPageLayout>Content</DashboardPageLayout>);
    expect(screen.getByText('Content').closest('main')).toHaveClass('relative', 'overflow-hidden');
  });

  it('renders a scrollable layout and merges custom classes', () => {
    render(<DashboardPageLayout scrollable className="custom">Content</DashboardPageLayout>);
    expect(screen.getByText('Content').closest('main')).toHaveClass('overflow-y-auto', 'custom');
  });
});

describe('DashboardLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = '/chats';
  });

  it.each([
    ['/dashboard', 'chats', false],
    ['/chats/fares', 'chats', true],
    ['/chats/hotels', 'chats', true],
    ['/favorites/list', 'favorites', false],
    ['/unknown', 'chats', false],
  ])('resolves navigation for %s', (pathname, activeNav, attached) => {
    mockPathname = pathname;
    render(<DashboardLayout />);
    expect(screen.getByText(`active:${activeNav}`)).toBeInTheDocument();
    expect(screen.getByText(`attached:${String(attached)}`)).toBeInTheDocument();
  });

  it('navigates only when the selected navigation item has a route', () => {
    render(<DashboardLayout />);
    fireEvent.click(screen.getByRole('button', { name: 'Favorites' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unknown' }));
    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith('/favorites');
  });
});
