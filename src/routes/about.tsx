import { createFileRoute } from "@tanstack/react-router";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";
import { Hammer, Calendar, BadgeCheck, GraduationCap, Star, Quote, Dog, Armchair, MapPin } from "lucide-react";

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
        heading="About Abby and Buy The Yard"
        headingLevel="h1"
        tiles={{
          hero: (
            <Tile
              id="about-hero"
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
                layout: "anchored",
                anchorIcon: <Hammer />,
              }}
            />
          ),
          a: <Tile id="about-stat-year" fill variant="stat" tone="surface" layout="anchored" anchorIndex="01" anchorGlyph={<Calendar strokeWidth={1.25} />} value="2018" label="Year founded" />,
          b: <Tile id="about-stat-wbe" fill variant="stat" tone="brand" layout="anchored" anchorIndex="02" anchorGlyph={<BadgeCheck strokeWidth={1.25} />} value="WBE" label="MA-certified woman-owned" />,
          c: <Tile id="about-stat-local" fill variant="stat" tone="kraft" layout="anchored" anchorIndex="03" anchorGlyph={<GraduationCap strokeWidth={1.25} />} value="Local" label="Wachusett Regional · '16" />,
          d: <Tile id="about-stat-stars" fill variant="stat" tone="gray" layout="anchored" anchorIndex="04" anchorGlyph={<Star strokeWidth={1.25} />} value="5★" label="Google & Facebook rated" />,
        }}
      />

      {/* Screen 2 — section04: Story quote + yard + Charlie + visit CTA */}
      <TileScreen
        layout="section04"
        label="Our story and around the yard"
        heading="Our story and around the yard"
        tiles={{
          hero: (
            <Tile
              id="about-quote"
              fill
              variant="quote"
              tone="surface"
              layout="anchored"
              anchorIcon={<Quote />}
              eyebrow="In her own words"
              quote="I found something that isn't just a job — it's something I take pride in every day."
              attribution="Abby Montalto · Owner"
            />
          ),
          a: (
            <Tile
              id="about-charlie"
              fill
              variant="image"
              src={yardDog}
              alt="Charlie, the Buy The Yard office manager, watching the lot from the office window"
              focal={{ x: 50, y: 25 }}
              overlay={{ eyebrow: "Office manager", title: "Charlie", align: "bottom-left", layout: "anchored", anchorIcon: <Dog /> }}
            />
          ),
          b: (
            <Tile
              id="about-patio"
              fill
              variant="image"
              src={yardPatio}
              alt="The Buy The Yard sit-and-stay area with Adirondack chairs and OPEN flag"
              focal="center"
              overlay={{ eyebrow: "The yard", title: "Sit-and-stay corner", align: "bottom-left", layout: "anchored", anchorIcon: <Armchair /> }}
            />
          ),
          c: (
            <Tile
              id="about-visit"
              fill
              variant="cta"
              tone="brand"
              anchorIndex="04"
              icon={<MapPin />}
              eyebrow="Visit"
              title="2264 Main St."
              body="Jefferson, MA. Stop by anytime."
              cta={{ label: "Contact & hours", to: "/contact" }}
            />
          ),
        }}
      />
    </>
  );
}
