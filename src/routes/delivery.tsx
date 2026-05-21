import { createFileRoute } from "@tanstack/react-router";
import { Box, Clock, CreditCard, Home, MapPin, Phone, Target, Truck, Warehouse } from "lucide-react";
import loadingTruck from "@/assets/source/delivery-hero-truck.png";
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
                layout: "anchored",
                anchorIcon: <Truck />,
              }}
              cta={{ label: "Get a quote", to: "/quote" }}
            />
          ),
          a: <Tile id="dlv-stat-radius" fill variant="stat" tone="surface" layout="anchored" anchorIndex="01" anchorGlyph={<MapPin strokeWidth={1.25} />} value="~25 mi" label="Service radius" />,
          b: <Tile id="dlv-stat-min" fill variant="stat" tone="brand" layout="anchored" anchorIndex="02" anchorGlyph={<Box strokeWidth={1.25} />} value="1 yd" label="Order minimum" />,
          c: <Tile id="dlv-stat-lead" fill variant="stat" tone="kraft" layout="anchored" anchorIndex="03" anchorGlyph={<Clock strokeWidth={1.25} />} value="~48 hr" label="Typical lead time" />,
          d: <Tile id="dlv-stat-drop" fill variant="stat" tone="gray" layout="anchored" anchorIndex="04" anchorGlyph={<Truck strokeWidth={1.25} />} value="Curb" label="Driveway drop" />,
        }}
      />

      {/* Screen 2 — section01: rules + payment + call CTA */}
      <TileScreen
        layout="section01"
        label="How a delivery works"
        tiles={{
          hero: (
            <Tile
              id="dlv-rule-1"
              fill
              variant="numbered"
              tone="surface"
              layout="anchored"
              number="01"
              icon={<Phone />}
              eyebrow="Call it in"
              title="Call by noon for same-day."
              body="One quick call locks your drop — material, address, where to put it."
            />
          ),
          a: (
            <Tile
              id="dlv-rule-2"
              fill
              variant="numbered"
              tone="kraft"
              layout="anchored"
              number="02"
              icon={<Target />}
              eyebrow="Mark the spot"
              title="A tarp or cone is all we need."
            />
          ),
          b: (
            <Tile
              id="dlv-rule-3"
              fill
              variant="numbered"
              tone="white"
              layout="anchored"
              number="03"
              icon={<Home />}
              eyebrow="Where we drop"
              title="Driveway or curbline only."
            />
          ),
          c: (
            <Tile
              id="dlv-payment"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              anchorIndex="03"
              icon={<CreditCard />}
              eyebrow="Payment"
              title="Cash, check, or card (+4%)."
            />
          ),
          d: (
            <Tile
              id="dlv-pickup"
              fill
              variant="text"
              tone="gray"
              layout="anchored"
              anchorIndex="04"
              icon={<Warehouse />}
              eyebrow="Prefer pickup?"
              title="Bring a truck, no appt."
            />
          ),
          e: (
            <Tile
              id="dlv-cta-call"
              fill
              variant="cta"
              tone="brand"
              anchorIndex="06"
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
