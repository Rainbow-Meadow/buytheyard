import { createFileRoute } from "@tanstack/react-router";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";
import { TileGrid, type TileBlock } from "@/components/site/Tile";

const YARD_DETAILS = {
  patio: {
    eyebrow: "The yard",
    title: "The sit-and-stay corner",
    body: "This little corner started as somewhere to plant the OPEN flag — it ended up being where half my best conversations happen. Pull up a chair, grab a coffee while we figure out your load. It's a yard, but it's kind of a front porch too.",
  },
  charlie: {
    eyebrow: "Office manager",
    title: "Charlie runs the front desk",
    body: "Charlie's the unofficial office manager around here. He handles greetings, accepts treats, and supervises every delivery from the office window. If you bring a kid or a dog along, he's the first one they'll want to meet.",
  },
} as const;

const YARD_PATIO_TILE = {
  variant: "image" as const,
  src: yardPatio,
  alt: "The Buy The Yard sit-and-stay area — Adirondack chairs, umbrellas, and an OPEN flag at the edge of the yard",
  overlay: { title: "Sit-and-stay corner", align: "bottom-left" as const },
  details: YARD_DETAILS.patio,
};

const YARD_CHARLIE_TILE = {
  variant: "image" as const,
  src: yardDog,
  alt: "Charlie, the Buy The Yard office manager, watching the lot from the office window",
  overlay: { title: "Charlie · office manager", align: "bottom-left" as const },
  details: YARD_DETAILS.charlie,
};

const YARD_MOBILE_BLOCKS: TileBlock[] = [
  { id: "yard-m-patio", ...YARD_PATIO_TILE, size: "sm", aspect: "square" },
  { id: "yard-m-charlie", ...YARD_CHARLIE_TILE, size: "sm", aspect: "square" },
];

const YARD_DESKTOP_BLOCKS: TileBlock[] = [
  { id: "yard-d-patio", ...YARD_PATIO_TILE, size: "lg", aspect: "wide" },
  { id: "yard-d-charlie", ...YARD_CHARLIE_TILE, size: "sm", aspect: "portrait" },
];

const STORY_BLOCKS: TileBlock[] = [
  {
    id: "story-01-origin",
    variant: "numbered",
    number: "01",
    eyebrow: "Origin",
    title:
      "Growing up, I was always outside — alongside my dad, around trucks and equipment, or spreading mulch in the backyard.",
    body: "A career in this industry was never really a question.",
    size: "feature",
    tone: "kraft",
    padding: "lg",
  },
  {
    id: "story-02-background",
    variant: "text",
    eyebrow: "02 · School",
    body: "I graduated Wachusett Regional in 2016 and went straight on for an Entrepreneurship and Small Business degree.",
    size: "md",
    tone: "white",
  },
  {
    id: "story-03-yard-opens",
    variant: "text",
    eyebrow: "03 · Putting it to work",
    body: "While I was still in college I started applying what I was learning — and opened Buy The Yard before I graduated in 2018.",
    size: "md",
    tone: "white",
  },
  {
    id: "story-quote-model",
    variant: "quote",
    eyebrow: "In her own words",
    quote:
      "Opening this business was the perfect way to get into the industry. I can proudly say I found something that isn't just a job — it's something I take pride in and enjoy coming to every day.",
    attribution: "Abby Montalto · Owner",
    size: "feature",
    tone: "surface",
    padding: "lg",
  },
  {
    id: "story-04-wbe",
    variant: "text",
    eyebrow: "04 · WBE",
    body: "After three years in business, I made it official — Buy The Yard became a Massachusetts Certified Woman-Owned Enterprise.",
    size: "sm",
    tone: "kraft",
  },
  {
    id: "story-04-wbe-badge",
    variant: "text",
    body: (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <img
          src={wbeSeal}
          alt="Massachusetts WBE certified seal"
          width={112}
          height={72}
          className="h-24 w-auto object-contain"
          loading="lazy"
          decoding="async"
        />
        <span className="meta">MA Woman Business Enterprise</span>
      </div>
    ),
    size: "sm",
    tone: "brand",
    padding: "sm",
    className: "md:hidden flex flex-col items-center justify-center text-center",
  },
  {
    id: "story-05-tenth-season",
    variant: "text",
    eyebrow: "05 · Still here",
    body: "Nearly a decade in, same yard, same voice on the phone — and still genuinely glad to see you pull in.",
    size: "lg",
    tone: "white",
  },
  {
    id: "story-06-office-manager",
    variant: "text",
    eyebrow: "06 · Office manager",
    body: (
      <>
        <strong className="text-zinc-900">Charlie.</strong> He's a dog. He handles the greetings.
      </>
    ),
    size: "md",
    tone: "white",
  },
  {
    id: "story-07-visit",
    variant: "cta",
    eyebrow: "07 · Visit",
    body: (
      <>
        Stop by the yard at <strong>2264 Main St., Jefferson, MA</strong>. We&rsquo;re always happy to answer questions and help you figure out what you need.
      </>
    ),
    cta: { label: "Visit the yard", to: "/contact" },
    size: "md",
    tone: "brand",
  },
];

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
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-5 md:px-6 section-loose">
          <p className="eyebrow text-brand mb-4">
            Meet the owner
          </p>
          <h1 className="display-1 leading-[0.9] max-w-[14ch]">
            Built by <span className="text-brand">Abby.</span>
          </h1>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-md ring-1 ring-zinc-300 bg-kraft">
              <img
                src={abbyPortrait}
                alt="Abby, owner of Buy The Yard, in Jefferson, MA"
                width={1232}
                height={1600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 md:mt-6 hidden md:flex items-center gap-4 p-5 bg-kraft rounded-md ring-1 ring-zinc-300">
              <img
                src={wbeSeal}
                alt="Massachusetts WBE certified seal"
                width={112}
                height={72}
                className="h-14 w-auto object-contain shrink-0"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="display-5 leading-none">WBE Certified</p>
                <p className="text-xs text-zinc-600 mt-1">
                  Massachusetts Woman Business Enterprise
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow text-brand mb-3">In her own words</p>
            <h2 className="display-3 text-zinc-900 leading-tight mb-6 md:mb-8">
              Our Story
            </h2>

            <TileGrid blocks={STORY_BLOCKS} />
          </div>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <h2 className="display-4 text-zinc-900 leading-tight mb-5 md:mb-8">
            Around the Yard
          </h2>

          {/* Mobile: square gallery */}
          <div className="md:hidden">
            <TileGrid blocks={YARD_MOBILE_BLOCKS} />
          </div>

          {/* Desktop: magazine — featured wide + supporting portrait */}
          <div className="hidden md:block">
            <TileGrid blocks={YARD_DESKTOP_BLOCKS} />
          </div>
        </div>
      </section>
    </>
  );
}
