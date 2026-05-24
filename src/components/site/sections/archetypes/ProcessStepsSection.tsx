import { Section } from "../Section";
import type { SectionBackground } from "../SectionBackdrop";
import { DisplayHeading } from "../DisplayHeading";

export interface ProcessStep { title: string; body: string }

export function ProcessStepsSection({
  title = "HOW TO ORDER",
  heading = "Procurement Process",
  steps,
  heightClass,
  background = { kind: "scatter", density: "regular", tint: "ink" },
}: {
  title?: string;
  heading?: string;
  steps: ProcessStep[];
  heightClass?: string;
  background?: SectionBackground;
}) {
  const compact = Boolean(heightClass);
  return (
    <Section title={title} tone="paper" heightClass={heightClass} background={background}>
      <div className={`p-8 ${compact ? "md:py-8 md:px-12" : "md:p-16"} md:h-full md:flex md:flex-col md:justify-center`}>
        <DisplayHeading as="h2" size="md" className={compact ? "mb-6" : "mb-12"}>{heading}</DisplayHeading>
        <div className={`grid grid-cols-1 md:grid-cols-3 ${compact ? "gap-8" : "gap-12"}`}>
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <span className={`absolute -left-4 -top-4 font-bebas opacity-10 leading-none ${compact ? "text-6xl" : "text-8xl"}`}>
                {i + 1}
              </span>
              <h4 className="font-bebas text-2xl mb-2 uppercase">{s.title}</h4>
              <p className="font-barlow text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
