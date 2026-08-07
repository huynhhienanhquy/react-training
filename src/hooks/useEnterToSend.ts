import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

export const useEnterToSend = (onSend: () => void) => {
  return useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // Trigger send on Enter (without holding Shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend],
  );
};
