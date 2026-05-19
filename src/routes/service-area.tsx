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
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">ROUTES DESK · § R</span>
            <span className="dateline text-ink-soft hidden sm:inline">WORCESTER COUNTY &amp; BEYOND</span>
          </div>
          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[18ch]">
            Across <span className="text-stamp">Central Mass.</span>
          </h1>
          <p className="lead mt-4 max-w-[60ch] text-ink-soft not-italic">
            Mulch, loam, sand, gravel, and stone delivered from Jefferson across Worcester County.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="tel:5085799897"
              className="inline-flex items-center gap-2 bg-stamp text-newsprint label px-6 h-12 btn-press hover:bg-ink"
            >
              <Phone className="size-4" strokeWidth={2.5} /> 508.579.9897
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 border-2 border-ink text-ink label px-6 h-12 btn-press hover:bg-ink hover:text-newsprint"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thick">
            <div className="flex items-center gap-3">
              <Truck className="size-6 text-stamp" />
              <h2 className="display-3 text-ink leading-none">Towns We Deliver To</h2>
            </div>
            <span className="dateline text-ink-soft hidden sm:inline">{TOWNS.length} LISTINGS</span>
          </div>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-ink/15">
            {TOWNS.map((t, i) => (
              <li
                key={t.name}
                className="bg-newsprint border-r border-b border-ink/15 p-6 -mr-px -mb-px flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="meta text-ink-soft tabular">№ {String(i + 1).padStart(2, "0")}</span>
                  <span className="eyebrow text-stamp inline-flex items-center gap-1.5">
                    <MapPin className="size-3" /> {t.drive}
                  </span>
                </div>
                <p className="display-4 text-ink leading-tight">{t.name}</p>
                <p className="body-sm text-ink-soft mt-3 flex-1">{t.blurb}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 caption max-w-[60ch]">
            Don't see your town? We deliver throughout Worcester County and parts
            of Middlesex County. Call to confirm your ZIP and final price before dispatch.
          </p>
        </div>
      </section>

      <section className="bg-stamp text-newsprint">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16 text-center">
          <p className="dateline text-newsprint/70">— DISPATCH —</p>
          <h2 className="display-2 mt-4 text-balance">
            Ready to schedule a delivery?
          </h2>
          <p className="body mt-4 text-newsprint/85 max-w-[44ch] mx-auto">
            Call Abby directly — every order is handled by the owner.
          </p>
          <a
            href="tel:5085799897"
            className="mt-6 inline-flex items-center gap-3 bg-newsprint text-ink label text-base px-7 h-14 btn-press hover:bg-ink hover:text-newsprint"
          >
            <Phone className="size-5" strokeWidth={2.5} /> 508.579.9897
          </a>
        </div>
      </section>
    </>
  );
}