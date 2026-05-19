import { createFileRoute } from "@tanstack/react-router";
import { mBrand } from "../mobile/copy";

export const Route = createFileRoute("/m/contact")({
  head: () => ({
    meta: [{ title: "Contact — Buy The Yard" }],
  }),
  component: MContact,
});

function MContact() {
  return (
    <div className="px-5 py-6 space-y-4">
      <p className="m-eyebrow">Reach us</p>
      <h1 className="m-display text-3xl mb-2">Hours, phone, map.</h1>

      <div className="m-card p-5">
        <p className="m-eyebrow mb-2">Phone</p>
        <a href={`tel:${mBrand.phoneTel}`} className="m-display text-2xl text-m-gold-light block mb-4">
          {mBrand.phone}
        </a>
        <a href={`tel:${mBrand.phoneTel}`} className="m-btn">Tap to call</a>
      </div>

      <div className="m-card p-5">
        <p className="m-eyebrow mb-2">Address</p>
        <p className="text-sm">{mBrand.address}</p>
      </div>

      <div className="m-card p-5">
        <p className="m-eyebrow mb-3">Hours</p>
        <ul className="text-sm space-y-2 text-m-muted">
          <li className="flex justify-between"><span>Mon – Fri</span><span className="text-m-text">8a – 5p</span></li>
          <li className="flex justify-between"><span>Saturday</span><span className="text-m-text">8a – 3p</span></li>
          <li className="flex justify-between"><span>Sunday</span><span className="text-m-text">Closed</span></li>
        </ul>
      </div>

      <div className="m-tile !aspect-[4/3]">
        <iframe
          src="https://maps.google.com/maps?q=2264+Main+St+Jefferson+MA+01522&output=embed"
          className="absolute inset-0 w-full h-full"
          title="Buy The Yard map"
          loading="lazy"
        />
      </div>
    </div>
  );
}