import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Flower2, Phone, Truck } from "lucide-react";
import yardWide from "@/assets/source/yard-trucks.webp";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import gardenPetunias from "@/assets/garden-petunias.webp";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buy The Yard — Mulch, Loam, Sand & Stone | Jefferson, MA" },
      {
        name: "description",
        content:
          "Woman-owned bulk landscape yard and plant nursery in Jefferson, MA. Mulch, loam, sand, stone, hanging baskets, annuals, and ASTM playground chips. Now in our 10th season. Call 508-579-9897.",
      },
      { property: "og:title", content: "Buy The Yard — Premium Outdoor Materials" },
      {
        property: "og:description",
        content: "Bulk mulch, loam, sand, stone, and a full plant nursery. Pickup or delivery in Central Mass.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "preload", as: "image", href: abbyPortrait, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
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

  const updates = [
    {
      title: "Yard fully stocked",
      body: "Hanging baskets $25 while supplies last. Dahlias $18, hydrangeas $22. Mulch, loam, plant mix, compost, and stone ready for pickup or delivery.",
      tag: "This week",
    },
    {
      title: "Win 4 WooSox tickets",
      body: "Every Friday in May we draw a winner. Buy 5+ yards of mulch and you're entered automatically — pickup or delivery counts.",
      tag: "Promo · May",
    },
    {
      title: "Now hiring seasonal drivers",
      body: "Yard help and delivery drivers wanted for the spring/summer push. Must be 18+. Call Abby directly at 508-579-9897.",
      tag: "Hiring",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-kraft text-zinc-900 overflow-hidden border-b border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Mobile-first: portrait first so Abby's face leads */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-md ring-1 ring-zinc-300 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_20px_40px_-24px_rgba(0,0,0,0.25)]">
                <img
                  src={abbyPortrait}
                  alt="Abby, owner of Buy The Yard, at her yard in Jefferson, MA"
                  width={1232}
                  height={1540}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-[58%] aspect-[16/11] overflow-hidden rounded-md ring-1 ring-zinc-300 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]">
                <img
                  src={gardenPetunias}
                  alt="Hanging basket of petunias from the Buy The Yard flower wagon"
                  width={900}
                  height={620}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-700 mb-5 pb-2 border-b border-zinc-400/50">
              Hi, I'm Abby — owner, Buy The Yard · Jefferson, MA
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] text-balance mb-7">
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
              since 2017.
            </h1>
            <p className="text-zinc-700 text-lg md:text-xl max-w-[54ch] mb-8 text-pretty leading-relaxed">
              Mulch, loam, sand, stone, and a flower wagon full of hanging baskets.
              Loaded by hand. Pickup or delivery anywhere in Central Mass.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-9 text-zinc-700">
              <span className="inline-flex items-center gap-2.5">
                <img
                  src={wbeSeal}
                  alt=""
                  width={88}
                  height={56}
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-xs uppercase tracking-[0.18em] font-semibold">
                  Mass. WBE Certified
                </span>
              </span>
              <span className="hidden sm:inline-block h-6 w-px bg-zinc-400/50" />
              <span className="text-xs uppercase tracking-[0.18em] font-semibold">
                10th season · 2026
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
                className="inline-flex items-center gap-2 border border-zinc-900 text-zinc-900 px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Get a quote
              </Link>
              <a
                href="tel:5085799897"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors h-12 px-1"
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
            { k: "10th", v: "Season in business" },
            { k: "WBE", v: "Certified Woman-Owned" },
            { k: "820+", v: "Followers on Facebook" },
            { k: "1 yard", v: "Minimum delivery" },
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-3">
                Bulk materials &amp; garden center
              </p>
              <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] text-zinc-950 max-w-[16ch]">
                Real material, by the yard.
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors"
            >
              See full catalog <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the yard */}
      <section className="py-20 md:py-24 bg-kraft border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-3 inline-flex items-center gap-2">
                <Flower2 className="size-3.5" />
                Latest from the yard
              </p>
              <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.95] text-zinc-900 max-w-[20ch]">
                What's happening this week.
              </h2>
            </div>
            <a
              href="https://www.facebook.com/BuyTheYardOutdoorProducts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-brand transition-colors"
            >
              <Facebook className="size-4" />
              Follow on Facebook
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {updates.map((u) => (
              <article
                key={u.title}
                className="bg-white p-7 rounded-md ring-1 ring-zinc-300/70 flex flex-col"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand mb-3">
                  {u.tag}
                </span>
                <h3 className="font-display text-2xl uppercase text-zinc-900 leading-tight mb-3">
                  {u.title}
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed flex-1">{u.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs text-zinc-600 text-center md:text-left">
            820+ followers · daily yard updates, weather closures, and seasonal stock posted on Facebook.
          </p>
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
              Need it delivered? <span className="text-brand">We'll bring it.</span>
            </h2>
            <p className="text-zinc-300 text-lg max-w-[48ch] mb-8">
              Driveway-to-curbside delivery throughout Central Massachusetts. One-yard
              minimum, 48-hour notice gets you on the schedule.
            </p>
            <Link
              to="/delivery"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90"
            >
              Delivery details <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm rounded-md">
            <ul className="divide-y divide-white/10">
              {[
                ["Driveway-to-curb only", "We don't drive on lawns — protects turf & utilities."],
                ["1 yard minimum", "Allow 48 hours for scheduling."],
                ["Mark your spot", "Leave a tarp, cone, or note where to dump."],
                ["4% card fee", "Avoidable with cash or check."],
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
              <p className="text-sm text-zinc-600">A Massachusetts WBE since year three.</p>
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
