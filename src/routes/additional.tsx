import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  HeroSection,
  ProductCatalogSection,
  DeliveryPricingSection,
  CubicYardsCalculatorSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import {
  catalogQueryOptions,
  deliveryZonesQueryOptions,
  productToCatalogItem,
  zoneToDisplay,
} from "@/data/catalog";
import { largePileOfLightSand } from "@/assets/photos";

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
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(catalogQueryOptions);
    context.queryClient.ensureQueryData(deliveryZonesQueryOptions);
  },
  component: AdditionalPage,
});

function AdditionalPage() {
  const { data: catalog } = useSuspenseQuery(catalogQueryOptions);
  const { data: zones } = useSuspenseQuery(deliveryZonesQueryOptions);
  return (
    <main aria-label="Additional products" className="font-barlow">
      <HeroSection
        meta="LOAM · SAND · GRAVEL"
        heading={<>Everything Else<br/>By The Yard</>}
        body="Screened loam for the lawn, mason sand for the patio, stone dust for the base. The supporting cast that finishes every project."
        ctaLabel="Call For Pricing"
        ctaHref="tel:5085799897"
        image={largePileOfLightSand}
        imageAlt="Large pile of light washed sand at the yard"
      />
      <ProductCatalogSection items={catalog.additional.map(productToCatalogItem)} />
      <DeliveryPricingSection zones={zones.map(zoneToDisplay)} />
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