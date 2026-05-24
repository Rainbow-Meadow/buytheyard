import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet Abby Montalto — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Meet Abby Montalto, owner of Buy The Yard — a woman-owned, MA WBE-certified materials yard in Jefferson, MA with Central Mass construction roots.",
      },
      { property: "og:title", content: "Meet Abby — Buy The Yard" },
      {
        property: "og:description",
        content:
          "The story behind Buy The Yard: Abby Montalto, family construction roots, WBE certification, and a Jefferson yard built on practical help.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <main aria-label="About" />;
}
