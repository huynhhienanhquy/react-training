import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  it('returns the value provided by ThemeContext', () => {
    const toggleTheme = vi.fn();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
    act(() => result.current.toggleTheme());
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('throws when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider',
    );
  });
});
