import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  HeroSection,
  ProductCatalogSection,
  CubicYardsCalculatorSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { catalogQueryOptions, productToCatalogItem } from "@/data/catalog";
import { dumpTruckBedFullOfBrownMulch } from "@/assets/photos";

export const Route = createFileRoute("/mulch")({
  head: () => ({
    meta: [
      { title: "Bulk Mulch — Hemlock, Brown, Black, Red · Buy The Yard" },
      { name: "description", content: "Double-ground mulch by the cubic yard on 122A in Jefferson, MA. Hemlock, brown, black, red, and playground. Pickup or delivery across Central Mass." },
      { property: "og:title", content: "Bulk Mulch — Buy The Yard" },
      { property: "og:description", content: "Hemlock, brown, black, red, and playground mulch by the cubic yard. Loaded at the yard in Jefferson, MA." },
      { property: "og:url", content: "https://buytheyard.lovable.app/mulch" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/mulch" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions),
  component: MulchPage,
});

function MulchPage() {
  const { data: catalog } = useSuspenseQuery(catalogQueryOptions);
  return (
    <main aria-label="Mulch" className="font-barlow">
      <HeroSection
        meta="MULCH"
        heading={<>Bulk Mulch<br/>By The Yard</>}
        body="Hemlock, brown, black, red, playground. Double-ground and dyed to hold color through August. Pull in with a truck, or we'll drop it in your driveway."
        ctaLabel="Call For Pricing"
        ctaHref="tel:5085799897"
        image={dumpTruckBedFullOfBrownMulch}
        imageAlt="Dump truck bed full of fresh brown mulch"
      />
      <ProductCatalogSection items={catalog.mulch.map(productToCatalogItem)} />
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