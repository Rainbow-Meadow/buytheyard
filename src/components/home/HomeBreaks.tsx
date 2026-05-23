import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";

const orderingSteps = [
  {
    icon: <Phone />,
    eyebrow: "01 · Start",
    title: "Call or send a quote request",
    body: "Phone is fastest. The quote form works best when you already know your material list and town.",
  },
  {
    icon: <ClipboardCheck />,
    eyebrow: "02 · Confirm",
    title: "Material, yards, and timing",
    body: "Abby confirms today’s price, quantity, pickup or delivery, and whether the route has room.",
  },
  {
    icon: <MapPin />,
    eyebrow: "03 · Drop",
    title: "Mark the spot before delivery",
    body: "Use a tarp, cone, or bucket. Delivery is driveway or curbline only, so the drop spot needs to be clear.",
  },
];

const deliveryBasics = [
  { label: "Service area", value: "About 25 miles from Jefferson" },
  { label: "Minimum", value: "1 yard per delivery" },
  { label: "Timing", value: "Same-day when the route allows; 48 hours is safer" },
  { label: "Drop spot", value: "Driveway or curbline only — mark it clearly" },
  { label: "Payment", value: "Cash, check, or card; card payments add 4%" },
];

export function OrderingBreak() {
  return (
    <section aria-labelledby="ordering-heading" className="section bg-base text-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="relative overflow-hidden rounded-md bg-kraft ring-1 ring-zinc-300 p-5 md:p-8">
          <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.45fr] lg:items-start">
            <div>
              <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
                Ordering rhythm
              </p>
              <h2 id="ordering-heading" className="display-3 max-w-[12ch] text-balance">
                How ordering works
              </h2>
              <p className="body text-zinc-700 max-w-[48ch] mt-4 text-pretty">
                Tell us what you need. We’ll help confirm the right material, the right quantity,
                and the right drop spot before anything leaves the yard.
              </p>
            </div>
            <div className="grid gap-2.5 md:grid-cols-3 md:gap-3">
              {orderingSteps.map((step) => (
                <article
                  key={step.eyebrow}
                  className="bg-white/70 ring-1 ring-zinc-300 rounded-md p-4 md:p-5 md:min-h-[220px] flex flex-col"
                >
                  <div className="text-brand mb-3 md:mb-4 [&>*]:size-6 md:[&>*]:size-7" aria-hidden="true">
                    {step.icon}
                  </div>
                  <p className="eyebrow text-brand mb-2">{step.eyebrow}</p>
                  <h3 className="display-5 leading-snug text-balance">{step.title}</h3>
                  <p className="body-sm text-zinc-700 mt-2 md:mt-3 text-pretty">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeliveryBasicsBreak() {
  return (
    <section aria-labelledby="delivery-basics-heading" className="section bg-surface text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-md bg-zinc-950 ring-1 ring-white/10 p-6 md:p-8">
            <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
            <div className="relative z-10">
              <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
                Delivery basics
              </p>
              <h2 id="delivery-basics-heading" className="display-3 max-w-[12ch] text-balance">
                Know before the truck rolls
              </h2>
              <p className="body text-zinc-300 max-w-[46ch] mt-4 text-pretty">
                We’ll confirm your town, quantity, timing, and drop spot before anything leaves
                the yard.
              </p>
            </div>
            <PackageCheck
              aria-hidden="true"
              className="absolute -bottom-6 -right-4 size-36 md:size-52 text-white/[0.06] stroke-[1.25]"
            />
          </div>

          <div className="rounded-md bg-kraft text-zinc-900 ring-1 ring-zinc-300 overflow-hidden">
            {deliveryBasics.map((item, index) => (
              <div
                key={item.label}
                className="grid gap-2 px-5 py-4 md:grid-cols-[180px_1fr] md:gap-6 border-b border-zinc-300 last:border-b-0"
              >
                <p className="eyebrow text-brand inline-flex items-center gap-2">
                  <span aria-hidden="true" className="text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </p>
                <p className="body text-zinc-800 text-pretty">{item.value}</p>
              </div>
            ))}
            <div className="grid gap-3 p-5 md:grid-cols-2 bg-white/70">
              <Link
                to="/delivery"
                className="inline-flex items-center gap-2 label text-brand hover:opacity-80"
              >
                Full delivery details <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/service-area"
                className="inline-flex items-center gap-2 label text-brand hover:opacity-80"
              >
                Check the service area <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AbbyTrustBreak() {
  return (
    <section aria-labelledby="abby-heading" className="section bg-base text-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="relative overflow-hidden rounded-md bg-white ring-1 ring-zinc-300 p-6 md:p-8">
          <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
                Local trust
              </p>
              <h2 id="abby-heading" className="display-3 text-balance">
                Built by Abby. Run from Jefferson.
              </h2>
              <p className="body text-zinc-700 max-w-[64ch] mt-4 text-pretty">
                Buy The Yard is a woman-owned, Massachusetts WBE-certified materials yard serving
                homeowners, landscapers, contractors, schools, and town projects across Central
                Mass.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              <Link
                to="/about"
                className="group rounded-md bg-kraft ring-1 ring-zinc-300 p-5 hover:bg-zinc-100 transition-colors"
              >
                <ShieldCheck className="size-7 text-brand mb-4" aria-hidden="true" />
                <p className="eyebrow text-brand mb-2">About</p>
                <p className="display-5 leading-tight text-balance">Meet Abby</p>
                <p className="body-sm text-zinc-700 mt-2">The local story behind the yard.</p>
              </Link>
              <Link
                to="/wbe"
                className="group rounded-md bg-brand text-brand-foreground p-5 hover:opacity-95 transition-opacity"
              >
                <BadgeCheck className="size-7 mb-4" aria-hidden="true" />
                <p className="eyebrow mb-2">Certification</p>
                <p className="display-5 leading-tight text-balance">What WBE means</p>
                <p className="body-sm mt-2 text-white/85">
                  Why the certification matters for local projects.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
