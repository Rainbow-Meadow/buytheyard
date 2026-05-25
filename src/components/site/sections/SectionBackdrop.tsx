import { Fragment } from "react";

export type SectionBackground =
  | { kind: "none" }
  | {
      kind: "photo";
      src: string;
      alt?: string;
      /** Tailwind object-position class, e.g. "object-[75%_center]". */
      position?: string;
      /** Gradient direction over the photo to keep type legible. */
      gradient?: "bottom" | "right" | "radial";
      /** Photo opacity (Tailwind opacity class). Default opacity-70. */
      opacityClass?: string;
      /** Mark this image as the LCP candidate (eager + high fetchpriority). */
      priority?: boolean;
    }
  | {
      kind: "scatter";
      density?: "light" | "regular" | "dense";
      tint?: "ink" | "brand";
    };

const TILE: Record<"light" | "regular" | "dense", number> = {
  light: 240,
  regular: 160,
  dense: 96,
};

const GRADIENT: Record<"bottom" | "right" | "radial", string> = {
  bottom:
    "bg-gradient-to-t from-paper via-paper/85 to-paper/35",
  right:
    "bg-gradient-to-r from-paper via-paper/90 to-paper/40 md:via-paper/75 md:to-paper/10",
  radial:
    "bg-[radial-gradient(ellipse_at_center,rgba(245,243,238,0.35)_0%,rgba(245,243,238,0.7)_60%,var(--paper)_100%)]",
};

/**
 * Shared "spec-sheet" registration marks. Same shapes as CategoryLineIcon.Scatter,
 * so the icon language and the section background pattern stay visibly related.
 */
export function ScatterMarks(props: React.SVGProps<SVGGElement>) {
  return (
    <g
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      fill="none"
      {...props}
    >
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

export function SectionBackdrop({
  background,
}: {
  background: SectionBackground;
}) {
  if (background.kind === "none") return null;

  if (background.kind === "photo") {
    const pos = background.position ?? "object-center";
    const grad = GRADIENT[background.gradient ?? "bottom"];
    const op = background.opacityClass ?? "opacity-70";
    const priority = background.priority ?? false;
    return (
      <Fragment>
        <img
          src={background.src}
          alt={background.alt ?? ""}
          aria-hidden={background.alt ? undefined : true}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${op} ${pos}`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
        />
        <div
          aria-hidden
          className={`absolute inset-0 pointer-events-none ${grad}`}
        />
      </Fragment>
    );
  }

  // scatter
  const density = background.density ?? "regular";
  const tint = background.tint ?? "ink";
  const tile = TILE[density];
  const colorCls = tint === "brand" ? "text-brand/20" : "text-ink/[0.08]";
  const patternId = `bty-scatter-${density}-${tint}`;

  return (
    <svg
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${colorCls}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          viewBox="0 0 100 100"
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
        >
          <ScatterMarks />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}