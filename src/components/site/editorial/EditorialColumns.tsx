import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 12-column editorial grid with named slots.
 *
 * `variant="lead-body"`  → 4 / rule / 7        (kicker + prose)
 * `variant="lead-body-aside"` → 3 / 5 / 3      (kicker + prose + sidebar)
 *
 * Mobile collapses to a single column with stacked order: lead → body → aside.
 * A vertical hairline is rendered between lead and body on `md+` by default.
 */
export interface EditorialColumnsProps {
  variant?: "lead-body" | "lead-body-aside";
  lead: ReactNode;
  body: ReactNode;
  aside?: ReactNode;
  /** Hide the vertical rule between lead and body on md+. */
  noRule?: boolean;
  className?: string;
}

export function EditorialColumns({
  variant = "lead-body",
  lead,
  body,
  aside,
  noRule,
  className,
}: EditorialColumnsProps) {
  if (variant === "lead-body-aside") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-12",
          className,
        )}
      >
        <div className="md:col-span-3">{lead}</div>
        <div className="md:col-span-6">{body}</div>
        <div className="md:col-span-3">{aside}</div>
      </div>
    );
  }

  // lead-body
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12",
        className,
      )}
    >
      <div className="md:col-span-4">{lead}</div>
      {noRule ? null : (
        <div className="hidden md:flex md:col-span-1 md:justify-center" aria-hidden="true">
          <div className="rule-v h-full" />
        </div>
      )}
      <div className={noRule ? "md:col-span-8" : "md:col-span-7"}>{body}</div>
    </div>
  );
}