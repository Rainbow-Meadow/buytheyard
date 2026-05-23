import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Calculator, Flower2, Phone, Ruler, Sprout, TreePine, Truck, Waves, Mountain } from "lucide-react";
import { products, type Product } from "@/data/products";
import {
  EditorialSection,
  EditorialColumns,
  EditorialProse,
  PullQuote,
  LedgerList,
} from "@/components/site/editorial";

const materialGuides: Array<{
  category: Product["category"];
  icon: ReactNode;
  title: string;
  plainEnglish: string;
  bestFor: string;
  measure: string;
  watchFor: string;
  askAbby: string;
}> = [
  {
    category: "Mulch",
    icon: <TreePine />,
    title: "For beds that need a clean finished look.",
    plainEnglish: "Mulch is the fast visual win: it darkens the bed, frames the plants, holds moisture, and makes a tired edge look maintained again.",
    bestFor: "Flower beds, foundation beds, tree rings, edges, and seasonal cleanup.",
    measure: "Measure length and width. Use 2–3 inches for most refreshes; deeper if the bed is bare or thin.",
    watchFor: "Refresh and new-bed orders are different. A light top-off needs less than a bare bed.",
    askAbby: "Tell us the bed size, whether old mulch is already there, and the color you want.",
  },
  {
    category: "Loam",
    icon: <Sprout />,
    title: "For growing, patching, leveling, and starting over.",
    plainEnglish: "Loam is for projects where you need soil, not decoration: lawn repair, grading, filling, seeding, and garden-bed prep.",
    bestFor: "Lawn patches, new seed areas, raised beds, re-grading, and tired soil that needs rebuilding.",
    measure: "Measure the area and the depth you need to add. Even an inch over a large lawn patch adds up fast.",
    watchFor: "Loam settles. If you are filling a low spot, plan for compaction and final grade.",
    askAbby: "Tell us whether you are seeding, filling, or building a bed — the answer changes the recommendation.",
  },
  {
    category: "Sand",
    icon: <Waves />,
    title: "For leveling, masonry, pavers, and clean play areas.",
    plainEnglish: "Mason sand is fine, washed, and predictable. It is useful anywhere the surface needs to level cleanly or feel smooth underfoot.",
    bestFor: "Paver bedding, masonry mixes, sandboxes, leveling small areas, and project base prep.",
    measure: "Know the square footage and target depth. Thin leveling layers need less than a full base build.",
    watchFor: "Sand drains and shifts differently than crushed stone. It is not the default for every base job.",
    askAbby: "Tell us if this is for pavers, play, masonry, or leveling so you do not order the wrong base.",
  },
  {
    category: "Gravel",
    icon: <Truck />,
    title: "For structure, drainage, and areas that take traffic.",
    plainEnglish: "Crushed stone behaves differently than decorative stone. Angular gravel locks in, carries weight, and lets water move.",
    bestFor: "Driveway touch-ups, drainage trenches, french drains, utility areas, and compactable base layers.",
    measure: "Measure length, width, and depth. Driveways and drainage work usually need more depth than people expect.",
    watchFor: "Round stone looks nice but does not lock like crushed stone. Pick for function first.",
    askAbby: "Tell us if cars will drive on it, water needs to move through it, or it is just for appearance.",
  },
  {
    category: "Specialty Stone",
    icon: <Mountain />,
    title: "For the spots where appearance matters as much as function.",
    plainEnglish: "Decorative stone lasts longer than mulch and changes the look of a bed, walkway, or drainage edge for years.",
    bestFor: "Walkways, bed edges, dry creek beds, downspout splash areas, and low-maintenance decorative spaces.",
    measure: "Measure the coverage area and desired depth. Stone is heavy, so quantity mistakes matter.",
    watchFor: "Stone is harder to change later than mulch. Color, size, and feel underfoot all matter.",
    askAbby: "Send a photo or describe the spot if you are choosing between pea stone, river stone, and lava rock.",
  },
  {
    category: "Garden Center",
    icon: <Flower2 />,
    title: "For seasonal color and what looks good right now.",
    plainEnglish: "The garden center side changes with the season. What is out front is usually what is fresh, full, and moving now.",
    bestFor: "Hanging baskets, annuals, perennials, mums, pumpkins, and seasonal front-step color.",
    measure: "Bring rough counts or photos for bed gaps, porch hooks, planters, and entry areas.",
    watchFor: "Seasonal stock changes quickly. If you saw something online, call before driving over.",
    askAbby: "Tell us what color, sun exposure, and container or bed size you are working with.",
  },
];

export function ProductBuyingGuide() {
  return (
    <>
      <EditorialSection eyebrow="Material buying guide" label="How to choose material" id="buying-guide" rule={false}>
        <EditorialColumns
          variant="lead-body-aside"
          lead={
            <div>
              <h2 className="display-3 leading-[0.95] text-balance text-zinc-950">Start with the job. Then pick the material.</h2>
              <p className="body-sm text-zinc-500 mt-5 max-w-[34ch] text-pretty">Use the catalog to narrow the options, but use the project to make the decision.</p>
            </div>
          }
          body={
            <EditorialProse>
              <p>Most people do not wake up needing “three yards of something.” They need a cleaner bed, a lawn patch that will take seed, a driveway that drains, or stone that looks right next to the house.</p>
              <p>That is the better way to use this catalog. Start with the project, then narrow the material. A pretty stone that works for an edge may be wrong for a driveway. Loam that is perfect for seed is not the same decision as mulch for curb appeal.</p>
              <p>If the order still feels fuzzy, send the rough measurements and town. Abby will help confirm the material, the yards, pickup or delivery, and the drop spot before anything leaves Jefferson.</p>
              <PullQuote>The useful question is not “what do you sell?” It is “what are you trying to fix?”</PullQuote>
            </EditorialProse>
          }
          aside={
            <div className="rounded-md bg-kraft p-5 ring-1 ring-zinc-300">
              <p className="eyebrow text-brand mb-4">Abby’s quick checklist</p>
              <LedgerList
                rows={[
                  { label: "Project", value: "Bed, lawn, driveway, drainage, walkway" },
                  { label: "Measure", value: "Length × width × target depth" },
                  { label: "Town", value: "So route timing can be checked" },
                  { label: "Drop", value: "Driveway or curbline, marked clearly" },
                ]}
              />
              <Link to="/quote" className="label text-brand mt-5 inline-flex items-center gap-2">Send the rough list <span aria-hidden="true">→</span></Link>
            </div>
          }
        />
      </EditorialSection>

      <EditorialSection eyebrow="By material" label="Material guide by category" id="material-guide" surface="kraft">
        <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="display-3 leading-[0.95] text-balance text-zinc-950">What each material is actually for.</h2>
            <p className="body text-zinc-700 mt-5 max-w-[42ch] text-pretty">This is the practical layer between browsing products and calling Abby.</p>
          </div>
          <div className="space-y-4">
            {materialGuides.map((guide) => {
              const items = products.filter((p) => p.category === guide.category);
              return (
                <article key={guide.category} className="relative overflow-hidden rounded-md bg-white p-5 ring-1 ring-zinc-300 md:p-6">
                  <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
                  <div className="grid gap-5 md:grid-cols-[0.72fr_1.28fr]">
                    <div>
                      <div className="mb-4 text-brand [&>*]:size-7" aria-hidden="true">{guide.icon}</div>
                      <p className="eyebrow text-brand mb-2">{guide.category}</p>
                      <h3 className="display-5 leading-tight text-balance text-zinc-950">{guide.title}</h3>
                      <p className="body-sm text-zinc-700 mt-3 text-pretty">{guide.plainEnglish}</p>
                      <p className="body-sm text-zinc-500 mt-4 text-pretty"><span className="font-semibold text-zinc-700">Common options:</span> {items.map((p) => p.name).join(" · ")}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <GuideNote label="Best for" value={guide.bestFor} />
                      <GuideNote label="Measure" value={guide.measure} />
                      <GuideNote label="Watch for" value={guide.watchFor} />
                      <GuideNote label="Ask Abby" value={guide.askAbby} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </EditorialSection>
    </>
  );
}

export function ProductQuantityGuide() {
  return (
    <EditorialSection eyebrow="Quantity confidence" label="How to estimate material quantity" id="quantity-guide" surface="ink">
      <EditorialColumns
        lead={
          <div>
            <h2 className="display-3 leading-[0.95] text-balance text-white">Get close. Then let Abby confirm.</h2>
            <p className="body-sm text-zinc-400 mt-5 max-w-[38ch] text-pretty">Calculators are helpful, but they do not know your slope, old material, driveway access, or whether the bed is being refreshed or rebuilt.</p>
          </div>
        }
        body={
          <div className="grid gap-4 md:grid-cols-3">
            <QuantityCard icon={<Ruler />} label="Measure" title="Length × width × depth" body="Use feet for the area and inches for the depth. Photos help when the shape is odd." />
            <QuantityCard icon={<Calculator />} label="Depth" title="2–3 inches for most mulch refreshes" body="New beds, thin areas, and deep top-offs can need more. Tell us which one you’re doing." />
            <QuantityCard icon={<Truck />} label="Delivery" title="1-yard minimum per drop" body="48 hours is best. Same-day only works when the route and material allow it." />
          </div>
        }
      />
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link to="/quote" className="inline-flex h-12 items-center justify-between gap-3 bg-brand px-5 label text-white hover:opacity-90">Send measurements to Abby <span aria-hidden="true">→</span></Link>
        <a href="tel:5085799897" className="inline-flex h-12 items-center justify-between gap-3 border border-white/20 px-5 label text-white hover:bg-white/10">Call 508.579.9897 <Phone className="size-4 text-brand" /></a>
      </div>
    </EditorialSection>
  );
}

function GuideNote({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-kraft/70 p-3 ring-1 ring-zinc-300/70">
      <p className="eyebrow text-brand mb-1">{label}</p>
      <p className="body-sm text-zinc-700 text-pretty">{value}</p>
    </div>
  );
}

function QuantityCard({ icon, label, title, body }: { icon: ReactNode; label: string; title: string; body: string }) {
  return (
    <article className="relative overflow-hidden rounded-md bg-white/[0.06] p-5 ring-1 ring-white/10">
      <div className="mb-5 text-brand [&>*]:size-7" aria-hidden="true">{icon}</div>
      <p className="eyebrow text-brand mb-2">{label}</p>
      <h3 className="display-5 leading-tight text-white text-balance">{title}</h3>
      <p className="body-sm text-zinc-300 mt-3 text-pretty">{body}</p>
    </article>
  );
}
