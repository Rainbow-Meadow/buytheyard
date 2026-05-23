import { ArrowUpRight, Facebook } from "lucide-react";

/** Static Facebook CTA for the home proof section.
 *  Keep this as a designed tile instead of a simulated embed; embeds age badly
 *  and make the homepage look broken when screenshots or counts drift.
 */
export function FacebookLiveTile() {
  return (
    <a
      href="https://www.facebook.com/BuyTheYardOutdoorProducts"
      target="_blank"
      rel="noreferrer"
      aria-label="Follow Buy The Yard on Facebook for yard updates"
      className="group relative h-full w-full overflow-hidden rounded-md bg-zinc-950 text-white ring-1 ring-white/10 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand z-20" />
      <Facebook
        aria-hidden="true"
        className="absolute -bottom-8 -right-6 size-40 md:size-56 text-white/[0.07] stroke-[1.25]"
      />
      <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-5 md:p-6">
        <div>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="grid size-14 place-items-center rounded-full bg-brand text-white shadow-sm">
              <Facebook className="size-7" aria-hidden="true" />
            </div>
            <span className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-brand">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </div>
          <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
            Yard feed
          </p>
          <h3 className="display-4 leading-tight text-balance">
            Follow for stock notes, seasonal updates, and local posts
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="inline-flex items-center gap-1.5 meta text-zinc-300">
            <span aria-hidden="true" className="relative inline-flex size-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Active local updates
          </p>
          <p className="label text-brand">Follow</p>
        </div>
      </div>
    </a>
  );
}
