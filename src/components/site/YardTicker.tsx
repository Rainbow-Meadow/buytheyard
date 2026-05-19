const TICKS = [
  "Yard open · 8a – 5p · 2264 Main St., Jefferson, MA",
  "Today's drop · Hemlock mulch restocked",
  "Same-day delivery · Call before noon",
  "Central Mass · Holden · Worcester · Princeton · Sterling",
  "10 yrs · Woman-owned · WBE certified",
];

/** Marquee ticker styled with the JetBrains Mono utility. Pauses on hover. */
export function YardTicker() {
  // Duplicate the list so the loop appears seamless.
  const items = [...TICKS, ...TICKS];
  return (
    <div className="border-y border-white/10 bg-base/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-2.5 group">
        <span className="ember-dot shrink-0" aria-hidden="true" />
        <span className="mono meta text-brand uppercase tracking-[0.22em] shrink-0">
          Live
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-10 whitespace-nowrap mono text-xs text-zinc-300 animate-[ticker_42s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {items.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span aria-hidden="true" className="text-brand">·</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}