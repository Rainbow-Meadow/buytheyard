import { createFileRoute } from "@tanstack/react-router";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";
import { TileGrid, type TileBlock } from "@/components/site/Tile";

const STORY_BLOCKS: TileBlock[] = [
  {
    id: "story-01-origin",
    variant: "numbered",
    number: "01",
    eyebrow: "Origin",
    title:
      "Most landscape yards treat you like a ticket number. Loaded fast, out the gate, on to the next one.",
    body: "I built this one to feel like the opposite.",
    size: "feature",
    tone: "kraft",
    padding: "lg",
  },
  {
    id: "story-02-background",
    variant: "text",
    eyebrow: "02 · Background",
    body: "I grew up outside — trucks, equipment, mulch piles in the backyard with my dad. Construction was never the question. Only when.",
    size: "md",
    tone: "white",
  },
  {
    id: "story-03-yard-opens",
    variant: "text",
    eyebrow: "03 · The yard opens",
    body: "I graduated Wachusett Regional in 2016 and opened the yard that same spring. Two years later I finished my Entrepreneurship and Small Business degree — while already running one of my own.",
    size: "md",
    tone: "white",
  },
  {
    id: "story-quote-model",
    variant: "quote",
    eyebrow: "The whole business model",
    quote: "If you call this number, I pick up. That's the whole business model.",
    attribution: "Abby Montalto · Owner",
    size: "feature",
    tone: "surface",
    padding: "lg",
  },
  {
    id: "story-04-wbe",
    variant: "text",
    eyebrow: "04 · WBE",
    body: "Year three, we made it official: Massachusetts Certified Woman-Owned Enterprise.",
    size: "sm",
    tone: "kraft",
  },
  {
    id: "story-04-wbe-badge",
    variant: "text",
    eyebrow: "Certified",
    title: "WBE",
    body: "MA Woman Business Enterprise",
    size: "sm",
    tone: "kraft",
    padding: "sm",
    className: "md:hidden",
    icon: (
      <img
        src={wbeSeal}
        alt=""
        width={112}
        height={72}
        className="h-8 w-auto object-contain"
        loading="lazy"
        decoding="async"
      />
    ),
  },
  {
    id: "story-05-tenth-season",
    variant: "text",
    eyebrow: "05 · 10th season",
    body: (
      <>
        2026 is our <strong className="text-zinc-900">10th season</strong> — first spring mulch run through winter salt, same yard, same voice on the phone.
      </>
    ),
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
        Come by — <strong>2264 Main St., Jefferson, MA</strong>. Bring your questions, even the &ldquo;how much do I need?&rdquo; ones. Especially those.
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

          {/* Mobile: Gallery — square image grid, captions tucked under */}
          <div className="md:hidden grid grid-cols-2 gap-2">
            <figure className="relative aspect-square overflow-hidden rounded-sm ring-1 ring-zinc-300 bg-kraft">
              <img
                src={yardPatio}
                alt="The Buy The Yard sit-and-stay area — Adirondack chairs, umbrellas, and an OPEN flag at the edge of the yard"
                width={1500}
                height={1500}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 pt-8 label text-white">
                Sit-and-stay corner
              </figcaption>
            </figure>
            <figure className="relative aspect-square overflow-hidden rounded-sm ring-1 ring-zinc-300 bg-kraft">
              <img
                src={yardDog}
                alt="Charlie, the Buy The Yard office manager, watching the lot from the office window"
                width={1500}
                height={1500}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 pt-8 label text-white">
                Charlie · office manager
              </figcaption>
            </figure>
          </div>

          {/* Desktop: Magazine — featured large + supporting small */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <figure className="md:col-span-2 rounded-md overflow-hidden ring-1 ring-zinc-300 bg-kraft">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={yardPatio}
                  alt="The Buy The Yard sit-and-stay area — Adirondack chairs, umbrellas, and an OPEN flag at the edge of the yard"
                  width={1500}
                  height={2000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-5 label text-zinc-600">
                The sit-and-stay corner — coffee, umbrellas, and the OPEN flag.
              </figcaption>
            </figure>
            <figure className="rounded-md overflow-hidden ring-1 ring-zinc-300 bg-kraft">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={yardDog}
                  alt="Charlie, the Buy The Yard office manager, watching the lot from the office window"
                  width={1500}
                  height={2000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-5 label text-zinc-600">
                Charlie · office manager · accepts treats and pets.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
