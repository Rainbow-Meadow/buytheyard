import type { ReactNode } from "react";

export function PullQuote({
  children,
  attribution,
  className = "",
}: {
  children: ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure className={"border-y-2 border-ink py-8 md:py-12 " + className}>
      <blockquote
        className="font-sans italic text-ink leading-[1.15] text-balance"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
      >
        &ldquo;{children}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 label text-ink-soft">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}