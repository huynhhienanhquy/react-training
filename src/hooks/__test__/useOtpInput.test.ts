import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useOtpInput } from '@/hooks/useOtpInput';
import React from 'react';

describe('useOtpInput', () => {
  it('initial OTP values', () => {
    const { result } = renderHook(() => useOtpInput(6));
    expect(result.current.otp).toEqual(['', '', '', '', '', '']);
    expect(result.current.otpString).toBe('');
  });

  it('handleChange updates correct index', () => {
    const { result } = renderHook(() => useOtpInput(6));

    act(() => {
      result.current.handleChange(0, '1');
    });

    expect(result.current.otp).toEqual(['1', '', '', '', '', '']);
    expect(result.current.otpString).toBe('1');

    act(() => {
      result.current.handleChange(1, '2');
    });

    expect(result.current.otp).toEqual(['1', '2', '', '', '', '']);
  });

  it('handleChange ignores non-numeric input', () => {
    const { result } = renderHook(() => useOtpInput(6));

    act(() => {
      result.current.handleChange(0, 'a');
    });

    expect(result.current.otp).toEqual(['', '', '', '', '', '']);
  });

  it('handlePaste fills all inputs', () => {
    const { result } = renderHook(() => useOtpInput(4));

    const mockEvent = {
      clipboardData: {
        getData: () => '1234',
      }
    } as unknown as React.ClipboardEvent<HTMLInputElement>;

    act(() => {
      result.current.handlePaste(mockEvent);
    });

    expect(result.current.otp).toEqual(['1', '2', '3', '4']);
    expect(result.current.otpString).toBe('1234');
  });

  it('handlePaste handles long input correctly', () => {
    const { result } = renderHook(() => useOtpInput(4));

    const mockEvent = {
      clipboardData: {
        getData: () => '123456',
      }
    } as unknown as React.ClipboardEvent<HTMLInputElement>;

    act(() => {
      result.current.handlePaste(mockEvent);
    });

    expect(result.current.otp).toEqual(['1', '2', '3', '4']);
  });

  it('keeps only the last digit and focuses the next input', () => {
    const { result } = renderHook(() => useOtpInput(3));
    const focus = vi.fn();

    act(() => {
      result.current.setInputRef(1, { focus } as unknown as HTMLInputElement);
      result.current.handleChange(0, '12');
    });

    expect(result.current.otp).toEqual(['2', '', '']);
    expect(focus).toHaveBeenCalledOnce();
  });

  it('does not move beyond the last input', () => {
    const { result } = renderHook(() => useOtpInput(2));
    const focus = vi.fn();

    act(() => {
      result.current.setInputRef(1, { focus } as unknown as HTMLInputElement);
      result.current.handleChange(1, '9');
    });

    expect(result.current.otp).toEqual(['', '9']);
    expect(focus).not.toHaveBeenCalled();
  });

  it('focuses the previous input when backspacing an empty digit', () => {
    const { result } = renderHook(() => useOtpInput(3));
    const focus = vi.fn();

    act(() => {
      result.current.setInputRef(0, { focus } as unknown as HTMLInputElement);
      result.current.handleKeyDown(1, { key: 'Backspace' } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(focus).toHaveBeenCalledOnce();
  });

  it('does not move focus for other keydown states', () => {
    const { result } = renderHook(() => useOtpInput(2));
    const focus = vi.fn();

    act(() => {
      result.current.setInputRef(0, { focus } as unknown as HTMLInputElement);
      result.current.handleChange(1, '4');
    });
    act(() => {
      result.current.handleKeyDown(1, { key: 'Backspace' } as React.KeyboardEvent<HTMLInputElement>);
      result.current.handleKeyDown(0, { key: 'Enter' } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(focus).not.toHaveBeenCalled();
  });

  it('ignores paste without digits and focuses after a partial numeric paste', () => {
    const { result } = renderHook(() => useOtpInput(4));
    const focus = vi.fn();

    act(() => {
      result.current.handlePaste({
        clipboardData: { getData: () => 'letters' },
      } as unknown as React.ClipboardEvent<HTMLInputElement>);
    });
    expect(result.current.otpString).toBe('');

    act(() => {
      result.current.setInputRef(2, { focus } as unknown as HTMLInputElement);
      result.current.handlePaste({
        clipboardData: { getData: () => '1a2' },
      } as unknown as React.ClipboardEvent<HTMLInputElement>);
    });

    expect(result.current.otp).toEqual(['1', '2', '', '']);
    expect(focus).toHaveBeenCalledOnce();
  });
});
