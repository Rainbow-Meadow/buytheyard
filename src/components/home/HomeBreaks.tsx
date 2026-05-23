import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";

const orderingSteps = [
  {
    icon: <Phone />,
    eyebrow: "01 · Start",
    title: "Call first if timing matters",
    body: "Phone is fastest. The quote form works best when you already have a material list and town.",
    why: "A quick call confirms price, route timing, and whether pickup or delivery makes more sense.",
  },
  {
    icon: <ClipboardCheck />,
    eyebrow: "02 · Confirm",
    title: "Material, yards, and town",
    body: "Abby checks the material, quantity, delivery town, and whether the route has room.",
    why: "Stock and pricing can move with the season. We’ll confirm the real number before you plan around it.",
  },
  {
    icon: <MapPin />,
    eyebrow: "03 · Drop",
    title: "Mark the spot clearly",
    body: "A tarp, cone, bucket, or clear note is perfect. Delivery is driveway or curbline only.",
    why: "Loaded trucks and lawns are not friends. A clear marker helps the driver drop it safely.",
  },
];

const deliveryBasics = [
  { label: "Service area", value: "Central Mass, from the Jefferson yard" },
  { label: "Minimum", value: "1 yard per delivery" },
  { label: "Timing", value: "48 hours is best; same-day only when the route allows" },
  { label: "Drop spot", value: "Driveway or curbline only — mark it clearly" },
  { label: "Payment", value: "Cash or check keeps costs down; card payments add 4%" },
];

const proofRows = [
  {
    icon: <BadgeCheck />,
    label: "Certified",
    value: "Massachusetts WBE-certified woman-owned business",
  },
  {
    icon: <ShieldCheck />,
    label: "Licensed",
    value: "MA HIC #214009 · USDOT #3543587",
  },
  {
    icon: <HeartHandshake />,
    label: "Local",
    value: "CTMS loam donation · Rutland Memorial Day support",
  },
];

export function OrderingBreak() {
  return (
    <section aria-labelledby="ordering-heading" className="section bg-base text-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="relative overflow-hidden rounded-md bg-kraft ring-1 ring-zinc-300 p-4 md:p-7">
          <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.45fr] lg:items-start">
            <div>
              <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
                Ordering rhythm
              </p>
              <h2 id="ordering-heading" className="display-3 max-w-[12ch] text-balance">
                Start with the right material, not a guess
              </h2>
              <p className="body text-zinc-700 max-w-[48ch] mt-4 text-pretty">
                Tell us what you’re working on. Abby will help confirm the right material,
                quantity, and drop spot before anything leaves Jefferson.
              </p>
            </div>
            <div className="grid gap-2.5 md:grid-cols-3 md:gap-3">
              {orderingSteps.map((step) => (
                <article
                  key={step.eyebrow}
                  className="relative overflow-hidden rounded-md bg-white/80 ring-1 ring-zinc-300 p-3.5 md:p-4"
                >
                  <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -bottom-3 -right-3 text-zinc-900/[0.045] [&>*]:size-24 md:[&>*]:size-32 [&>*]:stroke-[1.25]"
                  >
                    {step.icon}
                  </span>
                  <div className="relative z-10">
                    <p className="eyebrow text-brand mb-2 inline-flex items-center gap-2">
                      <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
                      {step.eyebrow}
                    </p>
                    <h3 className="display-5 leading-snug text-balance">{step.title}</h3>
                    <p className="body-sm text-zinc-700 mt-2 text-pretty">{step.body}</p>
                    <div className="mt-3 rounded-md bg-kraft/70 ring-1 ring-zinc-300/70 p-3">
                      <p className="eyebrow text-brand mb-1">Why it matters</p>
                      <p className="body-sm text-zinc-700 text-pretty">{step.why}</p>
                    </div>
                  </div>
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
                We’ll confirm the town, quantity, timing, and drop spot so the delivery is simple
                when the truck pulls in.
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

export function LocalProofPanel() {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-md bg-kraft text-zinc-900 ring-1 ring-zinc-300 p-5 md:p-6">
      <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-5">
        <div>
          <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-6 bg-brand" />
            Local proof
          </p>
          <h2 className="display-3 max-w-[12ch] text-balance">Local proof with receipts</h2>
          <p className="body-sm md:text-base md:leading-[1.6] text-zinc-700 mt-3 max-w-[54ch] text-pretty">
            Certified, licensed, locally rooted — with real donations and town support to show
            for it.
          </p>
        </div>
        <div className="grid gap-2.5 md:grid-cols-3">
          {proofRows.map((row) => (
            <div key={row.label} className="rounded-md bg-white/70 ring-1 ring-zinc-300 p-3 md:p-4">
              <div className="text-brand mb-2 [&>*]:size-5" aria-hidden="true">
                {row.icon}
              </div>
              <p className="eyebrow text-brand mb-1">{row.label}</p>
              <p className="body-sm text-zinc-800 text-pretty">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
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
                Built from the yard up
              </p>
              <h2 id="abby-heading" className="display-3 text-balance">
                Abby grew up around the work. Then she built the yard.
              </h2>
              <p className="body text-zinc-700 max-w-[68ch] mt-4 text-pretty">
                Abby Montalto grew up around trucks, equipment, and material work, then built Buy
                The Yard while studying Entrepreneurship & Small Business. She still runs it the
                way locals appreciate: direct answers, practical help, and someone who actually
                picks up the phone.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              <Link
                to="/about"
                className="group rounded-md bg-kraft ring-1 ring-zinc-300 p-5 hover:bg-zinc-100 transition-colors"
              >
                <GraduationCap className="size-7 text-brand mb-4" aria-hidden="true" />
                <p className="eyebrow text-brand mb-2">Founder</p>
                <p className="display-5 leading-tight text-balance">Meet Abby</p>
                <p className="body-sm text-zinc-700 mt-2">Wachusett ’16. Built while studying business.</p>
              </Link>
              <Link
                to="/wbe"
                className="group rounded-md bg-brand text-brand-foreground p-5 hover:opacity-95 transition-opacity"
              >
                <BadgeCheck className="size-7 mb-4" aria-hidden="true" />
                <p className="eyebrow mb-2">Certification</p>
                <p className="display-5 leading-tight text-balance">WBE-certified</p>
                <p className="body-sm mt-2 text-white/85">
                  Woman-owned, licensed, and built for real work.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
