import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Phone, Truck, Warehouse } from "lucide-react";
import loadingTruck from "@/assets/source/loading-truck.webp";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Pickup — Central MA | Buy The Yard" },
      {
        name: "description",
        content:
          "Curbside bulk delivery from Jefferson, MA to Holden, Worcester, Princeton, Sterling & nearby. 1-yard minimum. Call 508-579-9897.",
      },
      { property: "og:title", content: "Delivery & Pickup — Buy The Yard" },
      {
        property: "og:description",
        content: "Two ways to get your material from the Jefferson, MA yard.",
      },
      { property: "og:url", content: "/delivery" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-delivery.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-delivery.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/delivery" },
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  return (
    <>
      {/* Screen 1 — pageHero: loading-truck image + delivery stat tiles */}
      <TileScreen
        layout="pageHero"
        label="Delivery and pickup"
        tiles={{
          hero: (
            <Tile
              id="delivery-hero"
              fill
              variant="image"
              src={loadingTruck}
              alt="Loader filling a delivery truck at the Buy The Yard lot"
              focal="center"
              loading="eager"
              fetchPriority="high"
              overlay={{
                eyebrow: "Delivery & pickup",
                title: "You call. We deliver.",
                body: "Curbside from Jefferson across Central Mass. Call before noon for same-day.",
                align: "bottom-left",
              }}
              cta={{ label: "Get a quote", to: "/quote" }}
            />
          ),
          a: <Tile id="dlv-stat-radius" fill variant="stat" tone="surface" value="~25 mi" label="Service radius" />,
          b: <Tile id="dlv-stat-min" fill variant="stat" tone="brand" value="1 yd" label="Order minimum" />,
          c: <Tile id="dlv-stat-lead" fill variant="stat" tone="kraft" value="~48 hr" label="Typical lead time" />,
          d: <Tile id="dlv-stat-drop" fill variant="stat" tone="gray" value="Curb" label="Driveway drop" />,
        }}
      />

      {/* Screen 2 — section01: rules + payment + call CTA */}
      <TileScreen
        layout="section01"
        label="What to know before delivery"
        tiles={{
          hero: (
            <Tile
              id="dlv-rule-1"
              fill
              variant="numbered"
              tone="surface"

              number="01"
              icon={<Truck />}
              eyebrow="Drop standard"
              title="Driveway-to-curbline only."
              body="Drop on driveway or curbline — keeps lawn and lines safe."
            />
          ),
          a: (
            <Tile
              id="dlv-rule-2"
              fill
              variant="numbered"
              tone="kraft"
              number="02"
              eyebrow="Timing"
              title="Call before noon for same-day."
              body="Otherwise plan on about 48 hours."
            />
          ),
          b: (
            <Tile
              id="dlv-rule-3"
              fill
              variant="numbered"
              tone="white"
              number="03"
              eyebrow="Mark your spot"
              title="Tarp, bucket, or cone."
              body="We'll put the pile right there."
            />
          ),
          c: (
            <Tile
              id="dlv-pickup"
              fill
              variant="text"
              tone="gray"
              icon={<Warehouse />}
              eyebrow="04 · Pickup"
              title="Bring a truck"
              body="No appointment. We load when you pull in. Mon–Fri 8a–5p · Sat 8a–3p."
            />
          ),
          d: (
            <Tile
              id="dlv-payment"
              fill
              variant="text"
              tone="kraft"
              icon={<CreditCard />}
              eyebrow="05 · Payment"
              title="4% card fee — pass-through"
              body="Cash and check skip the surcharge."
            />
          ),
          e: (
            <Tile
              id="dlv-cta-call"
              fill
              variant="cta"
              tone="brand"
              icon={<Phone />}
              eyebrow="Need a quote?"
              title="Talk to Abby"
              cta={{ label: "508.579.9897", href: "tel:5085799897" }}
            />
          ),
        }}
      />
    </>
  );
}
