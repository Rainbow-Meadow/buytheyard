import { ArrowUpRight, Facebook } from "lucide-react";
import fbProfileCard from "@/assets/fb-profile-card.webp";

/** Static Facebook CTA for the home reviews section.
 *  Uses the profile-card artwork as supporting texture, not as a fake embed.
 */
export function FacebookLiveTile() {
  return (
    <a
      href="https://www.facebook.com/BuyTheYardOutdoorProducts"
      target="_blank"
      rel="noreferrer"
      aria-label="Follow Buy The Yard on Facebook — active community updates"
      className="group relative h-full w-full overflow-hidden rounded-md bg-white text-zinc-900 ring-1 ring-zinc-300 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand z-20" />
      <img
        src={fbProfileCard}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute -right-8 -top-6 h-36 w-56 object-cover rounded-bl-md opacity-20 grayscale md:h-44 md:w-72"
        style={{ objectPosition: "center 15%" }}
      />
      <Facebook
        aria-hidden="true"
        className="absolute -bottom-8 -right-5 size-40 md:size-52 text-brand/[0.08] stroke-[1.25]"
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6 p-5 md:p-6">
        <div>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="grid size-14 place-items-center rounded-full bg-brand text-white shadow-sm">
              <Facebook className="size-7" aria-hidden="true" />
            </div>
            <span className="grid size-10 place-items-center rounded-full bg-zinc-950 text-white transition-colors group-hover:bg-brand">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </div>
          <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
            Facebook updates
          </p>
          <h3 className="display-4 leading-tight text-balance">
            Follow Buy The Yard Outdoor Products
          </h3>
          <p className="body-sm text-zinc-700 mt-3 max-w-[34ch] text-pretty">
            Fresh stock, seasonal reminders, yard updates, and community posts from Abby and the crew.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-300 pt-4">
          <p className="inline-flex items-center gap-1.5 meta text-zinc-700">
            <span aria-hidden="true" className="relative inline-flex size-2">
              <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Active · 820+ followers
          </p>
          <p className="label text-brand">Follow</p>
        </div>
      </div>
    </a>
  );
}
