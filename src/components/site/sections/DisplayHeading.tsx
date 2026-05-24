import type { ElementType, ReactNode } from "react";

const SIZE = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-8xl",
  xxl: "text-7xl md:text-9xl",
} as const;

export function DisplayHeading({
  as: Tag = "h2",
  size = "lg",
  children,
  className = "",
}: {
  as?: ElementType;
  size?: keyof typeof SIZE;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={[
        "font-display uppercase leading-[0.9]",
        SIZE[size],
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
