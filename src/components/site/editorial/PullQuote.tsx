import type { ReactNode } from "react";

/** Brand-bar block quote for use inside EditorialProse. */
export function PullQuote({
  children,
  cite,
}: {
  children: ReactNode;
  cite?: string;
}) {
  return (
    <figure className="my-10 md:my-12">
      <blockquote className="pull-quote text-balance">{children}</blockquote>
      {cite ? (
        <figcaption className="font-mono-meta text-zinc-500 mt-3 pl-8 md:pl-10">
          — {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}