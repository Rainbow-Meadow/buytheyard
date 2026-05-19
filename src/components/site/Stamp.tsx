import type { ReactNode } from "react";

type StampProps = {
  children: ReactNode;
  rotation?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm md:text-base",
};

export function Stamp({ children, rotation = -4, className = "", size = "md" }: StampProps) {
  return (
    <span
      className={`stamp ${sizeMap[size]} ${className}`}
      style={{ ["--stamp-rot" as string]: `${rotation}deg` }}
    >
      {children}
    </span>
  );
}