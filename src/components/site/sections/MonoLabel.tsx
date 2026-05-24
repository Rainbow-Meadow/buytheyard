import type { ReactNode } from "react";

export function MonoLabel({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={[
        "font-mono-industrial text-[10px] tracking-widest uppercase",
        accent ? "text-ember" : "",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
