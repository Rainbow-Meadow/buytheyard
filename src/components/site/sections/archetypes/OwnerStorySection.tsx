import { Section } from "../Section";
import { SectionRailCaption } from "../SectionRailCaption";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

export interface OwnerStoryProps {
  index?: string | number;
  heading: React.ReactNode;
  body: string;
  badges: string[];
  caption: string;
}

export function OwnerStorySection({
  index = "05",
  heading,
  body,
  badges,
  caption,
}: OwnerStoryProps) {
  return (
    <Section index={index} tone="ink" accentIndex>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-8 md:p-24">
          <DisplayHeading as="h2" size="lg" className="mb-6">{heading}</DisplayHeading>
          <p className="font-barlow text-xl opacity-80 mb-8 max-w-lg">{body}</p>
          <div className="flex gap-4">
            {badges.map((b) => (
              <div key={b} className="h-16 w-16 border border-paper/20 flex items-center justify-center">
                <MonoLabel accent>{b}</MonoLabel>
              </div>
            ))}
          </div>
        </div>
        <SectionRailCaption tone="black">
          <span className="font-bebas text-2xl tracking-[0.2em] opacity-40 uppercase">{caption}</span>
        </SectionRailCaption>
      </div>
    </Section>
  );
}
