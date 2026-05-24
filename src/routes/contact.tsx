import { createFileRoute } from "@tanstack/react-router";

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
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <main aria-label="Contact" />;
}
