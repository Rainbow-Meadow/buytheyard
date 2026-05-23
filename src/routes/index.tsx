import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarDays, Facebook, Flower2, Layers, MessageSquareQuote, Mountain, Phone, Sprout, Star, TreePine, Truck, Waves } from "lucide-react";
import heroStorefront from "@/assets/source/hero-storefront-open.png";
import { TileScreen } from "@/components/site/TileScreen";
import { Tile } from "@/components/site/Tile";
import { products, productSlug } from "@/data/products";
import featuredHeroYard from "@/assets/featured-hero-yard.webp";
import communityCtms from "@/assets/source/community-ctms-loam.webp";
import communityRutland from "@/assets/source/community-rutland-memorial.webp";
import { FacebookLiveTile } from "@/components/home/FacebookLiveTile";
import { AbbyTrustBreak, DeliveryBasicsBreak, OrderingBreak } from "@/components/home/HomeBreaks";

const FEATURED = [
  "Hemlock Mulch",
  "Screened Loam",
  "Mason Sand",
  '3/4" Crushed Blue Stone',
  "Hanging Baskets",
].map((n) => products.find((p) => p.name === n)!);

/**
 * Defers hero <video> load/play until the browser is idle (or after a short
 * timeout), so the LCP poster image isn't fighting the video for bandwidth.
 * Only the currently visible hero video (mobile or desktop, the other is
 * `display:none`) is kicked off.
 */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulch, Loam, Sand & Stone — Jefferson, MA" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand & stone from our Jefferson, MA yard. Delivery to Holden, Worcester, Princeton, Sterling, Rutland & all of Central Mass. Call 508-579-9897.",
      },
      { property: "og:title", content: "Buy The Yard — Premium Outdoor Materials" },
      {
        property: "og:description",
        content: "Bulk mulch, loam, sand, stone — and a full plant nursery. Pickup or delivery in Central Mass.",
      },
      { property: "og:url", content: "https://buytheyard.lovable.app/" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-home.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-home.jpg" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroStorefront, fetchpriority: "high" },
      { rel: "canonical", href: "https://buytheyard.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Buy The Yard",
          image: "https://buytheyard.lovable.app/og/og-home.jpg",
          telephone: "+1-508-579-9897",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2264 Main St.",
            addressLocality: "Jefferson",
            addressRegion: "MA",
            postalCode: "01522",
          },
          url: "https://buytheyard.lovable.app",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Screen 1 — pageHero: hero panel + 4 stat tiles */}
      <TileScreen
        layout="pageHero"
        label="Buy The Yard — bulk materials in Central Mass"
        tiles={{
          hero: (
            <article className="relative h-full w-full overflow-hidden rounded-md ring-1 ring-zinc-800 bg-zinc-950 text-white">
              <img
                src={heroStorefront}
                alt=""
                aria-hidden="true"
                className="md:hidden absolute inset-0 w-full h-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <img
                src={heroStorefront}
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute inset-0 w-full h-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/90 via-zinc-950/65 to-zinc-950/20" />
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/55 to-zinc-950/25" />
              {/* Vertical anchor mark — bleeds off the left edge as a structural anchor */}
              <div
                aria-hidden="true"
                className="absolute left-0 bottom-16 md:bottom-20 w-1.5 h-56 md:h-72 bg-brand z-10"
              />
              <div className="relative z-10 h-full w-full flex items-end md:items-center">
                <div className="px-5 md:px-10 pb-8 md:pb-0 max-w-3xl">
                  <div className="mb-6">
                    <p className="eyebrow text-zinc-200 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                        10 yrs local
                      </span>
                      <span aria-hidden="true" className="text-white/40">·</span>
                      <Link
                        to="/wbe"
                        className="hover:text-brand transition-colors"
                      >
                        Woman-owned <span className="text-brand">(WBE)</span>
                      </Link>
                    </p>
                    <span aria-hidden="true" className="mt-2 block h-px w-24 bg-white/25" />
                  </div>
                  <h1 className="display-2 leading-[0.95] text-balance text-white">
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
                    Bulk landscape materials from our Jefferson yard — pickup or delivery across Central Mass.
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
          a: <Tile id="stat-years" fill variant="stat" layout="anchored" tone="surface" anchorIndex="01" anchorGlyph={<CalendarDays strokeWidth={1.25} />} value="10" label="Years in business" caption="Since 2016" />,
          b: (
            <Link to="/wbe" aria-label="What WBE certification means" className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <Tile id="stat-wbe" fill variant="stat" layout="anchored" tone="brand" anchorIndex="02" anchorGlyph={<BadgeCheck strokeWidth={1.25} />} value="WBE" label="WBE-certified" caption="Woman-owned →" />
            </Link>
          ),
          c: <Tile id="stat-fb" fill variant="stat" layout="anchored" tone="kraft" anchorIndex="03" anchorGlyph={<Facebook strokeWidth={1.25} />} value="820+" label="Facebook followers" caption="Daily restocks" />,
          d: <Tile id="stat-stars" fill variant="stat" layout="anchored" tone="gray" anchorIndex="04" anchorGlyph={<Star strokeWidth={1.25} />} value="5★" label="Google & Facebook rated" caption="Five-star rated" />,
        }}
      />

      <OrderingBreak />

      {/* Screen 2 — Featured materials: hero + 5 product tiles, viewport-locked */}
      <TileScreen
        layout="section01"
        label="Featured materials"
        heading="Featured materials"
        tiles={{
          hero: (
            <Tile
              id="feat-hero"
              fill
              variant="image"
              src={featuredHeroYard}
              alt="Piles of mulch, sand, and stone at the Jefferson yard"
              focal="center"
              overlay={{
                eyebrow: "Bulk materials & garden center",
                title: "Featured materials",
                body: "Mulch, loam, sand, and stone by the yard — plus seasonal garden center favorites.",
                align: "bottom-left",
                layout: "anchored",
                anchorIcon: <Layers />,
              }}
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
                  variant="image"
                  src={p.image!}
                  alt={p.name}
                  focal="center"
                  overlay={{
                    eyebrow: p.category,
                    title: p.name,
                    align: "bottom-left",
                    layout: "anchored",
                    anchorIcon: [
                      <TreePine />,   // Hemlock Mulch
                      <Sprout />,     // Screened Loam
                      <Waves />,      // Mason Sand
                      <Mountain />,   // Crushed Blue Stone
                      <Flower2 />,    // Hanging Baskets
                    ][i],
                  }}
                  details={{
                    shareId: `feat-${productSlug(p.name)}`,
                    eyebrow: p.category,
                    title: p.name,
                    body: p.description,
                  }}
                />
              ),
            ]),
          ),
        }}
      />

      <DeliveryBasicsBreak />

      {/* Screen 3 — section02: Social proof + community */}
      <TileScreen
        layout="section02"
        label="Local proof"
        heading="Local proof"
        tiles={{
          hero: (
            <Tile
              id="reviews-hero"
              fill
              variant="carousel"
              auto
              interval={6500}
              controls="dots"
              ariaLabel="Customer reviews from Facebook"
              slides={[
                {
                  id: "rev-1",
                  variant: "quote",
                  tone: "kraft",
                  layout: "anchored",
                  anchorIcon: <MessageSquareQuote />,
                  eyebrow: "Local proof · real customers",
                  quote:
                    "Abby and crew are awesome. Very accommodating, great prices, delivery and quality product.",
                  attribution: "Rob Warner · Apr 21",
                },
                {
                  id: "rev-2",
                  variant: "quote",
                  tone: "surface",
                  layout: "anchored",
                  anchorIcon: <MessageSquareQuote />,
                  eyebrow: "Local proof · real customers",
                  quote:
                    "Best mulch in Central Mass and the price can't be beat. Delivery was right on time.",
                  attribution: "Local customer · Holden",
                },
                {
                  id: "rev-3",
                  variant: "quote",
                  tone: "kraft",
                  layout: "anchored",
                  anchorIcon: <MessageSquareQuote />,
                  eyebrow: "Local proof · real customers",
                  quote:
                    "Quality loam, fair pricing, and Abby actually picks up the phone. That's rare.",
                  attribution: "Repeat customer · Rutland",
                },
              ]}
            />
          ),
          a: <FacebookLiveTile />,
          b: (
            <Tile
              id="reviews-ctms"
              fill
              variant="image"
              src={communityCtms}
              alt="Buy The Yard dump truck unloading loam at Central Tree Middle School"
              focal="center"
              overlay={{
                eyebrow: "Community",
                title: "CTMS · loam donation",
                align: "bottom-left",
                layout: "anchored",
                anchorIcon: <Truck />,
              }}
            />
          ),
          c: (
            <Tile
              id="reviews-rutland"
              fill
              variant="image"
              src={communityRutland}
              alt="Memorial Day flowers at the Rutland Public Safety building"
              focal="center"
              overlay={{
                eyebrow: "Community",
                title: "Rutland · Memorial Day",
                align: "bottom-left",
                layout: "anchored",
                anchorIcon: <Flower2 />,
              }}
            />
          ),
        }}
      />

      <AbbyTrustBreak />

      {/* Final CTA — sticky phone bar */}
      <div className="bg-brand text-brand-foreground">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="label">Ready to order? Call Abby.</p>
          <div className="flex flex-wrap items-center gap-4">
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
