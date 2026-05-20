import { Link } from "@tanstack/react-router";
import { ArrowRight, HelpCircle, Phone } from "lucide-react";
import { TileGrid, type TileBlock } from "@/components/site/Tile";

const DESKTOP_BLOCKS: TileBlock[] = [
  {
    id: "faq-intro",
    variant: "cta",
    icon: <HelpCircle />,
    eyebrow: "Before you call",
    title: "Frequently asked questions",
    body: "Quick answers on pricing, delivery, payment, and scheduling. Anything we missed, give us a call.",
    cta: { label: "508.579.9897", href: "tel:5085799897" },
    size: "md",
    tone: "brand",
    padding: "lg",
  },
  {
    id: "faq-pricing",
    variant: "text",
    eyebrow: "01 · Pricing",
    title: "How much does material cost?",
    body: (
      <>
        <p>
          Prices move with the season, so we quote today's number by phone. We work hard to keep them the best around. One-yard minimum on bulk orders.
        </p>
        <p className="mt-3">
          For your project,{" "}
          <a href="tel:5085799897" className="font-semibold text-white underline underline-offset-4 hover:text-brand">call 508-579-9897</a>{" "}or{" "}
          <Link to="/quote" className="font-semibold text-white underline underline-offset-4 hover:text-brand">send a quote online</Link>.
        </p>
      </>
    ),
    size: "md",
    tone: "gray",
  },
  {
    id: "faq-delivery",
    variant: "cta",
    eyebrow: "02 · Delivery area",
    title: "Do you deliver to my town?",
    body: "Curbside across Central Mass from our Jefferson yard. Holden, Princeton, Sterling, Rutland, West Boylston, Paxton, Worcester, Leominster, and the towns around them.",
    cta: { label: "Delivery details", to: "/delivery" },
    size: "sm",
    tone: "surface",
  },
  {
    id: "faq-card",
    variant: "text",
    eyebrow: "03 · Card fee",
    title: "What's the 4% card fee?",
    body: "Pass-through from our card processor. Cash and check skip the fee. Your quoted price doesn't change either way.",
    size: "sm",
    tone: "surface",
  },
  {
    id: "faq-timing",
    variant: "cta",
    eyebrow: "04 · Timing",
    title: "How fast can I get a delivery?",
    body: "Call before noon and we'll try for same-day, depending on the route. Otherwise plan on about 48 hours. Driveway or curbline only — mark your spot.",
    cta: { label: "Start a quote", to: "/quote" },
    size: "sm",
    tone: "surface",
  },
];

export default function FaqSection() {
  return (
    <section className="section bg-surface text-surface-foreground border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Desktop: balanced tile grid */}
        <div className="hidden md:block">
          <TileGrid blocks={DESKTOP_BLOCKS} />
        </div>

        {/* Mobile: original stacked layout */}
        <div className="md:hidden grid grid-cols-1 gap-6">
        <div className="md:col-span-5">
          <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
            <HelpCircle className="size-3.5" />
            Before you call
          </p>
          <h2 className="display-3 leading-[0.95] max-w-[16ch]">
            Frequently Asked Questions
          </h2>
          <p className="body mt-4 text-zinc-300 max-w-[42ch] text-pretty">
            Quick answers on pricing, delivery, payment, and scheduling. Anything we missed, give us a call.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <article className="sm:col-span-2 bg-white/5 ring-1 ring-white/10 rounded-md p-6 md:p-7 backdrop-blur-sm">
              <p className="eyebrow text-brand mb-3">01 · Pricing</p>
              <h3 className="display-5 tracking-tight">How much does material cost?</h3>
              <p className="body-sm text-zinc-300 mt-3">
                Prices move with the season, so we quote today's number by phone. We work hard to keep them the best around. One-yard minimum on bulk orders.
              </p>
              <p className="body-sm text-zinc-300 mt-3">
                For your project,{" "}
                <a href="tel:5085799897" className="font-semibold text-white underline underline-offset-4 hover:text-brand">call 508-579-9897</a>{" "}or{" "}
                <Link to="/quote" className="font-semibold text-white underline underline-offset-4 hover:text-brand">send a quote online</Link>.
              </p>
            </article>

            <article className="bg-white/5 ring-1 ring-white/10 rounded-md p-6 md:p-7 backdrop-blur-sm">
              <p className="eyebrow text-brand mb-3">02 · Delivery area</p>
              <h3 className="display-5 tracking-tight">Do you deliver to my town?</h3>
              <p className="body-sm text-zinc-300 mt-3">
                We deliver curbside across Central Mass from our Jefferson yard. Holden, Princeton, Sterling, Rutland, West Boylston, Paxton, Worcester, Leominster, and the towns around them.
              </p>
              <Link to="/delivery" className="mt-4 inline-flex items-center gap-1 label text-white underline underline-offset-4 hover:text-brand">
                Delivery details <ArrowRight className="size-3.5" />
              </Link>
            </article>

            <article className="bg-white/5 ring-1 ring-white/10 rounded-md p-6 md:p-7 backdrop-blur-sm">
              <p className="eyebrow text-brand mb-3">03 · Card fee</p>
              <h3 className="display-5 tracking-tight">What's the 4% card fee about?</h3>
              <p className="body-sm text-zinc-300 mt-3">
                It's a pass-through from our card processor. Cash and check skip the fee. Your quoted price doesn't change either way.
              </p>
            </article>

            <article className="sm:col-span-2 bg-white/5 ring-1 ring-white/10 rounded-md p-6 md:p-7 backdrop-blur-sm">
              <p className="eyebrow text-brand mb-3">04 · Timing</p>
              <h3 className="display-5 tracking-tight">How fast can I get a delivery?</h3>
              <p className="body-sm text-zinc-300 mt-3">
                Call before noon and we'll try for same-day, depending on the route. Otherwise plan on about 48 hours. We drop driveway or curbline only, so mark your spot.
              </p>
              <Link to="/quote" className="mt-4 inline-flex items-center gap-1 label text-white underline underline-offset-4 hover:text-brand">
                Start a quote <ArrowRight className="size-3.5" />
              </Link>
            </article>
          </div>

          <a
            href="tel:5085799897"
            className="mt-5 inline-flex items-center gap-2 label text-white hover:text-brand"
          >
            <Phone className="size-4" />
            508.579.9897
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}