import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  LogisticsSplitSection,
  ProcessStepsSection,
  DeliveryPricingSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { DELIVERY_ZONES } from "@/data/catalog";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Pickup — Central MA | Buy The Yard" },
      {
        name: "description",
        content:
          "Bulk material pickup and curbside delivery from Jefferson, MA. 1-yard minimum, 48 hours is best, driveway or curbline drop only. Call 508-579-9897.",
      },
      { property: "og:title", content: "Delivery & Pickup — Buy The Yard" },
      {
        property: "og:description",
        content: "How pickup and delivery work before the truck leaves the Jefferson yard.",
      },
      { property: "og:url", content: "/delivery" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/delivery" }],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  return (
    <main aria-label="Delivery" className="font-barlow">
      <HeroSection
        meta="DELIVERY & PICKUP"
        heading={<>Pickup Or<br/>Delivered.</>}
        body="Bring a truck and we load you on the spot. Or we drop it precisely where you need it — driveway, curbline, or job site."
        ctaLabel="Call 508.579.9897"
        ctaHref="tel:5085799897"
      />
      <LogisticsSplitSection
        pickup={{
          heading: "Drive-in Pickup",
          body: "Bring your own truck or trailer. We load you up on the spot. No minimum volume for most products.",
          specLines: ["LOADING HOURS:", "MON–FRI: 0800 – 1700", "SATURDAY: 0800 – 1500"],
        }}
        delivery={{
          heading: "Site Delivery",
          body: "Precision dumping at your home or job site. 3-yard minimum. Same-day for orders placed before 2:00 PM EST.",
          ctaLabel: "Request Delivery",
          ctaHref: "/quote",
        }}
      />
      <ProcessStepsSection
        steps={[
          { title: "Select Material", body: "Browse our catalog and determine the cubic yardage needed for your project area." },
          { title: "Get a Quote",     body: "Call or submit a request for current pricing including delivery fees to your specific ZIP code." },
          { title: "Schedule Drop",   body: "Confirm your order and provide specific dumping instructions for our drivers." },
        ]}
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
