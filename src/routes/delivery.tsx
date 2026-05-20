import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Phone, Truck, Warehouse } from "lucide-react";
import loadingTruck from "@/assets/source/loading-truck.webp";
import yardPiles from "@/assets/source/yard-piles.webp";
import yardTrucks from "@/assets/source/yard-trucks.webp";
import { TileGrid, type TileBlock } from "@/components/site/Tile";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Pickup — Central MA | Buy The Yard" },
      {
        name: "description",
        content:
          "Curbside bulk delivery from Jefferson, MA to Holden, Worcester, Princeton, Sterling & nearby. 1-yard minimum. Call 508-579-9897.",
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
  ["Driveway-to-curbline only", "We drop on the driveway or at the curbline. Keeps your lawn safe, and any gas, water, or irrigation lines beneath it."],
  ["1 yard minimum", "Call before noon and we'll try for same-day. Otherwise plan on about 48 hours."],
  ["Mark your spot", "Mark the drop spot with a tarp, bucket, or cone. We'll put the pile right there."],
  ["Be home or be specific", "If you won't be home, send a photo and a quick note on where to dump it."],
] as const;

const POLICY_BLOCKS: TileBlock[] = POLICIES.map(([k, v], i) => ({
  id: `policy-${i}`,
  variant: "numbered",
  number: String(i + 1).padStart(2, "0"),
  title: k,
  body: v,
  size: "md",
  tone: "white",
}));

const PAYMENT_BLOCKS: TileBlock[] = [
  {
    id: "payment",
    variant: "text",
    icon: <CreditCard />,
    eyebrow: "Payment",
    title: "Card Processing Fee",
    body: "The 4% surcharge is a pass-through from our card processor. Cash and check skip the fee.",
    size: "third",
    tone: "surface",
  },
  {
    id: "same-day",
    variant: "text",
    eyebrow: "Same day",
    title: "Call before noon",
    body: "Call before noon and we'll try for same-day, depending on the route. Otherwise plan on about 48 hours.",
    size: "third",
    tone: "kraft",
  },
  {
    id: "quote-cta",
    variant: "cta",
    eyebrow: "Need a quote?",
    title: "Tap to call",
    cta: { label: "508.579.9897", href: "tel:5085799897" },
    size: "third",
    tone: "kraft",
  },
];

const STATS = [
  ["~25 mi", "Service radius"],
  ["1 yd", "Order minimum"],
  ["~48 hr", "Typical lead time"],
  ["Curbside", "Drop standard"],
] as const;

function DeliveryPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-surface text-surface-foreground">
        {/* Mobile: stacked gallery hero */}
        <div className="md:hidden">
          <div className="aspect-square overflow-hidden">
            <img
              src={loadingTruck}
              alt="Loader filling a delivery truck at the Buy The Yard lot"
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="px-5 py-8">
            <p className="eyebrow text-brand mb-4">Delivery &amp; Pickup</p>
            <h1 className="display-2 leading-[0.9]">
              You call. <span className="text-brand">We deliver.</span>
            </h1>
            <p className="mt-4 text-zinc-300 text-base">
              Curbside delivery from our Jefferson yard across Central Mass. Call before noon and we'll try for same-day.
            </p>
            <p className="mt-3 text-sm text-zinc-400">
              Full town list is on our{" "}
              <a href="/service-area" className="underline underline-offset-4 hover:text-brand">service area page</a>.
            </p>
          </div>
        </div>

        {/* Desktop: asymmetric split hero */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 section-loose grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <p className="eyebrow text-brand mb-4">Delivery &amp; Pickup</p>
              <h1 className="display-1 leading-[0.9] max-w-[16ch]">
                You call. <span className="text-brand">We deliver.</span>
              </h1>
              <p className="mt-6 text-zinc-400 max-w-[52ch] text-lg">
                Curbside delivery from our Jefferson yard across Central Mass. Call before noon and we'll try for same-day.
              </p>
              <p className="mt-4 text-sm text-zinc-500">
                Full town list is on our{" "}
                <a href="/service-area" className="underline underline-offset-4 hover:text-brand">service area page</a>.
              </p>
            </div>
            <div className="col-span-5">
              <div className="aspect-[4/5] overflow-hidden rounded-md ring-1 ring-white/10">
                <img
                  src={loadingTruck}
                  alt="Loader filling a delivery truck at the Buy The Yard lot"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="bg-kraft border-y border-zinc-300">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-8 md:py-10">
          <ul className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-zinc-300 gap-y-6">
            {STATS.map(([v, k]) => (
              <li key={k} className="md:px-8 first:md:pl-0 last:md:pr-0">
                <p className="display-3 text-zinc-900 leading-none">{v}</p>
                <p className="eyebrow text-zinc-600 mt-2">{k}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          {/* Mobile: 2-col gallery tiles */}
          <div className="md:hidden grid grid-cols-2 gap-2">
            <div className="relative aspect-square overflow-hidden rounded-md bg-surface text-surface-foreground">
              <img src={yardPiles} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="relative z-10 p-4 flex flex-col h-full">
                <Warehouse className="size-6 text-brand mb-2" />
                <p className="display-5 text-white mt-auto">Pick it up</p>
                <p className="text-xs text-zinc-300 mt-1">8a–5p weekdays · Jefferson, MA</p>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-md bg-surface text-surface-foreground">
              <img src={yardTrucks} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="relative z-10 p-4 flex flex-col h-full">
                <Truck className="size-6 text-brand mb-2" />
                <p className="display-5 text-white mt-auto">We deliver</p>
                <p className="text-xs text-zinc-300 mt-1">Curbside · Central MA</p>
              </div>
            </div>
            <a
              href="tel:5085799897"
              className="col-span-2 inline-flex items-center justify-center gap-2 bg-brand text-brand-foreground px-6 h-12 label hover:opacity-90"
            >
              <Phone className="size-4" /> 508.579.9897
            </a>
          </div>

          {/* Desktop: magazine 2-col */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <div className="bg-kraft p-10 rounded-md ring-1 ring-zinc-300">
              <Warehouse className="size-10 text-brand mb-6" />
              <h2 className="display-3 mb-4">Pick it up</h2>
              <p className="text-zinc-700 mb-6">
                Bring a truck or trailer during business hours. No appointment needed. We'll load you when you pull in.
              </p>
              <div className="space-y-2 text-sm text-zinc-700">
                <p><strong>Address:</strong> 2264 Main St., Jefferson, MA 01522</p>
                <p><strong>Hours (4/1 – 8/1):</strong> Mon–Fri 8a–5p · Sat 8a–3p · Sun closed</p>
                <p className="text-xs text-zinc-500 pt-2">
                  Opening for the 2026 season on April 1. After 8/1, pickup is by appointment.
                  We're open year-round for winter salt and ice melt, so call for loading hours.
                </p>
              </div>
            </div>

            <div className="bg-surface text-surface-foreground p-10 rounded-md">
              <Truck className="size-10 text-brand mb-6" />
              <h2 className="display-3 mb-4">Delivery</h2>
              <p className="text-zinc-300 mb-6">
                We deliver curbside throughout Central Mass. Call us to confirm your zone, the scheduling window, and the final price before we load the truck.
              </p>
              <a
                href="tel:5085799897"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-6 h-11 label hover:opacity-90"
              >
                <Phone className="size-4" /> 508.579.9897
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-kraft border-y border-zinc-300">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <p className="eyebrow text-brand mb-3">Before delivery</p>
          <h2 className="display-3 mb-6 md:mb-10 max-w-[20ch]">
            What to Know Before Delivery
          </h2>
          <TileGrid blocks={POLICY_BLOCKS} />
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <TileGrid blocks={PAYMENT_BLOCKS} />
        </div>
      </section>
    </>
  );
}
