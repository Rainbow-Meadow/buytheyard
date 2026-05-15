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
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
            Meet the owner
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] max-w-[14ch]">
            Built by <span className="text-brand">Abby.</span>
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-base">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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
            <div className="mt-6 flex items-center gap-4 p-5 bg-kraft rounded-md ring-1 ring-zinc-300">
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
                <p className="font-display text-xl uppercase leading-none">WBE Certified</p>
                <p className="text-xs text-zinc-600 mt-1">
                  Massachusetts Woman Business Enterprise
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-zinc-700 text-lg leading-relaxed">
            <p>
              Here's the thing about landscape supply.
            </p>
            <p>
              Most yards treat you like a ticket number. Loaded fast. Out the gate. Next.
            </p>
            <p>
              I built this one different.
            </p>
            <p>
              I grew up outside. Trucks. Equipment. Mulch in the backyard with my dad. So
              construction was never really a question — just a matter of when.
            </p>
            <p>
              I graduated Wachusett Regional in 2016. Opened the yard the same year.
              Added an Entrepreneurship and Small Business degree by 2018 — already running
              one of my own.
            </p>
            <blockquote className="border-l-4 border-brand pl-6 py-2 my-10 font-display text-2xl md:text-3xl uppercase text-zinc-900 leading-tight">
              "This isn't just a job. It's something I take pride in and actually enjoy
              showing up for every day."
            </blockquote>
            <p>
              Three years in? Made it official. Buy The Yard became a Certified
              Woman-Owned Enterprise.
            </p>
            <p>
              2026 is our <strong>11th season</strong>. From the first spring mulch run
              through winter salt. Same yard. Same answer when you call.
            </p>
            <p>
              Office manager: <strong>Charlie</strong>. He's a dog. He handles greetings.
            </p>
            <p>
              Stop by — <strong>2264 Main St., Jefferson, MA</strong>. Ask anything.
              We'll give you a real answer.
            </p>
            <p className="font-display text-2xl uppercase text-zinc-900">— Abby</p>

            <div className="pt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90"
              >
                Visit the yard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-base">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <figcaption className="p-5 text-xs uppercase tracking-widest text-zinc-600">
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
            <figcaption className="p-5 text-xs uppercase tracking-widest text-zinc-600">
              Charlie · office manager · accepts treats and pets.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
