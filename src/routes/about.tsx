import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  OwnerStorySection,
  TestimonialsSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import { workerHoldingBagsOfLandscapeMaterial } from "@/assets/photos";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet Abby Montalto — Buy The Yard · Jefferson, MA" },
      {
        name: "description",
        content:
          "Abby Montalto runs Buy The Yard on 122A in Jefferson, MA — a WBE-certified materials yard with Central Mass construction roots.",
      },
      { property: "og:title", content: "Meet Abby — Buy The Yard" },
      {
        property: "og:description",
        content:
          "Abby Montalto, family construction roots, WBE certification, and a yard on 122A in Jefferson, MA.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main aria-label="About" className="font-barlow">
      <HeroSection
        meta="ABOUT · EST. 2016"
        heading={<>Meet Abby.<br/>Meet The Yard.</>}
        body="A woman-owned, WBE-certified materials yard on 122A in Jefferson, MA. Built on Central Mass construction roots — and on knowing what people actually need when they pull up with a truck."
        ctaLabel="Visit The Yard"
        ctaTo="/contact"
        image={workerHoldingBagsOfLandscapeMaterial}
        imageAlt="Worker holding bags of landscape material at the yard"
      />
      <OwnerStorySection
        heading={<>Woman-Owned.<br/>WBE Certified.</>}
        body="Abby Montalto opened Buy The Yard in Jefferson in 2016. Certified Woman Business Enterprise by the Commonwealth of Massachusetts — a woman running a materials yard in a business that doesn't see many."
        badges={["WBE", "MASS"]}
      />
      <TestimonialsSection
        items={[
          { quote: "Best mulch around. Clean load, dropped right where I marked it.", attribution: "MARK S. · HOLDEN" },
          { quote: "They get our crews loaded and out fast. Same-day when we need it.", attribution: "GREEN LANDSCAPE INC." },
        ]}
      />
      <ContactCTASection
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}
