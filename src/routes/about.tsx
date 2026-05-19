import { createFileRoute, Link } from "@tanstack/react-router";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";

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
            <div className="mt-3 md:mt-6 flex items-center gap-4 p-5 bg-kraft rounded-md ring-1 ring-zinc-300">
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

          <div className="lg:col-span-7 space-y-6 text-zinc-700 text-lg leading-relaxed text-justify hyphens-auto">
            <h2 className="display-4 text-zinc-900 leading-tight">
              Our Story
            </h2>
            <p>
              Most landscape yards treat you like a ticket number. Loaded fast, out the gate, on to the next one.
            </p>
            <p>
              I built this one to feel like the opposite.
            </p>
            <p>
              I grew up outside — trucks, equipment, mulch piles in the backyard with my dad.
              Construction was never the question. Only when.
            </p>
            <p>
              I graduated Wachusett Regional in 2016 and opened the yard that same spring.
              Two years later I finished my Entrepreneurship and Small Business degree —
              while already running one of my own.
            </p>
            <blockquote className="border-l-4 border-brand pl-6 py-2 my-10 display-4 text-zinc-900 leading-tight">
              "If you call this number, I pick up. That's the whole business model."
            </blockquote>
            <p>
              Year three, we made it official: Massachusetts Certified Woman-Owned Enterprise.
            </p>
            <p>
              2026 is our <strong>10th season</strong> — first spring mulch run through
              winter salt, same yard, same voice on the phone.
            </p>
            <p>
              Office manager: <strong>Charlie</strong>. He's a dog. He handles the greetings.
            </p>
            <p>
              Come by — <strong>2264 Main St., Jefferson, MA</strong>. Bring your questions,
              even the "how much do I need?" ones. Especially those.
            </p>
            <p className="display-4 text-zinc-900">— Abby</p>

            <div className="pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90"
              >
                Visit the yard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <h2 className="md:col-span-3 display-4 text-zinc-900 leading-tight">
            Around the Yard
          </h2>
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
      </section>
    </>
  );
}
