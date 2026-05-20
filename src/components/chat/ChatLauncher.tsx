import { useEffect, useState, type ComponentType } from "react";
import { MessageCircle } from "lucide-react";

type ChatWidgetProps = { defaultOpen?: boolean };

/**
 * Lightweight stand-in for ChatWidget. Renders only the FAB until the user
 * interacts (click, scroll, pointer) or the browser is idle — then dynamically
 * imports the real widget, keeping `@ai-sdk/react` + `ai` out of the root bundle.
 */
export function ChatLauncher() {
  const [Widget, setWidget] = useState<ComponentType<ChatWidgetProps> | null>(null);
  const [pendingOpen, setPendingOpen] = useState(false);

  // Lazy-load on first idle / interaction.
  useEffect(() => {
    let cancelled = false;
    let triggered = false;

    const load = () => {
      if (triggered) return;
      triggered = true;
      cleanup();
      import("@/components/chat/ChatWidget").then((m) => {
        if (!cancelled) setWidget(() => m.ChatWidget);
      });
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("scroll", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("touchstart", load);
    };

    window.addEventListener("pointerdown", load, { once: true, passive: true });
    window.addEventListener("scroll", load, { once: true, passive: true });
    window.addEventListener("keydown", load, { once: true });
    window.addEventListener("touchstart", load, { once: true, passive: true });

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const w = window as IdleWindow;
    const idle =
      typeof w.requestIdleCallback === "function"
        ? w.requestIdleCallback(load, { timeout: 4000 })
        : window.setTimeout(load, 2500);

    return () => {
      cancelled = true;
      cleanup();
      if (typeof idle === "number") clearTimeout(idle);
    };
  }, []);

  if (Widget) return <Widget defaultOpen={pendingOpen} />;

  return (
    <button
      type="button"
      aria-label="Open chat with BTY Helper"
      onClick={() => {
        setPendingOpen(true);
        import("@/components/chat/ChatWidget").then((m) => setWidget(() => m.ChatWidget));
      }}
      className="print:hidden fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-brand text-brand-foreground pl-4 pr-5 h-14 shadow-lg hover:opacity-90 transition-opacity font-semibold uppercase tracking-widest text-xs"
    >
      <MessageCircle className="size-5" />
      Ask BTY
    </button>
  );
}