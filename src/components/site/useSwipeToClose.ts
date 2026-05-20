import { useCallback, useRef, useState } from "react";

/** Close thresholds tuned to feel consistent on iOS Safari and Android Chrome.
 *
 *  - Distance: 20% of viewport height, clamped to [100, 200] px. Apple's
 *    own sheet uses ~25% with a fast spring; matching that on tall Android
 *    devices (e.g. 900px) would require dragging 225px which feels sticky,
 *    while a fixed 120px feels twitchy on small iOS devices. A clamped
 *    viewport-relative value bridges both.
 *  - Velocity: 0.45 px/ms (≈ Material's "fling" + vaul defaults). iOS
 *    momentum produces slightly higher velocities than Android for the same
 *    perceived flick, so we stay just below vaul's 0.5 to compensate.
 *  - Minimum travel for velocity-close: 40px. Prevents an accidental tap
 *    + tiny twitch on iOS (which can register a 10–20px flick) from
 *    dismissing the sheet. */
const VELOCITY_CLOSE = 0.45; // px / ms
const VELOCITY_MIN_TRAVEL = 40; // px

function distanceThreshold(): number {
  if (typeof window === "undefined") return 140;
  return Math.min(200, Math.max(100, window.innerHeight * 0.2));
}

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

  const onTouchEnd = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (!active.current) {
      setDragging(false);
      return;
    }
    // iOS sometimes skips the final touchmove — read end position from
    // changedTouches so velocity reflects the actual release point.
    const endTouch = e.changedTouches[0];
    const endY = endTouch ? endTouch.clientY - startY.current : dy;
    const finalDy = Math.max(0, endY);
    const elapsed = performance.now() - startT.current;
    const velocity = elapsed > 0 ? finalDy / elapsed : 0;
    active.current = false;
    setDragging(false);
    const shouldClose =
      finalDy > distanceThreshold() ||
      (velocity > VELOCITY_CLOSE && finalDy > VELOCITY_MIN_TRAVEL);
    if (shouldClose) {
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