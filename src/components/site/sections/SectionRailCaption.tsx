import type { ReactNode } from "react";

export function SectionRailCaption({
  children,
  tone = "black",
}: {
  children: ReactNode;
  tone?: "black" | "ink";
}) {
  const bg = tone === "black" ? "bg-black" : "bg-ink";
  return (
    <div className={["w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-end", bg, "text-paper"].join(" ")}>
      {children}
    </div>
  );
}
