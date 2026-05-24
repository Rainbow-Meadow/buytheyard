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
import {
  coveredGardenCenterFlowerDisplay,
  yellowPotPetunias,
  pinkYellowHangingBasket,
  fallMumsPumpkinsHay,
  gardenToolsWall,
} from "@/assets/photos";

export const Route = createFileRoute("/garden-center")({
  head: () => ({
    meta: [
      { title: "Garden Center — Hanging Baskets, Mums, Annuals · Buy The Yard" },
      { name: "description", content: "The flower wagon out front of the yard on 122A in Jefferson, MA. Hand-built hanging baskets, annuals, perennials, fall mums, and the tools to plant them." },
      { property: "og:title", content: "Garden Center — Buy The Yard" },
      { property: "og:description", content: "Hand-built hanging baskets, annuals, fall mums, and garden tools on the wagon out front in Jefferson, MA." },
      { property: "og:url", content: "https://buytheyard.lovable.app/garden-center" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og-garden-center.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/garden-center" }],
  }),
  component: GardenCenterPage,
});

const SECTIONS: Array<{ code: string; name: string; description: string; note: string; image: string; imageAlt: string }> = [
  { code: "GC_01", name: "Annuals & Pansies", description: "Bright potted color for the front steps, the patio, the bed by the mailbox. Refreshed weekly through the season.", note: "SPRING – FALL", image: yellowPotPetunias, imageAlt: "Yellow pot of purple and white petunias on a patio table" },
  { code: "GC_02", name: "Hanging Baskets", description: "Built by hand on the wagon out front. Full, heavy, ready to hang — call ahead for Mother's Day weekend.", note: "MOTHER'S DAY +", image: pinkYellowHangingBasket, imageAlt: "Hanging basket with pink verbena, yellow petunias, and blue lobelia" },
  { code: "GC_03", name: "Mums & Perennials", description: "Fall mums on the hay bales, pumpkins next to them. Hardy perennials that come back every year.", note: "FALL HEAVY", image: fallMumsPumpkinsHay, imageAlt: "Fall mums and pumpkins arranged on hay bales out front of the yard" },
  { code: "GC_04", name: "Tools & Hardware", description: "Shovels, rakes, leaf blowers, gloves, marking paint — the basics you forgot before you headed to the job.", note: "STOCKED YEAR-ROUND", image: gardenToolsWall, imageAlt: "Shovels, rakes, and lawn sprayers stocked on the garden center wall" },
];

function GardenCenterPage() {
  return (
    <main aria-label="Garden Center" className="font-barlow">
      <HeroSection
        meta="GARDEN CENTER"
        heading={<>Garden Center.<br/>At The Yard.</>}
        body="A flower wagon out front of the materials yard. Hand-built hanging baskets, annuals, fall mums on the hay bales, and the tools to plant them. Walk it, pick what you like, take it home."
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
              <div className="mb-6 aspect-square overflow-hidden bg-soft">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
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