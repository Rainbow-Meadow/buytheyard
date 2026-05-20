import { useCallback, useRef, useState } from "react";

/** Touch swipe-down-to-close gesture for modal dialogs.
 *
 *  Spread the returned handlers + style onto the dialog content element.
 *  No-op on non-touch devices (the touch handlers simply never fire).
 *
 *  Behavior:
 *  - Tracks downward Y motion only; ignores upward drag.
 *  - If the gesture starts inside a scrollable area that is NOT at scrollTop,
 *    we let native scroll take over and never start dragging the sheet.
 *  - Releases below threshold (120px) or above velocity (0.5 px/ms) → close.
 *  - Otherwise springs back with a short transition. */
export function useSwipeToClose(onClose: () => void) {
  const [dy, setDy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const startT = useRef(0);
  const active = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    if (!t) return;
    // If the touch originated inside a scrolled-down scroll container, defer.
    let node: HTMLElement | null = e.target as HTMLElement;
    while (node && node !== e.currentTarget) {
      if (node.scrollHeight > node.clientHeight && node.scrollTop > 0) {
        active.current = false;
        return;
      }
      node = node.parentElement;
    }
    active.current = true;
    startY.current = t.clientY;
    startT.current = performance.now();
    setDragging(true);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (!active.current) return;
    const t = e.touches[0];
    if (!t) return;
    const delta = t.clientY - startY.current;
    if (delta <= 0) {
      setDy(0);
      return;
    }
    setDy(delta);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!active.current) {
      setDragging(false);
      return;
    }
    const elapsed = performance.now() - startT.current;
    const velocity = elapsed > 0 ? dy / elapsed : 0;
    active.current = false;
    setDragging(false);
    if (dy > 120 || velocity > 0.5) {
      onClose();
      // Reset after the dialog has unmounted so a reopen starts clean.
      setTimeout(() => setDy(0), 250);
    } else {
      setDy(0);
    }
  }, [dy, onClose]);

  const style: React.CSSProperties = {
    transform: dy ? `translateY(${dy}px)` : undefined,
    transition: dragging ? "none" : "transform 200ms ease-out",
    touchAction: "pan-y",
  };

  return { onTouchStart, onTouchMove, onTouchEnd, style };
}