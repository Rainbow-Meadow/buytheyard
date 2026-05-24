import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  MaterialInventorySection,
  LogisticsSplitSection,
  ProcessStepsSection,
  OwnerStorySection,
  TestimonialsSection,
  FAQSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulch, Loam, Sand & Stone — Jefferson, MA" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand & stone from Buy The Yard in Jefferson, MA. Woman-owned, WBE-certified, and built for pickup or delivery across Central Mass.",
      },
      { property: "og:title", content: "Buy The Yard — Bulk Landscape Materials in Jefferson, MA" },
      {
        property: "og:description",
        content:
          "Mulch, loam, sand, stone, garden center materials, and practical ordering help from Abby's Jefferson yard.",
      },
      { property: "og:url", content: "https://buytheyard.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main aria-label="Home" className="font-barlow">
      <HeroSection
        index="01"
        meta="EST. 2016 — JEFFERSON, MA"
        heading={<>Bulk materials.<br/>Modern landscape.</>}
        body="Premium mulch, loam, stone, and sand. Woman-owned and operated. Serving Central Massachusetts with precision delivery."
        ctaLabel="View Inventory"
        ctaTo="/products"
      />

      <MaterialInventorySection
        index="02"
        items={[
          { code: "CAT_01", name: "Mulch", description: "Double-ground, dyed or natural. Moisture retention and weed suppression.", unit: "CUBIC YARD" },
          { code: "CAT_02", name: "Loam",  description: "Screened organic soil. High nutrient content for lawn and garden beds.", unit: "CUBIC YARD" },
          { code: "CAT_03", name: "Stone", description: "Decorative and structural aggregates. Multiple sizes for drainage or paths.", unit: "TON / CY" },
          { code: "CAT_04", name: "Sand",  description: "Washed beach sand or concrete sand. Perfect for masonry or play areas.", unit: "TON" },
        ]}
      />

      <LogisticsSplitSection
        index="03"
        pickup={{
          heading: "Drive-in Pickup",
          body: "Bring your own truck or trailer. We load you up on the spot. No minimum volume for most products.",
          specLines: ["LOADING HOURS:", "MON–FRI: 0800 – 1700", "SATURDAY: 0800 – 1500"],
        }}
        delivery={{
          heading: "Site Delivery",
          body: "Precision dumping at your home or job site. 3-yard minimum. Servicing Jefferson and surrounding towns.",
          ctaLabel: "Calculate Delivery Fee",
          ctaHref: "/delivery",
        }}
      />

      <ProcessStepsSection
        index="04"
        steps={[
          { title: "Select Material", body: "Browse our catalog and determine the cubic yardage needed for your project area." },
          { title: "Get a Quote",     body: "Call or submit a request for current pricing including delivery fees to your specific ZIP code." },
          { title: "Schedule Drop",   body: "Confirm your order and provide specific dumping instructions for our drivers." },
        ]}
      />

      <OwnerStorySection
        index="05"
        heading={<>WBE Certified<br/>Woman-Owned</>}
        body="Founded by Abby in 2016, Buy The Yard is a certified Woman Business Enterprise by the Commonwealth of Massachusetts. We bring a professional, customer-first approach to a heavy industry."
        badges={["WBE", "MASS"]}
        caption="Abby's Story — Our Foundation"
      />

      <TestimonialsSection
        index="06"
        items={[
          { quote: "The best mulch in Central Mass. Clean, consistent, and delivered exactly where I needed it.", attribution: "MARK S. / RESIDENTIAL" },
          { quote: "Reliable logistics for our commercial landscape crews. They understand the urgency of site work.", attribution: "GREEN LANDSCAPE INC." },
        ]}
      />

      <FAQSection
        index="07"
        items={[
          { q: "What is your delivery minimum?", a: "We generally require a 3 cubic yard minimum for local deliveries. Smaller quantities are available for pickup at our yard." },
          { q: "How many yards fit in a standard truck?", a: "A standard pickup truck typically holds 1–2 cubic yards of mulch or 1 yard of heavier materials like stone or loam." },
        ]}
      />

      <ContactCTASection
        index="08"
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}
