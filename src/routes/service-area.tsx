import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Truck } from "lucide-react";
import yardTrucks from "@/assets/source/yard-trucks.webp";
import loadingTruck from "@/assets/source/loading-truck.webp";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

type Town = {
  name: string;
  blurb: string;
  drive: string;
};

const TOWNS: Town[] = [
  { name: "Jefferson, MA", drive: "0 min (the yard)", blurb: "Home base. Stop in at 2264 Main St. for pickup, or call ahead and we'll have it loaded." },
  { name: "Holden, MA", drive: "~10 min", blurb: "Our most frequent delivery zone. Mulch, loam, and stone runs go out daily in season." },
  { name: "Princeton, MA", drive: "~15 min", blurb: "Driveway drops for new beds, pea-stone paths, and screened loam for lawn repair." },
  { name: "Sterling, MA", drive: "~15 min", blurb: "Bulk mulch and compost deliveries for spring cleanups and vegetable gardens." },
  { name: "Rutland, MA", drive: "~15 min", blurb: "Crushed stone, screened loam, and playground chips delivered curbside." },
  { name: "Paxton, MA", drive: "~15 min", blurb: "Premium black mulch, hemlock mulch, and bed-dressing stone, with one-yard minimum." },
  { name: "West Boylston, MA", drive: "~15 min", blurb: "Call before noon and we'll try for same-day." },
  { name: "Boylston, MA", drive: "~20 min", blurb: "Bulk material for residential beds, contractor jobs, and town projects." },
  { name: "Worcester, MA", drive: "~20 min", blurb: "Driveway and curbline drops throughout Worcester. Call to confirm your ZIP." },
  { name: "Leominster, MA", drive: "~25 min", blurb: "Delivery available; 48-hour notice recommended for the northern route." },
  { name: "Clinton, MA", drive: "~20 min", blurb: "Mulch, loam, sand, and gravel deliveries on the eastern route." },
  { name: "Lancaster, MA", drive: "~25 min", blurb: "Bulk landscape supply for residential and small contractor jobs." },
  { name: "Spencer, MA", drive: "~25 min", blurb: "Crushed blue stone for driveways, pea gravel for paths, and screened loam for new lawns." },
  { name: "Auburn, MA", drive: "~25 min", blurb: "Curbside delivery throughout Auburn. Mark your drop spot." },
  { name: "Shrewsbury, MA", drive: "~25 min", blurb: "Bulk materials delivered curbside; 48-hour notice recommended." },
];

const TITLE = "Service Area — Central MA Delivery | Buy The Yard";
const DESCRIPTION =
  "Bulk mulch, loam, sand & stone delivery from our Jefferson, MA yard to Holden, Worcester, Princeton, Sterling & nearby towns across Central Massachusetts.";

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
      {/* Screen 1 — pageHero: trucks + service stat tiles */}
      <TileScreen
        layout="pageHero"
        label="Buy The Yard service area"
        tiles={{
          hero: (
            <Tile
              id="sa-hero"
              fill
              variant="image"
              src={yardTrucks}
              alt="Buy The Yard trucks parked at the Jefferson, MA lot"
              focal="center"
              loading="eager"
              fetchPriority="high"
              overlay={{
                eyebrow: "Service area",
                title: "Across Central Mass.",
                body: "Mulch, loam, sand, gravel & stone delivered from Jefferson across Worcester County.",
                align: "bottom-left",
              }}
              cta={{ label: "Get a quote", to: "/quote" }}
            />
          ),
          a: <Tile id="sa-stat-towns" fill variant="stat" tone="surface" value={`${TOWNS.length}`} label="Towns served" />,
          b: <Tile id="sa-stat-radius" fill variant="stat" tone="brand" value="~25 mi" label="Max delivery radius" />,
          c: <Tile id="sa-stat-min" fill variant="stat" tone="kraft" value="1 yd" label="Order minimum" />,
          d: <Tile id="sa-stat-lead" fill variant="stat" tone="gray" value="~48 hr" label="Typical lead time" />,
        }}
      />

      {/* Screen 2 — section04: featured towns + helper CTAs */}
      <TileScreen
        layout="section04"
        label="Towns we deliver to"
        tiles={{
          hero: (
            <Tile
              id="sa-towns"
              fill
              size="feature"
              variant="text"
              tone="surface"

              icon={<Truck />}
              eyebrow="Home base · daily routes"
              title="Holden, Princeton, Sterling, Rutland, Paxton, West Boylston, Worcester."
              body="Plus Boylston, Leominster, Clinton, Lancaster, Spencer, Auburn & Shrewsbury on 48-hour notice."
            />
          ),
          a: (
            <Tile
              id="sa-jefferson"
              fill
              variant="image"
              src={loadingTruck}
              alt="A Buy The Yard truck being loaded at the Jefferson yard"
              focal="center"
              overlay={{ eyebrow: "Jefferson, MA", title: "Home base · 2264 Main St.", align: "bottom-left" }}
            />
          ),
          b: (
            <Tile
              id="sa-call"
              fill
              variant="cta"
              tone="brand"
              icon={<Phone />}
              eyebrow="Confirm your ZIP & price"
              title="Call Abby"
              cta={{ label: "508.579.9897", href: "tel:5085799897" }}
            />
          ),
          c: (
            <Tile
              id="sa-quote"
              fill
              variant="cta"
              tone="kraft"
              icon={<MapPin />}
              eyebrow="Online"
              title="Build a material list"
              body="Send products, town, and timing — we'll come back with pricing."
              cta={{ label: "Get a quote", to: "/quote" }}
            />
          ),
        }}
      />
    </>
  );
}