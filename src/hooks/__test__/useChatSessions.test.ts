import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useChatSessions } from '@/hooks/useChatSessions';

describe('useChatSessions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts empty', () => {
    const { result } = renderHook(() => useChatSessions());

    expect(result.current.sessions).toEqual([]);
    expect(result.current.activeSessionId).toBeNull();
    expect(result.current.currentMessages).toEqual([]);
    expect(result.current.isTyping).toBe(false);
  });

  it('restores the active conversation after the chat is remounted', () => {
    const firstRender = renderHook(() => useChatSessions());

    act(() => {
      firstRender.result.current.sendMessage('Hotels in Bahamas');
      vi.advanceTimersByTime(1200);
    });

    const activeSessionId = firstRender.result.current.activeSessionId;
    firstRender.unmount();

    const secondRender = renderHook(() => useChatSessions());

    expect(secondRender.result.current.activeSessionId).toBe(activeSessionId);
    expect(secondRender.result.current.sessions).toHaveLength(1);
    expect(secondRender.result.current.currentMessages).toHaveLength(2);
    expect(secondRender.result.current.currentMessages[0].text).toBe(
      'Hotels in Bahamas',
    );
    expect(secondRender.result.current.currentMessages[1].type).toBe('hotel');
  });

  it('creates a session and appends user message on sendMessage', () => {
    const { result } = renderHook(() => useChatSessions());

    act(() => {
      result.current.sendMessage('Cheap flights to Lagos');
    });

    expect(result.current.sessions).toHaveLength(1);
    expect(result.current.activeSessionId).toBe(
      result.current.sessions[0].id,
    );
    expect(result.current.sessions[0].title).toBe(
      'Cheap flights to Lagos',
    );
    expect(result.current.sessions[0].group).toBe('TODAY');
    expect(result.current.currentMessages).toEqual([
      { id: expect.any(String), sender: 'user', text: 'Cheap flights to Lagos' },
    ]);
  });

  it('truncates long titles to 28 characters', () => {
    const { result } = renderHook(() => useChatSessions());

    const longText = 'a'.repeat(40);

    act(() => {
      result.current.sendMessage(longText);
    });

    expect(result.current.sessions[0].title).toBe(
      longText.substring(0, 28) + '...',
    );
  });

  it('ignores blank messages', () => {
    const { result } = renderHook(() => useChatSessions());

    let sent: boolean;

    act(() => {
      sent = result.current.sendMessage('   ');
    });

    expect(sent!).toBe(false);
    expect(result.current.sessions).toEqual([]);
  });

  it('appends to the active session when one exists', () => {
    const { result } = renderHook(() => useChatSessions());

    act(() => {
      result.current.sendMessage('First message');
    });

    const sessionId = result.current.activeSessionId;

    act(() => {
      result.current.sendMessage('Second message');
    });

    expect(result.current.sessions).toHaveLength(1);
    expect(result.current.activeSessionId).toBe(sessionId);
    expect(result.current.currentMessages).toHaveLength(2);
  });

  it('emits an AI flight response after the delay', () => {
    const { result } = renderHook(() => useChatSessions());

    act(() => {
      result.current.sendMessage('Cheap flights to Lagos');
    });

    expect(result.current.isTyping).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.isTyping).toBe(false);
    const last = result.current.currentMessages[1];
    expect(last.sender).toBe('ai');
    expect(last.type).toBe('flight');
  });

  it('emits an AI hotel response for hotel queries', () => {
    const { result } = renderHook(() => useChatSessions());

    act(() => {
      result.current.sendMessage('Hotels in Bahamas');
    });

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.currentMessages[1].type).toBe('hotel');
  });

  it('uses a generic response for other queries', () => {
    const { result } = renderHook(() => useChatSessions());

    act(() => {
      result.current.sendMessage('Plan a trip');
    });

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.currentMessages[1].type).toBe('text');
  });

  it('startNewChat clears the active session', () => {
    const { result } = renderHook(() => useChatSessions());

    act(() => {
      result.current.sendMessage('Hello');
    });

    act(() => {
      result.current.startNewChat();
    });

    expect(result.current.activeSessionId).toBeNull();
    expect(result.current.currentMessages).toEqual([]);
  });

  it('selectSession switches the active session', () => {
    const { result } = renderHook(() => useChatSessions());

    act(() => {
      result.current.sendMessage('First');
    });

    const firstSessionId = result.current.activeSessionId!;

    act(() => {
      result.current.startNewChat();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
      result.current.sendMessage('Second');
    });

    const secondSessionId = result.current.activeSessionId!;

    expect(firstSessionId).not.toBe(secondSessionId);
    expect(result.current.sessions).toHaveLength(2);

    act(() => {
      result.current.selectSession(firstSessionId);
    });

    expect(result.current.activeSessionId).toBe(firstSessionId);
    expect(result.current.currentMessages).toHaveLength(1);
    expect(result.current.currentMessages[0].text).toBe('First');
  });
});
