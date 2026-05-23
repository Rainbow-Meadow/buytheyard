import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Outer wrapper for an editorial passage. Sits between tile bands.
 *
 * Editorial sections are scroll-flow (NOT viewport-locked like TileScreen).
 * They establish vertical rhythm with a top hairline + comfortable padding,
 * and optionally surface an eyebrow + section heading.
 */
export interface EditorialSectionProps {
  /** Optional kicker rendered with `.editorial-eyebrow` styling. */
  eyebrow?: string;
  /** Optional sr-only label for the <section> landmark. */
  label?: string;
  /** ID for in-page anchoring. */
  id?: string;
  /** Visual top rule. Defaults to true; pass false for the first editorial
   *  section after a tile band where the rule would feel redundant. */
  rule?: boolean;
  /** Background variant. Default uses --editorial-bg (warm off-white). */
  surface?: "base" | "kraft" | "ink";
  className?: string;
  children: ReactNode;
}

const surfaceCls: Record<NonNullable<EditorialSectionProps["surface"]>, string> = {
  base: "bg-[var(--editorial-bg)] text-zinc-950",
  kraft: "bg-kraft text-zinc-950",
  ink: "bg-zinc-950 text-zinc-100",
};

export function EditorialSection({
  eyebrow,
  label,
  id,
  rule = true,
  surface = "base",
  className,
  children,
}: EditorialSectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        surfaceCls[surface],
        "py-16 md:py-24",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {rule ? <div className="rule-h mb-12 md:mb-16" aria-hidden="true" /> : null}
        {eyebrow ? (
          <span className="editorial-eyebrow mb-8 md:mb-10">{eyebrow}</span>
        ) : null}
        {children}
      </div>
    </section>
  );
}