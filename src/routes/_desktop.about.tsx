import { createFileRoute } from "@tanstack/react-router";
import abby from "@/assets/source/abby-portrait.webp";

export const Route = createFileRoute("/_desktop/about")({
  head: () => ({
    meta: [
      { title: "About — Buy The Yard | Woman-Owned Landscape Supply" },
      { name: "description", content: "Buy The Yard is a woman-owned bulk landscape supply yard in Jefferson, MA. Meet Abby and the team behind two decades of mulch, loam, and stone." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <section className="md:col-span-5 d-card relative overflow-hidden min-h-[480px]">
        <img src={abby} alt="Abby, owner of Buy The Yard" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-d-bg to-transparent p-8">
          <p className="d-eyebrow">The Owner</p>
          <p className="d-serif text-2xl">Abby</p>
        </div>
      </section>
      <section className="md:col-span-7 d-card p-10">
        <p className="d-eyebrow mb-4">Since 1998</p>
        <h1 className="d-serif text-5xl lg:text-6xl leading-tight mb-6">
          A yard that picks up the phone.
        </h1>
        <div className="space-y-5 text-d-muted leading-relaxed max-w-2xl">
          <p>
            Buy The Yard started as a woman-owned outfit in Jefferson, MA, with a simple idea —
            sell good material at fair weight and answer the phone yourself.
          </p>
          <p>
            Two decades later, that's still the deal. We screen our own loam, blend our own
            mulch, and load every truck on site. No call centers. No tickets. Just material.
          </p>
          <p>
            We're certified by the Massachusetts Women's Business Enterprise and supply contractors,
            municipalities, schools, and the neighbor down the road.
          </p>
        </div>
      </section>

      <section className="md:col-span-4 bg-d-gold p-8 text-d-bg flex flex-col justify-between min-h-[200px]">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Certifications</p>
        <p className="d-serif text-3xl leading-tight">WBE Certified · ASTM Playground</p>
      </section>
      <section className="md:col-span-4 d-card p-8 flex flex-col justify-between">
        <p className="d-eyebrow">Two decades</p>
        <p className="d-serif text-5xl text-d-gold-light">26<span className="text-d-muted text-3xl">yrs</span></p>
        <p className="text-sm text-d-muted">of bulk supply in Central Mass.</p>
      </section>
      <section className="md:col-span-4 d-card p-8 flex flex-col justify-between">
        <p className="d-eyebrow">Yards moved</p>
        <p className="d-serif text-5xl text-d-gold-light">200k+</p>
        <p className="text-sm text-d-muted">mulch, loam, stone, sand combined.</p>
      </section>
    </div>
  );
}