import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Phone, Truck } from "lucide-react";
import heroImg from "@/assets/source/hero-yard-source.jpg";
import yardWide from "@/assets/source/yard-trucks.jpg";
import wbeSeal from "@/assets/source/wbe-seal.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buy The Yard — Mulch, Loam, Sand & Stone | Jefferson, MA" },
      {
        name: "description",
        content:
          "Woman-owned bulk landscape supply yard in Jefferson, MA. Premium mulch, loam, sand, gravel, and specialty stone for pickup or delivery. Call 508-579-9897.",
      },
      { property: "og:title", content: "Buy The Yard — Premium Outdoor Materials" },
      {
        property: "og:description",
        content: "Bulk mulch, loam, sand, and stone. Pickup or delivery in Central Mass.",
      },
      { property: "og:url", content: "/" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-surface text-surface-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-6">
              <span className="size-1.5 rounded-full bg-brand" />
              Jefferson, MA · Woman-Owned · WBE Certified
            </span>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] uppercase text-balance mb-8">
              The Backbone of <span className="text-brand">Central Mass</span> Landscapes.
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-[48ch] mb-10 text-pretty">
              Bulk mulch, loam, sand, gravel, and specialty stone — sourced locally,
              loaded by hand, ready for pickup or delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                View Materials
                <ArrowRight className="size-4" />
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
            <div className="w-full aspect-[4/5] overflow-hidden rounded-md ring-1 ring-white/5">
              <img
                src={heroImg}
                alt="Dump truck unloading dark hemlock mulch at the Buy The Yard supply yard"
                width={1080}
                height={1350}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-zinc-950 text-zinc-200 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {[
            { k: "9+ years", v: "Serving Central MA" },
            { k: "WBE", v: "Certified Woman-Owned" },
            { k: "Pickup", v: "& curbside delivery" },
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
                Bulk materials
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

      {/* Delivery callout */}
      <section className="relative bg-surface text-surface-foreground overflow-hidden">
        <img
          src={yardWide}
          alt=""
          loading="lazy"
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
