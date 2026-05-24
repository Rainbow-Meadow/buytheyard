import { createFileRoute } from "@tanstack/react-router";
import { Box, Clock, CreditCard, Home, MapPin, Phone, Target, Truck, Warehouse } from "lucide-react";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Pickup — Central MA | Buy The Yard" },
      {
        name: "description",
        content:
          "Bulk material pickup and curbside delivery from Jefferson, MA. 1-yard minimum, 48 hours is best, driveway or curbline drop only. Call 508-579-9897.",
      },
      { property: "og:title", content: "Delivery & Pickup — Buy The Yard" },
      {
        property: "og:description",
        content: "How pickup and delivery work before the truck leaves the Jefferson yard.",
      },
      { property: "og:url", content: "/delivery" },
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
      <TileScreen
        layout="pageHero"
        label="Delivery and pickup"
        heading="Delivery and pickup across Central Massachusetts"
        headingLevel="h1"
        tiles={{
          hero: (
            <Tile
              id="delivery-hero"
              fill
              variant="cta"
              tone="surface"
              layout="anchored"
              icon={<Truck />}
              eyebrow="Delivery & pickup"
              title="Get the material without the surprise."
              body="Abby confirms the town, quantity, timing, and drop spot before the truck leaves Jefferson."
              cta={{ label: "Start a quote", to: "/quote" }}
            />
          ),
          a: <Tile id="dlv-stat-radius" fill variant="stat" tone="surface" layout="anchored" anchorIndex="01" anchorGlyph={<MapPin strokeWidth={1.25} />} value="Central" label="Mass delivery" caption="From Jefferson" />,
          b: <Tile id="dlv-stat-min" fill variant="stat" tone="brand" layout="anchored" anchorIndex="02" anchorGlyph={<Box strokeWidth={1.25} />} value="1 yd" label="Order minimum" caption="Per delivery" />,
          c: <Tile id="dlv-stat-lead" fill variant="stat" tone="kraft" layout="anchored" anchorIndex="03" anchorGlyph={<Clock strokeWidth={1.25} />} value="48 hr" label="Best timing" caption="Same-day if route allows" />,
          d: <Tile id="dlv-stat-drop" fill variant="stat" tone="gray" layout="anchored" anchorIndex="04" anchorGlyph={<Truck strokeWidth={1.25} />} value="Curb" label="Driveway drop" caption="Mark the spot" />,
        }}
      />

      <TileScreen
        layout="section01"
        label="How to make delivery easy"
        heading="How to make delivery easy"
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
              eyebrow="Start with the call"
              title="Tell us the town, material, and rough amount."
              body="If timing matters, phone is fastest. If you already have the list, the quote form works too."
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
              title="A tarp, cone, bucket, or note is perfect."
              body="A clear marker keeps the drop simple, especially if you are not home."
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
              body="Loaded trucks can damage lawns and underground utilities, so we keep the truck on solid access."
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
              title="Cash or check keeps costs down."
              body="Cards are accepted with a 4% convenience fee."
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
              title="Bring a truck during yard hours."
              body="Stop in for mulch, loam, sand, or stone pickup during regular hours."
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
              eyebrow="Unsure about access?"
              title="Ask before the truck rolls."
              body="A quick call can prevent the wrong material, wrong spot, or an awkward second trip."
              cta={{ label: "508.579.9897", href: "tel:5085799897" }}
            />
          ),
        }}
      />
    </>
  );
}
