import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Tag, Truck } from "lucide-react";

export default function DeliveryAndPricing() {
  return (
    <>
      {/* Delivery callout */}
      <section className="bg-base border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6 section grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-12 items-center">
          <div>
            <Truck className="size-10 text-brand mb-4 md:mb-6" />
            <h2 className="display-3 leading-[0.95]">
              Delivery Across <span className="text-brand">Central Mass</span>
            </h2>
            <p className="lead mt-4 md:mt-6 text-zinc-700 max-w-[48ch]">
              Curbside delivery across Central Mass. Call before noon and we'll try for same-day.
            </p>
            <Link
              to="/delivery"
              className="mt-5 md:mt-8 inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90"
            >
              Delivery details <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {[
              ["Driveway-to-curb only", "We drop on the driveway or at the curbline. Keeps lawns and underground lines safe."],
              ["1 yard minimum", "Call before noon for same-day. Otherwise plan on about 48 hours."],
              ["Mark your spot", "Drop a tarp, bucket, or cone where you want the pile. We'll put it right there."],
              ["4% card fee", "Pass-through from our processor. Cash and check skip the fee."],
            ].map(([k, v], i) => (
              <article key={k} className="bg-white ring-1 ring-zinc-300/60 p-5 md:p-6 rounded-md">
                <p className="eyebrow text-brand mb-2">{String(i + 1).padStart(2, "0")}</p>
                <p className="display-5">{k}</p>
                <p className="body-sm text-zinc-600 mt-2">{v}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-kraft border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
              <Tag className="size-3.5" />
              Today's prices by phone
            </p>
            <h2 className="display-3 leading-[0.95] text-zinc-950 max-w-[18ch]">
              Call for today's price
            </h2>
            <p className="body mt-4 md:mt-6 text-zinc-700 max-w-[52ch] text-pretty">
              Prices shift with the season, so we quote by phone. Cash and check skip the 4% card fee.
            </p>
            <div className="mt-5 md:mt-8 flex flex-wrap items-center gap-3">
              <a
                href="tel:5085799897"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90 transition-opacity"
              >
                <Phone className="size-4" />
                Tap to call — 508.579.9897
              </a>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 border border-zinc-900 text-zinc-900 px-7 h-12 label hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}