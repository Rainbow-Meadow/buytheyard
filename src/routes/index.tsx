import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarDays, Facebook, FileText, Phone, Star, Tag } from "lucide-react";
import heroLoopMp4 from "@/assets/video/hero-loop.mp4?url";
import heroLoopWebm from "@/assets/video/hero-loop.webm?url";
import heroLoopPoster from "@/assets/video/hero-loop-poster.jpg";
import heroLoopMobileMp4 from "@/assets/video/hero-loop-mobile.mp4?url";
import heroLoopMobileWebm from "@/assets/video/hero-loop-mobile.webm?url";
import heroLoopMobilePoster from "@/assets/video/hero-loop-mobile-poster.jpg";
import { TileScreen } from "@/components/site/TileScreen";
import { Tile } from "@/components/site/Tile";
import { products, productSlug } from "@/data/products";
import mulchBlack from "@/assets/mulch-black.webp";
import communityCtms from "@/assets/source/community-ctms-loam.webp";
import communityRutland from "@/assets/source/community-rutland-memorial.webp";
import { FaqDialogTile } from "@/components/home/FaqDialogTile";
import { ServiceAreaMapTile } from "@/components/home/ServiceAreaMapTile";
import { FacebookLiveTile } from "@/components/home/FacebookLiveTile";

const FEATURED = [
  "Hemlock Mulch",
  "Screened Loam",
  "Mason Sand",
  '3/4" Crushed Blue Stone',
  "Red Lava Rock",
  "Hanging Baskets",
].map((n) => products.find((p) => p.name === n)!);

/**
 * Defers hero <video> load/play until the browser is idle (or after a short
 * timeout), so the LCP poster image isn't fighting the video for bandwidth.
 * Only the currently visible hero video (mobile or desktop, the other is
 * `display:none`) is kicked off.
 */
function kickHeroVideo(el: HTMLVideoElement | null) {
  if (!el) return;
  el.muted = true;
  el.defaultMuted = true;

  const start = () => {
    // Skip the hidden hero variant — `display:none` videos have offsetParent === null.
    if (el.offsetParent === null) return;
    try {
      el.load();
    } catch {
      /* noop */
    }
    el.play().catch(() => {});
  };

  type IdleWindow = Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  const w = window as IdleWindow;
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(start, { timeout: 1500 });
  } else {
    setTimeout(start, 400);
  }
}

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
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much does material cost?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Prices move with the season and the market, so we quote by phone. Call 508-579-9897 or request an online quote and you'll get today's number. One-yard minimum on all bulk orders.",
              },
            },
            {
              "@type": "Question",
              name: "Do you deliver to my town?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We offer curbside delivery throughout Central Massachusetts from our Jefferson yard, including Holden, Princeton, Sterling, Rutland, West Boylston, Paxton, Worcester, Leominster, and surrounding towns. Delivery is priced by ZIP code; a brief call confirms your service area and final price before your order is dispatched.",
              },
            },
            {
              "@type": "Question",
              name: "What's the 4% card fee about?",
              acceptedAnswer: {
                "@type": "Answer",
              text: "The 4% surcharge is passed through directly from our payment processor. Cash and check payments are accepted with no additional fee. Your quoted price is the same regardless of payment method.",
              },
            },
            {
              "@type": "Question",
              name: "How fast can I get a delivery?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Same-day delivery may be available when you call before noon, depending on the day's route. Otherwise, please allow approximately 48 hours. Delivery is made to the driveway or curbline only.",
              },
            },
          ],
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

      {/* Screen 2 — Featured materials: hero tile + 2×3 product grid */}
      <section aria-label="Featured materials" className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col gap-2 md:gap-4">
          <Tile
            id="feat-hero"
            variant="image"
            size="feature"
            src={mulchBlack}
            alt="Bulk mulch, loam, sand and stone"
            aspect={{ mobile: "portrait", desktop: "wide" }}
            focal="center"
            overlay={{
              eyebrow: "Bulk materials & garden center",
              title: "Featured materials",
              body: "Mulch, loam, sand, stone — by the yard, from our Jefferson lot.",
              align: "bottom-left",
            }}
            cta={{ label: "See the full catalog", to: "/products" }}
          />
          <div className="tile-grid">
            {FEATURED.map((p) => (
              <Tile
                key={p.name}
                id={`feat-${productSlug(p.name)}`}
                variant="image"
                size="sm"
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
            ))}
          </div>
        </div>
      </section>

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

      {/* Screen 4 — section05: Delivery, pricing, FAQ */}
      <TileScreen
        layout="section05"
        label="Delivery, pricing & FAQ"
        tiles={{
          hero: <ServiceAreaMapTile />,
          a: (
            <Tile
              id="dp-call"
              fill
              variant="cta"
              tone="brand"
              icon={<Phone />}
              eyebrow="Fastest path"
              title="Call for today's price"
              body="Cash and check skip the 4% card fee."
              cta={{ label: "508.579.9897", href: "tel:5085799897" }}
            />
          ),
          b: (
            <Tile
              id="dp-quote"
              fill
              variant="cta"
              tone="surface"
              icon={<FileText />}
              eyebrow="Prefer it in writing"
              title="Request a written quote"
              body="Tell us the job — we'll send a number by email."
              cta={{ label: "Start a quote", to: "/quote" }}
            />
          ),
          c: (
            <FaqDialogTile
              tone="gray"
              eyebrow="01 · Pricing"
              question="What does it cost?"
              answer="Prices move with the season and the market, so we quote by phone. Call 508-579-9897 or request an online quote and you'll get today's number. One-yard minimum on all bulk orders. Cash and check payments skip the 4% card processing fee."
            />
          ),
          d: (
            <FaqDialogTile
              tone="surface"
              eyebrow="02 · Delivery area"
              question="Deliver here?"
              answer="We offer curbside delivery throughout Central Massachusetts from our Jefferson yard, including Holden, Princeton, Sterling, Rutland, West Boylston, Paxton, Worcester, Leominster, and surrounding towns. Delivery is priced by ZIP code; a brief call confirms your service area and final price before your order is dispatched."
            />
          ),
          e: (
            <FaqDialogTile
              tone="surface"
              eyebrow="03 · Timing"
              question="How soon?"
              answer="Same-day delivery may be available when you call before noon, depending on the day's route. Otherwise, please allow approximately 48 hours. Delivery is made to the driveway or curbline only — please mark your drop spot before the truck arrives."
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
