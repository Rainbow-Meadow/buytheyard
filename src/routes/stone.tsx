import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  ProductCatalogSection,
  CubicYardsCalculatorSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { STONE } from "@/data/catalog";
import { mixedLandscapeStoneSamplesOnGround } from "@/assets/photos";

export const Route = createFileRoute("/stone")({
  head: () => ({
    meta: [
      { title: "Bulk Stone — Crushed, River, Pea & Decorative | Buy The Yard" },
      { name: "description", content: "Bulk stone by the yard in Jefferson, MA: 3/4\" crushed, pea stone, river rock, bluestone, cobble, lava rock, and more. Pickup or delivery." },
      { property: "og:title", content: "Bulk Stone — Buy The Yard" },
      { property: "og:description", content: "Crushed, decorative, and specialty stone by the cubic yard." },
      { property: "og:url", content: "https://buytheyard.lovable.app/stone" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/stone" }],
  }),
  component: StonePage,
});

function StonePage() {
  return (
    <main aria-label="Stone" className="font-barlow">
      <HeroSection
        meta="STONE"
        heading={<>Crushed.<br/>Decorative.<br/>Specialty.</>}
        body="Drainage stone, decorative river rock, bluestone, and specialty accents. We help you pick the right size for the job."
        ctaLabel="Call For Pricing"
        ctaHref="tel:5085799897"
        image={mixedLandscapeStoneSamplesOnGround}
        imageAlt="Mixed landscape stone samples laid out on the ground"
      />
      <ProductCatalogSection items={STONE} />
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