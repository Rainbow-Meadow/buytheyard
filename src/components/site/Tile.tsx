import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

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
export type TileTone = "kraft" | "surface" | "brand" | "white";
export type TilePadding = "sm" | "md" | "lg";

interface BaseTile {
  /** Stable identifier used as the React key when present.
   *  Provide one whenever blocks may reorder, filter, or stream in. */
  id?: string;
  size?: TileSize;
  tone?: TileTone;
  tall?: boolean;
  padding?: TilePadding;
  className?: string;
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
};

const paddingCls: Record<TilePadding, string> = {
  sm: "p-5",
  md: "p-6 md:p-7",
  lg: "p-7 md:p-10",
};

export type TileAspect = "square" | "video" | "portrait" | "wide";

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

type TileMetrics = typeof TILE_METRIC_DEFAULTS;

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
  return isLightTone(tone) ? "text-zinc-700" : "text-zinc-300";
}

function eyebrowToneCls(tone: TileTone) {
  if (tone === "brand") return "eyebrow opacity-80";
  return "eyebrow text-brand";
}

function attributionToneCls(tone: TileTone) {
  return isLightTone(tone) ? "meta text-zinc-600" : "meta text-zinc-400";
}

function iconToneCls(tone: TileTone) {
  return tone === "brand" ? "text-brand-foreground" : "text-brand";
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

  const imageShell = [
    sizeCls[size],
    block.tall ? "tile-row-tall" : "",
    aspect,
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
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          placeholder && !loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {hasOverlay && (
        <>
          {/* Readability scrim — only when overlay text exists */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          />
          <div className={`absolute inset-0 flex ${align} p-5 md:p-6`}>
            <div className="text-white max-w-[34ch]">
              {block.overlay?.eyebrow && (
                <p className="eyebrow text-brand mb-2">{block.overlay.eyebrow}</p>
              )}
              {block.overlay?.title && (
                <p className="display-4 leading-tight">{block.overlay.title}</p>
              )}
              {block.overlay?.body && (
                <div className="body-sm text-zinc-200 mt-2">{block.overlay.body}</div>
              )}
              {block.cta && (
                <CtaLink
                  cta={block.cta}
                  className="mt-4 inline-flex items-center gap-2 label border-b border-current hover:opacity-80"
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );

  if (block.to) {
    return (
      <Link to={block.to} className={`${imageShell} group block`}>
        {inner}
      </Link>
    );
  }
  return <article className={imageShell}>{inner}</article>;
}

export function TileGrid({ blocks }: { blocks: TileBlock[] }) {
  return (
    <div className="tile-grid">
      {blocks.map((b, i) => (
        <Tile key={b.id ?? `tile-${i}`} {...b} />
      ))}
    </div>
  );
}

export function Tile(block: TileBlock) {
  const size = block.size ?? "md";
  const tone = block.tone ?? "kraft";
  const padding = block.padding ?? "md";

  const shell = [
    sizeCls[size],
    block.tall ? "tile-row-tall" : "",
    toneCls[tone],
    paddingCls[padding],
    "rounded-md",
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
            <div className={`body ${bodyToneCls(tone)} ${block.title ? "mt-3" : ""}`}>
              {block.body}
            </div>
          )}
        </article>
      );

    case "numbered":
      return (
        <article className={`${shell} flex flex-col`}>
          {block.icon && <TileIcon icon={block.icon} tone={tone} />}
          <p className="display-3 text-brand leading-none">{block.number}</p>
          {block.eyebrow && <p className={`${eyebrowToneCls(tone)} mt-4`}>{block.eyebrow}</p>}
          {block.title && (
            <p className={`display-5 leading-snug ${block.eyebrow ? "mt-1" : "mt-4"}`}>
              {block.title}
            </p>
          )}
          {block.body && (
            <div className={`body ${bodyToneCls(tone)} mt-3`}>{block.body}</div>
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
            <p className={`${attributionToneCls(tone)} mt-5`}>— {block.attribution}</p>
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
          <p className="display-3 leading-none">{block.value}</p>
          <p className={`eyebrow ${isLightTone(tone) ? "text-zinc-600" : "text-zinc-400"} mt-3`}>
            {block.label}
          </p>
        </article>
      );

    case "image":
      return <ImageTileInner block={block} size={size} tone={tone} />;
  }
}