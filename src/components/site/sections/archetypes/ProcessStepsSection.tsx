import { Section } from "../Section";
import { DisplayHeading } from "../DisplayHeading";

export interface ProcessStep { title: string; body: string }

export function ProcessStepsSection({
  index = "04",
  heading = "Procurement Process",
  steps,
}: {
  index?: string | number;
  heading?: string;
  steps: ProcessStep[];
}) {
  return (
    <Section index={index} tone="paper">
      <div className="p-8 md:p-16">
        <DisplayHeading as="h2" size="md" className="mb-12">{heading}</DisplayHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <span className="absolute -left-4 -top-4 font-bebas text-8xl opacity-10 leading-none">
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
