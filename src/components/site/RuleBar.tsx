import type { ReactNode } from "react";

export function RuleBar({
  label,
  number,
  right,
  children,
  className = "",
}: {
  label: string;
  number?: string;
  right?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={"w-full " + className}>
      <div className="flex items-end justify-between gap-4 pb-2 rule-thick">
        <div className="flex items-baseline gap-3 min-w-0">
          {number && <span className="meta text-ink-soft tabular">{number}</span>}
          <h2 className="display-3 leading-none text-ink truncate">{label}</h2>
        </div>
        {right && <div className="hidden md:flex items-center gap-3">{right}</div>}
      </div>
      {children && <div className="mt-6 md:mt-10">{children}</div>}
    </div>
  );
}

/** Compact double-rule used at top of dense sections */
export function DoubleRule({ className = "" }: { className?: string }) {
  return (
    <div className={"w-full " + className}>
      <div className="rule-thin" />
      <div className="h-[3px]" />
      <div className="rule-hair" />
    </div>
  );
}