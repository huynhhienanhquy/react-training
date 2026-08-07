import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useChatTitle } from '@/hooks/useChatTitle';
import type { ChatMessage } from '@/types/chat';

const userMessage: ChatMessage = {
  id: '1',
  sender: 'user',
  text: 'Flights to Lagos',
};

const aiMessage: ChatMessage = {
  id: '2',
  sender: 'ai',
  text: 'Sure!',
};

describe('useChatTitle', () => {
  it('returns the chatTitle when provided', () => {
    const { result } = renderHook(() =>
      useChatTitle('My Trip', [userMessage], 'Fallback'),
    );

    expect(result.current).toBe('My Trip');
  });

  it('falls back to the first user message', () => {
    const { result } = renderHook(() =>
      useChatTitle(undefined, [userMessage, aiMessage], 'Fallback'),
    );

    expect(result.current).toBe('Flights to Lagos');
  });

  it('falls back to the default when there are no user messages', () => {
    const { result } = renderHook(() =>
      useChatTitle(undefined, [aiMessage], 'Fallback'),
    );

    expect(result.current).toBe('Fallback');
  });

  it('returns an empty string with no inputs', () => {
    const { result } = renderHook(() => useChatTitle());

    expect(result.current).toBe('');
  });
});
