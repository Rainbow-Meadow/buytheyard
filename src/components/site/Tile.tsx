import type { ReactNode } from "react";
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

export type TileSize = "sm" | "md" | "lg" | "feature";
export type TileTone = "kraft" | "surface" | "brand" | "white";
export type TilePadding = "sm" | "md" | "lg";

interface BaseTile {
  size?: TileSize;
  tone?: TileTone;
  tall?: boolean;
  padding?: TilePadding;
  className?: string;
}

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
      cta: { label: string; to: string };
    })
  | (BaseTile & {
      variant: "stat";
      value: string;
      label: string;
    });

const sizeCls: Record<TileSize, string> = {
  sm: "tile-sm",
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

export function TileGrid({ blocks }: { blocks: TileBlock[] }) {
  return (
    <div className="tile-grid">
      {blocks.map((b, i) => (
        <Tile key={i} {...b} />
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
          <p className="display-5 leading-snug">{block.term}</p>
          <div className={`body-sm ${bodyToneCls(tone)} mt-2`}>{block.definition}</div>
        </article>
      );

    case "cta":
      return (
        <article className={`${shell} flex flex-col`}>
          {block.eyebrow && <p className={`${eyebrowToneCls(tone)} mb-2`}>{block.eyebrow}</p>}
          {block.title && <p className="display-5 leading-snug">{block.title}</p>}
          {block.body && (
            <div className={`body ${tone === "brand" ? "" : bodyToneCls(tone)} ${block.title ? "mt-3" : ""}`}>
              {block.body}
            </div>
          )}
          <Link
            to={block.cta.to}
            className="mt-5 inline-flex items-center gap-2 label border-b border-current self-start hover:opacity-80"
          >
            {block.cta.label}
          </Link>
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
  }
}