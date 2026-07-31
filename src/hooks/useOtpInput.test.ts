import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useOtpInput } from './useOtpInput';
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
});
