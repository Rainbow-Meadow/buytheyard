import { ArrowUpRight } from "lucide-react";
import fbProfileCard from "@/assets/fb-profile-card.webp";

/**
 * Live-feel Facebook social proof card for the home reviews section.
 * Shows follower count and a freshness signal ("last post 2d ago") with
 * a Follow on Facebook CTA. Static — copy is reviewed by hand, not fetched.
 */
export function FacebookLiveTile() {
  return (
    <a
      href="https://www.facebook.com/BuyTheYardOutdoorProducts"
      target="_blank"
      rel="noreferrer"
      aria-label="Follow Buy The Yard on Facebook — 820+ followers, active community"
      className="group relative h-full w-full overflow-hidden rounded-md bg-white hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img
        src={fbProfileCard}
        alt="Buy The Yard Outdoor Products on Facebook — 822 followers, 268 posts"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 inset-y-0 w-1.5 bg-brand z-20"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-6 left-3 font-black leading-none text-white/[0.10] select-none pointer-events-none z-10"
        style={{ fontSize: "clamp(7rem, 28vw, 12rem)" }}
      >
        02
      </span>
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 inline-flex items-center justify-center size-7 rounded-full bg-zinc-900/80 text-white backdrop-blur-sm group-hover:bg-zinc-900 transition-colors"
      >
        <ArrowUpRight className="size-4" />
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-t from-zinc-950/85 via-zinc-950/55 to-transparent text-white">
        <p className="inline-flex items-center gap-1.5 meta">
          <span aria-hidden="true" className="relative inline-flex size-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Active · last post 2d ago
        </p>
        <p className="label">Follow</p>
      </div>
    </a>
  );
}