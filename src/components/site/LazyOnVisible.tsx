import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  /** Rendered once the placeholder enters the viewport (or rootMargin band). */
  children: ReactNode;
  /** Placeholder used both before hydration of children and as the Suspense fallback. */
  fallback?: ReactNode;
  /** IntersectionObserver rootMargin — defaults to "400px" so chunks fetch just before scroll-in. */
  rootMargin?: string;
};

/**
 * Defers rendering of `children` until a sentinel scrolls within `rootMargin`
 * of the viewport. Pairs with `React.lazy()` so the lazy chunk fetch only
 * fires when the section is about to be needed.
 *
 * The `fallback` must reserve realistic height to avoid layout shift.
 */
export function LazyOnVisible({ children, fallback, rootMargin = "400px" }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = sentinelRef.current;
    if (!el) return;

    // Safety net for environments without IntersectionObserver.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  if (!visible) {
    return (
      <div ref={sentinelRef} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}