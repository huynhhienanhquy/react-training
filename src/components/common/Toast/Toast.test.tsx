import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastContainer,  } from './index';
import { toast } from '@/services/toast';

describe('Toast', () => {
  afterEach(() => {
    toast.dismiss();
    vi.useRealTimers();
  });

  it('renders and manually dismisses a notification', () => {
    render(<ToastContainer />);
    act(() => { toast.success('Saved successfully', { duration: 0 }); });

    expect(screen.getByRole('status')).toHaveTextContent('Saved successfully');
    fireEvent.click(screen.getByRole('button', { name: 'Close notification' }));
    expect(screen.queryByText('Saved successfully')).not.toBeInTheDocument();
  });

  it('automatically dismisses a notification', () => {
    vi.useFakeTimers();
    render(<ToastContainer />);
    act(() => { toast.error('Something went wrong', { duration: 1000 }); });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
