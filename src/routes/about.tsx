import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Calendar,
  ClipboardCheck,
  Dog,
  GraduationCap,
  Hammer,
  HardHat,
  HeartHandshake,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Truck,
} from "lucide-react";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

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
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-about.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <TileScreen
        layout="pageHero"
        label="Meet Abby and Buy The Yard"
        heading="Meet Abby Montalto and Buy The Yard"
        headingLevel="h1"
        tiles={{
          hero: (
            <Tile
              id="about-hero"
              fill
              variant="image"
              src={abbyPortrait}
              alt="Abby Montalto, owner of Buy The Yard in Jefferson, MA"
              focal={{ x: 50, y: 30 }}
              loading="eager"
              fetchPriority="high"
              overlay={{
                eyebrow: "Meet Abby Montalto",
                title: "Built by Abby. Run from Jefferson.",
                body: "A woman-owned materials yard with family construction roots and practical answers before the truck rolls.",
                align: "bottom-left",
                layout: "anchored",
                anchorIcon: <Hammer />,
              }}
            />
          ),
          a: (
            <Tile
              id="about-stat-year"
              fill
              variant="stat"
              tone="surface"
              layout="anchored"
              anchorIndex="01"
              anchorGlyph={<Calendar strokeWidth={1.25} />}
              value="2016"
              label="Year founded"
              caption="Jefferson yard"
            />
          ),
          b: (
            <Link
              to="/wbe"
              aria-label="What WBE certification means"
              className="block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Tile
                id="about-stat-wbe"
                fill
                variant="stat"
                tone="brand"
                layout="anchored"
                anchorIndex="02"
                anchorGlyph={<BadgeCheck strokeWidth={1.25} />}
                value="WBE"
                label="MA-certified woman-owned"
                caption="What this means →"
              />
            </Link>
          ),
          c: (
            <Tile
              id="about-stat-local"
              fill
              variant="stat"
              tone="kraft"
              layout="anchored"
              anchorIndex="03"
              anchorGlyph={<GraduationCap strokeWidth={1.25} />}
              value="Local"
              label="Wachusett ’16"
              caption="Built while studying business"
            />
          ),
          d: (
            <Tile
              id="about-stat-help"
              fill
              variant="stat"
              tone="gray"
              layout="anchored"
              anchorIndex="04"
              anchorGlyph={<Phone strokeWidth={1.25} />}
              value="Call"
              label="Direct answers"
              caption="508.579.9897"
            />
          ),
        }}
      />

      <TileScreen
        layout="section01"
        label="The Abby story"
        heading="The Abby story"
        tiles={{
          hero: (
            <Tile
              id="about-story-main"
              fill
              variant="text"
              tone="surface"
              layout="anchored"
              icon={<Hammer />}
              eyebrow="The short version"
              title="She grew up around the work. Then she built the yard."
              body="Abby grew up outside around trucks, equipment, and material work. While studying Entrepreneurship & Small Business, she turned that hands-on background into Buy The Yard: a Jefferson materials yard built for homeowners, landscapers, contractors, schools, and town projects across Central Mass."
              cta={{ label: "Ask Abby what to order", to: "/quote" }}
            />
          ),
          a: (
            <Tile
              id="about-story-school"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              anchorIndex="01"
              icon={<GraduationCap />}
              eyebrow="Local start"
              title="Wachusett Regional → business school → the yard."
              body="The story is local, not imported: school here, work here, and a business built around the Central Mass jobs she already understood."
            />
          ),
          b: (
            <Tile
              id="about-story-phone"
              fill
              variant="text"
              tone="white"
              layout="anchored"
              anchorIndex="02"
              icon={<Phone />}
              eyebrow="How she runs it"
              title="Direct answers beat guesswork."
              body="If you are unsure about material, quantity, timing, or the drop spot, call. The point is to get it right before anything leaves the yard."
            />
          ),
          c: (
            <Tile
              id="about-story-wbe"
              fill
              variant="cta"
              tone="brand"
              anchorIndex="03"
              icon={<BadgeCheck />}
              eyebrow="Certified"
              title="Woman-owned and WBE-certified."
              body="A local yard with credentials that matter for public, school, contractor, and supplier-diversity work."
              cta={{ label: "What WBE means", to: "/wbe" }}
            />
          ),
          d: (
            <Tile
              id="about-story-quote"
              fill
              variant="quote"
              tone="gray"
              layout="anchored"
              anchorIcon={<Quote />}
              eyebrow="In Abby’s words"
              quote="I found something that isn't just a job — it's something I take pride in every day."
              attribution="Abby Montalto · Owner"
            />
          ),
        }}
      />

      <TileScreen
        layout="section02"
        label="Family roots and working-yard proof"
        heading="Family roots and working-yard proof"
        tiles={{
          hero: (
            <Tile
              id="about-roots-main"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              icon={<HardHat />}
              eyebrow="Central Mass roots"
              title="A materials yard built on construction know-how."
              body="Buy The Yard sits in a working Jefferson lot with deep family ties to Central Mass construction. That matters because material is not just a product — it has to fit the job, the route, and the place it gets dropped."
            />
          ),
          a: (
            <Tile
              id="about-roots-family"
              fill
              variant="text"
              tone="surface"
              layout="anchored"
              anchorIndex="01"
              icon={<Truck />}
              eyebrow="Family business"
              title="Callahan & Montalto Site Construction"
              body="Abby’s father Tim runs CMSC from the same yard — excavation, utilities, and site work out back."
            />
          ),
          b: (
            <Tile
              id="about-roots-yard"
              fill
              variant="text"
              tone="white"
              layout="anchored"
              anchorIndex="02"
              icon={<MapPin />}
              eyebrow="One lot, two trades"
              title="2264 Main St."
              body="Materials out front. Site work out back. The yard is built around real jobs, not showroom language."
            />
          ),
          c: (
            <Tile
              id="about-roots-licensed"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              anchorIndex="03"
              icon={<ShieldCheck />}
              eyebrow="Working credentials"
              title="Licensed, registered, and ready for real projects."
              body="Buy The Yard carries MA HIC #214009 and USDOT #3543587, with WBE certification for woman-owned work."
            />
          ),
        }}
      />

      <TileScreen
        layout="section03Stacked"
        label="How customers get help"
        heading="How customers get help"
        tiles={{
          hero: (
            <Tile
              id="about-help-main"
              fill
              variant="text"
              tone="surface"
              layout="anchored"
              icon={<ClipboardCheck />}
              eyebrow="How the yard helps"
              title="Not sure what to order? Start with what you’re fixing."
              body="A bed refresh, lawn patch, driveway repair, drainage trench, or walkway all start with different material questions. Bring the project, rough measurements, and town — Abby can help turn that into a material list."
              cta={{ label: "Shop by project", to: "/products" }}
            />
          ),
          a: (
            <Tile
              id="about-help-material"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              anchorIndex="01"
              icon={<Hammer />}
              eyebrow="Material"
              title="Mulch, loam, sand, stone, and seasonal yard stock."
              body="The catalog is useful. The conversation is better when you are choosing between close options."
            />
          ),
          b: (
            <Tile
              id="about-help-delivery"
              fill
              variant="text"
              tone="white"
              layout="anchored"
              anchorIndex="02"
              icon={<Truck />}
              eyebrow="Delivery"
              title="Driveway or curbline, marked clearly."
              body="A tarp, bucket, cone, or note helps the driver put the pile where you actually want it."
            />
          ),
          c: (
            <Tile
              id="about-help-community"
              fill
              variant="text"
              tone="brand"
              layout="anchored"
              anchorIndex="03"
              icon={<HeartHandshake />}
              eyebrow="Community"
              title="A yard that shows up locally."
              body="From CTMS loam support to Rutland Memorial Day work, the proof is close to home."
            />
          ),
        }}
      />

      <TileScreen
        layout="section04"
        label="Around the yard"
        heading="Around the yard"
        tiles={{
          hero: (
            <Tile
              id="about-charlie"
              fill
              variant="image"
              src={yardDog}
              alt="Charlie, the Buy The Yard office manager, watching the lot from the office window"
              focal={{ x: 50, y: 18 }}
              overlay={{
                eyebrow: "Office manager",
                title: "Charlie keeps an eye on the yard.",
                body: "Not much gets past the window."
                ,align: "bottom-left",
                layout: "anchored",
                anchorIcon: <Dog />,
              }}
            />
          ),
          a: (
            <Tile
              id="about-patio"
              fill
              variant="image"
              src={yardPatio}
              alt="The Buy The Yard sit-and-stay area with Adirondack chairs and OPEN flag"
              focal="center"
              overlay={{
                eyebrow: "The yard",
                title: "Stop in, look around, ask questions.",
                align: "bottom-left",
                layout: "anchored",
                anchorIcon: <MapPin />,
              }}
            />
          ),
          b: (
            <Tile
              id="about-visit"
              fill
              variant="cta"
              tone="brand"
              anchorIndex="02"
              icon={<MapPin />}
              eyebrow="Visit"
              title="2264 Main St."
              body="Jefferson, MA. Stop by for pickup, seasonal material, or to see products in person."
              cta={{ label: "Contact & hours", to: "/contact" }}
            />
          ),
          c: (
            <Tile
              id="about-call"
              fill
              variant="cta"
              tone="surface"
              anchorIndex="03"
              icon={<Phone />}
              eyebrow="Ask Abby"
              title="508.579.9897"
              body="Phone is fastest when the question is timing, quantity, or delivery access."
              cta={{ label: "Tap to call", href: "tel:5085799897" }}
            />
          ),
        }}
      />
    </>
  );
}
