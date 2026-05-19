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
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">DELIVERY DESK · § D</span>
            <span className="dateline text-ink-soft hidden sm:inline">SAME-DAY WHEN YOU CALL BEFORE NOON</span>
          </div>
          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[16ch]">
            You call. <span className="text-stamp">We deliver.</span>
          </h1>
          <p className="lead mt-4 max-w-[60ch] text-ink-soft not-italic">
            Curbside delivery from our Jefferson, MA yard across Central Mass.
          </p>
          <p className="meta mt-3 text-ink-soft">
            See the full list of towns on the{" "}
            <a href="/service-area" className="text-ink underline underline-offset-4 hover:text-stamp">
              service area page
            </a>.
          </p>
        </div>
      </section>

      <section className="section bg-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-ink/15">
          <div className="bg-newsprint p-8 md:p-10 border-r border-b border-ink/15">
            <Warehouse className="size-10 text-stamp mb-4" />
            <p className="eyebrow text-ink-soft mb-2">OPTION ONE</p>
            <h2 className="display-3 text-ink mb-4">Pick it up.</h2>
            <p className="body text-ink-soft mb-5">
              Bring a truck or trailer during business hours — no appointment
              necessary. We'll load you on arrival.
            </p>
            <div className="space-y-2 body-sm text-ink-soft">
              <p><strong className="text-ink">Address:</strong> 2264 Main St., Jefferson, MA 01522</p>
              <p><strong className="text-ink">Hours (4/1–8/1):</strong> Mon–Fri 8a–5p · Sat 8a–3p · Sun closed</p>
              <p className="meta text-ink-soft pt-2">
                Opening for the 2026 season on April 1. After 8/1: by appointment.
                Winter salt &amp; ice melt available year-round, call for pickup hours.
              </p>
            </div>
          </div>

          <div className="bg-ink text-newsprint p-8 md:p-10 border-r border-b border-ink/15">
            <Truck className="size-10 text-stamp mb-4" />
            <p className="eyebrow text-newsprint/60 mb-2">OPTION TWO</p>
            <h2 className="display-3 mb-4">We bring it.</h2>
            <p className="body text-newsprint/80 mb-5">
              Curbside delivery throughout Central Massachusetts. Call to
              confirm your delivery zone, scheduling window, and final price
              before your order is dispatched.
            </p>
            <a
              href="tel:5085799897"
              className="inline-flex items-center gap-2 bg-stamp text-newsprint label px-6 h-11 btn-press hover:bg-newsprint hover:text-ink"
            >
              <Phone className="size-4" strokeWidth={2.5} /> 508.579.9897
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-newsprint-2 border-y border-rule-strong">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thick">
            <h2 className="display-3 text-ink leading-none">Before Delivery</h2>
            <span className="dateline text-ink-soft hidden sm:inline">FOUR THINGS TO KNOW</span>
          </div>
          <ul className="mt-6 divide-y divide-rule-strong border-b border-rule-strong">
            {POLICIES.map(([k, v], i) => (
              <li key={k} className="py-6 grid grid-cols-[auto_1fr] gap-4 md:gap-8 items-start">
                <span className="display-3 text-stamp w-14 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="display-4 text-ink leading-tight">{k}</p>
                  <p className="body mt-2 text-ink-soft">{v}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-newsprint">
        <div className="max-w-3xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-start gap-5 md:gap-8 p-8 bg-ink text-newsprint border-2 border-ink">
          <CreditCard className="size-10 text-stamp shrink-0" />
          <div>
            <p className="eyebrow text-newsprint/60 mb-2">NOTICE</p>
            <h3 className="display-4 mb-2">Card Processing Fee</h3>
            <p className="body text-newsprint/80">
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
