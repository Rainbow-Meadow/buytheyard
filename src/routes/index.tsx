import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Facebook, Flower2, HelpCircle, Phone, Tag, Truck } from "lucide-react";
import yardWide from "@/assets/source/yard-trucks.webp";
import heroMobile from "@/assets/source/hero-mobile-firepit.png";
import heroDesktop from "@/assets/source/hero-desktop-yard.png";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import btyTruck from "@/assets/bty-truck.png";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import promoMothersDay from "@/assets/promo-mothers-day-baskets.jpg";
import promoWooSox from "@/assets/promo-woosox-raffle.jpg";
import facebookPagePreview from "@/assets/facebook-page-preview.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">
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
                text: "Pricing is posted by category. Mulch runs $48–$50/yd, loam and compost $45–$55/yd, sand and gravel $55/yd, and specialty stone $135–$185/yd. One-yard minimum, with the same pricing for contractors and homeowners. For an exact quote, call 508-579-9897.",
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
                text: "The 4% surcharge is passed through directly from our payment processor. Cash and check payments are accepted with no additional fee. Posted pricing remains the same regardless of payment method.",
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
  const [pricingOpen, setPricingOpen] = useState(false);

  const featured = [
    "Premium Black Mulch",
    "Hemlock Mulch",
    "Screened Loam",
    "3/4\" Crushed Blue Stone",
    "Hanging Baskets",
    "ASTM Playground Chips",
  ]
    .map((n) => products.find((p) => p.name === n))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  const priceGroups: { heading: string; range: string; unit: string; includes: string }[] = [
    {
      heading: "Mulch",
      range: "$48–$50",
      unit: "per yard",
      includes: "Premium Black for the wow factor. Hemlock for the classics. Dark Brown for everything in between.",
    },
    {
      heading: "Loam, Compost & Plant Mix",
      range: "$45–$55",
      unit: "per yard",
      includes: "Screened loam for new lawns. Plant mix and compost for beds that need a reset.",
    },
    {
      heading: "Sand & Gravel",
      range: "$55",
      unit: "per yard",
      includes: "Mason sand, 3/4\" crushed blue for drives and drainage, 3/8\" pea for paths.",
    },
    {
      heading: "Specialty Stone",
      range: "$135–$185",
      unit: "per yard",
      includes: "Tumbled river stone and bold red lava — the bed dressings that get noticed.",
    },
    {
      heading: "Playground Chips",
      range: "$60",
      unit: "per yard · ASTM certified",
      includes: "ASTM F1292, F2075, and F1951 — the spec your inspector is actually looking for.",
    },
    {
      heading: "Garden Center",
      range: "From $18",
      unit: "per item",
      includes: "Annuals and perennials from $18. Hanging baskets $40 each, or 2 for $70.",
    },
  ];

  const updates = [
    {
      title: "Mother's Day baskets are on the wagon.",
      body: "Hanging baskets are available now at $40 each, or 2 for $70. Quantities are limited — call 508-579-9897 to reserve one in advance.",
      tag: "Mother's Day",
      image: promoMothersDay,
      imageAlt:
        "Mother's Day hanging baskets at Buy The Yard — $40 each or 2 for $70.",
    },
    {
      title: "5 yards of mulch = a shot at WooSox tickets.",
      body: "May orders of 5 yards or more are automatically entered into our weekly WooSox ticket drawing. Four winners are selected each Friday. Pickup and delivery orders both qualify.",
      tag: "Promo · May",
      image: promoWooSox,
      imageAlt:
        "Buy 5 yards or more of mulch in May and get entered to win WooSox tickets — drawings every Friday.",
    },
    {
      title: "Call before noon. We try to deliver today.",
      body: "Same-day delivery may be available when you call before noon, depending on the day's route. Otherwise, please allow approximately 48 hours.",
      tag: "How it works",
    },
  ] as Array<{
    title: string;
    body: string;
    tag: string;
    image?: string;
    imageAlt?: string;
  }>;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-300/60 min-h-[640px] md:min-h-[720px] flex">
        {/* Mobile single hero image */}
        <img
          src={heroMobile}
          alt="Adirondack chairs around a fire pit at the Buy The Yard yard with mulch piles, flowers, and American flag in the background"
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

        <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:ml-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] px-6 py-16 md:py-24 self-center w-full">
          <div>
            <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-200 mb-5 pb-2 border-b border-white/30">
              <img
                src={abbyPortrait}
                alt="Abby, owner of Buy The Yard, standing in front of the yard in Jefferson, MA"
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="size-7 rounded-full object-cover ring-1 ring-white/40"
              />
              Hi, I'm Abby — owner, Buy The Yard · Jefferson, MA
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] text-balance mb-7 text-white">
              A small yard,{" "}
              <span className="text-brand">built by hand</span>, run by{" "}
              <span className="relative inline-block text-brand">
                Abby
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
              </span>{" "}
              since 2016.
            </h1>
            <p className="text-zinc-200 text-lg md:text-xl max-w-[54ch] mb-8 text-pretty leading-relaxed">
              Call before noon and we'll try to put it in your driveway today.
              <br />
              Posted prices — same number for the contractor and the homeowner.
              <br />
              Not sure how much you need? That's why you call. We'll work it out together.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-9 text-zinc-200">
              <span className="inline-flex items-center gap-2.5">
                <img
                  src={wbeSeal}
                  alt=""
                  width={88}
                  height={56}
                  className="h-12 w-auto object-contain bg-white/90 rounded-sm p-1"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-xs uppercase tracking-[0.18em] font-semibold">
                  Mass. WBE Certified
                </span>
              </span>
              <span className="hidden sm:inline-block h-6 w-px bg-white/30" />
              <span className="text-xs uppercase tracking-[0.18em] font-semibold">
                10th season · Est. 2016
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Shop materials
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 border border-white text-white px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-colors"
              >
                Get a quote
              </Link>
              <a
                href="tel:5085799897"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white hover:text-brand transition-colors h-12 px-1"
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
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {[
            { k: "10", v: "Years in business" },
            { k: "WBE", v: "Massachusetts WBE certified" },
            { k: "820+", v: "Facebook followers" },
            { k: "1 yard", v: "Minimum order size" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-3xl text-brand uppercase leading-none">{s.k}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product preview */}
      <section className="py-20 md:py-28 bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:mb-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-3">
                Bulk materials &amp; garden center
              </p>
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] text-zinc-950 max-w-[16ch]">
              Featured Materials
            </h2>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors"
            >
              See full catalog <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 md:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
            <Link
              to="/products"
              className="md:hidden mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand"
            >
              See full catalog <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Facebook spotlight */}
      <section className="py-20 md:py-28 bg-surface text-surface-foreground border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Facebook page card — real screenshot wrapped in a faux browser chrome */}
          <a
            href="https://www.facebook.com/BuyTheYardOutdoorProducts"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Buy The Yard on Facebook"
            className="group block bg-white text-zinc-900 rounded-lg ring-1 ring-zinc-300/70 shadow-2xl overflow-hidden order-2 lg:order-1 transition-transform hover:-translate-y-1"
          >
            <div className="bg-[#1877F2] text-white px-4 h-11 flex items-center gap-2">
              <span className="inline-flex items-center justify-center size-7 rounded-full bg-white text-[#1877F2] font-bold text-base leading-none">
                f
              </span>
              <span className="text-sm font-semibold">facebook</span>
              <span className="ml-auto text-xs opacity-80 hidden sm:inline">
                facebook.com/BuyTheYardOutdoorProducts
              </span>
            </div>
            <img
              src={facebookPagePreview}
              alt="Buy The Yard Outdoor Products on Facebook — 822 followers, 268 posts, Garden Center, +1 508-579-9897"
              loading="lazy"
              decoding="async"
              className="block w-full h-auto"
            />
          </a>

          {/* Copy + CTA */}
          <div className="order-1 lg:order-2">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand mb-4">
              <Facebook className="size-3.5" />
              On Facebook
            </p>
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] text-white max-w-[16ch]">
              Where the yard <span className="text-brand">lives day-to-day.</span>
            </h2>
            <p className="mt-6 text-zinc-300 text-lg leading-relaxed max-w-[52ch]">
              Most of our daily back-and-forth happens on Facebook — fresh
              loads, new arrivals at the garden center, weather closures, and
              quick photos of what's on the lot. Over 800 Central Mass
              neighbors already follow along.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-300">
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
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://www.facebook.com/BuyTheYardOutdoorProducts"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1877F2] text-white px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-sm"
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
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:mb-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-3 inline-flex items-center gap-2">
                <Tag className="size-3.5" />
                2026 price list
              </p>
              <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] text-zinc-950 max-w-[18ch]">
                Straightforward Pricing
              </h2>
              <p className="mt-5 text-zinc-700 max-w-[52ch] text-pretty">
                Transparent, per-yard pricing for both contractors and
                homeowners. One-yard minimum on all bulk orders, available for
                pickup or delivery. Cash and check payments avoid the 4% credit
                card processing fee.
              </p>
            </div>
            <a
              href="tel:5085799897"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors"
            >
              <Phone className="size-4" />
              Call for a quote
            </a>
          </div>

          <MobileCollapse
            id="pricing-grid"
            open={pricingOpen}
            onToggle={() => setPricingOpen((v) => !v)}
            label="full price list"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {priceGroups.map((group) => (
                <div
                  key={group.heading}
                  className="bg-white p-7 rounded-md ring-1 ring-zinc-300/70 flex flex-col"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-3">
                    {group.heading}
                  </p>
                  <p className="font-display text-5xl uppercase text-zinc-950 leading-none mb-2">
                    {group.range}
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                    {group.unit}
                  </p>
                  <p className="text-sm text-zinc-700 mt-auto pt-4 border-t border-zinc-200">
                    {group.includes}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-zinc-600">
              Per cubic yard unless noted. Delivery is quoted by ZIP — call Abby at{" "}
              <a href="tel:5085799897" className="font-semibold text-zinc-900 hover:text-brand">
                508.579.9897
              </a>{" "}
              and you'll have a same-day number. MA 6.25% sales tax applies where required.
            </p>

            <a
              href="tel:5085799897"
              className="md:hidden mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand"
            >
              <Phone className="size-4" />
              Call for a quote
            </a>
          </MobileCollapse>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-kraft border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-3 inline-flex items-center gap-2">
              <HelpCircle className="size-3.5" />
              Before you call
            </p>
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] text-zinc-950 max-w-[16ch]">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 text-zinc-700 max-w-[42ch] text-pretty">
              Quick answers about pricing, delivery areas, payment, and
              scheduling. For anything not covered here, please give us a call.
            </p>
            <a
              href="tel:5085799897"
              className="mt-6 hidden md:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors"
            >
              <Phone className="size-4" />
              508.579.9897
            </a>
          </div>

          <div className="md:col-span-7">
            <Accordion type="single" collapsible className="bg-white rounded-md ring-1 ring-zinc-300/70 px-2 md:px-4">
              <AccordionItem value="pricing" className="border-zinc-200 last:border-0">
                <AccordionTrigger className="font-display text-lg md:text-xl uppercase tracking-tight text-zinc-950 py-5 hover:no-underline">
                  How much does material cost?
                </AccordionTrigger>
                <AccordionContent className="text-base text-zinc-700 leading-relaxed pb-5 pr-6">
                  <p>
                    Pricing is posted by category in the section above. Mulch
                    runs $48–$50/yd, loam and compost $45–$55/yd, sand and
                    gravel $55/yd, and specialty stone $135–$185/yd. One-yard
                    minimum, with the same pricing for contractors and
                    homeowners.
                  </p>
                  <p className="mt-3">
                    For an exact quote on your project, please{" "}
                    <a href="tel:5085799897" className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-brand">
                      call 508-579-9897
                    </a>
                    .
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery-area" className="border-zinc-200 last:border-0">
                <AccordionTrigger className="font-display text-lg md:text-xl uppercase tracking-tight text-zinc-950 py-5 hover:no-underline">
                  Do you deliver to my town?
                </AccordionTrigger>
                <AccordionContent className="text-base text-zinc-700 leading-relaxed pb-5 pr-6">
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
                <AccordionTrigger className="font-display text-lg md:text-xl uppercase tracking-tight text-zinc-950 py-5 hover:no-underline">
                  What's the 4% card fee about?
                </AccordionTrigger>
                <AccordionContent className="text-base text-zinc-700 leading-relaxed pb-5 pr-6">
                  <p>
                    The 4% surcharge is passed through directly from our
                    payment processor. Cash and check payments are accepted
                    with no additional fee. Posted pricing remains the same
                    regardless of payment method.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timing" className="border-zinc-200 last:border-0">
                <AccordionTrigger className="font-display text-lg md:text-xl uppercase tracking-tight text-zinc-950 py-5 hover:no-underline">
                  How fast can I get a delivery?
                </AccordionTrigger>
                <AccordionContent className="text-base text-zinc-700 leading-relaxed pb-5 pr-6">
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
              className="md:hidden mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand"
            >
              <Phone className="size-4" />
              508.579.9897
            </a>
          </div>
        </div>
      </section>

      {/* Delivery callout */}
      <section className="relative bg-surface text-surface-foreground overflow-hidden">
        <img
          src={yardWide}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Truck className="size-10 text-brand mb-6" />
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] mb-6">
              Delivery Across <span className="text-brand">Central Mass</span>
            </h2>
            <p className="text-zinc-300 text-lg max-w-[48ch] mb-8">
              Curbside delivery to Holden, Worcester, Princeton, Sterling,
              Rutland, Paxton, West Boylston, Leominster, and the rest of
              Central Mass. One-yard minimum. Call before noon for same-day
              delivery when available; otherwise, please allow approximately
              48 hours.
            </p>
            <Link
              to="/delivery"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90"
            >
              Delivery details <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm rounded-md">
            <img
              src={btyTruck}
              alt="Buy The Yard delivery truck"
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-h-48 object-contain mb-4 pb-4 border-b border-white/10"
            />
            <ul className="divide-y divide-white/10">
              {[
                ["Driveway-to-curb only", "Deliveries are made to the driveway or curbline to protect lawns and underground utilities."],
                ["1 yard minimum", "Call before noon for same-day delivery when available, or allow approximately 48 hours."],
                ["Mark your spot", "Please mark your preferred drop location so we can place the material accurately."],
                ["4% card fee", "A processor surcharge passed through at cost. Cash and check payments avoid the fee."],
              ].map(([k, v]) => (
                <li key={k} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-display text-xl uppercase">{k}</p>
                  <p className="text-sm text-zinc-400 mt-1">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WBE strip */}
      <section className="bg-kraft border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center gap-5">
            <img
              src={wbeSeal}
              alt="Massachusetts WBE certified seal"
              width={160}
              height={100}
              className="h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="font-display text-2xl uppercase">Certified Woman-Owned</p>
              <p className="text-sm text-zinc-600">Certified by the Commonwealth of Massachusetts since 2018. Owner-operated.</p>
            </div>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand"
          >
            Meet Abby <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
