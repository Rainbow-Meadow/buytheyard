import { Section } from "../Section";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

export interface OwnerStoryProps {
  title?: string;
  heading: React.ReactNode;
  body: string;
  badges: string[];
}

export function OwnerStorySection({
  title = "ABBY'S STORY",
  heading,
  body,
  badges,
}: OwnerStoryProps) {
  return (
    <Section title={title} tone="ink">
      <div className="p-8 md:py-14 md:px-20 md:min-h-[50svh] md:flex md:flex-col md:justify-center">
          <DisplayHeading as="h2" size="lg" className="mb-5">{heading}</DisplayHeading>
          <p className="font-barlow text-xl opacity-80 mb-6 max-w-lg">{body}</p>
          <div className="flex gap-4">
            {badges.map((b) => (
              <div key={b} className="h-14 w-14 border border-paper/20 flex items-center justify-center">
                <MonoLabel accent>{b}</MonoLabel>
              </div>
            ))}
          </div>
      </div>
    </Section>
  );
}
