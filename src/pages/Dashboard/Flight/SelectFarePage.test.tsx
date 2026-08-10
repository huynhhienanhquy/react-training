import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SelectFarePage } from './SelectFarePage'
import { getFlights } from '@/services/fareService'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

// Mock Service API
vi.mock('../../../services/fareService', () => ({
  getFlights: vi.fn(),
}))

// Mock Theme Hook
vi.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}))

// Mock Auth Context / Hook
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    logout: vi.fn(),
  }),
}))

const mockFareData = {
  destination: 'Lagos to Owerri',
  tripType: 'Round trip',
  cabinClass: 'Economy Class',
  priceUnit: 'per passenger',
  airlineName: 'Qatar Airways',
  legs: [
    {
      id: 'leg-1',
      times: '08:30 - 14:15',
      route: 'LOS - QOW',
      duration: '5h 45m',
      stops: 'Non-stop',
    },
  ],
  fareOptions: [
    {
      id: 'economy',
      name: 'Economy Standard',
      airline: 'Qatar Airways',
      price: 320,
      features: ['1x Carry-on bag', '1x Checked bag'],
    },
    {
      id: 'business',
      name: 'Business Class',
      airline: 'Qatar Airways',
      price: 1200,
      features: ['Lounge Access', 'Lie-flat seat'],
    },
  ],
  priceBreakdown: {
    flightDues: 45,
    taxesAndFees: 35,
  },
  cancellationPolicy: 'Refundable within 24 hours',
  importantInformation: [
    'Check baggage allowances before departure.',
    'Passport validity must be at least 6 months.',
  ],
}

describe('SelectFarePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    ;(getFlights as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}))

    render(<SelectFarePage />)

    expect(screen.getByText(/loading flight information/i)).toBeInTheDocument()
  })

  it('renders fare details successfully after API call', async () => {
    ;(getFlights as ReturnType<typeof vi.fn>).mockResolvedValue([mockFareData])

    render(<SelectFarePage chatTitle="Trip to Owerri" />)

    await waitFor(() => {
      expect(screen.queryByText(/loading flight information/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText('Lagos to Owerri')).toBeInTheDocument()

    expect(screen.getAllByText('Qatar Airways').length).toBeGreaterThan(0)

    expect(screen.getByText('Check baggage allowances before departure.')).toBeInTheDocument()

    expect(screen.getByText('$400')).toBeInTheDocument()
  })

  it('updates total amount when selecting Business fare', async () => {
    ;(getFlights as ReturnType<typeof vi.fn>).mockResolvedValue([mockFareData])

    render(<SelectFarePage />)

    await waitFor(() => {
      expect(screen.getByText('Lagos to Owerri')).toBeInTheDocument()
    })

    expect(screen.getByText('$400')).toBeInTheDocument()

    const selectButtons = screen.getAllByRole('button', { name: /select/i })

    fireEvent.click(selectButtons[1])

    await waitFor(() => {
      expect(screen.getByText('$1280')).toBeInTheDocument()
    })
  })

  it('renders error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch flight data'
    ;(getFlights as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage))

    render(<SelectFarePage />)

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

    ;(getFlights as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network Error'))

    render(<SelectFarePage />)

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeInTheDocument()
    })

    const retryButton = screen.getByRole('button', { name: /retry/i })
    fireEvent.click(retryButton)

    expect(reloadMock).toHaveBeenCalledTimes(1)
  })
})
