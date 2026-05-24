import { Section } from "../Section";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

export interface OwnerStoryProps {
  title?: string;
  heading: React.ReactNode;
  body: string;
  badges: string[];
  caption?: string;
}

export function OwnerStorySection({
  title = "ABBY'S STORY",
  heading,
  body,
  badges,
}: OwnerStoryProps) {
  return (
    <Section title={title} tone="ink">
      <div className="p-8 md:p-24">
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
    </Section>
  );
}
