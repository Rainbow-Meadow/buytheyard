import { Section } from "../Section";
import { SectionGrid, SectionGridCell } from "../SectionGrid";
import { MonoLabel } from "../MonoLabel";
import { DisplayHeading } from "../DisplayHeading";
import { Link } from "@tanstack/react-router";
import { CategoryLineIcon, type CategoryIconName } from "../CategoryLineIcon";

export interface MaterialItem {
  code: string;
  name: string;
  description: string;
  unit: string;
  to?: string;
  icon?: CategoryIconName;
}

export function MaterialInventorySection({
  title = "MATERIAL INDEX",
  items,
}: {
  title?: string;
  items: MaterialItem[];
}) {
  return (
    <Section title={title} tone="paper">
      <SectionGrid cols={4}>
        {items.map((m, i) => (
          <SectionGridCell key={m.code} last={i === items.length - 1}>
            {(() => {
              const inner = (
                <>
                  {m.icon && (
                    <div className="mb-8 max-w-[140px]">
                      <CategoryLineIcon name={m.icon} />
                    </div>
                  )}
                  <MonoLabel className="block mb-12">{m.code}</MonoLabel>
                  <DisplayHeading as="h3" size="sm" className="mb-4">{m.name}</DisplayHeading>
                  <p className="font-barlow text-sm opacity-70 mb-6">{m.description}</p>
                  <MonoLabel>UNIT: {m.unit}</MonoLabel>
                </>
              );
              return m.to ? (
                <Link to={m.to} className="block h-full">{inner}</Link>
              ) : inner;
            })()}
          </SectionGridCell>
        ))}
      </SectionGrid>
    </Section>
  );
}
