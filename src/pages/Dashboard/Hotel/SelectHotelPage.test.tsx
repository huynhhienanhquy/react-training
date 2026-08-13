import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SelectHotelPage } from './SelectHotelPage'
import { getHotels } from '@/services/hotelService'
import type { HotelData } from '@/types/hotel'

const { mockToastSuccess } = vi.hoisted(() => ({ mockToastSuccess: vi.fn() }))

vi.mock('react-toastify', () => ({
  toast: { success: mockToastSuccess },
}))

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

// Mock Hotel API Service
vi.mock('../../../services/hotelService', () => ({
  getHotels: vi.fn(),
}))

// Mock Theme Hook
vi.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}))

// Mock Auth Hook
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    logout: vi.fn(),
  }),
}))

const mockHotelsData: HotelData[] = [
  {
    id: 'hotel-1',
    hotelName: 'Grand Hyatt Lagos',
    location: 'Victoria Island, Lagos',
    address: 'Victoria Island, Lagos',
    coverImage: 'https://example.com/hyatt.jpg',
    priceBreakdown: {
      roomRate: 250,
      taxesAndFees: 30,
    },
  },
  {
    id: 'hotel-2',
    hotelName: 'Eko Hotels & Suites',
    location: 'Ikeja, Lagos',
    address: 'Ikeja, Lagos',
    coverImage: 'https://example.com/eko.jpg',
    priceBreakdown: {
      roomRate: 180,
      taxesAndFees: 20,
    },
  },
]as HotelData[];

describe('SelectHotelPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders loading state initially', () => {
    // Return an unresolved promise to test loading state
    ;(getHotels as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}))

    render(<SelectHotelPage />)

    expect(screen.getByText(/loading accommodation list/i)).toBeInTheDocument()
  })

  it('renders hotel list successfully after API call', async () => {
    ;(getHotels as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)

    render(<SelectHotelPage chatTitle="Hotels in Lagos" />)

    await waitFor(() => {
      expect(screen.queryByText(/loading accommodation list/i)).not.toBeInTheDocument()
    })

    // Check header titles
    expect(screen.getByText('Other available accommodations')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /start new chat/i }),
    ).toBeInTheDocument()

    // Check hotel names
    expect(screen.getByText('Grand Hyatt Lagos')).toBeInTheDocument()
    expect(screen.getByText('Eko Hotels & Suites')).toBeInTheDocument()

    // Check locations (rendered as provided by API data)
    expect(screen.getByText('Victoria Island, Lagos')).toBeInTheDocument()
    expect(screen.getByText('Ikeja, Lagos')).toBeInTheDocument()

    expect(screen.queryByRole('checkbox', { name: /compare price/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Booking.com')).not.toBeInTheDocument()
    expect(screen.queryByText('Expedia')).not.toBeInTheDocument()
  })

  it('prioritizes the hotel selected in the current chat at the top of the list', async () => {
    const selectedHotel = mockHotelsData[1]

    ;(getHotels as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)

    render(<SelectHotelPage selectedHotel={selectedHotel} />)

    await waitFor(() => {
      expect(screen.getByText('Eko Hotels & Suites')).toBeInTheDocument()
    })

    // Verify "Eko Hotels & Suites" renders before "Grand Hyatt Lagos" in the DOM
    const allHotelNames = screen.getAllByRole('heading', { level: 3 })
    // headings[0] is "Other available accommodations" (SectionHeader), so skip it
    const hotelHeadings = allHotelNames.filter(
      (h) => h.textContent !== 'Other available accommodations'
    )
    expect(hotelHeadings[0]).toHaveTextContent('Eko Hotels & Suites')
    expect(hotelHeadings[1]).toHaveTextContent('Grand Hyatt Lagos')
  })

  it('handles "Book Hotel" action correctly', async () => {
    ;(getHotels as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)
    const onSelectHotelMock = vi.fn()

    render(<SelectHotelPage onSelectHotel={onSelectHotelMock} />)

    await waitFor(() => {
      expect(screen.getByText('Grand Hyatt Lagos')).toBeInTheDocument()
    })

    // Click the first "Book Hotel" button
    const bookButtons = screen.getAllByRole('button', { name: /book hotel/i })
    fireEvent.click(bookButtons[0])

    // Verify callback was triggered with the correct hotel object
    expect(onSelectHotelMock).toHaveBeenCalledTimes(1)
    expect(onSelectHotelMock).toHaveBeenCalledWith(mockHotelsData[0])

    expect(localStorage.getItem('selectedHotel')).toBeNull()
  })

  it('shows a success toast when no hotel selection callback is provided', async () => {
    ;(getHotels as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)
    render(<SelectHotelPage />)

    await waitFor(() => expect(screen.getByText('Grand Hyatt Lagos')).toBeInTheDocument())
    fireEvent.click(screen.getAllByRole('button', { name: /book hotel/i })[0])

    expect(mockToastSuccess).toHaveBeenCalledWith('Selected hotel: Grand Hyatt Lagos')
  })

  it('renders the simplified hotel card without price providers', async () => {
    ;(getHotels as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)

    render(<SelectHotelPage />)

    await waitFor(() => {
      expect(screen.getByText('Grand Hyatt Lagos')).toBeInTheDocument()
    })

    expect(screen.queryByRole('checkbox', { name: /compare price/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Booking.com')).not.toBeInTheDocument()
    expect(screen.queryByText('Expedia')).not.toBeInTheDocument()
  })

  it('renders error state when API call fails', async () => {
    const errorMessage = 'Network Error: Failed to fetch hotels'
    ;(getHotels as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage))

    render(<SelectHotelPage />)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('reloads page when clicking Retry button on error', async () => {
    const reloadMock = vi.fn()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, reload: reloadMock },
    })

    ;(getHotels as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Server unavailable'))

    render(<SelectHotelPage />)

    await waitFor(() => {
      expect(screen.getByText('Server unavailable')).toBeInTheDocument()
    })

    const retryButton = screen.getByRole('button', { name: /retry/i })
    fireEvent.click(retryButton)

    expect(reloadMock).toHaveBeenCalledTimes(1)
  })
})
