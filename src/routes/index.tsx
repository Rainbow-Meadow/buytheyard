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
import { products } from "@/data/products";
import communityCtms from "@/assets/source/community-ctms-loam.webp";
import communityRutland from "@/assets/source/community-rutland-memorial.webp";
import { FaqDialogTile } from "@/components/home/FaqDialogTile";
import { ServiceAreaMapTile } from "@/components/home/ServiceAreaMapTile";
import { FacebookLiveTile } from "@/components/home/FacebookLiveTile";

const FEATURED = [
  "Hemlock Mulch",
  "Screened Loam",
  "Mason Sand",
  "3/4\" Crushed Blue Stone",
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

      {/* Screen 2 — section01: Featured materials */}
      <TileScreen
        layout="section01"
        label="Featured materials"
        tiles={{
          hero: (
            <Tile
              id="feat-hero"
              fill
              variant="image"
              src={FEATURED[0].image!}
              alt={FEATURED[0].name}
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
          ),
          a: (
            <Tile
              id="feat-loam"
              fill
              variant="image"
              src={FEATURED[1].image!}
              alt={FEATURED[1].name}
              focal="center"
              overlay={{ eyebrow: "Loam", title: FEATURED[1].name, align: "bottom-left" }}
              details={{
                shareId: "feat-loam",
                eyebrow: "Loam",
                title: FEATURED[1].name,
                body: FEATURED[1].description,
              }}
            />
          ),
          b: (
            <Tile
              id="feat-sand"
              fill
              variant="image"
              src={FEATURED[2].image!}
              alt={FEATURED[2].name}
              focal="center"
              overlay={{ eyebrow: "Sand", title: FEATURED[2].name, align: "bottom-left" }}
              details={{
                shareId: "feat-sand",
                eyebrow: "Sand",
                title: FEATURED[2].name,
                body: FEATURED[2].description,
              }}
            />
          ),
          c: (
            <Tile
              id="feat-stone"
              fill
              variant="image"
              src={FEATURED[3].image!}
              alt={FEATURED[3].name}
              focal="center"
              overlay={{ eyebrow: "Stone", title: FEATURED[3].name, align: "bottom-left" }}
              details={{
                shareId: "feat-stone",
                eyebrow: "Stone",
                title: FEATURED[3].name,
                body: FEATURED[3].description,
              }}
            />
          ),
          d: (
            <Tile
              id="feat-lava"
              fill
              variant="image"
              src={FEATURED[4].image!}
              alt={FEATURED[4].name}
              focal="center"
              overlay={{ eyebrow: "Specialty", title: FEATURED[4].name, align: "bottom-left" }}
              details={{
                shareId: "feat-lava",
                eyebrow: "Specialty",
                title: FEATURED[4].name,
                body: FEATURED[4].description,
              }}
            />
          ),
          e: (
            <Tile
              id="feat-plants"
              fill
              variant="image"
              src={FEATURED[5].image!}
              alt={FEATURED[5].name}
              focal="center"
              overlay={{ eyebrow: "Garden center", title: FEATURED[5].name, align: "bottom-left" }}
              details={{
                shareId: "feat-plants",
                eyebrow: "Garden center",
                title: FEATURED[5].name,
                body: FEATURED[5].description,
              }}
            />
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
              variant="quote"
              tone="kraft"

              eyebrow="From Facebook · real customers"
              quote="Abby and crew are awesome. Very accommodating, great prices, delivery and quality product."
              attribution="Rob Warner · Apr 21"
            />
          ),
          a: (
            <Tile
              id="reviews-fb"
              fill
              variant="cta"
              tone="surface"
              icon={<Facebook />}
              eyebrow="On Facebook"
              title="Where the yard lives"
              body="Daily restocks, closures, lot photos."
              cta={{
                label: "Follow on Facebook",
                href: "https://www.facebook.com/BuyTheYardOutdoorProducts",
              }}
            />
          ),
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
          hero: (
            <Tile
              id="dp-delivery"
              fill
              variant="cta"
              tone="surface"

              icon={<Truck />}
              eyebrow="Delivery"
              title="Delivery across Central Mass"
              body="Curbside from our Jefferson yard. Call before noon and we'll try for same-day. Driveway or curbline only — mark your spot."
              cta={{ label: "Delivery details", to: "/delivery" }}
            />
          ),
          a: (
            <Tile
              id="dp-call"
              fill
              variant="cta"
              tone="brand"
              icon={<Tag />}
              eyebrow="Today's price by phone"
              title="Call for a quote"
              body="Cash and check skip the 4% card fee."
              cta={{ label: "508.579.9897", href: "tel:5085799897" }}
            />
          ),
          b: (
            <Tile
              id="dp-quote"
              fill
              variant="cta"
              tone="kraft"
              icon={<HelpCircle />}
              eyebrow="Before you call"
              title="Quick answers"
              cta={{ label: "Start a quote", to: "/quote" }}
            />
          ),
          c: (
            <Tile
              id="dp-faq-pricing"
              fill
              variant="text"
              tone="gray"
              eyebrow="01 · Pricing"
              title="What does it cost?"
              body="Quoted by phone. 1-yard minimum."
            />
          ),
          d: (
            <Tile
              id="dp-faq-area"
              fill
              variant="text"
              tone="surface"
              eyebrow="02 · Delivery area"
              title="Deliver here?"
            />
          ),
          e: (
            <Tile
              id="dp-faq-timing"
              fill
              variant="text"
              tone="surface"
              eyebrow="03 · Timing"
              title="How soon?"
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
