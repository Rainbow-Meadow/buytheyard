import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone, Truck, MapPin, Clock } from "lucide-react";
import { YardTicker } from "@/components/site/YardTicker";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { products } from "@/data/products";
import heroDesktop from "@/assets/source/hero-desktop-yard-2026.png";
import heroMobile from "@/assets/source/hero-mobile-piles-mulch-sand-stone-2026.png";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import yardPiles from "@/assets/source/yard-piles.webp";
import loadingTruck from "@/assets/source/loading-truck.webp";
import yardBanner from "@/assets/source/yard-banner-5.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buy The Yard — Mulch, Loam, Sand & Stone in Jefferson, MA" },
      {
        name: "description",
        content:
          "A woman-owned outdoor materials yard in Central Mass. Premium mulch, loam, sand, stone, and same-day delivery from Jefferson, MA.",
      },
    ],
  }),
  component: HomePage,
});

const FEATURED = [
  "Hemlock Mulch",
  "Premium Black Mulch",
  "Screened Loam",
  "3/4\" Crushed Blue Stone",
  "Mason Sand",
] as const;

function HomePage() {
  const featured = FEATURED.map((name) => products.find((p) => p.name === name)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <div className="bg-base text-foreground">
      {/* ============ HERO ============ */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-base">
          <picture>
            <source media="(min-width: 768px)" srcSet={heroDesktop} />
            <img
              src={heroMobile}
              alt="The Buy The Yard yard in Jefferson, MA — piles of mulch, sand, and stone"
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0 hero-veil pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_120%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 grid-noir opacity-40 mix-blend-overlay pointer-events-none" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col">
          <div className="flex-1 max-w-7xl w-full mx-auto px-5 md:px-6 flex flex-col justify-end pb-16 md:pb-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="ember-dot" aria-hidden="true" />
              <span className="mono meta text-brand uppercase tracking-[0.24em]">
                Open today · 8a – 5p
              </span>
            </div>

            <h1 className="display-mega text-white max-w-[14ch]">
              <WordReveal text="Build the yard" />
              <br />
              <span className="text-brand">
                <WordReveal text="you actually want." delay={0.35} />
              </span>
            </h1>

            <p className="lead text-zinc-300 mt-6 max-w-xl">
              Bulk mulch, loam, sand, and stone — picked up the same day or
              dropped at your driveway by people who know your street.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="tel:5085799897"
                className="btn-ember inline-flex items-center gap-3 bg-brand text-brand-foreground px-6 py-3.5 rounded-sm label"
              >
                <Phone className="size-4" strokeWidth={2.5} />
                <span>508.579.9897</span>
                <ArrowUpRight className="size-4 opacity-80" />
              </MagneticButton>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3.5 rounded-sm label hover:bg-white/5 transition-colors"
              >
                Get a quote
                <ArrowUpRight className="size-4 opacity-80" />
              </Link>
            </div>
          </div>

          <YardTicker />
        </div>
      </section>

      {/* ============ PILLARS ============ */}
      <section className="section border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-3 gap-px bg-white/8 overflow-hidden rounded-sm">
          {[
            {
              icon: Truck,
              title: "Same-day delivery",
              copy: "Call before noon and we'll usually have it on your driveway by 5.",
            },
            {
              icon: MapPin,
              title: "Central Mass, all of it",
              copy: "Jefferson, Holden, Worcester, Princeton, Sterling, and 10 towns out from there.",
            },
            {
              icon: Clock,
              title: "10 years, one yard",
              copy: "Woman-owned and WBE certified. The same people answer the phone.",
            },
          ].map(({ icon: Icon, title, copy }, i) => (
            <SectionReveal
              key={title}
              as="article"
              delay={i * 0.08}
              className="bg-base p-8 md:p-10 flex flex-col gap-4"
            >
              <Icon className="size-6 text-brand" strokeWidth={1.75} />
              <h3 className="display-4 text-white">{title}</h3>
              <p className="body-sm text-zinc-400">{copy}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ============ FEATURED BENTO ============ */}
      <section className="section-loose">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <SectionReveal className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
            <div>
              <span className="eyebrow text-brand">What we sell</span>
              <h2 className="display-2 text-white mt-3 max-w-[18ch]">
                The shortlist most yards reorder.
              </h2>
            </div>
            <Link
              to="/products"
              className="label text-zinc-300 hover:text-white inline-flex items-center gap-2 group"
            >
              Full catalog
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
            {featured.map((p, i) => (
              <SectionReveal
                key={p.name}
                delay={i * 0.05}
                className={
                  i === 0
                    ? "col-span-2 md:row-span-2 md:col-span-2"
                    : "col-span-1"
                }
              >
                <Link
                  to="/products"
                  className="group relative block h-full min-h-[200px] md:min-h-[240px] overflow-hidden rounded-sm bg-surface"
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
                  <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end">
                    <span className="mono meta text-brand uppercase tracking-[0.2em]">
                      {p.category}
                    </span>
                    <h3 className={`text-white mt-2 ${i === 0 ? "display-3" : "display-4"}`}>
                      {p.name}
                    </h3>
                    {i === 0 && (
                      <p className="body-sm text-zinc-300 mt-3 max-w-md">{p.description}</p>
                    )}
                  </div>
                  <ArrowUpRight className="absolute top-4 right-4 size-5 text-white/70 group-hover:text-brand transition-colors" />
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STORY STRIP ============ */}
      <section className="section-loose border-y border-white/8 bg-surface/40">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-12 gap-10 items-center">
          <SectionReveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={abbyPortrait}
                alt="Abby, owner of Buy The Yard"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </SectionReveal>
          <SectionReveal className="md:col-span-7" delay={0.1}>
            <span className="eyebrow text-brand">Who runs the yard</span>
            <h2 className="display-2 text-white mt-3 max-w-[16ch]">
              Ten years. One phone number. Still answered by Abby.
            </h2>
            <p className="lead text-zinc-300 mt-6 max-w-xl">
              Buy The Yard started as one truck and a stubborn idea — that
              homeowners deserve the same fast, honest service that contractors
              get. A decade later that's still the whole job.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="label inline-flex items-center gap-2 border border-white/25 text-white px-5 py-3 rounded-sm hover:bg-white/5 transition-colors"
              >
                Our story
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                to="/service-area"
                className="label inline-flex items-center gap-2 text-zinc-300 hover:text-white px-5 py-3 group"
              >
                Towns we cover
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ============ OUTCOMES ============ */}
      <section className="section-loose">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <SectionReveal className="max-w-3xl mb-12">
            <span className="eyebrow text-brand">What it looks like</span>
            <h2 className="display-2 text-white mt-3">
              Material is the start. <span className="text-brand">A finished yard</span> is the point.
            </h2>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-3 md:gap-4">
            {[
              { img: yardPiles, title: "Bulk, by the yard.", copy: "Mulch, loam, sand, and stone — picked over and ready." },
              { img: loadingTruck, title: "Loaded on arrival.", copy: "Pull in, we load you, you're out." },
              { img: yardBanner, title: "Sit-and-stay corner.", copy: "Adirondacks, coffee, and Charlie." },
            ].map((o, i) => (
              <SectionReveal key={o.title} delay={i * 0.08}>
                <figure className="group relative overflow-hidden rounded-sm aspect-[4/5]">
                  <img
                    src={o.img}
                    alt={o.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/20 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="display-4 text-white">{o.title}</h3>
                    <p className="body-sm text-zinc-300 mt-1">{o.copy}</p>
                  </figcaption>
                </figure>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SLAB ============ */}
      <section className="section-loose">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <SectionReveal className="relative overflow-hidden rounded-sm bg-surface border border-white/10 p-10 md:p-16">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-brand/30 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 grid-noir opacity-40 pointer-events-none" />
            <div className="relative max-w-3xl">
              <span className="eyebrow text-brand">Ready when you are</span>
              <h2 className="display-2 text-white mt-4">
                Call the yard. We'll quote it in a minute.
              </h2>
              <p className="lead text-zinc-300 mt-5 max-w-xl">
                Same person every time. No tickets, no portals — just a real
                number, real trucks, and your driveway by 5.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticButton
                  href="tel:5085799897"
                  className="btn-ember inline-flex items-center gap-3 bg-brand text-brand-foreground px-6 py-4 rounded-sm label"
                >
                  <Phone className="size-4" strokeWidth={2.5} />
                  <span>508.579.9897</span>
                </MagneticButton>
                <Link
                  to="/quote"
                  className="label inline-flex items-center gap-2 text-white border border-white/25 px-6 py-4 rounded-sm hover:bg-white/5 transition-colors"
                >
                  Get a written quote
                  <ArrowUpRight className="size-4" />
                </Link>
                <span className="mono meta text-zinc-400 ml-2">
                  2264 Main St · Jefferson, MA
                </span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}