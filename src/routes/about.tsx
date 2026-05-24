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
      { title: "Meet Abby Montalto — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Meet Abby Montalto, owner of Buy The Yard — a woman-owned, MA WBE-certified materials yard in Jefferson, MA with Central Mass construction roots.",
      },
      { property: "og:title", content: "Meet Abby — Buy The Yard" },
      {
        property: "og:description",
        content:
          "The story behind Buy The Yard: Abby Montalto, family construction roots, WBE certification, and a Jefferson yard built on practical help.",
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
        meta="ABOUT — EST. 2016"
        heading={<>Meet Abby.<br/>Meet The Yard.</>}
        body="Buy The Yard is a woman-owned, WBE-certified materials yard in Jefferson, MA. Built on Central Mass construction roots and a customer-first way of working."
        ctaLabel="Visit The Yard"
        ctaTo="/contact"
        image={workerHoldingBagsOfLandscapeMaterial}
        imageAlt="Worker holding bags of landscape material at the yard"
      />
      <OwnerStorySection
        heading={<>WBE Certified<br/>Woman-Owned</>}
        body="Founded by Abby Montalto in 2016, Buy The Yard is a certified Woman Business Enterprise by the Commonwealth of Massachusetts. We bring a professional, customer-first approach to a heavy industry."
        badges={["WBE", "MASS"]}
      />
      <TestimonialsSection
        items={[
          { quote: "The best mulch in Central Mass. Clean, consistent, and delivered exactly where I needed it.", attribution: "MARK S. / RESIDENTIAL" },
          { quote: "Reliable logistics for our commercial landscape crews. They understand the urgency of site work.", attribution: "GREEN LANDSCAPE INC." },
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
