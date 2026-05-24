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
      { title: "Landscaping Stone — 1-1/2\", 3/4\", 3/8\" · Buy The Yard" },
      { name: "description", content: "Landscaping stone by the cubic yard on 122A in Jefferson, MA. 3/4\" crush, 3/8\" pea, river rock, lava — multiple sizes and colors. Pickup or delivery." },
      { property: "og:title", content: "Landscaping Stone — Buy The Yard" },
      { property: "og:description", content: "3/4\" crush for driveways, pea stone for paths, river rock for dry creeks. Loaded at the yard in Jefferson, MA." },
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
        body={`3/4" crush for the driveway, pea stone for the path, river rock for the dry creek. Three sizes, plenty of colors — pick what fits the job.`}
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