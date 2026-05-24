import { createFileRoute } from "@tanstack/react-router";

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
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/delivery" }],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  return <main aria-label="Delivery" />;
}
