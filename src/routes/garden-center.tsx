import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { Section } from "@/components/site/sections/Section";
import { SectionHeader } from "@/components/site/sections/SectionHeader";
import { SectionGrid, SectionGridCell } from "@/components/site/sections/SectionGrid";
import { MonoLabel } from "@/components/site/sections/MonoLabel";
import { DisplayHeading } from "@/components/site/sections/DisplayHeading";
import { coveredGardenCenterFlowerDisplay } from "@/assets/photos";

export const Route = createFileRoute("/garden-center")({
  head: () => ({
    meta: [
      { title: "Garden Center — Annuals, Perennials, Mums & Tools | Buy The Yard" },
      { name: "description", content: "Visit the Buy The Yard garden center in Jefferson, MA for annuals, perennials, hanging baskets, mums, pansies, and hand-picked garden tools and hardware." },
      { property: "og:title", content: "Garden Center — Buy The Yard" },
      { property: "og:description", content: "Annuals, perennials, hanging baskets, mums, and garden tools at the yard in Jefferson, MA." },
      { property: "og:url", content: "https://buytheyard.lovable.app/garden-center" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og-garden-center.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/garden-center" }],
  }),
  component: GardenCenterPage,
});

const SECTIONS: Array<{ code: string; name: string; description: string; note: string }> = [
  { code: "GC_01", name: "Annuals & Pansies", description: "Bright potted color for porches, patios, and beds. Refreshed weekly through the season.", note: "SPRING – FALL" },
  { code: "GC_02", name: "Hanging Baskets", description: "Hand-built baskets in mixed varieties. Pickup ready or call ahead to reserve.", note: "MOTHER'S DAY +" },
  { code: "GC_03", name: "Mums & Perennials", description: "Fall mums in every color and hardy perennials that come back year after year.", note: "FALL HEAVY" },
  { code: "GC_04", name: "Tools & Hardware", description: "Long-handle tools, leaf blowers, gloves, and the small stuff that finishes the job.", note: "STOCKED YEAR-ROUND" },
];

function GardenCenterPage() {
  return (
    <main aria-label="Garden Center" className="font-barlow">
      <HeroSection
        meta="GARDEN CENTER"
        heading={<>Garden Center.<br/>At The Yard.</>}
        body="Annuals, perennials, hanging baskets, mums, and the tools to plant them. Walk the yard, pick what you like, take it home today."
        ctaLabel="Call The Yard"
        ctaHref="tel:5085799897"
        image={coveredGardenCenterFlowerDisplay}
        imageAlt="Covered garden center flower display at Buy The Yard"
      />
      <Section title="GARDEN CENTER" tone="paper">
        <SectionHeader
          eyebrow="WHAT'S IN STOCK"
          eyebrowAccent
          heading={<>What You'll<br/>Find Here.</>}
          size="lg"
          rule
        />
        <SectionGrid cols={4}>
          {SECTIONS.map((s, i) => (
            <SectionGridCell key={s.code} last={i === SECTIONS.length - 1}>
              <MonoLabel className="block mb-12">{s.code}</MonoLabel>
              <DisplayHeading as="h3" size="sm" className="mb-4">{s.name}</DisplayHeading>
              <p className="font-barlow text-sm opacity-70 mb-6">{s.description}</p>
              <MonoLabel>{s.note}</MonoLabel>
            </SectionGridCell>
          ))}
        </SectionGrid>
      </Section>
      <ContactCTASection
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}