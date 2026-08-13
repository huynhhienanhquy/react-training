import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DashboardLayout, DashboardPageLayout } from './DashboardLayout';

const navigate = vi.fn();
let pathname = '/chats';

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => ({ pathname }),
  Outlet: () => <div>Page content</div>,
}));

vi.mock('@/hooks/useSidebarNav', () => ({
  useSidebarNav: () => ({ isMobileOpen: false, onMobileToggle: vi.fn() }),
}));

vi.mock('@/components/common/Chat/Topbar', () => ({
  Topbar: () => <header>Topbar</header>,
}));

vi.mock('@/components/common/Chat/SidebarNav', () => ({
  SidebarNav: ({ activeNav, attachedToContent, onNavChange }: {
    activeNav: string;
    attachedToContent: boolean;
    onNavChange: (id: string) => void;
  }) => (
    <aside data-active={activeNav} data-attached={String(attachedToContent)}>
      <button onClick={() => onNavChange('favorites')}>Favorites</button>
      <button onClick={() => onNavChange('unknown')}>Unknown</button>
    </aside>
  ),
}));

describe('DashboardPageLayout', () => {
  it('renders the non-scrollable default and custom classes', () => {
    const { container } = render(<DashboardPageLayout className="custom">Content</DashboardPageLayout>);
    expect(screen.getByText('Topbar')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(container.querySelector('main')).toHaveClass('relative', 'overflow-hidden', 'custom');
  });

  it('renders a scrollable page', () => {
    const { container } = render(<DashboardPageLayout scrollable>Content</DashboardPageLayout>);
    expect(container.querySelector('main')).toHaveClass('overflow-y-auto');
  });
});

describe('DashboardLayout', () => {
  beforeEach(() => {
    navigate.mockClear();
    pathname = '/chats';
  });

  it.each([
    ['/dashboard', 'chats'], ['/favorites/list', 'favorites'], ['/rewards', 'medal'],
    ['/routes-map', 'map'], ['/community', 'community'], ['/settings', 'settings'],
    ['/unknown', 'chats'],
  ])('selects navigation for %s', (route, activeNav) => {
    pathname = route;
    render(<DashboardLayout />);
    expect(screen.getByRole('complementary')).toHaveAttribute('data-active', activeNav);
  });

  it('attaches navigation on detail pages and navigates known routes only', () => {
    pathname = '/chats/fares';
    render(<DashboardLayout />);
    expect(screen.getByRole('complementary')).toHaveAttribute('data-attached', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Favorites' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unknown' }));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/favorites');
  });
});
