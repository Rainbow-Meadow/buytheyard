/**
 * Tile system rules — single source of truth.
 *
 * The tile system has four axes: Size, Tone, Variant, Action.
 * Helpers here derive padding and tone defaults and warn in development
 * when tile copy is likely to be too dense for the chosen size.
 */

import type { TileSize, TileTone, TilePadding } from "./Tile";

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

export type TileAction = "static" | "link" | "flip" | "carousel" | "expand";

export const SIZE_PADDING: Record<TileSize, TilePadding> = {
  sm: "sm",
  third: "sm",
  md: "md",
  lg: "lg",
  feature: "lg",
};

export const SIZE_TITLE_LINES: Record<TileSize, number> = {
  sm: 2,
  third: 2,
  md: 2,
  lg: 3,
  feature: 3,
};

export const SIZE_BODY_LINES: Record<TileSize, number> = {
  sm: 0,
  third: 1,
  md: 2,
  lg: 2,
  feature: 2,
};

export const SIZE_BODY_CHAR_CAP: Record<TileSize, number> = {
  sm: 0,
  third: 56,
  md: 96,
  lg: 150,
  feature: 180,
};

export const VARIANT_DEFAULT_TONE: Record<TileVariant, TileTone> = {
  text: "kraft",
  numbered: "kraft",
  quote: "surface",
  definition: "kraft",
  cta: "brand",
  stat: "white",
  image: "kraft",
  flip: "kraft",
  carousel: "kraft",
};

export const TONE_ROLE: Record<TileTone, string> = {
  brand: "Primary CTA / attention magnet",
  surface: "Hero / feature anchor",
  kraft: "Default content",
  white: "Data / stat",
  gray: "Secondary / meta",
};

export const VARIANT_ACTIONS: Record<TileVariant, Record<TileAction, boolean>> = {
  text: { static: true, link: false, flip: false, carousel: false, expand: true },
  numbered: { static: true, link: false, flip: false, carousel: false, expand: true },
  quote: { static: true, link: false, flip: false, carousel: true, expand: false },
  definition: { static: true, link: false, flip: true, carousel: false, expand: false },
  cta: { static: true, link: true, flip: true, carousel: false, expand: false },
  stat: { static: true, link: false, flip: true, carousel: true, expand: false },
  image: { static: true, link: true, flip: false, carousel: true, expand: true },
  flip: { static: true, link: false, flip: false, carousel: false, expand: false },
  carousel: { static: true, link: false, flip: false, carousel: false, expand: false },
};

export function approxCharCount(node: unknown): number {
  if (node == null || node === false) return 0;
  if (typeof node === "string") return node.length;
  if (typeof node === "number") return String(node).length;
  if (Array.isArray(node)) return node.reduce<number>((n, c) => n + approxCharCount(c), 0);
  return Infinity;
}

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
    console.warn(`${tag} disallowed action "${args.action}" on variant "${args.variant}".`);
  }

  if (
    args.tone === "brand" &&
    args.variant !== "cta" &&
    args.variant !== "image" &&
    args.variant !== "stat"
  ) {
    console.warn(`${tag} tone "brand" should be reserved for cta / stat / image variants.`);
  }

  if (args.size === "sm" && (args.bodyCharCount ?? 0) > 0) {
    console.warn(`${tag} size "sm" disallows body content. Use third+ or trim copy.`);
  }
  if (args.size === "sm" && (args.titleWordCount ?? 0) > 4) {
    console.warn(`${tag} size "sm" titles must be ≤ 4 words.`);
  }

  const cap = SIZE_BODY_CHAR_CAP[args.size];
  if (cap > 0 && (args.bodyCharCount ?? 0) > cap && args.action !== "expand") {
    console.warn(`${tag} body copy is too dense for size "${args.size}".`);
  }
}
