import { useEffect, useState } from "react";

const STORAGE_KEY = "bty.splash.shown";
const MIN_VISIBLE_MS = 600;
const MAX_VISIBLE_MS = 1500;
const FADE_MS = 300;

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sessionStorage blocked — still show once this load
    }

    setMounted(true);
    // next frame -> fade in
    requestAnimationFrame(() => setVisible(true));

    const start = performance.now();
    let hideTimer: number | undefined;
    let removeTimer: number | undefined;

    const hide = () => {
      setVisible(false);
      removeTimer = window.setTimeout(() => setMounted(false), FADE_MS);
    };

    const ready = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      hideTimer = window.setTimeout(hide, wait);
    };

    if (document.readyState === "complete") {
      ready();
    } else {
      window.addEventListener("load", ready, { once: true });
    }
    const cap = window.setTimeout(hide, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", ready);
      if (hideTimer) clearTimeout(hideTimer);
      if (removeTimer) clearTimeout(removeTimer);
      clearTimeout(cap);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface transition-opacity motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
    >
      <img
        src="/brandmark.png"
        alt=""
        width={96}
        height={96}
        className="h-24 w-24 object-contain motion-safe:animate-[fadeIn_200ms_ease-out]"
      />
    </div>
  );
}