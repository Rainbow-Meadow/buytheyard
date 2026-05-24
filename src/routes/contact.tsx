import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Tile } from "@/components/site/Tile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Buy The Yard | 508-579-9897 | Jefferson, MA" },
      {
        name: "description",
        content:
          "Call 508-579-9897, send a quote request, or stop by Buy The Yard at 2264 Main St., Jefferson, MA. Phone is fastest when timing matters.",
      },
      { property: "og:title", content: "Contact — Buy The Yard" },
      { property: "og:description", content: "Phone, address, hours, quote request, and map for the Jefferson yard." },
      { property: "og:url", content: "/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/contact" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Buy The Yard",
          telephone: "+1-508-579-9897",
          email: "abby@btymaterial.com",
          sameAs: [
            "https://www.facebook.com/BuyTheYardOutdoorProducts",
            "https://www.yelp.com/biz/buy-the-yard-holden",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "2264 Main St.",
            addressLocality: "Jefferson",
            addressRegion: "MA",
            postalCode: "01522",
            addressCountry: "US",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "15:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "00:00", closes: "00:00" },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section aria-label="Contact Buy The Yard" className="border-y border-[var(--rule)]">
        <h1 className="sr-only">Contact Buy The Yard</h1>
        <div className="min-h-[420px] md:min-h-[480px] flex">
          <Tile
            id="contact-hero"
            fill
            variant="cta"
            tone="surface"
            layout="anchored"
            icon={<Phone />}
            eyebrow="Contact"
            title="Call when you need a real answer."
            body="Phone is fastest for price, timing, quantity, and delivery questions. The quote form is best when you already have a material list."
            cta={{ label: "Start an online quote", to: "/quote" }}
          />
        </div>
      </section>

      <section aria-label="Section placeholder" className="border-b border-[var(--rule)]">
        <div className="container mx-auto px-5 md:px-10 py-24 md:py-32">
          <p className="eyebrow text-zinc-500">Next section</p>
          <p className="body-sm text-zinc-500 mt-2">Empty — build from here.</p>
        </div>
      </section>
    </>
  );
}
