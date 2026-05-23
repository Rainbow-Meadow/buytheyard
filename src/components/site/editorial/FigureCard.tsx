import { cn } from "@/lib/utils";

/** Captioned image with a mono caption label. Sidebar piece. */
export function FigureCard({
  src,
  alt,
  caption,
  figureRef,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** e.g. "FIGURE 01.A" — rendered above the caption in mono. */
  figureRef?: string;
  className?: string;
}) {
  return (
    <figure className={cn("bg-zinc-950 text-zinc-100", className)}>
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      {figureRef || caption ? (
        <figcaption className="p-4 space-y-1">
          {figureRef ? (
            <p className="font-mono-meta text-zinc-500">{figureRef}</p>
          ) : null}
          {caption ? <p className="body-sm text-zinc-300">{caption}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}