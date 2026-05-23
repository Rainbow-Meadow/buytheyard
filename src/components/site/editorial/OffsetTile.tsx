import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Dark "impact tile" overlaid on an editorial column.
 *
 * On md+ it sits with a negative top offset so it visually bridges the
 * preceding tile band into the editorial passage. On mobile it flows
 * inline so nothing overlaps.
 */
export function OffsetTile({
  eyebrow,
  children,
  cite,
  className,
  tone = "ink",
}: {
  eyebrow?: string;
  children: ReactNode;
  cite?: string;
  className?: string;
  tone?: "ink" | "brand";
}) {
  return (
    <aside
      className={cn(
        "relative md:-mt-12 lg:-mt-16 p-7 md:p-8 shadow-xl ring-1",
        tone === "ink"
          ? "bg-zinc-950 text-zinc-100 ring-zinc-800"
          : "bg-brand text-brand-foreground ring-brand/40",
        className,
      )}
    >
      {eyebrow ? (
        <span className="editorial-eyebrow !text-white !border-brand mb-4 block">
          {eyebrow}
        </span>
      ) : null}
      <div className="italic leading-relaxed text-pretty">{children}</div>
      {cite ? (
        <p className="font-mono-meta text-brand mt-4">— {cite}</p>
      ) : null}
    </aside>
  );
}