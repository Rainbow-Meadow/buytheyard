import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, Phone, Truck } from "lucide-react";
import { categories, products } from "@/data/products";
import { TileScreen } from "@/components/site/TileScreen";
import { Tile, type TileBlock } from "@/components/site/Tile";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Mulch, Loam, Sand & Stone | Buy The Yard" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand, gravel, specialty stone, plus garden center and ASTM playground chips. Pickup or delivery from Jefferson, MA.",
      },
      { property: "og:title", content: "Products — Buy The Yard" },
      {
        property: "og:description",
        content: "Bulk landscape materials. By the yard. Pickup or delivery in Central Mass.",
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
        index: "01",
      },
      cta: { label: "Call for today's price", href: "tel:5085799897" },
    });
  }

  return (
    <TileScreen
      layout="section02"
      label="Materials catalog"
      tiles={{
        hero: (
          <Tile
            id="products-carousel"
            fill
            variant="carousel"
            ariaLabel="Browse materials by category"
            slides={categorySlides}
            controls="both"
          />
        ),
        a: (
          <Tile
            id="products-call"
            fill
            variant="cta"
            tone="brand"

            icon={<Phone />}
            anchorIndex="02"
            eyebrow="Today's price by phone"
            title="Materials. By the yard."
            body="Seasonal pricing — one call sizes the project and locks the number."
            cta={{ label: "508.579.9897", href: "tel:5085799897" }}
          />
        ),
        b: (
          <Tile
            id="products-delivery"
            fill
            variant="cta"
            tone="surface"

            icon={<Truck />}
            anchorIndex="03"
            eyebrow="Delivery"
            title="Curbside delivery."
            cta={{ label: "Delivery details", to: "/delivery" }}
          />
        ),
        c: (
          <Tile
            id="products-quote"
            fill
            variant="cta"
            tone="kraft"

            icon={<HelpCircle />}
            anchorIndex="04"
            eyebrow="Quote"
            title="Build a list in 60 seconds."
            cta={{ label: "Start a quote", to: "/quote" }}
          />
        ),
      }}
    />
  );
}
