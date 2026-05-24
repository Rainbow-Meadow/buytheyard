import { useState } from "react";
import { Section } from "../Section";
import type { SectionBackground } from "../SectionBackdrop";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

const REASONS = [
  "Please Select",
  "Quote Request",
  "Delivery Question",
  "Material Availability",
  "General Inquiry",
] as const;

export interface ContactFormProps {
  title?: string;
  heading: React.ReactNode;
  body?: string;
  email: string;
  phone: string;
  address: { line1: string; line2: string };
  hours?: { label: string; value: string }[];
  heightClass?: string;
  background?: SectionBackground;
}

export function ContactFormSection({
  title = "CONTACT",
  heading,
  body,
  email,
  phone,
  address,
  hours,
  heightClass,
  background = { kind: "scatter", density: "light", tint: "ink" },
}: ContactFormProps) {
  const compact = Boolean(heightClass);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const subject = `Quote request — ${fd.get("reason") || "General"}`;
    const body = [
      `Name: ${fd.get("firstName")} ${fd.get("lastName")}`,
      `Phone: ${fd.get("phone")}`,
      `Email: ${fd.get("email")}`,
      `Reason: ${fd.get("reason")}`,
      ``,
      `${fd.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => setSubmitting(false), 600);
  }

  const inputCls =
    "w-full bg-paper border border-ink/20 px-3 py-3 font-barlow text-base focus:outline-none focus:border-ember text-black";

  return (
    <Section title={title} tone="paper" rule={false} heightClass={heightClass} background={background}>
      <div className="grid grid-cols-1 md:grid-cols-5 md:h-full">
        <form
          onSubmit={onSubmit}
          className={`md:col-span-3 p-8 ${compact ? "md:py-8 md:px-12 md:overflow-y-auto" : "md:p-16"} border-b md:border-b-0 md:border-r border-soft`}
        >
          <DisplayHeading as="h2" size="md" className={compact ? "mb-4" : "mb-6"}>{heading}</DisplayHeading>
          {body && <p className={`font-barlow opacity-80 max-w-lg ${compact ? "text-base mb-6 text-black" : "text-lg mb-10"}`}>{body}</p>}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? "gap-3 mb-3" : "gap-4 mb-4"}`}>
            <label className="block">
              <MonoLabel className="block mb-2 opacity-60">First Name *</MonoLabel>
              <input name="firstName" required className={inputCls} />
            </label>
            <label className="block">
              <MonoLabel className="block mb-2 opacity-60">Last Name *</MonoLabel>
              <input name="lastName" required className={inputCls} />
            </label>
            <label className="block">
              <MonoLabel className="block mb-2 opacity-60">Phone *</MonoLabel>
              <input name="phone" type="tel" required className={inputCls} />
            </label>
            <label className="block">
              <MonoLabel className="block mb-2 opacity-60">Email *</MonoLabel>
              <input name="email" type="email" required className={inputCls} />
            </label>
          </div>
          <label className={`block ${compact ? "mb-3" : "mb-4"}`}>
            <MonoLabel className="block mb-2 opacity-60">Reason</MonoLabel>
            <select name="reason" defaultValue={REASONS[0]} className={inputCls}>
              {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label className={`block ${compact ? "mb-4" : "mb-8"}`}>
            <MonoLabel className="block mb-2 opacity-60">Message</MonoLabel>
            <textarea name="message" rows={compact ? 3 : 5} className={inputCls} />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className={`inline-block bg-ember text-paper font-bebas tracking-widest hover:brightness-110 transition-all disabled:opacity-60 ${compact ? "py-3 px-8 text-xl" : "py-4 px-10 text-2xl"}`}
          >
            {submitting ? "Opening Mail…" : "Send Request"}
          </button>
        </form>
        <aside className={`md:col-span-2 bg-black text-paper p-8 ${compact ? "md:py-8 md:px-12 gap-6 md:overflow-y-auto" : "md:p-16 gap-10"} flex flex-col`}>
          <div>
            <MonoLabel className="block mb-2 opacity-60">Direct Line</MonoLabel>
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
               className="text-4xl font-bebas text-ember hover:underline">
              {phone}
            </a>
          </div>
          <div>
            <MonoLabel className="block mb-2 opacity-60">Email</MonoLabel>
            <a href={`mailto:${email}`} className="font-bebas text-xl uppercase break-words">
              {email}
            </a>
          </div>
          <div>
            <MonoLabel className="block mb-2 opacity-60">Yard</MonoLabel>
            <p className="font-barlow text-sm opacity-80">
              {address.line1}<br/>{address.line2}
            </p>
          </div>
          {hours && hours.length > 0 && (
            <div>
              <MonoLabel className="block mb-3 opacity-60">Hours</MonoLabel>
              <ul className="font-barlow text-sm space-y-1.5">
                {hours.map((h) => (
                  <li key={h.label} className="flex justify-between gap-4">
                    <span className="opacity-60">{h.label}</span>
                    <span>{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </Section>
  );
}