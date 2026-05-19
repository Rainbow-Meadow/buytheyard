import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { brand, products } from "../desktop/copy";

export const Route = createFileRoute("/_desktop/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Buy The Yard" },
      { name: "description", content: "Request a written quote on bulk mulch, loam, sand, gravel, or specialty stone. Delivery and pickup pricing for Central Massachusetts." },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <section className="md:col-span-5 d-card p-10 flex flex-col justify-between">
        <div>
          <p className="d-eyebrow mb-4">Request</p>
          <h1 className="d-serif text-5xl leading-tight mb-6">A quote in writing.</h1>
          <p className="text-d-muted leading-relaxed">
            Tell us the material, the yardage, and the zip. We'll come back with a written
            price the same business day.
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-d-line">
          <p className="d-eyebrow mb-2">Or skip the form</p>
          <a href={`tel:${brand.phoneTel}`} className="d-serif text-3xl text-d-gold-light">{brand.phone}</a>
        </div>
      </section>

      <section className="md:col-span-7 d-card p-10">
        {submitted ? (
          <div className="text-center py-12">
            <p className="d-eyebrow mb-4">Received</p>
            <h2 className="d-serif text-4xl mb-4">Quote request in.</h2>
            <p className="text-d-muted">We'll be in touch the same business day.</p>
          </div>
        ) : (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <Field label="Your name">
              <input required className="w-full bg-d-surface-2 border border-d-line p-3 text-d-text" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone"><input required type="tel" className="w-full bg-d-surface-2 border border-d-line p-3 text-d-text" /></Field>
              <Field label="Delivery zip"><input className="w-full bg-d-surface-2 border border-d-line p-3 text-d-text" /></Field>
            </div>
            <Field label="Material">
              <select className="w-full bg-d-surface-2 border border-d-line p-3 text-d-text">
                {products.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Yards needed">
              <input type="number" min={1} defaultValue={3} className="w-full bg-d-surface-2 border border-d-line p-3 text-d-text" />
            </Field>
            <Field label="Notes (optional)">
              <textarea rows={4} className="w-full bg-d-surface-2 border border-d-line p-3 text-d-text" />
            </Field>
            <button type="submit" className="d-btn-solid">Send request</button>
          </form>
        )}
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="d-eyebrow block mb-2">{label}</span>
      {children}
    </label>
  );
}