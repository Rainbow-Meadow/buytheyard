/**
 * Tile system rules — single source of truth.
 *
 * The tile system has four axes: Size, Tone, Variant (content), Action.
 * Every Tile in the app must conform to the matrix below. Helpers here
 * derive padding/tone defaults from size+variant and validate combos in
 * dev (console.warn). See `.lovable/plan.md` for the full spec.
 */

import type { TileSize, TileTone, TilePadding } from "./Tile";

/** All content variants. flip and carousel are wrapper actions, but are
 *  modeled as variants in the discriminated union for ergonomics. */
export type TileVariant =
  | "text"
  | "numbered"
  | "quote"
  | "definition"
  | "cta"
  | "stat"
  | "image"
  | "flip"
  | "carousel";

/** Logical action (orthogonal to variant). Most variants are `static` or
 *  `link`; `flip`/`carousel` are surfaced as their own variants today.
 *  `expand` auto-attaches when text content overflows the size slot. */
export type TileAction = "static" | "link" | "flip" | "carousel" | "expand";

/** §1 — Size → padding. Padding is derived, never authored. */
export const SIZE_PADDING: Record<TileSize, TilePadding> = {
  sm: "sm",
  third: "sm",
  md: "md",
  lg: "lg",
  feature: "lg",
};

/** §1 — Size → body line-clamp. Anything past this triggers expand. */
export const SIZE_BODY_LINES: Record<TileSize, number> = {
  sm: 0, // no body allowed
  third: 1,
  md: 2,
  lg: 3,
  feature: 3,
};

/** §1 — Size → body soft char cap. Beyond this we auto-attach `expand`. */
export const SIZE_BODY_CHAR_CAP: Record<TileSize, number> = {
  sm: 0,
  third: 60,
  md: 120,
  lg: 200,
  feature: 280,
};

/** §2 — Default tone per variant when the author omits `tone`. */
export const VARIANT_DEFAULT_TONE: Record<TileVariant, TileTone> = {
  text: "kraft",
  numbered: "kraft",
  quote: "surface",
  definition: "kraft",
  cta: "brand",
  stat: "white",
  image: "kraft", // toneless in practice — image fills the surface
  flip: "kraft",
  carousel: "kraft",
};

/** §2 — Role description used in dev warnings. */
export const TONE_ROLE: Record<TileTone, string> = {
  brand: "Primary CTA / attention magnet (max 1 per screen)",
  surface: "Hero / feature anchor",
  kraft: "Default content",
  white: "Data / stat",
  gray: "Secondary / meta",
};

/** §3 — Curated variant × action pairings. true = allowed. */
export const VARIANT_ACTIONS: Record<TileVariant, Record<TileAction, boolean>> = {
  text:       { static: true,  link: false, flip: false, carousel: false, expand: true  },
  numbered:   { static: true,  link: false, flip: false, carousel: false, expand: true  },
  quote:      { static: true,  link: false, flip: false, carousel: true,  expand: false },
  definition: { static: true,  link: false, flip: true,  carousel: false, expand: false },
  cta:        { static: true,  link: true,  flip: true,  carousel: false, expand: false },
  stat:       { static: true,  link: false, flip: true,  carousel: true,  expand: false },
  image:      { static: true,  link: true,  flip: false, carousel: true,  expand: true  },
  flip:       { static: true,  link: false, flip: false, carousel: false, expand: false },
  carousel:   { static: true,  link: false, flip: false, carousel: false, expand: false },
};

/** Approximate character count of a ReactNode body for the overflow check.
 *  Strings/numbers count directly; arrays sum; everything else (JSX) returns
 *  Infinity so authors with rich content opt into explicit `details`. */
export function approxCharCount(node: unknown): number {
  if (node == null || node === false) return 0;
  if (typeof node === "string") return node.length;
  if (typeof node === "number") return String(node).length;
  if (Array.isArray(node)) return node.reduce<number>((n, c) => n + approxCharCount(c), 0);
  return Infinity;
}

/** Dev-only ruleset linter. No-op in production. */
export function devValidateTile(args: {
  id?: string;
  size: TileSize;
  tone: TileTone;
  variant: TileVariant;
  action: TileAction;
  bodyCharCount?: number;
  titleWordCount?: number;
}): void {
  if (typeof process !== "undefined" && process.env.NODE_ENV === "production") return;
  const tag = `[Tile${args.id ? ` ${args.id}` : ""}]`;

  if (!VARIANT_ACTIONS[args.variant]?.[args.action]) {
    console.warn(
      `${tag} disallowed action "${args.action}" on variant "${args.variant}". See TileRules.VARIANT_ACTIONS.`,
    );
  }

  // Tone-role check — brand is reserved for cta + image; surface for hero/feature; gray for meta.
  if (args.tone === "brand" && args.variant !== "cta" && args.variant !== "image" && args.variant !== "stat") {
    console.warn(`${tag} tone "brand" reserved for cta / stat / image variants — got "${args.variant}".`);
  }

  // Size guards.
  if (args.size === "sm" && (args.bodyCharCount ?? 0) > 0) {
    console.warn(`${tag} size "sm" disallows body content. Use third+ or trim copy.`);
  }
  if (args.size === "sm" && (args.titleWordCount ?? 0) > 4) {
    console.warn(`${tag} size "sm" titles must be ≤ 4 words.`);
  }

  const cap = SIZE_BODY_CHAR_CAP[args.size];
  if (cap > 0 && (args.bodyCharCount ?? 0) > cap && args.action !== "expand") {
    console.warn(
      `${tag} body (${args.bodyCharCount} chars) exceeds "${args.size}" cap (${cap}). Auto-attach "expand" or move to a larger size.`,
    );
  }
}