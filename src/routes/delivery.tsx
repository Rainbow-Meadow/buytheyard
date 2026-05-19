import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Phone, Truck, Warehouse } from "lucide-react";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Mulch & Loam Delivery — Holden, Worcester, Princeton, Sterling | Buy The Yard" },
      {
        name: "description",
        content:
          "Curbside bulk delivery from Jefferson, MA to Holden, Worcester, Princeton, Sterling, Rutland, Paxton, West Boylston, Leominster & nearby. 1-yard minimum. Call 508-579-9897.",
      },
      { property: "og:title", content: "Delivery & Pickup — Buy The Yard" },
      {
        property: "og:description",
        content: "Two ways to get your material from the Jefferson, MA yard.",
      },
      { property: "og:url", content: "/delivery" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-delivery.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-delivery.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/delivery" },
    ],
  }),
  component: DeliveryPage,
});

const POLICIES = [
  ["Driveway-to-curbline only", "Deliveries are made to the driveway or curbline only. This protects your lawn and any gas, water, or irrigation lines beneath it."],
  ["1 yard minimum", "Call before noon for same-day delivery when available; otherwise, please allow approximately 48 hours."],
  ["Mark your spot", "Please mark your preferred drop location with a tarp, bucket, cone, or similar marker so we can place the material accurately."],
  ["Be home or be specific", "If you can't be present at delivery, please send a photo and a brief note describing where the material should be placed."],
] as const;

function DeliveryPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-6 section-loose">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
            Delivery &amp; Pickup
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] max-w-[16ch]">
            You call. <span className="text-brand">We deliver.</span>
          </h1>
          <p className="mt-6 text-zinc-400 max-w-[62ch] text-lg">
            Curbside delivery from our Jefferson, MA yard across Central Mass. Call before noon for same-day when available.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            See the full list of towns on our{" "}
            <a href="/service-area" className="underline underline-offset-4 hover:text-brand">
              service area page
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-kraft p-8 md:p-10 rounded-md ring-1 ring-zinc-300">
            <Warehouse className="size-10 text-brand mb-6" />
            <h2 className="font-display text-4xl uppercase mb-4">Pick it up</h2>
            <p className="text-zinc-700 mb-6">
              Bring a truck or trailer during business hours — no appointment
              necessary. We'll load you on arrival.
            </p>
            <div className="space-y-2 text-sm text-zinc-700">
              <p><strong>Address:</strong> 2264 Main St., Jefferson, MA 01522</p>
              <p><strong>Hours (4/1 – 8/1):</strong> Mon–Fri 8a–5p · Sat 8a–3p · Sun closed</p>
              <p className="text-xs text-zinc-500 pt-2">
                Opening for the 2026 season on April 1. After 8/1: by appointment.
                Open year-round — winter salt &amp; ice melt available, call for pickup hours.
              </p>
            </div>
          </div>

          <div className="bg-surface text-surface-foreground p-8 md:p-10 rounded-md">
            <Truck className="size-10 text-brand mb-6" />
            <h2 className="font-display text-4xl uppercase mb-4">Delivery</h2>
            <p className="text-zinc-300 mb-6">
              Curbside delivery throughout Central Massachusetts. Call to
              confirm your delivery zone, scheduling window, and final price
              before your order is dispatched.
            </p>
            <a
              href="tel:5085799897"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-6 h-11 text-sm font-semibold uppercase tracking-widest hover:opacity-90"
            >
              <Phone className="size-4" /> 508.579.9897
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-kraft border-y border-zinc-300">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-10">
            What to Know Before Delivery
          </h2>
          <ul className="divide-y divide-zinc-300">
            {POLICIES.map(([k, v], i) => (
              <li key={k} className="py-6 grid grid-cols-[auto_1fr] gap-6 items-start">
                <span className="font-display text-3xl text-brand w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-2xl uppercase text-zinc-900 leading-tight">
                    {k}
                  </p>
                  <p className="text-zinc-700 mt-2">{v}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-start gap-6 p-8 bg-surface text-surface-foreground rounded-md">
          <CreditCard className="size-10 text-brand shrink-0" />
          <div>
            <h3 className="font-display text-2xl uppercase mb-2">
              Card Processing Fee
            </h3>
            <p className="text-zinc-300">
              The 4% surcharge is passed through directly from our payment
              processor. Cash and check payments are accepted with no
              additional fee.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
