import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SelectHotelPage } from './SelectHotelPage'
import { getHotelDetailsApi, type HotelData } from '../../../services/hotelService'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

// Mock Hotel API Service
vi.mock('../../../services/hotelService', () => ({
  getHotelDetailsApi: vi.fn(),
}))

// Mock Theme Context
vi.mock('../../../context/ThemeContext', () => ({
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
    ;(getHotelDetailsApi as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}))

    render(<SelectHotelPage />)

    expect(screen.getByText(/loading accommodation list/i)).toBeInTheDocument()
  })

  it('renders hotel list successfully after API call', async () => {
    ;(getHotelDetailsApi as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)

    render(<SelectHotelPage chatTitle="Hotels in Lagos" />)

    await waitFor(() => {
      expect(screen.queryByText(/loading accommodation list/i)).not.toBeInTheDocument()
    })

    // Check header titles
    expect(screen.getByText('Other available accommodations')).toBeInTheDocument()

    // Check hotel names
    expect(screen.getByText('Grand Hyatt Lagos')).toBeInTheDocument()
    expect(screen.getByText('Eko Hotels & Suites')).toBeInTheDocument()

    // Check locations
    expect(screen.getByText('VICTORIA ISLAND, LAGOS')).toBeInTheDocument()
    expect(screen.getByText('IKEJA, LAGOS')).toBeInTheDocument()

    // Check pricing providers
    expect(screen.getAllByText('Booking.com').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Expedia').length).toBeGreaterThan(0)
  })

  it('prioritizes saved hotel from localStorage at top of the list', async () => {
    // Hotel 2 is saved in localStorage beforehand
    const savedHotel = mockHotelsData[1]
    localStorage.setItem('selectedHotel', JSON.stringify(savedHotel))

    ;(getHotelDetailsApi as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)

    render(<SelectHotelPage />)

    await waitFor(() => {
      expect(screen.getByText('Eko Hotels & Suites')).toBeInTheDocument()
    })

    // Get all hotel headings rendered on page
    const headings = screen.getAllByRole('heading', { level: 3 })

    // "Eko Hotels & Suites" should be the first item in the list
    expect(headings[0]).toHaveTextContent('Eko Hotels & Suites')
    expect(headings[1]).toHaveTextContent('Grand Hyatt Lagos')
  })

  it('handles "Book Hotel" action correctly', async () => {
    ;(getHotelDetailsApi as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)
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

    // Verify localStorage has saved the selected hotel
    const storedHotel = JSON.parse(localStorage.getItem('selectedHotel') || '{}')
    expect(storedHotel.id).toBe('hotel-1')
  })

  it('toggles compare price checkbox', async () => {
    ;(getHotelDetailsApi as ReturnType<typeof vi.fn>).mockResolvedValue(mockHotelsData)

    render(<SelectHotelPage />)

    await waitFor(() => {
      expect(screen.getByText('Grand Hyatt Lagos')).toBeInTheDocument()
    })

    const compareCheckbox = screen.getByRole('checkbox', { name: /compare price/i }) as HTMLInputElement
    expect(compareCheckbox.checked).toBe(false)

    fireEvent.click(compareCheckbox)
    expect(compareCheckbox.checked).toBe(true)
  })

  it('renders error state when API call fails', async () => {
    const errorMessage = 'Network Error: Failed to fetch hotels'
    ;(getHotelDetailsApi as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage))

    render(<SelectHotelPage />)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('reloads page when clicking Retry button on error', async () => {
    // Spy directly on window.location.reload in a TypeScript-safe manner
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {})

    ;(getHotelDetailsApi as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Server unavailable'))

    render(<SelectHotelPage />)

    await waitFor(() => {
      expect(screen.getByText('Server unavailable')).toBeInTheDocument()
    })

    const retryButton = screen.getByRole('button', { name: /retry/i })
    fireEvent.click(retryButton)

    expect(reloadSpy).toHaveBeenCalledTimes(1)

    reloadSpy.mockRestore()
  })
})
