import { ArrowRight, Facebook } from "lucide-react";

export default function FacebookSpotlight() {
  return (
    <section className="section bg-surface text-surface-foreground border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 eyebrow text-brand mb-3">
            <Facebook className="size-3.5" />
            On Facebook
          </p>
          <h2 className="display-3 leading-[0.95] text-white max-w-[16ch]">
            Where the yard <span className="text-brand">lives.</span>
          </h2>
          <p className="lead mt-4 md:mt-6 text-zinc-300 max-w-[52ch]">
            Daily back-and-forth happens on Facebook — fresh loads, restocks, weather closures, and lot photos.
          </p>
          <ul className="body-sm mt-5 md:mt-8 space-y-2 text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 rounded-full bg-brand shrink-0" />
              Daily inventory and restock photos
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 rounded-full bg-brand shrink-0" />
              Weather-related closures and hours changes
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 rounded-full bg-brand shrink-0" />
              Seasonal promos and WooSox ticket drawings
            </li>
          </ul>
          <div className="mt-5 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://www.facebook.com/BuyTheYardOutdoorProducts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#1877F2] text-white px-7 h-12 label hover:opacity-90 transition-opacity rounded-sm"
            >
              <Facebook className="size-4" />
              Follow on Facebook
              <ArrowRight className="size-4" />
            </a>
            <span className="text-xs text-zinc-500 break-all">
              facebook.com/BuyTheYardOutdoorProducts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}