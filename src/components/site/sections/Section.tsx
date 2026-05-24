import type { ReactNode } from "react";

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

export interface SectionProps {
  index?: string | number;
  label?: string;
  tone?: SectionTone;
  accentIndex?: boolean;
  /** Bottom hairline rule. Default true. Last section on page can pass false. */
  rule?: boolean;
  children: ReactNode;
}

export function Section({
  index,
  label,
  tone = "paper",
  accentIndex = false,
  rule = true,
  children,
}: SectionProps) {
  const railBorder = RAIL_BORDER[tone];
  return (
    <section
      className={[
        "flex flex-col md:flex-row",
        TONE[tone],
        rule ? `border-b ${railBorder}` : "",
      ].join(" ")}
    >
      {index !== undefined && (
        <aside
          className={[
            "md:w-24 shrink-0 p-6 flex flex-col justify-between",
            "border-b md:border-b-0 md:border-r",
            railBorder,
          ].join(" ")}
        >
          <span
            className={[
              "font-bebas text-4xl leading-none",
              accentIndex ? "text-ember" : "",
            ].join(" ")}
          >
            {typeof index === "number" ? String(index).padStart(2, "0") : index}
          </span>
          {label && (
            <span className="hidden md:block rotate-180 [writing-mode:vertical-lr] text-[10px] tracking-widest uppercase font-mono-industrial opacity-60">
              {label}
            </span>
          )}
        </aside>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </section>
  );
}
