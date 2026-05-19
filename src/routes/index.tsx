import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Facebook, HelpCircle, Phone, Tag, Truck } from "lucide-react";
import heroMobile from "@/assets/source/hero-mobile-piles-mulch-sand-stone-2026.png";
import heroDesktop from "@/assets/source/hero-desktop-yard-2026.png";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const reviews = [
  {
    name: "Rob Warner",
    date: "Apr 21",
    quote:
      "Abby and crew are awesome. Very accommodating, great prices, delivery and quality product.",
  },
  {
    name: "Michael Radesky",
    date: "Aug 26, 2019",
    quote:
      "Wicked nice folks! Dependable, personable, and good products. We love Abby!!!",
  },
  {
    name: "John Sarkisian",
    date: "May 7, 2019",
    quote: "Great customer service. Very professional. Prices are fair!",
  },
];

const communityPosts = [
  {
    org: "Central Tree Middle School",
    date: "Jun 26, 2024",
    quote:
      "Thank you to former CTMS Student and owner of Buy The Yard Outdoor Products Abby Montalto for her generosity. Loam has been delivered and mulch is on the way.",
  },
  {
    org: "Rutland Fire Department",
    date: "May 22, 2020",
    quote:
      "Just wanted to say thank you to the following local businesses that have helped out to make the public safety building look amazing for this Memorial Day. Wildwood Lawn Care, Buy The Yard Outdoor Products, Sterling Irrigation, and the Patterson Family.",
  },
];

function MobileCollapse({
  id,
  open,
  onToggle,
  label,
  children,
}: {
  id: string;
  open: boolean;
  onToggle: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="md:hidden w-full flex items-center justify-between gap-4 py-4 mt-2 text-left border-y border-zinc-300/70"
      >
        <span className="label text-zinc-900">
          {open ? `Hide ${label}` : `Show ${label}`}
        </span>
        <ChevronDown
          className={`size-5 text-zinc-700 transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:!grid-rows-[1fr] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden md:overflow-visible">
          <div className="pt-6 md:pt-0">{children}</div>
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulch, Loam, Sand & Stone — Jefferson, MA | Central MA Delivery" },
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
      { rel: "preload", as: "image", href: heroMobile, fetchpriority: "high", media: "(max-width: 767px)" },
      { rel: "preload", as: "image", href: heroDesktop, fetchpriority: "high", media: "(min-width: 768px)" },
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
  
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const reviewsRailRef = useRef<HTMLDivElement>(null);
  const [reviewsCanPrev, setReviewsCanPrev] = useState(false);
  const [reviewsCanNext, setReviewsCanNext] = useState(true);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-rail-item]");
    const delta = (card?.offsetWidth ?? el.clientWidth * 0.8) + 24;
    el.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  useEffect(() => {
    const el = reviewsRailRef.current;
    if (!el) return;
    const update = () => {
      setReviewsCanPrev(el.scrollLeft > 4);
      setReviewsCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollReviewsByCard = (dir: 1 | -1) => {
    const el = reviewsRailRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-reviews-item]");
    const delta = (card?.offsetWidth ?? el.clientWidth * 0.8) + 20;
    el.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  useEffect(() => {
    const el = reviewsRailRef.current;
    if (!el) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;
    let paused = false;

    const tick = () => {
      if (paused || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = el.querySelector<HTMLElement>("[data-reviews-item]");
        const delta = (card?.offsetWidth ?? el.clientWidth * 0.8) + 20;
        el.scrollBy({ left: delta, behavior: "smooth" });
      }
    };

    const start = () => {
      if (timer) return;
      timer = setInterval(tick, 5000);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onEnter = () => { paused = true; stop(); };
    const onLeave = () => { paused = false; start(); };
    const onTouchStart = () => { paused = true; stop(); };
    const onTouchEnd = () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => { paused = false; start(); }, 2500);
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!paused) start();
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const featured = [
    "Hemlock Mulch",
    "Screened Loam",
    "Mason Sand",
    "3/4\" Crushed Blue Stone",
    "Red Lava Rock",
    "Hanging Baskets",
    "ASTM Playground Chips",
    "Hand Tools & Long Handles",
  ]
    .map((n) => products.find((p) => p.name === n))
    .filter((p): p is (typeof products)[number] => Boolean(p));


  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-300/60 md:min-h-[504px] flex">
        {/* Mobile single hero image */}
        <img
          src={heroMobile}
          alt="Illustration of red, tan, and gray landscape material piles"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="md:hidden absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Desktop hero background */}
        <img
          src={heroDesktop}
          alt="The Buy The Yard yard with a loader, mulch and stone piles, OPEN flag, and Adirondack chairs by the flower beds"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        />
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
      <section className="bg-zinc-950 text-zinc-200 border-y border-white/20">
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
      <section className="section bg-surface text-surface-foreground border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6 mb-5 md:mb-10">
            <div>
              <p className="eyebrow text-brand mb-3">
                Bulk materials &amp; garden center
              </p>
            <h2 className="display-3 leading-[0.95] text-white max-w-[16ch] mt-4 md:mt-6">
              Featured Materials
            </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => scrollByCard(-1)}
                  disabled={!canPrev}
                  className="size-10 inline-flex items-center justify-center ring-1 ring-white/20 text-white hover:bg-white hover:text-zinc-900 transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => scrollByCard(1)}
                  disabled={!canNext}
                  className="size-10 inline-flex items-center justify-center ring-1 ring-white/20 text-white hover:bg-white hover:text-zinc-900 transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 label text-white hover:text-brand transition-colors"
              >
                See full catalog <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="-mx-6 md:mx-0">
            <div
              ref={railRef}
              className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-0 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {featured.map((p) => (
                <div
                  key={p.name}
                  data-rail-item
                  className="snap-start shrink-0 basis-[78%] md:basis-[42%] lg:basis-[30%] flex"
                >
                  <ProductCard product={p} tone="dark" />
                </div>
              ))}
            </div>
            <p className="md:hidden mt-3 px-6 eyebrow text-zinc-500">
              Swipe to browse →
            </p>
          </div>
        </div>
      </section>

      {/* Facebook spotlight */}
      <section className="section bg-kraft border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-7">
              <p className="inline-flex items-center gap-2 eyebrow text-brand mb-3">
                <Facebook className="size-3.5" />
                On Facebook
              </p>
              <h2 className="display-3 leading-[0.95] text-zinc-950 whitespace-nowrap">
                Where the yard <span className="text-brand">lives.</span>
              </h2>
              <p className="lead mt-4 md:mt-6 text-zinc-700 max-w-[52ch]">
                Daily back-and-forth happens on Facebook — fresh loads, restocks, weather closures, and lot photos.
              </p>
            </div>
            <div className="md:col-span-5">
              <ul className="body-sm space-y-2 text-zinc-800">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-brand shrink-0" />
                  Daily inventory and restock photos
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-brand shrink-0" />
                  Weather-related closures and hours changes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-brand shrink-0" />
                  Seasonal promos and WooSox ticket drawings
                </li>
              </ul>
              <div className="mt-5 md:mt-8 flex flex-col items-start gap-3">
                <a
                  href="https://www.facebook.com/BuyTheYardOutdoorProducts"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#1877F2] text-white px-7 h-12 label hover:opacity-90 transition-opacity rounded-sm"
                >
                  <Facebook className="size-4" />
                  Follow on Facebook
                  <ArrowRight className="size-4" />
                </a>
                <span className="text-xs text-zinc-500 break-all">
                  facebook.com/BuyTheYardOutdoorProducts
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews from Facebook */}
      <section className="section bg-base border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
             <div className="md:col-span-7 md:order-2">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
                <div>
                  <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
                    <Facebook className="size-3.5" />
                    From Facebook · real customers, real posts
                  </p>
                  <h2 className="display-3 leading-[0.95] text-zinc-950 max-w-[20ch]">
                    What neighbors say.
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={() => scrollReviewsByCard(-1)}
                    disabled={!reviewsCanPrev}
                    className="size-10 inline-flex items-center justify-center ring-1 ring-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-900"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={() => scrollReviewsByCard(1)}
                    disabled={!reviewsCanNext}
                    className="size-10 inline-flex items-center justify-center ring-1 ring-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-900"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 md:mt-12">
                <div
                  ref={reviewsRailRef}
                  className="flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {reviews.map((r) => (
                    <div
                      key={r.name}
                      data-reviews-item
                      className="snap-start shrink-0 basis-full min-w-0 flex"
                    >
                      <figure className="bg-white border border-zinc-200 p-6 flex flex-col w-full min-h-[200px]">
                        <div className="meta flex items-center gap-2 text-zinc-500 mb-4">
                          <Facebook className="size-3.5 text-[#1877F2]" />
                          <span className="font-semibold text-zinc-900">{r.name}</span>
                          <span>·</span>
                          <span>{r.date}</span>
                        </div>
                        <blockquote className="display-5 leading-snug text-zinc-900 flex-1">
                          &ldquo;{r.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-5 eyebrow text-brand">
                          Recommends Buy The Yard
                        </figcaption>
                      </figure>
                    </div>
                  ))}
                </div>
                <p className="md:hidden mt-3 eyebrow text-zinc-500">
                  Swipe to read more →
                </p>
              </div>
            </div>

            <div className="md:col-span-5 md:order-1 mt-8 md:mt-0 border-t md:border-t-0 md:border-r border-zinc-300/60 pt-8 md:pt-0 md:pr-8">
              <p className="eyebrow text-zinc-500 mb-3">
                Community
              </p>
              <div className="flex flex-col gap-6">
                {communityPosts.map((p) => (
                  <div key={p.org} className="flex flex-col">
                    <p className="body text-zinc-800">
                      &ldquo;{p.quote}&rdquo;
                    </p>
                    <p className="meta mt-3 text-zinc-500">
                      <span className="font-semibold text-zinc-900">{p.org}</span>{" "}
                      · {p.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery callout */}
      <section className="bg-surface text-surface-foreground border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-6 section grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-12 items-center">
          <div>
            <Truck className="size-10 text-brand mb-4 md:mb-6" />
            <h2 className="display-3 leading-[0.95] text-white">
              Delivery Across <span className="text-brand">Central Mass</span>
            </h2>
            <p className="lead mt-4 md:mt-6 text-zinc-300 max-w-[48ch]">
              Curbside delivery across Central Mass. Call before noon for same-day when available.
            </p>
            <Link
              to="/delivery"
              className="mt-5 md:mt-8 inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90"
            >
              Delivery details <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="bg-white/5 ring-1 ring-white/10 p-8 rounded-md">
            <ul className="divide-y divide-white/10">
              {[
                ["Driveway-to-curb only", "Deliveries are made to the driveway or curbline to protect lawns and underground utilities."],
                ["1 yard minimum", "Call before noon for same-day delivery when available, or allow approximately 48 hours."],
                ["Mark your spot", "Please mark your preferred drop location so we can place the material accurately."],
                ["4% card fee", "A processor surcharge passed through at cost. Cash and check payments avoid the fee."],
              ].map(([k, v]) => (
                <li key={k} className="py-4 first:pt-0 last:pb-0">
                  <p className="display-5 text-white">{k}</p>
                  <p className="body-sm text-zinc-300 mt-1">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-kraft border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7 md:order-2 md:pl-4">
            <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
              <Tag className="size-3.5" />
              Today's prices by phone
            </p>
            <h2 className="display-3 leading-[0.95] text-zinc-950 max-w-[18ch]">
              Call for Today's Prices
            </h2>
            <p className="body mt-4 md:mt-6 text-zinc-700 max-w-[52ch] text-pretty">
              Prices shift with the season, so we quote by phone. Cash and check avoid the 4% card fee.
            </p>
            <div className="mt-5 md:mt-8 flex flex-wrap items-center gap-3">
              <a
                href="tel:5085799897"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90 transition-opacity"
              >
                <Phone className="size-4" />
                Tap to call — 508.579.9897
              </a>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 border border-zinc-900 text-zinc-900 px-7 h-12 label hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Hang-tag price tag (decorative) */}
          <div
            aria-hidden="true"
            className="hidden md:flex md:col-span-5 md:order-1 items-center md:justify-end md:pr-4 relative"
          >
            {/* Back tag for depth */}
            <div className="absolute w-[300px] h-[400px] rotate-[7deg] translate-x-6 translate-y-3 bg-[#e2dccb] ring-1 ring-zinc-900/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]" />

            {/* Twine */}
            <svg
              className="absolute -top-2 left-1/2 -translate-x-[120px] -rotate-[4deg]"
              width="80"
              height="90"
              viewBox="0 0 80 90"
              fill="none"
            >
              <path
                d="M 40 0 C 20 25, 60 45, 40 85"
                stroke="#9b8b6a"
                strokeWidth="2"
                strokeDasharray="3 3"
                fill="none"
              />
            </svg>

            {/* Front tag */}
            <div
              className="relative -rotate-[4deg] w-[300px] h-[400px] bg-[#f1ebdc] ring-1 ring-zinc-900/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] px-7 pt-14 pb-7 flex flex-col"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0))",
                backgroundSize: "6px 6px, 100% 100%",
              }}
            >
              {/* Punched hole */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 size-4 rounded-full bg-zinc-900/80 ring-2 ring-[#f1ebdc] shadow-inner" />

              {/* Stamps */}
              <div className="flex items-center justify-between">
                <span className="micro text-zinc-700">Buy The Yard</span>
                <span className="micro text-zinc-500">Est. Agawam</span>
              </div>

              {/* Headline */}
              <div className="mt-4">
                <p className="display-4 text-brand leading-[0.9]">Today's</p>
                <p className="display-4 text-brand leading-[0.9]">Price</p>
              </div>

              <div className="mt-4 border-t border-dashed border-zinc-900/20" />

              {/* Category rows */}
              <ul className="mt-4 space-y-2.5">
                {["Mulch", "Loam", "Stone", "Garden"].map((c) => (
                  <li key={c} className="flex items-baseline gap-2">
                    <span className="meta text-zinc-800">{c}</span>
                    <span className="flex-1 border-b border-dotted border-zinc-900/25 translate-y-[-3px]" />
                    <span className="meta text-zinc-600 italic">call</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-dashed border-zinc-900/20" />

              {/* Phone stamp */}
              <div className="mt-auto relative">
                <span className="absolute inset-0 flex items-center justify-center -rotate-6 micro text-brand/20 tracking-[0.4em]">
                  ★ TODAY ★
                </span>
                <p className="relative display-5 text-zinc-900 text-center">
                  508.579.9897
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-base border-t border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
          <div className="md:col-span-5">
            <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
              <HelpCircle className="size-3.5" />
              Before you call
            </p>
            <h2 className="display-3 leading-[0.95] max-w-[16ch] text-zinc-950">
              Frequently Asked Questions
            </h2>
            <p className="body mt-4 md:mt-6 text-zinc-700 max-w-[42ch] text-pretty">
              Quick answers about pricing, delivery areas, payment, and
              scheduling. For anything not covered here, please give us a call.
            </p>
            <a
              href="tel:5085799897"
              className="mt-5 md:mt-8 hidden md:inline-flex items-center gap-2 label text-zinc-900 hover:text-brand transition-colors"
            >
              <Phone className="size-4" />
              508.579.9897
            </a>
          </div>

          <div className="md:col-span-7">
            <Accordion type="single" collapsible className="bg-white border border-zinc-200 rounded-md px-2 md:px-4">
              <AccordionItem value="pricing" className="border-zinc-200 last:border-0">
                <AccordionTrigger className="display-5 tracking-tight py-5 hover:no-underline">
                  How much does material cost?
                </AccordionTrigger>
                <AccordionContent className="body text-zinc-700 pb-5 pr-6">
                  <p>
                    Prices move with the season and the market, so we quote
                    today's number by phone — and we work to keep them the
                    best in the area. One-yard minimum on all bulk orders.
                  </p>
                  <p className="mt-3">
                    For your project, please{" "}
                    <a href="tel:5085799897" className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-brand">
                      call 508-579-9897
                    </a>{" "}
                    or{" "}
                    <Link to="/quote" className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-brand">
                      request a quote online
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery-area" className="border-zinc-200 last:border-0">
                <AccordionTrigger className="display-5 tracking-tight py-5 hover:no-underline">
                  Do you deliver to my town?
                </AccordionTrigger>
                <AccordionContent className="body text-zinc-700 pb-5 pr-6">
                  <p>
                    We offer curbside delivery throughout Central Massachusetts
                    from our Jefferson yard, including Holden, Princeton,
                    Sterling, Rutland, West Boylston, Paxton, Worcester,
                    Leominster, and surrounding towns.
                  </p>
                  <p className="mt-3">
                    Delivery is priced by ZIP code. A brief call confirms your
                    service area and final price before your order is
                    dispatched. Full details are available on{" "}
                    <Link to="/delivery" className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-brand">
                      the delivery page
                    </Link>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="card-fee" className="border-zinc-200 last:border-0">
                <AccordionTrigger className="display-5 tracking-tight py-5 hover:no-underline">
                  What's the 4% card fee about?
                </AccordionTrigger>
                <AccordionContent className="body text-zinc-700 pb-5 pr-6">
                  <p>
                    The 4% surcharge is passed through directly from our
                    payment processor. Cash and check payments are accepted
                    with no additional fee. Your quoted price stays the same
                    regardless of payment method.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timing" className="border-zinc-200 last:border-0">
                <AccordionTrigger className="display-5 tracking-tight py-5 hover:no-underline">
                  How fast can I get a delivery?
                </AccordionTrigger>
                <AccordionContent className="body text-zinc-700 pb-5 pr-6">
                  <p>
                    Same-day delivery may be available when you call before
                    noon, depending on the day's route. Otherwise, please
                    allow approximately 48 hours.
                  </p>
                  <p className="mt-3">
                    Delivery is made to the driveway or curbline only. Please
                    mark your preferred drop location so we can place the
                    material accurately. To submit a material list,{" "}
                    <Link to="/quote" className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-brand">
                      start a quote
                    </Link>{" "}
                    and we'll respond the same day.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <a
              href="tel:5085799897"
              className="md:hidden mt-5 inline-flex items-center gap-2 label text-zinc-900 hover:text-brand"
            >
              <Phone className="size-4" />
              508.579.9897
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
