import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  HeroSection,
  ProductCatalogSection,
  CubicYardsCalculatorSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { catalogQueryOptions, productToCatalogItem } from "@/data/catalog";
import { mixedLandscapeStoneSamplesOnGround } from "@/assets/photos";

export const Route = createFileRoute("/stone")({
  head: () => ({
    meta: [
      { title: "Landscaping Stone by the Yard — 1-1/2\", 3/4\", 3/8\" | Buy The Yard" },
      { name: "description", content: "Decorative landscaping stone in Jefferson, MA. Three sizes — 1-1/2\", 3/4\", 3/8\" — in brown, blue, white, red, purple, and gray. Pickup or delivery." },
      { property: "og:title", content: "Landscaping Stone — Buy The Yard" },
      { property: "og:description", content: "Decorative landscaping stone in three sizes and multiple colors, sold by the cubic yard." },
      { property: "og:url", content: "https://buytheyard.lovable.app/stone" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/stone" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions),
  component: StonePage,
});

function StonePage() {
  const { data: catalog } = useSuspenseQuery(catalogQueryOptions);
  return (
    <main aria-label="Stone" className="font-barlow">
      <HeroSection
        meta="STONE"
        heading={<>Landscaping.<br/>Stone.<br/>By Size.</>}
        body="Three sizes, multiple colors. Pick the scale and shade that fits your beds, borders, and walkways."
        ctaLabel="Call For Pricing"
        ctaHref="tel:5085799897"
        image={mixedLandscapeStoneSamplesOnGround}
        imageAlt="Mixed landscape stone samples laid out on the ground"
      />
      <ProductCatalogSection items={catalog.stone.map(productToCatalogItem)} />
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