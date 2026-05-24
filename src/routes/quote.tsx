import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  ContactFormSection,
} from "@/components/site/sections/archetypes";

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
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/quote" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <main aria-label="Quote" className="font-barlow">
      <HeroSection
        meta="QUOTE REQUEST"
        heading={<>Get A Quote<br/>In A Minute.</>}
        body="Tell us what you need and where. We come back with pricing and a delivery window — usually same day."
        ctaLabel="Or Call 508.579.9897"
        ctaHref="tel:5085799897"
      />
      <ContactFormSection
        heading={<>Quote Request</>}
        email="abby@btymaterial.com"
        phone="508.579.9897"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
      />
    </main>
  );
}
