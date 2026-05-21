import { Facebook, ArrowUpRight } from "lucide-react";
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
      className="group relative h-full w-full overflow-hidden rounded-md p-4 md:p-5 flex flex-col bg-surface text-surface-foreground hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-[#1877F2]">
          <Facebook className="size-5" />
          <span className="eyebrow">On Facebook</span>
        </div>
        <span aria-hidden="true" className="inline-flex items-center justify-center size-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      <p className="display-5 leading-snug mt-3">Where the yard lives</p>

      <div className="mt-3 rounded-md overflow-hidden ring-1 ring-white/10 bg-white">
        <img
          src={fbProfileCard}
          alt="Buy The Yard Outdoor Products on Facebook — 822 followers, 268 posts"
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />
      </div>

      <div className="mt-auto pt-4 flex items-end justify-between gap-3">
        <div>
          <p className="display-4 leading-none text-white">820+</p>
          <p className="meta text-zinc-400 mt-1">followers</p>
        </div>
        <div className="text-right">
          <p className="inline-flex items-center gap-1.5 meta text-zinc-300">
            <span aria-hidden="true" className="relative inline-flex size-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Active
          </p>
          <p className="meta text-zinc-400 mt-1">Last post 2d ago</p>
        </div>
      </div>

      <p className="label mt-4 inline-flex items-center gap-2 border-b border-current self-start">
        Follow on Facebook
      </p>
    </a>
  );
}