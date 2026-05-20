import { ArrowRight, Facebook } from "lucide-react";
import { TileGrid, type TileBlock } from "@/components/site/Tile";

const FB_URL = "https://www.facebook.com/BuyTheYardOutdoorProducts";

const DESKTOP_BLOCKS: TileBlock[] = [
  {
    id: "fb-hero",
    variant: "text",
    icon: <Facebook />,
    eyebrow: "On Facebook",
    title: "Where the yard lives.",
    body: "Our daily updates live on Facebook. Fresh loads, restocks, weather closures, lot photos.",
    size: "feature",
    tone: "surface",
  },
  {
    id: "fb-restocks",
    variant: "text",
    eyebrow: "Daily",
    title: "Inventory & restocks",
    body: "Photos of fresh loads as they hit the yard.",
    size: "md",
    tone: "gray",
  },
  {
    id: "fb-hours",
    variant: "text",
    eyebrow: "Weather",
    title: "Closures & hours",
    body: "Storm days, early close, schedule shifts — all posted there first.",
    size: "md",
    tone: "gray",
  },
  {
    id: "fb-promos",
    variant: "text",
    eyebrow: "In season",
    title: "Promos & WooSox tickets",
    body: "Seasonal deals and the occasional ticket drawing for the home team.",
    size: "md",
    tone: "gray",
  },
  {
    id: "fb-follow",
    variant: "cta",
    eyebrow: "Follow along",
    title: "@BuyTheYardOutdoorProducts",
    body: "Tap follow and you'll see today's yard the moment it changes.",
    cta: {
      label: "Follow on Facebook",
      href: FB_URL,
    },
    size: "md",
    tone: "brand",
  },
];

export default function FacebookSpotlight() {
  return (
    <section className="section bg-surface text-surface-foreground border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Mobile: keep existing single-column treatment */}
        <div className="md:hidden max-w-2xl">
          <p className="inline-flex items-center gap-2 eyebrow text-brand mb-3">
            <Facebook className="size-3.5" />
            On Facebook
          </p>
          <h2 className="display-3 leading-[0.95] text-white max-w-[16ch]">
            Where the yard <span className="text-brand">lives.</span>
          </h2>
          <p className="lead mt-4 text-zinc-300 max-w-[52ch]">
            Our daily updates live on Facebook. Fresh loads, restocks, weather closures, lot photos.
          </p>
          <ul className="body-sm mt-5 space-y-2 text-zinc-300">
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
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={FB_URL}
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

        {/* Desktop: balanced tile grid */}
        <div className="hidden md:block">
          <TileGrid blocks={DESKTOP_BLOCKS} />
        </div>
      </div>
    </section>
  );
}