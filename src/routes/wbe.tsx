import { createFileRoute } from "@tanstack/react-router";

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
  return <main aria-label="WBE certification" />;
}
