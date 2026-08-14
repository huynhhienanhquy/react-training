export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  duration?: number;
}

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const listeners = new Set<() => void>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();
let items: ToastItem[] = [];
let nextId = 0;

const emit = () => listeners.forEach((listener) => listener());

export const dismissToast = (id?: number) => {
  if (id === undefined) {
    timers.forEach((timer) => clearTimeout(timer));
    timers.clear();
    items = [];
  } else {
    const timer = timers.get(id);
    if (timer) clearTimeout(timer);
    timers.delete(id);
    items = items.filter((item) => item.id !== id);
  }
  emit();
};

const show = (message: string, type: ToastType, options: ToastOptions = {}) => {
  const id = ++nextId;
  items = [...items, { id, message, type }];
  emit();

  const duration = options.duration ?? 4000;
  if (duration > 0) timers.set(id, setTimeout(() => dismissToast(id), duration));
  return id;
};

export const toast = {
  success: (message: string, options?: ToastOptions) => show(message, 'success', options),
  error: (message: string, options?: ToastOptions) => show(message, 'error', options),
  info: (message: string, options?: ToastOptions) => show(message, 'info', options),
  warning: (message: string, options?: ToastOptions) => show(message, 'warning', options),
  dismiss: dismissToast,
};

export const subscribeToToasts = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getToasts = () => items;
