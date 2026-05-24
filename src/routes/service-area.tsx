import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  ServiceAreaSection,
  DeliveryPricingSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { SERVICE_AREA_TOWNS } from "@/data/service-area";
import { DELIVERY_ZONES } from "@/data/catalog";

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
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/service-area" }],
  }),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  return (
    <main aria-label="Service area" className="font-barlow">
      <HeroSection
        meta="SERVICE AREA"
        heading={<>Central Mass<br/>Delivery.</>}
        body="Based in Jefferson and serving the towns within ~40 minutes of the yard. If your project is just outside our usual zone, call — we still might be able to help."
        ctaLabel="Call 508.579.9897"
        ctaHref="tel:5085799897"
      />
      <ServiceAreaSection
        heading={<>Towns We Deliver To</>}
        body="We deliver mulch, loam, sand, gravel, and stone across Worcester County. Most orders land within 24–48 hours."
        phone="508.579.9897"
        towns={[...SERVICE_AREA_TOWNS]}
      />
      <DeliveryPricingSection zones={DELIVERY_ZONES} />
      <ContactCTASection
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}
