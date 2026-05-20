import { useEffect, useRef, useState } from "react";

/** Touch gestures for the shared expandable image dialog:
 *  - Swipe UP to close (vertical axis, negative dy).
 *  - Swipe LEFT/RIGHT to navigate prev/next within the group (horizontal axis).
 *
 *  Attach the returned `ref` to `DialogContent` and spread `style`. The hook
 *  installs native (non-passive) touch listeners so it can call
 *  `preventDefault()` when it owns the gesture, which is required to stop
 *  native page-pan from competing with horizontal swipes.
 *
 *  Axis is decided after ~10px of motion, then locked for the duration of
 *  the gesture. Vertical close defers to native scrolling whenever the
 *  touch starts inside an internal scroll container that isn't at the
 *  bottom (so the user can read the description without dismissing). */
export function useDialogGestures({
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Refs so the event handlers (registered once) always read fresh values.
  const hasPrevRef = useRef(hasPrev);
  const hasNextRef = useRef(hasNext);
  const onCloseRef = useRef(onClose);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  hasPrevRef.current = hasPrev;
  hasNextRef.current = hasNext;
  onCloseRef.current = onClose;
  onPrevRef.current = onPrev;
  onNextRef.current = onNext;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let axis: "none" | "h" | "v" = "none";
    let startX = 0;
    let startY = 0;
    let startT = 0;
    let active = false;
    let deferV = false; // skip vertical-close when native scroll has room
    let currentDx = 0;
    let currentDy = 0;

    const reset = () => {
      axis = "none";
      active = false;
      deferV = false;
      currentDx = 0;
      currentDy = 0;
    };

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      deferV = false;
      // If the touch starts inside an internal scrollable that still has
      // room to scroll down, let native scroll own the vertical axis.
      let node = e.target as HTMLElement | null;
      while (node && node !== el) {
        if (node.scrollHeight > node.clientHeight) {
          const atBottom =
            node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
          if (!atBottom) deferV = true;
          break;
        }
        node = node.parentElement;
      }
      active = true;
      axis = "none";
      startX = t.clientX;
      startY = t.clientY;
      startT = performance.now();
      setDragging(true);
    };

    const onMove = (e: TouchEvent) => {
      if (!active) return;
      const t = e.touches[0];
      if (!t) return;
      const ddx = t.clientX - startX;
      const ddy = t.clientY - startY;

      if (axis === "none") {
        const dist = Math.hypot(ddx, ddy);
        if (dist < 10) return;
        axis = Math.abs(ddx) > Math.abs(ddy) ? "h" : "v";
      }

      if (axis === "v") {
        // Swipe-UP to close — clamp to negative.
        if (deferV || ddy >= 0) {
          currentDy = 0;
          setDy(0);
          return;
        }
        e.preventDefault();
        currentDy = ddy;
        currentDx = 0;
        setDy(ddy);
        setDx(0);
      } else {
        // Horizontal nav — rubber-band when no neighbor on that side.
        e.preventDefault();
        let val = ddx;
        const damp =
          (val < 0 && !hasNextRef.current) ||
          (val > 0 && !hasPrevRef.current);
        if (damp) val = val * 0.3;
        currentDx = val;
        currentDy = 0;
        setDx(val);
        setDy(0);
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (!active) {
        setDragging(false);
        reset();
        return;
      }
      const t = e.changedTouches[0];
      const endX = t ? t.clientX - startX : currentDx;
      const endY = t ? t.clientY - startY : currentDy;
      const elapsed = performance.now() - startT;
      setDragging(false);

      if (axis === "v") {
        const finalDy = Math.min(0, endY);
        const dist = Math.abs(finalDy);
        const v = elapsed > 0 ? dist / elapsed : 0;
        const thresh = Math.min(
          200,
          Math.max(100, window.innerHeight * 0.2),
        );
        if (!deferV && (dist > thresh || (v > 0.45 && dist > 40))) {
          onCloseRef.current();
          // Reset after the dialog unmounts so a reopen starts clean.
          setTimeout(() => {
            setDy(0);
            setDx(0);
          }, 250);
        } else {
          setDy(0);
        }
      } else if (axis === "h") {
        const dist = Math.abs(endX);
        const v = elapsed > 0 ? dist / elapsed : 0;
        const width = el.clientWidth || window.innerWidth;
        const thresh = Math.min(180, Math.max(80, width * 0.25));
        const wentLeft = endX < 0;
        const canGo = wentLeft ? hasNextRef.current : hasPrevRef.current;
        if (canGo && (dist > thresh || (v > 0.45 && dist > 40))) {
          if (wentLeft) onNextRef.current();
          else onPrevRef.current();
          setDx(0);
          setDy(0);
        } else {
          setDx(0);
        }
      }
      reset();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  const style: React.CSSProperties = {
    transform: dx || dy ? `translate(${dx}px, ${dy}px)` : undefined,
    transition: dragging ? "none" : "transform 200ms ease-out",
    touchAction: "pan-y",
  };

  return { ref, style };
}