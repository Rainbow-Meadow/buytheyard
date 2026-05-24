import type { SVGProps } from "react";
import { Trees, Mountain, Shovel, Flower2, type LucideIcon } from "lucide-react";

export type CategoryIconName = "mulch" | "stone" | "additional" | "garden-center";

const ICONS: Record<CategoryIconName, LucideIcon> = {
  mulch: Trees,
  stone: Mountain,
  additional: Shovel,
  "garden-center": Flower2,
};

// Decorative scatter marks kept from the editorial frame — these aren't the
// pictogram itself, they're the surrounding "spec sheet" marks.
function Scatter() {
  return (
    <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" fill="none">
      <path d="M14 22 h6 M17 19 v6" />
      <circle cx="86" cy="18" r="2.5" />
      <path d="M82 92 l4 4 M86 92 l-4 4" />
      <path d="M8 70 h6" />
      <path d="M92 60 h6" />
      <path d="M22 96 h8" />
      <path d="M70 12 h8" />
      <path d="M50 6 v4" />
      <g transform="translate(74 80) rotate(45)">
        <rect x="-3" y="-3" width="6" height="6" />
      </g>
    </g>
  );
}

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
      <Scatter />
      {/* Real Lucide glyph, centered in the 100x100 frame at ~56px */}
      <g transform="translate(22 22)">
        <Glyph width={56} height={56} strokeWidth={1.25} color="currentColor" />
      </g>
    </svg>
  );
}