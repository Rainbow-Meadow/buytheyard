import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCatalogIntro } from "@/components/products/ProductCatalogIntro";
import { ProductBuyingGuide, ProductQuantityGuide } from "@/components/products/ProductBuyingGuide";
import { ProductProjectGuide } from "@/components/products/ProductProjectGuide";

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
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-products.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-products.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/products" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Buy The Yard — Materials Catalog",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              category: p.category,
              brand: { "@type": "Brand", name: "Buy The Yard" },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                seller: { "@type": "LocalBusiness", name: "Buy The Yard" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  description: "Call 508-579-9897 for today's price",
                },
              },
            },
          })),
        }),
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <ProductCatalogIntro />

      <ProductBuyingGuide />

      <ProductProjectGuide />

      <ProductQuantityGuide />
    </>
  );
}
