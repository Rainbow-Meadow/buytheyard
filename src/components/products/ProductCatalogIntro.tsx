import { Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardCheck, HelpCircle, Phone, Ruler, Truck } from "lucide-react";
import { Tile, type TileBlock } from "@/components/site/Tile";

export function ProductCatalogIntro({ categorySlides }: { categorySlides: TileBlock[] }) {
  return (
    <section aria-labelledby="products-heading" className="section bg-base text-zinc-900">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid gap-4 lg:grid-cols-[0.74fr_1.26fr] lg:items-stretch">
          <article className="relative overflow-hidden rounded-md bg-white p-5 ring-1 ring-zinc-300 md:p-7 lg:p-8">
            <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                  Materials catalog
                </p>
                <h1 id="products-heading" className="display-3 leading-[0.95] text-balance text-zinc-950">
                  Bulk material, picked for the job.
                </h1>
                <p className="body mt-5 max-w-[48ch] text-zinc-700 text-pretty">
                  Browse mulch, loam, sand, gravel, stone, and seasonal yard stock — then use the project notes below to choose with a little more confidence.
                </p>
                <p className="body-sm mt-4 max-w-[48ch] text-zinc-500 text-pretty">
                  Not sure what to order? Start with what you’re fixing. Abby can help confirm the material, rough yards, delivery timing, and drop spot.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href="tel:5085799897"
                  className="inline-flex h-12 items-center justify-between gap-3 bg-brand px-5 label text-white hover:opacity-90"
                >
                  Call Abby <Phone className="size-4" />
                </a>
                <Link
                  to="/quote"
                  className="inline-flex h-12 items-center justify-between gap-3 border border-zinc-300 bg-kraft px-5 label text-zinc-950 hover:bg-zinc-100"
                >
                  Send a quote <ArrowRight className="size-4 text-brand" />
                </Link>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-rows-[minmax(420px,1fr)_auto]">
            <div className="min-h-[390px] overflow-hidden rounded-md ring-1 ring-zinc-800 lg:min-h-[520px]">
              <Tile
                id="products-carousel"
                fill
                variant="carousel"
                ariaLabel="Browse materials by category"
                slides={categorySlides}
                controls="both"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <IntroNote
                icon={<Phone />}
                label="Price"
                title="Call for today’s price"
                body="Stock and pricing move with the season."
              />
              <IntroNote
                icon={<Ruler />}
                label="Measure"
                title="Length × width × depth"
                body="Get close. Abby can sanity-check it."
              />
              <IntroNote
                icon={<Truck />}
                label="Delivery"
                title="1-yard minimum"
                body="Driveway or curbline, marked clearly."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroNote({
  icon,
  label,
  title,
  body,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-md bg-kraft p-4 ring-1 ring-zinc-300">
      <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
      <div className="relative z-10">
        <div className="mb-3 text-brand [&>*]:size-5" aria-hidden="true">{icon}</div>
        <p className="eyebrow text-brand mb-1">{label}</p>
        <h2 className="display-5 leading-tight text-balance text-zinc-950">{title}</h2>
        <p className="body-sm mt-2 text-zinc-600 text-pretty">{body}</p>
      </div>
    </article>
  );
}
