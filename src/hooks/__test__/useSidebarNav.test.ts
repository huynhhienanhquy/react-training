import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSidebarNav } from '../useSidebarNav';

describe('useSidebarNav', () => {
  it('starts with the default nav and closed mobile drawer', () => {
    const { result } = renderHook(() => useSidebarNav());

    expect(result.current.activeNav).toBe('chats');
    expect(result.current.isMobileOpen).toBe(false);
  });

  it('accepts an initial nav value', () => {
    const { result } = renderHook(() => useSidebarNav('settings'));

    expect(result.current.activeNav).toBe('settings');
  });

  it('setActiveNav updates the active nav', () => {
    const { result } = renderHook(() => useSidebarNav());

    act(() => {
      result.current.setActiveNav('favorites');
    });

    expect(result.current.activeNav).toBe('favorites');
  });

  it('onMobileToggle toggles the mobile drawer', () => {
    const { result } = renderHook(() => useSidebarNav());

    act(() => {
      result.current.onMobileToggle();
    });

    expect(result.current.isMobileOpen).toBe(true);

    act(() => {
      result.current.onMobileToggle();
    });

    expect(result.current.isMobileOpen).toBe(false);
  });
});
