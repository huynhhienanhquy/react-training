import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LazyRender } from '.';

describe('LazyRender', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders children immediately when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);

    render(
      <LazyRender>
        <div>Lazy content</div>
      </LazyRender>,
    );

    expect(screen.getByText('Lazy content')).toBeInTheDocument();
  });

  it('waits to render children until the placeholder enters the viewport', () => {
    let observerCallback: IntersectionObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();

    class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe = observe;
      disconnect = disconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '';
      thresholds = [];
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

    const { container } = render(
      <LazyRender rootMargin="100px">
        <div>Lazy content</div>
      </LazyRender>,
    );

    const placeholder = container.querySelector('[aria-hidden="true"]');

    expect(placeholder).toBeInTheDocument();
    expect(observe).toHaveBeenCalledWith(placeholder);
    expect(screen.queryByText('Lazy content')).not.toBeInTheDocument();

    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByText('Lazy content')).toBeInTheDocument();
    expect(disconnect).toHaveBeenCalled();
  });

  it('keeps the placeholder when it is outside the viewport', () => {
    let observerCallback: IntersectionObserverCallback | undefined;

    class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '';
      thresholds = [];
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

    const { container } = render(
      <LazyRender>
        <div>Lazy content</div>
      </LazyRender>,
    );

    act(() => {
      observerCallback?.(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(screen.queryByText('Lazy content')).not.toBeInTheDocument();
  });
});
