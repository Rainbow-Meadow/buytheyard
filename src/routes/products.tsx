import { createFileRoute } from "@tanstack/react-router";
import {
  Flower2,
  HelpCircle,
  Home,
  Layers,
  MapPin,
  Mountain,
  Phone,
  Sprout,
  TreePine,
  Truck,
} from "lucide-react";
import { categories, products } from "@/data/products";
import { TileScreen } from "@/components/site/TileScreen";
import { Tile, type TileBlock } from "@/components/site/Tile";
import { ProductBuyingGuide, ProductQuantityGuide } from "@/components/products/ProductBuyingGuide";

const projectGuides = [
  {
    id: "beds",
    icon: <TreePine />,
    eyebrow: "Flower beds",
    title: "Fresh mulch, less guessing.",
    body: "Most bed refreshes use 2–3 inches. Tell Abby the bed size and color you like, and she’ll help dial in the yards.",
  },
  {
    id: "lawn",
    icon: <Sprout />,
    eyebrow: "Lawn repair",
    title: "Loam for seed, grading, and patching.",
    body: "Screened loam is the usual starting point for thin spots, new lawn areas, and small re-grades.",
  },
  {
    id: "driveway",
    icon: <Truck />,
    eyebrow: "Driveways & drainage",
    title: "Use angular stone where it needs to lock in.",
    body: "Crushed blue stone is the workhorse for driveways, drainage trenches, and base layers that need structure.",
  },
  {
    id: "walkways",
    icon: <Mountain />,
    eyebrow: "Walkways & edges",
    title: "Choose the stone by look and feel.",
    body: "Pea stone, river stone, and decorative rock all behave differently underfoot. Photos help, but a call helps more.",
  },
  {
    id: "garden",
    icon: <Flower2 />,
    eyebrow: "Garden center",
    title: "Seasonal color changes fast.",
    body: "Baskets, annuals, mums, pumpkins, and plant mix move with the weather. Call if you’re after something specific.",
  },
];

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
      <TileScreen
        layout="section02"
        label="Materials catalog"
        heading="Materials catalog — mulch, loam, sand, and stone"
        headingLevel="h1"
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
              title="Tell Abby what you’re working on."
              body="One call helps match the material, rough quantity, and delivery plan."
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
              title="Check the rules before you order."
              body="1-yard minimum, driveway or curbline drop, and 48 hours is best."
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
              title="Build a list, even if it’s rough."
              body="Abby can confirm the quantity before anything leaves the yard."
              cta={{ label: "Start a quote", to: "/quote" }}
            />
          ),
        }}
      />

      <ProductBuyingGuide />

      <TileScreen
        layout="section01"
        label="Shop by project"
        heading="Shop by project — start with what you’re fixing"
        tiles={{
          hero: (
            <Tile
              id="project-hero"
              fill
              variant="text"
              tone="surface"
              layout="anchored"
              icon={<Home />}
              eyebrow="Not sure which material?"
              title="Start with the project."
              body="Most people do not wake up needing “three yards of something.” They need a cleaner bed, a better lawn, a driveway that drains, or stone that looks right. Start there and Abby can help with the rest."
              cta={{ label: "Send the project to Abby", to: "/quote" }}
            />
          ),
          ...Object.fromEntries(
            projectGuides.map((guide, i) => [
              ["a", "b", "c", "d", "e"][i],
              (
                <Tile
                  key={guide.id}
                  id={`project-${guide.id}`}
                  fill
                  variant="text"
                  tone={i % 2 === 0 ? "kraft" : "white"}
                  layout="anchored"
                  anchorIndex={String(i + 1).padStart(2, "0")}
                  icon={guide.icon}
                  eyebrow={guide.eyebrow}
                  title={guide.title}
                  body={guide.body}
                />
              ),
            ]),
          ),
        }}
      />

      <ProductQuantityGuide />
    </>
  );
}
