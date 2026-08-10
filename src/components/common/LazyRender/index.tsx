import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazyRenderProps {
  children: ReactNode;
  rootMargin?: string;
}

export const LazyRender = ({
  children,
  rootMargin = '200px',
}: LazyRenderProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  useEffect(() => {
    if (hasEnteredViewport) return;

    const element = placeholderRef.current;

    if (!element || typeof IntersectionObserver === 'undefined') {
      setHasEnteredViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasEnteredViewport, rootMargin]);

  if (hasEnteredViewport) return children;

  return <div ref={placeholderRef} className="min-h-24 w-full" aria-hidden="true" />;
};
