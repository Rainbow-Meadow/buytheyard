import { createFileRoute } from "@tanstack/react-router";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Abby — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Buy The Yard is a Massachusetts WBE-certified, woman-owned landscape supply yard in Jefferson, MA — built by Abby. Read her story.",
      },
      { property: "og:title", content: "Meet The Owner — Buy The Yard" },
      { property: "og:description", content: "Abby's story and the WBE-certified yard she built in Jefferson, MA." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-about.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-about.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/about" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Screen 1 — pageHero: Abby portrait + stat tiles */}
      <TileScreen
        layout="pageHero"
        label="About Abby and Buy The Yard"
        tiles={{
          hero: (
            <Tile
              fill
              variant="image"
              src={abbyPortrait}
              alt="Abby, owner of Buy The Yard, in Jefferson, MA"
              focal={{ x: 50, y: 30 }}
              loading="eager"
              fetchPriority="high"
              overlay={{
                eyebrow: "Meet the owner",
                title: "Built by Abby.",
                body: "Woman-owned, Jefferson-based, ten seasons in.",
                align: "bottom-left",
              }}
            />
          ),
          a: <Tile fill variant="stat" tone="surface" value="2018" label="Year founded" />,
          b: <Tile fill variant="stat" tone="brand" value="WBE" label="MA-certified woman-owned" />,
          c: <Tile fill variant="stat" tone="kraft" value="Local" label="Wachusett Regional · '16" />,
          d: <Tile fill variant="stat" tone="gray" value="5★" label="Google & Facebook rated" />,
        }}
      />

      {/* Screen 2 — section04: Story quote + yard + Charlie + visit CTA */}
      <TileScreen
        layout="section04"
        label="Our story and around the yard"
        tiles={{
          hero: (
            <Tile
              fill
              variant="quote"
              tone="surface"
              padding="lg"
              eyebrow="In her own words"
              quote="Opening this business was the perfect way to get into the industry. I found something that isn't just a job — it's something I take pride in every day."
              attribution="Abby Montalto · Owner"
            />
          ),
          a: (
            <Tile
              fill
              variant="image"
              src={yardDog}
              alt="Charlie, the Buy The Yard office manager, watching the lot from the office window"
              focal="center"
              overlay={{ eyebrow: "Office manager", title: "Charlie", align: "bottom-left" }}
            />
          ),
          b: (
            <Tile
              fill
              variant="image"
              src={yardPatio}
              alt="The Buy The Yard sit-and-stay area with Adirondack chairs and OPEN flag"
              focal="center"
              overlay={{ eyebrow: "The yard", title: "Sit-and-stay corner", align: "bottom-left" }}
            />
          ),
          c: (
            <Tile
              fill
              variant="cta"
              tone="brand"
              eyebrow="Visit"
              title="2264 Main St."
              body="Jefferson, MA. Stop by and we'll size your project on the spot."
              cta={{ label: "Contact & hours", to: "/contact" }}
            />
          ),
        }}
      />
    </>
  );
}
