import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { categories, products } from "@/data/products";
import { type TileBlock } from "@/components/site/Tile";
import { ProductCatalogIntro } from "@/components/products/ProductCatalogIntro";
import { ProductBuyingGuide, ProductQuantityGuide } from "@/components/products/ProductBuyingGuide";
import { ProductProjectGuide } from "@/components/products/ProductProjectGuide";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";

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
  const categorySlides: TileBlock[] = [];
  for (const cat of categories) {
    const items = products.filter((p) => p.category === cat);
    if (items.length === 0) continue;
    const featured = items.find((p) => !!p.image) ?? items[0];
    const names = items.map((p) => p.name);
    const preview =
      names.length <= 4
        ? names.join(" · ")
        : `${names.slice(0, 3).join(" · ")} · +${names.length - 3} more`;
    categorySlides.push({
      id: `cat-${cat}`,
      variant: "image",
      src: featured.image ?? "",
      alt: `${cat} — ${featured.name}`,
      focal: "center",
      loading: "eager",
      overlay: {
        eyebrow: `${cat} · ${items.length} option${items.length === 1 ? "" : "s"}`,
        title: featured.name,
        body: preview,
        align: "bottom-left",
        layout: "anchored",
        anchorIcon: <Layers />,
      },
      cta: { label: "Call for today's price", href: "tel:5085799897" },
    });
  }

  return (
    <>
      <ProductCatalogIntro categorySlides={categorySlides} />

      <ProductImageGallery categorySlides={categorySlides} />

      <ProductBuyingGuide />

      <ProductProjectGuide />

      <ProductQuantityGuide />
    </>
  );
}
