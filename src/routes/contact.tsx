import { createFileRoute } from "@tanstack/react-router";
import {
  HeroSection,
  ContactFormSection,
  ContactCTASection,
} from "@/components/site/sections/archetypes";
import contactHero from "@/assets/contact-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Buy The Yard · 508-579-9897 · Jefferson, MA" },
      {
        name: "description",
        content:
          "Call 508-579-9897, send a quote, or pull in at 2264 Main St. (122A) in Jefferson, MA. Phone is fastest when timing matters.",
      },
      { property: "og:title", content: "Contact — Buy The Yard" },
      { property: "og:description", content: "Phone, address, hours, and directions to the yard on 122A in Jefferson, MA." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main aria-label="Contact" className="font-barlow">
      <HeroSection
        meta="CONTACT"
        heading={<>Talk To Abby.<br/>Same Day.</>}
        body="Phone's fastest when timing matters. The form lands in the same inbox — send what you need and we'll come back with pricing and a window."
        ctaLabel="Call 508.579.9897"
        ctaHref="tel:5085799897"
        image={contactHero}
        imageAlt="The Buy The Yard storefront in Jefferson, MA with flowers, patio furniture, and the open flag"
      />
      <ContactFormSection
        heightClass="md:h-[calc(75svh-3rem)]"
        heading={<>Send A Note</>}
        body="Tell us what you're working on. Quotes get a same-day reply during yard hours."
        email="abby@btymaterial.com"
        phone="508.579.9897"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        hours={[
          { label: "Mon – Fri", value: "8:00am – 5:00pm" },
          { label: "Saturday", value: "8:00am – 3:00pm" },
          { label: "Sunday", value: "Closed" },
        ]}
      />
      <ContactCTASection
        heightClass="md:h-[calc(25svh-1rem)]"
        accentWidth="md:w-2/5"
        phone="508.579.9897"
        email="abby@btymaterial.com"
        address={{ line1: "2264 Main St.", line2: "Jefferson, MA 01522" }}
        primaryHref="/quote"
      />
    </main>
  );
}
