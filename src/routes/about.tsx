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
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">FEATURE · § F · MEET THE OWNER</span>
            <span className="dateline text-ink-soft hidden sm:inline">EST. 2016 · JEFFERSON, MA</span>
          </div>
          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[16ch]">
            Built by <span className="text-stamp">Abby.</span>
          </h1>
          <p className="lead mt-4 max-w-[56ch] text-ink-soft not-italic">
            A Massachusetts WBE-certified, woman-owned landscape supply yard —
            ten seasons in, same voice on the phone.
          </p>
        </div>
      </section>

      <section className="section bg-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden border-2 border-ink bg-newsprint-2">
              <img
                src={abbyPortrait}
                alt="Abby, owner of Buy The Yard, in Jefferson, MA"
                width={1232}
                height={1600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.08]"
              />
            </div>
            <p className="caption mt-2">
              Abby Montalto, owner — at the lot, 2264 Main St., Jefferson.{" "}
              <span className="text-ink-soft/70 not-italic">— Photo: The Yard.</span>
            </p>
            <div className="mt-5 flex items-center gap-4 p-5 bg-newsprint-2 border border-rule-strong">
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
                <p className="display-5 text-ink leading-none">WBE Certified</p>
                <p className="meta text-ink-soft mt-1">
                  MASSACHUSETTS WOMAN BUSINESS ENTERPRISE
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 body text-ink-soft">
            <p className="eyebrow text-stamp">— THE STORY —</p>
            <h2 className="display-3 text-ink leading-tight">
              Most yards treat you like a ticket number.
            </h2>
            <p>
              Loaded fast, out the gate, on to the next one.
            </p>
            <p className="display-5 text-ink">
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
            <blockquote className="border-l-4 border-stamp pl-6 py-2 my-8 display-4 text-ink leading-tight italic font-sans">
              "If you call this number, I pick up. That's the whole business model."
            </blockquote>
            <p>
              Year three, we made it official: Massachusetts Certified Woman-Owned Enterprise.
            </p>
            <p>
              2026 is our <strong className="text-ink">10th season</strong> — first spring mulch run through
              winter salt, same yard, same voice on the phone.
            </p>
            <p>
              Office manager: <strong className="text-ink">Charlie</strong>. He's a dog. He handles the greetings.
            </p>
            <p>
              Come by — <strong className="text-ink">2264 Main St., Jefferson, MA</strong>. Bring your questions,
              even the "how much do I need?" ones. Especially those.
            </p>
            <p className="display-4 text-ink">— Abby</p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-stamp text-newsprint label px-6 h-12 btn-press hover:bg-ink"
              >
                Visit the yard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-newsprint-2 border-y border-rule-strong">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thick">
            <h2 className="display-3 text-ink leading-none">Around the Yard</h2>
            <span className="dateline text-ink-soft hidden sm:inline">PHOTO DESK</span>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <figure className="md:col-span-2 border-2 border-ink bg-newsprint">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={yardPatio}
                alt="The Buy The Yard sit-and-stay area — Adirondack chairs, umbrellas, and an OPEN flag at the edge of the yard"
                width={1500}
                height={2000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.08]"
              />
            </div>
            <figcaption className="p-4 caption">
              The sit-and-stay corner — coffee, umbrellas, and the OPEN flag.
            </figcaption>
          </figure>
          <figure className="border-2 border-ink bg-newsprint">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={yardDog}
                alt="Charlie, the Buy The Yard office manager, watching the lot from the office window"
                width={1500}
                height={2000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.08]"
              />
            </div>
            <figcaption className="p-4 caption">
              Charlie · office manager · accepts treats and pets.
            </figcaption>
          </figure>
          </div>
        </div>
      </section>
    </>
  );
}
