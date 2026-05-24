import type { ReactElement, SVGProps } from "react";

export type CategoryIconName = "mulch" | "stone" | "additional" | "garden-center";

// Decorative scatter marks (plus/circle/diamond/dashes) — reused per icon
// for the editorial line-art feel of the reference.
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

function Mulch() {
  return (
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* mulch pile */}
      <path d="M14 78 C 26 58, 42 50, 50 50 C 58 50, 74 58, 86 78 Z" />
      {/* ground line */}
      <path d="M8 82 h84" />
      {/* chip marks inside pile */}
      <path d="M30 72 l4 -3" />
      <path d="M44 68 l5 -2" />
      <path d="M58 70 l5 -3" />
      <path d="M68 74 l4 -2" />
      <path d="M38 64 l3 -2" />
    </g>
  );
}

function Stone() {
  return (
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* ground */}
      <path d="M8 82 h84" />
      {/* base stone */}
      <ellipse cx="50" cy="74" rx="22" ry="8" />
      {/* middle stone */}
      <ellipse cx="48" cy="60" rx="15" ry="6" />
      {/* top stone */}
      <ellipse cx="52" cy="48" rx="9" ry="4.5" />
      {/* crown pebble */}
      <ellipse cx="52" cy="40" rx="4" ry="2.5" />
    </g>
  );
}

function Additional() {
  return (
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* ground */}
      <path d="M8 86 h84" />
      {/* shovel handle */}
      <path d="M72 18 L 38 70" />
      {/* T-grip */}
      <path d="M68 14 a6 6 0 1 1 8 8" />
      <path d="M68 14 l8 8" />
      {/* blade */}
      <path d="M30 62 L 46 78 L 38 84 L 26 72 Z" />
      {/* collar */}
      <path d="M34 58 l8 8" />
    </g>
  );
}

function GardenCenter() {
  return (
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* soil mound */}
      <path d="M14 80 C 28 70, 72 70, 86 80" />
      <path d="M8 86 h84" />
      {/* soil dots */}
      <circle cx="30" cy="78" r="1" />
      <circle cx="42" cy="76" r="1" />
      <circle cx="58" cy="76" r="1" />
      <circle cx="70" cy="78" r="1" />
      {/* left stem + leaf */}
      <path d="M38 74 V 46" />
      <path d="M38 60 q -6 -2 -8 -8" />
      {/* left flower */}
      <circle cx="38" cy="40" r="3.5" />
      <circle cx="32" cy="38" r="3.5" />
      <circle cx="44" cy="38" r="3.5" />
      <circle cx="35" cy="34" r="3.5" />
      <circle cx="41" cy="34" r="3.5" />
      {/* right stem + leaf */}
      <path d="M62 74 V 50" />
      <path d="M62 64 q 6 -2 8 -8" />
      {/* right flower */}
      <circle cx="62" cy="44" r="3" />
      <circle cx="57" cy="42" r="3" />
      <circle cx="67" cy="42" r="3" />
      <circle cx="59" cy="38" r="3" />
      <circle cx="65" cy="38" r="3" />
    </g>
  );
}

const ICONS: Record<CategoryIconName, () => ReactElement> = {
  mulch: Mulch,
  stone: Stone,
  additional: Additional,
  "garden-center": GardenCenter,
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
      <Scatter />
      <Glyph />
    </svg>
  );
}