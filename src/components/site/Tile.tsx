import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTileDeepLink } from "./useTileDeepLink";
import { useDialogGestures } from "./useDialogGestures";
import { TileGroupProvider, useTileGroupNav } from "./TileGroupContext";
import {
  SIZE_PADDING,
  SIZE_BODY_LINES,
  SIZE_BODY_CHAR_CAP,
  VARIANT_DEFAULT_TONE,
  approxCharCount,
  devValidateTile,
  type TileAction,
  type TileVariant,
} from "./TileRules";

/**
 * Data-driven Tile renderer.
 *
 * Magazine (desktop) / Gallery (mobile) tiles, declared as plain data:
 *
 *   <TileGrid blocks={[
 *     { variant: "numbered", number: "01", eyebrow: "Origin", title: "...", body: "...",
 *       size: "feature", tone: "kraft" },
 *     { variant: "quote", quote: "...", attribution: "Abby Montalto",
 *       size: "feature", tone: "surface" },
 *     { variant: "text", eyebrow: "04 · WBE", body: "...", size: "sm", tone: "kraft" },
 *     { variant: "cta", eyebrow: "07 · Visit", body: "...", size: "md", tone: "brand",
 *       cta: { label: "Visit the yard", to: "/contact" } },
 *   ]} />
 *
 * Span sizes resolve to `tile-sm | tile-md | tile-lg | tile-feature`
 * (see styles.css tile-grid schema).
 */

export type TileSize = "sm" | "third" | "md" | "lg" | "feature";
export type TileTone = "kraft" | "surface" | "brand" | "white" | "gray";
export type TilePadding = "sm" | "md" | "lg";

interface BaseTile {
  /** Stable identifier used as the React key when present.
   *  Provide one whenever blocks may reorder, filter, or stream in. */
  id?: string;
  size?: TileSize;
  tone?: TileTone;
  tall?: boolean;
  /** @deprecated Padding is derived from `size` via TileRules.SIZE_PADDING.
   *  Authoring `padding` directly is a soft violation (dev warning) — kept
   *  for back-compat during rollout. */
  padding?: TilePadding;
  className?: string;
  /** When true, the tile fills 100% of its parent (used inside TileScreen
   *  grid cells where placement is owned by the outer grid). Disables the
   *  `tile-*` column-span class and forces the article to flex `h-full w-full`. */
  fill?: boolean;
  /** Optional leading icon — rendered at the top of text / numbered /
   *  definition / cta tiles. Typically a lucide-react `<Icon className="size-7">`. */
  icon?: ReactNode;
}

/** CTA target — internal route (`to`), external URL or tel/mailto (`href`).
 *  Exactly one of `to` or `href` should be set. */
export type TileCta = {
  label: string;
  to?: string;
  href?: string;
  /** Open external link in a new tab. Defaults to true when href is http(s). */
  external?: boolean;
};

export type TileBlock =
  | (BaseTile & {
      variant: "text";
      eyebrow?: string;
      title?: string;
      body?: ReactNode;
    })
  | (BaseTile & {
      variant: "numbered";
      number: string;
      eyebrow?: string;
      title?: string;
      body?: ReactNode;
    })
  | (BaseTile & {
      variant: "quote";
      eyebrow?: string;
      quote: string;
      attribution?: string;
    })
  | (BaseTile & {
      variant: "definition";
      term: string;
      definition: ReactNode;
    })
  | (BaseTile & {
      variant: "cta";
      eyebrow?: string;
      title?: string;
      body?: ReactNode;
      cta: TileCta;
    })
  | (BaseTile & {
      variant: "stat";
      value: string;
      label: string;
    })
  | (BaseTile & {
      variant: "image";
      src: string;
      alt: string;
      /** Responsive image candidates. Passed straight through to `<img srcset>`.
       *  Example: "hero-480.jpg 480w, hero-960.jpg 960w, hero-1600.jpg 1600w". */
      srcSet?: string;
      /** Media-condition → rendered width hints for the browser's source selection.
       *  Defaults to a magazine/gallery-friendly heuristic based on tile `size`. */
      sizes?: string;
      /** Loading strategy. Hero/above-the-fold tiles should pass "eager". Defaults to "lazy". */
      loading?: "lazy" | "eager";
      /** Fetch priority hint. Use "high" for LCP hero tiles. */
      fetchPriority?: "high" | "low" | "auto";
      /** Aspect ratio for the image frame. Defaults to "square".
       *  Pass a single value to use the same ratio at every breakpoint, or an
       *  object to vary by breakpoint — e.g. `{ mobile: "square", desktop: "wide" }`
       *  renders a portrait-friendly square on phones and a 5:4 frame on md+. */
      aspect?: TileAspect | { mobile?: TileAspect; desktop?: TileAspect };
      /** Focal point used by `object-position` so the visible subject stays in
       *  frame when the aspect ratio changes between breakpoints.
       *
       *  Accepts a named anchor (`"center" | "top" | "bottom" | "left" | "right"
       *  | "top-left" | "top-right" | "bottom-left" | "bottom-right"`), a
       *  precise percentage point (`{ x: 30, y: 70 }` — 0–100 from top-left),
       *  or a breakpoint pair (`{ mobile, desktop }` of either). Defaults to
       *  `"center"`. */
      focal?: TileFocal | { mobile?: TileFocal; desktop?: TileFocal };
      /** Low-quality image placeholder shown (blurred) until the full image loads.
       *  Accepts a data URL (base64 tiny JPEG/PNG), a solid color (`#hex`/`rgb()`),
       *  or any CSS background value. Falls back to the tile tone when omitted. */
      placeholder?: string;
      /** Optional overlay content rendered on top of the image. */
      overlay?: {
        eyebrow?: string;
        title?: string;
        body?: ReactNode;
        /** Overlay anchor inside the frame. Defaults to "bottom-left". */
        align?: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "center";
      };
      /** Optional link wrapping the entire tile. */
      to?: string;
      /** Optional CTA label rendered alongside the overlay text. */
      cta?: TileCta;
      /** Optional expand-to-dialog details. When set and `to` is not, the
       *  entire tile becomes a button that opens a dialog with the full
       *  image plus added context (title + body). `to` wins if both are set. */
      details?: {
        eyebrow?: string;
        title: string;
        body: ReactNode;
        /** Stable share id used as the `?tile=` URL search param so the
         *  dialog can be deep-linked. Multiple tile instances (e.g. mobile +
         *  desktop layout of the same subject) can share the same shareId so
         *  one URL works at any breakpoint. Falls back to `block.id`. */
        shareId?: string;
      };
    })
  | (BaseTile & {
      variant: "carousel";
      /** Each slide is a TileBlock rendered with `fill` inside the carousel
       *  frame. The carousel itself owns the cell; slides page horizontally. */
      slides: TileBlock[];
      /** Autoplay slides. Pauses on hover/focus. */
      auto?: boolean;
      /** Autoplay interval in ms (default 5000). */
      interval?: number;
      /** Controls to show. Defaults to "both". */
      controls?: "dots" | "arrows" | "both" | "none";
      ariaLabel?: string;
    })
  | (BaseTile & {
      variant: "flip";
      /** Front face — rendered with `fill`. */
      front: TileBlock;
      /** Back face — rendered with `fill`. */
      back: TileBlock;
      /** Interaction that flips the card. Defaults to "click". */
      trigger?: "click" | "hover";
      /** Optional hint label rendered as a corner affordance (default "Tap to flip"). */
      hint?: string;
      ariaLabel?: string;
    });

const sizeCls: Record<TileSize, string> = {
  sm: "tile-sm",
  third: "tile-third",
  md: "tile-md",
  lg: "tile-lg",
  feature: "tile-feature",
};

const toneCls: Record<TileTone, string> = {
  kraft: "bg-kraft ring-1 ring-zinc-300 text-zinc-900",
  white: "bg-white ring-1 ring-zinc-300 text-zinc-900",
  surface: "bg-surface text-surface-foreground",
  brand: "bg-brand text-brand-foreground",
  gray: "bg-brandmark-gray ring-1 ring-zinc-600/30 text-white",
};

const paddingCls: Record<TilePadding, string> = {
  sm: "p-4 md:p-5",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

/** Tailwind line-clamp classes keyed by SIZE_BODY_LINES values. */
const lineClampCls: Record<number, string> = {
  0: "hidden",
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
};

export type TileAspect = "square" | "video" | "portrait" | "wide";

/** Named focal anchors mapped to CSS `object-position` keywords. */
export type TileFocalAnchor =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/** A focal point — either a named anchor or precise (0–100) percent coordinates
 *  measured from the top-left of the image. */
export type TileFocal = TileFocalAnchor | { x: number; y: number };

const aspectCls: Record<TileAspect, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[4/5]",
  wide: "aspect-[5/4]",
};

// Literal `md:` variants — kept as full strings so Tailwind's JIT detects them.
const aspectMdCls: Record<TileAspect, string> = {
  square: "md:aspect-square",
  video: "md:aspect-video",
  portrait: "md:aspect-[4/5]",
  wide: "md:aspect-[5/4]",
};

function resolveAspect(
  aspect: TileAspect | { mobile?: TileAspect; desktop?: TileAspect } | undefined,
): string {
  if (!aspect) return aspectCls.square;
  if (typeof aspect === "string") return aspectCls[aspect];
  const mobile = aspect.mobile ?? aspect.desktop ?? "square";
  const desktop = aspect.desktop ?? aspect.mobile ?? "square";
  // Always include mobile base + md override so the desktop class wins at ≥md.
  return `${aspectCls[mobile]} ${aspectMdCls[desktop]}`;
}

const focalAnchorCss: Record<TileFocalAnchor, string> = {
  center: "center",
  top: "center top",
  bottom: "center bottom",
  left: "left center",
  right: "right center",
  "top-left": "left top",
  "top-right": "right top",
  "bottom-left": "left bottom",
  "bottom-right": "right bottom",
};

function focalToCss(focal: TileFocal): string {
  if (typeof focal === "string") return focalAnchorCss[focal];
  const x = Math.max(0, Math.min(100, focal.x));
  const y = Math.max(0, Math.min(100, focal.y));
  return `${x}% ${y}%`;
}

/** Resolve a TileFocal-or-breakpoint-pair into inline CSS custom properties
 *  consumed by the `.tile-focal` utility in styles.css. */
function resolveFocalStyle(
  focal: TileFocal | { mobile?: TileFocal; desktop?: TileFocal } | undefined,
): React.CSSProperties | undefined {
  if (!focal) return undefined;
  if (typeof focal === "string" || "x" in focal) {
    return { ["--op-mobile" as string]: focalToCss(focal as TileFocal) };
  }
  const style: Record<string, string> = {};
  if (focal.mobile) style["--op-mobile"] = focalToCss(focal.mobile);
  if (focal.desktop) style["--op-desktop"] = focalToCss(focal.desktop);
  return style as React.CSSProperties;
}

const overlayAlignCls = {
  "bottom-left": "items-end justify-start text-left",
  "bottom-right": "items-end justify-end text-right",
  "top-left": "items-start justify-start text-left",
  "top-right": "items-start justify-end text-right",
  center: "items-center justify-center text-center",
} as const;

/** Column-span schema mirrored from `tile-grid` in styles.css.
 *  Mobile grid = 2 cols; desktop (≥768px) grid = 6 cols. */
const tileSpans: Record<TileSize, { mobile: number; desktop: number }> = {
  sm:      { mobile: 1, desktop: 2 },
  third:   { mobile: 2, desktop: 2 },
  md:      { mobile: 2, desktop: 3 },
  lg:      { mobile: 2, desktop: 4 },
  feature: { mobile: 2, desktop: 6 },
};

/** SSR fallbacks — mirror the `:root` defaults in styles.css.
 *  At runtime these are overwritten by values read from CSS custom properties,
 *  so styles.css remains the single source of truth. */
const TILE_METRIC_DEFAULTS = {
  containerMax: 1280,
  containerPadMobile: 20,
  containerPadDesktop: 24,
  gapMobile: 8,
  gapDesktop: 16,
  colsMobile: 2,
  colsDesktop: 6,
  mdBreakpoint: 768,
} as const;

type TileMetrics = { -readonly [K in keyof typeof TILE_METRIC_DEFAULTS]: number };

let cachedMetrics: TileMetrics | null = null;

/** Read a CSS custom property from `:root` and parse it as a px number.
 *  Accepts `<n>px`, bare numbers, or unitless integers. */
function readPxVar(styles: CSSStyleDeclaration, name: string, fallback: number): number {
  const raw = styles.getPropertyValue(name).trim();
  if (!raw) return fallback;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

/** Resolve tile metrics from CSS variables on `:root`. Cached for the session.
 *  SSR + first paint use TILE_METRIC_DEFAULTS; the cache fills on first
 *  client read so subsequent tiles get the live values. */
function getTileMetrics(): TileMetrics {
  if (cachedMetrics) return cachedMetrics;
  if (typeof window === "undefined" || typeof document === "undefined") {
    return TILE_METRIC_DEFAULTS;
  }
  const styles = window.getComputedStyle(document.documentElement);
  const metrics: TileMetrics = {
    containerMax: readPxVar(styles, "--tile-container-max", TILE_METRIC_DEFAULTS.containerMax),
    containerPadMobile: readPxVar(styles, "--tile-container-pad-mobile", TILE_METRIC_DEFAULTS.containerPadMobile),
    containerPadDesktop: readPxVar(styles, "--tile-container-pad-desktop", TILE_METRIC_DEFAULTS.containerPadDesktop),
    gapMobile: readPxVar(styles, "--tile-grid-gap-mobile", TILE_METRIC_DEFAULTS.gapMobile),
    gapDesktop: readPxVar(styles, "--tile-grid-gap-desktop", TILE_METRIC_DEFAULTS.gapDesktop),
    colsMobile: readPxVar(styles, "--tile-grid-cols-mobile", TILE_METRIC_DEFAULTS.colsMobile),
    colsDesktop: readPxVar(styles, "--tile-grid-cols-desktop", TILE_METRIC_DEFAULTS.colsDesktop),
    mdBreakpoint: readPxVar(styles, "--tile-md-breakpoint", TILE_METRIC_DEFAULTS.mdBreakpoint),
  };
  cachedMetrics = metrics;
  return metrics;
}

/** Build an accurate `sizes` string from a tile's column span.
 *  Produces three tiers:
 *    1. ≥CONTAINER_MAX: fixed px from the capped container width
 *    2. ≥MD_BREAKPOINT: vw fraction of the viewport (fluid container)
 *    3. mobile: vw fraction of the viewport
 */
function sizesForSpan(size: TileSize): string {
  const { mobile, desktop } = tileSpans[size];
  const m = getTileMetrics();
  const containerPadDesktopTotal = m.containerPadDesktop * 2;
  const containerPadMobileTotal = m.containerPadMobile * 2;

  // Tier 1 — container is capped. Account for desktop padding and internal gaps.
  const contentWidth = m.containerMax - containerPadDesktopTotal;
  const desktopColWidth =
    (contentWidth - m.gapDesktop * (m.colsDesktop - 1)) / m.colsDesktop;
  const cappedPx = Math.round(
    desktopColWidth * desktop + m.gapDesktop * (desktop - 1),
  );

  // Tier 2 — fluid desktop. Subtract padding from the viewport via calc().
  const desktopFraction = desktop / m.colsDesktop;
  const desktopVw = `calc((100vw - ${containerPadDesktopTotal}px) * ${desktopFraction.toFixed(4)})`;

  // Tier 3 — mobile. Subtract page padding and the row's internal gap share.
  const mobileFraction = mobile / m.colsMobile;
  const mobileGapAdj =
    mobile < m.colsMobile ? ` - ${m.gapMobile / 2}px` : "";
  const mobileVw = `calc((100vw - ${containerPadMobileTotal}px${mobileGapAdj}) * ${mobileFraction.toFixed(4)})`;

  return [
    `(min-width: ${m.containerMax}px) ${cappedPx}px`,
    `(min-width: ${m.mdBreakpoint}px) ${desktopVw}`,
    mobileVw,
  ].join(", ");
}

function isLightTone(tone: TileTone) {
  return tone === "kraft" || tone === "white";
}

function bodyToneCls(tone: TileTone) {
  if (isLightTone(tone)) return "text-zinc-700";
  if (tone === "gray") return "text-white/85";
  return "text-zinc-300";
}

function eyebrowToneCls(tone: TileTone) {
  // WCAG AA targets for 11px bold (4.5:1). Picked per-tone for ≥5:1.
  if (tone === "brand") return "eyebrow text-brand-foreground";       // white on red — 5.4:1
  if (tone === "gray") return "eyebrow text-zinc-900";                // dark on mid-gray — 9:1
  if (tone === "surface") return "eyebrow text-brand-glow";           // light red on near-black — 7:1
  return "eyebrow text-brand";                                        // brand on kraft/white — 4.6:1
}

function attributionToneCls(tone: TileTone) {
  if (isLightTone(tone)) return "meta text-zinc-600";
  if (tone === "gray") return "meta text-white/75";
  return "meta text-zinc-400";
}

function iconToneCls(tone: TileTone) {
  if (tone === "brand") return "text-brand-foreground";
  if (tone === "gray") return "text-white";
  return "text-brand";
}

function CtaLink({ cta, className }: { cta: TileCta; className: string }) {
  if (cta.href) {
    const isExternal =
      cta.external ?? /^https?:\/\//i.test(cta.href);
    return (
      <a
        href={cta.href}
        className={className}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {cta.label}
      </a>
    );
  }
  return (
    <Link to={cta.to ?? "/"} className={className}>
      {cta.label}
    </Link>
  );
}

function TileIcon({ icon, tone }: { icon: ReactNode; tone: TileTone }) {
  return <div className={`${iconToneCls(tone)} mb-4 [&>*]:size-7`}>{icon}</div>;
}

/** Image tile body — extracted so we can use hooks (load state for LQIP fade). */
function ImageTileInner({
  block,
  size,
  tone,
}: {
  block: Extract<TileBlock, { variant: "image" }>;
  size: TileSize;
  tone: TileTone;
}) {
  const [loaded, setLoaded] = useState(false);
  const aspect = resolveAspect(block.aspect);
  const shareId = block.details?.shareId ?? block.id;
  const [dialogOpen, setDialogOpen] = useTileDeepLink(shareId);
  const nav = useTileGroupNav(shareId);
  const gestures = useDialogGestures({
    onClose: () => setDialogOpen(false),
    onPrev: nav.prev,
    onNext: nav.next,
    hasPrev: nav.hasPrev,
    hasNext: nav.hasNext,
  });

  useEffect(() => {
    if (!dialogOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && nav.hasPrev) nav.prev();
      else if (e.key === "ArrowRight" && nav.hasNext) nav.next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialogOpen, nav.hasPrev, nav.hasNext, nav.prev, nav.next]);

  const imageShell = [
    block.fill ? "h-full w-full" : sizeCls[size],
    block.fill ? "" : block.tall ? "tile-row-tall" : "",
    block.fill ? "" : aspect,
    "relative overflow-hidden rounded-md ring-1",
    isLightTone(tone) ? "ring-zinc-300" : "ring-white/10",
    toneCls[tone],
    block.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const hasOverlay = Boolean(block.overlay || block.cta);
  const align = overlayAlignCls[block.overlay?.align ?? "bottom-left"];

  // Placeholder: tiny data URL gets blurred + scaled; solid colors render flat.
  const placeholder = block.placeholder;
  const isImagePlaceholder =
    !!placeholder && /^(data:image|https?:|\/)/i.test(placeholder);
  const placeholderStyle: React.CSSProperties | undefined = placeholder
    ? isImagePlaceholder
      ? {
          backgroundImage: `url("${placeholder}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }
      : { background: placeholder }
    : undefined;

  const inner = (
    <>
      {placeholder && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={placeholderStyle}
        />
      )}
      <img
        src={block.src}
        srcSet={block.srcSet}
        sizes={block.srcSet ? block.sizes ?? sizesForSpan(size) : undefined}
        alt={block.alt}
        loading={block.loading ?? "lazy"}
        decoding="async"
        fetchPriority={block.fetchPriority ?? "auto"}
        onLoad={() => setLoaded(true)}
        style={resolveFocalStyle(block.focal)}
        className={`tile-focal absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          placeholder && !loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {hasOverlay && (
        <>
          {/* Readability scrim — covers the full text zone (bottom ~55%)
              so eyebrow + title stay legible over any photo tone. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent"
          />
          <div className={`absolute inset-0 flex ${align} p-5 md:p-6`}>
            <div className="text-white max-w-[34ch]">
              {block.overlay?.eyebrow && (
                <p className="eyebrow text-brand-glow mb-2">{block.overlay.eyebrow}</p>
              )}
              {block.overlay?.title && (
                <p className="display-4 leading-tight">{block.overlay.title}</p>
              )}
              {block.overlay?.body && (
                <div className="body-sm text-zinc-200 mt-2">{block.overlay.body}</div>
              )}
              {block.cta && (
                block.to || block.details ? (
                  // Outer tile is already a Link/button — render CTA as a
                  // visual span to avoid nested interactives. The outer
                  // wrap carries the action and its accessible name.
                  <span className="mt-4 inline-flex items-center gap-2 label border-b border-current">
                    {block.cta.label}
                  </span>
                ) : (
                  <CtaLink
                    cta={block.cta}
                    className="mt-4 inline-flex items-center gap-2 label border-b border-current hover:opacity-80"
                  />
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );

  if (block.to) {
    return (
      <Link
        to={block.to}
        className={`${imageShell} group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
      >
        {inner}
      </Link>
    );
  }
  if (block.details) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`Open details: ${block.details.title}`}
            className={`${imageShell} group block text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
          >
            {inner}
          </button>
        </DialogTrigger>
        <DialogContent
          ref={gestures.ref}
          style={gestures.style}
          className="w-[calc(100vw-2rem)] max-w-3xl max-h-[90vh] p-0 gap-0 overflow-hidden bg-zinc-950 border-zinc-800 text-zinc-100 grid grid-rows-[minmax(0,1fr)_auto] sm:rounded-md"
        >
          <div aria-hidden="true" className="sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-white/30 z-10" />
          {nav.hasPrev && (
            <button
              type="button"
              onClick={nav.prev}
              aria-label="Previous"
              className="hidden sm:grid absolute left-3 top-1/2 -translate-y-1/2 size-11 place-items-center bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}
          {nav.hasNext && (
            <button
              type="button"
              onClick={nav.next}
              aria-label="Next"
              className="hidden sm:grid absolute right-3 top-1/2 -translate-y-1/2 size-11 place-items-center bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="size-5" />
            </button>
          )}
          <div className="bg-black flex items-center justify-center min-h-0">
            <img
              src={block.src}
              alt={block.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full max-h-[60vh] object-contain"
            />
          </div>
          <div className="p-5 sm:p-7 overflow-y-auto">
            {block.details.eyebrow && (
              <p className="eyebrow text-brand mb-2">{block.details.eyebrow}</p>
            )}
            <DialogTitle className="display-5 leading-tight text-white">
              {block.details.title}
            </DialogTitle>
            <DialogDescription className="body text-zinc-300 mt-3">
              {block.details.body}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return <article className={imageShell}>{inner}</article>;
}

export function TileGrid({ blocks }: { blocks: TileBlock[] }) {
  const ids = blocks
    .filter(
      (b): b is Extract<TileBlock, { variant: "image" }> =>
        b.variant === "image" && !!b.details,
    )
    .map((b) => b.details!.shareId ?? b.id)
    .filter((x): x is string => !!x);
  return (
    <TileGroupProvider ids={ids}>
      <div className="tile-grid">
        {blocks.map((b, i) => (
          <Tile key={b.id ?? `tile-${i}`} {...b} />
        ))}
      </div>
    </TileGroupProvider>
  );
}

/** Carousel tile body. Owns its cell, pages horizontally through `slides`. */
function CarouselTileInner({
  block,
}: {
  block: Extract<TileBlock, { variant: "carousel" }>;
}) {
  const slides = block.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const controls = block.controls ?? "both";
  const showDots = controls === "dots" || controls === "both";
  const showArrows = controls === "arrows" || controls === "both";
  const count = slides.length;

  useEffect(() => {
    if (!block.auto || paused || count < 2) return;
    const ms = block.interval ?? 5000;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ms);
    return () => window.clearInterval(t);
  }, [block.auto, block.interval, paused, count]);

  const go = (i: number) => setIndex(((i % count) + count) % count);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const shell = [
    block.fill ? "h-full w-full" : sizeCls[block.size ?? "feature"],
    block.fill ? "" : block.tall ? "tile-row-tall" : "",
    "relative overflow-hidden rounded-md",
    block.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={shell}
      aria-roledescription="carousel"
      aria-label={block.ariaLabel ?? "Carousel"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      }}
      tabIndex={0}
    >
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => {
          const inactive = i !== index;
          return (
            <div
              key={s.id ?? `slide-${i}`}
              className="h-full w-full shrink-0 basis-full"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={inactive}
              // `inert` removes focusable descendants from the tab order so
              // hiding the slide doesn't leave focusable links/buttons
              // inside an aria-hidden subtree (WCAG aria-hidden-focus).
              {...(inactive ? { inert: "" as unknown as boolean } : {})}
            >
              <Tile {...s} fill />
            </div>
          );
        })}
      </div>

      {/* Polite live region announces slide changes to assistive tech.
       *  Autoplay pauses on focus, so SR users only hear changes they
       *  caused themselves (arrows, dots, swipe). */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${index + 1} of ${count}`}
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid place-items-center size-11 rounded-full bg-black/70 hover:bg-black/85 text-white backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid place-items-center size-11 rounded-full bg-black/70 hover:bg-black/85 text-white backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`size-2 rounded-full transition-all ${
                i === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/** Flip tile body. Two faces; a dedicated flip button rotates between them.
 *  The outer is a `<div>` (not `<button>`) so the faces are free to contain
 *  their own interactive children (links, dialog triggers) without nesting
 *  interactives. The non-visible face is `inert` so it's removed from the
 *  tab order and from screen-reader output. */
function FlipTileInner({
  block,
}: {
  block: Extract<TileBlock, { variant: "flip" }>;
}) {
  const [flipped, setFlipped] = useState(false);
  const trigger = block.trigger ?? "click";
  const hint = block.hint ?? "Tap to flip";
  // Accessible name for the flip control — exposes the affordance and state.
  const flipLabel = block.ariaLabel
    ? `${block.ariaLabel} (${flipped ? "showing back" : "showing front"})`
    : `${hint} — currently showing ${flipped ? "back" : "front"}`;

  const shell = [
    block.fill ? "h-full w-full" : sizeCls[block.size ?? "md"],
    block.fill ? "" : block.tall ? "tile-row-tall" : "",
    "relative rounded-md tile-flip",
    block.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const hoverProps =
    trigger === "hover"
      ? {
          onMouseEnter: () => setFlipped(true),
          onMouseLeave: () => setFlipped(false),
          onFocus: () => setFlipped(true),
          onBlur: () => setFlipped(false),
        }
      : {};

  const flipInert = (cond: boolean) =>
    cond ? ({ inert: "" as unknown as boolean } as const) : {};

  return (
    <div className={shell} {...hoverProps}>
      <div className={`tile-flip-inner ${flipped ? "is-flipped" : ""}`}>
        <div className="tile-flip-face" {...flipInert(flipped)} aria-hidden={flipped}>
          <Tile {...block.front} fill />
        </div>
        <div
          className="tile-flip-face tile-flip-back"
          {...flipInert(!flipped)}
          aria-hidden={!flipped}
        >
          <Tile {...block.back} fill />
        </div>
      </div>
      <button
        type="button"
        aria-label={flipLabel}
        aria-pressed={flipped}
        onClick={trigger === "click" ? () => setFlipped((f) => !f) : undefined}
        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 hover:bg-black/75 text-white text-[10px] uppercase tracking-wider backdrop-blur-sm min-h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <RotateCw className="size-3" aria-hidden="true" />
        <span aria-hidden="true">{hint}</span>
      </button>
    </div>
  );
}

export function Tile(block: TileBlock) {
  const size = block.size ?? "md";
  const tone = block.tone ?? VARIANT_DEFAULT_TONE[block.variant as TileVariant] ?? "kraft";
  const padding = block.padding ?? SIZE_PADDING[size];

  // Dev-only ruleset linter (text-ish variants only — image/flip/carousel
  // handle their own action semantics).
  if (
    block.variant === "text" ||
    block.variant === "numbered" ||
    block.variant === "cta" ||
    block.variant === "definition" ||
    block.variant === "quote" ||
    block.variant === "stat"
  ) {
    const body =
      "body" in block ? block.body :
      block.variant === "definition" ? block.definition :
      block.variant === "quote" ? block.quote : undefined;
    const title =
      "title" in block ? block.title :
      block.variant === "definition" ? block.term :
      block.variant === "stat" ? block.value : undefined;
    const bodyCharCount = approxCharCount(body);
    const titleWordCount =
      typeof title === "string" ? title.trim().split(/\s+/).filter(Boolean).length : 0;
    const action: TileAction =
      block.variant === "cta" ? (("to" in block.cta && block.cta.to) || ("href" in block.cta && block.cta.href) ? "link" : "static") :
      "static";
    devValidateTile({
      id: block.id,
      size,
      tone,
      variant: block.variant as TileVariant,
      action,
      bodyCharCount,
      titleWordCount,
    });
    if (block.padding !== undefined && typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
      console.warn(`[Tile${block.id ? ` ${block.id}` : ""}] "padding" prop is deprecated — derived from size "${size}".`);
    }
  }

  const bodyClampLines = SIZE_BODY_LINES[size];
  const bodyClamp = bodyClampLines > 0 ? lineClampCls[bodyClampLines] : "";

  const shell = [
    block.fill ? "h-full w-full overflow-hidden" : sizeCls[size],
    block.fill ? "" : block.tall ? "tile-row-tall" : "",
    toneCls[tone],
    paddingCls[padding],
    "rounded-md flex flex-col min-h-0",
    block.className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  switch (block.variant) {
    case "text":
      return (
        <article className={shell}>
          {block.icon && <TileIcon icon={block.icon} tone={tone} />}
          {block.eyebrow && <p className={`${eyebrowToneCls(tone)} mb-2`}>{block.eyebrow}</p>}
          {block.title && <p className="display-5 leading-snug">{block.title}</p>}
          {block.body && (
            <div className={`body ${bodyToneCls(tone)} ${block.title ? "mt-3" : ""} ${bodyClamp}`}>
              {block.body}
            </div>
          )}
        </article>
      );

    case "numbered":
      return (
        <article className={`${shell} flex flex-col`}>
          {block.icon && <TileIcon icon={block.icon} tone={tone} />}
          <p className={`display-3 leading-none ${tone === "brand" ? "text-brand-foreground" : "text-brand"}`}>{block.number}</p>
          {block.eyebrow && <p className={`${eyebrowToneCls(tone)} mt-4`}>{block.eyebrow}</p>}
          {block.title && (
            <p className={`display-5 leading-snug ${block.eyebrow ? "mt-1" : "mt-4"}`}>
              {block.title}
            </p>
          )}
          {block.body && (
            <div className={`body ${bodyToneCls(tone)} mt-3 ${bodyClamp}`}>{block.body}</div>
          )}
        </article>
      );

    case "quote":
      return (
        <article className={shell}>
          {block.eyebrow && <p className={`${eyebrowToneCls(tone)} mb-4`}>{block.eyebrow}</p>}
          <blockquote
            className={`display-3 leading-tight ${isLightTone(tone) ? "text-zinc-900" : "text-white"}`}
          >
            &ldquo;{block.quote}&rdquo;
          </blockquote>
          {block.attribution && (
            <p className={`${attributionToneCls(tone)} mt-5`}>· {block.attribution}</p>
          )}
        </article>
      );

    case "definition":
      return (
        <article className={shell}>
          {block.icon && <TileIcon icon={block.icon} tone={tone} />}
          <p className="display-5 leading-snug">{block.term}</p>
          <div className={`body-sm ${bodyToneCls(tone)} mt-2`}>{block.definition}</div>
        </article>
      );

    case "cta":
      return (
        <article className={`${shell} flex flex-col`}>
          {block.icon && <TileIcon icon={block.icon} tone={tone} />}
          {block.eyebrow && <p className={`${eyebrowToneCls(tone)} mb-2`}>{block.eyebrow}</p>}
          {block.title && <p className="display-5 leading-snug">{block.title}</p>}
          {block.body && (
            <div className={`body ${tone === "brand" ? "" : bodyToneCls(tone)} ${block.title ? "mt-3" : ""}`}>
              {block.body}
            </div>
          )}
          <CtaLink
            cta={block.cta}
            className="mt-5 inline-flex items-center gap-2 label border-b border-current self-start hover:opacity-80"
          />
        </article>
      );

    case "stat":
      return (
        <article className={shell}>
          {block.icon && (
            <div className={`${iconToneCls(tone)} mb-3 [&>*]:size-5`}>{block.icon}</div>
          )}
          <p className="display-3 leading-none">{block.value}</p>
          <p className={`eyebrow ${isLightTone(tone) ? "text-zinc-600" : "text-zinc-400"} mt-3`}>
            {block.label}
          </p>
        </article>
      );

    case "image":
      return <ImageTileInner block={block} size={size} tone={tone} />;

    case "carousel":
      return <CarouselTileInner block={block} />;

    case "flip":
      return <FlipTileInner block={block} />;
  }
}