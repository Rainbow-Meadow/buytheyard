import type { ReactNode } from "react";
import { SectionBackdrop, type SectionBackground } from "./SectionBackdrop";

export type SectionTone = "paper" | "soft" | "ink" | "black";

const TONE: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  soft: "bg-soft text-ink",
  ink: "bg-ink text-paper",
  black: "bg-black text-paper",
};

const RAIL_BORDER: Record<SectionTone, string> = {
  paper: "border-ink/100",
  soft: "border-ink/100",
  ink: "border-paper/20",
  black: "border-paper/20",
};

const RAIL_CHIP: Record<SectionTone, string> = {
  paper: "bg-ink text-paper",
  soft: "bg-ink text-paper",
  ink: "bg-paper text-ink",
  black: "bg-paper text-ink",
};

export interface SectionProps {
  title?: string;
  tone?: SectionTone;
  /** Bottom hairline rule. Default true. Last section on page can pass false. */
  rule?: boolean;
  /** Optional height constraint applied to the section row (e.g. md:h-[calc(30svh-1.2rem)]). */
  heightClass?: string;
  /**
   * Background treatment. Ignored on `ink`/`black` tones — those bands stay flat
   * as visual anchors. Paper/soft bands accept either a faded photo or the
   * spec-sheet scatter pattern.
   */
  background?: SectionBackground;
  children: ReactNode;
}

export function Section({
  title,
  tone = "paper",
  rule = true,
  heightClass,
  background,
  children,
}: SectionProps) {
  const railBorder = RAIL_BORDER[tone];
  const railChip = RAIL_CHIP[tone];
  const allowsBackdrop = tone === "paper" || tone === "soft";
  const bg: SectionBackground = allowsBackdrop && background ? background : { kind: "none" };
  const showBackdrop = bg.kind !== "none";
  return (
    <section
      className={[
        "relative flex flex-col md:flex-row",
        TONE[tone],
        rule ? `border-b ${railBorder}` : "",
        heightClass ?? "",
        heightClass ? "md:overflow-hidden" : "",
        showBackdrop ? "overflow-hidden" : "",
      ].join(" ")}
    >
      {showBackdrop && <SectionBackdrop background={bg} />}
      {title && (
        <aside
          className={[
            "relative md:w-24 shrink-0 p-6 flex md:items-start md:overflow-hidden",
            "border-b md:border-b-0 md:border-r",
            railBorder,
          ].join(" ")}
        >
          <span
            className={[
              "inline-flex items-center rounded-full px-3 py-1.5",
              "font-bebas uppercase leading-none tracking-widest text-2xl md:text-3xl",
              "md:[writing-mode:vertical-rl] md:rotate-180",
              railChip,
            ].join(" ")}
          >
            {title}
          </span>
        </aside>
      )}
      <div className="relative flex-1 min-w-0 md:h-full">{children}</div>
    </section>
  );
}
