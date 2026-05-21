import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardList,
  Clock,
  Mail,
  MapPin,
  Phone,
  Facebook,
} from "lucide-react";
import yardPatio from "@/assets/source/contact-hero-welcome.png";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Buy The Yard | 508-579-9897 | Jefferson, MA" },
      {
        name: "description",
        content:
          "Call 508-579-9897 or send a quote online. Stop by Buy The Yard at 2264 Main St., Jefferson, MA 01522. In-season: Mon–Fri 8a–5p, Sat 8a–3p.",
      },
      { property: "og:title", content: "Contact — Buy The Yard" },
      { property: "og:description", content: "Phone, address, hours, and the map. Jefferson, MA." },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-contact.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-contact.jpg" },
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
            "https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/",
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
      {/* Screen 1 — pageHero: call/quote CTAs + contact stat tiles */}
      <TileScreen
        layout="pageHero"
        label="Contact Buy The Yard"
        tiles={{
          hero: (
            <Tile
              id="contact-hero"
              fill
              variant="image"
              src={yardPatio}
              alt="Buy The Yard crew welcoming customers at the Jefferson, MA yard with OPEN flag and loader"
              focal="center"
              loading="eager"
              fetchPriority="high"
              overlay={{
                eyebrow: "Contact",
                title: "Call. We answer.",
                body: "Phone is fastest. Quote form for material lists. Email for the rest.",
                align: "bottom-left",
                layout: "anchored",
                anchorIcon: <Phone />,
              }}
              cta={{ label: "Start an online quote", to: "/quote" }}
            />
          ),
          a: (
            <Tile
              id="contact-phone"
              fill
              variant="cta"
              tone="brand"
              anchorIndex="02"
              icon={<Phone />}
              eyebrow="Call"
              title="508.579.9897"
              cta={{ label: "Tap to call", href: "tel:5085799897" }}
            />
          ),
          b: (
            <Tile
              id="contact-address"
              fill
              variant="cta"
              tone="surface"
              anchorIndex="03"
              icon={<MapPin />}
              eyebrow="Yard"
              title="2264 Main St."
              cta={{
                label: "Jefferson, MA · Maps",
                href: "https://maps.google.com/?q=2264+Main+St,+Jefferson,+MA+01522",
              }}
            />
          ),
          c: (
            <Tile
              id="contact-hours"
              fill
              variant="cta"
              tone="kraft"
              anchorIndex="04"
              icon={<Clock />}
              eyebrow="Hours"
              title="Mon–Sat"
              cta={{ label: "Mon–Fri 8–5 · Sat 8–3", to: "/contact" }}
            />
          ),
          d: (
            <Tile
              id="contact-fb"
              fill
              variant="cta"
              tone="gray"
              anchorIndex="05"
              icon={<Facebook />}
              eyebrow="Social"
              title="Facebook"
              cta={{
                label: "Daily restocks · Follow",
                href: "https://www.facebook.com/BuyTheYardOutdoorProducts",
              }}
            />
          ),
        }}
      />

      {/* Screen 2 — section03: Map + quote/email tiles */}
      <TileScreen
        layout="section03"
        label="Map, quote, and email"
        tiles={{
          hero: (
            <article className="relative h-full w-full overflow-hidden rounded-md ring-1 ring-zinc-300 bg-kraft">
              <iframe
                title="Buy The Yard location map"
                src="https://www.google.com/maps?q=2264+Main+St,+Jefferson,+MA+01522&output=embed"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </article>
          ),
          a: (
            <Tile
              id="contact-quote"
              fill
              variant="cta"
              tone="surface"
              anchorIndex="06"
              icon={<ClipboardList />}
              eyebrow="Online"
              title="Get a quote"
              body="Best for material lists — send products, town, and timing."
              cta={{ label: "Start a request", to: "/quote" }}
            />
          ),
          b: (
            <Tile
              id="contact-email"
              fill
              variant="cta"
              tone="kraft"
              anchorIndex="07"
              icon={<Mail />}
              eyebrow="Email · non-urgent"
              title="abby@btymaterial.com"
              cta={{ label: "Send an email", href: "mailto:abby@btymaterial.com" }}
            />
          ),
          c: (
            <Tile
              id="contact-vm"
              fill
              variant="text"
              tone="gray"
              anchorIndex="08"
              icon={<Phone />}
              eyebrow="Heads up"
              title="Voicemail returned same day"
              body="Yard cell is spotty — leave a message."
            />
          ),
        }}
      />
    </>
  );
}
