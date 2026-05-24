import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  OwnerStorySection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";

export const Route = createFileRoute("/wbe")({
  head: () => ({
    meta: [
      { title: "What WBE Certification Means — Buy The Yard" },
      {
        name: "description",
        content:
          "Buy The Yard is a Massachusetts WBE — certified by the MA Supplier Diversity Office (MassUCP). MA Home Improvement Contractor #214009 · USDOT #3543587.",
      },
      { property: "og:title", content: "Certified Woman-Owned (WBE) — Buy The Yard" },
      {
        property: "og:description",
        content:
          "Massachusetts-certified Women Business Enterprise. What WBE is, how certification works, and why it matters.",
      },
      { property: "og:url", content: "/wbe" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/wbe" }],
  }),
  component: WbePage,
});

function WbePage() {
  return (
    <main aria-label="WBE certification" className="font-barlow">
      <HeroSection
        meta="WBE — CERTIFIED"
        heading={<>Certified<br/>Woman-Owned.</>}
        body="Buy The Yard is a Massachusetts WBE, certified by the MA Supplier Diversity Office (MassUCP). MA HIC #214009 · USDOT #3543587."
        ctaLabel="Talk To Abby"
        ctaTo="/contact"
      />
      <OwnerStorySection
        heading={<>What WBE<br/>Means Here</>}
        body="WBE certification means an independent agency has verified that this business is at least 51% owned, operated, and controlled by a woman. For public agencies and large contractors with diversity goals, it's a direct way to source from a qualified woman-owned supplier."
        badges={["WBE", "MASS"]}
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
