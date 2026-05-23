import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Typographic body container. Use for long-form passages inside an
 * EditorialSection. First paragraph gets a dropcap; subsequent paragraphs
 * use comfortable leading. Pair with <PullQuote /> for emphasis.
 */
export function EditorialProse({
  children,
  dropcap = true,
  className,
}: {
  children: ReactNode;
  /** Apply dropcap to the first `<p>`. Default true. */
  dropcap?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "[&>p]:body [&>p]:text-zinc-700 [&>p]:leading-7 [&>p]:mb-6",
        "[&>p:first-of-type]:text-lg md:[&>p:first-of-type]:text-xl",
        "[&>p:first-of-type]:font-medium [&>p:first-of-type]:text-zinc-800 [&>p:first-of-type]:leading-relaxed",
        dropcap && "[&>p:first-of-type]:dropcap",
        className,
      )}
    >
      {children}
    </div>
  );
}