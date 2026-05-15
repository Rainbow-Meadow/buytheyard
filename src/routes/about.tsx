import { createFileRoute, Link } from "@tanstack/react-router";
import abbyPortrait from "@/assets/source/abby-portrait.jpg";
import wbeSeal from "@/assets/source/wbe-seal.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Abby — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Buy The Yard is a Massachusetts WBE-certified, woman-owned landscape supply yard founded by Abby in Jefferson, MA. Meet the owner.",
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
                width={1200}
                height={1500}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 flex items-center gap-4 p-5 bg-kraft rounded-md ring-1 ring-zinc-300">
              <img
                src={wbeSeal}
                alt="Massachusetts WBE certified seal"
                width={64}
                height={64}
                className="size-14 object-contain bg-white p-1 shrink-0 ring-1 ring-zinc-300"
                loading="lazy"
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
              Abby graduated in 2016 from Wachusett Regional High School and went on to earn
              an Entrepreneurship and Small Business degree in 2018. While in college, she
              started applying what she was learning to build a real business.
            </p>
            <p>
              Growing up, Abby was always outside, working alongside her father around trucks
              and equipment — or just spreading mulch in the backyard at home. It was no
              surprise when she decided that a career in the construction industry was going
              to be her passion.
            </p>
            <blockquote className="border-l-4 border-brand pl-6 py-2 my-10 font-display text-2xl md:text-3xl uppercase text-zinc-900 leading-tight">
              "Opening this business was the perfect way to get into the industry. I can
              proudly say I found something that's not just a job — it's something I can take
              pride in and enjoy coming to work every day."
            </blockquote>
            <p>
              After three years in business, Abby made it possible for Buy The Yard to become
              a Certified Woman Owned Enterprise.
            </p>
            <p>
              "Stop by the yard at <strong>2264 Main St. in Jefferson, MA</strong> for a
              visit. We're always happy to help with any questions and to provide top-notch
              customer service."
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
    </>
  );
}
