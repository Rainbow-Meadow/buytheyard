import type { ReactNode } from "react";

/**
 * Viewport-locked tile composition.
 *
 * Renders a CSS grid that fills exactly `--tile-screen-h` (100svh minus
 * the sticky header) and never scrolls vertically. Each layout has a
 * canonical mobile + desktop shape defined in styles.css via
 * `grid-template-areas`. Slots place themselves with `ts-slot-*`
 * utilities — children are responsible for filling their cell
 * (use `<Tile {...} fill />` or any element with `h-full w-full`).
 *
 * Content overflow inside a single slot is allowed — typically a
 * horizontal carousel — but never vertical scrolling of the screen
 * itself.
 */

export type TileScreenLayout =
  | "pageHero"
  | "section01"
  | "section02"
  | "section03"
  | "section04"
  | "section05";

export type TileScreenSlot = "hero" | "a" | "b" | "c" | "d" | "e";

const layoutCls: Record<TileScreenLayout, string> = {
  pageHero: "ts-page-hero",
  section01: "ts-section-01",
  section02: "ts-section-02",
  section03: "ts-section-03",
  section04: "ts-section-04",
  section05: "ts-section-05",
};

const slotCls: Record<TileScreenSlot, string> = {
  hero: "ts-slot-hero",
  a: "ts-slot-a",
  b: "ts-slot-b",
  c: "ts-slot-c",
  d: "ts-slot-d",
  e: "ts-slot-e",
};

interface TileScreenProps {
  layout: TileScreenLayout;
  /** Slot key → ReactNode. Pass `<Tile {...block} fill />` or custom JSX. */
  tiles: Partial<Record<TileScreenSlot, ReactNode>>;
  /** Optional aria-label for the section landmark. */
  label?: string;
  /** Optional override className applied to the outer <section>. */
  className?: string;
  /**
   * Optional descriptive heading for the section. Rendered visually-hidden
   * (sr-only) so it does not disturb the tiled visual layout, but provides
   * a proper document heading hierarchy for SEO and assistive tech.
   * Use `headingLevel="h1"` for the primary page heading (exactly once per
   * route) and `headingLevel="h2"` for subsequent section headings.
   */
  heading?: string;
  headingLevel?: "h1" | "h2";
}

export function TileScreen({ layout, tiles, label, className, heading, headingLevel = "h2" }: TileScreenProps) {
  const order: TileScreenSlot[] = ["hero", "a", "b", "c", "d", "e"];
  const HeadingTag = headingLevel;
  return (
    <section
      aria-label={label}
      className={`tile-screen ${layoutCls[layout]} ${className ?? ""}`}
    >
      {heading ? <HeadingTag className="sr-only">{heading}</HeadingTag> : null}
      {order.map((slot) => {
        const node = tiles[slot];
        if (node === undefined || node === null) return null;
        return (
          <div key={slot} className={`tile-screen-cell ${slotCls[slot]}`}>
            {node}
          </div>
        );
      })}
    </section>
  );
}