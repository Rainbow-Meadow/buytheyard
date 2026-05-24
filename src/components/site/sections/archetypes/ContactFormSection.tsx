import { useState } from "react";
import { Section } from "../Section";
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
}

export function ContactFormSection({
  title = "CONTACT",
  heading,
  body,
  email,
  phone,
  address,
  hours,
}: ContactFormProps) {
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
    "w-full bg-paper border border-ink/20 px-3 py-3 font-barlow text-base focus:outline-none focus:border-ember";

  return (
    <Section title={title} tone="paper" rule={false}>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <form
          onSubmit={onSubmit}
          className="md:col-span-3 p-8 md:p-16 border-b md:border-b-0 md:border-r border-soft"
        >
          <DisplayHeading as="h2" size="md" className="mb-6">{heading}</DisplayHeading>
          {body && <p className="font-barlow text-lg opacity-80 mb-10 max-w-lg">{body}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <label className="block mb-4">
            <MonoLabel className="block mb-2 opacity-60">Reason</MonoLabel>
            <select name="reason" defaultValue={REASONS[0]} className={inputCls}>
              {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label className="block mb-8">
            <MonoLabel className="block mb-2 opacity-60">Message</MonoLabel>
            <textarea name="message" rows={5} className={inputCls} />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="inline-block bg-ember text-paper py-4 px-10 font-bebas text-2xl tracking-widest hover:brightness-110 transition-all disabled:opacity-60"
          >
            {submitting ? "Opening Mail…" : "Send Request"}
          </button>
        </form>
        <aside className="md:col-span-2 bg-black text-paper p-8 md:p-16 flex flex-col gap-10">
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