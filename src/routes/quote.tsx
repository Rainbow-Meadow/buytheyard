import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Build a quote in under a minute. Send it straight to Abby — by email or text. Pickup or delivery in Central MA.",
      },
      { property: "og:title", content: "Get a Quote — Buy The Yard" },
      {
        property: "og:description",
        content: "Tell us what you need. We come back with pricing and a delivery window.",
      },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/quote" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  return <main aria-label="Quote" />;
}
