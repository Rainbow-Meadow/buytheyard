import type { ReactNode } from "react";
import { Flower2, Mountain, Sprout, TreePine, Truck } from "lucide-react";
import { EditorialSection } from "@/components/site/editorial";

const projectGuides: Array<{
  icon: ReactNode;
  label: string;
  title: string;
  body: string;
  material: string;
  ask: string;
}> = [
  {
    icon: <TreePine />,
    label: "Flower beds",
    title: "Fresh mulch, less guessing.",
    body: "Most bed refreshes use 2–3 inches of mulch. A brand-new or very thin bed may need more.",
    material: "Mulch",
    ask: "Bring the bed size, whether old mulch is already there, and the color you want.",
  },
  {
    icon: <Sprout />,
    label: "Lawn repair",
    title: "Loam for seed, grading, and patching.",
    body: "Screened loam is usually the starting point for thin spots, new lawn areas, and small re-grades.",
    material: "Loam",
    ask: "Tell Abby whether you are seeding, filling a low spot, or building up grade.",
  },
  {
    icon: <Truck />,
    label: "Driveways & drainage",
    title: "Use angular stone where it needs to lock in.",
    body: "Crushed stone carries weight, lets water move, and behaves better than round stone where structure matters.",
    material: "Crushed stone / gravel",
    ask: "Mention cars, drainage, base depth, and whether the area needs to compact.",
  },
  {
    icon: <Mountain />,
    label: "Walkways & edges",
    title: "Choose stone by look, feel, and function.",
    body: "Pea stone, river stone, and decorative rock all feel different underfoot and change the look of a bed for years.",
    material: "Specialty stone",
    ask: "Send a photo if you are matching a house, walkway, or existing bed edge.",
  },
  {
    icon: <Flower2 />,
    label: "Garden center",
    title: "Seasonal color changes fast.",
    body: "Baskets, annuals, mums, pumpkins, and plant mix move with the weather and the season.",
    material: "Seasonal stock",
    ask: "Call before driving over if you are after a specific color, size, or plant type.",
  },
];

export function ProductProjectGuide() {
  return (
    <EditorialSection
      eyebrow="Shop by project"
      label="Shop by project"
      id="project-guide"
      surface="base"
      rule={false}
    >
      <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="display-3 leading-[0.95] text-balance text-zinc-950">
            Start with what you’re fixing.
          </h2>
          <p className="body mt-5 max-w-[44ch] text-zinc-700 text-pretty">
            This part should read like help, not a wall of tiny cards. The project tells Abby which material, depth, and delivery questions matter.
          </p>
        </div>

        <div className="rounded-md bg-white ring-1 ring-zinc-300 overflow-hidden">
          {projectGuides.map((guide, index) => (
            <article
              key={guide.label}
              className="relative grid gap-4 border-b border-zinc-200 p-5 last:border-b-0 md:grid-cols-[72px_1fr] md:p-6"
            >
              <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
              <div className="flex items-center gap-3 md:block">
                <span className="eyebrow text-zinc-500 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-0 grid size-12 place-items-center rounded-full bg-kraft text-brand md:mt-4 [&>*]:size-6">
                  {guide.icon}
                </div>
              </div>
              <div>
                <p className="eyebrow text-brand mb-2">{guide.label}</p>
                <h3 className="display-5 leading-tight text-balance text-zinc-950">
                  {guide.title}
                </h3>
                <p className="body-sm mt-3 max-w-[72ch] text-zinc-700 text-pretty">
                  {guide.body}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md bg-kraft/70 p-3 ring-1 ring-zinc-200">
                    <p className="eyebrow text-brand mb-1">Likely material</p>
                    <p className="body-sm text-zinc-700">{guide.material}</p>
                  </div>
                  <div className="rounded-md bg-kraft/70 p-3 ring-1 ring-zinc-200">
                    <p className="eyebrow text-brand mb-1">What to ask</p>
                    <p className="body-sm text-zinc-700 text-pretty">{guide.ask}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </EditorialSection>
  );
}
