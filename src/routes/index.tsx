import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy } from "react";
import { ArrowRight, Phone } from "lucide-react";
import heroLoopMp4 from "@/assets/video/hero-loop.mp4?url";
import heroLoopWebm from "@/assets/video/hero-loop.webm?url";
import heroLoopPoster from "@/assets/video/hero-loop-poster.jpg";
import heroLoopMobileMp4 from "@/assets/video/hero-loop-mobile.mp4?url";
import heroLoopMobileWebm from "@/assets/video/hero-loop-mobile.webm?url";
import heroLoopMobilePoster from "@/assets/video/hero-loop-mobile-poster.jpg";
import { LazyOnVisible } from "@/components/site/LazyOnVisible";

const FeaturedMaterials = lazy(() => import("@/components/home/FeaturedMaterials"));
const FacebookSpotlight = lazy(() => import("@/components/home/FacebookSpotlight"));
const ReviewsAndCommunity = lazy(() => import("@/components/home/ReviewsAndCommunity"));
const DeliveryAndPricing = lazy(() => import("@/components/home/DeliveryAndPricing"));
const FaqSection = lazy(() => import("@/components/home/FaqSection"));

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
      {/* Hero */}
      <section className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-300/60 flex w-full aspect-[9/16] min-h-[560px] max-h-[calc(100svh-4rem)] md:aspect-video md:min-h-[560px] md:max-h-[820px]">
        {/* Mobile single hero image */}
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
        {/* Desktop hero background */}
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
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/90 via-zinc-950/65 to-zinc-950/20" />
        {/* Extra mobile scrim for headline contrast over the photo */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/55 to-zinc-950/25" />

        <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:ml-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] px-5 md:px-6 section-loose self-center w-full">
          <div>
            <p className="eyebrow text-zinc-200 mb-5 pb-2 border-b border-white/30 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1">
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
            <p className="lead text-zinc-200 max-w-[54ch] mt-4 md:mt-6 text-pretty">
              By the yard, from our Jefferson, MA lot. Best prices in Central Mass.
            </p>

            <div className="mt-5 md:mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90 transition-opacity"
              >
                Shop materials
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 border border-white text-white px-7 h-12 label hover:bg-white hover:text-zinc-900 transition-colors"
              >
                Get a quote
              </Link>
              <a
                href="tel:5085799897"
                className="inline-flex items-center gap-2 label text-white hover:text-brand transition-colors h-12 px-1"
              >
                <Phone className="size-4" />
                Call Abby · 508.579.9897
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-zinc-950 text-zinc-200 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-6 section-tight grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
          {[
            { k: "10", v: "Years in business" },
            { k: "WBE", v: "Massachusetts WBE certified" },
            { k: "820+", v: "Facebook followers" },
            { k: "5★", v: "Google & Facebook rated" },
          ].map((s, i) => (
            <div key={s.k}>
              <p
                className="display-4 stat-shine uppercase leading-none"
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                {s.k}
              </p>
              <p className="mt-2 label text-zinc-500">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product preview */}
      <LazyOnVisible
        fallback={<div className="section bg-base" style={{ minHeight: 600 }} />}
      >
        <FeaturedMaterials />
      </LazyOnVisible>

      {/* Below-the-fold: each section is fetched only as it enters the viewport */}
      <LazyOnVisible fallback={<div className="section bg-surface" style={{ minHeight: 480 }} />}>
        <FacebookSpotlight />
      </LazyOnVisible>
      <LazyOnVisible fallback={<div className="section bg-kraft" style={{ minHeight: 600 }} />}>
        <ReviewsAndCommunity />
      </LazyOnVisible>
      <LazyOnVisible fallback={<div className="section bg-base" style={{ minHeight: 520 }} />}>
        <DeliveryAndPricing />
      </LazyOnVisible>
      <LazyOnVisible fallback={<div className="section bg-surface" style={{ minHeight: 640 }} />}>
        <FaqSection />
      </LazyOnVisible>
    </>
  );
}
