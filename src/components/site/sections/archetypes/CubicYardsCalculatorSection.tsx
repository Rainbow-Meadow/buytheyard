import { useMemo, useState } from "react";
import { Section } from "../Section";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

type Unit = "in" | "ft";

export function CubicYardsCalculatorSection({
  title = "CALCULATOR",
  heading = "Cubic Yards Required",
}: {
  title?: string;
  heading?: string;
}) {
  const [width, setWidth] = useState("10");
  const [length, setLength] = useState("10");
  const [thickness, setThickness] = useState("3");
  const [thicknessUnit, setThicknessUnit] = useState<Unit>("in");

  const yards = useMemo(() => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    const t = parseFloat(thickness);
    if (!w || !l || !t) return 0;
    const tFt = thicknessUnit === "in" ? t / 12 : t;
    return (w * l * tFt) / 27;
  }, [width, length, thickness, thicknessUnit]);

  const inputCls =
    "w-full bg-transparent border border-paper/30 px-3 py-3 font-bebas text-3xl text-paper focus:outline-none focus:border-ember";

  return (
    <Section title={title} tone="ink">
      <div className="p-8 md:p-16">
        <DisplayHeading as="h2" size="md" className="mb-10">{heading}</DisplayHeading>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <label className="block">
            <MonoLabel className="block mb-2 opacity-60">Width (ft)</MonoLabel>
            <input value={width} onChange={(e) => setWidth(e.target.value)} inputMode="decimal" className={inputCls} />
          </label>
          <label className="block">
            <MonoLabel className="block mb-2 opacity-60">Length (ft)</MonoLabel>
            <input value={length} onChange={(e) => setLength(e.target.value)} inputMode="decimal" className={inputCls} />
          </label>
          <label className="block">
            <MonoLabel className="block mb-2 opacity-60">Thickness</MonoLabel>
            <input value={thickness} onChange={(e) => setThickness(e.target.value)} inputMode="decimal" className={inputCls} />
          </label>
          <div className="flex flex-col">
            <MonoLabel className="block mb-2 opacity-60">Unit</MonoLabel>
            <div className="flex border border-paper/30 h-full">
              {(["in", "ft"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setThicknessUnit(u)}
                  className={`flex-1 font-bebas text-2xl uppercase tracking-widest transition-colors ${
                    thicknessUnit === u ? "bg-ember text-paper" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {u === "in" ? "Inches" : "Feet"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-paper/20 pt-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <MonoLabel className="opacity-60">Result</MonoLabel>
          <div className="flex items-baseline gap-4">
            <span className="font-bebas text-7xl md:text-9xl text-ember leading-none">
              {yards.toFixed(2)}
            </span>
            <MonoLabel>Cubic Yards</MonoLabel>
          </div>
        </div>
        <p className="font-barlow text-sm opacity-60 mt-6 max-w-xl">
          Estimate only. Round up when ordering — and call us if your project is irregular and we'll help you spec it.
        </p>
      </div>
    </Section>
  );
}