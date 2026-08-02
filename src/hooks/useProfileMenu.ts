import { useState } from 'react';
import { useClickOutside } from './useClickOutside';

export interface UseProfileMenuResult {
  isOpen: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const useProfileMenu = (): UseProfileMenuResult => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return { isOpen, ref, toggle, close, open };
};
