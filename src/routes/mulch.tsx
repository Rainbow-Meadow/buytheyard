import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  ProductCatalogSection,
  CubicYardsCalculatorSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { MULCH } from "@/data/catalog";

export const Route = createFileRoute("/mulch")({
  head: () => ({
    meta: [
      { title: "Bulk Mulch — Brown, Black, Cedar, Hemlock | Buy The Yard" },
      { name: "description", content: "Premium double-ground mulch by the yard in Jefferson, MA. Brown, black, cedar, hemlock, and playground mulch. Pickup or delivery across Central Mass." },
      { property: "og:title", content: "Bulk Mulch — Buy The Yard" },
      { property: "og:description", content: "Brown, black, cedar, hemlock, and playground mulch by the cubic yard." },
      { property: "og:url", content: "https://buytheyard.lovable.app/mulch" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/mulch" }],
  }),
  component: MulchPage,
});

function MulchPage() {
  return (
    <main aria-label="Mulch" className="font-barlow">
      <HeroSection
        meta="MULCH"
        heading={<>Bulk Mulch<br/>By The Yard</>}
        body="Double-ground, color-locked mulch in five varieties. Loaded clean and consistent — at the yard or delivered to your driveway."
        ctaLabel="Call For Pricing"
        ctaHref="tel:5085799897"
      />
      <ProductCatalogSection items={MULCH} />
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