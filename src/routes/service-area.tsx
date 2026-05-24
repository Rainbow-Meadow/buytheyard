import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { Tile } from "@/components/site/Tile";

const TITLE = "Service Area — Central MA Delivery | Buy The Yard";
const DESCRIPTION =
  "Bulk mulch, loam, sand & stone delivery from our Jefferson, MA yard to Holden, Worcester, Princeton, Sterling & nearby towns across Central Massachusetts.";

export const Route = createFileRoute("/service-area")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://buytheyard.lovable.app/service-area" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/service-area" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Landscape material delivery",
          provider: { "@id": "https://buytheyard.lovable.app/#organization" },
          areaServed: [],
          availableChannel: {
            "@type": "ServiceChannel",
            servicePhone: "+1-508-579-9897",
            serviceUrl: "https://buytheyard.lovable.app/quote",
          },
        }),
      },
    ],
  }),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  return (
    <>
      {/* Screen 1 — hero */}
      <section aria-label="Buy The Yard service area" className="border-y border-[var(--rule)]">
        <h1 className="sr-only">Buy The Yard service area — Central Massachusetts</h1>
        <div className="min-h-[420px] md:min-h-[480px] flex">
          <Tile
            id="sa-hero"
            fill
            variant="cta"
            tone="surface"
            layout="anchored"
            icon={<Truck />}
            eyebrow="Service area · 15 towns · ~25 mi radius · 1 yd min"
            title="Across Central Mass."
            body="Mulch, loam, sand & stone from Jefferson to your town."
            cta={{ label: "Get a quote", to: "/quote" }}
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