import { createFileRoute, Link } from "@tanstack/react-router";
import truck from "@/assets/source/loading-truck.webp";
import { deliveryZones, brand } from "../desktop/copy";

export const Route = createFileRoute("/_desktop/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery — Buy The Yard | Central Mass Bulk Material" },
      { name: "description", content: "Bulk mulch, loam, sand, and stone delivered across Central Massachusetts. 15+ towns covered, same-day pickup available." },
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  return (
    <>
      <header className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
        <div className="md:col-span-7 d-card p-10">
          <p className="d-eyebrow mb-4">Delivery</p>
          <h1 className="d-serif text-5xl lg:text-6xl leading-tight mb-6">
            Dropped where you point.
          </h1>
          <p className="text-d-muted max-w-xl leading-relaxed">
            Minimum three yards. Driver places the pile in the driveway or where you mark
            with a flag. Most local zones run $75 – $150 depending on yardage and town.
          </p>
        </div>
        <div className="md:col-span-5 d-card relative overflow-hidden min-h-[280px]">
          <img src={truck} alt="Bulk delivery truck loaded at Buy The Yard" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </header>

      <section className="d-card p-10 mb-8">
        <div className="flex items-baseline justify-between border-b border-d-line pb-4 mb-6">
          <h2 className="d-serif text-3xl text-d-gold-light">Service Area</h2>
          <span className="d-eyebrow">{deliveryZones.length} towns</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-3 gap-x-6 text-sm">
          {deliveryZones.map((z) => (
            <span key={z} className="flex items-center gap-2 text-d-text">
              <span className="size-1 rounded-full bg-d-gold" />
              {z}
            </span>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="d-card p-8">
          <p className="d-eyebrow mb-3">01 — Pickup</p>
          <p className="d-serif text-2xl mb-2">Half-yard minimum.</p>
          <p className="text-sm text-d-muted">Drive in, get loaded, drive out. No appointment.</p>
        </div>
        <div className="d-card p-8">
          <p className="d-eyebrow mb-3">02 — Delivery</p>
          <p className="d-serif text-2xl mb-2">Three-yard minimum.</p>
          <p className="text-sm text-d-muted">Most loads next-day. Call before 11a for same-day local.</p>
        </div>
        <div className="bg-d-gold p-8 text-d-bg">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3">03 — Schedule</p>
          <p className="d-serif text-2xl mb-4">Call the yard.</p>
          <a href={`tel:${brand.phoneTel}`} className="block d-serif text-xl">{brand.phone}</a>
          <Link to="/quote" className="block mt-3 text-[10px] uppercase tracking-widest font-bold">
            Request a written quote →
          </Link>
        </div>
      </div>
    </>
  );
}