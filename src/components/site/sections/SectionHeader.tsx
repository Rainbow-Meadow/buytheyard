import type { ReactNode } from "react";
import { MonoLabel } from "./MonoLabel";
import { DisplayHeading } from "./DisplayHeading";

export function SectionHeader({
  eyebrow,
  eyebrowAccent = false,
  heading,
  size = "lg",
  className = "",
  rule = false,
}: {
  eyebrow?: string;
  eyebrowAccent?: boolean;
  heading: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  rule?: boolean;
}) {
  return (
    <div
      className={[
        "p-8",
        rule ? "border-b border-soft" : "",
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <MonoLabel accent={eyebrowAccent} className="mb-4 block">
          {eyebrow}
        </MonoLabel>
      )}
      <DisplayHeading size={size}>{heading}</DisplayHeading>
    </div>
  );
}
