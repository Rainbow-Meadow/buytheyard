import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { Tile } from "@/components/site/Tile";

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
      <section aria-label="Delivery and pickup" className="border-y border-[var(--rule)]">
        <h1 className="sr-only">Delivery and pickup across Central Massachusetts</h1>
        <div className="min-h-[420px] md:min-h-[480px] flex">
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
