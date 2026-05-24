import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Mulch, Loam, Sand & Stone | Buy The Yard" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand, gravel, specialty stone, garden center materials, and project guidance from Buy The Yard in Jefferson, MA.",
      },
      { property: "og:title", content: "Products — Buy The Yard" },
      {
        property: "og:description",
        content:
          "Find the right bulk material, estimate how much you need, and ask Abby before you order.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return <main aria-label="Products" />;
}
