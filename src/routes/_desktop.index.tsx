import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/source/hero-desktop-yard-2026.png";
import stoneImg from "@/assets/source/yard-piles.webp";
import { home, brand } from "../desktop/copy";

export const Route = createFileRoute("/_desktop/")({
  head: () => ({
    meta: [
      { title: "Buy The Yard — Bulk Mulch, Loam, Sand & Stone | Jefferson, MA" },
      { name: "description", content: "Premium bulk landscape supply in Jefferson, MA. Mulch, loam, sand, gravel, and specialty stone. Woman-owned since 1998." },
    ],
  }),
  component: DesktopHome,
});

function DesktopHome() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:h-[600px]">
        <section className="md:col-span-7 d-card p-10 flex flex-col justify-center">
          <p className="d-eyebrow mb-4">{home.eyebrow}</p>
          <h1 className="d-serif text-5xl lg:text-7xl leading-[1.05] mb-6">
            {home.headline.lead}
            <br />
            <span className="italic text-d-gold-light">{home.headline.emphasis}</span>
          </h1>
          <p className="max-w-md text-base text-d-muted leading-relaxed">{home.sub}</p>
        </section>

        <section className="md:col-span-5 md:row-span-2 d-card relative overflow-hidden group">
          <img
            src={heroImg}
            alt="Mulch, sand, and stone piles at the Buy The Yard yard"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-d-bg via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8">
            <h3 className="d-serif text-3xl text-d-gold-light mb-2">{home.feature.title}</h3>
            <p className="text-[10px] uppercase tracking-widest text-d-text/60">{home.feature.meta}</p>
          </div>
        </section>

        <section className="md:col-span-4 bg-d-gold p-8 flex flex-col justify-between">
          <p className="d-serif italic text-2xl text-d-bg leading-tight">"{home.pull}"</p>
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-d-bg/30" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-d-bg">{home.pullMeta}</span>
          </div>
        </section>

        <section className="md:col-span-3 d-card relative overflow-hidden group">
          <img
            src={stoneImg}
            alt="Bulk stone and aggregate piles"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="border border-d-gold-light/30 p-4 w-full h-full flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-d-gold-light text-center">
                {home.accent.title}
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 hidden md:flex justify-between items-center text-[9px] uppercase tracking-[0.5em] text-d-gold/40">
        {home.ticker.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-4">
        <section className="md:col-span-5 d-card p-10">
          <p className="d-eyebrow mb-4">Why The Yard</p>
          <h2 className="d-serif text-4xl mb-4">Material with a name on it.</h2>
          <p className="text-d-muted leading-relaxed">
            Every pile is sourced, screened, and stacked by people who live where you live.
            Call the same number that's been answering for two decades.
          </p>
        </section>
        <section className="md:col-span-4 d-card p-10 flex flex-col justify-between">
          <p className="d-eyebrow">Same-day pickup</p>
          <p className="d-serif text-3xl">Loaded in <span className="italic text-d-gold-light">minutes</span>, not hours.</p>
          <Link to="/products" className="d-btn self-start mt-6">See products</Link>
        </section>
        <section className="md:col-span-3 bg-d-gold p-8 flex flex-col justify-between text-d-bg">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Call</p>
          <a href={`tel:${brand.phoneTel}`} className="d-serif text-3xl">{brand.phone}</a>
          <p className="text-[10px] uppercase tracking-widest font-bold">Mon–Sat · 8a</p>
        </section>
      </div>
    </>
  );
}