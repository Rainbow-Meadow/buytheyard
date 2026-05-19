import { createFileRoute } from "@tanstack/react-router";
import { brand } from "../desktop/copy";

export const Route = createFileRoute("/_desktop/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Buy The Yard | 508-579-9897" },
      { name: "description", content: "Visit Buy The Yard at 2264 Main St., Jefferson, MA. Call 508-579-9897. Open Mon–Fri 8a–5p, Sat 8a–3p." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <section className="md:col-span-7 d-card p-10">
        <p className="d-eyebrow mb-4">Contact</p>
        <h1 className="d-serif text-5xl lg:text-6xl leading-tight mb-8">
          Find us, call us, come by.
        </h1>
        <dl className="space-y-6 text-d-text">
          <div>
            <dt className="d-eyebrow mb-1">Phone</dt>
            <dd><a href={`tel:${brand.phoneTel}`} className="d-serif text-3xl text-d-gold-light">{brand.phone}</a></dd>
          </div>
          <div>
            <dt className="d-eyebrow mb-1">Address</dt>
            <dd className="d-serif text-2xl">{brand.address}</dd>
          </div>
          <div>
            <dt className="d-eyebrow mb-1">Email</dt>
            <dd className="d-serif text-2xl">abby@btymaterial.com</dd>
          </div>
        </dl>
      </section>
      <section className="md:col-span-5 bg-d-gold p-10 text-d-bg">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Hours</p>
        <ul className="space-y-3">
          {brand.hours.map((h) => (
            <li key={h.day} className="flex justify-between items-baseline border-b border-d-bg/10 pb-3">
              <span className="d-serif text-xl">{h.day}</span>
              <span className="text-sm font-bold tracking-wider">{h.time}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="md:col-span-12 d-card overflow-hidden min-h-[360px] relative">
        <iframe
          src="https://maps.google.com/maps?q=2264+Main+St+Jefferson+MA+01522&output=embed"
          className="absolute inset-0 w-full h-full grayscale contrast-125"
          title="Buy The Yard location map"
          loading="lazy"
        />
      </section>
    </div>
  );
}