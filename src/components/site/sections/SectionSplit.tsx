import type { ReactNode } from "react";

export function SectionSplit({
  left,
  right,
  rightTone = "soft",
}: {
  left: ReactNode;
  right: ReactNode;
  rightTone?: "soft" | "ink" | "black" | "paper";
}) {
  const rightCls = {
    paper: "bg-paper",
    soft: "bg-soft",
    ink: "bg-ink text-paper",
    black: "bg-black text-paper",
  }[rightTone];
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-8 md:p-16 border-b md:border-b-0 md:border-r border-soft">
        {left}
      </div>
      <div className={["flex-1 p-8 md:p-16", rightCls].join(" ")}>{right}</div>
    </div>
  );
}
