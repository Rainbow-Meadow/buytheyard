import type { ReactNode } from "react";

const COLS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-4",
};

export function SectionGrid({
  cols = 4,
  children,
}: {
  cols?: 2 | 3 | 4;
  children: ReactNode;
}) {
  return <div className={["grid", COLS[cols]].join(" ")}>{children}</div>;
}

export function SectionGridCell({
  children,
  last = false,
  className = "",
}: {
  children: ReactNode;
  last?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "p-8 group transition-colors hover:bg-soft",
        last ? "" : "border-b md:border-b-0 md:border-r border-soft",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
