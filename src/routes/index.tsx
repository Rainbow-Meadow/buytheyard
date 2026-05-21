import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarDays, Facebook, Phone, Star } from "lucide-react";
import heroStorefrontDesktop from "@/assets/hero-storefront-desktop.webp";
import heroStorefrontMobile from "@/assets/hero-storefront-mobile.webp";
import { TileScreen } from "@/components/site/TileScreen";
import { Tile } from "@/components/site/Tile";
import { products, productSlug } from "@/data/products";
import featuredHeroYard from "@/assets/featured-hero-yard.webp";
import communityCtms from "@/assets/source/community-ctms-loam.webp";
import communityRutland from "@/assets/source/community-rutland-memorial.webp";
import { FacebookLiveTile } from "@/components/home/FacebookLiveTile";

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
      { rel: "preload", as: "image", href: heroLoopMobilePoster, fetchpriority: "high", media: "(max-width: 767px)" },
      { rel: "preload", as: "image", href: heroLoopPoster, fetchpriority: "high", media: "(min-width: 768px)" },
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
            streetAddress: "30 Florence Rd",
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
              <video
                ref={kickHeroVideo}
                className="md:hidden absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                poster={heroLoopMobilePoster}
                aria-hidden="true"
              >
                <source src={heroLoopMobileWebm} type="video/webm" />
                <source src={heroLoopMobileMp4} type="video/mp4" />
              </video>
              <video
                ref={kickHeroVideo}
                className="hidden md:block absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                poster={heroLoopPoster}
                aria-hidden="true"
              >
                <source src={heroLoopWebm} type="video/webm" />
                <source src={heroLoopMp4} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/90 via-zinc-950/65 to-zinc-950/20" />
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/55 to-zinc-950/25" />
              <div className="relative z-10 h-full w-full flex items-center">
                <div className="px-5 md:px-10 max-w-3xl">
                  <p className="eyebrow text-zinc-200 mb-4 pb-2 border-b border-white/30 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                      10 yrs local
                    </span>
                    <span aria-hidden="true" className="text-white/40">·</span>
                    <span>Woman-owned <span className="text-brand">(WBE)</span></span>
                  </p>
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
                    By the yard, from our Jefferson lot. Best prices in Central Mass.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-6 h-11 label hover:opacity-90 transition-opacity"
                    >
                      Shop materials
                      <ArrowRight className="size-4" />
                    </Link>
                    <Link
                      to="/quote"
                      className="inline-flex items-center gap-2 border border-white text-white px-6 h-11 label hover:bg-white hover:text-zinc-900 transition-colors"
                    >
                      Get a quote
                    </Link>
                    <a
                      href="tel:5085799897"
                      className="inline-flex items-center gap-2 label text-white hover:text-brand transition-colors h-11 px-1"
                    >
                      <Phone className="size-4" />
                      508.579.9897
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ),
          a: <Tile id="stat-years" fill variant="stat" tone="surface" icon={<CalendarDays />} value="10" label="Years in business" />,
          b: <Tile id="stat-wbe" fill variant="stat" tone="brand" icon={<BadgeCheck />} value="WBE" label="MA-certified woman-owned" />,
          c: <Tile id="stat-fb" fill variant="stat" tone="kraft" icon={<Facebook />} value="820+" label="Facebook followers" />,
          d: <Tile id="stat-stars" fill variant="stat" tone="gray" icon={<Star />} value="5★" label="Google & Facebook rated" />,
        }}
      />

      {/* Screen 2 — Featured materials: hero + 5 product tiles, viewport-locked */}
      <TileScreen
        layout="section01"
        label="Featured materials"
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
                body: "Mulch, loam, sand, stone — by the yard, from our Jefferson lot.",
                align: "bottom-left",
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
                  overlay={{ eyebrow: p.category, title: p.name, align: "bottom-left" }}
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

      {/* Screen 3 — section02: Social proof + community */}
      <TileScreen
        layout="section02"
        label="Reviews and community"
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
                  eyebrow: "From Facebook · real customers",
                  quote:
                    "Abby and crew are awesome. Very accommodating, great prices, delivery and quality product.",
                  attribution: "Rob Warner · Apr 21",
                },
                {
                  id: "rev-2",
                  variant: "quote",
                  tone: "surface",
                  eyebrow: "From Facebook · real customers",
                  quote:
                    "Best mulch in Central Mass and the price can't be beat. Delivery was right on time.",
                  attribution: "Local customer · Holden",
                },
                {
                  id: "rev-3",
                  variant: "quote",
                  tone: "kraft",
                  eyebrow: "From Facebook · real customers",
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
              }}
            />
          ),
        }}
      />


      {/* Final CTA — sticky phone bar */}
      <div className="bg-brand text-brand-foreground">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="label">Ready to order? Call Abby.</p>
          <a href="tel:5085799897" className="inline-flex items-center gap-2 label">
            <Phone className="size-4" />
            508.579.9897
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </>
  );
}
