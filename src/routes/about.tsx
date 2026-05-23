import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ClipboardCheck,
  Dog,
  GraduationCap,
  Hammer,
  HardHat,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import abbyPortrait from "@/assets/source/abby-portrait.webp";
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";

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

const stats = [
  { icon: <Calendar />, label: "Founded", value: "2016", detail: "Jefferson yard" },
  { icon: <BadgeCheck />, label: "Certified", value: "WBE", detail: "MA woman-owned" },
  { icon: <GraduationCap />, label: "Local", value: "Wachusett ’16", detail: "Built while studying business" },
  { icon: <Phone />, label: "Best first step", value: "Call", detail: "508.579.9897" },
];

const helpItems = [
  {
    icon: <Hammer />,
    label: "Material",
    title: "Start with the project, not the product name.",
    body: "A flower bed, lawn patch, drainage trench, driveway repair, and walkway all point toward different materials. Tell Abby what you are fixing first.",
  },
  {
    icon: <ClipboardCheck />,
    label: "Quantity",
    title: "Measure what you can. The yard will sanity-check it.",
    body: "Length, width, depth, and town are enough to start. If the number feels fuzzy, that is normal — the point is to get close before the order is confirmed.",
  },
  {
    icon: <Truck />,
    label: "Delivery",
    title: "A good drop starts before the truck leaves Jefferson.",
    body: "A tarp, bucket, cone, or note helps the driver place the pile safely. Delivery is driveway or curbline only because loaded trucks and lawns are not friends.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="section bg-base text-zinc-900">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <article className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden rounded-md bg-zinc-950 text-white ring-1 ring-zinc-800">
              <img
                src={abbyPortrait}
                alt="Abby Montalto, owner of Buy The Yard in Jefferson, MA"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "50% 28%" }}
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/62 to-zinc-950/12" />
              <span aria-hidden="true" className="absolute left-0 bottom-16 h-64 w-1.5 bg-brand" />
              <div className="relative z-10 flex h-full items-end p-5 md:p-8 lg:p-10">
                <div className="max-w-3xl">
                  <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                    Meet Abby Montalto
                  </p>
                  <h1 className="display-2 leading-[0.94] text-balance">
                    Built by Abby. Run from Jefferson.
                  </h1>
                  <p className="lead mt-5 max-w-[58ch] text-zinc-200 text-pretty">
                    Buy The Yard is a woman-owned materials yard with Central Mass construction roots, practical answers, and a simple goal: help people get the right material in the right place without guessing.
                  </p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <a
                      href="tel:5085799897"
                      className="inline-flex h-12 items-center justify-between gap-3 bg-brand px-5 label text-white hover:opacity-90"
                    >
                      Call Abby <Phone className="size-4" />
                    </a>
                    <Link
                      to="/quote"
                      className="inline-flex h-12 items-center justify-between gap-3 border border-white/30 px-5 label text-white hover:bg-white/10"
                    >
                      Send a quote request <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`relative overflow-hidden rounded-md p-5 ring-1 ${
                    index === 1
                      ? "bg-brand text-white ring-brand"
                      : index === 3
                        ? "bg-zinc-950 text-white ring-zinc-800"
                        : "bg-kraft text-zinc-900 ring-zinc-300"
                  }`}
                >
                  <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
                  <div className="relative z-10">
                    <div className="mb-5 text-brand [&>*]:size-7 [&>*]:stroke-[1.6]">
                      {stat.icon}
                    </div>
                    <p className={`eyebrow mb-2 ${index === 1 ? "text-white" : "text-brand"}`}>{stat.label}</p>
                    <p className="display-4 leading-tight text-balance">{stat.value}</p>
                    <p className={`body-sm mt-2 ${index === 1 || index === 3 ? "text-white/80" : "text-zinc-700"}`}>{stat.detail}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-base text-zinc-900">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="relative overflow-hidden rounded-md bg-white ring-1 ring-zinc-300">
            <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
            <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
              <div>
                <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                  The Abby story
                </p>
                <h2 className="display-3 max-w-[12ch] text-balance">
                  She grew up around the work. Then she built the yard.
                </h2>
              </div>
              <div className="space-y-5 body text-zinc-700 text-pretty">
                <p>
                  Abby grew up outside around trucks, equipment, and material work. The yard did not come from a polished business-school exercise; it came from knowing the kind of work people in Central Mass actually do in their driveways, beds, lawns, schools, job sites, and town spaces.
                </p>
                <p>
                  While studying Entrepreneurship & Small Business, she turned that hands-on background into Buy The Yard: a Jefferson materials yard for homeowners, landscapers, contractors, schools, and town projects that need straightforward help before anything gets loaded.
                </p>
                <p>
                  That is still the spirit of the place. If you know exactly what you need, the yard can help get it moving. If you are not sure whether you need mulch, loam, sand, gravel, or stone, that is fine too. Start with the project. Abby can help turn it into a material list.
                </p>
              </div>
            </div>
            <div className="border-t border-zinc-200 bg-kraft p-6 md:p-8 lg:px-10">
              <blockquote className="max-w-5xl">
                <p className="display-4 leading-tight text-zinc-950 text-balance">
                  “I found something that isn’t just a job — it’s something I take pride in every day.”
                </p>
                <footer className="mt-4 body-sm text-zinc-600">· Abby Montalto · Owner</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="relative overflow-hidden rounded-md bg-zinc-950 p-6 ring-1 ring-white/10 md:p-10">
              <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
              <HardHat className="absolute -bottom-8 -right-6 size-44 text-white/[0.06] stroke-[1.25]" aria-hidden="true" />
              <div className="relative z-10 max-w-3xl">
                <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                  Central Mass roots
                </p>
                <h2 className="display-3 text-balance">
                  A materials yard built on construction know-how.
                </h2>
                <div className="mt-5 space-y-5 body text-zinc-300 text-pretty">
                  <p>
                    Buy The Yard sits on a working Jefferson lot with deep family ties to Central Mass construction. That matters because material is not just a product. It has to fit the job, the route, the truck, the access, and the place it gets dropped.
                  </p>
                  <p>
                    Abby’s father Tim runs Callahan & Montalto Site Construction from the same yard. Materials out front, site work out back. That kind of setting keeps the advice practical: what works, what moves, what drains, what compacts, and what should not be dumped on a lawn.
                  </p>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              <ProofCard
                icon={<BadgeCheck />}
                label="Certified"
                title="MA WBE-certified"
                body="Woman-owned certification that matters for public, school, contractor, and supplier-diversity work."
                tone="brand"
                to="/wbe"
                cta="What WBE means"
              />
              <ProofCard
                icon={<ShieldCheck />}
                label="Working credentials"
                title="Licensed and registered"
                body="MA HIC #214009 and USDOT #3543587 are kept where they belong: as proof behind real work."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-base text-zinc-900">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                How the yard helps
              </p>
              <h2 className="display-3 text-balance">
                Not sure what to order? Start with what you’re fixing.
              </h2>
              <p className="body mt-5 max-w-[48ch] text-zinc-700 text-pretty">
                The site can show options, but a real material decision often needs a little context. That is why Buy The Yard keeps the path simple: project, rough measurements, town, delivery or pickup, then confirmation.
              </p>
            </div>
            <div className="grid gap-3">
              {helpItems.map((item, index) => (
                <article key={item.label} className="relative overflow-hidden rounded-md bg-white p-5 ring-1 ring-zinc-300 md:p-6">
                  <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
                  <div className="grid gap-4 md:grid-cols-[72px_1fr]">
                    <div className="flex items-center gap-3 md:block">
                      <span className="eyebrow text-zinc-500 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                      <div className="mt-0 grid size-12 place-items-center rounded-full bg-kraft text-brand md:mt-4 [&>*]:size-6">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <p className="eyebrow text-brand mb-2">{item.label}</p>
                      <h3 className="display-5 leading-tight text-balance">{item.title}</h3>
                      <p className="body-sm mt-3 max-w-[70ch] text-zinc-700 text-pretty">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-base text-zinc-900">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <figure className="relative min-h-[460px] overflow-hidden rounded-md bg-zinc-950 text-white ring-1 ring-zinc-800 lg:min-h-[620px]">
              <img
                src={yardDog}
                alt="Charlie, the Buy The Yard office manager, watching the lot from the office window"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "50% 18%" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/30 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                  Office manager
                </p>
                <h2 className="display-4 text-balance">Charlie keeps an eye on the yard.</h2>
                <p className="body-sm mt-2 text-zinc-200">Not much gets past the window.</p>
              </figcaption>
            </figure>

            <div className="grid gap-4">
              <figure className="relative min-h-[280px] overflow-hidden rounded-md bg-zinc-950 text-white ring-1 ring-zinc-800 md:min-h-[360px]">
                <img
                  src={yardPatio}
                  alt="The Buy The Yard sit-and-stay area with Adirondack chairs and OPEN flag"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/35 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                    The yard
                  </p>
                  <h3 className="display-5 text-balance">Stop in, look around, ask questions.</h3>
                </figcaption>
              </figure>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  to="/contact"
                  className="relative overflow-hidden rounded-md bg-brand p-5 text-white ring-1 ring-brand hover:opacity-95 md:p-6"
                >
                  <MapPin className="mb-5 size-8" aria-hidden="true" />
                  <p className="eyebrow mb-2">Visit</p>
                  <h3 className="display-5 leading-tight">2264 Main St.</h3>
                  <p className="body-sm mt-3 text-white/85">Jefferson, MA. Stop by for pickup, seasonal material, or to see products in person.</p>
                  <p className="label mt-5 inline-flex items-center gap-2">Contact & hours <ArrowRight className="size-4" /></p>
                </Link>
                <a
                  href="tel:5085799897"
                  className="relative overflow-hidden rounded-md bg-zinc-950 p-5 text-white ring-1 ring-zinc-800 hover:opacity-95 md:p-6"
                >
                  <Phone className="mb-5 size-8 text-brand" aria-hidden="true" />
                  <p className="eyebrow text-brand mb-2">Ask Abby</p>
                  <h3 className="display-5 leading-tight">508.579.9897</h3>
                  <p className="body-sm mt-3 text-white/75">Phone is fastest when the question is timing, quantity, or delivery access.</p>
                  <p className="label mt-5 inline-flex items-center gap-2 text-brand">Tap to call <ArrowRight className="size-4" /></p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProofCard({
  icon,
  label,
  title,
  body,
  tone = "light",
  to,
  cta,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  body: string;
  tone?: "brand" | "light";
  to?: "/wbe";
  cta?: string;
}) {
  const classes =
    tone === "brand"
      ? "bg-brand text-white ring-brand"
      : "bg-kraft text-zinc-900 ring-zinc-300";
  const inner = (
    <article className={`relative h-full overflow-hidden rounded-md p-6 ring-1 md:p-7 ${classes}`}>
      <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
      <div className="relative z-10">
        <div className={`mb-5 [&>*]:size-8 ${tone === "brand" ? "text-white" : "text-brand"}`}>{icon}</div>
        <p className={`eyebrow mb-2 ${tone === "brand" ? "text-white" : "text-brand"}`}>{label}</p>
        <h3 className="display-5 leading-tight text-balance">{title}</h3>
        <p className={`body-sm mt-3 text-pretty ${tone === "brand" ? "text-white/85" : "text-zinc-700"}`}>{body}</p>
        {cta ? <p className={`label mt-5 inline-flex items-center gap-2 ${tone === "brand" ? "text-white" : "text-brand"}`}>{cta} <ArrowRight className="size-4" /></p> : null}
      </div>
    </article>
  );

  return to ? (
    <Link to={to} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
      {inner}
    </Link>
  ) : (
    inner
  );
}
