import type { ReactNode } from "react";

export function Caption({
  children,
  credit = "Buy The Yard",
  className = "",
}: {
  children: ReactNode;
  credit?: string | null;
  className?: string;
}) {
  return (
    <figcaption className={"caption mt-2 " + className}>
      {children}
      {credit && (
        <>
          {" "}
          <span className="text-ink-soft/70 not-italic">— Photo: {credit}.</span>
        </>
      )}
    </figcaption>
  );
}