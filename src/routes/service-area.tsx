import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Truck } from "lucide-react";
import yardTrucks from "@/assets/source/yard-trucks.webp";
import yardPiles from "@/assets/source/yard-piles.webp";
import loadingTruck from "@/assets/source/loading-truck.webp";
import yardDog from "@/assets/source/yard-dog.webp";
import { TileGrid, type TileBlock } from "@/components/site/Tile";

type Town = {
  name: string;
  blurb: string;
  drive: string;
};

const TOWNS: Town[] = [
  { name: "Jefferson, MA", drive: "0 min — the yard", blurb: "Home base. Stop in at 2264 Main St. for pickup or call ahead and we'll have it loaded." },
  { name: "Holden, MA", drive: "~10 min", blurb: "Our most frequent delivery zone — mulch, loam, and stone runs go out daily in season." },
  { name: "Princeton, MA", drive: "~15 min", blurb: "Driveway drops for new beds, pea-stone paths, and screened loam for lawn repair." },
  { name: "Sterling, MA", drive: "~15 min", blurb: "Bulk mulch and compost deliveries for spring cleanups and vegetable gardens." },
  { name: "Rutland, MA", drive: "~15 min", blurb: "Crushed stone, screened loam, and playground chips delivered curbside." },
  { name: "Paxton, MA", drive: "~15 min", blurb: "Premium black mulch, hemlock mulch, and bed-dressing stone, with one-yard minimum." },
  { name: "West Boylston, MA", drive: "~15 min", blurb: "Same-day delivery available when you call before noon." },
  { name: "Boylston, MA", drive: "~20 min", blurb: "Bulk material for residential beds, contractor jobs, and town projects." },
  { name: "Worcester, MA", drive: "~20 min", blurb: "Driveway and curbline drops throughout Worcester neighborhoods — call to confirm your ZIP." },
  { name: "Leominster, MA", drive: "~25 min", blurb: "Delivery available; 48-hour notice recommended for the northern route." },
  { name: "Clinton, MA", drive: "~20 min", blurb: "Mulch, loam, sand, and gravel deliveries on the eastern route." },
  { name: "Lancaster, MA", drive: "~25 min", blurb: "Bulk landscape supply for residential and small contractor jobs." },
  { name: "Spencer, MA", drive: "~25 min", blurb: "Crushed blue stone for driveways, pea gravel for paths, and screened loam for new lawns." },
  { name: "Auburn, MA", drive: "~25 min", blurb: "Curbside delivery throughout Auburn — please mark your drop spot." },
  { name: "Shrewsbury, MA", drive: "~25 min", blurb: "Bulk materials delivered curbside; 48-hour notice recommended." },
];

const TITLE = "Mulch, Loam & Stone Delivery — Central MA Service Area | Buy The Yard";
const DESCRIPTION =
  "Bulk mulch, loam, sand, and stone delivery from our Jefferson, MA yard to Holden, Worcester, Princeton, Sterling, Rutland, Paxton, West Boylston, Leominster, and more across Central Massachusetts.";

export const Route = createFileRoute("/service-area")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://buytheyard.lovable.app/service-area" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/service-area" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Landscape material delivery",
          provider: { "@id": "https://buytheyard.lovable.app/#organization" },
          areaServed: TOWNS.map((t) => ({ "@type": "City", name: t.name })),
          availableChannel: {
            "@type": "ServiceChannel",
            servicePhone: "+1-508-579-9897",
            serviceUrl: "https://buytheyard.lovable.app/quote",
          },
        }),
      },
    ],
  }),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  const featured = TOWNS[0];
  const secondary = TOWNS.slice(1, 4);
  const rest = TOWNS.slice(4);
  const ZONE_IMGS = [yardPiles, loadingTruck, yardDog];

  const mobileTownBlocks: TileBlock[] = TOWNS.map((t, i) => ({
    id: `town-m-${t.name}`,
    variant: "image",
    src: ZONE_IMGS[i % ZONE_IMGS.length],
    alt: "",
    aspect: "square",
    size: "sm",
    tone: "surface",
    overlay: {
      title: t.name.replace(", MA", ""),
      body: t.drive,
      align: "bottom-left",
    },
    details: {
      eyebrow: t.drive,
      title: t.name,
      body: t.blurb,
    },
  }));

  const restBlocks: TileBlock[] = rest.map((t) => ({
    id: `town-r-${t.name}`,
    variant: "text",
    icon: <MapPin />,
    title: t.name,
    body: (
      <>
        <span className="label text-zinc-500 block">{t.drive}</span>
        <span className="block mt-2">{t.blurb}</span>
      </>
    ),
    size: "third",
    tone: "kraft",
    padding: "sm",
  }));

  const helperBlocks: TileBlock[] = [
    {
      id: "no-town",
      variant: "text",
      eyebrow: "Don't see your town?",
      title: "Worcester & Middlesex County",
      body: "We deliver throughout Worcester County and parts of Middlesex County. Give us a call and we'll confirm your ZIP and final price before dispatch.",
      size: "md",
      tone: "kraft",
    },
    {
      id: "talk-to-abby",
      variant: "cta",
      eyebrow: "Talk to Abby",
      title: "Confirm your ZIP & price",
      cta: { label: "508.579.9897", href: "tel:5085799897" },
      size: "md",
      tone: "surface",
    },
  ];

  const footerBlocks: TileBlock[] = [
    {
      id: "schedule",
      variant: "cta",
      eyebrow: "Ready to schedule",
      title: "Ready to schedule a delivery?",
      body: "Call Abby directly — every order is handled by the owner.",
      cta: { label: "508.579.9897", href: "tel:5085799897" },
      size: "lg",
      tone: "surface",
      padding: "lg",
    },
    {
      id: "online-quote",
      variant: "cta",
      eyebrow: "Online",
      title: "Build a material list",
      body: "Prefer to type it out? Send a list and we'll come back with pricing and a window.",
      cta: { label: "Get a quote", to: "/quote" },
      size: "md",
      tone: "white",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-surface text-surface-foreground">
        {/* Mobile stacked */}
        <div className="md:hidden">
          <div className="aspect-square overflow-hidden">
            <img src={yardTrucks} alt="Buy The Yard trucks parked at the Jefferson, MA lot" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          </div>
          <div className="px-5 py-8">
            <p className="eyebrow text-brand mb-4">Service Area</p>
            <h1 className="display-2 leading-[0.9]">
              Across <span className="text-brand">Central Mass.</span>
            </h1>
            <p className="mt-4 text-zinc-300 text-base">
              Mulch, loam, sand, gravel, and stone delivered from Jefferson across Worcester County.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href="tel:5085799897" className="inline-flex items-center justify-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90">
                <Phone className="size-4" /> 508.579.9897
              </a>
              <Link to="/quote" className="inline-flex items-center justify-center gap-2 border border-white text-white px-7 h-12 label hover:bg-white hover:text-zinc-900 transition-colors">
                Get a quote
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop split */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 section-loose grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <p className="eyebrow text-brand mb-4">Service Area</p>
              <h1 className="display-1 leading-[0.9] max-w-[16ch]">
                Across <span className="text-brand">Central Mass.</span>
              </h1>
              <p className="mt-6 text-zinc-400 max-w-[52ch] text-lg">
                Mulch, loam, sand, gravel, and stone delivered from Jefferson across Worcester County.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="tel:5085799897" className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90">
                  <Phone className="size-4" /> 508.579.9897
                </a>
                <Link to="/quote" className="inline-flex items-center gap-2 border border-white text-white px-7 h-12 label hover:bg-white hover:text-zinc-900 transition-colors">
                  Get a quote
                </Link>
              </div>
            </div>
            <div className="col-span-5">
              <div className="aspect-[4/5] overflow-hidden rounded-md ring-1 ring-white/10">
                <img src={yardTrucks} alt="Buy The Yard trucks parked at the Jefferson, MA lot" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="bg-kraft border-y border-zinc-300">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-8 md:py-10">
          <ul className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-zinc-300 gap-y-6">
            {[
              [`${TOWNS.length}`, "Towns served"],
              ["~25 mi", "Max radius"],
              ["1 yd", "Order minimum"],
              ["~48 hr", "Typical lead time"],
            ].map(([v, k]) => (
              <li key={k} className="md:px-8 first:md:pl-0 last:md:pr-0">
                <p className="display-3 text-zinc-900 leading-none">{v}</p>
                <p className="eyebrow text-zinc-600 mt-2">{k}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex items-center gap-3 mb-5 md:mb-10">
            <Truck className="size-6 text-brand" />
            <h2 className="display-3 text-zinc-950">
              Towns We Deliver To
            </h2>
          </div>

          {/* Mobile: image-overlay gallery */}
          <div className="md:hidden">
            <TileGrid blocks={mobileTownBlocks} />
          </div>

          {/* Desktop: featured zone + 3-col secondary + dense rest grid */}
          <div className="hidden md:block space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <article className="col-span-6 relative overflow-hidden rounded-md bg-surface text-surface-foreground aspect-[5/4]">
                <img src={yardPiles} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent" />
                <div className="relative z-10 p-8 flex flex-col h-full">
                  <MapPin className="size-6 text-brand" />
                  <div className="mt-auto">
                    <p className="eyebrow text-brand mb-2">Home base</p>
                    <p className="display-3 text-white leading-tight">{featured.name}</p>
                    <p className="label text-zinc-300 mt-2">{featured.drive}</p>
                    <p className="text-zinc-200 mt-3 max-w-[40ch]">{featured.blurb}</p>
                  </div>
                </div>
              </article>
              <div className="col-span-6 grid grid-cols-1 gap-6 content-start">
                {secondary.map((t, i) => (
                  <article key={t.name} className="bg-kraft ring-1 ring-zinc-300 p-6 rounded-md grid grid-cols-[auto_1fr] gap-4">
                    <span className="display-4 text-brand leading-none">{String(i + 2).padStart(2, "0")}</span>
                    <div>
                      <p className="display-5 text-zinc-900 leading-tight">{t.name}</p>
                      <p className="label text-zinc-500 mt-1">{t.drive}</p>
                      <p className="text-sm text-zinc-700 mt-2">{t.blurb}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <TileGrid blocks={restBlocks} />
          </div>

          <div className="mt-6 md:mt-10">
            <TileGrid blocks={helperBlocks} />
          </div>
        </div>
      </section>

      <section className="section bg-kraft border-t border-zinc-300">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <TileGrid blocks={footerBlocks} />
        </div>
      </section>
    </>
  );
}