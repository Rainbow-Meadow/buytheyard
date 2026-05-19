import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Truck } from "lucide-react";

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
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-6 section-loose">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
            Service Area
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] max-w-[18ch]">
            Across <span className="text-brand">Central Mass.</span>
          </h1>
          <p className="mt-6 text-zinc-400 max-w-[62ch] text-lg">
            Mulch, loam, sand, gravel, and stone delivered from Jefferson across Worcester County.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:5085799897"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90"
            >
              <Phone className="size-4" /> 508.579.9897
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 border border-white text-white px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <Truck className="size-6 text-brand" />
            <h2 className="font-display text-4xl md:text-5xl uppercase text-zinc-950">
              Towns We Deliver To
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOWNS.map((t) => (
              <li
                key={t.name}
                className="bg-kraft ring-1 ring-zinc-300 p-6 rounded-md"
              >
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="size-4 text-brand mt-1 shrink-0" />
                  <div>
                    <p className="font-display text-2xl uppercase text-zinc-900 leading-tight">
                      {t.name}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                      {t.drive}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-zinc-700 mt-3">{t.blurb}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-zinc-600 max-w-[60ch]">
            Don't see your town? We deliver throughout Worcester County
            and parts of Middlesex County. Give us a call and we'll
            confirm your ZIP and final price before dispatch.
          </p>
        </div>
      </section>

      <section className="section bg-kraft border-t border-zinc-300">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl uppercase mb-4">
            Ready to schedule a delivery?
          </h2>
          <p className="text-zinc-700 mb-6">
            Call Abby directly — every order is handled by the owner.
          </p>
          <a
            href="tel:5085799897"
            className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90"
          >
            <Phone className="size-4" /> 508.579.9897
          </a>
        </div>
      </section>
    </>
  );
}