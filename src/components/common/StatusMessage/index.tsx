interface StatusMessageProps {
  message: string;
  className?: string;
}

export const StatusMessage = ({ message, className = '' }: StatusMessageProps) => {
  if (!message) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className={`rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-700 ${className}`}
    >
      {message}
    </p>
  );
};
