import { Section } from "../Section";
import { SectionHeader } from "../SectionHeader";
import { SectionGrid, SectionGridCell } from "../SectionGrid";
import { MonoLabel } from "../MonoLabel";
import { DisplayHeading } from "../DisplayHeading";

export interface MaterialItem {
  code: string;
  name: string;
  description: string;
  unit: string;
}

export function MaterialInventorySection({
  index = "02",
  heading = "Material Inventory",
  items,
}: {
  index?: string | number;
  heading?: string;
  items: MaterialItem[];
}) {
  return (
    <Section index={index} tone="paper">
      <SectionHeader heading={heading} size="md" rule />
      <SectionGrid cols={4}>
        {items.map((m, i) => (
          <SectionGridCell key={m.code} last={i === items.length - 1}>
            <MonoLabel className="block mb-12">{m.code}</MonoLabel>
            <DisplayHeading as="h3" size="sm" className="mb-4">{m.name}</DisplayHeading>
            <p className="font-barlow text-sm opacity-70 mb-6">{m.description}</p>
            <MonoLabel>UNIT: {m.unit}</MonoLabel>
          </SectionGridCell>
        ))}
      </SectionGrid>
    </Section>
  );
}
