import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  ProductCatalogSection,
  DeliveryPricingSection,
  CubicYardsCalculatorSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { ADDITIONAL, DELIVERY_ZONES } from "@/data/catalog";

export const Route = createFileRoute("/additional")({
  head: () => ({
    meta: [
      { title: "Loam, Sand, Gravel & More — Buy The Yard | Jefferson, MA" },
      { name: "description", content: "Screened loam, mason sand, stone dust, gravel, wood chips, compost, and recycled asphalt by the cubic yard. Pickup or delivery across Central MA." },
      { property: "og:title", content: "Additional Products — Buy The Yard" },
      { property: "og:description", content: "Loam, sand, gravel, wood chips, compost, and recycled asphalt." },
      { property: "og:url", content: "https://buytheyard.lovable.app/additional" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/additional" }],
  }),
  component: AdditionalPage,
});

function AdditionalPage() {
  return (
    <main aria-label="Additional products" className="font-barlow">
      <HeroSection
        meta="LOAM · SAND · GRAVEL"
        heading={<>Everything Else<br/>By The Yard</>}
        body="Screened loam for the lawn, mason sand for the patio, stone dust for the base. The supporting cast that finishes every project."
        ctaLabel="Call For Pricing"
        ctaHref="tel:5085799897"
      />
      <ProductCatalogSection items={ADDITIONAL} />
      <DeliveryPricingSection zones={DELIVERY_ZONES} />
      <CubicYardsCalculatorSection />
      <ContactCTASection
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}