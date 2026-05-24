import type { ReactNode } from "react";

export function SectionBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={["max-w-xl text-lg md:text-xl opacity-80", className].join(" ")}>
      {children}
    </p>
  );
}
