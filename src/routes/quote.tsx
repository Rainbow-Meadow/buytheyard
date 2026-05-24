import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Tile } from "@/components/site/Tile";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Build a quote in under a minute. Send it straight to Abby — by email or text. Pickup or delivery in Central MA.",
      },
      { property: "og:title", content: "Get a Quote — Buy The Yard" },
      {
        property: "og:description",
        content: "Tell us what you need. We come back with pricing and a delivery window.",
      },
      { property: "og:url", content: "/quote" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/quote" },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <>
      <section aria-label="Build a quote" className="border-y border-[var(--rule)]">
        <h1 className="sr-only">Build a quote for bulk materials</h1>
        <div className="min-h-[420px] md:min-h-[480px] flex">
          <Tile
            id="quote-hero"
            fill
            variant="cta"
            tone="surface"
            layout="anchored"
            icon={<ArrowRight />}
            eyebrow="Quote"
            title="Tell us what you need."
            body="Phone is fastest for price, timing, and delivery. The form goes straight to Abby."
            cta={{ label: "Call 508.579.9897", href: "tel:5085799897" }}
          />
        </div>
      </section>

      <section aria-label="Section placeholder" className="border-b border-[var(--rule)]">
        <div className="container mx-auto px-5 md:px-10 py-24 md:py-32">
          <p className="eyebrow text-zinc-500">Next section</p>
          <p className="body-sm text-zinc-500 mt-2">Empty — build from here.</p>
        </div>
      </section>
    </>
  );
}
