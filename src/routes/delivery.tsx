import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  LogisticsSplitSection,
  ProcessStepsSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { dumpTruckUnloadingBlackMulch } from "@/assets/photos";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Pickup — Central Mass · Buy The Yard" },
      {
        name: "description",
        content:
          "Pickup and delivery out of the Jefferson yard on 122A. Pull in with a truck or we drop it where you want it — driveway, curbline, job site. Call 508-579-9897.",
      },
      { property: "og:title", content: "Delivery & Pickup — Buy The Yard" },
      {
        property: "og:description",
        content: "How pickup and delivery work before the truck rolls out of the Jefferson yard.",
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
        body="Pull in with a truck and we load you up on the spot. Or we run it out and drop it where you want it — driveway, curbline, or job site."
        ctaLabel="Call 508.579.9897"
        ctaHref="tel:5085799897"
        image={dumpTruckUnloadingBlackMulch}
        imageAlt="Dump truck unloading black mulch at a delivery site"
      />
      <LogisticsSplitSection
        heightClass="md:h-[calc(40svh-1.6rem)]"
        pickup={{
          heading: "Drive-in Pickup",
          body: "Bring a truck or a trailer — we'll load you up on the spot. No minimum on most products.",
          specLines: ["LOADING HOURS:", "MON–FRI: 0800 – 1700", "SATURDAY: 0800 – 1500"],
        }}
        delivery={{
          heading: "Site Delivery",
          body: "We drop it where you want it — home or job site. 1 CY minimum. Same day on orders placed before 2:00pm.",
          ctaLabel: "Request Delivery",
          ctaHref: "/quote",
        }}
      />
      <ProcessStepsSection
        heightClass="md:h-[calc(40svh-1.6rem)]"
        steps={[
          { title: "Pick Your Material", body: "Walk the catalog or call us. We'll help you figure the cubic yards if you're not sure." },
          { title: "Get A Price",        body: "Phone or the quote form — same day. Flat $75 delivery fee anywhere we go." },
          { title: "Schedule The Drop",  body: "Confirm the load and tell the driver exactly where you want it. We'll be there." },
        ]}
      />
      <ContactCTASection
        heightClass="md:h-[calc(20svh-0.8rem)]"
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}
