import type { ReactNode } from "react";

/**
 * Marquee strip — content scrolls right→left, paused on hover and
 * for prefers-reduced-motion (handled in styles.css).
 * Pass `items` for simple text segments; we duplicate them so the
 * marquee loops seamlessly.
 */
export function Ticker({
  items,
  tone = "ink",
  className = "",
}: {
  items: ReactNode[];
  tone?: "ink" | "newsprint" | "stamp";
  className?: string;
}) {
  const toneCls =
    tone === "ink"
      ? "bg-ink text-newsprint"
      : tone === "stamp"
        ? "bg-stamp text-newsprint"
        : "bg-newsprint text-ink border-y border-rule-strong";

  return (
    <div
      className={`overflow-hidden ${toneCls} ${className}`}
      aria-label="Yard ticker"
    >
      <div className="ticker-track py-2.5 whitespace-nowrap">
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 dateline tabular"
          >
            {it}
            <span aria-hidden className="text-current/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}