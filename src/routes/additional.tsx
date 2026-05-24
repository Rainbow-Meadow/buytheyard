import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  HeroSection,
  ProductCatalogSection,
  CubicYardsCalculatorSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import {
  catalogQueryOptions,
  productToCatalogItem,
} from "@/data/catalog";
import { largePileOfLightSand } from "@/assets/photos";

export const Route = createFileRoute("/additional")({
  head: () => ({
    meta: [
      { title: "Sand & Loam — Screened Loam, Mason Sand, Stone Dust · Buy The Yard" },
      { name: "description", content: "Screened loam, mason sand, stone dust, compost, salt, and recycled asphalt by the cubic yard. Loaded on 122A in Jefferson, MA. Pickup or delivery across Central Mass." },
      { property: "og:title", content: "Sand & Loam — Buy The Yard" },
      { property: "og:description", content: "Screened loam for the lawn, mason sand for the patio, stone dust for the base. The stuff every job needs, by the cubic yard." },
      { property: "og:url", content: "https://buytheyard.lovable.app/additional" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/additional" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions),
  component: AdditionalPage,
});

function AdditionalPage() {
  const { data: catalog } = useSuspenseQuery(catalogQueryOptions);
  return (
    <main aria-label="Sand and loam products" className="font-barlow">
      <HeroSection
        meta="LOAM · SAND · STONE DUST"
        heading={<>Sand & Loam<br/>By The Yard</>}
        body="Screened loam for a new lawn, mason sand for the patio, stone dust under the pavers. The stuff every job needs — loaded clean, no surprises."
        ctaLabel="Call For Pricing"
        ctaHref="tel:5085799897"
        image={largePileOfLightSand}
        imageAlt="Large pile of light washed sand at the yard"
      />
      <ProductCatalogSection items={catalog.additional.map(productToCatalogItem)} />
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