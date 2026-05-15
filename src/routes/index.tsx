import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Flower2, Phone, Truck } from "lucide-react";
import heroImg from "@/assets/source/yard-piles.webp";
import yardWide from "@/assets/source/yard-trucks.webp";
import wbeSeal from "@/assets/source/wbe-seal.webp";
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
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
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
      <section className="relative bg-surface text-surface-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-6">
              <span className="size-1.5 rounded-full bg-brand" />
              Jefferson, MA · Woman-Owned · 10th Season · WBE Certified
            </span>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] uppercase text-balance mb-8">
              The Backbone of <span className="text-brand">Central Mass</span> Landscapes.
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-[52ch] mb-6 text-pretty">
              <span className="text-zinc-200 font-semibold">Mulch · Loam · Sand · Stone</span>{" "}
              — and a full plant nursery. Hanging baskets, annuals, compost, ASTM playground
              chips, and winter salt. Loaded by hand, ready for pickup or delivery.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-10">
              Family-run · Serving Central MA since 2019 · Opening 4/1/26
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                View Materials
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:bg-white/20 transition-colors"
              >
                Get a Quote
              </Link>
              <a
                href="tel:5085799897"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                <Phone className="size-4" />
                508.579.9897
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="w-full aspect-[16/9] overflow-hidden rounded-md ring-1 ring-white/5 bg-zinc-900">
              <img
                src={heroImg}
                alt="Buy The Yard supply yard in Jefferson, MA — mulch piles, loader, and the Mulch · Loam · Sand · Stone · Gravel sign with annual flowers in the foreground"
                width={1600}
                height={700}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain"
              />
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
              width={96}
              height={96}
              className="size-20 object-contain bg-white p-1 ring-1 ring-zinc-300"
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
