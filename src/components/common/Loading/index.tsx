import { memo } from 'react';
import { createPortal } from 'react-dom';
import appLogo from '@/assets/images/app-logo.png';

interface LoadingOverlayProps {
  isVisible?: boolean;
}

export const LoadingOverlay = memo(function LoadingOverlay({
  isVisible = true,
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-white/60">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200/70 border-l-primary border-t-primary" />

        <img
          src={appLogo}
          alt=""
          aria-hidden="true"
          className="h-8 w-8 rounded-lg object-contain shadow-md"
        />
      </div>
    </div>,
    document.body,
  );
});