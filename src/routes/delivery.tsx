import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Phone, Truck, Warehouse } from "lucide-react";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Pickup — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Pick up bulk material with your own truck, or schedule curbside delivery throughout Central MA. 1-yard minimum, 48-hour notice. Call 508-579-9897.",
      },
      { property: "og:title", content: "Delivery & Pickup — Buy The Yard" },
      {
        property: "og:description",
        content: "How pickup and delivery work at the Jefferson, MA yard.",
      },
      { property: "og:url", content: "/delivery" },
    ],
  }),
  component: DeliveryPage,
});

const POLICIES = [
  ["Driveway-to-curbline only", "We don't put a loaded truck on a lawn — that's how property and underground utilities get damaged."],
  ["1 yard minimum", "Allow 48 hours for delivery scheduling."],
  ["Mark your spot", "Leave a tarp, bucket, cone, or note showing exactly where you want material dumped."],
  ["Be home or be specific", "If you can't be there, written/photo instructions help us get it right the first time."],
] as const;

function DeliveryPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
            Delivery &amp; Pickup
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] max-w-[16ch]">
            Two ways to get your <span className="text-brand">material.</span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-base">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-kraft p-8 md:p-10 rounded-md ring-1 ring-zinc-300">
            <Warehouse className="size-10 text-brand mb-6" />
            <h2 className="font-display text-4xl uppercase mb-4">Pick it up</h2>
            <p className="text-zinc-700 mb-6">
              Have your own truck or trailer? Stop by the yard during regular business hours
              and we'll load you up. No appointment needed.
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
            <h2 className="font-display text-4xl uppercase mb-4">We deliver</h2>
            <p className="text-zinc-300 mb-6">
              Curbside delivery throughout Central Massachusetts. Call to confirm your area
              and book a time.
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

      <section className="py-16 md:py-20 bg-kraft border-y border-zinc-300">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-10">
            Delivery policy
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

      <section className="py-16 bg-base">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-start gap-6 p-8 bg-surface text-surface-foreground rounded-md">
          <CreditCard className="size-10 text-brand shrink-0" />
          <div>
            <h3 className="font-display text-2xl uppercase mb-2">
              Heads up: card convenience fee
            </h3>
            <p className="text-zinc-300">
              To keep material costs down for our customers, there's a 4% convenience fee on
              all card transactions. You can avoid it with cash or check.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
