import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Flower2,
  Layers,
  Mountain,
  Phone,
  ShieldCheck,
  Sprout,
  TreePine,
  Truck,
  Waves,
} from "lucide-react";
import { TileScreen } from "@/components/site/TileScreen";
import { Tile } from "@/components/site/Tile";
import { products, productSlug } from "@/data/products";
import { FacebookLiveTile } from "@/components/home/FacebookLiveTile";
import {
  AbbyTrustBreak,
  DecisionPathBreak,
  DeliveryBasicsBreak,
  LocalProofPanel,
  OrderingBreak,
} from "@/components/home/HomeBreaks";

const FEATURED = [
  "Hemlock Mulch",
  "Screened Loam",
  '3/4" Crushed Blue Stone',
  '3/8" Pea Stone',
  "Hanging Baskets",
].map((n) => products.find((p) => p.name === n)!);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulch, Loam, Sand & Stone — Jefferson, MA" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand & stone from Buy The Yard in Jefferson, MA. Woman-owned, WBE-certified, and built for pickup or delivery across Central Mass.",
      },
      { property: "og:title", content: "Buy The Yard — Bulk Landscape Materials in Jefferson, MA" },
      {
        property: "og:description",
        content:
          "Mulch, loam, sand, stone, garden center materials, and practical ordering help from Abby's Jefferson yard.",
      },
      { property: "og:url", content: "https://buytheyard.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LandscapingBusiness",
          name: "Buy The Yard",
          telephone: "+1-508-579-9897",
          email: "abby@btymaterial.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2264 Main St.",
            addressLocality: "Jefferson",
            addressRegion: "MA",
            postalCode: "01522",
            addressCountry: "US",
          },
          url: "https://buytheyard.lovable.app",
          founder: {
            "@type": "Person",
            name: "Abby Montalto",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <TileScreen
        layout="pageHero"
        label="Buy The Yard — bulk materials in Central Mass"
        tiles={{
          hero: (
            <article className="relative h-full w-full overflow-hidden rounded-md ring-1 ring-zinc-800 bg-zinc-950 text-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800" />
              <div
                aria-hidden="true"
                className="absolute left-0 bottom-16 md:bottom-20 w-1.5 h-56 md:h-72 bg-brand z-10"
              />
              <div className="relative z-10 h-full w-full flex items-end md:items-center">
                <div className="px-5 md:px-10 pb-8 md:pb-0 max-w-3xl">
                  <div className="mb-6">
                    <p className="home-hero-meta eyebrow text-zinc-200 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                        Est. 2016
                      </span>
                      <span aria-hidden="true" className="text-white/40">·</span>
                      <Link to="/wbe" className="hover:text-brand transition-colors">
                        Woman-owned
                      </Link>
                      <span aria-hidden="true" className="hidden sm:inline text-white/40">·</span>
                      <span className="basis-full sm:basis-auto text-zinc-300">Jefferson, MA</span>
                    </p>
                    <span aria-hidden="true" className="mt-2 block h-px w-24 bg-white/25" />
                  </div>
                  <h1 className="home-hero-heading display-2 leading-[0.95] text-balance text-white">
                    Mulch. Loam. Sand.{" "}
                    <span className="relative inline-block text-brand">
                      Stone.
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 200 14"
                        preserveAspectRatio="none"
                        className="absolute left-0 -bottom-1 w-full h-2 text-brand"
                      >
                        <path
                          d="M2 9 C 50 2, 110 2, 198 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </h1>
                  <p className="lead text-zinc-200 max-w-[54ch] mt-4 text-pretty">
                    Bulk landscape materials from Abby’s Jefferson yard — pickup or delivery
                    across Central Mass.
                  </p>
                  <div className="mt-6 flex flex-col gap-2 max-w-md md:flex-row md:flex-wrap md:items-center md:gap-3 md:max-w-none">
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-between md:justify-start gap-2 bg-brand text-brand-foreground px-6 h-12 md:h-11 label hover:opacity-90 transition-opacity"
                    >
                      Shop materials
                      <ArrowRight className="size-4" />
                    </Link>
                    <div className="flex items-stretch gap-3 md:contents">
                      <Link
                        to="/quote"
                        className="flex-1 md:flex-none inline-flex items-center justify-center md:justify-start gap-2 border border-white/30 hover:border-white text-white px-5 h-12 md:h-11 label hover:bg-white/10 transition-colors"
                      >
                        Get a quote
                      </Link>
                      <a
                        href="tel:5085799897"
                        className="inline-flex items-center gap-2 label text-white hover:text-brand transition-colors h-12 md:h-11 px-3"
                      >
                        <Phone className="size-4 text-brand" />
                        508.579.9897
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ),
          a: (
            <Tile
              id="stat-founded"
              fill
              variant="stat"
              layout="anchored"
              tone="surface"
              anchorIndex="01"
              anchorGlyph={<CalendarDays strokeWidth={1.25} />}
              value="2016"
              label="Founded"
              caption="Jefferson yard"
            />
          ),
          b: (
            <Link
              to="/wbe"
              aria-label="What WBE certification means"
              className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Tile
                id="stat-wbe"
                fill
                variant="stat"
                layout="anchored"
                tone="brand"
                anchorIndex="02"
                anchorGlyph={<BadgeCheck strokeWidth={1.25} />}
                value="WBE"
                label="Certified woman-owned"
                caption="Massachusetts →"
              />
            </Link>
          ),
          c: (
            <Tile
              id="stat-licensed"
              fill
              variant="stat"
              layout="anchored"
              tone="kraft"
              anchorIndex="03"
              anchorGlyph={<ShieldCheck strokeWidth={1.25} />}
              value="Licensed"
              label="HIC + DOT"
              caption="MA registered · active carrier"
            />
          ),
          d: (
            <Tile
              id="stat-call"
              fill
              variant="stat"
              layout="anchored"
              tone="surface"
              anchorIndex="04"
              anchorGlyph={<Phone strokeWidth={1.25} />}
              value="Call"
              label="Fastest way to order"
              caption="508.579.9897"
            />
          ),
        }}
      />

      <DecisionPathBreak />
      <OrderingBreak />

      <TileScreen
        layout="section01"
        label="Featured materials"
        heading="Featured materials"
        tiles={{
          hero: (
            <Tile
              id="feat-hero"
              fill
              variant="cta"
              tone="surface"
              layout="anchored"
              icon={<Layers />}
              eyebrow="Bulk materials & garden center"
              title="Featured materials"
              body="Mulch, loam, sand, and stone by the yard — plus seasonal garden center favorites."
              cta={{ label: "See the full catalog", to: "/products" }}
            />
          ),
          ...Object.fromEntries(
            FEATURED.map((p, i) => [
              ["a", "b", "c", "d", "e"][i],
              (
                <Tile
                  key={p.name}
                  id={`feat-${productSlug(p.name)}`}
                  fill
                  variant="text"
                  tone={(["kraft", "surface", "white", "gray", "kraft"] as const)[i]}
                  layout="anchored"
                  icon={[
                    <TreePine />,
                    <Sprout />,
                    <Waves />,
                    <Mountain />,
                    <Flower2 />,
                  ][i]}
                  eyebrow={p.category}
                  title={p.name}
                  body={p.description}
                />
              ),
            ]),
          ),
        }}
      />

      <DeliveryBasicsBreak />

      <TileScreen
        layout="section02"
        label="Local proof"
        heading="Local proof"
        tiles={{
          hero: <LocalProofPanel />,
          a: <FacebookLiveTile />,
          b: (
            <Tile
              id="reviews-ctms"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              icon={<Truck />}
              eyebrow="Community"
              title="CTMS · loam donation"
              body="Loam and mulch donated to Central Tree Middle School."
            />
          ),
          c: (
            <Tile
              id="reviews-rutland"
              fill
              variant="text"
              tone="surface"
              layout="anchored"
              icon={<Flower2 />}
              eyebrow="Community"
              title="Rutland · Memorial Day"
              body="Flowers and flags for the Rutland Public Safety building."
            />
          ),
        }}
      />

      <AbbyTrustBreak />

      <div className="bg-brand text-brand-foreground">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-4 flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <p className="label">Ready to order? Call Abby.</p>
          <div className="flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-center md:gap-4">
            <a href="tel:5085799897" className="inline-flex items-center gap-2 label">
              <Phone className="size-4" />
              508.579.9897
              <ArrowRight className="size-4" />
            </a>
            <Link to="/quote" className="inline-flex items-center gap-2 label border-b border-current">
              Send a quote request
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
