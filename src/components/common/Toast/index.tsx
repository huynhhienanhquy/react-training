import { useSyncExternalStore } from 'react';
import { dismissToast, getToasts, subscribeToToasts, type ToastType } from '@/services/toast';

const styles: Record<ToastType, { accent: string; icon: string }> = {
  success: { accent: 'bg-emerald-500', icon: '✓' },
  error: { accent: 'bg-red-500', icon: '!' },
  info: { accent: 'bg-blue-500', icon: 'i' },
  warning: { accent: 'bg-amber-500', icon: '!' },
};

export const ToastContainer = () => {
  const toasts = useSyncExternalStore(subscribeToToasts, getToasts, getToasts);

  return (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
    >
      {toasts.map((item) => {
        const style = styles[item.type];
        return (
          <div
            key={item.id}
            role={item.type === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex min-h-14 items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 pr-2 text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <span
              aria-hidden="true"
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${style.accent}`}
            >
              {style.icon}
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium leading-5">{item.message}</p>
            <button
              type="button"
              aria-label="Close notification"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-700 dark:hover:text-white"
              onClick={() => dismissToast(item.id)}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
