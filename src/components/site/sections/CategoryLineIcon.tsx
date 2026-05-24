import type { SVGProps } from "react";
import { Trees, Mountain, Shovel, Flower2, type LucideIcon } from "lucide-react";
import { ScatterMarks } from "./SectionBackdrop";

export type CategoryIconName = "mulch" | "stone" | "additional" | "garden-center";

const ICONS: Record<CategoryIconName, LucideIcon> = {
  mulch: Trees,
  stone: Mountain,
  additional: Shovel,
  "garden-center": Flower2,
};

export function CategoryLineIcon({
  name,
  className = "",
  ...rest
}: { name: CategoryIconName; className?: string } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const Glyph = ICONS[name];
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={["block w-full h-auto text-brand", className].join(" ")}
      {...rest}
    >
      <ScatterMarks />
      {/* Real Lucide glyph, centered in the 100x100 frame at ~56px */}
      <g transform="translate(22 22)">
        <Glyph width={56} height={56} strokeWidth={1.25} color="currentColor" />
      </g>
    </svg>
  );
}