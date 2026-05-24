import type { ReactNode } from "react";

export function SectionSplit({
  left,
  right,
  rightTone = "soft",
  compact = false,
}: {
  left: ReactNode;
  right: ReactNode;
  rightTone?: "soft" | "ink" | "black" | "paper";
  compact?: boolean;
}) {
  const rightCls = {
    paper: "bg-paper",
    soft: "bg-soft",
    ink: "bg-ink text-paper",
    black: "bg-black text-paper",
  }[rightTone];
  const pad = compact ? "p-6 md:py-8 md:px-12" : "p-8 md:p-16";
  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <div className={`flex-1 min-h-0 ${pad} border-b md:border-b-0 md:border-r border-soft md:overflow-hidden`}>
        {left}
      </div>
      <div className={["flex-1 min-h-0 md:overflow-hidden", pad, rightCls].join(" ")}>{right}</div>
    </div>
  );
}
