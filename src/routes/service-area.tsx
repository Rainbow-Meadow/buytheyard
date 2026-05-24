import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  HeroSection,
  ServiceAreaSection,
  DeliveryPricingSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { SERVICE_AREA_TOWNS } from "@/data/service-area";
import { deliveryZonesQueryOptions, zoneToDisplay } from "@/data/catalog";
import { businessSignAndFlagsAtEntrance } from "@/assets/photos";

const TITLE = "Service Area — Central Mass Delivery · Buy The Yard";
const DESCRIPTION =
  "Mulch, stone, sand & loam delivery from the yard on 122A in Jefferson, MA to Holden, Worcester, Princeton, Sterling, and the rest of Central Mass.";

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
  loader: ({ context }) => context.queryClient.ensureQueryData(deliveryZonesQueryOptions),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  const { data: zones } = useSuspenseQuery(deliveryZonesQueryOptions);
  return (
    <main aria-label="Service area" className="font-barlow">
      <HeroSection
        meta="SERVICE AREA"
        heading={<>Central Mass<br/>Delivery.</>}
        body="Trucks roll out of the Jefferson yard on 122A. If you're inside about 40 minutes of us, we can usually get a load to you same day or next. Just outside that? Call — we'll see what we can do."
        ctaLabel="Call 508.579.9897"
        ctaHref="tel:5085799897"
        image={businessSignAndFlagsAtEntrance}
        imageAlt="Buy The Yard business sign and flags at the entrance"
      />
      <ServiceAreaSection
        heading={<>Towns We Deliver To</>}
        body="Mulch, loam, sand, gravel, and stone across Worcester County. Most orders land within 24 to 48 hours."
        phone="508.579.9897"
        towns={[...SERVICE_AREA_TOWNS]}
      />
      <DeliveryPricingSection zones={zones.map(zoneToDisplay)} />
      <ContactCTASection
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}
